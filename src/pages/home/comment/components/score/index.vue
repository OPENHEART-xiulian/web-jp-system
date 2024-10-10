<template>
	<view
		:class="{ auot_height: heightBool }"
		class="comment-item"
		ref="comment_item"
	>
		<view class="header">
			<text class="txt">{{ data.title }}</text>
			<view>
				<u-checkbox-group @change="checkboxChange">
					<u-checkbox
						labelSize="14"
						shape="circle"
						activeColor="#fddc13"
						label="匿名提交"
						:name="1"
					></u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<u-line width="auto" margin="20rpx 0"></u-line>
		<view class="bottom_box">
			<view class="img_box">
				<u-image :src="data.img" width="70rpx" height="70rpx"></u-image>
				<view style="font-size: 28rpx; color: #000">{{ data.name }}</view>
			</view>
			<view
				class="start_box"
				:class="{ weight: index == 0, marginBottom: !heightBool }"
				v-for="(item, index) in startList"
				:key="item.title"
			>
				<view class="lf">{{ item.title }}</view>
				<u-rate
					inactiveColor="#ddd"
					:size="index == 0 ? 32 : 24"
					:gutter="index == 0 ? 4 : 12"
					@change="n => changeStart(n, index)"
					:count="5"
					v-model="item.startValue"
					activeColor="#fddc13"
				></u-rate>
				<view>{{ Satisfaction[item.startValue - 1] }}</view>
			</view>
			<view class="tag_box">
				<view class="tag">
					<button
						@click="submitData.remark += `${item.value},`"
						v-for="item in tagList"
						:key="item.id"
						class="u-reset-button tag_btn"
					>
						{{ item.value }}
					</button>
				</view>
			</view>
			<view class="textarea_box">
				<u-textarea
					height="100"
					border="none"
					v-model="submitData.remark"
					:placeholder="data.placeholder"
				/>
			</view>
			<view class="upload">
				<upload
					:imageStyles="imageStyles"
					:limit="10"
					@callback="callback"
					@delete="deleteFn"
				>
					<u-icon
						name="photo"
						labelPos="bottom"
						size="30"
						:space="10"
						labelSize="26rpx"
					></u-icon>
				</upload>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { getEvaluationLabelList } from '@/api/api';
import upload from '@/components/upload/index.vue';
type PropsType = {
	startList: {
		title: string;
		startValue: number;
	}[];
	submitData: {
		anonymousSubmit: number;
		img: string[];
		remark: string;
	};
	data: {
		title: string;
		name: string;
		img: string;
		frontAndBack: number;
		placeholder: string;
	};
};
type tagListType = {
	frontAndBack: number;
	id: string;
	labelType: number;
	sort: number;
	value: string;
};
const Satisfaction = ['非常不满', '不满意', '一般', '满意', '非常满意'];
const props = defineProps<PropsType>();
const imageStyles = {
	dividline: true,
	border: {
		width: 2,
		style: 'dashed',
		radius: 2,
	},
	width: '212rpx',
	height: '212rpx',
};
const tagList = ref<tagListType[]>([]);
const heightBool = ref(false);
const changeStart = (n: number, index: number) => {
	if (index == 0) {
		console.log(n);
	}
	if (!heightBool.value) {
		props.startList.forEach(item => {
			item.startValue = n;
		});
		const time = setTimeout(() => {
			heightBool.value = true;
			clearTimeout(time);
		}, 100);
	}
	if (index == 0) {
		getTagList(n <= 2 ? 2 : 1);
	}
};
const callback = (res: any) => {
	props.submitData.img = props.submitData.img.concat(res.data);
};
const deleteFn = (index: number) => {
	props.submitData.img.splice(index, 1);
};
const checkboxChange = (n: number[]) => {
	props.submitData.anonymousSubmit = n.length;
};
const getTagList = (labelType: number) => {
	getEvaluationLabelList({
		frontAndBack: props.data.frontAndBack,
		labelType,
	}).then((res: any) => {
		if (props.data.frontAndBack == 1) {
			tagList.value = res.data.coachList;
		} else {
			tagList.value = res.data.schoolList;
		}
	});
};
</script>

<style scoped lang="scss">
.comment-item {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 20rpx;
	max-height: 290rpx;
	overflow: hidden;
	transition: max-height 1s ease;
	margin-bottom: 30rpx;

	.textarea_box {
		margin-top: 20rpx;
	}
	.upload {
		margin-top: 40rpx;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		.txt {
			font-weight: bold;
		}
	}
	.bottom_box {
		.img_box {
			font-size: 28rpx;
		}
		.img_box,
		.start_box {
			display: flex;
			align-items: center;
			gap: 20rpx;
			margin-bottom: 20rpx;
			color: #555;
			font-size: 26rpx;
			.lf {
				width: 112rpx;
			}
		}

		.weight {
			font-weight: bold;
			font-size: 28rpx;
			color: #000;
		}
		.marginBottom {
			margin-bottom: 60rpx;
		}
	}
	.tag_box {
		overflow-x: auto;

		.tag {
			display: flex;
			gap: 20rpx;
			justify-content: flex-start;
			flex-wrap: nowrap;
			font-size: 24rpx;
			color: #555;
			.tag_btn {
				background-color: #f8f8f8;
				padding: 10rpx 20rpx;
				margin: 0;
				flex-shrink: 0;
			}
		}
	}
}
.auot_height {
	max-height: 1600rpx;
}
</style>
