<template>
	<view class="train_list">
		<view class="list">
			<view class="list_box" v-for="item in list" :key="item.id">
				<u-image
					:src="_src(JSON.parse(item.headSculpture)[0] ?? '')"
					width="110rpx"
					height="144rpx"
				></u-image>
				<view class="left">
					<view class="name">
						教练名字
						<u-text size="28rpx" lines="1" bold :text="item.name" />
					</view>
					<view class="cx">
						执教车型
						<u-text lines="1" size="28rpx" bold :text="item.teachCarType" />
					</view>
					<view class="introduce"
						><u-text size="22rpx" color="#969696" :text="item.remark"
					/></view>
				</view>
			</view>
			<no-data v-if="list.length == 0" />
			<u-loadmore v-else :marginTop="40" :status="status" line />
		</view>
	</view>
</template>

<script lang="ts" setup>
import { _src } from '@/utils/utils';
import { useUserInfo } from '@/store/userStore';
import { getCoachList } from '@/api/api';
import noData from '@/components/noData/index.vue';
type ListType = {
	cardNum: string;
	id: string;
	name: string;
	phoneNumber: string;
	post: string;
	remark: string;
	schoolName: string;
	teachCarType: string;
	yearsOfTeaching: string;
	headSculpture: string;
}[];
const status = ref('nomore');
const store = useUserInfo();
const userId = store.getUser()!.userId;
const list = ref<ListType | []>([]);
const getList = () => {
	getCoachList({ userId })
		.then((result: any) => {
			list.value = result.data;
		})
		.finally(() => {
			uni.stopPullDownRefresh();
		});
};
onShow(getList);
onPullDownRefresh(getList);
</script>

<style scoped lang="scss">
.train_list {
	padding: 10rpx 30rpx;
	.list_box {
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		padding: 30rpx;
		display: flex;
		align-items: center;
		.left {
			margin-left: 40rpx;
			flex: 1;
			.name,
			.cx {
				font-size: 30rpx;
				display: flex;
				align-items: center;
				gap: 20rpx;
			}
			.name {
				margin-bottom: 20rpx;
			}
		}
	}
}
</style>
