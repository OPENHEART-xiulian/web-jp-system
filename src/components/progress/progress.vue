<template>
	<view class="content">
		<view class="width615 flexs">
			<view class="bg1">
				<view class="bg2" :style="{ height: width + '%' }"></view>
			</view>
			<view class="yuans flexs2">
				<image :src="$src('/my/wc-icon.png')"></image>
				<template v-for="(item, index) in sums" :key="index">
					<image
						:src="$src('/my/wc-icon.png')"
						v-if="
							width > (100 / sums) * item ||
							width / sums == 100 / sums ||
							width == (100 / sums) * item
						"
					></image>
					<image v-else :src="$src('/my/wwc-icon.png')"></image>
				</template>
			</view>
		</view>
		<view class="flexs2 p_bot size24 text-gray">
			<view class="list_box" v-for="(item, index) in list" :key="index">
				<view class="title">{{ item.title }}</view>
				<view v-if="item?.msg" class="msg">{{ item?.msg }}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { $src } from '@/utils/utils';
interface Props {
	StepInfo: {
		Current: number; //百分比
		Sum: number; //共多少步骤
	};
	list: {
		title: string;
		msg?: string;
	}[];
}
const props = defineProps<Props>();
const width = ref(0);
const sums = ref(0);
watchEffect(() => {
	const {
		StepInfo: { Current, Sum },
	} = props;
	width.value = Current;
	sums.value = Sum - 1;
});
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	height: 630rpx;
}
.width615 {
	height: 630rpx;
	width: 32rpx;
	margin-right: 20rpx;
	position: relative;
	.bg1 {
		height: 98%;
		width: 4rpx;
		background: #dddddd;
		.bg2 {
			height: 100%;
			background: #fddc13;
		}
	}
	.yuans {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		image {
			width: 32rpx;
			height: 32rpx;
		}
		.width32 {
			width: 32rpx;
			height: 32rpx;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			view {
				background: #dddddd;
				width: 22rpx;
				height: 22rpx;
				border-radius: 50%;
			}
		}
	}
}
.flexs {
	display: flex;
	justify-content: center;
	align-items: center;
}

.flexs1 {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.flexs2 {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	height: 100%;
}

.flexs3 {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.btns {
	width: 690rpx;
	height: 90rpx;
	border-radius: 45rpx;
	background: #3687f7;
	font-size: 30rpx;
	color: #ffffff;
	text-align: center;
	line-height: 90rpx;
}
.btns2 {
	width: 690rpx;
	height: 80rpx;
	border-radius: 8rpx;
	background: #3687f7;
	color: #ffffff;
	text-align: center;
	line-height: 80rpx;
}
.size24 {
	font-size: 24rpx;
}
.size26 {
	font-size: 26rpx;
}
.size30 {
	font-size: 30rpx;
}
.size32 {
	font-size: 32rpx;
}
.size20 {
	font-size: 20rpx;
}
.text-gray {
	color: #999999;
	view {
		height: 32rpx;
	}
	line-height: 32rpx;
}
.text-grey {
	color: #666666;
}
.cuIcon-back {
	font-size: 40rpx;
}
.list_box {
	width: 100%;
	text-align: left;
	flex-direction: column;
	display: flex;
	justify-content: center;
	gap: 10rpx;
	.title {
		font-size: 30rpx;
		font-weight: bold;
		color: #000;
		line-height: 32rpx;
	}
	.msg {
		color: #969696;
		font-size: 28rpx;
	}
}
</style>
