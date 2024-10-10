<template>
	<u-popup
		:show="show"
		:closeOnClickOverlay="true"
		@close="emits('close')"
		:round="10">
		<view class="content">
			<view class="head">
				<view
					class="qx"
					@click="emits('close')"
					>取消</view
				>
				<view>投诉场地选择</view>
				<view
					class="qd"
					@click="define"
					>确定</view
				>
			</view>
			<view class="list">
				<view
					@click="currentIndex = index"
					v-for="(item, index) in schoollist"
					:key="item.spaBranchCampusId"
					:class="{ u_conten: true, u_select: index == currentIndex }">
					<view class="address">
						训练场名称：{{ item.spaBranchCampusName }}</view
					>
					<view class="address">
						训练场地址：{{ item.spaBranchCampusAddress }}
					</view>
					<view class="icon">
						<u-icon
							name="checkmark"
							color="#fff"
							size="16"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script lang="ts" setup>
type Props = {
	show: boolean;
	schoollist: {
		spaBranchCampusId: string;
		spaBranchCampusName: string;
		spaBranchCampusAddress: string;
	}[];
	schollIndex: number;
};
type Emits = {
	(e: 'close'): void;
	(e: 'updataIndex', index: number): void;
};
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const currentIndex = ref(0);
watchEffect(() => {
	if (props.show) {
		currentIndex.value = props.schollIndex;
	}
});
const define = () => {
	emits('updataIndex', currentIndex.value);
	emits('close');
};
</script>

<style scoped lang="scss">
.content {
	padding: 0 30rpx;
	min-height: 400rpx;
	.list {
		max-height: 600rpx;
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
	.u_conten {
		position: relative;
		font-size: 28rpx;
		color: #909193;
		margin-bottom: 20rpx;
		background-color: #fbfbfb;
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
	.address {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
