<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useUserInfo } from '@/store/userStore';
const store = useUserInfo();
onLaunch(() => {
	store.initialization();
});
onHide(() => {});
onShow(() => {});
</script>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-plus/index.scss';

page {
	font-size: $uni-font-size-base;
	background-color: $uni-bg-color-grey;
	padding-bottom: 160rpx;
	min-height: 100vh;
	box-sizing: border-box;

	& ::v-deep {
		& .u-form-item__body__left__content__label {
			font-size: 30rpx !important;
		}
		& .u-steps-item__wrapper {
			background-color: transparent !important;
		}
		& .u-text__value--main {
			font-weight: bold !important;
		}

		& .u-input__content__field-wrapper__field {
			font-size: 30rpx !important;
		}

		& .u-border {
			border-color: #898989 !important;
		}
		& .u-tag {
			height: 40rpx !important;
		}
		& .u-popup__content {
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
		}
		& .u-collapse-item__content__text {
			padding: 0 !important;
		}
		& .u-collapse-item {
			border-bottom: 2rpx solid #eee;
			&:last-child {
				border: none;
			}
		}
		& .u-cell__body {
			padding: 20rpx 0 !important;
		}
	}

	.file-picker__progress {
		display: none !important;
	}
}

view {
	box-sizing: border-box;
}

.zwsj {
	font-size: 30rpx;
	color: #c0c4cc !important;
}
</style>
