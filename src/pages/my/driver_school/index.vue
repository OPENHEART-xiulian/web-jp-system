<template>
	<view class="school">
		<u-form
			:model="userInfo"
			labelPosition="top"
			ref="form">
			<u-form-item
				label="驾校名称"
				prop="schoolName"
				labelWidth="500rpx">
				<u-input
					disabled
					border="none"
					placeholder="暂无数据"
					v-model="userInfo.schoolName"
					type="text">
				</u-input>
			</u-form-item>
			<u-form-item
				label="培训车型"
				prop="trainingScope"
				labelWidth="500rpx">
				<u-input
					disabled
					border="none"
					placeholder="暂无数据"
					v-model="userInfo.trainingScope"
					type="text">
				</u-input>
			</u-form-item>
			<u-form-item
				label="联系电话"
				prop="bmPhoneNumber"
				labelWidth="500rpx">
				<u-input
					clearable
					@clear="userInfo.bmPhoneNumber = ''"
					:disabled="!isRevise"
					v-model="userInfo.bmPhoneNumber"
					:placeholder="!isRevise ? '暂无数据' : '请输入联系电话'"
					:border="isRevise ? 'bottom' : 'none'"
					type="text"
					maxlength="11">
				</u-input>
			</u-form-item>
			<u-form-item
				label="驾校地址"
				prop="address"
				labelWidth="500rpx">
				<u-textarea
					:customStyle="{
						padding: 0,
					}"
					placeholder="暂无数据"
					border="none"
					autoHeight
					disabled
					v-model="userInfo.address"
					type="text">
				</u-textarea>
			</u-form-item>
			<u-form-item
				v-if="studentStatusCode == 3"
				label="驾校图标"
				labelWidth="500rpx">
				<view class="upload_box">
					<u-empty
						v-if="!isRevise && userInfo.driverLogo.length == 0"
						text="暂无图标"
						textSize="12"
						width="100rpx"
						mode="car"
						:icon="$src('/other/wtp.png')" />
					<upload
						v-if="isShow"
						:readonly="!isRevise"
						@callback="callback1"
						:imageValue="imgList1.imageValue"
						:imageStyles="imageStyles"
						@delete="deleteFn1">
						<u-icon
							name="plus"
							labelPos="bottom"
							size="40rpx"
							:space="10"
							labelSize="26rpx"
							label="上传图标"></u-icon>
					</upload>
				</view>
			</u-form-item>
			<u-form-item
				:label="studentStatusCode == 3 ? '驾校图片' : '分校训练场图片'"
				labelWidth="500rpx">
				<view class="upload_box">
					<u-empty
						v-if="!isRevise && userInfo.driverImg.length == 0"
						text="暂无图片"
						textSize="12"
						width="100rpx"
						:icon="$src('/other/wtp.png')" />
					<upload
						v-if="isShow"
						:readonly="!isRevise"
						:imageValue="imgList2.imageValue"
						:limit="9"
						@callback="callback2"
						:imageStyles="imageStyles"
						@delete="deleteFn2">
						<u-icon
							name="plus"
							labelPos="bottom"
							size="40rpx"
							:space="10"
							labelSize="26rpx"
							label="上传图片"></u-icon>
					</upload>
				</view>
			</u-form-item>
			<u-form-item
				v-if="studentStatusCode == 3"
				label="驾校简介"
				prop="briefIntroduction"
				labelWidth="500rpx">
				<u-textarea
					:border="isRevise ? 'bottom' : 'none'"
					:customStyle="{
						background: 'none',
						padding: 0,
					}"
					autoHeight
					:placeholder="isRevise ? '请输入驾校简介' : '暂无数据'"
					:disabled="!isRevise"
					v-model="userInfo.briefIntroduction"
					:maxlength="2000"
					type="text">
				</u-textarea>
			</u-form-item>
		</u-form>
		<view class="btn">
			<u-button
				@click="submit"
				plain
				:customStyle="customStyleButtom"
				:loading="loading">
				{{ isRevise ? '保存' : '我要修改' }}
			</u-button>
		</view>
	</view>
</template>

<script lang="ts" setup>
import upload from '@/components/upload/index.vue';
import type { UserInfo } from '../my_page/typing';
import { updateSchoolInfo } from '@/api/api';
import { $src, _src, repairSrc } from '@/utils/utils';
import { useUserInfo } from '@/store/userStore';
import { customStyleButtom } from '@/utils/publicClassType';
const store = useUserInfo();
const isShow = ref(false);
const userInfo = ref<UserInfo | any>({
	schoolName: '',
	trainingScope: '',
	bmPhoneNumber: '',
	address: '',
	driverImg: [],
	driverLogo: [],
	briefIntroduction: '',
});
const studentStatusCode = ref<number>(5);
const isRevise = ref(false); //是否修改
const loading = ref(false); //按钮加载
const imgList1 = reactive<any>({
	imageValue: [],
});
const imgList2 = reactive<any>({
	imageValue: [],
});
const form = ref<UniFormRef>();
const imageStyles = reactive<any>({
	dividline: true,
	border: false,
	width: '170rpx',
	height: '170rpx',
});
watchEffect(() => {
	if (isRevise.value) {
		imageStyles.border = {
			color: '#5d5d5d',
			width: 2,
			style: 'dashed',
			radius: 2,
		};
	} else {
		imageStyles.border = false;
	}
});
const callback1 = (data: any) => {
	userInfo.value.driverLogo = data?.data || [];
};
const callback2 = (data: any) => {
	userInfo.value.driverImg = userInfo.value.driverImg.concat(data?.data);
};
//删除图片
const deleteFn1 = (index: number) => {
	userInfo.value.driverLogo = [];
};
const deleteFn2 = (index: number) => {
	userInfo.value.driverImg.splice(index, 1);
};
const repairIngList = (list: string[]) => {
	return list.map((v) => ({
		name: 'tx.jpg',
		extname: 'jpg',
		url: v,
	}));
};
const submit = () => {
	if (isRevise.value) {
		form.value
			?.validate()
			.then((res: any) => {
				loading.value = true;
				const { id, briefIntroduction, driverLogo, driverImg, bmPhoneNumber } =
					userInfo.value;
				let logo = driverLogo;
				let imgLists = driverImg;
				try {
					logo = JSON.stringify(driverLogo?.map((v: any) => repairSrc(v)));
					imgLists = JSON.stringify(driverImg?.map((v: any) => repairSrc(v)));
				} catch {
					console.log('报错');
				}
				const params = {
					id,
					briefIntroduction,
					driverLogo: logo,
					driverImg: imgLists,
					bmPhoneNumber,
					roleId: studentStatusCode.value,
				};
				return updateSchoolInfo(params);
			})
			.then(() => {
				uni.$u.toast('修改成功');
				isRevise.value = false;
			})
			.catch(() => {})
			.finally(() => {
				loading.value = false;
			});
	} else {
		isRevise.value = true;
	}
};
const isArray = (array: any) => {
	return array instanceof Array ? array : [];
};
onShow(() => {
	if (isShow.value) return;
	studentStatusCode.value = ~~store.getRole()![0].id;
	const userMsg = store.getUserMsg()!;
	const logo = isArray(JSON.parse(userMsg.driverLogo as any))?.map((v: any) =>
		_src(v)
	);
	const imgLists = isArray(JSON.parse(userMsg.driverImg as any))?.map((v: any) =>
		_src(v)
	);
	imgList1.imageValue = repairIngList(logo);
	imgList2.imageValue = repairIngList(imgLists);
	userMsg.driverLogo = logo;
	userMsg.driverImg = imgLists;
	userInfo.value = userMsg;
	isShow.value = true;
});
defineExpose({ form });
// 校验规则
const rules = reactive({
	bmPhoneNumber: [
		{
			required: true,
			message: '请输入手机号',
			trigger: ['blur'],
		},
		{
			validator: (rule: any, value: any) => {
				return uni.$u.test.mobile(value);
			},
			message: '手机号码不正确',
			trigger: ['blur'],
		},
	],
});
onReady(() => {
	form.value?.setRules(rules);
});
</script>

<style scoped lang="scss">
:global(page) {
	padding-bottom: 140rpx;
}
.upload_box {
	min-height: 160rpx;
	display: flex;
	justify-content: space-between;
	margin-top: 16rpx;
}
.school {
	margin: 30rpx;
	::v-deep .u-input {
		background-color: #f8f8f8 !important;
	}
	::v-deep .u-form-item__body__left {
		align-items: flex-start !important;
		background-image: linear-gradient(to right, #f7e8aa, transparent);
		padding-left: 30rpx;
		position: relative;
		&::after {
			content: '';
			height: 30rpx;
			width: 10rpx;
			background-color: #fed71a;
			position: absolute;
			left: 10rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	::v-deep .u-form-item__body__right,
	::v-deep .u-form-item__body__right__message {
		padding-left: 30rpx;
	}
	::v-deep .u-input {
		padding-left: 0 !important;
	}
	::v-deep .u-form-item__body__left__content {
		height: 48rpx;
	}
}
.to_from {
	margin-top: -20rpx;
}
.btn {
	padding: 0 30rpx;
	width: 100vw;
	position: fixed;
	bottom: 80rpx;
	left: 0;
	box-sizing: border-box;
	z-index: 999;
}
</style>
