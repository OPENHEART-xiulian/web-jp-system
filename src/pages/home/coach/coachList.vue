<template>
	<u-sticky offset-top="0">
		<view class="screenBar">
			<view class="search_box" @click="go('./coachSearch')">
				<image :src="$src('home/search.png')" />
				<text style="font-weight: 400; color: #969696; margin-left: 14rpx"
					>搜索教练</text
				>
			</view>
			<screenBar @callBackData="getData" :isNeedType="true" />
		</view>
	</u-sticky>
	<view class="container">
		<caoch_list :requestData="currentPageData.requestData" ref="scl" />
	</view>
	<u-back-top
		:customStyle="customStyle"
		:iconStyle="iconStyle"
		icon="arrow-up"
		:scroll-top="scrollTop"
	/>
</template>

<script setup lang="ts">
import caoch_list from './components/caoch_list.vue';
import screenBar from '@/components/screenBar/screenBar.vue';
import { customStyle, iconStyle } from '@/utils/publicClassType';
import { $src } from '@/utils/utils';
const go = function (path: string) {
	uni.navigateTo({
		url: path,
	});
};
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
		carType: '',
	},
});
const scrollTop = ref(0);

onPageScroll((e: any) => {
	uni.$u.debounce(() => {
		scrollTop.value = e.scrollTop;
	}, 50);
});
const scl = ref<any>(null);
const getData = function (data: any) {
	currentPageData.requestData.area = data.area.id;
	currentPageData.requestData.sort = data.sort.val;
	currentPageData.requestData.carType = data.classTypeValue;
	scl.value.resetData();
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
}

.screenBar {
	padding: 0 30rpx;
	background-color: #f8f7f8;
}

.search_box {
	height: 64rpx;
	border: 1rpx solid #fddc13;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	flex: none;

	> image {
		width: 43rpx;
		height: 34rpx;
	}
}
</style>
