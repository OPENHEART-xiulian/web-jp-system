<template>
	<view class="content">
		<image class="logo_img" :src="src" />
		<view class="terrace_name"> 优驾天下 </view>
		<u-form labelPosition="left" :model="model" ref="form">
			<u-form-item prop="userInfo.mobile" labelWidth="10rpx" ref="item1">
				<u-input
					placeholder="请输入手机号"
					v-model="model.userInfo.mobile"
					type="number"
					maxlength="11"
					border="bottom"
				>
					<template #prefix>
						<view>+86</view>
					</template>
				</u-input>
			</u-form-item>
			<u-form-item prop="userInfo.code" labelWidth="10rpx">
				<u-input
					type="number"
					placeholder="请输入验证码"
					maxlength="4"
					border="bottom"
					v-model="model.userInfo.code"
				>
					<template #suffix>
						<u-button
							@click="getCode"
							:disabled="isBegin"
							:loading="loading2"
							:text="timeText"
							type="success"
							size="mini"
						></u-button>
					</template>
				</u-input>
			</u-form-item>
		</u-form>
		<u-button @click="submit" :loading="loading">提交</u-button>
	</view>
</template>

<script setup lang="ts">
import { sendCode, phoneCodeLogin } from '@/api/api';
import { preserveUserMsg } from '@/utils/utils';
import { useTimerLeft } from '@/hooks';
const src = ref(
	'https://cdn.jsdelivr.net/gh/linqingjie/image@master/img/gd.jpg'
);
const loading = ref(false);
const loading2 = ref(false);
const form = ref<UniFormRef>();
const codeSending = ref<any>(null); //是否发送验证码
const model = reactive({
	userInfo: {
		mobile: '',
		code: '',
	},
});
// 校验规则
const rules = reactive({
	'userInfo.mobile': [
		{
			required: true,
			message: '请输入手机号',
			trigger: ['blur'],
		},
		{
			validator: (rule: any, value: any) => {
				// 返回true表示校验通过，返回false表示不通过
				// uni.$u.test.mobile()就是返回true或者false的
				return uni.$u.test.mobile(value);
			},
			message: '手机号码不正确',
			// 触发器可以同时用blur和change
			trigger: ['blur'],
		},
	],
	'userInfo.code': [
		{
			required: true,
			message: '请输入验证码',
			trigger: ['blur'],
		},
		{
			validator: (rule: any, value: any) => {
				return uni.$u.test.code(value, 4);
			},
			message: '验证码不正确',
			trigger: ['blur'],
		},
	],
});
const { beginTimer, isBegin, timeText } = useTimerLeft({ timeCount: 10 });
//发送按钮
const getCode = () => {
	form.value?.validateField('userInfo.mobile', (error: any) => {
		if (error.length > 0 || codeSending.value) return;
		loading2.value = true;
		sendCode({ phoneNumber: model.userInfo.mobile })
			.then(() => {
				beginTimer();
			})
			.finally(() => {
				loading2.value = false;
			});
	});
};

//表单校验
const submit = () => {
	form.value?.validate().then(() => {
		loading.value = true;
		const { mobile: phoneNumber, code } = model.userInfo;
		phoneCodeLogin({ phoneNumber, code })
			.then((res: any) => {
				uni.$u.toast('登录成功');
				preserveUserMsg(res.data);
				const { role } = res.data;
				if (role.id === '4') {
					uni.navigateTo({
						url: '/pages/my/switch_identity/index',
					});
				} else {
					uni.switchTab({ url: '/pages/my/my_page/index' });
				}
			})
			.finally(() => {
				loading.value = false;
			});
	});
};

onReady(() => {
	form.value?.setRules(rules);
});
onUnmounted(() => {
	clearInterval(codeSending.value);
});
</script>

<style scoped lang="scss">
.content {
	padding: 0 40rpx;
}
.logo_img {
	width: 160rpx;
	height: 160rpx;
	display: block;
	margin: 100rpx auto 20rpx;
	border-radius: 50%;
}
.terrace_name {
	text-align: center;
	margin-bottom: 80rpx;
}
</style>
