<template>
	<view class="container">
		<view class="content">
			<text style="font-weight: 700">（一）年龄条件：</text>
			<text
				>1.
				申请小型汽车、小型自动挡汽车、残疾人专用小型自动挡载客汽车、轻便摩托车准驾车型的，在18周岁以上；
			</text>
			<text
				>2.
				申请低速载货汽车、三轮汽车、普通三轮摩托车、普通二轮摩托车或者轮式专用机械车准驾车型的，在18周岁以上，60周岁以下；</text
			>
			<text
				>3.
				申请城市公交车、中型客车、大型货车、轻型牵引挂车、无轨电车或者有轨电车准驾车型的，在20周岁以上，60周岁以下；</text
			>
			<text
				>4.
				申请大型客车、重型牵引挂车准驾车型的，在22周岁以上，60周岁以下；</text
			>
			<text
				>5.接受全日制驾驶职业教育的学生，申请大型客车、重型牵引挂车准驾车型的，在19周岁以上，60周岁以下。</text
			>
			<text style="font-weight: 700">（二）身体条件：</text>
			<text
				>1.
				身高：申请大型客车、重型奉引挂车、城市公交车、大型货车、无轨电车准驾车型的，身高为155厘米以上。申请中型客车准驾车型的，身高为150厘米以上；</text
			>
			<text
				>2.视力：申请大型客车、重型奉引挂车、城市公交车、中型客车、大型货车、无轨电车或者有轨电车准驾车型的，两眼裸视力或者矫正视力达到对数视力表5.0以上。申请其他准驾车型的，两眼裸视力或者矫正视力达到对数视力表4.9以上。</text
			>
			<text
				>单眼视力障碍，优眼裸视力或者矫正视力达到对数视力表5.0以上，且水平视野达到150度的，可以申请小型汽车、小型自动挡</text
			>
		</view>
		<!-- <button class="btn">我已阅读并同意本须知</button> -->
	</view>
</template>

<script></script>

<style scoped lang="scss">
.container {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;

	.btn {
		display: flex;
		width: 690rpx;
		height: 95rpx;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 20rpx;
		left: 30rpx;
		background: #fddc13;
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		color: #000000;
	}
}

.content {
	font-size: 28rpx;
	font-weight: 400;
	color: #000000;
	line-height: 28rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding: 58rpx 58rpx 200rpx;

	text {
		margin: 16rpx 0;
	}
}
</style>
