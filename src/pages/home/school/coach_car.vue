<script setup lang="ts">
import { getCaochCarList } from '@/api/api';
import { _src, $src } from '@/utils/utils';
interface CarListType {
	carId: string;
	carBrand: string;
	carNum: string;
	carAge: string;
	carLogo: string[];
}
const pageSize = ref(15);
const pageNumber = ref(1);
const caochCarTotal = ref(0);
const schoolId = ref(0);
const caochCarList = ref<CarListType[]>([]);
onLoad((options: any) => {
	schoolId.value = options.schoolId;
	getData();
});
const getData = () => {
	getCaochCarList({
		schoolId: schoolId.value,
		pageSize: pageSize.value,
		pageNumber: pageNumber.value,
	}).then((res: any) => {
		const { total, list } = res.data;
		caochCarTotal.value = total;
		res.data.list = list?.map((ele: any) => {
			if (JSON.parse(ele.photo) instanceof Array) {
				ele.photo = (JSON.parse(ele.photo) ?? []).map((item: any) => {
					return _src(item);
				});
			}
			if (JSON.parse(ele.carLogo) instanceof Array) {
				ele.carLogo = (JSON.parse(ele.carLogo) ?? []).map((item: any) => {
					return _src(item);
				});
			}
			return ele;
		});
		if (pageNumber.value == 1) {
			caochCarList.value = res.data.list;
		} else {
			caochCarList.value = caochCarList.value.concat(res.data.list);
		}
	});
};
const loadmore = () => {
	if (caochCarList.value.length < caochCarTotal.value) {
		pageNumber.value += 1;
		getData();
	}
};
onReachBottom(loadmore);
</script>

<template>
	<view class="list_box">
		<navigator
			:url="`/pages/home/school/car_details?data=${JSON.stringify(ele)}`"
			open-type="navigate"
			hover-class="navigator-hover"
			v-for="ele in caochCarList"
			:key="ele.carId"
		>
			<view class="box">
				<u-image
					width="72rpx"
					height="72rpx"
					:src="ele.carLogo[0]"
					mode="aspectFill"
				/>
				<text class="u-line-1" style="text-align: center">
					{{ ele.carBrand }}
				</text>
				<text class="plate u-line-1">{{ ele.carNum }}</text>
				<view class="cheling">
					<image :src="$src('home/car@2x.png')" />
					<text>车龄：{{ ele.carAge ?? '--' }}年</text>
				</view>
			</view>
		</navigator>
	</view>
	<u-loadmore
		v-if="caochCarList.length != 0"
		:marginTop="40"
		@loadmore="loadmore"
		:status="caochCarList.length < caochCarTotal ? 'loadmore' : 'nomore'"
		line
	/>
</template>

<style scoped lang="scss">
.list_box {
	display: grid;
	grid-template-columns: repeat(auto-fill, 220rpx);
	justify-content: space-between;
	grid-gap: 10rpx;
	padding: 30rpx;

	.box {
		padding-top: 20rpx;

		flex: none;
		width: 220rpx;
		margin-right: 8rpx;
		background: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 20rpx;

		> image {
			width: 72rpx;
			height: 72rpx;
			margin: 20rpx 0;
		}

		.plate {
			background-color: #fdad13;
			font-size: 12px;
			padding: 10rpx 22rpx;
			color: black;
			font-weight: 700;
			margin-top: 10rpx;
			border-radius: 10rpx;
			border: 2rpx solid black;
		}
		.cheling {
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			padding-bottom: 20rpx;

			> image {
				display: block;
				height: 20rpx;
				width: 33rpx;
				margin-right: 6rpx;
			}
		}
	}
}
</style>
