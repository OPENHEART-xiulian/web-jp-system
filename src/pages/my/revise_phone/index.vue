<template>
	<view class="content">
		<u-form labelPosition="left" :model="model" ref="form">
			<u-form-item
				v-if="!isVerification"
				label="原手机号"
				prop="phone"
				labelWidth="130rpx"
				ref="item1"
			>
				<u-input v-model="model.phone" type="number" disabled maxlength="11" border="bottom">
				</u-input>
			</u-form-item>
			<u-form-item v-else label="新手机号" prop="mobile" labelWidth="130rpx" ref="item1">
				<u-input
					clearable
					@clear="model.mobile = ''"
					placeholder="请输入新手机号码"
					v-model="model.mobile"
					type="number"
					maxlength="11"
					border="bottom"
				>
				</u-input>
			</u-form-item>
			<u-form-item prop="code" label="验证码" labelWidth="130rpx">
				<u-input
					type="number"
					placeholder="请输入验证码"
					maxlength="4"
					border="bottom"
					v-model="model.code"
				>
					<template #suffix>
						<u-button
							@click="getCode"
							:hairline="false"
							:customStyle="{
								backgroundColor: '#fff',
								color: '#000',
								border: '2rpx solid #cacaca',
								height: '52rpx',
								borderRadius: '26rpx',
								padding: '0 10rpx',
								fontSize: '20rpx',
							}"
							loadingText="加载中"
							:disabled="isBegin"
							:loading="loading2"
							:text="timeText"
							type="success"
						></u-button>
					</template>
				</u-input>
			</u-form-item>
		</u-form>
	</view>
	<view class="btn">
		<u-button @click="submit" :customStyle="customStyleButtom" :loading="loading">
			{{ isVerification ? '绑定新手机号' : '验证原手机号' }}
		</u-button>
	</view>
</template>

<script setup lang="ts">
import { sendCode, updateUserInfo, checkoutCode } from '@/api/api';
import { desensitization } from '@/utils/utils';
import { useUserInfo } from '@/store/userStore';
import { customStyleButtom } from '@/utils/publicClassType';
import { useTimerLeft } from '@/hooks/index';
import { storeToRefs } from 'pinia';
const store = useUserInfo();
const { userMsg, userInfo } = storeToRefs(store);
const loading = ref(false);
const loading2 = ref(false);
const form = ref<UniFormRef>();
const countDown = 60; //发验证码间隔
const dateNumber = ref(countDown);
const Interval = ref<any>(null); //定时器
const isVerification = ref(false); //是否校验过原手机号
const model = reactive({
	phone: '',
	mobile: '',
	code: '',
});
// 校验规则
const rules = reactive({
	mobile: [
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
	code: [
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
const { beginTimer, revise, isBegin, timeText } = useTimerLeft();
//发送按钮
const getCode = () => {
	form.value?.validateField('userInfo.mobile', (error: any) => {
		if (error.length > 0 || Interval.value) return;
		loading2.value = true;
		const phoneNumber = isVerification.value ? model.mobile : userMsg.value!.phoneNumber;
		sendCode({ phoneNumber })
			.then(beginTimer)
			.finally(() => {
				loading2.value = false;
			});
	});
};
//表单校验
const submit = () => {
	form.value
		?.validate()
		.then((res: any) => {
			if (isVerification.value) {
				updateUserInfoFn();
			} else {
				checkoutCodeFn();
			}
		})
		.catch((errors: any) => {});
};
//重置验证码状态
const resetting = () => {
	revise();
	isVerification.value = true;
	dateNumber.value = countDown;
	model.code = '';
};
// 验证验证码
const checkoutCodeFn = () => {
	loading.value = true;
	const { code } = model;
	checkoutCode({ phoneNumber: userMsg.value!.phoneNumber, code })
		.then(() => {
			resetting();
		})
		.finally(() => {
			loading.value = false;
		});
};
//修改号码
const updateUserInfoFn = () => {
	loading.value = true;
	const { code, mobile } = model;
	updateUserInfo({
		phoneNumber: mobile,
		code,
		id: userInfo.value!.userId,
		roleId: userInfo.value!.roleId,
	})
		.then((res: any) => {
			const { phoneNumber } = res.data;
			userInfo.value!.phoneNumber = phoneNumber;
			userMsg.value!.phoneNumber = phoneNumber;
			store.setUser(userInfo.value);
			uni.showToast({
				title: '更改号码成功',
				icon: 'none',
				success: () => {
					const time = setTimeout(() => {
						uni.navigateBack();
						revise();
						clearTimeout(time);
					}, 600);
				},
			});
		})
		.finally(() => {
			loading.value = false;
		});
};
watch(isVerification, () => {
	if (isVerification.value) {
		uni.setNavigationBarTitle({
			title: '绑定新手机号',
		});
	}
});

onReady(() => {
	form.value?.setRules(rules);
});
onUnmounted(() => {
	clearInterval(Interval);
});
onShow(() => {
	model.phone = desensitization(userMsg.value!.phoneNumber);
});
</script>

<style scoped lang="scss">
.content {
	padding: 20rpx 30rpx;
	background-color: #fff;
	margin: 30rpx;
	border-radius: 20rpx;
	::v-deep .u-input {
		background-color: #fff !important;
	}
	::v-deep .u-button__text {
		font-size: 24rpx !important;
	}
	::v-deep .u-input__content__subfix-icon {
		width: 200rpx !important;
	}
}
.terrace_name {
	text-align: center;
	margin-bottom: 80rpx;
}
.btn {
	margin-top: 160rpx;
	padding: 0 40rpx;
}
</style>
