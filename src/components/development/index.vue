<template>
	<view class="development">
		<image
			class="img"
			:src="$src('/other/dev_img.png')"
			mode="scaleToFill" />
		<view class="text">功能开发中，敬请期待</view>
	</view>
</template>
<script lang="ts" setup>
import { $src } from '@/utils/utils';
</script>

<style scoped lang="scss">
.development {
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.img {
		display: block;
		margin-bottom: 40rpx;
		width: 326rpx;
		height: 216rpx;
	}
	.text {
		font-size: 26rpx;
		font-weight: bold;
	}
}
</style>
