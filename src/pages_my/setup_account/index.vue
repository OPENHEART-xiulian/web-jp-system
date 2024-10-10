<template>
	<view class="setup_account">
		<u-form labelPosition="left" :model="model" ref="form">
			<u-form-item
				prop="phoneNumber"
				labelWidth="100rpx"
				label="手机号"
				ref="item1"
			>
				<u-input
					placeholder="请输入手机号"
					v-model="model.phoneNumber"
					type="number"
					maxlength="11"
					clearable
					@clear="model.phoneNumber = ''"
					border="bottom"
				/>
			</u-form-item>
		</u-form>
		<view class="tips">
			此账号设置成功后，将作为该训练场的登录账号，请勿公开
		</view>
		<u-button @click="submit" plain :customStyle="customStyleButtom">
			保存
		</u-button>
	</view>
</template>

<script lang="ts" setup>
import { setBranchCampus } from '@/api/api';
import { customStyleButtom } from '@/utils/publicClassType';
import { useUserInfo } from '@/store/userStore';
const model = reactive({ phoneNumber: '' });
const submit = () => {
	form.value?.validate().then(() => {
		setBranchCampus({
			branchCampuslId: branchCampuslId.value,
			phoneNumber: model.phoneNumber,
			schoolId,
		}).then(() => {
			uni.showToast({
				title: '设置成功',
				icon: 'none',
				success: () => {
					const time = setTimeout(() => {
						uni.navigateBack();
						clearTimeout(time);
					}, 600);
				},
			});
		});
	});
};
// 校验规则
const rules = reactive({
	phoneNumber: [
		{
			required: true,
			message: '请输入手机号',
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
});
const form = ref<UniFormRef>();
onReady(() => {
	form.value?.setRules(rules);
});
const branchCampuslId = ref('');
const schoolId = useUserInfo().getUserMsg()!.schoolId;
onLoad(options => {
	branchCampuslId.value = options!.id;
	model.phoneNumber = options!.phoneNumber;
});
</script>

<style scoped lang="scss">
.setup_account {
	padding: 30rpx;
	.tips {
		color: #969696;
		font-size: 26rpx;
		padding-left: 100rpx;
	}
}
</style>
