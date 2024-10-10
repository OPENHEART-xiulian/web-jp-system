<template>
	<view class="container">
		<score :data="JLData" :submitData="coachDTOs" :startList="JLStartList" />
		<score :data="JXData" :submitData="schoolDTOs" :startList="JXStartList" />
	</view>
	<view class="btn">
		<u-button
			@click="submitFn"
			:customStyle="
				!disabled
					? customStyleButtom
					: {
							...customStyleButtom,
							backgroundColor: '#f7e782',
					  }
			"
		>
			发布
		</u-button>
	</view>
</template>

<script setup lang="ts">
import score from './components/score/index.vue';
import { useThemeData } from '@/store';
import { customStyleButtom } from '@/utils/publicClassType';
import { createReviews } from '@/api/api';
const { data } = useThemeData();
const JLStartList = reactive([
	{
		title: '总体评分',
		startValue: 0,
	},
	{
		title: '专业技能',
		startValue: 0,
	},
	{
		title: '安全意识',
		startValue: 0,
	},
	{
		title: '管理能力',
		startValue: 0,
	},
	{
		title: '服务态度',
		startValue: 0,
	},
]);
const JXStartList = reactive([
	{
		title: '总体评分',
		startValue: 0,
	},
	{
		title: '服务态度',
		startValue: 0,
	},
	{
		title: '服务质量',
		startValue: 0,
	},
	{
		title: '教学设施',
		startValue: 0,
	},
	{
		title: '收费价格',
		startValue: 0,
	},
]);
const disabled = ref(true);
const coachDTOs = reactive({
	anonymousSubmit: 0,
	img: [],
	remark: '',
});
const schoolDTOs = reactive({
	anonymousSubmit: 0,
	img: [],
	remark: '',
});
const JLData = reactive({
	title: '您对教练满意吗？',
	name: '',
	img: '',
	placeholder: '告诉教练，激励他做得更好',
	frontAndBack: 1,
});
const JXData = reactive({
	title: '您对驾校满意吗？',
	placeholder: '告诉驾校，激励他做得更好',
	name: '',
	img: '',
	frontAndBack: 2,
});
const submitFn = () => {
	if (disabled.value) {
		uni.showToast({
			title: '教练和驾校需提交总体评分才可发布',
			icon: 'none',
		});
	} else {
		const { userId, id, schoolName, schoolId, coachId, coachName } = data;
		const coachDTO = toRaw(coachDTOs) as any;
		const schoolDTO = toRaw(schoolDTOs) as any;
		coachDTO.img = JSON.stringify(coachDTOs.img);
		schoolDTO.img = JSON.stringify(schoolDTOs.img);
		coachDTO.overallRating = JLStartList[0].startValue;
		coachDTO.professionalSkills = JLStartList[1].startValue;
		coachDTO.safetyAwareness = JLStartList[2].startValue;
		coachDTO.managementAbility = JLStartList[3].startValue;
		coachDTO.serviceAttitude = JLStartList[4].startValue;
		coachDTO.coachName = coachName;
		coachDTO.coachId = coachId;

		schoolDTO.overallRating = JXStartList[0].startValue;
		schoolDTO.serviceAttitude = JXStartList[1].startValue;
		schoolDTO.qualityOfService = JXStartList[2].startValue;
		schoolDTO.teachingFacilities = JXStartList[3].startValue;
		schoolDTO.feePrice = JXStartList[4].startValue;
		schoolDTO.schoolName = schoolName;
		schoolDTO.schoolId = schoolId;
		const params = {
			userId,
			trainingRecordsId: id,
			coachDTO,
			schoolDTO,
		};
		createReviews(params).then(() => {
			uni.showToast({
				title: '发布成功',
				success: () => {
					const time = setTimeout(() => {
						uni.navigateBack();
						clearTimeout(time);
					}, 600);
				},
			});
		});
	}
};
onShow(() => {
	JLData.img = data.coachImg;
	JLData.name = data.coachName;
	JXData.img = data.schoolImg;
	JXData.name = data.schoolName;
});
watchEffect(() => {
	if (JLStartList[0].startValue > 0 && JXStartList[0].startValue > 0) {
		disabled.value = false;
	}
});
</script>

<style scoped lang="scss">
::v-deep .u-textarea {
	background-color: #f8f8f8 !important;
	color: red !important;
}
.container {
	padding: 30rpx 30rpx 160rpx;
}
.btn {
	position: fixed;
	bottom: 80rpx;
	left: 0;
	width: 100vw;
	padding: 0 30rpx;
}
</style>
