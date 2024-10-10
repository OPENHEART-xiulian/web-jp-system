<template>
	<u-popup
		:show="show"
		closeOnClickOverlay
		@close="emits('close')"
		:round="10">
		<view class="content">
			<view class="head">
				<view
					class="qx"
					@click="emits('close')"
					>取消</view
				>
				<view
					class="qd"
					@click="define"
					>确定</view
				>
			</view>
			<view class="title">请选择训练日</view>
			<view class="week_list">
				<view
					:class="{
						week_box: true,
						select: index == endIndex || index == startIndex,
						select_zj: index < endIndex && index > startIndex,
					}"
					v-for="(item, index) in weekList"
					@click="selectFn(index)"
					:key="item">
					{{ item }}
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script lang="ts" setup>
type Props = {
	show: boolean;
	startDate: string;
	endDate: string;
};
type Emits = {
	(e: 'close'): void;
	(
		e: 'define',
		res: {
			startDate: string;
			endDate: string;
		}
	): void;
};
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const startIndex = ref(0); //开始
const endIndex = ref(0); //结束
const isOddNumber = ref(true);
watch(props, () => {
	if (props.show) {
		const { startDate, endDate } = props;
		startIndex.value =
			weekList.indexOf(startDate) < 0 ? 0 : weekList.indexOf(startDate);
		endIndex.value =
			weekList.indexOf(startDate) < 0 ? 0 : weekList.indexOf(endDate);
		isOddNumber.value = startIndex.value == endIndex.value ? false : true;
	}
});
const selectFn = (index: number) => {
	const start = startIndex.value;
	if (isOddNumber.value) {
		startIndex.value = index;
		endIndex.value = index;
		isOddNumber.value = false;
	} else {
		if (index <= start) {
			startIndex.value = index;
			endIndex.value = index;
		} else {
			endIndex.value = index;
			isOddNumber.value = true;
		}
	}
};
const define = () => {
	emits('define', {
		startDate: weekList[startIndex.value],
		endDate: weekList[endIndex.value],
	});
	emits('close');
};
</script>

<style scoped lang="scss">
.content {
	padding: 0 30rpx;
	.head {
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;
		font-size: 30rpx;
		.qx {
			color: #909193;
		}
		.qd {
			color: #3c9cff;
		}
	}
	.title {
		margin: 20rpx 0;
	}
	.week_list {
		display: grid;
		grid-template-columns: repeat(auto-fill, 150rpx); //自动填充，每个单元270
		grid-gap: 20rpx;
		justify-content: space-between;
		padding-bottom: 40rpx;
		.week_box {
			width: 150rpx;
			height: 60rpx;
			line-height: 58rpx;
			text-align: center;
			color: #ccc;
			border-radius: 10rpx;
			border: 2rpx solid rgba($color: #000, $alpha: 0.1);
			box-sizing: border-box;
			font-size: 24rpx;
		}
		.select {
			background-color: #fddc13;
			color: #fff;
			border-color: #fddc13;
		}
		.select_zj {
			background-color: rgba($color: #fddc13, $alpha: 0.1);
			color: #fddc13;
			border-color: rgba($color: #fddc13, $alpha: 0.1);
		}
	}
}
</style>
