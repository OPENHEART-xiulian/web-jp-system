<template>
	<view class="stepOne">
		<u-form :model="model" labelPosition="top" ref="form">
			<u-form-item label="驾校名称" prop="schoolName" labelWidth="140rpx">
				<u-input
					clearable
					@clear="model.schoolName = ''"
					v-model="model.schoolName"
					placeholder="请输入驾校名称"
					type="text"
					border="bottom"
				>
				</u-input>
			</u-form-item>
			<u-form-item
				label="统一社会信用代码"
				prop="socialCreditCode"
				labelWidth="310rpx"
			>
				<u-input
					clearable
					@clear="model.socialCreditCode = ''"
					type="text"
					placeholder="请输入统一社会信用代码"
					maxlength="18"
					border="bottom"
					v-model="model.socialCreditCode"
				>
				</u-input>
			</u-form-item>
			<u-form-item label="请上传营业执照（副本）原件" labelWidth="420rpx">
				<view class="upload_box">
					<upload
						:imageStyles="imageStyles"
						@delete="deleteFn"
						@callback="callback"
					>
						<u-icon
							:name="$src('/other/yyzz-icon.png')"
							width="360rpx"
							height="240rpx"
							labelPos="bottom"
							size="40rpx"
							:space="10"
						/>
					</upload>

					<!-- <slot></slot> -->
				</view>
			</u-form-item>
		</u-form>
	</view>
</template>

<script setup lang="ts">
import upload from '@/components/upload/index.vue';
import { $src } from '@/utils/utils';
interface Props {
	model: {
		schoolName: string;
		socialCreditCode: string;
		businessLicensePhoto: string;
	};
}
const imageStyles = {
	dividline: true,
	border: false,
	width: '416rpx',
	height: '260rpx',
};
const form = ref<UniFormRef>();
const { model } = defineProps<Props>();
// 校验规则
const rules = reactive({
	schoolName: [
		{
			required: true,
			message: '请输入驾校名称',
			trigger: ['blur'],
		},
		{
			validator: (rule: any, value: any) => {
				return /^[a-zA-Z0-9\u4e00-\u9fa5\s\-()]{1,50}$/.test(value);
			},
			message: '驾校名称不正确',
			// 触发器可以同时用blur和change
			trigger: ['blur'],
		},
	],
	socialCreditCode: [
		{
			required: true,
			message: '请输入统一社会信用代码',
			trigger: ['blur'],
		},
		// {
		// 	validator: (rule: any, value: any) => {
		// 		return /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/.test(value);
		// 	},
		// 	message: '统一社会信用代码不正确',
		// 	trigger: ['blur'],
		// },
	],
});
//上传成功
const callback = (data: any) => {
	model.businessLicensePhoto = data?.data?.[0] || '';
};
//删除图片
const deleteFn = () => {
	model.businessLicensePhoto = '';
};
onReady(() => {
	form.value?.setRules(rules);
});
defineExpose({ form });
</script>

<style scoped lang="scss">
.upload_box {
	height: 200rpx;
	display: flex;
	justify-content: space-between;
}
</style>
