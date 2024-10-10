<template>
	<!-- <view class="list_page">
		<view class="top_box">
			<view class="top_title1">诚信评价红黑榜</view>
			<view class="top_title2">
				<view :class="{ selcet: selectIndex === 0 }" @click="selectIndex=0">红榜</view>
				<view :class="{ selcet: selectIndex === 1 }" @click="selectIndex=1">黑榜</view>
			</view>
		</view>
		<view :class="['list_box', { list_black: selectIndex === 1 }]">
			<view class="l_title">
				<view>AAAA级驾校</view>
				<u-icon
					label="全部"
					space="0"
					labelSize="26rpx"
					labelPos="left"
					name="arrow-right"
					color="#fff"
					labelColor="#fff"
					size="12"
				/>
			</view>
			<view class="l_school">
				<view class="school">
					<u-image
						radius="20rpx"
						width="200rpx"
						height="200rpx"
						src="http://iph.href.lu/180x180/?text=占位图"
					/>
					<view class="tag">第一名</view>
					<view class="school_name u-line-1">顺达驾校</view>
					<view class="time">评价年度：2022年</view>
				</view>
				<view class="school">
					<view class="ckgd">
						<u-icon
							label="查看更多"
							space="0"
							labelSize="26rpx"
							labelPos="left"
							name="arrow-right"
							size="12"
						/>
					</view>
				</view>
			</view>
			<view class="l_title">
				<view>AAAA级教练</view>
				<u-icon
					label="全部"
					space="0"
					labelSize="26rpx"
					labelPos="left"
					name="arrow-right"
					color="#fff"
					labelColor="#fff"
					size="12"
				/>
			</view>
			<view class="l_school">
				<view class="school">
					<u-image
						radius="20rpx"
						width="200rpx"
						height="200rpx"
						src="http://iph.href.lu/180x180/?text=占位图"
					/>
					<view class="tag">第一名</view>
					<view class="school_name u-line-1">赵丽</view>
					<view class="time">评价年度：2022年</view>
				</view>
				<view class="school">
					<view class="ckgd">
						<u-icon
							label="查看更多"
							space="0"
							labelSize="26rpx"
							labelPos="left"
							name="arrow-right"
							size="12"
						/>
					</view>
				</view>
			</view>
		</view>
	</view> -->
	<development />

	<tab-bar :current="1" />
</template>

<script lang="ts" setup>
import development from '@/components/development/index.vue';

import TabBar from '@/components/tabbar/index.vue';
const selectIndex = ref(1);
</script>

<style scoped lang="scss">
.list_page {
	.top_box {
		height: 300rpx;
		background-color: #24201f;
		color: #fff;
		text-align: center;
		font-weight: bold;
		padding: 20rpx 90rpx 0;
		.top_title1 {
			margin-bottom: 50rpx;
			font-size: 30rpx;
		}
		.top_title2 {
			display: flex;
			justify-content: space-between;
			font-size: 80rpx;
		}
		.selcet {
			color: #f8e9d3;
		}
	}
	.list_box {
		margin: 0 30rpx;
		padding: 20rpx;
		background-color: #d6b58e;
		border-radius: 20rpx;
		margin-top: -40rpx;
		min-height: 200rpx;
		position: relative;
		&::after {
			position: absolute;
			display: block;
			width: 0;
			height: 0;
			border-color: transparent;
			border-style: solid;
			content: ' ';
			border-width: 26rpx;
			top: -24rpx;
			margin-left: 96rpx;
			border-top-width: 0;
			border-bottom-color: #d6b58e;
		}
		.l_title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			margin: 20rpx 0;
			& > view {
				font-weight: bold;
				font-size: 32rpx;
			}
		}
		.l_school {
			display: flex;
			flex-wrap: nowrap;
			gap: 20rpx;
			width: 100%;
			overflow-x: auto;
			animation: all 1s;
			.school {
				width: 200rpx;
				overflow: hidden;
				flex-shrink: 0;
				color: #fff;
				position: relative;
				.school_name {
					font-size: 32rpx;
					margin: 20rpx 0 10rpx;
				}
				.time {
					font-size: 22rpx;
				}
				.ckgd {
					width: 200rpx;
					height: 200rpx;
					background-color: #fff;
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.tag {
					background-color: #fede12;
					position: absolute;
					left: 0;
					top: 0;
					color: #000;
					padding: 0 10rpx;
					font-size: 24rpx;
					border-top-left-radius: 20rpx;
					border-bottom-right-radius: 20rpx;
					line-height: 32rpx;
				}
			}
		}
	}
	.list_black {
		background-color: #595959;
		&::after {
			left: 63%;
			border-bottom-color: #595959;
		}
	}
}
</style>
