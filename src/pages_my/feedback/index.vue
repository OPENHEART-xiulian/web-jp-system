<template>
	<view class="content">
		<u-textarea
			height="240rpx"
			:maxlength="-1"
			v-model="remarks"
			border="bottom"
			placeholder="我们十分乐意倾听您的建议，请输入您对平台的反馈或建议吧~"
		/>
		<view class="upload">
			<upload
				:imageStyles="imageStyles"
				:limit="10"
				@callback="callback"
				@delete="deleteFn"
			>
				<u-icon
					name="plus"
					labelPos="bottom"
					size="40rpx"
					:space="10"
					labelSize="26rpx"
					label="上传图片"
				/>
			</upload>
		</view>
	</view>
	<view class="btn">
		<u-button
			hoverStayTime="100"
			:customStyle="customStyleButtom"
			@click="submit"
			:loading="loading"
		>
			提交
		</u-button>
	</view>
</template>

<script setup lang="ts">
import { helpAndFeedback } from '@/api/api';
import upload from '@/components/upload/index.vue';
import { customStyleButtom } from '@/utils/publicClassType';
import { useUserInfo } from '@/store/userStore';
const store = useUserInfo();
const remarks = ref('');
const imgList = ref<string[]>([]); //图片地址
const loading = ref(false);
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
const callback = (data: any) => {
	imgList.value = imgList.value.concat(data.data);
	console.log(imgList.value);
};
const deleteFn = (index: number) => {
	imgList.value.splice(index, 1);
	console.log(imgList.value);
};
const submit = () => {
	if (remarks.value == '' && imgList.value.length == 0) {
		uni.$u.toast('请填写反馈建议或上传图片');
	} else {
		const { userId, userName } = store.getUser() as any;
		loading.value = true;
		helpAndFeedback({
			userId,
			userName,
			remarks: remarks.value,
			picture: JSON.stringify(imgList.value),
		})
			.then(() => {
				uni.showToast({
					title: '提交成功',
					icon: 'success',
					success: () => {
						const time = setTimeout(() => {
							uni.navigateBack({ delta: 1 });
							clearTimeout(time);
						}, 600);
					},
				});
			})
			.finally(() => {
				loading.value = false;
			});
	}
};
</script>

<style scoped lang="scss">
:global(page) {
	padding-bottom: 80rpx;
}
.content {
	padding: 30rpx;
	background-color: #fff;
	margin: 30rpx;
	border-radius: 20rpx;
	.upload {
		margin-top: 40rpx;
	}
}
.btn {
	margin: 160rpx 0 0;
	padding: 0 40rpx;
}
::v-deep {
	.textarea-placeholder,
	.u-textarea__field {
		font-size: 24rpx !important;
	}
}
</style>
