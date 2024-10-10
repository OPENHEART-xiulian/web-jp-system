<script setup lang="ts">
import { getReportTypeTree } from '@/api/api';
import PromptPop from '@/components/promptPop/index.vue';
import { _src } from '@/utils/utils';
import type { child } from '../complaint/complaint_page/index.vue';
import { useReportData } from '@/store';
import { useUserInfo } from '@/store/userStore';
const store = useReportData();
const storeUser = useUserInfo();
const popList = [
	{
		text: '本平台仅收集机动车驾驶员培训机构、及其从业人员涉嫌违反监管法律、法规、规章线索的行为。',
		className: 'zw',
	},
	{
		text: '提交举报时，请注意：',
		className: 'zw',
	},
	{
		text: '1.仅支持实名举报。在提交举报时，我们会收集举报人的姓名、联系方式和身份证号等。在处理你的个人信息时，平台将对举报人的信息严格保密，不会将举报人个人信息、举报办理情况等泄露给被举报人或者与办理举报工作无关的人员。',
		className: 'zw',
	},
	{
		text: '2.举报事项一事一单，请勿就同一事项重复举报，请勿在一个举报单中反映不同被举报人的涉嫌违法行为。由于举报、投诉的处理程序不同，请勿在举报中含有投诉内容。',
		className: 'zw',
	},
	{
		text: '3.不得在本平台发表违反中华人民共和国宪法和法律的言论，不得发表造谣、诽谤他人的言论。举报人承担一切因留言行为而引起的法律责任。',
		className: 'zw',
	},
	{
		text: '4.本平台时监管部门接收处理有关举报的途径之一，举报人还可以通过拨打当地12315热线或当地市场监管部门公布的途径等方式进行举报。',
		className: 'zw',
	},
	{
		text: '5.举报提交后不能撤销，请谨慎操作。',
		className: 'zw',
	},
];
const list = ref<child[]>([]);
onShow(() => {
	const { userId } = storeUser.getUser()!;
	getReportTypeTree({ userId }).then((res: any) => {
		list.value = res.data;
	});
});
const jumpFn = (data: child) => {
	store.data = data;
	uni.navigateTo({
		url: '/pages/home/report_msg/index',
	});
};
</script>

<template>
	<PromptPop :pop-list="popList" title="举报须知" />
	<view class="content">
		<view class="list_box" @click="jumpFn(item)" v-for="item in list" :key="item.id">
			<view class="title">{{ item.value }}</view>
			<view class="bottom">
				<view class="lf_text">
					{{ item.remark }}
				</view>
				<u-image :src="_src(JSON.parse(item.img)?.[0])" width="120rpx" height="120rpx"></u-image>
			</view>
		</view>
		<navigator url="/pages/home/reporting_history/index" open-type="navigate" hover-class="none">
			<view class="repkort_history">
				<view class="lf">我的历史举报</view>
				<u-icon size="20" name="arrow-right"></u-icon>
			</view>
		</navigator>
	</view>
</template>

<style scoped lang="scss">
.content {
	padding: 30rpx;
	.list_box {
		background-color: #fff;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		.title {
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
		.bottom {
			display: flex;
			gap: 20rpx;
			.lf_text {
				flex: 1;
				font-size: 28rpx;
				color: #aaa;
				line-height: 40rpx;
			}
		}
	}
	.repkort_history {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		line-height: 80rpx;
		border-radius: 20rpx;
		font-size: 32rpx;
		align-items: center;
		padding: 0 30rpx;
	}
}
</style>
