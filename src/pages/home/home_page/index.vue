<template>
	<view class="content">
		<view class="page_title">
			<view class="city_box" @click="popCitySelect">
				<u-icon name="map-fill" color="#000000" size="19" />
				{{ currentPageData.currentCity.cityName }}
			</view>
		</view>
		<view class="banner_box">
			<image :src="$src('/home/Banner@2x.png')" />
			<view class="sec">
				<view class="item" @click="go('../school/schoolList')">
					<image :src="$src('/home/1@2x.png')" />
					<text>查驾校</text>
					<text>官方认证 合规驾校</text>
				</view>
				<view class="line"></view>
				<view class="item" @click="go('../coach/coachList')">
					<image :src="$src('/home/2@2x.png')" />
					<text>查教练</text>
					<text>阳光培训 星级服务</text>
				</view>
			</view>
		</view>
		<view class="tool">
			<view class="tool_title">热门服务 直达官方</view>
			<view class="tool_box">
				<view
					v-for="(item, index) in toolList"
					:key="index"
					@click="tips(index)"
				>
					<image :src="item.src" />
					<text>{{ item.title }}</text>
				</view>
			</view>
		</view>
		<view class="banxing">
			<view class="title">
				<image :src="$src('/home/21@2x.png')" />
				<text>推荐班型</text>
				<u-icon
					label="更多"
					space="0"
					labelSize="26rpx"
					labelPos="left"
					name="arrow-right"
					@click="go('../classType/recommendClass')"
					size="12"
				/>
			</view>
			<view class="banxing_list">
				<view
					v-for="(item, index) in classList"
					:key="index"
					@click="go(item.path)"
				>
					<text>{{ item.title }}</text>
					<image :src="item.src" />
				</view>
			</view>
		</view>
		<view class="banxing">
			<view class="title" style="margin-bottom: 16rpx">
				<image :src="$src('/home/222@2x.png')" />
				<text>附近驾校</text>
				<u-icon
					label="更多"
					labelSize="26rpx"
					space="0"
					labelPos="left"
					name="arrow-right"
					@click="go('../school/schoolList')"
					size="12"
				/>
			</view>
			<view class="fujin_list">
				<view
					class="item"
					v-for="(ele, index) in currentPageData.schoolList"
					:key="index"
					@click="go('../school/schoolDetail?id=' + ele.spaSchoolId)"
				>
					<image
						:src="ele.dtDriverLogo || $src('/home/schoolzanwei@2x.png')"
						mode="aspectFill"
					/>
					<view class="item_right">
						<text class="name_text">
							{{ ele.spaSchoolName }}
						</text>
						<text style="font-size: 24rpx; margin-top: 14rpx; color: #969696">
							{{ ele.spaRegion ?? '--' }} | 距离你{{ ele.distance }}km
						</text>
						<view class="rg_bottom">
							<view>
								<image :src="$src('/home/ff@2x.png')" />
								<text>通过率:</text>
								<text style="color: #000000">
									{{ ele.spaPassRate }}{{ ele.spaPassRate ? '%' : '--' }}
								</text>
							</view>
							<view>
								<image :src="$src('/home/fd@2x.png')" />
								<text>好评率:</text>
								<text style="color: #000000">
									{{ ele.spaSatisfactionRate
									}}{{ ele.spaSatisfactionRate ? '%' : '--' }}
								</text>
							</view>
							<view>
								<image :src="$src('/home/fq@2x.png')" />
								<text>星级:</text>
								<text style="color: #000000">{{ ele.spaStarLevel }}星</text>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore
					nomoreText="点击更多，查看完整列表"
					:marginTop="40"
					status="nomore"
					line
				/>
			</view>
		</view>
		<u-popup
			@touchmove.stop.prevent="() => {}"
			@close="show = false"
			closeable
			:show="show"
			mode="bottom"
			:round="10"
		>
			<view class="pop_win">
				<text class="szcs">选择所在城市</text>
				<text style="margin-bottom: 20rpx">当前选择</text>
				<text class="city_item">
					{{ currentPageData.currentCity.cityName }}
				</text>
				<text style="margin: 20rpx 0">选择城市</text>
				<view class="city_list">
					<view
						class="city_item"
						v-for="(item, index) in currentPageData.citylist"
						@click="chosseCity(item)"
						:key="index"
					>
						<text>
							{{ item.areaName }}
						</text>
					</view>
				</view>
			</view>
		</u-popup>
		<u-no-network :image="$src('other/wwl.png')" />
	</view>
	<TabBar :current="0" />
</template>
<script setup lang="ts">
import { $src, _src } from '@/utils/utils';
import { getSchoolList, getCityList, getCityByLocation } from '@/api/api';
import { useUserInfo } from '@/store/userStore';
import { useOtherData } from '@/store';
import TabBar from '@/components/tabbar';
const store = useUserInfo();
const otherData = useOtherData();
const show = ref(false);
type currentPageDataType = {
	currentCity: {
		cityId: string;
		cityName: string;
	};
	citylist: {
		areaName: string;
	}[];
	schoolList: {
		spaSchoolName: string;
		spaSchoolId: string;
		dtDriverLogo: string;
		distance: string;
		spaRegion: string;
		spaPassRate: string;
		spaSatisfactionRate: string;
		spaStarLevel: string;
	}[];
};
const currentPageData = reactive<currentPageDataType>({
	currentCity: {
		cityId: '',
		cityName: '广州市',
	},
	citylist: [],
	schoolList: [],
});
const toolList = [
	{
		title: '我要投诉',
		src: $src('/home/11@2x.png'),
	},
	{
		title: '我要点评',
		src: $src('/home/44@2x.png'),
	},
	{
		title: '我要举报',
		src: $src('/home/22@2x.png'),
	},
	{
		title: '法律法规',
		src: $src('/home/33@2x.png'),
	},
];
//班型列表
const classList = [
	{
		path: '/pages/home/classType/recommendClass?types=C1,C2,C3',
		title: 'C1/C2/C3',
		src: $src('/home/ban4.png'),
	},
	{
		path: '/pages/home/classType/recommendClass?types=A2,B2',
		title: 'A2/B2',
		src: $src('/home/ban1.png'),
	},
	{
		path: '/pages/home/classType/recommendClass?types=A1,B1,A3',
		title: 'A1/B1/A3',
		src: $src('/home/ban2.png'),
	},
	{
		path: '/pages/home/classType/recommendClass',
		title: '其它',
		src: $src('/home/ban3.png'),
	},
];
// ==================================================周期================================
const initFn = () => {
	if (store.getToken() && otherData.url) {
		const { roleId, studentStatusCode } = store.getUser()!;
		if (
			otherData.url == '/pages/home/complaint/complaint_page/index' &&
			+roleId == 1 &&
			studentStatusCode == 1
		) {
			//如果是投诉页面判断是学员且在培
			go(otherData.url);
		} else if (
			otherData.url == '/pages/home/comment/comment_list' &&
			+roleId == 1
		) {
			//如果是点评页面判断是学员
			go(otherData.url);
		}
		otherData.url = null;
	}
	getCityList1();
	init();
};
onShow(initFn);
//============================ 函数方法==================================================
const tips = (index: number) => {
	if (index == 0) {
		if (store.getToken(true)) {
			const { roleId, studentStatusCode } = store.getUser()!;

			if (+roleId == 1 && studentStatusCode == 1) {
				go('/pages/home/complaint/complaint_page/index');
			} else {
				uni.showToast({
					title: '仅支持在培学员投诉',
					icon: 'none',
				});
			}
		} else {
			otherData.url = '/pages/home/complaint/complaint_page/index';
		}
	} else if (index == 1) {
		if (store.getToken(true)) {
			const { roleId } = store.getUser()!;
			if (+roleId == 1) {
				go('/pages/home/comment/comment_list');
			} else {
				uni.showToast({
					title: '仅支持学员点评',
					icon: 'none',
				});
			}
		} else {
			otherData.url = '/pages/home/comment/comment_list';
		}
	} else if (index == 2) {
		if (store.getToken(true)) {
			go('/pages/home/report_page/index');
		} else {
			otherData.url = '/pages/home/report_page/index';
		}
	} else {
		uni.showToast({
			title: '功能开发中，敬请期待！',
			icon: 'none',
		});
	}
};

const loadData = (data: any) => {
	const { longitude, latitude } = data;
	// 保存当前用户的经纬度坐标
	uni.setStorageSync('userLat_long', {
		longitude,
		latitude,
	});
	//获取当前经纬度所属城市
	getCityByLocation({
		latitude,
		longitude,
	}).then((res: any) => {
		//判断之前是否有选择城市，有则判断是否一样
		if (
			uni.getStorageSync('selectCityData') &&
			uni.getStorageSync('selectCityData').areaName != res.data.areaName
		) {
			saveUserLocation({
				data: uni.getStorageSync('selectCityData'),
			});
			const city = uni.getStorageSync('selectCityData')?.id;
			getSchoolData({ ...data, city });
		} else {
			// 保存当前用户选择的城市数据
			saveUserLocation(res);
			getSchoolData(data);
		}
	});
};

const saveUserLocation = (res: any) => {
	uni.setStorageSync('selectCityData', res.data);
	const { id: cityId, areaName: cityName } = res.data;
	currentPageData.currentCity = {
		cityId,
		cityName,
	};
};
const getSchoolData = (res: any) => {
	//获取附近驾校列表
	getSchoolList({
		latitude: res.latitude,
		longitude: res.longitude,
		city: res?.city ?? '',
	})
		.then((res: any) => {
			currentPageData.schoolList = res.data.list.map((ele: any) => {
				ele.dtDriverLogo = JSON.parse(ele.dtDriverLogo)?.map((item: any) => {
					return _src(item);
				});
				return ele;
			});
		})
		.finally(() => {
			uni.stopPullDownRefresh();
		});
};
const init = function () {
	//获取经纬度
	uni.getLocation({
		type: 'wgs84',
		success: function (res) {
			loadData(res);
		},
		fail: function (err) {
			uni.showToast({
				title: '定位获取失败',
				icon: 'error',
			});
			// 获取失败   默认定位广州
			err.longitude = 113.263156;
			err.latitude = 23.130567;
			loadData(err);
		},
	});
};

const getCityList1 = () => {
	getCityList()
		.then((res: any) => {
			currentPageData.citylist = res.data[0].children;
		})
		.finally(() => {
			uni.stopPullDownRefresh();
		});
};

const chosseCity = (item: any) => {
	currentPageData.currentCity = {
		cityId: item.id,
		cityName: item.areaName,
	};
	// 保存当前用户选择的城市数据
	uni.setStorageSync('selectCityData', item);
	show.value = false;
	const { latitude, longitude } = uni.getStorageSync('userLat_long');
	getSchoolData({
		latitude,
		longitude,
		city: item.id,
	});
};

const popCitySelect = () => {
	show.value = true;
};
const go = (url: String) => {
	uni.navigateTo({
		url: url,
	});
};

onPullDownRefresh(initFn);
</script>
<style scoped lang="scss">
@import 'index';
</style>
