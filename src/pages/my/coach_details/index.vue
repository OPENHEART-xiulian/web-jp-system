<template>
	<view class="coach_details">
		<view class="title">所属驾校</view>
		<view class="text">{{ userInfo?.schoolName }}</view>
		<u-divider lineColor="#969798"/>
		<view class="title">执教车型</view>
		<view class="text">{{ userInfo?.teachCarType }}</view>
		<u-divider lineColor="#969798"/>
		<view class="title">执教年限</view>
		<view class="text">{{ userInfo?.yearsOfTeaching }}</view>
		<u-divider lineColor="#969798"/>
		<view class="title">岗位</view>
		<view class="text">{{ userInfo?.post }}</view>
		<u-divider lineColor="#969798"/>
    <view class="title">简介</view>
		<view class="text">{{ userInfo?.remark }}</view>
	</view>
</template>

<script lang="ts" setup>
import type { UserInfo } from '../my_page/typing';
import { useUserInfo } from '@/store/userStore';
const userInfo = ref<UserInfo | null | undefined>(null);

onShow(()=>{
  userInfo.value = useUserInfo().getUserMsg();
})
</script>

<style scoped lang="scss">
.coach_details {
	margin: 20rpx 30rpx;
	.title {
		font-size: 26rpx;
		font-weight: bold;
	}
	.text {
		color: #969696;
		font-size: 24rpx;
    margin-top: 30rpx;
	}
}
</style>
