<template>
	<view class="user_agreement">
		<u-parse :content="content"></u-parse>
	</view>
</template>

<script lang="ts" setup>
import { getAboutUs } from '@/api/api';

const content = ref('');
onShow(() => {
	getAboutUs().then((res: any) => {
		content.value = res.data.remarks;
	});
});
</script>

<style scoped lang="scss">
.user_agreement {
	margin: 30rpx;
}
</style>
