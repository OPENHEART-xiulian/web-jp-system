<script setup lang="ts">
import { emd5 } from '@/static/js/emd5';
const goSchool = () => {
	uni.switchTab({ url: "/pages/my/my_page/index?toPage='/pages_my/my_complaint/index'" });
};
onMounted(() => {
	console.log('md5', emd5());
});
</script>

<template>
	<view id="test">测试页</view>
	<button @click="goSchool">打开</button>
</template>

<style scoped lang="scss">
.bxo {
	max-width: 11;
}
</style>
