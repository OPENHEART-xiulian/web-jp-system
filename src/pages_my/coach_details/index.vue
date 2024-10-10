<template>
	<view class="coach_details">
		<view class="title">所属驾校</view>
		<view class="text">{{ userInfo?.schoolName ?? '暂无数据' }}</view>

		<view class="title">执教车型</view>
		<view class="text">{{ userInfo?.teachCarType ?? '暂无数据' }}</view>

		<view class="title">执教年限</view>
		<view class="text">{{ userInfo?.yearsOfTeaching ?? '暂无数据' }}</view>

		<view class="title">岗位</view>
		<view class="text">{{ userInfo?.post ?? '暂无数据' }}</view>

		<view class="title">简介</view>
		<view class="text">{{ userInfo?.remark ?? '暂无数据' }}</view>
	</view>
</template>

<script lang="ts" setup>
import type { UserInfo } from '@/pages/my/my_page/typing';
import { useUserInfo } from '@/store/userStore';
const userInfo = ref<UserInfo | null | undefined>(null);
onShow(() => {
	userInfo.value = useUserInfo().getUserMsg()!;
});
</script>

<style scoped lang="scss">
.coach_details {
	margin: 20rpx 30rpx;
	font-size: 30rpx;
	.title {
		font-weight: bold;
		align-items: flex-start !important;
		background-image: linear-gradient(to right, #f7e8aa, transparent);
		padding: 4rpx 0 4rpx 30rpx;
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
	.text {
		color: #969696;
		margin: 20rpx 0 30rpx;
		padding-left: 30rpx;
	}
}
</style>
