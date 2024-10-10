<template>
	<view class="stepOne">
		<u-form :model="model" labelPosition="top" ref="form">
			<u-form-item label="姓名" prop="name" labelWidth="110rpx">
				<u-input
					clearable
					@clear="model.name = ''"
					v-model="model.name"
					placeholder="请输入姓名"
					type="text"
					maxlength="11"
				>
				</u-input>
			</u-form-item>
			<u-form-item label="身份证号" prop="cardNum" labelWidth="130rpx">
				<u-input
					clearable
					@clear="model.cardNum = ''"
					type="idcard"
					placeholder="请输入身份证号"
					maxlength="18"
					v-model="model.cardNum"
				>
				</u-input>
			</u-form-item>
			<u-form-item label="请上传法人身份证原件" labelWidth="320rpx">
				<view class="upload_box">
					<!-- <slot></slot> -->

					<upload
						@callback="callback1"
						:imageStyles="imageStyles"
						@delete="deleteFn1"
					>
						<u-icon
							:name="$src('/other/zm-icon.png')"
							width="260rpx"
							height="174rpx"
							labelPos="bottom"
							size="40rpx"
							:space="10"
							labelSize="26rpx"
						/>
					</upload>
					<upload
						:imageStyles="imageStyles"
						@callback="callback2"
						@delete="deleteFn2"
					>
						<u-icon
							:name="$src('/other/fm-icon.png')"
							width="260rpx"
							height="174rpx"
							labelPos="bottom"
							size="40rpx"
							:space="10"
						/>
					</upload>
				</view>
			</u-form-item>
		</u-form>
	</view>
</template>

<script lang="ts" setup>
import upload from '@/components/upload/index.vue';
import { _src, $src } from '@/utils/utils';
interface Props {
	model: {
		name: string;
		cardNum: string;
		cardFrontPhoto: string;
		cardSidePhoto: string;
	};
}
const form = ref<UniFormRef>();
const { model } = defineProps<Props>();
const imageStyles = {
	dividline: true,
	border: false,
	width: '280rpx',
	height: '200rpx',
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
const callback1 = (data: any) => {
	model.cardFrontPhoto = data?.data?.[0] || '';
	console.log(_src(model.cardFrontPhoto));
};
const callback2 = (data: any) => {
	model.cardSidePhoto = data?.data?.[0] || '';
};
//删除图片
const deleteFn1 = () => {
	model.cardFrontPhoto = '';
};
const deleteFn2 = () => {
	model.cardSidePhoto = '';
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
