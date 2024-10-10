<template>
	<view class="e_content">
		<view v-if="status == 3 || status == 1" class="evaluate_box">
			<view class="img_box_t">
				<u-image :src="schoolDTO?.headSculpture" height="60rpx" width="60rpx" radius="50%" />
			</view>
			<view class="my_right">
				<view class="phone">
					<view> {{ schoolDTO?.userName }} </view>
					<view class="time"> {{ schoolDTO?.trainingTime }} 培训 </view>
				</view>
				<view class="school_x">
					<view> {{ objectText ? objectText : '驾校' }} </view>
					<u-rate
						:gutter="2"
						activeColor="#fddc13"
						:inactiveColor="inactiveColor"
						:value="schoolDTO?.overallRating"
						v-model="start2"
						readonly
					/>
				</view>
				<view class="evaluate">
					<view> 态度：{{ schoolDTO?.serviceAttitude }}星 </view>
					<view> 质量：{{ schoolDTO?.qualityOfService }}星 </view>
					<view> 设施：{{ schoolDTO?.teachingFacilities }}星 </view>
					<view> 收费：{{ schoolDTO?.feePrice }}星 </view>
				</view>
				<view class="evaluate_text">
					{{ schoolDTO?.remark }}
				</view>
				<view class="img_box">
					<u-image
						@click="showPreviewImage(schoolDTO!.img, index)"
						v-for="(item, index) in schoolDTO?.img"
						:key="index"
						:src="item"
						width="150rpx"
						height="150rpx"
					></u-image>
				</view>
				<view
					class="JX_JL"
					v-if="isJumpBox"
					@click="go('/pages/home/school/schoolDetail?id=' + schoolDTO?.schoolId)"
				>
					<u-image :src="schoolDTO?.schoolPhoto" height="100rpx" width="100rpx"></u-image>
					<view class="rg">
						<text class="jx_box u-line-1">{{ schoolDTO?.schoolName }}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-line v-if="status == 3" margin="30rpx 0"></u-line>
		<view v-if="status == 3 || status == 2" class="evaluate_box">
			<view class="img_box_t">
				<u-image
					v-if="status == 2"
					:src="coachDTO?.headSculpture"
					height="60rpx"
					width="60rpx"
					radius="50%"
				/>
			</view>
			<view class="my_right">
				<view class="phone" v-if="status == 2">
					<view> {{ coachDTO?.userName }} </view>
					<view class="time">{{ coachDTO?.trainingTime }} 培训 </view>
				</view>
				<view class="school_x">
					<view>{{ objectText ? objectText : '教练' }} </view>
					<u-rate
						activeColor="#fddc13"
						:inactiveColor="inactiveColor"
						:value="coachDTO?.overallRating"
						v-model="start"
						readonly
					/>
				</view>
				<view class="evaluate">
					<view> 态度：{{ coachDTO?.serviceAttitude }}星 </view>
					<view> 技能：{{ coachDTO?.professionalSkills }}星 </view>
					<view> 安全：{{ coachDTO?.safetyAwareness }}星 </view>
					<view> 管理：{{ coachDTO?.managementAbility }}星 </view>
				</view>
				<view class="evaluate_text">
					{{ coachDTO?.remark }}
				</view>
				<view class="img_box">
					<u-image
						@click="showPreviewImage(coachDTO!.img, index)"
						v-for="(item, index) in coachDTO?.img"
						:key="index"
						:src="item"
						width="150rpx"
						height="150rpx"
					></u-image>
				</view>
				<view
					class="JX_JL"
					v-if="isJumpBox"
					@click="go('/pages/home/coach/coachDetail?id=' + coachDTO?.coachId)"
				>
					<u-image :src="coachDTO?.coachPhoto" height="100rpx" width="100rpx"></u-image>
					<view class="rg">
						<text class="jx_box u-line-1">{{ coachDTO?.coachName }}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import type { coachEntityType, schoolEntityType } from '@/pages/my/my_evaluate/index.vue';
import { showPreviewImage } from '@/utils/utils';

const start = ref(5);
const start2 = ref(5);
interface PropsType {
	coachDTO?: coachEntityType; //教练数据
	schoolDTO?: schoolEntityType; //驾校数据
	status?: number; //1:显示驾校 2:显示教练 3:全部显示
	isJumpBox?: boolean; //是否显示跳转盒子
	objectText?: string;
	inactiveColor?: string;
}
const props = withDefaults(defineProps<PropsType>(), {
	isJumpBox: false,
	status: 3,
	objectText: '',
	inactiveColor: '#b2b2b2',
});
const go = (url: string) => {
	uni.navigateTo({
		url,
	});
};
watchEffect(() => {
	start.value = props?.coachDTO?.overallRating ?? 0;
	start2.value = props?.schoolDTO?.overallRating ?? 0;
});
</script>

<style scoped lang="scss">
.e_content {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
}
.evaluate_box {
	display: flex;
	gap: 20rpx;
	font-size: 24rpx;
	.img_box_t {
		width: 60rpx;
		height: 60rpx;
	}
	.my_right {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		.phone {
			display: flex;
			justify-content: space-between;
			font-weight: bold;
			font-size: 28rpx;
			.time {
				font-weight: 500;
				font-size: 26rpx;
			}
		}
		.school_x {
			display: flex;
			gap: 10rpx;
			align-items: center;
			font-size: 28rpx;
		}
		.evaluate {
			display: flex;
			gap: 20rpx;
			color: #555;
			margin-top: -10rpx;
		}
		.evaluate_text {
			font-size: 28rpx;
			margin-bottom: 6rpx;
		}
		.img_box {
			display: flex;
			gap: 20rpx;
			flex-wrap: wrap;
		}
		.JX_JL {
			display: flex;
			align-items: center;
			gap: 20rpx;
			background-color: #f8f8f8;
			border-radius: 20rpx;
			padding: 20rpx;
			overflow: hidden;
			width: 100%;
			.rg {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				.jx_box {
					flex: 1;
				}
			}
		}
	}
}
</style>
