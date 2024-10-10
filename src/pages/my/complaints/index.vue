<template>
	<view class="tabTitle">
		<view
			@click="selectFn(index)"
			:class="{ t_box: true, select: selectIndex == index }"
			v-for="(item, index) in titleList"
			:key="item"
		>
			{{ item }}
			<u-badge
				v-if="index == 1"
				:offset="['0', '0']"
				absolute
				type="error"
				max="99"
				:value="paramsData.pendingNewNumber"
			></u-badge>
		</view>
	</view>
	<view class="my_complaint">
		<view
			class="list"
			v-for="item in listData"
			@click="toDetailsFn(item)"
			:key="item.id"
		>
			<view class="top">
				<view>{{ item.complainSubTime }}</view>
				<view class="text">
					{{ statusList[item.handlingStatusId - 1] }}
					<text v-if="item.acceptanceStatus == 1">{{ item?.time }}</text></view
				>
			</view>
			<view class="bottom">
				<view class="title">{{ item.complainTypeValue }}</view>
				<view
					>{{ item.spaBranchCampusName }}
					{{ item.spaCoachName && '/ ' + item.spaCoachName }}
				</view>
			</view>
			<view class="btn" v-if="item.acceptanceStatus == 1">
				<button class="u-reset-button">去处理</button>
			</view>
		</view>
		<no-data height="900rpx" v-if="listData.length == 0" />
		<u-loadmore
			v-else
			:marginTop="40"
			@loadmore="loadmore"
			:status="listData.length < paramsData.total ? 'loadmore' : 'nomore'"
			line
		/>
	</view>
</template>

<script lang="ts" setup>
import { viewComplainProgress } from '@/api/api';
import { useComplaint } from '@/store';
import { useUserInfo } from '@/store/userStore';
import noData from '@/components/noData';
import { IntervalTime, _src } from '@/utils/utils';
import { useListData } from '@/hooks';
import type { ListType } from '@/pages_my/my_complaint/index.vue';
const store = useComplaint();
const statusList = ['待处理，剩余', '等待学员确认', '已完结', '已转送'];
const titleList = ['全部', '待处理', '待确认', '已完结', '已转送'];
const { roleId, userId } = useUserInfo().getUser()!;
const selectIndex = ref(0);
const toDetailsFn = (item: ListType) => {
	store.data = item;
	uni.navigateTo({ url: '/pages/my/school_complaints/index' });
};
const callbackFn = (list: ListType[]) => {
	return list?.map((v: ListType) => {
		v.evidenceImg = JSON.parse(_src(v!.evidenceImg));
		if (v.acceptanceStatus == 1) {
			v.time = IntervalTime(v.createTime);
		}
		return v;
	});
};
const {
	getData,
	loadmore,
	resetData,
	setParams,
	list: listData,
	paramsData,
} = useListData<ListType>({
	getFn: viewComplainProgress,
	callbackFn,
	params: { roleId, userId, handlingStatusId: null },
	pageSize: 10,
	pageNumber: 1,
});
onShow(() => {
	resetData();
	getData();
});
const selectFn = (index: number) => {
	if (index == selectIndex.value) return;
	selectIndex.value = index;
	setParams({
		handlingStatusId: !!selectIndex.value ? selectIndex.value : null,
		pageNumber: 1,
	});
	getData();
};
</script>

<style scoped lang="scss">
.my_complaint {
	padding: 0 30rpx;
	.list {
		padding: 0 40rpx;
		border-radius: 10rpx;
		background-color: #fff;
		margin-top: 30rpx;
		.top {
			border-bottom: 2rpx solid #e8e8e8;
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 80rpx;
			color: #999999;
			font-size: 26rpx;
			text {
				color: #fd8900;
			}
		}
		.bottom {
			padding: 20rpx 0;
			font-size: 28rpx;
			color: #999;
			.title {
				font-size: 30rpx;
				margin-bottom: 10rpx;
				font-weight: bold;
				color: #000;
			}
		}
		.btn {
			width: 100%;
			display: flex;
			height: 100rpx;
			justify-content: flex-end;
			align-items: center;
			border-top: 2rpx solid #e8e8e8;
			.u-reset-button {
				height: 50rpx;
				font-size: 26rpx;
				background-color: #fddc13;
				line-height: 50rpx;
				padding: 0 20rpx;
				margin: 0 0 0 auto;
			}
		}
	}
}
.tabTitle {
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	margin-top: 20rpx;
	.t_box {
		width: 25%;
		line-height: 80rpx;
		text-align: center;
		position: relative;
		font-size: 28rpx;
	}
	.select {
		color: #fddc13;
		font-weight: bold;
		&::after {
			display: block;
			content: '';
			width: 60%;
			height: 6rpx;
			background-color: #fddc13;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}
}
</style>
