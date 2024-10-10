<template>
	<view class="container">
		<view class="search_box" @click="go('./classSearch')">
			<image :src="$src('home/search.png')" />
			<text style="font-weight: 400; color: #969696; margin-left: 14rpx">
				搜索班型
			</text>
		</view>
		<screenBar
			:defaultParam="currentPageData.requestData"
			:isNeedType="true"
			@callBackData="getData"
		/>

		<classList ref="scr" :requestData="currentPageData.requestData" />
	</view>
	<u-back-top
		:customStyle="customStyle"
		:iconStyle="iconStyle"
		:scroll-top="scrollTop"
		icon="arrow-up"
	/>
</template>

<script lang="ts" setup>
import classList from './components/classList.vue';
import screenBar from '@/components/screenBar/screenBar.vue';
import { $src } from '@/utils/utils';
import { customStyle, iconStyle } from '@/utils/publicClassType';

const scr = ref<any>(null);
const go = function (path: string) {
	uni.navigateTo({
		url: path,
	});
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
		latitude: uni.getStorageSync('userLat_long').latitude,
		longitude: uni.getStorageSync('userLat_long').longitude,
		pageNumber: 1,
		pageSize: 10,
		sort: 0,
		carType: '',
	},
});
onLoad((option: any) => {
	if (option.id) {
		currentPageData.requestData.schoolId = option.id;
	}
	if (option.types) {
		currentPageData.requestData.carType = option.types;
	}
});
const getData = function (data: any) {
	currentPageData.requestData.area = data.area.id;
	currentPageData.requestData.sort = data.sort.val;
	currentPageData.requestData.carType = data.classTypeValue;
	scr.value.resetData();
	scr.value.loadData();
};
</script>

<style lang="scss" scoped>
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

	.type_box {
		margin-top: 15rpx;
		display: flex;
		justify-content: space-between;
		position: relative;

		.pop_select_win {
			padding: 40rpx 0;
			position: absolute;
			bottom: -1100rpx;
			left: 0;
			width: 690rpx;
			background: #f8f7f8;
			height: 1100rpx;
			z-index: 999;

			.confirm_btn_list {
				width: 100%;
				height: 96rpx;
				display: flex;
				justify-content: space-between;
				position: fixed;
				bottom: 10rpx;

				> button {
					width: 326rpx;
					height: 96rpx;
					display: flex;
					background: #fddc13;
					align-items: center;
					justify-content: center;
					border: 1rpx solid #7c7b7c;
				}
			}

			.pop_type {
				width: 100%;
				height: 100%;
				padding-bottom: 100rpx;
				overflow: hidden;
				overflow-y: scroll;

				text {
					font-size: 16px;
					font-weight: 400;
					color: #010000;
					margin: 10rpx 0;
				}

				.btn_list {
					width: 100%;
					display: flex;
					flex-wrap: wrap;

					> button {
						width: 330rpx;
						height: 60rpx;
						border: 1px solid #a0a0a0;
						border-radius: 10px;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 5rpx;
						padding: 0;
					}
				}
			}
		}

		> view {
			width: 157rpx;
			height: 35rpx;
			border-radius: 18rpx;
			display: flex;
			align-items: center;
			background: #e5e5e5;
			justify-content: center;

			> text {
				margin-right: 8rpx;
			}
		}
	}

	.search_box {
		width: 100%;
		height: 64rpx;
		border: 1rpx solid #fddc13;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;

		> image {
			width: 43rpx;
			height: 34rpx;
		}
	}
}
</style>
