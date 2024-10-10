<template>
	<view class="student_evaluate">
		<view class="top">
			<view class="t_left">
				<view class="pf">{{ totalScore }}</view>
				<view>综合评星</view>
			</view>
			<view class="t_right">
				<view class="r_top">
					<view class="start_box" v-for="(item, index) in startList" :key="index">
						<view class="s_lf">
							<u-rate
								activeColor="#aaa"
								:size="10"
								:count="item.count"
								v-model="value"
								:gutter="2"
								readonly
							></u-rate>
						</view>
						<view class="s_rg">
							<u-line-progress
								activeColor="#333"
								:showText="false"
								:percentage="item.percentage"
								height="6"
							></u-line-progress>
						</view>
					</view>
				</view>
				<view class="pf_text"> {{ paramsData.total }}个评分 </view>
			</view>
		</view>
		<evaluate
			:schoolDTO="item"
			:coachDTO="item"
			v-for="(item, index) in list"
			:key="index"
			:status="status"
			inactiveColor="#fddc13"
		/>
		<text class="zwsj" v-if="list.length == 0"> 暂无数据</text>
		<u-loadmore
			v-else
			:marginTop="40"
			@loadmore="loadmore"
			:status="list.length < paramsData.total ? 'loadmore' : 'nomore'"
			line
		/>
	</view>
</template>

<script lang="ts" setup>
import { getCoachEvaluateList, getSchoolEvaluateList } from '@/api/api';
import evaluate from '@/components/evaluation/index.vue';
import { useListData } from '@/hooks';
import { _src } from '@/utils/utils';
const value = ref(5);
const status = ref(1);
const totalScore = ref(0);
const startList = [
	{
		count: 5,
		percentage: 0,
	},
	{
		count: 4,
		percentage: 0,
	},
	{
		count: 3,
		percentage: 0,
	},
	{
		count: 2,
		percentage: 0,
	},
	{
		count: 1,
		percentage: 0,
	},
];
const callbackFn = (list: any[]) => {
	console.log(list);
	return list.map(v => {
		try {
			v.img = JSON.parse(_src(v.img));
			v.headSculpture = JSON.parse(_src(v.headSculpture))[0];
		} catch {
			console.log('图片转换失败');
		}
		return v;
	});
};
const { getData, loadmore, resetData, setParams, list, paramsData } = useListData<any>({
	getFn: getCoachEvaluateList,
	callbackFn,
	pageSize: 10,
	pageNumber: 1,
});
onLoad((option: any) => {
	status.value = option.status;
	const key = option.status == 2 ? 'coachId' : 'schoolId';
	setParams({ [key]: option.id });
	resetData();
	getData(option.status == 1 ? getSchoolEvaluateList : getCoachEvaluateList).then((res: any) => {
		const { params } = res;
		totalScore.value = params.totalScore;
		startList.forEach(item => {
			item.percentage = params[item.count];
		});
	});
});
</script>

<style lang="scss" scoped>
.student_evaluate {
	padding: 30rpx;
	.top {
		display: flex;
		align-items: flex-start;
		padding:40rpx 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		.t_left {
			width: 180rpx;
			text-align: center;
			color: #aaaaaa;
			.pf {
				font-weight: bold;
				height: 110rpx;
				font-size: 100rpx;
				line-height: 80rpx;
				color: #333;
			}
		}
		.t_right {
			flex: 1;
			.r_top {
				height: 110rpx;
				.start_box {
					display: flex;
					align-items: center;
					gap: 10rpx;
					.s_rg {
						flex: 1;
					}
					.s_lf {
						width: 120rpx;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
			.pf_text {
				text-align: right;
				color: #aaaaaa;
			}
		}
	}
}
</style>
