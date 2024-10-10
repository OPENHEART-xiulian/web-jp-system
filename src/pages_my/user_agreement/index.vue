<template>
	<view class="user_agreement">
		<u-parse :content="content" />
	</view>
</template>

<script lang="ts" setup>
import { getDtUserGreement } from '@/api/api';

const content = ref('');
onShow(() => {
	getDtUserGreement().then((res: any) => {
		content.value = res.data.remarks;
	});
});
</script>

<style scoped lang="scss">
.user_agreement {
	margin: 30rpx;
}
</style>
