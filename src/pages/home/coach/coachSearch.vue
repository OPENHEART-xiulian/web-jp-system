<template>
	<u-sticky offset-top="0">
		<view class="search">
			<view class="search_box">
				<image :src="$src('home/search.png')" />
				<u-input
					border="none"
					clearable
					focus
					type="text"
					@confirm="ip"
					@clear="ip('')"
					v-model="currentPageData.requestData.coachName"
				/>
			</view>
		</view>
	</u-sticky>
	<view class="container">
		<view
			class="history"
			v-if="!currentPageData.requestData.coachName && currentPageData.history.length > 0"
		>
			<view class="his-title">
				<text>历史搜索</text>
				<u-icon name="trash-fill" size="20" @click="dele"></u-icon>
			</view>
			<view class="history-item">
				<view v-for="(ele, index) in currentPageData.history" :key="index" @click="ip(ele)">
					<u-icon name="clock" size="16"></u-icon>
					<text>{{ ele }} </text>
				</view>
			</view>
		</view>
		<caoch_list :requestData="currentPageData.requestData" ref="scl" style="margin-top: 40rpx" />
	</view>
	<u-back-top
		:customStyle="customStyle"
		:iconStyle="iconStyle"
		icon="arrow-up"
		:scroll-top="scrollTop"
	></u-back-top>
</template>

<script setup lang="ts">
import { customStyle, iconStyle } from '@/utils/publicClassType';
import caoch_list from './components/caoch_list.vue';
import { $src } from '@/utils/utils';
const scl: any = ref(null);
const dele = () => {
	currentPageData.history = [];
	uni.removeStorageSync('coachSearchHistory');
};
const scrollTop = ref(0);

onPageScroll((e: any) => {
	uni.$u.debounce(() => {
		scrollTop.value = e.scrollTop;
	}, 50);
});
const currentPageData: any = reactive({
	requestData: {
		area: '',
		city: uni.getStorageSync('selectCityData').id,
		latitude: uni.getStorageSync('userLat_long').latitude,
		longitude: uni.getStorageSync('userLat_long').longitude,
		pageNumber: 0,
		pageSize: 10,
		coachName: '',
		sort: 0,
		starRating: 0,
	},
	history: uni.getStorageSync('coachSearchHistory') || [],
});
const ip = (value: string) => {
	currentPageData.requestData.coachName = value;
	if (value && !currentPageData.history.includes(value)) {
		currentPageData.history.unshift(value);
		uni.setStorageSync('coachSearchHistory', currentPageData.history);
	}
	currentPageData.requestData.pageNumber = 1;
	scl.value.loadData();
};
</script>

<style scoped lang="scss">
.container {
	padding: 0 30rpx 30rpx;
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
					font-size: 24rpx;
					width: 260rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
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
}
.search {
	padding: 0 30rpx;
	background-color: #f8f7f8;
	.search_box {
		width: 100%;
		height: 64rpx;
		border: 1rpx solid #fddc13;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		flex: none;
		background-color: #ffffff;
		padding: 0 20rpx;

		> image {
			width: 43rpx;
			height: 34rpx;
			margin-right: 10px;
		}
	}
}
</style>
