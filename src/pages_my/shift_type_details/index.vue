<template>
	<view class="shift_type_details">
		<u-form :model="data" labelPosition="top" ref="form">
			<u-form-item label="班型名称" prop="className" labelWidth="500rpx">
				<u-input
					clearable
					@clear="data.className = ''"
					:disabled="!isRevise"
					:border="isRevise ? 'bottom' : 'none'"
					placeholder="请输入班型名称"
					v-model="data.className"
					disabledColor="none"
					type="text"
				>
				</u-input>
			</u-form-item>
			<u-form-item label="培训费用" prop="classPrice" labelWidth="500rpx">
				<u-input
					clearable
					@clear="data.classPrice = ''"
					:border="isRevise ? 'bottom' : 'none'"
					placeholder="请输入培训费用"
					:disabled="!isRevise"
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
			<u-form-item label="培训车型" prop="name" labelWidth="500rpx">
				<view>
					<u-picker
						:show="show"
						@cancel="cancel"
						@confirm="confirm"
						keyName="value"
						:columns="columns"
					/>
					<view
						class="picker"
						@click="
							() => {
								if (isRevise) {
									show = true;
								}
							}
						"
					>
						{{ data.classType }}
						<u-icon v-if="isRevise" size="24rpx" :name="show ? 'arrow-up' : 'arrow-down'" />
					</view>
				</view>
			</u-form-item>
			<u-form-item label="训练时段" labelWidth="500rpx">
				<view class="pxsd">
					<view
						class="xq"
						@click="
							() => {
								if (isRevise) {
									isShow = true;
								}
							}
						"
					>
						{{ data.startDate }}至{{ data.endDate }}
						<u-icon v-if="isRevise" size="24rpx" :name="isShow ? 'arrow-up' : 'arrow-down'" />
					</view>
					|
					<view :class="{ time: true, pointer: !isRevise }">
						<picker
							mode="time"
							:value="data.startTime"
							:end="data.endTime"
							@cancel="isStart = false"
							@change="startTimeChange"
						>
							<view class="start_time" @click="isStart = true">
								{{ data.startTime }}
								<u-icon size="24rpx" v-if="isRevise" :name="isStart ? 'arrow-up' : 'arrow-down'"
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
								<u-icon size="24rpx" v-if="isRevise" :name="isEnd ? 'arrow-up' : 'arrow-down'"
							/></view>
						</picker>
					</view>
				</view>
			</u-form-item>
		</u-form>
		<u-form :model="data" labelPosition="top">
			<u-form-item label="班型简介" prop="briefIntroduction" labelWidth="500rpx">
				<u-textarea
					clearable
					@clear="data.remark = ''"
					:border="isRevise ? 'bottom' : 'none'"
					:customStyle="{
						padding: '10rpx 0',
						background: 'none',
						fontSize: '30rpx',
					}"
					autoHeight
					:placeholder="isRevise ? '请输入班型简介' : '暂无数据'"
					:disabled="!isRevise"
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
		<u-button @click="submit" plain :customStyle="customStyleButtom" :loading="loading">
			{{ isRevise ? '保存' : '我要修改' }}
		</u-button>
	</view>
</template>

<script lang="ts" setup>
import week from '@/components/week/index.vue';
import { getDicValue, updateCarType } from '@/api/api';
import type { ListType } from '../shift_type/index.vue';
import { customStyleButtom } from '@/utils/publicClassType';
import { useUserInfo } from '@/store/userStore';
const store = useUserInfo();
const isRevise = ref(false); //是否修改
const show = ref(false); //是否显示
const loading = ref(false); //按钮加载
const columns = reactive<any[]>([]);
const data = ref<ListType>({
	className: '',
	classPrice: '',
	classType: '',
	remark: '',
	endDate: '',
	endTime: '',
	startDate: '',
	startTime: '',
});
const isShow = ref(false); //显示星期弹窗
const isStart = ref(false); //显示开始时间
const isEnd = ref(false); //显示结束时间
const form = ref<UniFormRef>();
const submit = () => {
	if (isRevise.value) {
		form.value?.validate().then(() => {
			loading.value = true;
			const {
				classId,
				className,
				classPrice,
				classType,
				remark,
				endDate,
				endTime,
				startDate,
				startTime,
				dtDriverSchoolId,
			} = data.value;
			const params = {
				classId,
				className,
				classPrice,
				classType,
				remark,
				endDate,
				endTime,
				startDate,
				startTime,
				dtDriverSchoolId,
			};
			updateCarType(params as any)
				.then(() => {
					uni.$u.toast('修改成功');
					isRevise.value = false;
				})
				.finally(() => {
					loading.value = false;
				});
		});
	} else {
		isRevise.value = true;
	}
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
onLoad((option: any) => {
	data.value = JSON.parse(option.data);
});
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
	padding: 30rpx;
	.pxsd {
		display: flex;
		align-items: center;
		gap: 20rpx;
		font-size: 30rpx;
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
	::v-deep .u-form-item__body__left {
		align-items: flex-start !important;
		background-image: linear-gradient(to right, #f7e8aa, transparent);
		padding: 4rpx 0 4rpx 30rpx;
		position: relative;
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
	::v-deep .u-form-item__body__right,
	::v-deep .u-form-item__body__right__message {
		padding-left: 30rpx;
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
