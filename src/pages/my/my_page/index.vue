<template>
	<view class="content">
		<user-msg :userStatus="userStatus" />
		<view class="cell_box">
			<u-cell-group :border="false">
				<u-cell
					:border="false"
					@click="cellFn"
					v-for="(item, index) in bottom_list"
					:name="index"
					:key="index"
					:isLink="true"
					:title="item.left_val"
					:url="item.url"
					:value="item.right_val"
				/>
			</u-cell-group>
		</view>
		<view class="cell_box" v-if="userStatus != 4 && userStatus != 0 && userStatus != 5">
			<u-cell-group :border="false">
				<u-cell
					:border="false"
					v-for="(item, index) in bottom_list2"
					:name="index"
					:key="index"
					:url="item.url"
					:isLink="true"
					:title="item.left_val"
					:value="item.right_val"
				/>
			</u-cell-group>
		</view>
	</view>
	<u-no-network @connected="getUserMsg" :image="$src('other/wwl.png')" />
	<tab-bar :current="2" />
</template>

<script setup lang="ts">
import TabBar from '@/components/tabbar/index.vue';
import userMsg from './components/userMsg.vue';
import type { BottomListType } from './typing';
import { $src, getUserMsg } from '@/utils/utils';
import { useUserInfo } from '@/store/userStore';
const store = useUserInfo();
const userStatus = ref<number>(0); //用户身份状态：0未登录 1学员/2教练/3驾校/4游客/5分校
const bottom_list: BottomListType[] = [
	{
		left_val: '帮助与反馈',
		right_val: '',
		url: '',
	},
	{
		left_val: '关于我们',
		right_val: '',
		url: '/pages_my/about/index',
	},
	{
		left_val: '用户协议',
		right_val: '',
		url: '/pages_my/user_agreement/index',
	},
	{
		left_val: '隐私政策',
		right_val: '',
		url: '/pages_my/privacy_policy/index',
	},
];
const bottom_list2: BottomListType[] = [
	{
		left_val: '切换身份',
		right_val: '',
		url: '/pages/my/switch_identity/index',
	},
];

const cellFn = (props: { name: number }) => {
	if (props.name == 0) {
		store.getToken() && uni.navigateTo({ url: '/pages_my/feedback/index' });
	}
};
onShow(() => {
	userStatus.value = store.getUser()?.roleId || 0;
});
onLoad(option => {
	if (option?.toPage && store.getToken(true) && store.userInfo?.roleId == 1) {
		uni.navigateTo({ url: option?.toPage });
	}
});
</script>

<style lang="scss" scoped>
:global(page) {
	padding-bottom: 160rpx;
}

.content {
	padding: 0 30rpx;

	.cell_box {
		background-color: #fff;
		margin-top: 20rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		overflow: hidden;

		::v-deep {
			& .u-cell__value,
			& .u-cell__title-text {
				font-size: 26rpx;
			}
		}
	}
}
</style>
