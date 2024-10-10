<template>
	<view class="container">
		<view class="item">
			<text class="u-form-item__body__left">名称</text>
			<text>{{ currentPageData.detail.className }}</text>
		</view>
		<view class="item">
			<text class="u-form-item__body__left">类型</text>
			<text>{{ currentPageData.detail.carTypeName }}</text>
		</view>
		<view class="item">
			<text class="u-form-item__body__left">价格</text>
			<text>￥{{ currentPageData.detail.trainingExpenses }}</text>
		</view>
		<view class="item">
			<text class="u-form-item__body__left">训练时段</text>
			<text>{{ currentPageData.detail.trainingTime }}</text>
		</view>
		<view class="item">
			<text class="u-form-item__body__left">驾校</text>
			<view
				style="
					color: black;
					display: flex;
					margin-top: 16rpx;
					padding-left: 22rpx;
				"
				@click="goSchool"
			>
				<text>{{ currentPageData.detail.schoolName }}</text>
				<text>| 距离你{{ currentPageData.detail.distance }}km</text>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
		</view>
		<view class="item" style="padding-bottom: 150rpx">
			<text class="u-form-item__body__left">简介</text>
			<text style="word-break: break-all">{{
				currentPageData.detail.remarks
			}}</text>
			<text class="zwsj" v-if="!currentPageData.detail.remarks">暂无数据</text>
		</view>
		<button class="u-reset-button btn" @click="makeCall">立即报名</button>
	</view>
</template>

<script setup lang="ts">
import { getClassTypeDetail } from '@/api/api';
const currentPageData: any = reactive({
	id: '',
	detail: {},
});
onLoad((option: any) => {
	currentPageData.id = option.id;
	const { latitude, longitude } = uni.getStorageSync('userLat_long');
	getClassTypeDetail({
		id: currentPageData.id,
		latitude,
		longitude,
	}).then((res: any) => {
		console.log('data=', res);
		currentPageData.detail = res.data;
	});
});
const makeCall = () => {
	uni.makePhoneCall({
		phoneNumber: currentPageData.detail.bmPhoneNumber,
	});
};
const goSchool = () => {
	uni.navigateTo({
		url: '../school/schoolDetail?id=' + currentPageData.detail.dtDriverSchoolId,
	});
};
</script>

<style scoped lang="scss">
.container {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	padding: 30rpx;
	box-sizing: border-box;
	overflow: scroll;

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

	.btn {
		font-size: 28rpx;
		color: #000;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690rpx;
		height: 95rpx;
		border-radius: 20rpx;
		background: #fddc13;
		margin-top: 50rpx;
		position: fixed;
		bottom: 30rpx;
	}

	.item {
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx 0;

		> text:first-child {
			font-weight: bold;
			text-align: left;
			color: #000000;
			line-height: 60rpx;
		}

		text:last-child {
			font-weight: 400;
			text-align: left;
			line-height: 36rpx;
			color: black;
			margin-top: 16rpx;
			padding-left: 28rpx;
		}
	}
}
</style>
