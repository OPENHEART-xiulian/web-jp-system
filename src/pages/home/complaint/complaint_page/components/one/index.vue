<template>
	<u-form :model="model" labelAlign="left" ref="form">
		<view class="one">
			<u-form-item
				label="投诉人姓名"
				prop="userName"
				:borderBottom="true"
				labelWidth="200rpx"
			>
				<u-input
					disabledColor="#fff"
					color="#c0c4cc"
					border="none"
					disabled
					v-model="model.userName"
					clearable
					@clear="model.userName = ''"
					placeholder="暂无数据"
					type="text"
					maxlength="11"
				>
				</u-input>
			</u-form-item>

			<u-form-item
				:borderBottom="true"
				label="身份证号"
				prop="userCardNumber"
				labelWidth="200rpx"
			>
				<u-input
					disabledColor="#fff"
					color="#c0c4cc"
					border="none"
					disabled
					type="idcard"
					clearable
					@clear="model.userCardNumber = ''"
					placeholder="暂无数据"
					maxlength="18"
					v-model="model.userCardNumber"
				>
				</u-input>
			</u-form-item>
			<u-form-item
				label="联系手机号"
				prop="userPhoneNumber"
				labelWidth="200rpx"
			>
				<u-input
					border="none"
					type="number"
					maxlength="11"
					clearable
					@clear="model.userPhoneNumber = ''"
					placeholder="请输入联系人手机号"
					v-model="model.userPhoneNumber"
				>
				</u-input>
			</u-form-item>
		</view>
		<view class="one" v-if="model.trainingList.length > 0">
			<u-form-item label="培训时段" prop="timeIndexList" labelWidth="200rpx">
				<time-slot
					:timeIndexList="model.timeIndexList"
					:trainingList="model.trainingList"
					@close="timeSlotShow = false"
					@define="
						list => {
							model.timeIndexList = list;
						}
					"
					:show="timeSlotShow"
				/>
				<view
					class="picker"
					:class="{ boxColor: !model.date }"
					@click="timeSlotShow = true"
				>
					<view>
						<view>
							{{ model.date?.startTime || '请选择发生纠纷的培训时段' }}
						</view>
						<view v-if="model.date?.endTime">至 {{ model.date?.endTime }}</view>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</u-form-item>
		</view>
		<view class="one">
			<u-form-item
				label="投诉驾校"
				prop="schollIndex"
				:borderBottom="true"
				labelWidth="200rpx"
			>
				<select-school
					:schoollist="model.schoolList"
					:schollIndex="model.schollIndex"
					@updataIndex="
						index => {
							model.schollIndex = index;
						}
					"
					@close="show = false"
					:show="show"
				/>
				<view
					class="picker"
					:class="{
						boxColor: !model.schoolList[model.schollIndex]?.spaBranchCampusName,
					}"
					@click="show = true"
				>
					<view class="address">
						{{
							model.schoolList[model.schollIndex]?.spaBranchCampusName ||
							'请选择要投诉的场地（选填）'
						}}
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</u-form-item>

			<u-form-item label="投诉教练" prop="spaCoachName" labelWidth="200rpx">
				<view>
					<ba-tree-picker
						confirmColor="#fddc13"
						:multiple="true"
						:selectedData="model.coachId.split(',')"
						ref="treePicker"
						@select-change="selectChange"
						title="选择教练"
						:localdata="model.coachList"
						valueKey="spaCoachId"
						textKey="spaCoachName"
						childrenKey="children"
					/>
					<view
						class="picker"
						:class="{ boxColor: !model.spaCoachName }"
						@click="showPicker"
					>
						{{ model.spaCoachName || '请选择要投诉的教练（选填）' }}
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</u-form-item>
		</view>
	</u-form>
</template>

<script setup lang="ts">
import baTreePicker from '@/components/baTreePicker/index';
import timeSlot from '../timeSlot/index.vue';
import selectSchool from '../selectSchool/index.vue';
import type { ModelType } from '../../index.vue';
interface Props {
	model: ModelType;
}

const props = defineProps<Props>();
const show = ref(false); //是否显示
const timeSlotShow = ref(false);
const treePicker = ref<any>(null);
const showPicker = () => {
	treePicker.value._show();
};
const selectChange = (ids: string[], names: string) => {
	props.model.spaCoachName = names;
	props.model.coachId = ids.join(',');
};
const form = ref<UniFormRef>();
// 校验规则
const rules = reactive({
	userPhoneNumber: [
		{
			required: true,
			message: '请输入联系手机号',
			trigger: ['blur'],
		},
		{
			validator: (rule: any, value: any) => {
				return uni.$u.test.mobile(value);
			},
			message: '手机号码不正确',
			trigger: ['blur'],
		},
	],
	timeIndexList: [
		{
			validator: (rule: any, value: any) => {
				return value[0] >= 0;
			},
			message: '请选择发生纠纷的培训时段',
			trigger: ['blur'],
		},
	],
});
watchEffect(() => {
	const timeIndexList = props.model.timeIndexList;
	props.model.date =
		props.model.trainingList?.[timeIndexList[0]]?.trainingTimeList?.[
			timeIndexList[1]
		];
});
watchEffect(() => {
	props.model.timeIndexList;
	form?.value?.validateField('timeIndexList', (error: any) => {
		if (error.length > 0) return;
	});
});
watchEffect(() => {
	props.model.isTrue =
		props.model.trainingList.length > 0 && props.model.timeIndexList[0] >= 0;
});
onReady(() => {
	form.value?.setRules(rules);
});
defineExpose({
	formFn: (callback: any) => {
		form.value?.validate().then(callback);
	},
});
</script>

<style scoped lang="scss">
.one {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 0 40rpx;
	margin-bottom: 20rpx;
	.picker {
		width: 410rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #000;
		font-size: 28rpx;
		.address {
			font-size: 28rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.boxColor {
		color: #c0c4cc;
	}
}
</style>
