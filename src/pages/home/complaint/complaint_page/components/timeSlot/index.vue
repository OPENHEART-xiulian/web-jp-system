<template>
	<u-popup :show="show" :closeOnClickOverlay="true" @close="emits('close')" :round="10">
		<view class="content">
			<view class="head" @touchmove.stop.prevent="() => {}">
				<view class="qx" @click="emits('close')">取消</view>
				<view>选择培训时段</view>
				<view class="qd" @click="define">确定</view>
			</view>
			<view class="bottomConten">
				<uni-collapse accordion>
					<uni-collapse-item v-for="(item, index) in trainingList" :key="index">
						<template v-slot:title>
							<view class="u_collapse_title">
								<view class="u_head">{{ item.subjectName }}</view>
								<view>{{ item.subjectTime }}</view>
							</view>
						</template>
						<view class="uni_content">
							<view
								:class="{
									u_conten: true,
									u_select: index == currentIndex[0] && i == currentIndex[1],
								}"
								v-for="(val, i) in item.trainingTimeList"
								:key="i"
								@click="currentIndex = [index, i]"
							>
								<view>开始时间：{{ val.startTime }}</view>
								<view>结束时间：{{ val.endTime }}</view>
								<view class="icon">
									<u-icon name="checkmark" color="#fff" size="16"></u-icon>
								</view>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
	</u-popup>
</template>

<script lang="ts" setup>
type Props = {
	show: boolean;
	trainingList: {
		subjectName: string;
		subjectTime: string;
		trainingTimeList: {
			startTime: string;
			endTime: string;
		}[];
	}[];
	timeIndexList: number[];
};
type Emits = {
	(e: 'close'): void;
	(e: 'define', list: number[]): void;
};
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const currentIndex = ref<number[]>([]);
watchEffect(() => {
	if (props.show) {
		currentIndex.value = props.timeIndexList;
	}
});
const define = () => {
	emits('define', currentIndex.value);
	emits('close');
};
</script>

<style scoped lang="scss">
.content {
	padding: 0 30rpx;
	.bottomConten {
		min-height: 400rpx;
		max-height: 800rpx;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.head {
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;
		font-size: 30rpx;
		.qx {
			color: #909193;
		}
		.qd {
			color: #fddc13;
		}
	}
	.u_collapse_title{
		margin-top: 10rpx;
	}
	.u_collapse_title,
	.u_conten {
		position: relative;
		font-size: 28rpx;
		color: #909193;
		margin-bottom: 10rpx;
		display: flex;
		flex-direction: column;
		gap: 10rpx;
		.u_head {
			font-size: 28rpx;
			color: #000;
		}
		.icon {
			display: none;
		}
	}
	.u_conten {
		padding: 20rpx 30rpx;
		background-color: #fbfbfb;
		color: #000;
	}
	.u_select {
		background-color: #fffdf4;

		&::after {
			content: '';
			height: 100%;
			width: 10rpx;
			background-color: #fddc13;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-left: 4rpx;
			height: 50rpx;
			width: 50rpx;
			text-align: center;
			background-color: #fddc13;
			position: absolute;
			right: 0;
			top: 0;
			border-bottom-left-radius: 100%;
		}
	}
}
</style>
