<template>
	<prompt-pop :pop-list="popList" title="投诉须知" />

	<view class="box">
		<u-steps activeColor="#000" :current="current">
			<u-steps-item
				@tap="stepsFn(index)"
				v-for="(item, index) in stepsList"
				:key="index"
				:title="item"
			/>
		</u-steps>
	</view>
	<view class="complaint_page">
		<one ref="oneref" v-show="current == 0" :model="model" />
		<two ref="tworef" v-show="current == 1" :model="model" />
		<three v-show="current == 2" :model="model" />
	</view>
	<view class="btn">
		<u-button
			:customStyle="
				model.isTrue
					? customStyleButtom
					: {
							...customStyleButtom,
							color: '#fff',
							backgroundColor: '#f7e782',
					  }
			"
			@click="submit"
		>
			{{ current < 2 ? '下一步' : '提交' }}
		</u-button>
	</view>
	<u-modal
		cancelText="我知道了"
		showCancelButton
		@cancel="show = false"
		@confirm="confirm"
		confirmColor="#fddc13"
		confirmText="查看投诉进度"
		:show="show"
		title="提示"
		:customStyle="{ textAlign: 'center' }"
	>
		<template #default>
			<view class="content_text">
				{{ content }}
			</view>
		</template>
	</u-modal>
</template>

<script setup lang="ts">
import { judgeComplaint, getTrainingList, createComplain } from '@/api/api';
import promptPop from '@/components/promptPop/index.vue';
import { customStyleButtom } from '@/utils/publicClassType';
import one from './components/one/index.vue';
import two from './components/two/index.vue';
import three from './components/three/index.vue';
import { useOtherData } from '@/store';
import { useUserInfo } from '@/store/userStore';
export interface child {
	id: number;
	level: string;
	parentId: string;
	sort: number;
	img: string;
	value: string;
	remark: string;
	children: child[];
}
export interface ModelType {
	userName: string;
	spaStudentId: string;
	userCardNumber: string;
	userPhoneNumber: string;
	spaSchoolName: string;
	spaCoachName: string;
	spaSchoolId: string;
	isTrue: boolean;
	complainTypeId: number;
	complainTypeValue: string;
	complainContent: string;
	coachId: string;
	schollIndex: number;
	evidenceImg: string[];
	timeIndexList: number[];
	typeList: child[];
	date: {
		startTime: string;
		endTime: string;
	} | null;
	schoolList: {
		spaBranchCampusId: string;
		spaBranchCampusName: string;
		spaBranchCampusAddress: string;
	}[];
	coachList: { spaCoachId: string; spaCoachName: string }[];
	trainingList: {
		subjectName: string;
		subjectTime: string;
		trainingTimeList: {
			startTime: string;
			endTime: string;
		}[];
	}[];
}
const otherData = useOtherData();
const store = useUserInfo();
const show = ref(false);
const content = ref('');
const { roleId, userId } = store.getUser()!;
const oneref = ref<any>(null);
const stepsList = ['投诉对象', '投诉分类', '投诉内容'];
const current = ref(0); //步骤
const stepsFn = (index: number) => {
	if (index < current.value) {
		current.value = index;
		model.isTrue = true;
	}
};
let model = reactive<ModelType>({
	userName: '',
	complainContent: '',
	evidenceImg: [],
	userCardNumber: '',
	userPhoneNumber: '',
	spaSchoolName: '',
	spaCoachName: '',
	date: null,
	schoolList: [],
	coachList: [],
	schollIndex: -1, //选中的驾校场地index
	timeIndexList: [-1, -1], //选中的时段的index
	coachId: '',
	trainingList: [],
	isTrue: false,
	typeList: [],
	complainTypeId: -1,
	complainTypeValue: '',
	spaStudentId: '',
	spaSchoolId: '',
});
const tworef = ref<any>(null);
const onFn = () => {
	oneref.value.formFn(() => {
		tworef.value.getDataList(model.timeIndexList[0] + 1);
		current.value = 1;
		model.isTrue = model.complainTypeId >= 0;
	});
};
const twoFn = () => {
	if (model.complainTypeId < 0) {
		uni.showToast({
			title: '请选择投诉分类',
			icon: 'none',
		});
	} else {
		current.value = 2;
		model.isTrue = model.complainContent.length > 0;
	}
};
const confirm = () => {
	uni.navigateTo({ url: '/pages_my/my_complaint/index' });
};
const threeFn = () => {
	if (model.complainContent.length > 0) {
		const {
			coachId,
			spaCoachName,
			complainContent,
			userCardNumber,
			complainTypeId,
			complainTypeValue,
			evidenceImg,
			userPhoneNumber,
			spaSchoolName,
			userName,
			schoolList,
			schollIndex,
			date,
			trainingList,
			timeIndexList,
			spaStudentId,
			spaSchoolId,
		} = model;
		const { endTime, startTime } = date!;
		const trainingName =
			trainingList.length > 0
				? trainingList?.[timeIndexList[0]]?.subjectName
				: '';
		const params: any = {
			spaCoachId: coachId,
			spaCoachName,
			complainContent,
			userCardNumber,
			complainTypeId,
			complainTypeValue,
			evidenceImg: JSON.stringify(evidenceImg),
			userPhoneNumber,
			spaSchoolName,
			userName,
			startTime,
			endTime,
			trainingName,
			spaStudentId,
			userId,
			spaSchoolId,
		};
		if (schoolList[schollIndex]) {
			const { spaBranchCampusId, spaBranchCampusName } =
				schoolList[schollIndex];
			params.spaBranchCampusId = spaBranchCampusId;
			params.spaBranchCampusName = spaBranchCampusName;
		}
		createComplain(params)
			.then(() => {
				uni.showModal({
					title: '提示',
					content: '请确认是否要订阅处理进度提醒？',
					success: function (sm) {
						if (sm.confirm) {
							uni.requestSubscribeMessage({
								tmplIds: ['shLpaRcXtDDa3NfdiMjp9M636wipdJFV0isyi2_U3-s'],
								complete() {
									redirectFn();
								},
							});
						} else if (sm.cancel) {
							redirectFn();
						}
					},
				});
			})
			.catch((error: any) => {
				if (error.code == -29) {
					content.value = error.message;
					show.value = true;
				} else if (error.code == -30) {
					uni.showToast({
						title: error.message,
						icon: 'none',
					});
				}
			});
	} else {
		uni.$u.toast('请填写投诉内容');
	}
};
const redirectFn = () => {
	uni.showToast({
		title: '提交成功',
		icon: 'success',
		success: () => {
			const time = setTimeout(() => {
				uni.redirectTo({ url: '/pages_my/my_complaint/index' });
				clearTimeout(time);
			}, 500);
		},
	});
};
const fnList = [onFn, twoFn, threeFn];
const submit = () => {
	fnList[current.value]();
};
const getData = () => {
	Promise.all([
		judgeComplaint({ roleId, userId }),
		getTrainingList({ roleId, userId }),
	]).then(([res1, res2]) => {
		const {
			userName,
			userCardNumber,
			userPhoneNumber,
			spaCoachName,
			schoolList,
			coachList,
			spaSchoolName,
			spaStudentId,
			spaSchoolId,
		} = res1.data;
		model = Object.assign(model, {
			userName,
			userCardNumber,
			userPhoneNumber,
			spaCoachName,
			schoolList,
			coachList,
			trainingList: res2.data,
			spaSchoolName,
			spaStudentId,
			spaSchoolId,
		});
	});
};
onMounted(getData);
onShow(() => {
	otherData.url = null;
});
const popList = [
	{
		text: '为了你的诉求能够得到及时有效处理，请填写真实姓名和联系方式，如实反映有关情况，并对其真实性负责。',
		className: 'zw',
	},
	{
		text: '作为平台服务者，我们在收到你的投诉后，我们将做出以下处理，并会尽快将其转达到相关的管理部门。',
		className: '',
	},
	{
		text: '1.你反映的诉求我们将根据实际情况分类处理。',
		className: '',
	},
	{
		text: '2.在处理您的个人信息时，我们将依照法律、行政法规等有关规定的权限、程序进行，严格控制个人信息披露范围，不超出履行法定职责所必需的范围和限度。',
		className: 'zw',
	},
	{
		text: '提交投诉时，请注意：',
		className: '',
	},
	{
		text: '1.遵守中华人民共和国各项法律和规定，诉求内容不含侮辱、猥亵、色情、人身攻击及反动等违反法律法规、公序良俗等内容的言论；',
		className: '',
	},
	{
		text: '2.按照表单的提示指引，清晰且详细填写各项内容，确保诉求明确，信息准确；',
		className: '',
	},
	{
		text: '3.一个表单仅反映一个诉求，如有两个或以上的不同诉求，需选择正确的表单分别填写提交。',
		className: 'zw',
	},
	{
		text: '如投诉存在以下情形，包括但不仅限于缺乏事实依据而进行投诉、涉嫌滥用投诉、非合理投诉，平台将有权根据实际情况调整处理方式。另外，如由于特殊原因，包括但不限于网络因素、设备原因、投诉量短期激增等，平台的处理与反馈可能会有时效调整或迟延。',
		className: '',
	},
];
</script>

<style scoped lang="scss">
::v-deep .u-text__value {
	font-size: 30rpx !important;
}
::v-deep {
	.u-line {
		border-color: #eee !important;
	}
	.u-collapse-item {
		border-bottom: 1rpx solid #f7f7f7 !important;
	}
	.input-placeholder {
		font-weight: 200;
		font-size: 28rpx !important;
	}
	.u-count-down__text {
		color: #000 !important;
	}
	.u-textarea {
		padding: 0 !important;
	}
	.u-textarea__field {
		color: #000 !important;
	}
	.u-steps-item__wrapper__circle__text {
		font-size: 32rpx !important;
	}
}
::v-deep .u-steps-item__content {
	margin-top: 30rpx !important;
}
::v-deep .u-steps-item__wrapper__circle {
	width: 60rpx !important;
	height: 60rpx !important;
}
::v-deep .u-form-item__body__left__content__label {
	font-size: 28rpx !important;
	font-weight: 500;
}
::v-deep .u-input__content__field-wrapper__field {
	font-size: 28rpx !important;
}
.box {
	padding: 100rpx 0;
	background-color: #fddc13;
	margin-bottom: 30rpx;
	::v-deep .u-steps-item__wrapper {
		background-color: #fddc13 !important;
	}
}
.complaint_page {
	padding: 0 30rpx;
}
.btn {
	width: 100%;
	box-sizing: border-box;
	padding: 0 40rpx;
	position: fixed;
	bottom: 80rpx;
	left: 0;
}
.content_text {
	width: 275px;
	text-align: center;
	font-size: 30rpx;
	white-space: pre-line;
	word-wrap: break-word;
	word-break: break-all;
}
</style>
