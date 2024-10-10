<template>
	<view class="container">
		<image class="logo_img" :src="$src('/my/logo-icon.png')" />
		<view class="btn">
			<u-button
				color="#fddc13"
				:customStyle="customStyleButtom"
				:hair-line="false"
				:disabled="loading"
				:loading="loading"
				@click="tipsLogin"
				:open-type="checkboxValue.length == 0 || loading ? '' : 'getPhoneNumber'"
				@getphonenumber="authPhone"
			>
				微信授权登录
			</u-button>
		</view>
		<view class="agree">
			<u-checkbox-group v-model="checkboxValue" placement="column" @change="checkboxChange">
				<u-checkbox
					v-for="(item, index) in checkboxList"
					activeColor="#fddc13"
					:key="index"
					:name="item.name"
				>
				</u-checkbox>
			</u-checkbox-group>

			<view class="rg">
				已阅读并同意
				<text @click="tz('/pages_my/user_agreement/index')"> 用户服务协议 </text>
				和
				<text @click="tz('/pages_my/privacy_policy/index')">用户隐私政策</text>
				，未注册的手机号将自动创建账号
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { getWxPhone } from '@/api/api';
import { preserveUserMsg, $src } from '@/utils/utils';
import { customStyleButtom } from '@/utils/publicClassType';
const loading = ref(false);
const checkboxValue = ref([]);
const checkboxList = reactive([
	{
		name: '1',
		disabled: false,
	},
]);
const checkboxChange = (n: any) => {
	checkboxValue.value = n;
};
//微信授权登录
const authPhone = (e: any) => {
	if (checkboxValue.value.length == 0) {
		uni.showToast({ title: '请勾选下方协议', icon: 'none' });
	} else {
		const { errMsg, code } = e.detail;
		uni
			.login({
				provider: 'weixin', //使用微信登录
			})
			.then(res => {
				if (errMsg === 'getPhoneNumber:ok') {
					loading.value = true;
					return getWxPhone({ code, loginCode:res.code });
				} else {
					uni.showToast({ title: '用户拒绝授权！', icon: 'none' });
					return false;
				}
			})
			.then((res: any) => {
				uni.$u.toast('登录成功');
				preserveUserMsg(res.data);
				const { role } = res.data;
				if (role[0].id === '4') {
					uni.navigateTo({
						url: '/pages/my/switch_identity/index',
					});
				} else {
					uni.navigateBack();
				}
			})
			.finally(() => {
				loading.value = false;
			});
	}
};
const tipsLogin = () => {
	if (checkboxValue.value.length == 0) {
		uni.showToast({ title: '请勾选下方协议', icon: 'none' });
	}
};
const tz = (url: string) => {
	uni.navigateTo({
		url,
	});
};
onLoad((option: any) => {
	if (option.toast) {
		uni.$u.toast(option.toast);
	}
	const pages: any = getCurrentPages(); // 当前页面
	const beforePage = pages[pages.length - 2]?.$page?.fullPath;
	uni.setStorageSync('beforePage', beforePage); //保存上一个页面路径
});
</script>

<style lang="scss" scoped>
.container {
	position: fixed;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	padding: 160rpx 30rpx 100rpx;
	width: calc(100vw - 80rpx);
	box-sizing: border-box;
	border-radius: 20rpx;
	.logo_img {
		width: 296rpx;
		height: 80rpx;
		display: block;
		margin: 0 auto 20rpx;
	}
	.btn {
		background-color: #fff;
		margin: 60rpx auto;
		font-size: 30rpx;
	}
	.agree {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 0 20rpx;
		gap: 16rpx;
		font-size: 24rpx;
		.rg {
			color: #969696;
			font-size: 24rpx;
			line-height: 46rpx;
			text {
				color: $uni-color-primary;
			}
		}
	}
}
</style>
