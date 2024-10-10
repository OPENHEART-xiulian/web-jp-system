<template>
	<view class="container">
		<view class="content">
			<image
				@click="showPreviewImage(currentPageData.detail.dtImg)"
				:src="currentPageData.detail.dtImg"
				mode="aspectFill"
			/>
			<view class="item_right">
				<view @click="goSchool">
					<text style="font-size: 32rpx; font-weight: bold">
						{{ currentPageData.detail.spaCoachName || currentPageData.detail.spaCoachName }}
					</text>
					<text class="spaSchoolName">
						{{ currentPageData.detail.spaSchoolName }}
					</text>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
				<view class="spaPost">
					{{ currentPageData.detail.spaPost }} /
					{{ currentPageData.detail.spaYearsOfTeaching ?? '--' }}年经验
				</view>
				<view class="type">
					<u-tag
						:text="currentPageData.detail.spaTeachCarType"
						bgColor="#018f64"
						borderColor="#018f64"
						color="#fff"
						size="mini"
						type="warning"
					/>
				</view>
			</view>
		</view>
		<view class="desc">
			<text class="u-form-item__body__left">教练简介</text>
			<text :class="{ zwsj: !currentPageData.detail.spaRemark }">
				{{ currentPageData.detail.spaRemark || '暂无数据' }}
			</text>
		</view>
		<view class="desc">
			<text class="u-form-item__body__left">投诉记录</text>
			<text :class="{ zwsj: !(currentPageData.detail.countNumber >= 0) }">{{
				currentPageData.detail.countNumber >= 0
					? `累计${currentPageData.detail.countNumber}条投诉`
					: '暂无数据'
			}}</text>
		</view>
		<view class="desc">
			<view class="u-form-item__body__left title_text">
				<view class="pj">学员评价{{ paramsData.total ? '(' + paramsData.total + ')' : '' }}</view>
				<navigator
					v-if="paramsData.total > 0"
					:url="`/pages/home/student_evaluate/index?id=${currentPageData.id}&status=2`"
					open-type="navigate"
					hover-class="none"
				>
					<u-icon
						v-if="paramsData.total > 0"
						label="全部"
						space="0"
						labelSize="26rpx"
						labelPos="left"
						name="arrow-right"
						size="12"
					></u-icon>
				</navigator>
			</view>
			<evaluate
				inactiveColor="#fddc13"
				:coachDTO="item"
				v-for="(item, index) in list"
				:key="index"
				:status="2"
			/>
			<text class="zwsj" v-if="list.length == 0"> 暂无数据</text>
			<u-loadmore
				v-else
				:marginTop="40"
				@loadmore="loadmore"
				status="nomore"
				nomoreText="点击全部查看完整列表"
				line
			/>
		</view>
	</view>
</template>

<script setup lang="ts">
import { _src, showPreviewImage } from '@/utils/utils';
import { getCaochDetail, getCoachEvaluateList } from '@/api/api';
import { useListData } from '@/hooks';
import evaluate from '@/components/evaluation/index.vue';
import type { coachEntityType } from '@/pages/my/my_evaluate/index.vue';
const { latitude, longitude } = uni.getStorageSync('userLat_long');
const currentPageData = reactive<any>({
	id: '',
	detail: {},
});
const callbackFn = (list: coachEntityType[]) => {
	return list.map(v => {
		try {
			v.coachPhoto = JSON.parse(_src(v.coachPhoto))[0];
			v.img = JSON.parse(_src(v.img));
			v.headSculpture = JSON.parse(_src(v.headSculpture))[0];
		} catch {
			console.log('图片转换失败');
		}
		return v;
	});
};
const { getData, loadmore, resetData, setParams, list, paramsData } = useListData<coachEntityType>({
	getFn: getCoachEvaluateList,
	callbackFn,
	pageSize: 5,
	pageNumber: 1,
	upLoading: false,
});
const goSchool = () => {
	uni.navigateTo({
		url: '../school/schoolDetail?id=' + currentPageData.detail.spaSchoolId,
	});
};

onLoad((option: any) => {
	currentPageData.id = option.id;
	setParams({ coachId: option.id });
	resetData();
	getData();
	initData();
});
const initData = () => {
	getCaochDetail({
		id: currentPageData.id,
		latitude,
		longitude,
	}).then((res: any) => {
		currentPageData.detail = res.data;
		currentPageData.detail.dtImg = JSON.parse(_src(currentPageData.detail.dtImg));
	});
};
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100%;
	padding: 30rpx;
	box-sizing: border-box;

	.u-form-item__body__left {
		background-image: linear-gradient(to right, #f7e8aa, transparent);
		padding-left: 30rpx;
		position: relative;
		line-height: 60rpx;
		&::after {
			content: '';
			height: 30rpx;
			width: 10rpx;
			background-color: #fed71a;
			position: absolute;
			left: 10rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.desc {
		display: flex;
		flex-direction: column;
		margin-top: 90rpx;
		text {
			padding-left: 28rpx;
			font-size: 30rpx;
		}
		> text:first-child {
			font-size: 32rpx;
			font-weight: 700;
			text-align: left;
			margin-bottom: 20rpx;
		}

		.zwsj {
			color: #c0c4cc;
		}
		.title_text {
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			.pj {
				font-size: 32rpx;
				font-weight: 700;
				text-align: left;
			}
		}
	}

	.content {
		width: 100%;
		height: 112rpx;
		display: flex;
		margin-bottom: 14rpx;
		align-items: center;

		> image {
			display: block;
			width: 140rpx;
			height: 164rpx;
		}

		.item_right {
			display: flex;
			flex-direction: column;
			margin-left: 26rpx;
			color: #000000;
			flex-grow: 1;

			.type {
				margin-top: 16rpx;
			}
			.spaSchoolName {
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #969696;
			}
			.spaCoachName {
				font-size: 32rpx;
				font-weight: bold;
			}
			.spaPost {
				margin-top: 10rpx;
				font-size: 28rpx;
				color: #969696;
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
</style>
