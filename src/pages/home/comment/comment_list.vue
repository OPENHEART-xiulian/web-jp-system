<template>
	<view class="container">
		<view class="list_item" v-for="item in list" :key="item.id">
			<view class="one">
				<u-image width="60rpx" height="60rpx" :src="item.img" />
				<text class="text2"> 培训时长：{{ item.trainingDuration }} </text>
				<text class="text1">{{ item.trainingWay }}</text>
			</view>
			<view>开始时间：{{ item.trainingStartTime }}</view>
			<view>结束时间：{{ item.trainingEndTime }}</view>
			<navigator
				url="/pages/home/comment/submit_comment"
				open-type="navigate"
				hover-class="none"
			>
				<button @click="tz(item)" class="btn u-reset-button">评价</button>
			</navigator>
		</view>
		<no-data v-if="list.length == 0" />
		<u-loadmore
			v-else
			:marginTop="40"
			@loadmore="loadmore"
			:status="list.length < paramsData.total ? 'loadmore' : 'nomore'"
			line
		/>
	</view>
</template>

<script setup lang="ts">
import { getTrainingRecords } from '@/api/api';
import noData from '@/components/noData/index.vue';
import { useListData } from '@/hooks';
import { _src } from '@/utils/utils';
import { useThemeData } from '@/store';
import { useUserInfo } from '@/store/userStore';

export interface listType {
	cardNumber: string;
	coachId: string;
	coachImg: string;
	coachName: string;
	id: string;
	schoolId: string;
	schoolImg: string;
	schoolName: string;
	trainingDuration: string;
	trainingEndTime: string;
	trainingStartTime: string;
	trainingSubject: string;
	trainingWay: string;
	userId: string;
	img: string;
}
const store = useThemeData();
const storeUser = useUserInfo();
const tz = (item: listType) => {
	store.data = item;
	uni.navigateTo({
		url: '/pages/home/comment/submit_comment',
	});
};
const callbackFn = (list: listType[]) => {
	return list?.map((v: listType) => {
		try {
			v.schoolImg = JSON.parse(_src(v.schoolImg))[0];
			v.coachImg = JSON.parse(_src(v.coachImg))[0];
			v.img = JSON.parse(_src(v.img ?? '[]'))[0];
		} catch {}
		return v;
	});
};
const { userId } = storeUser.getUser()!;
const { getData, loadmore, resetData, list, paramsData } =
	useListData<listType>({
		getFn: getTrainingRecords,
		callbackFn,
		params: { userId },
		pageSize: 10,
		pageNumber: 1,
	});
onShow(() => {
	resetData();
	getData();
});
</script>

<style scoped lang="scss">
.container {
	padding: 30rpx;
	.list_item {
		width: 100%;
		background: white;
		padding: 20rpx;
		box-sizing: border-box;
		margin-bottom: 16rpx;
		border-radius: 20rpx;
		font-size: 28rpx;

		.btn {
			width: 150rpx;
			height: 60rpx;
			background: $theme-color;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			margin: 40rpx 0 0 auto;
		}
		.icon_box {
			width: 80rpx;
			height: 80rpx;
			font-size: 24rpx;
			font-weight: 500;
			background-color: #fef8d6;
			display: flex;
			flex-direction: column;
			justify-content: center;
			view {
				background-color: $theme-color;
				text-align: center;
			}
		}

		.one {
			display: flex;
			font-size: 32rpx;
			align-items: center;
			font-weight: 700;
			position: relative;
			border-bottom: 2rpx solid #e8e8e8;
			padding-bottom: 8rpx;
			margin-bottom: 20rpx;
			.text2 {
				font-size: 28rpx;
				margin-left: 16rpx;
			}
			.text1 {
				font-size: 28rpx;
				font-weight: normal;
				position: absolute;
				right: 16rpx;
				color: #aaaaaa;
			}
		}
	}
}
</style>
