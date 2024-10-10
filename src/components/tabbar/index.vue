<template>
	<view
		class="tabbar"
		:style="{ 'padding-bottom': paddingBottomHeight + 'rpx' }"
	>
		<view
			class="tabbar-item"
			v-for="(item, index) in list"
			:key="index"
			@click="tabbarChange(item.path)"
		>
			<image
				class="item-img"
				:class="{ active: current == index }"
				:src="item.icon_a"
				v-if="current == index"
			></image>
			<image class="item-img" :src="item.icon" v-else></image>
			<view
				class="item-name"
				:class="{ tabbarActive: current == index }"
				v-if="item.text"
				>{{ item.text }}</view
			>
			<u-badge
				v-if="index == 2"
				:offset="offset"
				absolute
				type="error"
				max="99"
				:value="store?.userMsg?.pendingNewNumber"
			></u-badge>
		</view>
		<view
			class="bottom_box"
			:style="{ height: paddingBottomHeight + 'rpx' }"
		></view>
		<image
			class="menu__border"
			:src="$src('other/tab.svg')"
			:style="{
				left: `${left}px`,
			}"
			mode="aspectFit"
		/>
	</view>
</template>

<script lang="ts" setup>
import { $src, getUserMsg } from '@/utils/utils';
import { useUserInfo } from '@/store/userStore';

interface Props {
	current: number;
}
const store = useUserInfo();
const offset = reactive(['0', '38']);
const props = defineProps<Props>();
const paddingBottomHeight = ref(0); //苹果X以上手机底部适配高度
const list = ref([
	{
		text: '首页',
		icon: '/static/img/home.png', //未选中图标
		icon_a: '/static/img/select_home.png', //选中图片
		path: '/pages/home/home_page/index', //页面路径
	},
	{
		text: '榜单',
		icon: '/static/img/list.png',
		icon_a: '/static/img/select_list.png',
		path: '/pages/list/list_page/index',
	},
	{
		text: '我的',
		icon: '/static/img/my.png',
		icon_a: '/static/img/select_my.png',
		path: '/pages/my/my_page/index',
	},
]);
const pendingNewNumber = ref(0);
const left = ref(0);
const tabbarChange = (path: string) => {
	uni.switchTab({
		url: path,
	});
};
onReady(() => {
	uni.getSystemInfo({
		success: function (res) {
			left.value = (res.screenWidth / 3) * props.current + 12;
		},
	});
});
onMounted(() => {
	uni.getSystemInfo({
		success: function (res) {
			const model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
			model.forEach(item => {
				//适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
				if (
					res.model.indexOf(item) != -1 &&
					res.model.indexOf('iPhone') != -1
				) {
					paddingBottomHeight.value = 40;
				}
			});
		},
	});
});
onShow(() => {
	if (props.current == 2) {
		offset[0] = '-10';
		offset[1] = '34';
	}
	getUserMsg();
});
</script>

<style lang="scss" scoped>
.bottom_box {
	background-color: #fff;
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
}
.tabbarActive {
	color: #fddc13 !important;
}
.active {
	transform: scale(1.5) translateY(-10rpx);
}

.svg-container {
	width: 0;
	height: 0;
}
.tabbar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	padding-top: 60rpx;
	height: 100rpx;
	box-sizing: content-box;
	filter: drop-shadow(0 0 1px #f8f8f8) drop-shadow(0 0 1px #f8f8f8)
		drop-shadow(0 0 1px #f8f8f8);
	.tabbar-item {
		z-index: 999;
		background-color: #ffffff;
		display: flex;
		flex: 1;
		position: relative;
		top: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		.item-img {
			margin-bottom: 4rpx;
			width: 46rpx;
			height: 46rpx;
		}
		.item-name {
			font-size: 26rpx;
			color: #a3a3a3;
		}
	}
	.menu__border {
		left: 0;
		top: 14rpx;
		width: 200rpx;
		height: 50rpx;
		transform-origin: 50% 50%;
		position: absolute;
		z-index: -1;
	}
}
</style>
