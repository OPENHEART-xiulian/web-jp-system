<template>
	<view class="yealuo-select">
		<view
			class="yealuo-background"
			@touchmove.stop.prevent="() => {}"
			@click="isShow = false"
			v-show="isShow"></view>
		<view
			class="yealuo-con"
			:style="inputStyle"
			@tap="isShow = isShow ? false : nowData.length">
			<slot name="left"></slot>
			<input
				:disabled="theDisabled"
				:placeholder="placeholder"
				v-model="theValue"
				@input="theInput"
				@focus="theFocus"
				@blur="theBlur"
				autocomplete="off" />
			<slot
				name="right"
				v-if="selectIco">
				<u-icon
					v-if="!isShow"
					name="arrow-down" />
				<u-icon
					v-else
					name="arrow-up" />
			</slot>
		</view>
		<view
			class="yealuo-select"
			v-show="show"
			:style="selectStyle">
			<view class="data">
				<radio-group
					v-if="checkType == 'radio'"
					@change="selectCheckbox">
					<view
						class="select-item"
						:class="'item-' + overflow"
						v-for="(item, index) in nowData"
						:key="index">
						<label
							class="item-text"
							:class="{ active: theValue == item.value }">
							<radio
								name="name1"
								:checked="theValue == item.value"
								:value="item.value + '|' + item.id"></radio>
							{{ item.value }}
						</label>
					</view>
				</radio-group>
				<checkbox-group
					v-else-if="checkType == 'checkbox'"
					@change="selectCheckbox">
					<view
						class="select-item"
						:class="'item-' + overflow"
						v-for="(item, index) in nowData"
						:key="index">
						<label
							class="item-text"
							:class="{ active: theValue.indexOf(item.value) != -1 }">
							<checkbox
								color="#fddc13"
								name="name1"
								:checked="theValue.indexOf(item.value) != -1"
								:value="item.value + '|' + item.id"></checkbox>
							{{ item.value }}
						</label>
					</view>
				</checkbox-group>
				<radio-group
					v-else
					@change="selectCheckbox">
					<view
						class="select-item"
						:class="'item-' + overflow"
						v-for="(item, index) in nowData"
						:key="index">
						<label
							class="item-text"
							:class="{ active: theValue == item.value }">
							<radio
								name="name1"
								style="display: none"
								checked
								v-if="theValue == item.value"
								:value="item.value + '|' + item.id"></radio>
							<radio
								name="name1"
								style="display: none"
								v-else
								:value="item.value + '|' + item.id"></radio>
							{{ item.value }}
						</label>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>
<!-- 参数	作用	类型	默认值	参考值
value	选项默认值	String	''	选项1
placeholder	输入框提示	String	''	请输入关键字
binData	绑定下拉的数据	Array	[]	[{id:1,value:'选项1'}]
checkType	下拉类型	String	''	radio,checkbox
overflow	下拉项超出是否显示滚动条	string	auto	hidden,auto
getBackVal	选中传值事件	function	getBackVal	
selectIco	下拉箭头是否显示	bool	true	true,false
disabled	下拉输入是否被禁用	bool	false	true,false
inputStyle	文本框样式	string	""	"height:30px;"
selectStyle	下拉框样式	string	""	"font-size:14px;"
tags	多下拉框区分参数	string	""	"listType" -->

<!-- 
  使用案例
  <yealuo-inputs
value="选项2"
placeholder="请选择"
:binData="data"
checkType="checkbox"
overflow="hide"
:disabled="true"
@getBackVal="getBackVal"
:selectIco="true" /> -->
<script lang="ts" setup>
interface Props {
	placeholder?: string;
	value?: string;
	checkType?: string;
	itemKey?: string;
	width?: string;
	disabled?: boolean;
	inputStyle?: string;
	selectStyle?: string;
	overflow?: string;
	tags?: string;
	binData?: any;
	selectIco?: boolean;
}
interface Emits {
	(e: 'blur', val: any): void;
	(e: 'getBackVal', val: any): void;
}
const props = withDefaults(defineProps<Props>(), {
	placeholder: '',
	value: '',
	checkType: '',
	itemKey: '',
	width: '600',
	disabled: false,
	inputStyle: '',
	selectStyle: '',
	overflow: 'auto',
	tags: '',
	binData: '',
	selectIco: true,
});
const emits = defineEmits<Emits>();
const odData = ref(props.binData);
const nowData = ref(props.binData);
const theValue = ref(props.value);
const theDisabled = ref(props.disabled);
const isShow = ref(false);
const show = computed(() => isShow.value && nowData.value.length);
//获取焦点
const theFocus = (e: any) => {
	nowData.value = odData.value;
};
//失去焦点
const theBlur = (e: any) => {
	emits('blur', e);
};
//获取输入值
const theInput = (e: any) => {
	let val = e.detail.value;
	let data = [];
	const odDatas = odData.value;
	for (let i = 0; i < odDatas.length; i++) {
		let isHas = false;
		if (odDatas[i].value.indexOf(val) != -1) {
			data.push(odDatas[i]);
			if (odDatas[i].value == val) {
				isHas = true;
				let arr = [];
				arr.push(odDatas[i].value + '|' + odDatas[i].id);
				emits('getBackVal', arr);
			}
		}
		if (!isHas) {
			let arr = [];
			arr.push(val);
			emits('getBackVal', arr);
		}
	}
	nowData.value = data;
};
//下拉选中
const selectCheckbox = (e: any) => {
	let val = e.target.value;
	let str = val;
	if (typeof str != 'string') {
		str = '';
		for (let i = 0; i < val.length; i++) {
			let vt = val[i].split('|');
			str += i > 0 ? ',' + vt[0] : vt[0];
		}
	} else {
		isShow.value = false;
		str = str.split('|')[0];
	}
	val = val.map((v: string) => {
		const arr = v.split('|');
		return {
			value: arr[0],
			id: arr[1],
		};
	});

	emits('getBackVal', val);
	theValue.value = str;
};
</script>

<style lang="scss" scoped>
.yealuo-select {
	max-width: 100%;
	position: relative;
	.yealuo-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100%;
	}
	.yealuo-con {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2rpx solid #dcdfe6;
		border-radius: 6rpx;
		box-sizing: border-box;
		padding: 10rpx;
		input {
			flex: 1;
			margin: 0 6rpx;
		}
	}

	.yealuo-select {
		border: 1px solid #f3f3f4;
		position: absolute;
		z-index: 999;
		background: #fff;
		top: 100rpx;
		width: 100%;
		box-shadow: 0 4rpx 24rpx 0 rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		padding: 10rpx;
		&::after {
			position: absolute;
			display: block;
			width: 0;
			height: 0;
			border-color: transparent;
			border-style: solid;
			content: ' ';
			border-width: 12rpx;
			top: -10rpx;
			margin-left: 44rpx;
			border-top-width: 0;
			border-bottom-color: #fff;
		}
		.data {
			max-height: 600rpx;
			padding: 10rpx;
			overflow: auto;
			.select-item {
				width: 100%;
				color: #666;
				height: 60rpx;
				display: flex;
				align-items: center;
				.item-text {
					width: 100%;
					display: block;
				}
				.active {
					font-weight: bold;
				}
			}
			.item-auto {
				overflow: auto;
				.item-text {
					width: max-content;
				}
			}
			.item-hide .item-text {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.item-close {
			padding: 20rpx;
			text-align: center;
			font-size: 32rpx;
			border-top: 1px solid #f3f3f4;
			color: #8f8f94;
		}
	}
}
</style>
