<template>
	<view class="content">
		<view class="title">投诉内容</view>
		<u-textarea
			height="340rpx"
			:maxlength="-1"
			:placeholderStyle="{ fontSize: '30rpx', color: '#c0c4d6' }"
			v-model="model.complainContent"
			border="bottom"
			:customStyle="{ padding: 0 }"
			placeholder="为利于问题得到及时处理，请明确填写相关问题的时间、地点、事件过程。"
		/>
		<view class="upload">
			<view class="title">证据图片</view>
			<upload :imageStyles="imageStyles" :limit="10" @callback="callback" @delete="deleteFn">
				<u-icon name="photo" labelPos="bottom" size="30" :space="10" labelSize="26rpx"></u-icon>
			</upload>
		</view>
	</view>
</template>

<script setup lang="ts">
import upload from '@/components/upload/index.vue';
import type { ModelType } from '../../index.vue';
interface Props {
	model: ModelType;
}
const props = defineProps<Props>();
const imageStyles = {
	dividline: true,
	border: {
		width: 2,
		style: 'dashed',
		radius: 2,
	},
	width: '212rpx',
	height: '212rpx',
};
const callback = (data: any) => {
	props.model.evidenceImg = props.model.evidenceImg.concat(data.data);
};
const deleteFn = (index: number) => {
	props.model.evidenceImg.splice(index, 1);
};
watchEffect(() => {
	props.model.isTrue = props.model.complainContent.length > 0;
});
</script>

<style scoped lang="scss">
.content {
	max-height: 800rpx;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 30rpx;
	background-color: #fff;
	border-radius: 20rpx;
	margin-bottom: 120rpx;

	.title {
		font-size: 30rpx;
		margin-bottom: 20rpx;
	}
	.upload {
		margin-top: 40rpx;
	}
}
</style>
