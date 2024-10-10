<template>
	<view class="container">
		<view
			class="item"
			v-for="ele in currentPageData.xunlianchangList"
			@click="goDetail(ele.id)"
		>
			<image :src="_src(JSON.parse(ele.headSculpture)[0])" mode="aspectFill" />
			<view style="flex: 1; overflow: hidden">
				<text style="font-size: 28rpx; font-weight: 700">{{
					ele.addressName
				}}</text>
				<view style="margin-top: 10rpx">
					<u-tag
						:text="ele.cultivateType"
						bgColor="#018f64"
						borderColor="#018f64"
						color="#fff"
						size="mini"
						type="warning"
					/>
				</view>
				<view
					style="
						width: 100%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #969696;
						display: block;
						font-size: 28rpx;
					"
				>
					{{ ele.address }}
				</view>
			</view>
			<view style="font-size: 24rpx">
				<view style="white-space: nowrap">{{ ele.region }} </view>
				<view>{{ ele.distance }}km </view>
				<view>{{ ele.subjectName }}</view>
			</view>
		</view>
		<u-loadmore
			v-if="currentPageData.xunlianchangList.length != 0"
			:marginTop="20"
			:marginBottom="40"
			status="nomore"
			line
		/>
	</view>
</template>

<script setup lang="ts">
import { _src } from '@/utils/utils';
import { getXunLianChangList } from '@/api/api';
const currentPageData: any = reactive({
	id: '',
	xunlianchangList: [],
});
const goDetail = (id: string) => {
	uni.navigateTo({
		url: './trainAreaDetail?id=' + id,
	});
};
onLoad((option: any) => {
	currentPageData.id = option.id;
	const { latitude, longitude } = uni.getStorageSync('userLat_long');
	getXunLianChangList({
		schoolId: currentPageData.id,
		latitude,
		longitude,
	}).then((res: any) => {
		currentPageData.xunlianchangList = res.data;
	});
});
</script>

<style scoped lang="scss">
.container {
	padding: 30rpx;
	box-sizing: border-box;

	.item {
		display: flex;
		align-items: center;
		background: white;
		min-height: 160rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		justify-content: space-between;
		gap: 20rpx;

		> image {
			display: block;
			width: 112rpx;
			height: 112rpx;
		}

		> view {
			// margin-top: 20rpx;

			> view {
				display: flex;
				margin-bottom: 4rpx;
			}
		}
	}
}
</style>
