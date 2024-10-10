<template>
	<u-popup
		:show="show"
		:closeOnClickOverlay="false"
		mode="center"
		round="20rpx"
		@close="close"
	>
		<view class="pop_box">
			<view class="complaint_details">
				<u-icon
					color="#fddc13"
					:size="40"
					name="checkmark-circle-fill"
				></u-icon>
				<!-- <u-image :src="$src('/my/ing.png')" height="100rpx" width="100rpx"></u-image> -->
				<view class="title">举报提交成功</view>
				<view class="content_text">
					主管部门将对您的举报内容进行核实,感谢您为清朗驾培行业贡献力量
				</view>
				<navigator
					url="/pages/home/reporting_history/index"
					open-type="redirect"
					hover-class="none"
				>
					<view class="detalis_text"> 点击查看举报详情>> </view>
				</navigator>
			</view>
			<u-button @click="returnFn">返回首页</u-button>
		</view>
	</u-popup>
</template>

<script setup lang="ts">
defineProps<{
	show: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:show', params: boolean): void;
}>();
const close = () => {
	emits('update:show', false);
};
const returnFn = () => {
	uni.switchTab({ url: '/pages/home/home_page/index' });
};
</script>

<style scoped lang="scss">
.pop_box {
	padding: 30rpx;
	width: 90vw;
	font-size: 24rpx;
	line-height: 32rpx;
	padding-bottom: 100rpx;
	.complaint_details {
		background-color: #fff;
		padding: 80rpx;
		font-size: 28rpx;
		text-align: center;
		color: #999;
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 40rpx;
		.title {
			font-size: 30rpx;
			color: #000;
			margin-bottom: 40rpx;
			margin-top: 20rpx;
		}
		.detalis_text {
			margin-top: 40rpx;
			color: #fddc13;
		}
	}
}
</style>
