<script setup lang="ts">
import { getCaochList } from '@/api/api';
import { _src } from '@/utils/utils';
interface caochListType {
	spaCoachName: string;
	dtCoachName: string;
	spaTeachCarType: string;
	dtImg: string;
}
const pageSize = ref(15);
const pageNumber = ref(1);
const caochTotal = ref(0);
const schoolId = ref(0);
const caochList = ref<caochListType[]>([]);
onLoad((options: any) => {
	schoolId.value = options.schoolId;
	getData();
});
const getData = () => {
	getCaochList({
		spaSchoolId: schoolId.value,
		pageSize: pageSize.value,
		pageNumber: pageNumber.value,
	}).then((res: any) => {
		const { total, list } = res.data;
		caochTotal.value = total;
		res.data.list = list?.map((ele: any) => {
			ele.dtImg = JSON.parse(ele.dtImg)?.map((item: any) => {
				return _src(item);
			});
			return ele;
		});
		if (pageNumber.value == 1) {
			caochList.value = res.data.list;
		} else {
			caochList.value = caochList.value.concat(res.data.list);
		}
	});
};
const goCoachDetail = function (data: any) {
	uni.navigateTo({
		url: '../coach/coachDetail?id=' + data.spaCoachId,
	});
};
const loadmore = () => {
	if (caochList.value.length < caochTotal.value) {
		pageNumber.value += 1;
		getData();
	}
};
onReachBottom(loadmore);
</script>

<template>
	<view class="list_box">
		<view
			class="box"
			v-for="(ele, index) in caochList"
			:key="index"
			@click="goCoachDetail(ele)"
		>
			<image :src="ele.dtImg" mode="aspectFill" />
			<text>{{ ele.spaCoachName || ele.dtCoachName }}</text>
			<u-tag
				:text="ele.spaTeachCarType"
				bgColor="#018f64"
				borderColor="#018f64"
				color="#fff"
				size="mini"
				type="warning"
			/>
			<text class="rate">好评率:--</text>
		</view>
	</view>
	<u-loadmore
		v-if="caochList.length != 0"
		:marginTop="40"
		@loadmore="loadmore"
		:status="caochList.length < caochTotal ? 'loadmore' : 'nomore'"
		line
	/>
</template>

<style scoped lang="scss">
.list_box {
	display: grid;
	grid-template-columns: repeat(auto-fill, 200rpx);
	justify-content: space-between;
	grid-gap: 20rpx;
	padding: 30rpx;
	.box {
		flex: none;
		width: 200rpx;
		margin-right: 8rpx;
		background: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 20rpx;
		gap: 10rpx;
		> image {
			width: 146rpx;
			height: 146rpx;
			margin: 16rpx auto 0;
		}

		.rate {
			font-size: 24rpx;
			text-align: center;
			color: #969696;
			padding-bottom: 10rpx;
		}
	}
	::v-deep .u-tag {
		max-width: 146rpx;
		text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
