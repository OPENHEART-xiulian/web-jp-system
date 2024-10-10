<template>
	<view class="school">
		<u-form
			:model="fxData"
			labelPosition="top"
			>
			<u-form-item
				label="场地名称"
				prop="addressName"
				labelWidth="500rpx">
				<u-input
					disabled
					border="none"
					v-model="fxData.addressName"
					placeholder="暂无场地名称"
					type="text">
				</u-input>
			</u-form-item>
			<u-form-item
				label="训练科目"
				prop="name"
				labelWidth="500rpx">
				<u-input
					placeholder="暂无训练科目"
					disabled
					border="none"
					v-model="fxData.subjectName"
					type="text">
				</u-input>
			</u-form-item>
			<u-form-item
				label="手机号码"
				prop="phoneNumber"
				labelWidth="500rpx">
				<u-input
					border="none"
					disabled
					v-model="fxData.phoneNumber"
					placeholder="暂无手机号码"
					type="number"
					maxlength="11">
				</u-input>
			</u-form-item>
			<u-form-item
				label="场地地址"
				prop="address"
				labelWidth="500rpx">
				<u-textarea
					:customStyle="{
						margin: '6rpx 0',
					}"
					placeholder="暂无场地地址"
					border="none"
					autoHeight
					disabled
					v-model="fxData.address"
					type="text">
				</u-textarea>
			</u-form-item>
			<u-form-item
				label="场地图片"
				labelWidth="500rpx">
				<view class="upload_box">
					<u-empty
						v-if="imgList2.imageValue.length == 0"
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
		</u-form>
	</view>
</template>

<script lang="ts" setup>
import upload from '@/components/upload/index.vue';
import { _src, $src } from '@/utils/utils';
import type { ListType } from '../training_ground/index.vue';
const isShow = ref(false);
const fxData = ref<ListType>({
	address: '',
	addressName: '',
	addressPhoto: [],
	dtSchoolId: '',
	id: '',
	phoneNumber: '',
	remarks: '',
	subjectName: '',
});
const isRevise = ref(false); //是否修改
const imgList2 = reactive<any>({
	imageValue: [],
});
const form = ref<UniFormRef>();
const imageStyles = {
	dividline: true,
	border: false,
	width: '170rpx',
	height: '170rpx',
};

const callback2 = (data: any) => {
	fxData.value.addressPhoto = fxData.value.addressPhoto.concat(data?.data);
};
//删除图片
const deleteFn2 = (index: number) => {
	fxData.value.addressPhoto.splice(index, 1);
	console.log(index, fxData.value);
};
const repairIngList = (list: string[]) => {
	return list.map((v) => ({
		name: 'tx.jpg',
		extname: 'jpg',
		url: v,
	}));
};
const isArray = (array: any) => {
	return array instanceof Array ? array : [];
};
defineExpose({ form });
onLoad((option: any) => {
	const data = JSON.parse(option.data);
	const imgLists = isArray(JSON.parse(data.addressPhoto))?.map((v: any) =>
		_src(v)
	);
	data.addressPhoto = imgLists;
	imgList2.imageValue = repairIngList(imgLists);
	fxData.value = data;
	isShow.value = true;
});
</script>

<style scoped lang="scss">
:global(page) {
	padding-bottom: 140rpx;
}
.upload_box {
	min-height: 170rpx;
	display: flex;
	justify-content: space-between;
}
.school {
	margin: 30rpx;
	::v-deep .u-input {
		background-color: #f8f8f8 !important;
	}
	::v-deep .u-textarea {
		padding: 0 !important;
	}
	::v-deep .u-form-item__body__left {
		align-items: flex-start !important;
	}
	::v-deep .u-form-item__body__left__content {
		height: 48rpx;
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
	::v-deep .u-form-item__body__right {
		padding-left: 30rpx;
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
