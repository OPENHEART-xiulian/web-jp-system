<template>
	<view class="set_up">
		<view class="cell_box">
			<view class="list_box">
				<view class="left">头像</view>
				<view class="middle">
					<button
						class="avatar-wrapper"
						open-type="chooseAvatar"
						@chooseavatar="onChooseAvatar"
					>
						<u-image
							width="100rpx"
							height="100rpx"
							shape="circle"
							:src="userMsg?.headSculpture ?? ''"
							mode="aspectFill"
						/>
					</button>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view
				class="list_box"
				@click="revisePhone('/pages/my/revise_phone/index')"
			>
				<view class="left">手机号</view>
				<view class="middle">{{
					desensitization(userMsg?.phoneNumber ?? '')
				}}</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view
				class="list_box"
				@click="revisePhone('/pages/my/revise_name/index')"
			>
				<view class="left">昵称</view>
				<view class="middle">{{ userMsg?.name }}</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
	<view class="btn">
		<u-button @click="LogOut" :customStyle="customStyleButtom">
			退出登录
		</u-button>
	</view>
</template>

<script lang="ts" setup>
import { updateUserInfo } from '@/api/api';
import { useUserInfo } from '@/store/userStore';
import { desensitization, uploadFiles, _src, jumpLogin } from '@/utils/utils';
import { customStyleButtom } from '@/utils/publicClassType';
import { storeToRefs } from 'pinia';
const store = useUserInfo();
const { userMsg, userInfo } = storeToRefs(store);
const codeList = [-2, -3, -4, -5, -6, -10, -12, -23];
const onChooseAvatar = (e: any) => {
	const { avatarUrl } = e.detail;
	uni.showLoading({
		title: '加载中',
	});
	uploadFiles(avatarUrl)
		.then((res: any) => {
			const data = JSON.parse(res.data); //返回的是字符串，需要转成对象格式
			if (data.code == 200) {
				updateUserInfoFn(JSON.stringify(data.data));
			} else if (codeList.includes(data.code)) {
				uni.clearStorageSync();
				uni.navigateTo({
					url: '/pages/login/login_page/index?toast=请重新登录',
				});
			} else {
				uni.showToast({
					title: '上传失败，请重新上传',
					duration: 1500,
					icon: 'none',
				});
			}
		})
		.catch(() => {
			uni.hideLoading();
			uni.showToast({
				title: '上传失败，请重新上传',
				duration: 1500,
				icon: 'none',
			});
		});
};
const revisePhone = (url: string) => {
	uni.navigateTo({ url });
};
//修改头像
const updateUserInfoFn = (headSculpture: string) => {
	updateUserInfo({
		headSculpture,
		id: userInfo.value!.userId,
		roleId: userInfo.value!.roleId,
	})
		.then((res: any) => {
			const headSculpture = JSON.parse(_src(res.data.headSculpture))[0];
			userInfo.value!.headSculpture = headSculpture;
			userMsg.value!.headSculpture = headSculpture;
			store.setUser(userInfo.value);
			uni.showToast({ title: '头像更改成功', icon: 'none' });
		})
		.finally(() => {
			uni.hideLoading();
		});
};
const LogOut = () => {
	uni.showToast({
		title: '登出成功',
		icon: 'none',
		success: () => {
			const time = setTimeout(() => {
				uni.navigateBack();
				jumpLogin(false);
				clearTimeout(time);
			}, 500);
		},
	});
};
</script>

<style scoped lang="scss">
.set_up {
	margin: 40rpx 30rpx;
	.cell_box {
		border-radius: 20rpx;
		overflow: hidden;
		padding: 20rpx 0;
		background-color: #fff;
	}
}
.title {
	line-height: 100rpx;
	padding: 0 40rpx;
}
.list_box {
	display: flex;
	padding: 0 30rpx;
	line-height: 100rpx;
	justify-content: center;
	.middle {
		flex: 1;
		text-align: right;
		margin-right: 20rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: #bbb;
	}
	.avatar-wrapper {
		background-color: #fff;
		margin: 0;
		padding: 0;
		&::after {
			border: none;
		}
	}
}
.btn {
	position: fixed;
	bottom: 80rpx;
	left: 0;
	width: 100vw;
	padding: 0 30rpx;
}
</style>
