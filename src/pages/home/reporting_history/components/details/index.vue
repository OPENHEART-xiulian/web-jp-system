<template>
	<u-popup
		:show="show"
		closeable
		:closeOnClickOverlay="true"
		mode="center"
		round="20rpx"
		@close="close"
	>
		<view class="content">
			<view class="headre"> 举报详情 </view>
			<view class="bottom_content">
				<view class="text_box">
					<view class="left">涉事对象:</view>
					<view>{{ data?.schoolOrCoachName }}</view>
				</view>
				<view class="text_box">
					<view class="left">涉事地址:</view>
					<view>{{ data?.schoolOrCoachAddress }}</view>
				</view>
				<view class="text_box">
					<view class="left">举报原因:</view>
					<view>{{ data?.reportTypeParentName }}</view>
				</view>
				<view class="text_box">
					<view class="left">违法类型:</view>
					<view>{{ data?.reportTypeName }}</view>
				</view>
				<view class="text_box">
					<view class="left">情况描述:</view>
					<view>{{ data?.remark }}</view>
				</view>
				<view class="text_box" v-if="data!.img.length > 0">
					<view class="left">证据图片:</view>
					<view class="img_box">
						<u-image
							@click="showPreviewImage(data!.img as any, index)"
							v-for="(item, index) in data!.img"
							:key="item"
							:src="item"
							width="150rpx"
							height="150rpx"
						/>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script lang="ts" setup>
import { showPreviewImage } from '@/utils/utils';
import type { ListType } from '../../index.vue';
type Props = {
	show: boolean;
	data: ListType | undefined;
};
type Emits = {
	(e: 'update:show', params: boolean): void;
};
defineProps<Props>();
const emits = defineEmits<Emits>();
const close = () => {
	emits('update:show', false);
};
</script>

<style scoped lang="scss">
.content {
	width: 90vw;
	min-height: 600rpx;
	padding: 30rpx;
	font-size: 28rpx;
	.bottom_content {
		max-height: 800rpx;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.headre {
		font-size: 30rpx;
		font-weight: bold;
		margin-bottom: 40rpx;
	}
	.text_box {
		display: flex;
		gap: 10rpx;
		margin-bottom: 40rpx;
		.left {
			flex-shrink: 0;
		}
		.img_box {
			flex: 1;
			display: grid;
			grid-template-columns: repeat(auto-fill, 150rpx); //自动填充，每个单元270
			grid-gap: 10rpx;
			justify-content: space-between;
		}
	}
}
</style>
