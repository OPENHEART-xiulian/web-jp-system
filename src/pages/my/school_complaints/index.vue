<template>
	<view class="school_complaints">
		<view class="jxcl" v-if="data!.handlingStatusId == 1">
			<view class="title">
				<u-icon name="clock" size="20"></u-icon>待处理，剩余<text>{{
					timeText || '--'
				}}</text></view
			>
			<view>逾期不处理将会转送到运管部门并记入诚信档案</view>
		</view>
		<view class="jxcl" v-if="data!.handlingStatusId == 2">
			<view class="title">
				<u-icon size="20" name="clock"></u-icon>等待学员确认</view
			>
			<view>学员将在{{ timeText || '--' }}内确认处理方案</view>
		</view>
		<template v-if="data!.handlingStatusId == 3">
			<view class="jxcl">
				<view class="title">
					<u-icon size="20" name="checkmark-circle"></u-icon>投诉完结</view
				>
			</view>
			<view class="user_msg">
				<view class="cl">处理方案</view>
				<view class="fanan">
					{{ data?.handlingPlan || '--' }}
					{{
						data?.drivingTrainingInstitutionContent &&
						'; ' + data?.drivingTrainingInstitutionContent
					}}
				</view>
				<view class="rg_icon">
					<u-icon name="checkmark-circle" color="#fff"></u-icon> 学员已同意
				</view>
			</view>
		</template>
		<view class="user_msg" v-if="data!.handlingStatusId == 2">
			<view class="cl">处理方案</view>
			<view class="fanan">
				{{ data?.handlingPlan || '--' }}
				{{
					data?.drivingTrainingInstitutionContent &&
					'; ' + data?.drivingTrainingInstitutionContent
				}}
			</view>
		</view>
		<template
			v-if="data!.handlingStatusId == 4 && data!.studentAgreeOrNotId == 2"
		>
			<view class="jxcl">
				<view class="title">
					<u-icon size="20" name="close-circle"></u-icon>学员不同意方案</view
				>
				<view>平台已将投诉相关内容转达至运管部门</view>
			</view>
			<view class="user_msg">
				<view class="cl">处理方案</view>
				<view class="fanan">
					{{ data?.handlingPlan || '--' }}
					{{
						data?.drivingTrainingInstitutionContent &&
						'; ' + data?.drivingTrainingInstitutionContent
					}}
				</view>
				<view class="bty_box">
					<view class="bty_title">学员不同意，原因是:</view>
					<view>{{ data?.disagreeCause || '--' }}</view>
				</view>
				<view class="rg_icon" style="background-color: #e4393c">
					<u-icon name="close-circle" color="#fff"></u-icon> 学员不同意
				</view>
			</view>
		</template>
		<view
			class="jxcl"
			v-if="data!.handlingStatusId == 4 && data!.studentAgreeOrNotId == null"
		>
			<view class="title">
				<u-icon size="20" name="close-circle"></u-icon>您逾期未处理</view
			>
			<view>平台已将投诉相关内容转达至运管部门</view>
		</view>
		<view class="user_msg">
			<view class="title">投诉人</view>
			<view class="box">
				<view class="lf">学员信息：</view>
				<view class="rg">
					{{ nameDes(data!.userName) }},{{
						desensitization(data!.userPhoneNumber)
					}}
				</view>
			</view>
			<view class="box">
				<view class="lf">培训时段：</view>
				<view class="rg">
					<view>{{ data?.startTime + ' 至' }}</view>
					<view>{{ data?.endTime }}</view>
				</view>
			</view>
		</view>
		<view class="user_msg">
			<view class="title">投诉对象</view>
			<view class="box">
				<view class="lf">训练场地：</view>
				<view class="rg">
					{{ data?.spaBranchCampusName || '--' }}
				</view>
			</view>
			<view class="box">
				<view class="lf">投诉教练：</view>
				<view class="rg">
					<view>{{ data?.spaCoachName || '--' }}</view>
				</view>
			</view>
			<view class="setails" @click="show = true"> 查看投诉详情 > </view>
		</view>
		<view
			class="bottom-btn"
			v-if="data!.handlingStatusId == 1 || data!.handlingStatusId == 2"
		>
			<button
				v-if="data!.handlingStatusId == 1"
				class="u-reset-button lf-btn"
				@click="go"
			>
				去处理
			</button>
			<button class="u-reset-button rg-btn" @click="makePhoneCall">
				联系学员
			</button>
		</view>
	</view>
	<details-component :show="show" @close="show = false"></details-component>
</template>

<script lang="ts" setup>
import { useIntervalTime } from '@/hooks';
import detailsComponent from './components/details/index.vue';
import { nameDes, desensitization } from '@/utils/utils';
import { storeToRefs } from 'pinia';
import { useComplaint } from '@/store';
const store = useComplaint();
const { data } = storeToRefs(store);
const show = ref(false);
const { beginTimer, revise, timeText } = useIntervalTime(
	data.value!.handlingStatusId == 1
		? data.value!.createTime
		: data.value!.complainShTime
);
onShow(() => {
	console.log(data.value);
	if (data.value?.handlingStatusId == 1 || data.value?.handlingStatusId == 2) {
		beginTimer();
	}
});
onUnmounted(() => {
	revise();
});
const makePhoneCall = () => {
	uni.makePhoneCall({
		phoneNumber: data.value!.userPhoneNumber,
	});
};
const go = () => {
	uni.navigateTo({
		url: '/pages/my/school_complaints/process_submission',
	});
};
</script>

<style lang="scss" scoped>
.school_complaints {
	padding: 0 30rpx;
	.jxcl {
		margin-top: 40rpx;
		font-size: 24rpx;
		color: #555555;
		.title {
			font-size: 34rpx;
			color: #000;
			line-height: 70rpx;
			display: flex;
			align-items: center;
			gap: 10rpx;
			text {
				color: #fd8900;
			}
		}
	}
	.bottom-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30rpx;
		margin-top: 80rpx;
		button {
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			font-weight: bold;
		}
		.lf-btn {
			background-color: $theme-color;
		}
		.rg-btn {
			background-color: #fff;
		}
	}
	.user_msg {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		font-size: 26rpx;
		line-height: 40rpx;
		margin-top: 40rpx;
		position: relative;
		overflow: hidden;
		.cl {
			font-size: 28rpx;
			color: #555;
		}
		.title {
			font-size: 30rpx;
			font-weight: bold;
		}
		.box {
			font-size: 28rpx;
			margin-top: 20rpx;
			display: flex;
			.rg {
				flex: 1;
			}
			.lf {
				width: 140rpx;
				text-align: left;
			}
		}
		.setails {
			padding-top: 20rpx;
			text-align: center;
			border-top: 2rpx solid #f2f2f2;
			margin-top: 20rpx;
		}
		.fanan {
			font-size: 28rpx;
			margin-top: 20rpx;
		}
		.btn_box {
			display: flex;
			margin-top: 20rpx;
			justify-content: space-between;
			gap: 20rpx;
			.b_box {
				flex: 1;
				font-size: 24rpx;
				color: #b4adad;
				line-height: 40rpx;
				text-align: center;
				.u-reset-button {
					line-height: 80rpx;
					background-color: #fddc13;
					font-size: 30rpx;
					color: #000;
					margin-bottom: 10rpx;
				}
			}
		}
		.rg_icon {
			height: 50rpx;
			background-color: #fddc13;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 0;
			top: 0;
			gap: 10rpx;
			padding: 0 10rpx;
			border-end-start-radius: 20rpx;
		}
		.bty_box {
			padding-top: 20rpx;
			margin-top: 20rpx;
			border-top: 2rpx solid #f2f2f2;
			color: #000;
			font-size: 28rpx;
			.bty_title {
				color: #555;
				margin-bottom: 20rpx;
			}
		}
	}
}
</style>
