<template>
	<view
		v-if="data!.acceptanceStatus != 4 && data!.acceptanceStatus != 3"
		class="bz"
	>
		<u-steps
			:current="data!.acceptanceStatus"
			activeColor="#fff"
			dot
			inactiveColor="#fef1a0"
		>
			<u-steps-item title="投诉提交" />
			<u-steps-item title="驾校处理" />
			<u-steps-item title="学员确认" />
			<u-steps-item title="投诉完结" />
		</u-steps>
	</view>
	<view class="bottom">
		<view v-if="data!.acceptanceStatus == 1" class="jxcl">
			<view class="title">
				<u-icon name="clock" size="20" />
				等待驾校处理
			</view>
			<view>驾校将在{{ timeText || '--' }}内处理投诉</view>
		</view>
		<template v-if="data!.acceptanceStatus == 2">
			<view class="jxcl">
				<view class="title">
					<u-icon name="clock" size="20" />
					待确认，剩余
					<text>{{ timeText || '--' }} </text>
				</view>
				<view>超时将自动同意方案,投诉完结</view>
			</view>
			<view class="user_msg">
				<view class="cl">针对您的投诉，驾校给出处理方案为：</view>
				<view class="fanan">
					{{ data?.handlingPlan || '--' }}
					{{
						data?.drivingTrainingInstitutionContent &&
						'; ' + data?.drivingTrainingInstitutionContent
					}}
				</view>
				<view class="btn_box">
					<view class="b_box">
						<button class="u-reset-button" @click="isAgree = true">
							同意方案
						</button>
						<view>同意后，投诉完结</view>
					</view>
					<view class="b_box">
						<button class="u-reset-button" @click="isDisagree = true">
							不同意方案
						</button>
						<view>不同意，转送投诉到运管部门</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="data!.acceptanceStatus == 3">
			<view class="jxcl">
				<view class="title">
					<u-icon name="checkmark-circle" size="20" />
					投诉完结
				</view>
			</view>
			<view class="user_msg">
				<view class="cl">针对您的投诉，驾校给出处理方案为：</view>
				<view class="fanan">
					{{ data?.handlingPlan || '--' }}
					{{
						data?.drivingTrainingInstitutionContent &&
						'; ' + data?.drivingTrainingInstitutionContent
					}}
				</view>
				<view class="rg_icon">
					<u-icon color="#fff" name="checkmark-circle" />
					学员已同意
				</view>
			</view>
		</template>
		<template
			v-if="data!.acceptanceStatus == 4 && data!.studentAgreeOrNotId == 2"
		>
			<view class="jxcl">
				<view class="title">
					<u-icon name="close-circle" size="20" />
					您不同意方案
				</view>
				<view>平台已将投诉相关内容转达至运管部门</view>
			</view>
			<view class="user_msg">
				<view class="cl">针对您的投诉，驾校给出处理方案为：</view>
				<view class="fanan">
					{{ data?.handlingPlan || '--' }}
					{{
						data?.drivingTrainingInstitutionContent &&
						'; ' + data?.drivingTrainingInstitutionContent
					}}
				</view>
				<view class="bty_box">
					<view class="bty_title">学员不同意，原因是：</view>
					<view>{{ data?.disagreeCause || '--' }}</view>
				</view>
				<view class="rg_icon" style="background-color: #e4393c">
					<u-icon color="#fff" name="close-circle" />
					学员不同意
				</view>
			</view>
		</template>
		<view
			v-if="data!.acceptanceStatus == 4 && data!.studentAgreeOrNotId == null"
			class="jxcl"
		>
			<view class="title">
				<u-icon name="close-circle" size="20" />
				驾校逾期未处理
			</view>
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
			<view class="setails" @click="show = true"> 查看投诉详情 ></view>
		</view>
		<button
			v-if="data!.acceptanceStatus == 1 || data!.acceptanceStatus == 2"
			class="u-reset-button chex"
			@click="showModel = true"
		>
			撤销投诉
		</button>
	</view>
	<u-modal
		:show="showModel"
		cancelColor="#000"
		cancelText="我再想想"
		confirmColor="#fddc13"
		confirmText="确认撤销"
		showCancelButton
		title=""
		@cancel="showModel = false"
		@confirm="revoke"
	>
		<template #default>
			<view style="font-size: 32rpx">确认撤销投诉吗？</view>
		</template>
	</u-modal>
	<u-modal
		:show="isAgree"
		cancelColor="#000"
		confirmColor="#fddc13"
		showCancelButton
		title=""
		@cancel="isAgree = false"
		@confirm="agreeFn"
	>
		<template #default>
			<view style="font-size: 32rpx">确认同意方案吗？</view>
		</template>
	</u-modal>
	<u-modal
		:show="isDisagree"
		cancelColor="#000"
		cancelText="暂不提交"
		confirmColor="#fddc13"
		confirmText="提交"
		showCancelButton
		@cancel="isDisagree = false"
		@confirm="noAgreeFn"
	>
		<template #default>
			<u-textarea
				v-model="disagreeCause"
				:height="100"
				:maxlength="-1"
				:placeholderStyle="{ color: '#d7d7df' }"
				border="none"
				placeholder="请填写不同意原因，必填"
			/>
		</template>
	</u-modal>
	<details-component :show="show" @close="show = false"></details-component>
</template>

<script lang="ts" setup>
import { useIntervalTime } from '@/hooks';
import detailsComponent from './components/details/index.vue';
import { useComplaint } from '@/store';
import { desensitization, nameDes } from '@/utils/utils';
import { revokeComplain, studentConfirm } from '@/api/api';
import { storeToRefs } from 'pinia';

const store = useComplaint();
const { data } = storeToRefs(store);
const showModel = ref(false); //控制撤销弹窗
const isAgree = ref(false); //控制同意方案弹窗
const isDisagree = ref(false); //控制不同意方案弹窗
const disagreeCause = ref<string>('');
const { beginTimer, revise, timeText } = useIntervalTime(
	data.value!.acceptanceStatus == 1
		? data.value!.createTime
		: data.value!.complainShTime
);
// 确认同意方案
const agreeFn = () => {
	studentConfirm({ id: data.value!.id, studentAgreeOrNotId: 1 }).then(
		(res: any) => {
			store.data = res.data;
			isAgree.value = false;
		}
	);
};
// 确认不同意方案
const noAgreeFn = () => {
	if (!!disagreeCause.value) uni.$u.toast('请输入不同意原因');
	studentConfirm({
		id: data.value!.id,
		disagreeCause: disagreeCause.value,
		studentAgreeOrNotId: 2,
	}).then((res: any) => {
		store.data = res.data;
		isDisagree.value = false;
	});
};
onShow(() => {
	if (data.value?.acceptanceStatus == 1 || data.value?.acceptanceStatus == 2) {
		beginTimer();
	}
});
onUnmounted(() => {
	revise();
});
watchEffect(() => {
	if (store.data?.acceptanceStatus == 4 || store.data?.acceptanceStatus == 3) {
		uni.setNavigationBarColor({
			backgroundColor: '#f8f8f8',
			frontColor: '#000000',
		});
	} else {
		uni.setNavigationBarColor({
			backgroundColor: '#fddc13',
			frontColor: '#000000',
		});
	}
});
const revoke = () => {
	revokeComplain({ id: data.value!.id }).then(() => {
		uni.showToast({
			title: '撤销成功',
			success: () => {
				const time = setTimeout(() => {
					uni.navigateBack();
					clearTimeout(time);
				}, 1000);
			},
		});
	});
};
const show = ref(false);
</script>

<style lang="scss" scoped>
.bz {
	padding: 60rpx 0;
	background-color: #fddc13;
	margin-bottom: 20rpx;

	::v-deep .u-text__value {
		font-size: 30rpx !important;
	}
}

.bottom {
	padding: 0 30rpx;

	.jxcl {
		font-size: 28rpx;
		color: #555555;
		margin-top: 40rpx;

		.title {
			font-size: 32rpx;
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

	.user_msg {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		margin-top: 30rpx;
		position: relative;
		overflow: hidden;

		.cl {
			color: #555555;
		}

		.title {
			font-size: 30rpx;
			font-weight: bold;
		}

		.box {
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
			font-size: 24rpx;
		}

		.bty_box {
			padding-top: 20rpx;
			margin-top: 20rpx;
			border-top: 2rpx solid #f2f2f2;
			font-size: 28rpx;

			.bty_title {
				color: #555555;
				margin-bottom: 20rpx;
			}
		}
	}

	.chex {
		background-color: #fff;
		margin-top: 50rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		font-weight: bold;
	}
}
</style>
