<template>
	<view class="two">
		<view class="content">
			<uni-collapse accordion>
				<uni-collapse-item v-for="item in model.typeList" :key="item.id">
					<template v-slot:title>
						<view class="tite_box">
							<image :src="_src(JSON.parse(item.img)[0])" class="img" />
							<view class="u_collapse_title">
								<view class="u_head">{{ item.value }}</view>
								<view>{{ item.remark }}</view>
							</view>
						</view>
					</template>
					<view class="uni_content">
						<view
							@click="selectFn(val)"
							:class="{
								u_conten: true,
								u_select: val.id == model.complainTypeId,
							}"
							v-for="val in item.children"
							:key="val.id"
						>
							<view>{{ val.value }}</view>
							<view class="icon">
								<u-icon name="checkmark" color="#fff" size="16"></u-icon>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { getComplaintTypeTree } from '@/api/api';
import { _src } from '@/utils/utils';
import type { ModelType } from '../../index.vue';
import { useUserInfo } from '@/store/userStore';
interface Props {
	model: ModelType;
}
const store = useUserInfo();
const props = defineProps<Props>();
const selectFn = (item: any) => {
	props.model.complainTypeId = item.id;
	props.model.complainTypeValue = item.value;
	props.model.isTrue = true;
};
const getDataList = (trainingId: number) => {
	const { roleId, userId } = store.getUser()!;
	getComplaintTypeTree({ roleId, userId, trainingId }).then((res: any) => {
		props.model.typeList = res.data;
	});
};
defineExpose({
	getDataList,
});
</script>

<style scoped lang="scss">
.two {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 20rpx 40rpx;
	margin-bottom: 120rpx;
	.content {
		max-height: 900rpx;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.tite_box {
		display: flex;
		gap: 20rpx;
		align-items: center;
		padding: 20rpx 0;
		.img {
			width: 80rpx;
			height: 80rpx;
			display: block;
		}
		.u_collapse_title {
			height: 100rpx;
			padding: 6rpx 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 24rpx;
			color: #909193;

			.u_head {
				font-size: 32rpx;
				color: #000;
			}
			.icon {
				display: none;
			}
		}
	}
	.u_conten {
		position: relative;
		font-size: 28rpx;
		color: #909193;
		margin-bottom: 10rpx;
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
