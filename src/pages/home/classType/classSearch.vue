<template>
	<view class="container">
		<view class="search_box">
			<image :src="$src('home/search.png')" />
			<input
				type="text"
				@confirm="ip"
				v-model="currentPageData.requestData.carTypeName"
			/>
			<view
				style="margin-right: 10rpx"
				@click="currentPageData.requestData.carTypeName = ''"
				v-if="currentPageData.requestData.carTypeName"
			>
				<u-icon name="close-circle" color="#ccc" size="22"></u-icon>
			</view>

			<!-- <button
				@click="goback()">取消</button> -->
		</view>
		<view
			class="history"
			v-if="
				!currentPageData.requestData.carTypeName &&
				currentPageData.history.length > 0
			"
		>
			<view class="his-title">
				<text>历史搜索</text>
				<u-icon name="trash-fill" size="20" @click="dele"></u-icon>
			</view>
			<view class="history-item">
				<view
					v-for="ele in currentPageData.history"
					@click="currentPageData.requestData.carTypeName = ele"
				>
					<u-icon name="clock" size="16"></u-icon
					><text
						style="
							font-size: 24rpx;
							width: 260rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						"
						>{{ ele }}</text
					>
				</view>
			</view>
		</view>
		<class-list
			:requestData="currentPageData.requestData"
			ref="scl"
			style="margin-top: 40rpx"
		></class-list>
	</view>
</template>

<script setup lang="ts">
import classList from './components/classList.vue';
import { $src } from '@/utils/utils';
const currentPageData: any = reactive({
	requestData: {
		area: '',
		city: '',
		latitude: uni.getStorageSync('userLat_long').latitude,
		longitude: uni.getStorageSync('userLat_long').longitude,
		pageNumber: 0,
		pageSize: 10,
		sort: 0,
		starRating: 0,
		carTypeName: '',
	},
	history: uni.getStorageSync('carTypeSearchHistory')
		? uni.getStorageSync('carTypeSearchHistory')
		: [],
});
const scl: any = ref(null);
const dele = () => {
	currentPageData.history = [];
	uni.removeStorageSync('carTypeSearchHistory');
};
const ip = () => {
	if (
		currentPageData.requestData.carTypeName &&
		!currentPageData.history.includes(currentPageData.requestData.carTypeName)
	) {
		currentPageData.history.unshift(currentPageData.requestData.carTypeName);
		uni.setStorageSync('carTypeSearchHistory', currentPageData.history);
	}
	scl.value.loadData();
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
	display: flex;
	flex-direction: column;
	background: #f8f7f8;

	.history {
		width: 100%;

		.history-item {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			font-size: 16rpx;
			color: #969696;

			> view {
				width: 50%;
				display: flex;
				justify-content: flex-start;
				margin: 15rpx 0;

				> text {
					margin-left: 5px;
				}
			}
		}

		.his-title {
			width: 100%;
			color: #000000;
			font-size: 18px;
			display: flex;
			justify-content: space-between;
			margin-top: 40rpx;
		}
	}

	.search_box {
		width: 100%;
		height: 64rpx;
		border: 1rpx solid #fddc13;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		flex: none;

		> image {
			width: 43rpx;
			height: 34rpx;
			margin-left: 10px;
		}

		input {
			flex-grow: 1;
			margin-left: 10rpx;
		}

		button {
			width: 130rpx;
			height: 52rpx;
			font-size: 30rpx;
			font-weight: bolder;
			color: #ffffff;
			background-color: #fdcc13;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 5px;
		}
	}
}
</style>
