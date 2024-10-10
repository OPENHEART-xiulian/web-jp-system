<script setup lang="ts">
const data = ref<any>();
onLoad((options: any) => {
	data.value = JSON.parse(options.data);
	console.log(data.value);
});
</script>

<template>
	<view class="content">
		<view class="top">
			<u-image :src="data?.carLogo" height="100rpx" width="100rpx"></u-image>
			<view class="rg">
				<view>{{ data?.carBrand }}</view>
				<view class="plate">{{ data?.carNum }}</view>
			</view>
		</view>
		<view class="bottom">
			<view class="list_box">
				<view class="lf">车辆年龄</view>
				<view>{{ data?.carAge + '年' ?? '暂无数据' }}</view>
			</view>
			<view class="list_box">
				<view class="lf">培训车型</view>
				<view>{{ data?.cultivateType ?? '暂无数据' }}</view>
			</view>
			<view class="list_box">
				<view class="lf">登记日期</view>
				<view>{{ data?.drivingLicenseDate ?? '暂无数据' }}</view>
			</view>
			<view class="list_box">
				<view class="lf">报废日期</view>
				<view>{{ data?.forcedRetirement ?? '暂无数据' }}</view>
			</view>
			<view class="list_box">
				<view class="lf">车辆照片</view>
				<u-image :src="data?.photo" width="300rpx" height="180rpx"></u-image>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
.content {
	padding: 30rpx;
	.top {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 20rpx;
		font-size: 30rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: 20rpx;
		.plate {
			min-width: 190rpx;
			background-color: #fdad13;
			font-size: 12px;
			padding: 10rpx 22rpx;
			color: black;
			font-weight: 700;
			margin-top: 10rpx;
			border-radius: 10rpx;
			border: 2rpx solid black;
		}
	}
	.bottom {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 20rpx;
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		gap: 30rpx;
		margin-top: 30rpx;
		.list_box {
			display: flex;
			gap: 20rpx;
			.lf {
				color: #7f7f7f;
			}
		}
	}
}
</style>
