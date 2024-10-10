<template>
	<u-sticky offset-top="0">
		<view :class="{ zhanwei: sct, search: true }">
			<view class="search_box" @click="go('./schoolSearch')">
				<image :src="$src('/home/search.png')" /><text
					style="font-weight: 400; color: #969696; margin-left: 14rpx"
					>搜索驾校</text
				>
			</view>
		</view>
	</u-sticky>
	<view class="container">
		<view class="header">
			<image :src="$src('/home/school.png')" />
		</view>
		<view
			style="
				padding: 0 30rpx;
				box-sizing: border-box;
				position: relative;
				top: -64rpx;
			"
		>
			<u-sticky offset-top="44" zIndex="888">
				<screenBar @callBackData="getData" :isNeedRate="true" />
			</u-sticky>
			<school_list
				:requestData="currentPageData.requestData"
				ref="scl"
			></school_list>
		</view>
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
import { $src } from '@/utils/utils';
import school_list from './components/school_list.vue';
import screenBar from '@/components/screenBar/screenBar.vue';

const scl = ref<any>(null);
const sct = ref(false);
const currentPageData: any = reactive({
	requestData: {
		area: '',
		city: uni.getStorageSync('selectCityData').id,
		latitude: uni.getStorageSync('userLat_long').latitude,
		longitude: uni.getStorageSync('userLat_long').longitude,
		pageNumber: 1,
		pageSize: 10,
		schoolName: '',
		sort: 0,
		starRating: 0,
	},
});
const scrollTop = ref(0);

onPageScroll((e: any) => {
	sct.value = e.scrollTop > 190;
	uni.$u.debounce(() => {
		scrollTop.value = e.scrollTop;
	}, 50);
});
// -------------------------------------------------------------
const getData = function (data: any) {
	console.log('laile', data);
	currentPageData.requestData.area = data.area.id;
	currentPageData.requestData.sort = data.sort.val;
	currentPageData.requestData.starRating = data.starRating;
	scl.value.resetData();
	scl.value.loadData();
};

const go = function (path: string) {
	uni.navigateTo({
		url: path,
	});
};
</script>

<style scoped lang="scss">
.search {
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	.search_box {
		margin: 30rpx 30rpx 0;
		height: 64rpx;
		border: 1px solid #fddc13;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;

		z-index: 999;

		> image {
			width: 43rpx;
			height: 34rpx;
		}
	}
}
.container {
	position: relative;

	.header {
		height: 550rpx;
		width: 100%;
		position: relative;
		top: -64rpx;
		> image {
			width: 100%;
			height: 100%;
		}
	}

	.pos30 {
		position: relative;
		top: 30rpx;
	}
}
.zhanwei {
	width: 100%;
	background: #f7f8f7f8;
	padding-bottom: 10rpx;
}
</style>
