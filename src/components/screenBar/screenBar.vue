<template>
	<view>
		<view class="type_box">
			<view @click="showPop(2)" :class="selectData.area.id ? 'active' : ''">
				<text>
					{{ selectData.area.id ? selectData.area.areaName : '区域' }}
				</text>
				<u-icon :name="popIndex == 2 ? 'arrow-up-fill' : 'arrow-down-fill'" size="12" />
			</view>
			<!-- 类型选项 start -->
			<view @click="showPop(3)" v-if="isNeedType" :class="{ active: selectData.classType.length }">
				<text
					:style="selectData.classType.length == 0 ? '' : 'width: 100rpx;'"
					style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
				>
					{{ selectData.classType.length ? selectData.classType[0].name : '类型' }}
				</text>
				<u-icon :name="popIndex == 3 ? 'arrow-up-fill' : 'arrow-down-fill'" size="12" />
			</view>
			<!-- 类型选项 end -->
			<!-- 排序选项 start -->
			<view @click="showPop(4)" :class="selectData.sort.val && 'active'">
				<text>
					{{
						selectData.sort.val ? currentPageData.sortList[selectData.sort.val].name : '默认排序'
					}}
				</text>
				<u-icon :name="popIndex == 4 ? 'arrow-up-fill' : 'arrow-down-fill'" size="12" />
			</view>
			<!-- 排序选项 end -->
			<!-- 星级选项 start -->
			<view @click="showPop(5)" :class="{ active: selectData.starRating }" v-if="isNeedRate">
				<text>{{ selectData.starRating ? selectData.starRating + '星' : '星级' }}</text>
				<u-icon :name="popIndex == 5 ? 'arrow-up-fill' : 'arrow-down-fill'" size="12" />
			</view>
			<!-- 星级选项 end -->
			<!-- 筛选弹框   后期优化成组件 -->
			<view class="pop_select_win" v-if="showPopWin">
				<!-- 区域 -->
				<view class="city_select" v-if="popIndex == 2">
					<view
						v-for="(ele, index) in currentPageData.areaList"
						:key="index"
						@click="selectCity(ele)"
						:class="selectData.area.id == ele.id && 'active'"
						>{{ ele.areaName }}
					</view>
				</view>
				<!-- 排序 -->
				<view class="city_select" v-if="popIndex == 4">
					<view
						v-for="(ele, index) in currentPageData.sortList"
						@click="selectData.sort.val = ele.val"
						:key="index"
						:class="{ active: selectData.sort.val === ele.val }"
					>
						{{ ele.name }}
					</view>
				</view>
				<!-- 星级 -->
				<view class="city_select" v-if="popIndex == 5">
					<view
						v-for="(ele, index) in currentPageData.rateList"
						:key="index"
						@click="selectData.starRating = ele"
						:class="selectData.starRating == ele && 'active'"
					>
						{{ ele == 0 ? '全部星级' : ele + '星' }}
					</view>
				</view>
				<!-- 类型 -->
				<view class="pop_type" v-if="popIndex == 3">
					<view
						v-for="(ele, index) in currentPageData.classTypeList"
						:key="index"
						style="padding-bottom: 30rpx"
					>
						<text style="font-weight: 700">{{ ele.name }}</text>
						<view class="btn_list">
							<button
								class="u-reset-button"
								:class="{ active: selectData.classType.includes(item) }"
								v-for="(item, index1) in ele.list"
								:key="index1"
								@click="clickType(item)"
							>
								{{ item.name }}
							</button>
						</view>
					</view>
				</view>
				<view class="confirm_btn_list">
					<button class="u-reset-button" @click="reset">重置</button>
					<button class="u-reset-button" @click="confirm">确定</button>
				</view>
			</view>
			<view
				v-if="showPopWin"
				@click="
					() => {
						popIndex = 0;
						showPopWin = false;
					}
				"
				class="mask"
				@touchmove.stop.prevent="() => {}"
			></view>
		</view>
	</view>
</template>

<script setup lang="ts">
const clickType = function (item: any) {
	if (selectData.classType.includes(item)) {
		selectData.classType.splice(selectData.classType.indexOf(item), 1);
	} else {
		selectData.classType.push(item);
	}
};
interface Props {
	isNeedType?: boolean;
	isNeedRate?: boolean;
	defaultParam?: any;
}
interface SelectDataType {
	area: {
		id: string;
		areaName: string;
	};
	sort: {
		val: number;
	};
	starRating: any;
	classType: any;
	classTypeValue: any;
}
const emitParam = defineProps<Props>();
const emit = defineEmits(['callBackData']);
const showPopWin = ref(false);
const popIndex = ref(0);
const selectData = reactive<SelectDataType>({
	area: {
		id: '',
		areaName: '',
	},
	sort: {
		val: 0,
	},
	starRating: 0,
	classType: [], //暂时保存的班型值
	classTypeValue: '', //最后回传使用的班型值
});
const currentPageData = reactive({
	areaList: uni.getStorageSync('selectCityData').children,
	sortList: [
		{
			name: '默认排序',
			val: 0,
		},
		{
			name: '距离由近到远',
			val: 1,
		},
		{
			name: '好评率由高到低',
			val: 2,
		},
		{
			name: '好评率由低到高',
			val: 3,
		},
	],
	rateList: [0, 1, 2, 3, 4, 5],
	classTypeList: [
		{
			name: '小车',
			list: [
				{
					name: 'C1(小型汽车)',
					value: 'C1',
				},
				{
					name: 'C2(小型自动挡汽车)',
					value: 'C2',
				},
			],
		},
		{
			name: '货车',
			list: [
				{
					name: 'A2(重型牵引挂车)',
					value: 'A2',
				},
				{
					name: 'B2(大型货车)',
					value: 'B2',
				},
			],
		},
		{
			name: '客车',
			list: [
				{
					name: 'A1(大型客车)',
					value: 'A1',
				},
				{
					name: 'A3(城市公交车)',
					value: 'A3',
				},
				{
					name: 'B1(中型客车)',
					value: 'B1',
				},
			],
		},
		{
			name: '摩托车',
			list: [
				{
					name: 'D(普通三轮摩托车)',
					value: 'D',
				},
				{
					name: 'E(普通二轮摩托车)',
					value: 'E',
				},
			],
		},
		{
			name: '其他',
			list: [
				{
					name: 'C3(低速载货汽车)',
					value: 'C3',
				},
				{
					name: 'C4(三轮汽车)',
					value: 'C4',
				},
				{
					name: 'C5(残疾人专用车)',
					value: 'C5',
				},
				{
					name: 'C6(轻型牵引挂车)',
					value: 'C6',
				},
				{
					name: 'F(轻便摩托车)',
					value: 'F',
				},
			],
		},
	],
});
//选择区域
const selectCity = (data: any) => {
	if (selectData.area.id === data.id) {
		selectData.area.id = '';
		selectData.area.areaName = '';
	} else {
		selectData.area.id = data.id;
		selectData.area.areaName = data.areaName;
	}
};
const reset = () => {
	selectData.starRating = 0;
	selectData.sort.val = 0;
	selectData.area.id = '';
	selectData.classType = [];
};
const confirm = () => {
	// 拼接
	selectData.classTypeValue = selectData.classType.map((item: any) => item.value).join(',');
	//发送数据到父组件
	emit('callBackData', selectData);
	showPopWin.value = false;
	popIndex.value = 0;
};
const showPop = (index: number) => {
	console.log(index, popIndex.value);
	if (popIndex.value == index) {
		showPopWin.value = !showPopWin.value;
		popIndex.value = 0;
	} else {
		popIndex.value = index;
		showPopWin.value = true;
	}
};
const showParamFromParent = () => {
	if (emitParam.defaultParam && emitParam.defaultParam.carType) {
		emitParam.defaultParam.carType.split(',').map((ele: any) => {
			currentPageData.classTypeList.map(function (ele1: any) {
				ele1.list.map(function (ele2: any) {
					if (ele == ele2.value) {
						selectData.classType.push(ele2);
					}
				});
			});
		});
	}
};
onLoad(() => {
	// 回显类型参数数据
	showParamFromParent();
});
</script>

<style scoped lang="scss">
.type_box {
	display: flex;
	justify-content: space-between;
	position: relative;
	padding: 20rpx 0;
	gap: 20rpx;
	background: #f8f7f8;
	z-index: 99;
	font-size: 24rpx;
	.active {
		background: #fddc13 !important;
	}

	.pop_select_win {
		padding: 20rpx;
		position: absolute;
		bottom: -600rpx;
		left: 0;
		width: 690rpx;
		background: white;
		height: 600rpx;
		z-index: 888;
		margin: 0;
		box-shadow: 0 4rpx 24rpx 0 rgba(0, 0, 0, 0.1);

		.city_select {
			font-size: 16px;
			width: 100%;
			height: 100%;
			overflow: hidden;
			overflow-y: scroll;
			padding-bottom: 140rpx;

			> view {
				padding: 15rpx;
				font-size: 24rpx;
			}
		}

		.confirm_btn_list {
			width: 100%;
			height: 96rpx;
			display: flex;
			justify-content: space-between;
			position: absolute;
			padding: 0 20rpx;
			bottom: 10rpx;
			gap: 20rpx;

			> button {
				flex: 1;
				height: 72rpx;
				display: flex;
				background: #fddc13;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
			}
		}

		.pop_type {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding: 16rpx 16rpx 100rpx;
			overflow: hidden;
			overflow-y: scroll;

			text {
				font-size: 28rpx;
				font-weight: 400;
				color: #010000;
				margin: 10rpx 0;
			}

			.btn_list {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				margin-top: 16rpx;
				justify-content: space-between;
				gap: 10rpx;

				> button {
					width: calc(50% - 6rpx);
					height: 60rpx;
					background-color: #eee;
					border-radius: 4px;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0;
					font-size: 28rpx;
					margin: 0;
				}
			}
		}
	}

	> view {
		width: 230rpx;
		height: 35rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		background: #e5e5e5;
		justify-content: center;
		padding: 32rpx 0;
		z-index: 999;

		> text {
			margin-right: 8rpx;
		}
	}
	.mask {
		background-color: rgba(255, 255, 255, 0);
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: -1;
	}
}
</style>
