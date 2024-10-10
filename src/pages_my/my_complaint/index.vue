<template>
	<view class="my_complaint">
		<view
			v-for="item in listData"
			:key="item.id"
			class="list"
			@click="toDetailsFn(item)"
		>
			<view class="top">
				<view>{{ item.complainSubTime }}</view>
				<view class="text">
					{{ statusList[item.acceptanceStatus] }}
					<text v-if="item.acceptanceStatus == 2">{{ item?.time }} </text>
				</view>
			</view>
			<view class="bottom">
				<view class="title">{{ item.complainTypeValue }}</view>
				<view
					>{{ item.spaBranchCampusName }}
					{{ item.spaCoachName && '/ ' + item.spaCoachName }}
				</view>
			</view>
			<view v-if="item.acceptanceStatus == 2" class="btn">
				<button class="u-reset-button">去确认</button>
			</view>
		</view>
		<no-data v-if="listData.length == 0" />
		<u-loadmore
			v-else
			:marginTop="40"
			:status="listData.length < paramsData.total ? 'loadmore' : 'nomore'"
			line
			@loadmore="loadmore"
		/>
	</view>
</template>

<script lang="ts" setup>
import { viewComplainProgress } from '@/api/api';
import { useComplaint } from '@/store';
import noData from '@/components/noData';
import { _src, IntervalTime } from '@/utils/utils';
import { useListData } from '@/hooks';
import { useUserInfo } from '@/store/userStore';

export interface ListType {
	acceptanceStatus: number;
	complainClTime: string;
	complainContent: string;
	complainOverTime: string;
	complainShTime: string;
	complainSubTime: string;
	complainTypeId: string;
	complainTypeValue: string;
	createBy: string;
	createTime: string;
	drivingTrainingInstitutionContent: string;
	endTime: string;
	evidenceImg: string;
	id: string;
	manageDepartmentContent: string;
	spaBranchCampusId: string;
	spaBranchCampusName: string;
	spaCoachId: string;
	spaCoachName: string;
	spaSchoolId: string;
	spaSchoolName: string;
	spaStudentId: string;
	spaStudentName: string;
	startTime: string;
	trainingName: string;
	updateBy: string;
	updateTime: string;
	userCardNumber: string;
	userId: string;
	userName: string;
	userPhoneNumber: string;
	handlingPlan: string;
	disagreeCause: string;
	time?: string;
	studentAgreeOrNotId: number;
	handlingStatusId: number;
}

const store = useComplaint();
const statusList = [
	'投诉提交',
	'等待驾校处理',
	'待确认，剩余',
	'已完结',
	'已转送',
];
const userInfo = useUserInfo();
const toDetailsFn = (item: ListType) => {
	store.data = item;
	uni.navigateTo({ url: '/pages_my/complaint_details/index' });
};
const callbackFn = (list: ListType[]) => {
	list = list?.map((v: ListType) => {
		v.evidenceImg = JSON.parse(_src(v!.evidenceImg));
		if (v.acceptanceStatus == 2) {
			v.time = IntervalTime(v.complainShTime);
		}
		return v;
	});
	return list;
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
	params: {
		roleId: userInfo.getUser()?.roleId ?? '',
		userId: userInfo.getUser()?.userId ?? '',
	},
	pageSize: 20,
	pageNumber: 1,
});
onShow(() => {
	if (userInfo.getToken(true)) {
		const { roleId, userId } = userInfo.getUser()!;
		if (roleId == 1) {
			resetData();
			setParams({ roleId, userId });
			getData();
		} else {
			uni.switchTab({ url: '/pages/my/my_page/index' });
		}
	}
});
</script>

<style lang="scss" scoped>
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
				color: #fddc13;
			}
		}

		.bottom {
			padding: 20rpx 0;
			font-size: 24rpx;
			color: #999;

			.title {
				font-size: 30rpx;
				margin-bottom: 10rpx;
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
</style>
