<template>
	<view class="shift_type">
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
				<view class="top bottom_box">
					<view>{{
						item.account ? '账号:' + item.account : '暂未设置账号'
					}}</view>
					<view class="bottom">设置登录账号</view>
				</view>
			</view>
		</view>
		<no-data v-if="list.length == 0" />
		<u-loadmore v-else :marginTop="40" :status="status" line />
	</view>
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
	account: string;
};
const status = ref('nomore');
const list = ref<ListType[] | []>([]);
const schoolId = useUserInfo().getUserMsg()!.schoolId;
const getList = () => {
	getBranchCampusList({ schoolId })
		.then((result: any) => {
			list.value = result.data;
		})
		.finally(() => {
			uni.stopPullDownRefresh();
		});
};
const toDetailsPages = (item: ListType) => {
	uni.navigateTo({
		url: `/pages_my/setup_account/index?id=${item.id}&phoneNumber=${
			item.account ?? ''
		}`,
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
		align-items: center;
		.right {
			flex: 1;
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 106rpx;
			.top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-weight: bold;
				font-size: 26rpx;
			}
			.bottom_box {
				font-weight: 500;
				font-size: 24rpx;
			}
			.bottom {
				background-color: #fddc13;
				color: #fff;
				text-align: center;
				width: 154rpx;
				height: 40rpx;
				line-height: 40rpx;
				font-size: 20rpx;
				font-weight: bold;
				border-radius: 20rpx;
			}
		}
	}
}
</style>
