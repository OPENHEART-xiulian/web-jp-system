<template>
	<!-- 未登录 -->
	<template v-if="userStatus == 0">
		<navigator
			hover-class="none"
			open-type="navigate"
			url="/pages/login/login_page/index"
		>
			<view class="YK">
				<u-image
					:src="$src('/my/wdl.png')"
					height="100rpx"
					mode="aspectFill"
					shape="circle"
					width="100rpx"
				/>
				<view>登录/注册</view>
			</view>
		</navigator>
	</template>
	<!-- 学员或游客 -->
	<template v-if="userStatus == 1 || userStatus == 4">
		<view class="XY">
			<view class="XY_top" @click="skipSetUp">
				<u-image
					:src="userMsg?.headSculpture ?? ''"
					height="100rpx"
					mode="aspectFill"
					shape="circle"
					width="100rpx"
				/>
				<view class="right_XY">
					<view class="phone">{{ userMsg?.name }}</view>
					<!-- 学员才有认证 ☟-->
					<view v-if="userStatus == 1" class="rz rzs">V 认证学员</view>
				</view>
				<u-icon color="#ccc" name="arrow-right" />
			</view>
			<!-- 是学员且未报名 ☟ -->
			<view v-if="userMsg?.statusCode == 2 && userStatus == 1" class="wbm_box">
				<view class="wbm">
					<view class="wbm_lf"> 您还未报名哦~</view>
					<view>
						<navigator
							hover-class="none"
							open-type="navigate"
							url="/pages/home/school/schoolList"
						>
							<u-button
								:customStyle="{
									height: '50rpx',
									fontSize: '24rpx',
									borderRadius: '26rpx',
									backgroundColor: '#fddc13',
									fontWeight: 'bold',
								}"
							>
								前往报名
							</u-button>
						</navigator>
					</view>
				</view>
			</view>
			<!-- 是游客 ☟ -->
			<view v-if="userStatus == 4" class="wbm_box">
				<view class="wbm">
					<view class="wbm_lf">进行身份认证，解锁更多功能</view>
					<view>
						<u-button
							:customStyle="{ height: '50rpx', fontSize: '26rpx' }"
							@click="enrollFn"
						>
							前往认证
						</u-button>
					</view>
				</view>
			</view>
			<!-- 是学员且报名了才显示报名信息 ☟ -->
			<template v-if="userMsg?.statusCode == 1 && userStatus == 1">
				<u-line length="90%" margin="0 auto" />
				<navigator
					hover-class="none"
					open-type="navigate"
					url="/pages/my/cultivate_msg/index"
				>
					<view class="XY_bottom">
						<view class="b_left">
							<view class="b_list">
								<u-icon
									:name="$src('/my/jl-icon-1.png')"
									color="#ccc"
									size="24rpx"
								/>
								<text class="text1">培训类型：</text>
								<u-text
									:lines="1"
									:text="userMsg?.trainingType || '--'"
									bold
									size="24rpx"
								/>
							</view>
							<view class="b_list">
								<u-icon
									:name="$src('/my/jl-icon-2.png')"
									color="#ccc"
									size="24rpx"
								/>
								<text class="text1">所属驾校：</text>
								<u-text
									:lines="1"
									:text="userMsg?.schoolName || '--'"
									bold
									size="24rpx"
								/>
							</view>
							<view class="b_list">
								<u-icon
									:name="$src('/my/jl-icon-4.png')"
									color="#ccc"
									size="24rpx"
								/>
								<text class="text1">报名时间：</text>
								<u-text
									:lines="1"
									:text="userMsg?.bmTime || '--'"
									bold
									size="24rpx"
								/>
							</view>
						</view>
						<u-line direction="col" length="120rpx" margin="0 30rpx" />
						<view class="b_right">
							<view class="b_box1">培训进度</view>
							<view class="b_box2">科目{{ cnList[subjectIndex] }}</view>
							<circle-progress-bar
								:border_width="6"
								:pro="subjectList![subjectIndex] / 100"
								:size="100"
								border_color="#fff000"
							>
								<view>{{ subjectList![subjectIndex] }}%</view>
							</circle-progress-bar>
						</view>
						<u-icon color="#ccc" name="arrow-right" />
					</view>
				</navigator>
			</template>
		</view>
	</template>
	<!-- 教练 -->
	<template v-if="userStatus == 2">
		<view class="XY">
			<view class="XY_top" @click="skipSetUp">
				<u-image
					:src="userMsg?.headSculpture ?? ''"
					height="100rpx"
					mode="aspectFill"
					shape="circle"
					width="100rpx"
				/>
				<view class="right_XY">
					<view class="phone">{{ userMsg?.name }}</view>
					<view class="rz rzs">V 认证教练</view>
				</view>
				<u-icon color="#ccc" name="arrow-right" />
			</view>
			<u-line length="90%" margin="0 auto" />
			<navigator
				hover-class="none"
				open-type="navigate"
				url="/pages_my/coach_details/index"
			>
				<view class="XY_bottom">
					<view class="b_left">
						<view class="b_list">
							<u-icon
								:name="$src('/my/jl-icon-1.png')"
								color="#ccc"
								size="24rpx"
							/>
							<text class="text1">培训类型：</text>
							<u-text
								:lines="1"
								:text="userMsg?.teachCarType"
								bold
								size="24rpx"
							/>
						</view>
						<view class="b_list">
							<u-icon
								:name="$src('/my/jl-icon-2.png')"
								color="#ccc"
								size="24rpx"
							/>
							<text class="text1">所属驾校：</text>
							<u-text
								:lines="1"
								:text="userMsg?.schoolName"
								bold
								size="24rpx"
							/>
						</view>
						<view class="b_list">
							<u-icon
								:name="$src('/my/jl-icon-3.png')"
								color="#ccc"
								size="26rpx"
							/>
							<text class="text1">所属岗位：</text>
							<u-text :lines="1" :text="userMsg?.post" bold size="24rpx" />
						</view>
					</view>
					<u-icon color="#ccc" name="arrow-right" />
				</view>
			</navigator>
		</view>
	</template>
	<!-- 驾校 -->
	<template v-if="userStatus == 3 || userStatus == 5">
		<view class="XY">
			<view class="XY_top" @click="skipSetUp">
				<u-image
					:src="userMsg?.headSculpture ?? ''"
					height="100rpx"
					mode="aspectFill"
					shape="circle"
					width="100rpx"
				/>
				<view class="right_XY">
					<view class="phone"
						>{{ userStatus == 3 ? userMsg?.schoolName : userMsg?.addressName }}
					</view>
					<view v-if="userStatus == 3" class="rzs rz"> V 认证驾校</view>
					<view v-else class="label_box">
						<view class="rz">隶属于 {{ userMsg?.schoolName }}</view>
						<u-tag
							:text="userMsg?.trainingScope"
							bgColor="#018f64"
							borderColor="#018f64"
							color="#fff"
							size="mini"
							type="warning"
						/>
					</view>
				</view>

				<u-icon color="#ccc" name="arrow-right" />
			</view>
		</view>
	</template>

	<view v-if="listObj[userStatus]" class="tab_list">
		<view class="list_box">
			<view
				v-for="(item, index) in listObj[userStatus].list"
				:key="index"
				class="list_box_option"
				@click="listFn(item)"
			>
				<u-image
					:src="item.src"
					customStyle="margin:0 auto"
					height="80rpx"
					mode="aspectFill"
					width="80rpx"
				/>
				<view class="text_box">{{ item.name }}</view>
				<u-badge
					v-if="item.isShow"
					:offset="['0', '8']"
					:value="userMsg?.pendingNewNumber"
					absolute
					max="99"
					type="error"
				/>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { $src } from '@/utils/utils';
import type { ListType } from '../typing';
import circleProgressBar from '@/components/circleProgressBar/index.vue';
import { useOtherData, useUserInfo } from '@/store';
import { storeToRefs } from 'pinia';

interface PropsType {
	userStatus: number; //用户身份状态：0未登录 1学员/2教练/3驾校/4游客/5分校
}

const store = useUserInfo();
const { userMsg } = storeToRefs(store);
const subjectList = ref<number[] | null>([]); //科目进度数组
const subjectIndex = ref<number>(1);
const cnList = ['一', '二', '三', '四'];
const props = defineProps<PropsType>();
const otherData = useOtherData();
const listObj = ref<{ [key: number]: ListType }>({
	0: {
		head: '常用工具',
		list: [
			{
				src: $src('/my/my_complaint.png'),
				name: '我的投诉',
				url: '',
				toast: '',
				callback: () => {
					otherData.url = '/pages_my/my_complaint/index';
					uni.navigateTo({
						url: '/pages/login/login_page/index?toast=请登录',
					});
				},
			},
			{
				src: $src('/my/wdpj.png'),
				name: '我的评价',
				url: '',
				toast: '',
				callback: () => {
					otherData.url = '/pages/my/my_evaluate/index';
					uni.navigateTo({
						url: '/pages/login/login_page/index?toast=请登录',
					});
				},
			},
			{
				src: $src('/my/pxyy.png'),
				name: '培训预约',
				url: '',
				toast: '功能开发中，敬请期待',
			},
			{
				src: $src('/my/ksyy.png'),
				name: '考试预约',
				url: '',
				toast: '功能开发中，敬请期待',
			},
		],
	},
	1: {
		head: '常用工具',
		list: [
			{
				src: $src('/my/my_complaint.png'),
				name: '我的投诉',
				url: '',
				toast: '',
				isShow: true,
				callback: () => {
					if (userMsg.value?.statusCode != 1) {
						uni.$u.toast('仅支持在培学员投诉');
					} else {
						uni.navigateTo({ url: '/pages_my/my_complaint/index' });
					}
				},
			},
			{
				src: $src('/my/wdpj.png'),
				name: '我的点评',
				url: '/pages/my/my_evaluate/index',
				toast: '',
			},
			{
				src: $src('/my/pxyy.png'),
				name: '培训预约',
				url: '',
				toast: '功能开发中，敬请期待',
			},
			{
				src: $src('/my/ksyy.png'),
				name: '考试预约',
				url: '',
				toast: '功能开发中，敬请期待',
			},
		],
	},
	3: {
		head: '驾校管理',
		list: [
			{
				src: $src('/my/jxxx.png'),
				name: '驾校信息',
				url: '/pages/my/driver_school/index',
			},
			{
				src: $src('/my/xcbx.png'),
				name: '学车班型',
				url: '/pages_my/shift_type/index',
			},
			{
				src: $src('/my/jlgl.png'),
				name: '教练管理',
				url: '/pages_my/train_list/index',
			},
			{
				src: $src('/my/fxgl.png'),
				name: '分校管理',
				url: '/pages_my/branch_management/index',
			},
			{
				src: $src('/my/fxxlc.png'),
				name: '分校训练场',
				url: '/pages_my/training_ground/index',
			},
			{
				src: $src('/my/jx_tscl.png'),
				name: '投诉处理',
				url: '/pages/my/complaints/index',
				isShow: true,
			},
		],
	},
	5: {
		head: '驾校管理',
		list: [
			{
				src: $src('/my/jxxx.png'),
				name: '驾校信息',
				url: '/pages/my/driver_school/index',
			},
		],
	},
});
// 点击底部列表事件
const listFn = (item: any) => {
	if (item?.toast) {
		uni.$u.toast(item.toast);
	} else if (item.url) {
		uni.navigateTo({ url: item.url });
	}
	if (item?.callback) {
		item?.callback();
	}
};
const enrollFn = () => {
	uni.navigateTo({ url: '/pages/my/switch_identity/index' });
};
const skipSetUp = () => {
	uni.navigateTo({ url: '/pages/my/set_up/index' });
};
watchEffect(() => {
	if (props.userStatus == 1 && userMsg.value?.statusCode == 1) {
		//科目进度判断
		const {
			subjectOneRate,
			subjectTwoRate,
			subjectThreeRate,
			subjectFourRate,
		} = userMsg.value!;
		subjectList.value = [
			subjectOneRate,
			subjectTwoRate,
			subjectThreeRate,
			subjectFourRate,
		];
		subjectIndex.value = [0, 0, 1, 2][subjectList.value.indexOf(0)] ?? 3;
		if (otherData.url && store.getToken() && store.userInfo?.roleId == 1) {
			uni.navigateTo({ url: otherData.url });
		}
		otherData.url = null;
	}
});
</script>

<style lang="scss" scoped>
@import 'userMsg';
</style>
