<template>
	<view class="picker"></view>
	<uni-file-picker
		ref="upload"
		:readonly="readonly"
		v-model="imageValues"
		file-mediatype="image"
		:mode="mode"
		:auto-upload="false"
		file-extname="png,jpg,webp,jpeg"
		:limit="limit"
		:image-styles="imageStyles"
		@delete="deleteFn"
		@select="select">
		<slot>
			<u-icon
				name="plus"
				labelPos="bottom"
				size="40rpx"
				:space="10"
				labelSize="26rpx"
				label="上传"></u-icon>
		</slot>
	</uni-file-picker>
</template>

<script lang="ts" setup>
import { uploadFiles } from '@/api/api';

interface Props {
	imageStyles?: {
		// 是否显示分隔线
		dividline?: boolean;
		// 线条样式
		border?:
			| {
					width?: number | string;
					style?: string;
					radius?: number;
			  }
			| boolean;
		width?: number | string;
		height?: number | string;
	};
	limit?: number; //上传文件个数 最多9个
	mode?: string; //选择文件后的文件列表样式
	imageValue?: {
		name: string;
		extname: string;
		url: string;
	}[];

	readonly?: boolean;
}
interface Emits {
	(e: 'callback', data: any): void; //上传成功触发
	(e: 'delete', index: number): void; //删除图片触发
}
const upload = ref<any>(null);
const imageValues = ref<any>([]);
const tempFilePathsList = reactive<string[]>([]);
const emits = defineEmits<Emits>();
const isMonitor = ref(true); //是否监听
const props = withDefaults(defineProps<Props>(), {
	imageStyles: () => ({
		dividline: true,
		border: {
			width: 2,
			style: 'dashed',
			radius: 2,
		},
		width: '240rpx',
		height: '240rpx',
	}),
	limit: 1,
	mode: 'grid',
	imageValue: () => [],
	readonly: () => false,
});

// 获取上传状态
const select = (e: any) => {
	isMonitor.value = false;
	const { tempFiles, tempFilePaths } = e;
	// 根据所选图片的个数，多次调用上传函数
	let promises: any = [];
	let exist = false;
	for (let i = 0; i < tempFilePaths.length; i++) {
		tempFilePathsList.push(tempFilePaths[i]);
		if (tempFiles[i].size > 1048576) {
			exist = true;
			const length = tempFilePathsList.length - 1;
			upload?.value?.clearFiles(length);
			tempFilePathsList.splice(length, 1);
		} else {
			imageValues.value.push({
				name: 'tx.jpg',
				extname: 'jpg',
				url: tempFilePaths[i],
			});

			promises.push(uploadFiles(tempFilePaths[i]));
		}
	}
	const length = promises.length;
	if (exist && length > 0) {
		uni.showToast({
			title: '仅支持上传大小不超过10M的图片已为您跳过上传',
			icon: 'none',
			success: () => {
			const time=	setTimeout(() => {
					promiseFn(promises);
					clearTimeout(time);
				}, 600);
			},
		});
	} else if (exist && length == 0) {
		uni.showToast({
			title: '仅支持上传大小不超过10M的图片',
			icon: 'none',
		});
	} else {
		promiseFn(promises);
	}
};
const promiseFn = async (promises: any[]) => {
	uni.showLoading({
		title: '上传中',
	});
	const results = await Promise.allSettled(promises);
	const length = tempFilePathsList.length - results.length;
	results.forEach((data: any, index) => {
		if (data.status == 'rejected') {
			upload?.value?.clearFiles(index + length);
			tempFilePathsList.splice(index + length, 1);
		} else {
			if (data.value.code == 200) {
				emits('callback', data.value);
			} else {
				uni.showToast({
					title: '上传失败，请重新上传',
					duration: 1500,
					icon: 'none',
				});
			}
		}
	});
	// 过滤出成功的请求
	const successfulPromises = results.filter((p) => p.status === 'fulfilled');

	// 过滤出失败的请求，并输出原因
	const errors = results.filter((p) => p.status === 'rejected');
	uni.hideLoading();
	if (successfulPromises.length > 0 && errors.length == 0) {
		uni.showToast({ title: '上传成功', icon: 'none' });
	}
};
watchEffect(() => {
	if (isMonitor.value) {
		imageValues.value = props.imageValue;
		if (tempFilePathsList.values.length == 0) {
			props.imageValue?.forEach((v, i) => {
				tempFilePathsList[i] = v.url;
			});
		}
	}
});
//删除图片
const deleteFn = (e: any) => {
	const index = tempFilePathsList.indexOf(e.tempFilePath);
	tempFilePathsList.splice(index, 1);
	emits('delete', index);
};
</script>

<style scoped lang="scss">
.picker {
	.file-picker__progress {
		display: none !important;
	}
}
</style>
