<template>
	<view class="XY_top">
		<u-image
			width="100rpx"
			height="100rpx"
			shape="circle"
			:src="_src(headSculpture)"
			mode="scaleToFill" />
		<view class="right_XY">
			<view class="phone">{{ userInfo?.name }}</view>
			<!-- 学员才有认证 ☟-->
			<view style="margin: 14rpx 0">{{ userInfo?.schoolName }} </view>
			<view class="rz">V 认证学员 </view>
		</view>
	</view>
	<view class="jd_box">
		<view class="title">培训进度</view>
		<pro-gress
			:list="list"
			:StepInfo="StepInfo" />
	</view>
</template>

<script lang="ts" setup>
import proGress from '@/components/progress/progress.vue';
import { _src } from '@/utils/utils';
import type { UserInfo } from '../my_page/typing';
import { useUserInfo } from '@/store/userStore';
const store=useUserInfo();
const userInfo = ref<UserInfo | null | undefined>(null);
const list = ref([
	{
		title: '科目一',
		msg: '',
	},
	{
		title: '科目二',
		msg: '',
	},
	{
		title: '科目三',
		msg: '',
	},
	{
		title: '科目四',
		msg: '',
	},
	{
		title: '拿证',
		msg: '',
	},
]);
const headSculpture = ref('');
const StepInfo = reactive({
	Current: 0, //百分比
	Sum: 5, //共多少步骤
});
onShow(() => {
	const userMsg = store.getUserMsg()!;
	const {
		subjectFourRate,
		subjectOneRate,
		subjectThreeRate,
		subjectTwoRate,
		subjectOneExamination,
		subjectTwoExamination,
		subjectThreeExamination,
		subjectFourExamination,
	} = userMsg;
	userInfo.value = userMsg;
	StepInfo.Current =
		(subjectFourRate + subjectOneRate + subjectThreeRate + subjectTwoRate) / 4;
	const subjectList = [
		subjectOneRate,
		subjectTwoRate,
		subjectThreeRate,
		subjectFourRate,
	];
	const timeList = [
		subjectOneExamination,
		subjectTwoExamination,
		subjectThreeExamination,
		subjectFourExamination,
	];
	headSculpture.value =store!.userMsg!.headSculpture;
	let index = subjectList.indexOf(0) - 1;
	index = index >= 0 ? index : index == -1 ? 0 : 3;
	list.value = list.value.map((value, i) => {
		if (i == index) {
			value.msg = `已完成${subjectList[i]}%学时`;
		} else if (i < index) {
			value.msg = `${timeList[i]}考试`;
		} else {
			value.msg = '';
		}
		return value;
	});
});
</script>

<style scoped lang="scss">
.XY_top {
	margin: 30rpx;
	display: flex;
	align-items: center;
	gap: 40rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
	.right_XY {
		flex: 1;
		.phone {
			font-size: 30rpx;
			font-weight: bold;
		}
		.rz {
			border: 2rpx solid #fddc13;
			margin-top: 10rpx;
			font-size: 20rpx;
			line-height: 32rpx;
			border-radius: 16rpx;
			width: 134rpx;
			text-align: center;
			font-weight: bold;
			color: #fddc13;
		}
	}
}
.jd_box {
	padding: 30rpx;
	background-color: #fff;
	margin: 0 30rpx;
	border-radius: 20rpx;
	.title {
		font-size: 26rpx;
		margin-bottom: 40rpx;
		align-items: flex-start !important;
		background-image: linear-gradient(to right, #f7e8aa, transparent);
		padding: 10rpx 0;
		padding-left: 30rpx;
		font-weight: bold;
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
}
</style>
