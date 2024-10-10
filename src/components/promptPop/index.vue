<template>
	<u-popup :show="show" :closeOnClickOverlay="false" mode="center" round="20rpx" @close="close">
		<view class="pop_box">
			<view class="title">{{ title }}</view>
			<view :class="item.className" v-for="(item, index) in popList" :key="index">
				{{ item.text }}
			</view>

			<view class="btn">
				<u-button
					:disabled="disabled"
					@click="show = false"
					:customStyle="
						!disabled
							? customStyleButtom
							: {
									...customStyleButtom,
									backgroundColor: '#f7e782',
							  }
					"
				>
					<text>我已阅读并同意{{ title }}</text>
					<template v-if="disabled">
						<text style="margin-left: 10rpx">({{ timeText }})</text>
					</template>
				</u-button>
			</view>
		</view>
	</u-popup>
</template>

<script setup lang="ts">
import { customStyleButtom } from '@/utils/publicClassType';
import { useTimerLeft } from '@/hooks';
type PropsType = {
	popList: { text: string; className: string }[];
	title: string;
};
defineProps<PropsType>();
const { beginTimer, revise, timeText } = useTimerLeft({
	timeCount: 6,
	initialText: '6S',
	progressText: 'S',
	completeText: '',
	endCallback: () => {
		disabled.value = false;
		revise();
	},
});
const show = ref(true);
const disabled = ref(true);
const close = () => {
	show.value = false;
};
onShow(() => {
	beginTimer();
});
</script>

<style scoped lang="scss">
.pop_box {
	padding: 30rpx;
	width: 90vw;
	font-size: 24rpx;
	line-height: 32rpx;
	.title {
		text-align: center;
		font-size: 32rpx;
		margin-bottom: 30rpx;
	}
	.zw {
		margin-bottom: 20rpx;
	}
	.btn {
		margin-top: 60rpx;
	}
}
</style>
