<template>
	<view class="shift_type_details">
		<u-form :model="data" labelPosition="top" ref="form">
			<u-form-item label="班型名称" prop="className" labelWidth="130rpx">
				<u-input
					border="bottom"
					placeholder="请输入班型名称"
					v-model="data.className"
					disabledColor="none"
					type="text"
				>
				</u-input>
			</u-form-item>

			<u-form-item label="培训费用" prop="classPrice" labelWidth="130rpx">
				<u-input
					border="bottom"
					placeholder="请输入培训费用"
					disabledColor="none"
					v-model="data.classPrice"
					type="digit"
					maxlength="11"
				>
					<template #prefix>
						<view>￥</view>
					</template>
				</u-input>
			</u-form-item>
			<u-form-item label="培训车型" prop="name" labelWidth="130rpx">
				<view>
					<u-picker
						:show="show"
						@cancel="cancel"
						@confirm="confirm"
						keyName="value"
						:columns="columns"
					/>
					<view class="picker" @click="show = true">
						{{ data.classType }}
						<u-icon size="24rpx" :name="show ? 'arrow-up' : 'arrow-down'" />
					</view>
				</view>
			</u-form-item>
			<u-form-item label="训练时段" labelWidth="130rpx">
				<view class="pxsd">
					<view class="xq" @click="isShow = true">
						{{ data.startDate }}至{{ data.endDate }}
						<u-icon size="24rpx" :name="isShow ? 'arrow-up' : 'arrow-down'" />
					</view>
					|
					<view :class="{ time: true }">
						<picker
							mode="time"
							:value="data.startTime"
							:end="data.endTime"
							@cancel="isStart = false"
							@change="startTimeChange"
						>
							<view class="start_time" @click="isStart = true">
								{{ data.startTime }}
								<u-icon
									size="24rpx"
									:name="isStart ? 'arrow-up' : 'arrow-down'"
							/></view>
						</picker>
						-
						<picker
							mode="time"
							:value="data.endTime"
							:start="data.startTime"
							@cancel="isEnd = false"
							@change="endTimeChange"
						>
							<view class="start_time" @click="isEnd = true">
								{{ data.endTime }}
								<u-icon size="24rpx" :name="isEnd ? 'arrow-up' : 'arrow-down'"
							/></view>
						</picker>
					</view>
				</view>
			</u-form-item>
			<u-form-item
				label="班型简介"
				prop="briefIntroduction"
				labelWidth="130rpx"
			>
				<u-textarea
					:customStyle="{
						padding: '10rpx 0',
						background: 'none',
					}"
					autoHeight
					border="bottom"
					placeholder="请输入班型简介"
					v-model="data.remark"
					:maxlength="-1"
					type="text"
				>
				</u-textarea>
			</u-form-item>
		</u-form>
		<week
			@define="define"
			@close="isShow = false"
			:show="isShow"
			:startDate="data.startDate"
			:endDate="data.endDate"
		/>
	</view>
	<view class="btn">
		<u-button
			@click="submit"
			plain
			:customStyle="customStyleButtom"
			:loading="loading"
		>
			保存
		</u-button>
	</view>
</template>

<script lang="ts" setup>
import week from '@/components/week/index.vue';
import { getDicValue, createCarType } from '@/api/api';
import { customStyleButtom } from '@/utils/publicClassType';
import { useUserInfo } from '@/store/userStore';
interface DataType {
	className: string;
	classPrice: string;
	classType: string;
	remark: string;
	endDate: string;
	startDate: string;
	endTime: any;
	startTime: any;
}
const store = useUserInfo();
const show = ref(false); //是否显示
const loading = ref(false); //按钮加载
const columns = reactive<any[]>([]);
const dtDriverSchoolId = store.getUserMsg()!.schoolId;
const data = ref<DataType>({
	className: '',
	classPrice: '',
	classType: '',
	remark: '',
	endDate: '周日',
	startDate: '周一',
	endTime: '21:00',
	startTime: '09:00',
});
const isShow = ref(false); //显示星期弹窗
const isStart = ref(false); //显示开始时间
const isEnd = ref(false); //显示结束时间
const form = ref<UniFormRef>();
const submit = () => {
	form.value?.validate().then(() => {
		loading.value = true;
		createCarType({ ...data.value, dtDriverSchoolId })
			.then(() => {
				data.value = {
					className: '',
					classPrice: '',
					classType: columns[0][0].value,
					remark: '',
					endDate: '周日',
					startDate: '周一',
					endTime: '21:00',
					startTime: '09:00',
				};
				uni.$u.toast('保存成功');
			})
			.finally(() => {
				loading.value = false;
			});
	});
};
const cancel = () => {
	show.value = false;
};
const confirm = (e: any) => {
	data.value.classType = e.value[0].value;
	show.value = false;
};
const getDicValueFn = () => {
	getDicValue({
		tableName: 'dic_car_type',
		userId: store.getUser()!.userId,
	}).then((res: any) => {
		columns[0] = res.data;
		if (data.value.classType == '') {
			data.value.classType = res.data[0].value;
		}
	});
};
const define = (res: any) => {
	const { startDate, endDate } = res;
	data.value.startDate = startDate;
	data.value.endDate = endDate;
};
const startTimeChange = (e: any) => {
	data.value.startTime = e.detail.value;

	isStart.value = false;
};
const endTimeChange = (e: any) => {
	data.value.endTime = e.detail.value;
	isEnd.value = false;
};
onShow(getDicValueFn);
// 校验规则
const rules = reactive({
	className: [
		{
			required: true,
			message: '请输入班型名称',
			trigger: ['blur'],
		},
		// {
		// 	validator: (rule: any, value: any) => {
		// 		console.log(value);
		// 		return /^[a-zA-Z0-9_.-]{1,20}$/.test(value);
		// 	},
		// 	message: '名称不可包含特殊字符',
		// 	trigger: ['blur'],
		// },
	],
	classPrice: [
		{
			required: true,
			message: '请输入培训费用',
			trigger: ['blur'],
		},
		{
			validator: (rule: any, value: any) => {
				return /^\d+(\.\d{1,2})?$/.test(value);
			},
			message: '请输入正确的培训费用',
			trigger: ['blur'],
		},
	],
});

onReady(() => {
	form.value?.setRules(rules);
});
</script>

<style scoped lang="scss">
.shift_type_details {
	margin-top: -20rpx;
	.pxsd {
		display: flex;
		align-items: center;
		gap: 20rpx;
		font-size: 24rpx;
		height: 60rpx;
		.time {
			display: flex;
			align-items: center;
			gap: 10rpx;
		}
		.pointer {
			pointer-events: none;
		}
		.xq,
		.start_time {
			display: flex;
			align-items: center;
			height: 100%;
		}
	}
	.picker {
		display: flex;
		align-items: center;
		height: 100%;
		gap: 10rpx;
	}
	::v-deep .u-textarea {
		background: none !important;
	}
}
.btn {
	padding: 0 30rpx;
	width: 100vw;
	position: fixed;
	bottom: 80rpx;
	left: 0;
	box-sizing: border-box;
	z-index: 999;
}
</style>
