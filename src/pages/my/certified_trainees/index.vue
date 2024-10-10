<template>
	<view class="content">
		<u-form labelPosition="top" :model="model" labelAlign="left" ref="form">
			<u-form-item label="姓名" prop="name" labelWidth="130rpx">
				<u-input
					v-model="model.name"
					clearable
					@clear="model.name = ''"
					placeholder="请输入姓名"
					type="text"
					maxlength="11"
				>
				</u-input>
			</u-form-item>
			<u-form-item label="身份证" prop="cardNum" labelWidth="130rpx">
				<u-input
					type="idcard"
					clearable
					@clear="model.cardNum = ''"
					placeholder="请输入身份证号码"
					maxlength="18"
					v-model="model.cardNum"
				>
				</u-input>
			</u-form-item>
		</u-form>
	</view>
	<view class="btn">
		<u-button
			:customStyle="customStyleButtom"
			@click="submit"
			:loading="loading"
		>
			认证
		</u-button>
	</view>
	<u-modal
		:show="show"
		title="提示"
		:content="content"
		closeOnClickOverlay
		@close="affirm"
		@confirm="affirm"
	/>
</template>

<script setup lang="ts">
import { student, coach } from '@/api/api';
import { preserveUserMsg, returnToPage } from '@/utils/utils';
import { useUserInfo } from '@/store/userStore';
import { customStyleButtom } from '@/utils/publicClassType';
const { getUser, getRole } = useUserInfo();
const loading = ref(false);
const show = ref(false);
const form = ref<UniFormRef>();
const content = ref('');
const id = ref('1');
const userId = getUser()!.userId;
const model = reactive({
	name: '',
	cardNum: '',
});
//表单校验
const submit = () => {
	form.value?.validate().then(() => {
		loading.value = true;
		studentAndcoachFn()
			.then((res: any) => {
				const { message } = res.data;
				content.value = message;
				preserveUserMsg(res.data);
				show.value = true;
			})
			.finally(() => {
				loading.value = false;
			});
	});
};
// 校验规则
const rules = reactive({
	name: [
		{
			required: true,
			message: '请输入姓名',
			trigger: ['blur'],
		},
		{
			validator: (rule: any, value: any) => {
				return /^(?:[\u4e00-\u9fa5·]{2,16})$/.test(value);
			},
			message: '姓名不正确',
			// 触发器可以同时用blur和change
			trigger: ['blur'],
		},
	],
	cardNum: [
		{
			required: true,
			message: '请输入身份证号码',
			trigger: ['blur'],
		},
		{
			validator: (rule: any, value: any) => {
				return (
					/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(
						value
					) ||
					/^[a-zA-Z]\d{6}\([\dA]\)$/.test(value) ||
					/^[1|5|7]\d{6}\(\d\)$/.test(value)
				);
			},
			message: '身份证号码不正确',
			trigger: ['blur'],
		},
	],
});
//学员/教练认证
const studentAndcoachFn = () => {
	if (id.value == '1') {
		return student({ ...model, userId });
	}
	return coach({ ...model, userId });
};
const affirm = () => {
	show.value = false;
	const ids = getRole()![0].id;
	if (id.value == ids) {
		//如果认证成功就返回入口页面
		returnToPage();
	}
};
onLoad((option: any) => {
	id.value = option.id;
	uni.setNavigationBarTitle({
		title: id.value == '1' ? '学员认证' : '教练认证',
	});
});

onReady(() => {
	form.value?.setRules(rules);
});
</script>

<style scoped lang="scss">
.content {
	padding: 100rpx 80rpx 120rpx;
	margin: 30rpx;
	background-color: #fff;
	border-radius: 20rpx;
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
