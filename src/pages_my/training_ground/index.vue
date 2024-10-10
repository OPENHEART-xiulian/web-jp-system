<template>
	<view class="shift_type" v-if="list.length > 0">
		<view
			@click="toDetailsPages(item)"
			class="list_box"
			v-for="item in list"
			:key="item.id"
		>
			<u-image
				:showLoading="true"
				:src="_src(JSON.parse(item.headSculpture as string)[0])"
				width="146rpx"
				height="106rpx"
			/>
			<view class="right">
				<view class="top">
					<view>{{ item.addressName }}</view>
					<view>{{ item.subjectName }}</view>
				</view>
				<view class="bottom">{{ item.address }}</view>
			</view>
		</view>
		<u-loadmore :marginTop="40" :status="status" line />
	</view>
	<no-data v-else />
</template>

<script lang="ts" setup>
import { getBranchCampusList } from '@/api/api';
import noData from '@/components/noData/index.vue';
import { useUserInfo } from '@/store/userStore';
import { _src } from '@/utils/utils';
export type ListType = {
	address: string;
	addressName: string;
	addressPhoto: string[];
	dtSchoolId: string;
	id: string;
	phoneNumber?: string;
	headSculpture?: string;
	remarks: string;
	subjectName: string;
};
const status = ref('nomore');
const list = ref<ListType[] | []>([]);
const getList = () => {
	const schoolId = useUserInfo().getUserMsg()!.schoolId;
	getBranchCampusList({ schoolId })
		.then((result: any) => {
			list.value = result.data;
		})
		.finally(() => {
			uni.stopPullDownRefresh();
		});
};
const toDetailsPages = (item: ListType) => {
	const data = JSON.stringify(item);
	uni.navigateTo({
		url: '/pages_my/training_ground_details/index?data=' + data,
	});
};
onShow(getList);
onPullDownRefresh(getList);
</script>

<style scoped lang="scss">
.shift_type {
	padding: 20rpx 30rpx 0;
	.list_box {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: flex-start;
		.right {
			flex: 1;
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			min-height: 106rpx;
			.top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-weight: bold;
				font-size: 26rpx;
			}
			.bottom {
				margin-top: 20rpx;
				font-size: 24rpx;
				color: #969696;
			}
		}
	}
}
</style>
