<template>
	<view class="content">
		<u-form labelPosition="left" :model="model" ref="form">
			<u-form-item label="昵称" prop="name">
				<u-input
					v-model.trim="model.name"
					placeholder="请输入昵称"
					type="nickname"
					maxlength="20"
					clearable
					border="bottom"
				>
				</u-input>
			</u-form-item>
		</u-form>
	</view>
	<view class="btn">
		<u-button @click="submit" :customStyle="customStyleButtom" :loading="loading"> 确定 </u-button>
	</view>
</template>

<script setup lang="ts">
import { updateUserInfo } from '@/api/api';
import { useUserInfo } from '@/store/userStore';
import { customStyleButtom } from '@/utils/publicClassType';
import { storeToRefs } from 'pinia';
const store = useUserInfo();
const { userMsg, userInfo } = storeToRefs(store);
const loading = ref(false);
const form = ref<UniFormRef>();
const model = reactive({
	name: '',
});
//表单校验
const submit = () => {
	form.value
		?.validate()
		.then(() => {
			loading.value = true;
			return updateUserInfo({
				id: userInfo.value!.userId,
				userName: model.name,
				roleId: userInfo.value!.roleId,
			});
		})
		.then((res: any) => {
			const name = res.data.userName;
			userInfo.value!.userName = name;
			userMsg.value!.name = name;
			store.setUser(userInfo.value);
			uni.showToast({
				title: '更改昵称成功',
				icon: 'none',
				success: () => {
					const time = setTimeout(() => {
						uni.navigateBack();
						clearTimeout(time);
					}, 600);
				},
			});
		})
		.finally(() => {
			loading.value = false;
		});
};
// 校验规则
const rules = reactive({
	name: [
		{
			required: true,
			message: '请输入昵称',
			trigger: ['blur'],
		},
	],
});

onReady(() => {
	form.value?.setRules(rules);
});
onShow(() => {
	model.name = userMsg.value!.name;
});
</script>

<style scoped lang="scss">
.content {
	padding: 10rpx 30rpx;
	background-color: #fff;
	margin: 30rpx;
	border-radius: 20rpx;
}
.btn {
	margin: 80rpx 40rpx 0;
}
</style>
