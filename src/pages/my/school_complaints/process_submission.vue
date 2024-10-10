<script setup lang="ts">
import { customStyleButtom } from '@/utils/publicClassType';
import { useComplaint } from '@/store';
import { handlingComplain } from '@/api/api';
const store = useComplaint();
const list = ref([
	{
		name: '退款',
		disabled: false,
	},
	{
		name: '赔礼道歉',
		disabled: false,
	},
	{
		name: '重新安排训练',
		disabled: false,
	},
	{
		name: '转校',
		disabled: false,
	},
	{
		name: '其他',
		disabled: false,
	},
]);
const handlingPlan = ref('');
const drivingTrainingInstitutionContent = ref('');
const submit = () => {
	if (handlingPlan.value) {
		handlingComplain({
			id: store!.data!.id,
			handlingPlan: handlingPlan.value,
			drivingTrainingInstitutionContent:
				drivingTrainingInstitutionContent.value,
		}).then((res: any) => {
			store!.data = res.data;
			uni.showToast({
				title: '处理成功',
				success: () => {
					const time = setTimeout(() => {
						uni.navigateBack();
						clearTimeout(time);
					}, 1000);
				},
			});
		});
	} else {
		uni.$u.toast('请选择处理方案');
	}
};
</script>

<template>
	<view class="p_s_content">
		<view class="content_box">
			<view class="title">请与学员协商后，填上您的处理方案：</view>
			<u-radio-group
				activeColor="#fddc13"
				shape="circle"
				v-model="handlingPlan"
				placement="column"
			>
				<u-radio
					labelColor="#000"
					:customStyle="{ marginBottom: '8px' }"
					v-for="(item, index) in list"
					:key="index"
					:label="item.name"
					:name="item.name"
				>
				</u-radio>
			</u-radio-group>
			<u-line length="auto" margin="40rpx 0"></u-line>
			<u-textarea
				:height="100"
				border="none"
				v-model="drivingTrainingInstitutionContent"
				placeholder="如有其他备注，请在此补充"
			></u-textarea>
		</view>
		<u-button @click="submit" :customStyle="customStyleButtom"> 提交</u-button>
	</view>
</template>

<style scoped lang="scss">
.p_s_content {
	padding: 30rpx;
	.content_box {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		.title {
			margin-bottom: 20rpx;
			color: #606266;
		}
	}
	::v-deep .u-textarea {
		padding: 0;
	}
}
</style>
