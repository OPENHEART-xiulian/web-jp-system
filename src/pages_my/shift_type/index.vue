<template>
	<view class="tabs">
		<u-subsection
			activeColor="#fddc13"
			:list="tabList"
			@change="sectionChange"
			:current="current"
		/>
	</view>
	<view class="shift_type">
		<view v-show="current == 0">
			<u-swipe-action>
				<template v-for="(item, index) in list" :key="item.classId">
					<u-swipe-action-item
						:name="index"
						:index="index"
						v-if="item.show"
						@click="deleteFn"
						:options="options"
					>
						<view @click="toDetailsPages(item)" class="list_box">
							<view class="top">
								<view>{{ item.className }}</view>
								<view class="right">
									<u-tag
										:text="item.classType"
										bgColor="#018f64"
										borderColor="#018f64"
										color="#fff"
										size="mini"
										type="warning"
									/>
								</view>
							</view>
							<view class="bottom">
								<view class="left">￥{{ item.classPrice }}</view>
								<view class="right">训练时段：{{ item.trainingTime }}</view>
							</view>
						</view>
					</u-swipe-action-item>
				</template>
			</u-swipe-action>
			<no-data v-if="list.length == 0" height="800rpx" />
			<u-loadmore v-else :marginTop="40" :status="status" line />
		</view>
		<view v-show="current == 1">
			<add-shift />
		</view>
	</view>
</template>

<script lang="ts" setup>
import { deleteCarType, getCarTypeList } from '@/api/api';
import { useUserInfo } from '@/store/userStore';
import noData from '@/components/noData/index.vue';
import addShift from './addShift/index.vue';
export type ListType = {
	classId?: string;
	className: string;
	classPrice: string;
	classType: string;
	createBy?: string;
	createTime?: string;
	dtDriverSchoolId?: string;
	remark: string;
	spaDriverSchoolId?: string;
	trainingTime?: string;
	updateBy?: string;
	updateTime?: string;
	endDate: string;
	endTime: number;
	startDate: string;
	startTime: number;
	show?: boolean;
};
const status = ref('nomore');
const options = [
	{
		icon: 'trash-fill',
		style: {
			backgroundColor: '#e4393c',
		},
	},
];
const tabList = ['班型列表', '发布班型'];
const current = ref(0);
const list = ref<ListType[]>([]);
const sectionChange = (index: number) => {
	current.value = index;
	if (index == 0) {
		getList();
	}
};
const getList = () => {
	const dtDriverSchoolId = useUserInfo().getUserMsg()!.schoolId;
	getCarTypeList({ dtDriverSchoolId }).then((result: any) => {
		list.value = result.data.map((v: any) => {
			v.show = true;
			return v;
		});
	});
};
const toDetailsPages = (item: ListType) => {
	const data = JSON.stringify(item);
	uni.navigateTo({
		url: '/pages_my/shift_type_details/index?data=' + data,
	});
};
const deleteFn = (e: { name: any; index: any }) => {
	uni.showModal({
		title: '温馨提示',
		content: '确定删除此学车班型吗？',
		success: function (res) {
			if (res.confirm) {
				deleteCarType({ classId: list.value[e.name].classId as string }).then(() => {
					list.value[e.name].show = false;
					list.value.splice(e.name, 1);
					uni.$u.toast('删除成功');
				});
			}
		},
	});
};
onShow(getList);
</script>

<style scoped lang="scss">
.tabs {
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	height: 80rpx;
	z-index: 999;
	padding: 0 30rpx;
	box-sizing: border-box;
}
.shift_type {
	padding: 100rpx 30rpx 0;
}

::v-deep .u-swipe-action-item {
	margin-bottom: 20rpx;
	border-radius: 20rpx;
	.list_box {
		background-color: #fff;
		padding: 40rpx;
		.top {
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
			font-weight: bold;
			align-items: center;
			.right {
				font-size: 26rpx;
			}
		}
		.bottom {
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24rpx;
			.left {
				font-weight: bold;
				color: #e4393c;
			}
		}
	}
	::v-deep .u-textarea .u-textarea__field {
		font-size: 24rpx !important;
	}
}
</style>
