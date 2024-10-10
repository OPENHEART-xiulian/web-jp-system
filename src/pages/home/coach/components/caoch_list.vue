<template>
	<view>
		<view class="list_class">
			<template v-if="currentPageData.caochList.length > 0">
				<view
					class="list_item"
					v-for="(ele, index) in currentPageData.caochList"
					:key="index"
					@click="goDetail(ele)"
				>
					<view class="content">
						<image :src="ele.dtImg" mode="aspectFill" />
						<view class="item_right">
							<view>
								<text style="font-size: 32rpx; font-weight: bold"
									>{{ ele.dtCoachName || ele.spaCoachName }}
								</text>
							</view>
							<view style="margin-top: 10rpx; font-size: 24rpx; color: #969696">
								所属：<text
									style="
										width: 200rpx;
										overflow: hidden;
										white-space: nowrap;
										text-overflow: ellipsis;
									"
								>
									{{ ele.spaSchoolName }}
								</text>
								| 距离你{{ ele.distance }}km
							</view>
							<view class="type">
								<u-tag
									v-if="ele.spaTeachCarType"
									:text="ele.spaTeachCarType"
									bgColor="#018f64"
									borderColor="#018f64"
									color="#fff"
									size="mini"
									type="warning"
								/>

								<text
									v-if="ele.spaYearsOfTeaching"
									style="
										border-radius: 6rpx;
										background: linear-gradient(to right, #fb7099, #fedc45);
									"
								>
									{{ ele.spaYearsOfTeaching }}年经验
								</text>
								<text
									style="
										border-radius: 6rpx;
										background: linear-gradient(to right, #4760ff, #0dccff);
									"
									v-if="ele.spaPost"
								>
									{{ ele.spaPost }}
								</text>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore
					v-if="currentPageData.caochList.length != 0"
					:marginTop="40"
					@loadmore="loadmore"
					:status="
						currentPageData.caochList.length < currentPageData.totalPage ? 'loadmore' : 'nomore'
					"
					line
				/>
			</template>
		</view>
		<noData v-if="currentPageData.caochList.length == 0"></noData>
	</view>
</template>

<script setup lang="ts">
import noData from '@/components/noData/index.vue';
import { _src } from '@/utils/utils';
import { getCaochList } from '@/api/api';
interface Props {
	requestData: any;
}
const props = defineProps<Props>();

const currentPageData: any = reactive({
	caochList: [],
	totalPage: 0,
});
const goDetail = function (data: any) {
	uni.navigateTo({
		url: './coachDetail?id=' + data.spaCoachId,
	});
};
const loadmore = () => {
	if (currentPageData.caochList.length < currentPageData.totalPage) {
		props.requestData.pageNumber += 1;
		loadData();
	}
};
onReachBottom(loadmore);
const loadData = () => {
	getCaochList(props.requestData).then((res: any) => {
		res.data.list = res.data.list.map((ele: any) => {
			ele.dtImg = JSON.parse(_src(ele.dtImg))
			return ele;
		});
		if (res.data.pageNumber == 1) {
			currentPageData.caochList = res.data.list;
		} else {
			currentPageData.caochList = currentPageData.caochList.concat(res.data.list);
		}
		currentPageData.totalPage = res.data.total;
	});
};
onShow(() => {
	loadData();
});
const resetData = () => {
	currentPageData.caochList = [];
	props.requestData.pageNumber = 1;
};
defineExpose({
	loadData,
	resetData,
});
</script>

<style scoped lang="scss">
.list_class {
	width: 100%;
	flex-grow: 1;

	.list_item {
		width: 100%;
		height: 220rpx;
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
				width: 120rpx;
				height: 140rpx;
			}

			.item_right {
				display: flex;
				flex-direction: column;
				margin-left: 26rpx;
				color: #000000;
				flex-grow: 1;

				.type {
					margin-top: 16rpx;
					display: flex;
					align-items: center;
					gap: 10rpx;
					> text {
						padding: 5rpx 10rpx;
						background: #fddc13;
						font-size: 12px;
						display: flex;
						align-items: center;
						justify-content: center;
						color: white;
					}
				}

				> view {
					display: flex;
					align-items: center;

					> image {
						display: block;
						width: 18rpx;
						height: 18rpx;
					}
				}
			}
		}
	}
}
</style>
