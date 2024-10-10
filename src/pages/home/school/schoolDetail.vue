<template>
	<view class="container">
		<view class="banner">
			<u-swiper
				v-if="currentPageData.detail.driverImg?.length > 0"
				interval="5000"
				duration="500"
				@click="
					showPreviewImage(
						currentPageData.detail.driverImg as string[],
						currentNum
					)
				"
				height="480rpx"
				:list="currentPageData.detail.driverImg as string[]"
				@change="(e: any) => (currentNum = e.current)"
				indicatorStyle="right: 20px"
			>
				<template #indicator>
					<navigator
						:url="
							'/pages/home/school/atlas?imgList=' +
							JSON.stringify(currentPageData.detail.driverImg)
						"
						open-type="navigate"
						hover-class="none"
					>
						<view class="indicator-num">
							<view class="indicator-num__text">
								<u-icon name="photo-fill" color="#fff" size="14" />
								{{ currentNum + 1 }}/{{
									currentPageData.detail.driverImg?.length
								}}
							</view>
						</view>
					</navigator>
				</template>
			</u-swiper>
		</view>
		<view class="content">
			<view class="one">
				<image
					:src="currentPageData.detail.dtDriverLogo as string"
					mode="aspectFill"
				></image>
				<view>
					<text>{{ currentPageData.detail.spaSchoolName }}</text>
					<view>
						<u-tag
							:text="currentPageData.detail.spaTrainingScope"
							bgColor="#018f64"
							borderColor="#018f64"
							color="#fff"
							size="mini"
							type="warning"
						/>
					</view>
				</view>
			</view>
			<view class="two">
				<view>
					<text>考试通过率</text>
					<text>
						{{ currentPageData.detail.spaPassRate
						}}{{ currentPageData.detail.spaPassRate ? '%' : '--' }}
					</text>
				</view>
				<view>
					<text>学员好评率</text>
					<text>
						{{ currentPageData.detail.spaSatisfactionRate }}
						{{ currentPageData.detail.spaSatisfactionRate ? '%' : '--' }}
					</text>
				</view>
				<view
					><text>星级</text>
					<u-rate
						:readonly="true"
						active-color="#fddc13"
						:count="5"
						v-model="currentPageData.detail.spaStarLevel"
					/>
				</view>
			</view>
			<navigator
				:url="`/pages/home/school/trainAreaDetail?id=${currentPageData.xunlianchangList[0]?.id}`"
				open-type="navigate"
				hover-class="none"
			>
				<view class="three">
					<view class="three_title">
						<text
							>训练场({{
								currentPageData.xunlianchangList.length ?? '--'
							}})</text
						>
						<navigator
							:url="`/pages/home/school/trainArea?id=${currentPageData.id}`"
							open-type="navigate"
							hover-class="none"
							v-if="currentPageData.xunlianchangList?.length > 0"
						>
							<u-icon
								label="全部"
								space="0"
								labelSize="26rpx"
								labelPos="left"
								name="arrow-right"
								size="12"
							/>
						</navigator>
					</view>
					<view class="address" v-if="currentPageData.xunlianchangList[0]">
						<view style="width: 580rpx; display: flex; flex-direction: column">
							<text
								>最近训练场：{{
									currentPageData.xunlianchangList[0].addressName
								}}</text
							>
							<text style="color: #969696; margin-top: 10rpx">
								距离你{{ currentPageData.xunlianchangList[0].distance }}km |
								{{ currentPageData.xunlianchangList[0].address }}
							</text>
						</view>
						<view class="address_box" @tap.stop.prevent>
							<view @tap.stop.prevent>
								<u-icon name="map-fill" size="18" @click.stop="daohang" />
							</view>
							<view style="margin-left: 20rpx" @tap.stop.prevent>
								<u-icon name="phone-fill" size="18" @click.stop="makeCall" />
							</view>
						</view>
					</view>
					<text
						v-if="currentPageData.xunlianchangList.length == 0"
						class="zwsj"
					>
						暂无数据
					</text>
				</view>
			</navigator>
			<view class="banxing">
				<view class="title">
					<text>可报班型({{ currentPageData.banxingList.length }})</text>
					<navigator
						:url="`/pages/home/classType/recommendClass?id=${currentPageData.detail.spaSchoolId}`"
						open-type="navigate"
						hover-class="none"
					>
						<u-icon
							v-if="currentPageData.banxingList.length != 0"
							label="更多"
							space="0"
							labelSize="26rpx"
							labelPos="left"
							name="arrow-right"
							size="12"
						/>
					</navigator>
				</view>
				<view class="list_class">
					<text v-if="currentPageData.banxingList.length == 0" class="zwsj">
						暂无数据
					</text>
					<navigator
						v-for="ele in currentPageData.banxingList"
						:key="ele.classId"
						:url="`/pages/home/classType/classTypeDetail?id=${ele.classId}`"
						open-type="navigate"
						hover-class="none"
					>
						<view class="list_item">
							<view class="content">
								<image :src="$src('/home/ban7.png')" />
								<view class="item_right">
									<view style="justify-content: space-between">
										<text style="font-size: 28rpx; color: black">{{
											ele.className
										}}</text>
										<view>
											<text style="color: #e4393c">¥</text>
											<text style="color: #e4393c">{{
												ele.trainingExpenses
											}}</text>
										</view>
									</view>
									<view class="type">
										<u-tag
											:text="ele.carTypeName"
											bgColor="#018f64"
											borderColor="#018f64"
											color="#fff"
											size="mini"
											type="warning"
										/>
									</view>
									<view
										style="margin-top: 10rpx; font-size: 24rpx; color: #969696"
									>
										训练时段：{{ ele.trainingTime }}
									</view>
								</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>

			<view class="banxing">
				<view class="title">
					<text>教练车({{ currentPageData.caochCarTotal }})</text>
					<navigator
						:url="`/pages/home/school/coach_car?schoolId=${currentPageData.id}`"
						open-type="navigate"
						hover-class="none"
					>
						<u-icon
							v-if="currentPageData.caochCarTotal > 0"
							label="全部"
							space="0"
							labelSize="26rpx"
							labelPos="left"
							name="arrow-right"
							size="12"
						/>
					</navigator>
				</view>
				<view class="banxing_list">
					<navigator
						:url="`/pages/home/school/car_details?data=${JSON.stringify(ele)}`"
						open-type="navigate"
						hover-class="none"
						v-for="ele in currentPageData.caochCarList"
						:key="ele.carId"
					>
						<view class="box">
							<u-image
								width="72rpx"
								height="72rpx"
								:src="ele.carLogo[0]"
								mode="aspectFill"
							/>
							<text class="text1">{{ ele.carBrand }}</text>
							<text class="plate">{{ ele.carNum }}</text>
							<view class="cheling">
								<image :src="$src('home/car@2x.png')" />
								<text>车龄：{{ ele.carAge ?? '--' }}年</text>
							</view>
						</view>
					</navigator>
					<text v-if="currentPageData.caochCarList.length == 0" class="zwsj">
						暂无数据
					</text>
				</view>
			</view>
			<view class="banxing">
				<view class="title">
					<text>教练团队({{ currentPageData.caochTotal }})</text>
					<navigator
						:url="`/pages/home/school/coach_list?schoolId=${currentPageData.id}`"
						open-type="navigate"
						hover-class="none"
					>
						<u-icon
							v-if="currentPageData.caochCarTotal > 0"
							label="全部"
							space="0"
							labelSize="26rpx"
							labelPos="left"
							name="arrow-right"
							size="12"
						/>
					</navigator>
				</view>
				<view class="teacher_list">
					<navigator
						:url="`/pages/home/coach/coachDetail?id=${ele.spaCoachId}`"
						open-type="navigate"
						hover-class="none"
						v-for="ele in currentPageData.caochList"
						:key="ele.spaCoachId"
					>
						<view class="JL_box">
							<image :src="ele.dtImg" mode="aspectFill" />
							<text>{{ ele.spaCoachName || ele.dtCoachName }}</text>
							<u-tag
								:text="ele.spaTeachCarType"
								bgColor="#018f64"
								borderColor="#018f64"
								color="#fff"
								size="mini"
								type="warning"
							/>
							<text class="rate">好评率:100%</text>
						</view>
					</navigator>
					<text v-if="currentPageData.caochList.length == 0" class="zwsj"
						>暂无数据</text
					>
				</view>
			</view>
			<view class="dec">
				<view class="title">
					<text>驾校简介</text>
					<navigator
						:url="`/pages/home/school/brief_introduction`"
						open-type="navigate"
						hover-class="none"
						v-if="currentPageData.detail.spaBriefIntroduction"
					>
						<u-icon
							label="全部"
							space="0"
							labelSize="26rpx"
							labelPos="left"
							name="arrow-right"
							size="12"
						/>
					</navigator>
				</view>
				<view class="u-line-3">
					{{ currentPageData.detail.spaBriefIntroduction }}
					<text
						v-if="!currentPageData.detail.spaBriefIntroduction"
						class="zwsj"
					>
						暂无数据
					</text>
				</view>
			</view>
			<view class="dec">
				<view class="title">
					<text
						>学员评价{{
							paramsData.total ? '(' + paramsData.total + ')' : ''
						}}</text
					>
					<navigator
						v-if="paramsData.total > 0"
						:url="`/pages/home/student_evaluate/index?id=${currentPageData.id}&status=1`"
						open-type="navigate"
						hover-class="none"
					>
						<u-icon
							v-if="currentPageData.caochCarTotal > 0"
							label="全部"
							space="0"
							labelSize="26rpx"
							labelPos="left"
							name="arrow-right"
							size="12"
						/>
					</navigator>
				</view>
				<evaluate
					inactiveColor="#fddc13"
					:schoolDTO="item"
					v-for="(item, index) in list"
					:key="index"
					:status="1"
				/>
				<text class="zwsj" v-if="list.length == 0"> 暂无数据</text>
				<u-loadmore
					v-else
					:marginTop="40"
					@loadmore="loadmore"
					status="nomore"
					nomoreText="点击全部查看完整列表"
					line
				/>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { $src, _src, showPreviewImage } from '@/utils/utils';
import evaluate from '@/components/evaluation/index.vue';
import {
	getSchoolDetail,
	getXunLianChangList,
	getBanXing,
	getCaochCarList,
	getCaochList,
	getSchoolEvaluateList,
} from '@/api/api';
import { useThemeData } from '@/store';
import { useListData } from '@/hooks';
const callbackFn = (list: any[]) => {
	return list.map(v => {
		try {
			v.img = JSON.parse(_src(v.img));
			v.headSculpture = JSON.parse(_src(v.headSculpture))[0];
		} catch {
			console.log('图片转换失败');
		}
		return v;
	});
};
const store = useThemeData();
const { getData, loadmore, resetData, setParams, list, paramsData } =
	useListData<any>({
		getFn: getSchoolEvaluateList,
		callbackFn,
		pageSize: 5,
		pageNumber: 1,
		upLoading: false,
	});
const currentNum = ref(0);
interface DataType {
	id: string;
	detail: {
		bmPhoneNumber?: string;
		countNumber?: number;
		distance?: string;
		driverImg?: string[];
		dtDriverLogo?: string[];
		dtSchoolId?: string;
		spaBriefIntroduction?: string;
		spaPassRate?: string;
		spaRegion?: string;
		spaSatisfactionRate?: string;
		spaSchoolId?: string;
		spaSchoolName?: string;
		spaStarLevel?: string;
		spaTrainingScope?: string;
	};
	xunlianchangList: {
		addressName: string;
		distance: string;
		address: string;
		id?: string;
		bmPhoneNumber: string;
		latitude: string;
		longitude: string;
	}[];
	banxingList: {
		banxingList: string;
		classId: string;
		className: string;
		trainingExpenses: string;
		carTypeName: string;
		trainingTime: string;
	}[];
	caochCarList: {
		carId: string;
		carLogo: string[];
		carBrand: string;
		carNum: string;
		carAge: string;
	}[];
	caochCarTotal: number;
	caochTotal: number;
	caochList: {
		spaCoachId: string;
		dtImg: string;
		spaCoachName: string;
		dtCoachName: string;
		spaTeachCarType: string;
	}[];
	driverImg: any[];
}
const currentPageData = reactive<DataType>({
	id: '',
	detail: {},
	xunlianchangList: [],
	banxingList: [],
	caochCarList: [],
	caochCarTotal: 0,
	caochTotal: 0,
	caochList: [],
	driverImg: [],
});

onLoad((option: any) => {
	let id;
	if (option.q) {
		id = decodeURIComponent(option.q).split('ids=')[1];
	} else {
		id = option.id;
	}
	setParams({ schoolId: id });
	resetData();
	getData();
	currentPageData.id = id;
	initData();
});

const makeCall = () => {
	uni.makePhoneCall({
		phoneNumber: currentPageData.xunlianchangList[0].bmPhoneNumber,
	});
};
const daohang = () => {
	uni.openLocation({
		latitude: parseFloat(currentPageData.xunlianchangList[0].latitude),
		longitude: parseFloat(currentPageData.xunlianchangList[0].longitude),
		name: currentPageData.xunlianchangList[0].addressName,
		address: currentPageData.xunlianchangList[0].address,
	});
};
const initData = () => {
	let lat = uni.getStorageSync('userLat_long');
	const schoolId = currentPageData.id;
	const params = {
		...lat,
		schoolId,
	};
	Promise.all([
		getSchoolDetail({ id: schoolId }),
		getBanXing(params),
		getXunLianChangList(params),
		getCaochCarList({ schoolId }),
		getCaochList({ spaSchoolId: schoolId }),
	]).then(([res1, res2, res3, res4, res5]) => {
		let data = res1.data;
		data.dtDriverLogo = JSON.parse(_src(data.dtDriverLogo));
		data.driverImg = JSON.parse(_src(data.driverImg));
		currentPageData.detail = data;
		store.spaBriefIntroduction = data.spaBriefIntroduction;
		currentPageData.banxingList = res2.data.list;
		currentPageData.xunlianchangList = res3.data;
		const { total, list } = res4.data;
		currentPageData.caochCarTotal = total;
		currentPageData.caochCarList = list?.map((ele: any) => {
			try {
				ele.photo = JSON.parse(_src(ele.photo));
				ele.carLogo = JSON.parse(_src(ele.carLogo));
			} catch {
				console.log('图片转换失败');
			}
			return ele;
		});
		currentPageData.caochTotal = res5.data.total;
		currentPageData.caochList = res5.data.list.map((ele: any) => {
			try {
				ele.dtImg = JSON.parse(_src(ele.dtImg));
			} catch {
				console.log('图片转换失败');
			}
			return ele;
		});
	});
};
</script>

<style scoped lang="scss">
.container {
	.zwsj {
		font-size: 30rpx;
		color: #c0c4cc;
	}

	.content {
		width: 100%;
		padding: 0 30rpx;

		.cheling {
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			padding-bottom: 20rpx;

			> image {
				display: block;
				height: 20rpx;
				width: 33rpx;
				margin-right: 6rpx;
			}
		}

		.dec {
			margin: 44rpx 0 0;
			> view {
				margin: 16rpx 0;
				box-sizing: border-box;
				line-height: 50rpx;
				color:;

				font-size: 28rpx;
			}
			.title {
				width: 100%;
				display: flex;
				align-items: center;
				position: relative;
				justify-content: space-between;
				> text {
					font-size: 32rpx;
					font-weight: bold;
					color: #000000;
				}
			}
		}

		.three {
			border-bottom: 1px dotted #c8c8c8;
			padding-bottom: 20rpx;
			&_title {
				display: flex;
				justify-content: space-between;
				margin-top: 32rpx;
				& > text {
					font-size: 32rpx;
					font-weight: 700;
					text-align: left;
					color: #000000;
				}
			}

			.address {
				display: flex;

				font-size: 14px;
				color: black;
				margin-top: 20rpx;
				position: relative;
				&_box {
					width: 140rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					height: 100%;
				}
			}
		}

		.two {
			height: 120rpx;
			display: flex;
			border-bottom: 1px dotted #c8c8c8;

			> view {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 20rpx;

				> text:first-child {
					font-size: 14px;
					color: #969696;
				}

				> text:last-child {
					font-size: 18px;
					color: black;
				}
			}
		}

		.one {
			min-height: 206rpx;
			border-bottom: 1px dotted #c8c8c8;
			display: flex;
			padding-bottom: 20rpx;

			> image {
				width: 126rpx;
				height: 126rpx;
				margin-top: 68rpx;
			}

			> view {
				margin-top: 68rpx;
				margin-left: 32rpx;
				display: flex;
				flex-direction: column;

				> text {
					font-size: 36rpx;
					font-weight: bold;
				}

				> view {
					display: flex;
					margin-top: 30rpx;
				}
			}
		}

		.banxing {
			width: 690rpx;
			margin-top: 44rpx;
			.gd {
				font-size: 24rpx;
				font-weight: 400;
				color: #969696;
				position: absolute;
				right: 0;
				display: flex;
			}
			.list_class {
				width: 100%;
				flex-grow: 1;
				margin-top: 16rpx;

				.list_item {
					width: 100%;
					height: 220rpx;
					background: white;
					margin-bottom: 22rpx;
					border-radius: 20rpx;
					font-size: 16px;
					color: #969696;
					padding: 28rpx 0;
					box-sizing: border-box;

					.content {
						width: 100%;
						height: 154rpx;
						display: flex;
						margin-bottom: 14rpx;
						align-items: center;

						> image {
							display: block;
							width: 112rpx;
							height: 112rpx;
						}

						.item_right {
							display: flex;
							flex-direction: column;
							margin-left: 26rpx;
							color: #000000;
							flex-grow: 1;

							.type {
								margin-top: 10rpx;
							}

							> view {
								display: flex;
								align-items: center;

								> text {
									font-weight: bold;
									color: #969696;
								}

								> image {
									display: block;
									width: 18rpx;
									height: 18rpx;
								}
							}
						}
					}
				}
			}

			.fujin_list {
				width: 100%;
				height: 200rpx;

				> .item {
					width: 100%;
					height: 112rpx;
					display: flex;
					margin-bottom: 14rpx;
					align-items: center;

					> image {
						display: block;
						width: 112rpx;
						height: 112rpx;
					}

					.item_right {
						display: flex;
						flex-direction: column;
						margin-left: 26rpx;
						font-size: 20rpx;
						color: #000000;

						> view {
							display: flex;
							align-items: center;

							> text {
								font-size: 20rpx;
								font-weight: bold;
								color: #969696;
							}

							> image {
								display: block;
								width: 18rpx;
								height: 18rpx;
							}
						}
					}
				}
			}

			.teacher_list {
				width: 100%;
				white-space: nowrap;
				overflow: hidden;
				overflow-x: auto;
				margin-top: 16rpx;
				display: flex;
				.JL_box {
					flex: none;
					width: 174rpx;
					margin-right: 8rpx;
					background: white;
					display: flex;
					flex-direction: column;
					align-items: center;
					border-radius: 20rpx;
					gap: 10rpx;
					> image {
						width: 146rpx;
						height: 146rpx;
						margin: 16rpx auto 0;
					}

					.rate {
						font-size: 24rpx;
						text-align: center;
						color: #969696;
						padding-bottom: 10rpx;
					}
				}
				::v-deep .u-tag {
					max-width: 146rpx;
					text {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}

			.banxing_list {
				width: 100%;
				white-space: nowrap;
				overflow: hidden;
				overflow-x: auto;
				margin-top: 16rpx;
				display: flex;

				.box {
					padding-top: 20rpx;
					flex: none;
					width: 220rpx;
					margin-right: 8rpx;
					background: white;
					display: flex;
					flex-direction: column;
					align-items: center;
					border-radius: 20rpx;

					> image {
						width: 72rpx;
						height: 72rpx;
						margin: 20rpx 0;
					}
					.text1 {
						display: block;
						white-space: nowrap;
						text-overflow: ellipsis;
						text-align: center;
						max-width: 100%;
						overflow: hidden;
					}

					.plate {
						background-color: #fdad13;
						font-size: 12px;
						padding: 10rpx 22rpx;
						color: black;
						font-weight: 700;
						margin-top: 10rpx;
						border-radius: 10rpx;
						border: 2rpx solid black;
					}
				}
			}

			.title {
				width: 100%;
				display: flex;
				align-items: center;
				position: relative;
				justify-content: space-between;
				> text {
					font-size: 32rpx;
					font-weight: bold;
					color: #000000;
				}
			}
		}
	}

	.banner {
		height: 480rpx;
		width: 100%;

		.te {
			image {
				display: block;
				width: 750rpx;
				height: 480rpx;
			}
		}
		.indicator-num {
			padding: 4rpx 10rpx;
			background-color: rgba(0, 0, 0, 0.35);
			border-radius: 200rpx;
			justify-content: center;

			&__text {
				color: #ffffff;
				font-size: 24rpx;
				display: flex;
				align-items: center;
				gap: 4rpx;
			}
		}
	}
}
</style>
