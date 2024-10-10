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
			<view class="headre"> 投诉详情 </view>
			<view class="bottom_content">
				<view class="text_box">
					<view class="left">投诉名称:</view>
					<view>{{ data?.spaBranchCampusName }}</view>
				</view>
				<view class="text_box" v-if="data?.spaCoachName">
					<view class="left">投诉教练:</view>
					<view>{{ data?.spaCoachName }}</view>
				</view>
				<view class="text_box">
					<view class="left">培训时段:</view>
					<view>{{ data?.startTime + ' 至 ' + data?.endTime }}</view>
				</view>
				<view class="text_box">
					<view class="left">投诉分类:</view>
					<view>{{ data?.complainTypeValue }}</view>
				</view>
				<view class="text_box">
					<view class="left">投诉内容:</view>
					<view>{{ data?.complainContent }}</view>
				</view>
				<view class="text_box" v-if="data!.evidenceImg.length > 0">
					<view class="left">证据图片:</view>
					<view class="img_box">
						<u-image
							@click="showPreviewImage(data!.evidenceImg as any, index)"
							v-for="(item, index) in data!.evidenceImg"
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
import { useComplaint } from '@/store';
import { showPreviewImage } from '@/utils/utils';
type Props = {
	show: boolean;
};
type Emits = {
	(e: 'close'): void;
};
defineProps<Props>();
const emits = defineEmits<Emits>();
const { data } = useComplaint();
const close = () => {
	emits('close');
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
