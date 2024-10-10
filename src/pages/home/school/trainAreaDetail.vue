<template>
	<view class="container">
		<map
			class="map_box"
			:latitude="currentPageData.detail.latitude"
			:longitude="currentPageData.detail.longitude"
			:markers="[
				{
					latitude: currentPageData.detail.latitude,
					longitude: currentPageData.detail.longitude,
				},
			]"
		>
		</map>
		<view class="content">
			<view class="address">
				<view style="width: 580rpx; display: flex; flex-direction: column">
					<text style="font-size: 32rpx; font-weight: bold">
						{{ currentPageData.detail.addressName }}
					</text>
					<text style="width: 700rpx; color: #969696; margin-top: 10rpx">
						距离你{{ currentPageData.detail.distance }}km |
						{{ currentPageData.detail.address }}
					</text>
				</view>

				<view
					style="
						width: 140rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						height: 100%;
					"
				>
					<view>
						<u-icon name="map-fill" size="18" @click="daohang" />
					</view>
					<view style="margin-left: 20rpx">
						<u-icon name="phone-fill" size="18" @click="makeCall" />
					</view>
				</view>
			</view>
			<view
				style="
					margin-top: 30rpx;
					display: flex;
					flex-direction: column;
					font-size: 30rpx;
				"
			>
				<view> 训练科目：{{ currentPageData.detail.subjectName }} </view>
				<view style="margin-top: 10rpx">
					培训车型：{{ currentPageData.detail.cultivateType }}
				</view>
			</view>
			<view
				style="
					font-size: 30rpx;
					font-weight: 700;
					color: #000000;
					margin-top: 30rpx;
				"
			>
				场地展示
			</view>
			<view class="img_list">
				<image
					mode="aspectFill"
					v-for="(ele, index) in currentPageData.detail.addressPhoto"
					@click="showPic(index)"
					:src="ele"
					:key="index"
				/>
				<view
					v-if="currentPageData.detail.addressPhoto?.length == 0"
					style="margin-top: 20rpx"
				>
					<u-empty
						text="暂无图片"
						textSize="12"
						width="100rpx"
						mode="car"
						:icon="$src('/other/wtp.png')"
					/>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { getBranchCampusInfo } from '@/api/api';
import { _src, $src } from '@/utils/utils';
const daohang = () => {
	uni.openLocation({
		latitude: parseFloat(currentPageData.detail.latitude),
		longitude: parseFloat(currentPageData.detail.longitude),
		name: currentPageData.detail.addressName,
		address: currentPageData.detail.address,
	});
};
const showPic = (index: number | string) => {
	uni.previewImage({
		urls: currentPageData.detail.addressPhoto,
		current: index,
	});
};
const makeCall = () => {
	uni.makePhoneCall({
		phoneNumber: currentPageData.detail.bmPhoneNumber,
	});
};
const currentPageData: any = reactive({
	id: '',
	detail: {},
});
onLoad((option: any) => {
	currentPageData.id = option.id;
	initData();
});
const initData = () => {
	const { latitude, longitude } = uni.getStorageSync('userLat_long');
	getBranchCampusInfo({
		branchCampuslId: currentPageData.id,
		latitude,
		longitude,
	}).then((res: any) => {
		currentPageData.detail = res.data;
		currentPageData.detail.addressPhoto = JSON.parse(
			_src(currentPageData.detail.addressPhoto)
		);
	});
};
</script>

<style scoped lang="scss">
.container {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;

	.map_box {
		display: block;
		width: 100%;
		height: 638rpx;
	}

	.content {
		padding: 30rpx;
		box-sizing: border-box;

		.img_list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			> image {
				flex: none;
				width: 215rpx;
				height: 215rpx;
				margin: 12rpx 0;
			}
		}
	}

	.address {
		display: flex;
		font-size: 28rpx;
		color: black;
		margin-top: 20rpx;
		position: relative;
	}
}
</style>
