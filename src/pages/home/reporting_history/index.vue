<template>
	<view class="my_complaint">
		<view class="list" v-for="item in listData" @click="toDetailsFn(item)" :key="item.id">
			<view class="top">
				<view>{{ item.createTime }}</view>
				<view class="text">{{ statusList[item.status - 1] }}</view>
			</view>
			<view class="bottom">
				<view class="title">{{ item.reportTypeParentName }}</view>
				<view>
					{{ item.schoolOrCoachName }}
				</view>
			</view>
		</view>
		<no-data v-if="listData.length == 0" />
	</view>
	<details-component v-if="data" :data="data" v-model:show="show"></details-component>
</template>

<script lang="ts" setup>
import detailsComponent from './components/details/index.vue';
import { getUserReportList } from '@/api/api';
import noData from '@/components/noData';
import { _src } from '@/utils/utils';
import { useUserInfo } from '@/store/userStore';
export interface ListType {
	city: string;
	county: string;
	remark: string;
	img: string;
	region: string;
	reportTypeId: string;
	reportTypeName: string;
	schoolOrCoachAddress: string;
	schoolOrCoachName: string;
	userId: string;
	userName: string;
	userCardNumber: string;
	userPhoneNumber: string;
	reportTypeParentName: string;
	reportTypeParentId: number;
	id: string;
	status: number;
	createTime: string;
	createBy: string;
}
const store=useUserInfo();
const show = ref(false);
const statusList = ['已提交'];
const { userId } = store.getUser()!;
const listData = ref<ListType[]>([]);
const data = ref<ListType>();
const toDetailsFn = (item: ListType) => {
	data.value = item;
	show.value = true;
};
onShow(() => {
	getUserReportList({ userId }).then((res: any) => {
		res.data = res.data.map((v: ListType) => {
			v.img = JSON.parse(_src(v!.img));
			return v;
		});
		listData.value = res.data;
	});
});
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
			font-size: 28rpx;
		}
		.bottom {
			padding: 30rpx 0;
			font-size: 28rpx;
			color: #999;
			.title {
				font-size: 30rpx;
				margin-bottom: 10rpx;
				color: #000;
			}
		}
	}
}
</style>
