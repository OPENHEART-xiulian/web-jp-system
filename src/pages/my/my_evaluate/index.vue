<template>
	<view class="my_evaluate">
		<evaluate
			:coachDTO="item.coachEntity"
			:schoolDTO="item.schoolEntity"
			v-for="(item, index) in list"
			:key="index"
			:status="3"
			:isJumpBox="true"
		/>
		<no-data v-if="list.length == 0" />
		<u-loadmore
			v-else
			:marginTop="40"
			@loadmore="loadmore"
			:status="list.length < paramsData.total ? 'loadmore' : 'nomore'"
			line
		/>
	</view>
</template>

<script setup lang="ts">
import { getStudentEvaluateList } from '@/api/api';
import noData from '@/components/noData/index.vue';
import evaluate from '@/components/evaluation/index.vue';
import { useListData } from '@/hooks';
import { _src } from '@/utils/utils';
import { useUserInfo } from '@/store/userStore';
export interface coachEntityType {
	anonymousSubmit: number;
	coachId: string;
	headSculpture: string;
	coachName: string;
	coachPhoto: string;
	createTime: string;
	id: string;
	img: any;
	managementAbility: number;
	overallRating: number;
	professionalSkills: number;
	remark: string;
	safetyAwareness: number;
	serviceAttitude: number;
	trainingRecordsId: string;
	trainingTime: string;
	userId: string;
	userName: string;
}
export interface schoolEntityType {
	anonymousSubmit: number;
	createTime: string;
	headSculpture: string;
	feePrice: number;
	id: string;
	img: any;
	overallRating: number;
	qualityOfService: number;
	remark: string;
	schoolId: string;
	schoolName: string;
	schoolPhoto: string;
	serviceAttitude: number;
	teachingFacilities: number;
	trainingRecordsId: string;
	trainingTime: string;
	userId: string;
	userName: string;
}
interface ListType {
	coachEntity: coachEntityType;
	schoolEntity: schoolEntityType;
}
const { roleId, userId } = useUserInfo().getUser()!;
const callbackFn = (list: ListType[]) => {
	return list.map(v => {
		try {
			v.coachEntity.coachPhoto = JSON.parse(_src(v.coachEntity.coachPhoto ?? '[]'))?.[0];
			v.coachEntity.img = JSON.parse(_src(v.coachEntity.img ?? '[]'));
			v.schoolEntity.schoolPhoto = JSON.parse(_src(v.schoolEntity.schoolPhoto ?? '[]'))?.[0];
			v.schoolEntity.img = JSON.parse(_src(v.schoolEntity.img ?? '[]'));
			v.coachEntity.headSculpture = JSON.parse(_src(v.coachEntity.headSculpture ?? '[]'))?.[0];
			v.schoolEntity.headSculpture = JSON.parse(_src(v.schoolEntity.headSculpture ?? '[]'))?.[0];
		} catch {
			console.log('图片转换失败');
		}
		return v;
	});
};
const { getData, loadmore, resetData, paramsData, list } = useListData<ListType>({
	getFn: getStudentEvaluateList,
	callbackFn,
	params: { roleId, userId },
	pageSize: 10,
	pageNumber: 1,
	listKey: 'evaluateList',
});
onShow(() => {
	resetData();
	getData();
});
</script>

<style scoped lang="scss">
.my_evaluate {
	padding: 30rpx;
}
</style>
