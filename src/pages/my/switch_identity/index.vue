<template>
	<view class="content">
		<view class="list_box">
			<view class="box" @click="listFn(item.url, item.id)" v-for="item in list" :key="item.id">
				<u-image :showLoading="true" :src="item.src" width="188rpx" height="188rpx"></u-image>
				<view class="right">
					<view
						>{{ item.status }}<u-icon name="arrow-right" color="#000" bold size="30rpx"></u-icon
					></view>
					<view>{{ item.detailed }}</view>
				</view>
			</view>
		</view>
		<u-button :customStyle="customStyleButtom" @click="returnToPage">跳过，暂不选择</u-button>
	</view>
</template>

<script setup lang="ts">
import { $src, preserveUserMsg, returnToPage } from '@/utils/utils';
import { customStyleButtom } from '@/utils/publicClassType';
import { changeRole } from '@/api/api';
import { useUserInfo } from '@/store/userStore';
const store = useUserInfo();

const list = [
	{
		url: '/pages/my/certified_trainees/index?id=1',
		status: '我是学员',
		detailed: '登录可享学员合法权益',
		id: '1',
		src: $src('/my/xy-icon.png'),
	},
	{
		url: '/pages/my/certified_trainees/index?id=2',
		status: '我是教练',
		detailed: '查看回复学员评价',
		id: '2',
		src: $src('/my/jl-icon.png'),
	},
	{
		url: '/pages/my/school_trainees/index',
		status: '我是驾校',
		detailed: '管理、发布驾校信息',
		id: '3',
		src: $src('/my/jx-icon.png'),
	},
];
const listFn = (url: string, id: string) => {
	const userId = store.getUser()!.userId;
	const isIncludes = store
		.getRole()
		?.map((v: any) => v.id)
		.includes(id);
	if (isIncludes) {
		changeRole({ roleId: id, userId }).then((res: any) => {
			preserveUserMsg(res.data, returnToPage);
		});
	} else {
		uni.navigateTo({ url });
	}
};

onLoad(() => {
	const pages = getCurrentPages(); // 当前页面
	const beforePage = '/' + pages[pages.length - 2]?.route;
	const currentPage = '/' + pages[pages.length - 1]?.route;
	if (beforePage != '/pages/login/login_page/index' && beforePage != currentPage) {
		//如果上一个页面不是从登录进入就保存
		uni.setStorageSync('beforePage', beforePage);
	} else {
		uni.setStorageSync('beforePage', '/pages/my/my_page/index');
	}
});
</script>

<style lang="scss" scoped>
:global(page) {
	background-color: #f8f8f8;
}
.content {
	padding: 40rpx;
	.list_box {
		padding: 0 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.box {
			padding: 40rpx 0;
			display: flex;
			align-items: center;
			gap: 60rpx;
			border-bottom: 2rpx solid #ccc;

			view:nth-child(1) {
				font-size: 32rpx;
				color: #000;
				font-weight: bold;
				margin-bottom: 26rpx;
				display: flex;
				align-items: center;
				gap: 10rpx;
			}
			view:nth-child(2) {
				font-size: 28rpx;
				color: #969696;
			}
			&:nth-last-child(1) {
				border: none;
			}
		}
	}
}
</style>
