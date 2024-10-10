<script setup lang="ts">
import { useReportData } from '@/store';
import { useUserInfo } from '@/store/userStore';
import upload from '@/components/upload/index.vue';
import { customStyleButtom } from '@/utils/publicClassType';
import { createReport, getUserReport } from '@/api/api';
import pop from './components/popComponent/index.vue';
const imageStyles = {
	dividline: true,
	border: {
		width: 2,
		style: 'dashed',
		radius: 2,
	},
	width: '212rpx',
	height: '212rpx',
};
const show = ref(false);
const store = useReportData();
const storeUser = useUserInfo();
onShow(() => {
	const { value, children, id } = store.data!;
	uni.setNavigationBarTitle({
		title: '举报' + value,
	});
	array.value = children;
	model.reportTypeParentName = value;
	model.reportTypeParentId = id;
	const { phoneNumber, userId } = storeUser.getUser()!;
	model.userPhoneNumber = phoneNumber;
	model.userId = userId;
});
const model = reactive<any>({
	city: '',
	county: '',
	remark: '',
	img: [],
	region: '',
	reportTypeId: '',
	reportTypeName: '',
	schoolOrCoachAddress: '',
	schoolOrCoachName: '',
	userId: '',
	userName: '',
	userCardNumber: '',
	userPhoneNumber: '',
	reportTypeParentName: '',
	reportTypeParentId: 0,
});
const address = ref([]);
const array = ref<any>();
// 校验规则
const rules = reactive({
	userName: [
		{
			required: true,
			message: '请输入姓名',
			trigger: ['blur'],
		},
		{
			validator: (rule: any, value: any) => {
				return /^(?:[\u4e00-\u9fa5]{2,16})$/.test(value);
			},
			message: '姓名不正确',
			// 触发器可以同时用blur和change
			trigger: ['blur'],
		},
	],
	schoolOrCoachAddress: [
		{
			required: true,
			message: '请输入详细地址',
			trigger: ['blur'],
		},
	],
	schoolOrCoachName: [
		{
			required: true,
			message: '请输入涉事驾校/教练名称',
			trigger: ['blur'],
		},
		{
			validator: (rule: any, value: any) => {
				return /^(?:[\u4e00-\u9fa5,a-z,A-Z]{2,20})(\/(?:[\u4e00-\u9fa5·,\\]{2,20}))?$/.test(
					value
				);
			},
			message: '涉事驾校/教练名称不正确',
			// 触发器可以同时用blur和change
			trigger: ['blur'],
		},
	],
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

	city: [
		{
			required: true,
			message: '选择所在地市区域',
			trigger: ['blur'],
		},
	],
	reportTypeName: [
		{
			required: true,
			message: '请选择违法类型',
			trigger: ['blur'],
		},
	],
	remark: [
		{
			required: true,
			message: '请输入具体情况描述',
			trigger: ['blur'],
		},
	],
});
watchEffect(() => {
	model.city;
	form2?.value?.validateField('city', (error: any) => {
		if (error.length > 0) return;
	});
});
watchEffect(() => {
	model.reportTypeName;
	form3?.value?.validateField('reportTypeName', (error: any) => {
		if (error.length > 0) return;
	});
});
const form = ref<UniFormRef>();
const form2 = ref<UniFormRef>();
const form3 = ref<UniFormRef>();
onReady(() => {
	form.value!.setRules(rules);
	form2.value!.setRules(rules);
	form3.value!.setRules(rules);
});
const bindDateChange = (event: any) => {
	const { code, value } = event.detail;
	model.city = code?.[1];
	model.county = code?.[2];
	address.value = value;
	model.region = value.join(',');
};
const bindPickerChange = (event: any) => {
	const index = event.detail.value;
	model.reportTypeName = array.value[index].value;
	model.reportTypeId = index;
};
const callback = (data: any) => {
	model.img = model.img.concat(data.data);
};
const deleteFn = (index: number) => {
	model.img.splice(index, 1);
};
const submit = () => {
	Promise.all([
		form.value!.validate(),
		form2.value!.validate(),
		form3.value!.validate(),
	])
		.then(() => {
			const data = toRaw(model);
			data.reportTypeId = array.value[data.reportTypeId].id;
			data.img = JSON.stringify(data.img) as string;
			return createReport(data);
		})
		.then(res => {
			show.value = true;
		})
		.catch(() => {});
};
const getData = () => {
	const { userId, roleId } = storeUser.getUser()!;
	getUserReport({ userId, roleId }).then((res: any) => {
		const { userCardNumber, userName, userPhoneNumber } = res.data;
		model.userPhoneNumber = userPhoneNumber;
		model.userCardNumber = userCardNumber;
		model.userName = userName;
	});
};
onShow(getData);
</script>

<template>
	<u-form :model="model" labelAlign="left" ref="form">
		<view class="title">
			<u-icon color="#aaa" name="info-circle"></u-icon>
			您提交的内容和个人隐私信息会被平台严格保密
		</view>
		<view class="form_item_box">
			<u-form-item
				label="姓名"
				prop="userName"
				:borderBottom="true"
				labelWidth="200rpx"
			>
				<u-input
					border="none"
					v-model="model.userName"
					clearable
					@clear="model.userName = ''"
					placeholder="请输入姓名"
					type="text"
					maxlength="20"
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
					disabled
					disabledColor="#fff"
					border="none"
					type="idcard"
					clearable
					@clear="model.userCardNumber = ''"
					placeholder="请输入身份证号"
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
	</u-form>
	<u-form :model="model" labelPosition="top" labelAlign="left" ref="form2">
		<view class="title"> 涉事驾校/教练 </view>
		<view class="form_item_box">
			<u-form-item
				label="涉事驾校/教练名称"
				prop="schoolOrCoachName"
				:borderBottom="true"
				labelWidth="400rpx"
			>
				<u-input
					border="none"
					v-model="model.schoolOrCoachName"
					clearable
					@clear="model.schoolOrCoachName = ''"
					placeholder="请输入涉事驾校/教练名称"
					type="text"
					maxlength="40"
				>
				</u-input>
			</u-form-item>
			<u-form-item
				:borderBottom="true"
				label="涉事驾校地址/教练住址"
				prop="city"
				labelWidth="400rpx"
			>
				<picker mode="region" :value="address" @change="bindDateChange">
					<view
						:style="{
							color: model.region ? '#000' : '#c0c4cf',
							fontSize: '30rpx',
						}"
						>{{ model.region || '选择所在地市区域' }}</view
					>
				</picker>
			</u-form-item>
			<u-form-item
				:borderBottom="true"
				prop="schoolOrCoachAddress"
				labelWidth="400rpx"
			>
				<u-input
					border="none"
					type="text"
					clearable
					@clear="model.schoolOrCoachAddress = ''"
					placeholder="请输入详细地址"
					maxlength="30"
					v-model="model.schoolOrCoachAddress"
				>
				</u-input>
			</u-form-item>
		</view>
	</u-form>
	<u-form :model="model" labelPosition="top" labelAlign="left" ref="form3">
		<view class="title">举报信息</view>
		<view class="form_item_box">
			<u-form-item
				label="违法类型"
				prop="reportTypeName"
				:borderBottom="true"
				labelWidth="400rpx"
			>
				<picker
					range-key="value"
					@change="bindPickerChange"
					:value="model.reportTypeId"
					:range="array"
				>
					<view
						:style="{
							color: model.reportTypeName ? '#000' : '#c0c4cf',
							fontSize: '30rpx',
						}"
					>
						{{ model.reportTypeName || '选择违法类型' }}
					</view>
				</picker>
			</u-form-item>
			<u-form-item
				label="具体情况描述"
				prop="remark"
				:borderBottom="true"
				labelWidth="200rpx"
			>
				<u-textarea
					height="300rpx"
					:maxlength="-1"
					:placeholderStyle="{ fontSize: '30rpx', color: '#c0c4d6' }"
					v-model="model.remark"
					border="none"
					:customStyle="{ padding: 0 }"
					placeholder="请输入具体情况描述"
				/>
			</u-form-item>
			<u-form-item label="证据图片" :borderBottom="false" labelWidth="200rpx">
				<upload
					:imageStyles="imageStyles"
					:limit="10"
					@callback="callback"
					@delete="deleteFn"
				>
					<u-icon
						name="photo"
						labelPos="bottom"
						size="30"
						:space="10"
						labelSize="26rpx"
					></u-icon>
				</upload>
			</u-form-item>
		</view>
	</u-form>
	<view class="btn">
		<u-button :customStyle="customStyleButtom" @click="submit"> 提交 </u-button>
	</view>
	<pop v-model:show="show" />
</template>

<style scoped lang="scss">
:global(page) {
	padding-bottom: 200rpx;
}
.title {
	line-height: 90rpx;
	padding: 0 30rpx;
	display: flex;
	align-items: center;
	gap: 10rpx;
	color: #aaa;
	font-size: 28rpx;
}
.form_item_box {
	background-color: #fff;
	padding: 0 30rpx;
}
.btn {
	width: 100%;
	box-sizing: border-box;
	padding: 0 40rpx;
	position: fixed;
	bottom: 80rpx;
	left: 0;
}
</style>
