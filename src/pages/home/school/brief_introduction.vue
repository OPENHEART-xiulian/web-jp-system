<script setup lang="ts">
import { useThemeData } from '@/store/index';
const store = useThemeData();
</script>

<template>
	<view class="spaBriefIntroduction">
		{{ store.spaBriefIntroduction }}
	</view>
</template>

<style scoped lang="scss">
.spaBriefIntroduction {
	padding: 30rpx;
	font-size: 26rpx;
}
</style>
