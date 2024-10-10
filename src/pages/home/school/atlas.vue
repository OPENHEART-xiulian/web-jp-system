<script setup lang="ts">
import {showPreviewImage} from '@/utils/utils'
const imgList = ref([]);
onLoad((options) => {
	imgList.value = JSON.parse(options?.imgList) ?? [];
});
</script>

<template>
	<view class="img_list">
		<u-image
			:customStyle="{
				boxShadow: ' 0 4rpx 24rpx 0 rgba(0, 0, 0, 0.1)',
			}"
			v-for="(item,index) in imgList"
            @click="showPreviewImage(imgList,index)"
			:key="item"
			:src="item"
			width="310rpx"
			height="310rpx"></u-image>
	</view>
	<u-loadmore
		:marginTop="40"
		status="nomore"
		line />
</template>

<style scoped lang="scss">
:global(page) {
	background-color: #ffff;
}
.img_list {
	padding: 40rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100vw;
	gap: 40rpx;
}
</style>
