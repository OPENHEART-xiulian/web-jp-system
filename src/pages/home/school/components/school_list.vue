<template>
	<view style="position: relative; z-index: 1">
		<view class="school_list">
			<view
				class="item"
				v-for="(ele, index) in currentPageData.schoolList"
				:key="index"
				@click="goDetail(ele)"
			>
				<image :src="ele.dtDriverLogo || $src('/home/schoolzanwei@2x.png')" mode="aspectFill" />
				<view class="item_right">
					<text
						style="
							margin-top: 14rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
							font-weight: bold;
						"
					>
						{{ ele.spaSchoolName }}
					</text>
					<text style="font-size: 24rpx; margin-top: 14rpx; color: #969696">
						{{ ele.spaRegion ?? '--' }} | 距离你{{ ele.distance ?? '--' }}km
					</text>
					<view style="margin-top: 14rpx">
						<image :src="$src('/home/ff@2x.png')" /><text style="margin: 0 15rpx 0 5rpx">
							通过率:
						</text>
						<text style="color: #000000; margin-right: 28rpx">
							{{ ele.spaPassRate }}{{ ele.spaPassRate ? '%' : '--' }}
						</text>
						<image :src="$src('/home/fd@2x.png')" /><text style="margin: 0 15rpx 0 5rpx">
							好评率:
						</text>
						<text style="color: #000000; margin-right: 28rpx">
							{{ ele.spaSatisfactionRate }}{{ ele.spaSatisfactionRate ? '%' : '--' }}
						</text>
						<image :src="$src('/home/fq@2x.png')" />
						<text style="margin: 0 15rpx 0 5rpx"> 星级: </text>
						<text style="color: #000000; margin-right: 28rpx">{{ ele.spaStarLevel }}星</text>
					</view>
				</view>
			</view>
			<u-loadmore
				v-if="currentPageData.schoolList.length != 0"
				:marginTop="40"
				@loadmore="loadmore"
				:status="
					currentPageData.schoolList.length < currentPageData.totalPage ? 'loadmore' : 'nomore'
				"
				line
			/>
		</view>
		<noData height="500rpx" v-if="currentPageData.schoolList.length == 0"></noData>
	</view>
</template>

<script setup lang="ts">
import noData from '@/components/noData/index.vue';
import { $src, _src } from '@/utils/utils';
import { getSchoolList } from '@/api/api';
interface Props {
	requestData: any;
}
const props = defineProps<Props>();

const currentPageData: any = reactive({
	schoolList: [],
	totalPage: 0,
});
const loadmore = () => {
	if (currentPageData.schoolList.length < currentPageData.totalPage) {
		props.requestData.pageNumber += 1;
		loadData();
	}
};
onReachBottom(loadmore);
const goDetail = function (data: any) {
	uni.navigateTo({
		url: './schoolDetail?id=' + data.spaSchoolId,
	});
};
const loadData = () => {
	getSchoolList(props.requestData, {
		loading: true,
		increaseToken: false,
	}).then((res: any) => {
		console.log(res);
		res.data.list = res.data.list.map((ele: any) => {
			ele.dtDriverLogo = JSON.parse(ele.dtDriverLogo)?.map((item: any) => {
				return _src(item);
			});
			return ele;
		});
		if (res.data.pageNumber == 1) {
			currentPageData.schoolList = res.data.list;
		} else {
			currentPageData.schoolList = currentPageData.schoolList.concat(res.data.list);
		}
		currentPageData.totalPage = res.data.total;
	});
};
const resetData = () => {
	currentPageData.schoolList = [];
	props.requestData.pageNumber = 1;
};
onShow(() => {
	loadData();
});
defineExpose({
	loadData,
	resetData,
});
</script>

<style scoped lang="scss">
.school_list {
	width: 100%;

	> .item {
		width: 100%;
		// height: 112rpx;
		display: flex;
		margin-bottom: 30rpx;
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
			font-size: 32rpx;
			color: #000000;
			overflow: hidden;

			> view {
				display: flex;
				align-items: center;

				> text {
					font-size: 24rpx;
					font-weight: normal;
					color: #969696;
					white-space: nowrap;
				}

				> image {
					display: block;
					width: 18rpx;
					height: 18rpx;
				}
			}
		}
	}
}
</style>
