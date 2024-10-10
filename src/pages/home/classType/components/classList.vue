<template>
	<view>
		<view class="list_class">
			<view
				v-for="(ele, index) in currentPageData.banxingList"
				:key="index"
				class="list_item"
				@click="goDetail(ele)"
			>
				<view class="title_line">
					<text style="color: black">{{ ele.schoolName }} </text>
					<text>距离你{{ ele.distance }}km</text>
				</view>
				<view class="content">
					<image :src="$src('/home/ban7.png')" />
					<view class="item_right">
						<view style="justify-content: space-between">
							<text style="font-size: 28rpx; font-weight: normal; color: black"
								>{{ ele.className }}
							</text>
							<view>
								<text style="color: #e4393c">¥</text>
								<text style="color: #e4393c">{{ ele.trainingExpenses }} </text>
							</view>
						</view>
						<view class="type">
							<u-tag
								:text="ele.carTypeName"
								bgColor="#018f64"
								borderColor="#018f64"
								color="#fff"
								size="mini"
								type="warning"
							/>
						</view>
						<view style="margin-top: 10rpx; font-size: 24rpx; color: #969696">
							训练时段：{{ ele.trainingTime }}
						</view>
					</view>
				</view>
			</view>
			<u-loadmore
				v-if="currentPageData.banxingList.length != 0"
				:marginTop="40"
				:status="
					currentPageData.banxingList.length < currentPageData.totalPage
						? 'loadmore'
						: 'nomore'
				"
				line
				@loadmore="loadmore"
			/>
		</view>
		<noData v-if="currentPageData.banxingList.length == 0"></noData>
	</view>
</template>

<script lang="ts" setup>
import noData from '@/components/noData/index.vue';
import { $src } from '@/utils/utils';
import { getBanXing } from '@/api/api';

interface Props {
	requestData: {
		type: any;
		[key: string]: any;
	};
}

const total = ref(0);
const props = defineProps<Props>();
const currentPageData: any = reactive({
	banxingList: [],
});
const loadmore = () => {
	if (currentPageData.banxingList.length < total.value) {
		props.requestData.pageNumber += 1;
		loadData();
	}
};
onReachBottom(loadmore);
onShow(() => {
	loadData();
});
const goDetail = function (data: any) {
	uni.navigateTo({
		url: './classTypeDetail?id=' + data.classId,
	});
};
const loadData = function () {
	getBanXing(props.requestData).then((res: any) => {
		total.value = res.data.total;
		if (res.data.pageNumber == 1) {
			currentPageData.banxingList = res.data.list;
		} else {
			currentPageData.banxingList = currentPageData.banxingList.concat(
				res.data.list
			);
		}
	});
};
const resetData = () => {
	currentPageData.banxingList = [];
	props.requestData.pageNumber = 1;
};
defineExpose({
	loadData,
	resetData,
});
</script>

<style lang="scss" scoped>
.list_class {
	width: 100%;
	flex-grow: 1;

	.list_item {
		width: 100%;
		background: white;
		margin-bottom: 22rpx;
		border-radius: 20rpx;
		font-size: 16px;
		color: #969696;
		padding: 24rpx 40rpx;
		box-sizing: border-box;

		.content {
			width: 100%;
			height: 154rpx;
			display: flex;
			margin-bottom: 14rpx;
			align-items: center;

			> image {
				display: block;
				width: 112rpx;
				height: 112rpx;
			}

			.item_right {
				display: flex;
				flex-direction: column;
				margin-left: 26rpx;
				color: #000000;
				flex-grow: 1;

				.type {
					margin-top: 12rpx;

					> text {
						margin-right: 10rpx;
						background: green;
						font-size: 20rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: white;
						padding: 5rpx 10rpx;
						border-radius: 4px;
						font-weight: normal;
					}
				}

				> view {
					display: flex;
					align-items: center;

					> text {
						font-weight: bold;
						color: #969696;
					}

					> image {
						display: block;
						width: 18rpx;
						height: 18rpx;
					}
				}
			}
		}

		.title_line {
			width: 100%;
			display: flex;
			font-size: 12px;
			height: 52rpx;
			justify-content: space-between;
			border-bottom: 1px solid #f8f7f8;
		}
	}
}
</style>
