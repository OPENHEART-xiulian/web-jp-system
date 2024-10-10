<template>
	<view class="user_agreement">
		<u-parse :content="content" />
	</view>
</template>

<script lang="ts" setup>
import { getDtPrivacyPolicy } from '@/api/api';

const content = ref('');
onShow(() => {
	getDtPrivacyPolicy().then((res: any) => {
		content.value = res.data.remarks;
	});
});
</script>

<style scoped lang="scss">
.user_agreement {
	margin: 30rpx;
	.u-content {
		.titlr1 {
			font-weight: bold;
			text-align: center;
		}
		div {
			font-size: 20px;
		}
	}
}
</style>
