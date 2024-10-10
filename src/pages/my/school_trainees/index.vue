<template>
	<view class="content">
		<view class="top">
			<view class="setpText">
				{{ step == 1 ? '第一步   法人信息填写' : '第二步   驾校信息填写' }}
			</view>
			<view class="msg" v-show="step == 1">
				首位认证的驾校默认为主驾校，请知悉~
			</view>
		</view>
		<step-one ref="one" v-show="step == 1" :model="model">
			<ocr-navigator
				@onSuccess="zmFn"
				certificateType="idCard"
				:opposite="false"
			>
				<view class="sfz_box">
					<image :src="srcZm" style="width: 260rpx; height: 180rpx"></image>
					<view>请上传身份证正面</view>
				</view>
			</ocr-navigator>
			<ocr-navigator @onSuccess="fmFn" certificateType="idCard">
				<view class="sfz_box">
					<image :src="srcFm" style="width: 260rpx; height: 180rpx"></image>
					<view>请上传身份证反面</view>
				</view>
			</ocr-navigator>
		</step-one>
		<step-two ref="two" v-show="step == 2" :model="model">
			<ocr-navigator @onSuccess="yyzzFn" certificateType="businessLicense">
				<view class="sfz_box">
					<image :src="yyzz" style="width: 260rpx; height: 180rpx"></image>
					<view>请上传营业执照</view>
				</view>
			</ocr-navigator>
		</step-two>
	</view>
	<view class="btn">
		<template v-if="step == 2">
			<u-button
				color="#fddc13"
				customStyle="font-size:30rpx;border-radius:20rpx;color:#000;height:96rpx;font-weight:bold;"
				@click="step = 1"
				>上一步</u-button
			>
			<u-button
				color="#fddc13"
				customStyle="font-size:30rpx;border-radius:20rpx;color:#000;height:96rpx;font-weight:bold;"
				:loading="loading"
				@click="TwoSubmit"
				>认证
			</u-button>
		</template>
		<view class="btn" v-else>
			<u-button
				color="#fddc13"
				customStyle="font-size:30rpx;border-radius:20rpx;color:#000;height:96rpx;font-weight:bold;"
				:loading="loading"
				@click="oneSubmit"
				>下一步
			</u-button>
		</view>
	</view>
	<u-modal
		:show="show"
		title="提示"
		:content="content"
		closeOnClickOverlay
		@close="affirm"
		@confirm="affirm"
	/>
	<u-modal
		:show="show2"
		title="提示"
		:showConfirmButton="false"
		:content="content"
		closeOnClickOverlay
		@close="affirm"
		@confirm="affirm"
	>
		<view class="slot-content">
			<view class="text1">{{ content }}</view>
			<view class="text2">
				如您是驾校总部,<br />请联系<text @click="phoneCall">400-8708-3456</text
				>进行申诉
			</view>
			<view class="text3">
				如您是驾校分校，<br />
				请联系主校分配账号登录
			</view>
			<u-button
				color="#fddc13"
				customStyle="margin-top:80rpx;font-size:30rpx;border-radius:20rpx;color:#000;height:96rpx;font-weight:bold;"
				:loading="loading"
				@click="show2 = false"
			>
				我已知悉
			</u-button>
		</view>
	</u-modal>
</template>

<script setup lang="ts">
import {
	preserveUserMsg,
	returnToPage,
	$src,
	uploadFiles,
} from '@/utils/utils';
import stepOne from './components/stepOne/index.vue';
import stepTwo from './components/stepTwo/index.vue';
import { school } from '@/api/api';
import { useUserInfo } from '@/store/userStore';
const srcZm = ref($src('/other/zm-icon.png'));
const srcFm = ref($src('/other/fm-icon.png'));
const yyzz = ref($src('/other/yyzz-icon.png'));

const { getUser, getRole } = useUserInfo();
const userId = getUser()!.userId;
const model = reactive({
	name: '',
	cardNum: '',
	cardFrontPhoto: '',
	cardSidePhoto: '',
	businessLicensePhoto: '',
	socialCreditCode: '',
	schoolName: '',
});

const loading = ref(false);
const show = ref(false);
const show2 = ref(false);
const content = ref('');
const step = ref(1); //步骤
const one = ref<any>(null);
const two = ref<any>(null);
const phoneCall = () => {
	uni.makePhoneCall({ phoneNumber: '400-8708-3456' });
};
// 上传正面
const zmFn = (res: any) => {
	const { image_path, name, id } = res.detail;
	model.name = name.text;
	model.cardNum = id.text;
	srcZm.value = image_path;
	uploadFiles(image_path)
		.then(res => {
			uni.showToast({ title: '上传成功', icon: 'none' });
			const data = JSON.parse(res.data);
			model.cardFrontPhoto = data.data[0];
		})
		.finally(() => {
			uni.hideLoading();
		});
};
// 上传反面
const fmFn = (res: any) => {
	const image_path = res.detail.image_path;
	srcFm.value = image_path;
	uni.showLoading({
		title: '上传中',
	});
	uploadFiles(image_path)
		.then(res => {
			uni.showToast({ title: '上传成功', icon: 'none' });
			const data = JSON.parse(res.data);
			model.cardSidePhoto = data.data[0];
		})
		.finally(() => {
			uni.hideLoading();
		});
};
//上传营业执照
const yyzzFn = (res: any) => {
	console.log(res);
	const { image_path, reg_num, enterprise_name } = res.detail;
	model.schoolName = enterprise_name.text;
	model.socialCreditCode = reg_num.text;
	yyzz.value = image_path;
	uploadFiles(image_path)
		.then(res => {
			uni.showToast({ title: '上传成功', icon: 'none' });
			const data = JSON.parse(res.data);
			model.businessLicensePhoto = data.data[0];
		})
		.finally(() => {
			uni.hideLoading();
		});
};
//第一步按钮
const oneSubmit = () => {
	one.value?.form.validate().then(() => {
		const { cardFrontPhoto, cardSidePhoto } = model;
		if (cardFrontPhoto == '') {
			uni.showToast({ title: '请上传身份证正面', icon: 'none' });
		} else if (cardSidePhoto == '') {
			uni.showToast({ title: '请上传身份证反面', icon: 'none' });
		} else {
			step.value = 2;
		}
	});
};
//第二步按钮
const TwoSubmit = () => {
	two.value?.form
		.validate()
		.then(() => {
			if (model.businessLicensePhoto == '') {
				uni.showToast({ title: '请上传营业执照（副本）原件', icon: 'none' });
			} else {
				loading.value = true;
				return school({ ...model, userId });
			}
		})
		.then((res: any) => {
			const { message, binding } = res.data;
			content.value = message;
			show.value = binding;
			show2.value = !binding;
			preserveUserMsg(res.data);
		})
		.finally(() => {
			loading.value = false;
		});
};
const affirm = () => {
	show.value = false;
	const id = getRole()![0].id;
	if (id == '3') {
		//如果认证成功就返回入口页面
		returnToPage();
	}
};
</script>

<style scoped lang="scss">
.content {
	background-color: #fff;
	margin: 40rpx 30rpx;
	border-radius: 20rpx;
	padding: 60rpx;
	.top {
		font-size: 30rpx;
		text-align: center;
		height: 104rpx;
		font-weight: bold;
		margin-bottom: 40rpx;
		.msg {
			font-size: 24rpx;
			margin-top: 32rpx;
		}
	}
}
.btn {
	display: flex;
	gap: 20rpx;
	padding: 0 80rpx;
	margin-top: 40rpx;
}
.slot-content {
	font-size: 30rpx;
	.text2 {
		margin: 40rpx 0;
		text {
			color: #2e7cff;
			margin: 0 8rpx;
			font-weight: bold;
		}
	}
}
.btn {
	width: 100%;
	box-sizing: border-box;
	padding: 0 40rpx;
	position: fixed;
	bottom: 80rpx;
	left: 0;
}
.sfz_box {
	text-align: center;
	color: #aaa;
	margin-top: 20rpx;
}
</style>
