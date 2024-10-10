<template>
	<view
		class="development"
		:style="{ height, width }">
		<image
			class="img"
			:src="srcPath"
			mode="scaleToFill" />
		<view class="text">{{ text }}</view>
	</view>
</template>
<script lang="ts" setup>
import { $src } from '@/utils/utils';
interface Props {
	height?: string;
	width?: string;
	text?: string; //文字提示
	srcPath?: string; //图片路径
}
withDefaults(defineProps<Props>(), {
	height: '100vh',
	width: '100%',
	text: '暂无数据',
	srcPath: $src('/other/no_data.png'),
});
</script>

<style scoped lang="scss">
.development {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.img {
		display: block;
		margin-bottom: 40rpx;
		width: 202rpx;
		height: 226rpx;
	}
	.text {
		font-size: 26rpx;
		font-weight: bold;
	}
}
</style>
