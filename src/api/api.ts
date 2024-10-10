const { http } = uni.$u;
// 微信授权登录
export const getWxPhone = (params: { code: string, loginCode: string }) => {
	return http.post('/training/wxLogin/getWxPhone', params, {
		custom: { loading: true, increaseToken: false },
	});
}
// 上传图片
export const uploadFiles = (tempFilePaths: any) => {
	return http.upload('/training/upload/files', {
		filePath: tempFilePaths,
		name: 'files',
		custom: { loading: false, increaseToken: true }
	});
}
export const getCityList = () => {
	return http.post('/training/headPageEndpoint/getAreaInfoList', {}, {
		custom: { loading: false, increaseToken: false },
	});
}
export const getCityByLocation = (params: {
	latitude: number,
	longitude: number
}) => {
	return http.post('/training/headPageEndpoint/getAddressByLongitudeAndLatitude', params, {
		custom: { loading: false, increaseToken: false },
	});
}
// 发送验证码
export const sendCode = (params: { phoneNumber: string }) => {
	return http.post('/training/sendCodeEndpoint/sendCode', params, {
		custom: { loading: false, increaseToken: false },
	});
}
// 校验验证码
export const checkoutCode = (params: { phoneNumber: string, code: string }) => {
	return http.post('/training/sendCodeEndpoint/checkoutCode', params, {
		custom: { loading: false },
	});
}
// 验证码登录
export const phoneCodeLogin = (params: { phoneNumber: string, code: string }) => {
	return http.post('/training/wxLogin/phoneCodeLogin', params);
}
// 学员认证
export const student = (params: { cardNum: string, name: string, userId: string }) => {
	return http.post('/training/identity/student', params);
}
// 教练认证
export const coach = (params: { cardNum: string, name: string, userId: string }) => {
	return http.post('/training/identity/coach', params);
}
// 身份切换
export const changeRole = (params: { roleId: string, userId: string }) => {
	return http.post('/training/identity/changeRole', params);
}
// 驾校认证
export const school = (params: {
	cardNum: string,
	name: string,
	userId: string,
	businessLicensePhoto: string,
	cardSidePhoto: string,
	socialCreditCode: string,
	cardFrontPhoto: string
}) => {
	return http.post('/training/identity/school', params);
}
// 查询用户身份信息
export const getUserInfo = (params: { userId: string, roleId: number }) => {
	return http.post('/training/myIdentity/getUserInfo', params, { custom: { loading: false } });
}
// 获取学员身份信息
export const getStudentInfo = (params: { userId: string }) => {
	return http.post('/training/myIdentity/getStudentInfo', params);
}
// 获取驾校身份信息
export const getSchoolInfo = (params: { userId: string }) => {
	return http.post('/training/myIdentity/getSchoolInfo', params);
}
// 获取教练身份信息
export const getCoachInfo = (params: { userId: string }) => {
	return http.post('/training/myIdentity/getCoachInfo', params);
}
// 隐私政策
export const getDtPrivacyPolicy = () => {
	return http.post('/training/currency/getDtPrivacyPolicy', {}, { custom: { increaseToken: false }, });
}
// 用户协议
export const getDtUserGreement = () => {
	return http.post('/training/currency/getDtUserGreement', {}, { custom: { increaseToken: false }, });
}
// 关于我们
export const getAboutUs = () => {
	return http.post('/training/currency/getAboutUs', {}, { custom: { increaseToken: false }, });
}
// 更新个人资料
export const updateUserInfo = (params: {
	id: string,
	headSculpture?: string;
	phoneNumber?: string;
	userName?: string,
	code?: string,
	roleId: number
}) => {
	return http.post('/training/currency/updateUserInfo', params);
}
// 更新个人资料
export const helpAndFeedback = (params: {
	userId: string,
	userName: string,
	remarks?: string;
	picture?: string;
}) => {
	return http.post('/training/currency/helpAndFeedback', params, {
		custom: { loading: false },
	});
}
// 修改驾校账号信息
export const updateSchoolInfo = (params: {
	id: string,
	briefIntroduction?: string,
	driverImg?: string;
	driverLogo?: string;
	bmPhoneNumber?: string;
	roleId?: number;
}) => {
	return http.post('/training/myIdentity/updateSchoolInfo', params, {
		custom: { loading: false },
	});
}
// 查询驾校下的教练列表
export const getCoachList = (params: {
	userId: string
}) => {
	return http.post('/training/myIdentity/getCoachList', params);
}


// 查询驾校下的学车班型列表
export const getCarTypeList = (params: {
	dtDriverSchoolId: string
}) => {
	return http.post('/training/myIdentity/getCarTypeList', params);
}
// 更新学车班型
export const updateCarType = (params: {
	classId: string,
	dtDriverSchoolId: string,
	className?: string,
	classPrice?: string,
	classType?: string,
	endDate?: string,
	endTime?: string,
	remark?: string,
	startDate?: string,
	startTime?: string,
}) => {
	return http.post('/training/myIdentity/updateCarType', params);
}
// 获取下拉框数据
// "tableName": "dic_car_type",
// "tableComment": "字典-车型"
// "tableName": "dic_car_type_name",
// "tableComment": "字典-车型班次"
// "tableName": "dic_complain_type",
// "tableComment": "字典-投诉类型"
export const getDicValue = (params: {
	tableName: string,
	userId?: string,
	id?: string,
}) => {
	return http.post('/training/dic/getDicValue', params);
}
// 分校训练场列表
export const getBranchCampusList = (params: {
	addressName?: string,
	address?: string,
	longitude?: string,
	latitude?: string,
	phoneNumber?: string,
	schoolId?: string,
	schoolName?: string
}) => {
	return http.post('/training/myIdentity/getBranchCampusList', params);
}
// 创建学车班型
export const createCarType = (params: {
	dtDriverSchoolId: string,
	className?: string,
	classPrice?: string,
	classType?: string,
	endDate?: string,
	endTime?: string,
	remark?: string,
	startDate?: string,
	startTime?: string,
}) => {
	return http.post('/training/myIdentity/createCarType', params);
}
// 删除学车班型
export const deleteCarType = (params: {
	classId: string
}) => {
	return http.post('/training/myIdentity/deleteCarType', params);
}
// 修改分校训练场信息
export const upBranchCampus = (params: {
	dtSchoolId: string,
	id: string,
	address?: string,
	addressName?: string,
	addressPhoto?: string,
	phoneNumber?: string,
	remarks?: string,
	subjectName?: string,
}) => {
	return http.post('/training/myIdentity/upBranchCampus', params);
}
// 分校账号添加
export const setBranchCampus = (params: {
	phoneNumber: string
	schoolId: string
	branchCampuslId: string
}) => {
	return http.post('/training/myIdentity/setBranchCampus', params);
}

export const getSchoolList = (params: any, custom = { loading: false, increaseToken: false }) => {
	return http.post('/training/headPageEndpoint/getSchoolList', params, {
		custom
	});
}
export const getCaochList = (params: any) => {
	return http.post('/training/headPageEndpoint/getCoachList', params, {
		custom: { increaseToken: false },
	});
}
export const getSchoolDetail = (params: any) => {
	return http.post('/training/headPageEndpoint/getSchool', params, {
		custom: { increaseToken: false },
	});
}
export const getXunLianChangList = (params: any) => {
	return http.post('/training/headPageEndpoint/getBranchCampusList', params, {
		custom: { increaseToken: false },
	});
}
export const getBanXing = (params: any) => {
	return http.post('/training/headPageEndpoint/getDtLearnCarTypeList', params, {
		custom: { increaseToken: false },
	});
}
export const getCaochCarList = (params: any) => {
	return http.post('/training/headPageEndpoint/getCarList', params, {
		custom: { increaseToken: false },
	});
}

export const getCaochDetail = (params: any) => {
	return http.post('/training/headPageEndpoint/getCoach', params, {
		custom: { increaseToken: false },
	});
}
export const getClassTypeDetail = (params: any) => {
	return http.post('/training/headPageEndpoint/getDtLearnCarType', params, {
		custom: { increaseToken: false },
	});
}
export const getBranchCampusInfo = (params: any) => {
	return http.post('/training/headPageEndpoint/getBranchCampusInfo', params, {
		custom: { increaseToken: false },
	});
}
// 投诉者基本信息
export const judgeComplaint = (params: {
	coachId?: string,
	roleId: number,
	schoolId?: string,
	userId: string
}) => {
	return http.post('/training/complain/judgeComplaint', params);
}
// 查询培训时段
export const getTrainingList = (params: {
	coachId?: string,
	roleId: number,
	userId: string
}) => {
	return http.post('/training/complain/getTrainingList', params);
}

// 投诉类型列表
export const getComplaintTypeTree = (params: {
	roleId: number,
	userId: string,
	trainingId: number
}) => {
	return http.post('/training/complain/getComplaintTypeTree', params);
}
// 创建投诉信息
export const createComplain = (params: {
	spaCoachId: string,
	spaStudentId: string,
	spaCoachName: string,
	complainContent: string,
	userCardNumber: string,
	complainTypeId: string | number,
	complainTypeValue: string,
	evidenceImg: string,
	userPhoneNumber: string,
	spaSchoolId: string,
	spaSchoolName: string,
	spaBranchCampusId?: string,
	spaBranchCampusName?: string,
	endTime: string,
	trainingName: string,
	startTime: string,
	userId: string,
	userName: string
}) => {
	return http.post('/training/complain/createComplain', params, {
		custom: { isPrompt: false }
	});
}

// 查询投诉列表
export const viewComplainProgress = (params: {
	roleId: string,
	userId: string
}) => {
	return http.post('/training/complain/viewComplainProgress', params);
}
// 举报类型列表
export const getReportTypeTree = (params: {
	userId?: string
}) => {
	return http.post('/training/userReporting/getReportTypeTree', params);
}
// 查询用户举报列表
export const getUserReportList = (params: {
	userId: string
}) => {
	return http.post('/training/userReporting/getUserReportList', params);
}
// 创建举报信息
export const createReport = (params: {
	city: string,
	county: string,
	remark: string,
	img: string,
	region: string,
	reportTypeId: string,
	reportTypeName: string,
	schoolOrCoachAddress: string,
	schoolOrCoachName: string,
	userId: string,
	userName: string,
	userCardNumber: string,
	userPhoneNumber: string,
	reportTypeParentName: string,
	reportTypeParentId: number,
}) => {
	return http.post('/training/userReporting/createReport', params);
}

// 查询用户举报列表
export const revokeComplain = (params: {
	id: string
}) => {
	return http.post('/training/complain/revokeComplain', params);
}
// 学员确认
export const studentConfirm = (params: {
	id: string
	disagreeCause?: string
	studentAgreeOrNotId?: number
}) => {
	return http.post('/training/complain/studentConfirm', params);
}
// 投诉处理
export const handlingComplain = (params: {
	id: string
	drivingTrainingInstitutionContent?: string
	handlingPlan: string
}) => {
	return http.post('/training/complain/handlingComplain', params);
}
// 学员教学记录列表
export const getTrainingRecords = (params: {
	userId: string,
	pageSize: number,
	pageNumber: number,
}) => {
	return http.post('/training/userReviews/getTrainingRecords', params);
}
// 查询评价标签列表
export const getEvaluationLabelList = (params: {
	frontAndBack?: number,
	labelType?: number
}) => {
	return http.post('/training/userReviews/getEvaluationLabelList', params);
}
type dtoType = {
	anonymousSubmit: number,
	feePrice?: number,
	img: string,
	overallRating: number,
	qualityOfService?: number,
	remark: string,
	schoolId?: string,
	schoolName?: string,
	coachId?: string,
	coachName?: string,
	serviceAttitude: number,
	teachingFacilities?: number
	managementAbility?: number
	professionalSkills?: number
	safetyAwareness?: number
}
// 教练或驾校点评
export const createReviews = (params: {
	trainingRecordsId: string,
	userId: string,
	coachDTO: dtoType,
	schoolDTO: dtoType,
}) => {
	return http.post('/training/userReviews/create', params);
}
// 查询学员点评列表
export const getStudentEvaluateList = (params: {
	coachId?: string,
	pageNumber: number,
	pageSize: number,
	roleId?: string,
	schoolId?: string,
	userId?: string
}) => {
	return http.post('/training/userReviews/getStudentEvaluateList', params);
}
// 查询点评教练列表
export const getCoachEvaluateList = (params: {
	coachId: string,
	pageNumber: number,
	pageSize: number,
}) => {
	return http.post('/training/userReviews/getCoachEvaluateList', params, { custom: { increaseToken: false } });
}
// 查询点评驾校列表
export const getSchoolEvaluateList = (params: {
	schoolId: string,
	pageNumber: number,
	pageSize: number,
}) => {
	return http.post('/training/userReviews/getSchoolEvaluateList', params, { custom: { increaseToken: false } });
}
// 查询当前举报者基本信息
export const getUserReport = (params: {
	roleId: number,
	userId: string,
}) => {
	return http.post('/training/userReporting/getUserReport', params);
}