export interface ListType {
	head: string;
	list: {
		src: string;
		name: string;
		url?: string;
		toast?: string;
		isShow?: boolean;
		callback?: () => void;
	}[];
}

export interface BottomListType {
	left_val: string;
	right_val: string;
	url: string;
}
export interface UserInfo {
	cardNum: string;
	id: string;
	name: string;
	phoneNumber: string;
	post: string;
	remark: string;
	schoolName: string;
	teachCarType: string;
	yearsOfTeaching: string;
	address: string;
	briefIntroduction: string;
	driverImg: string[];
	driverLogo: string[];
	region: string;
	schoolId: string;
	trainingScope: string;
	headSculpture: string;
	bmTime: string;
	statusCode: number;
	statusValue: string;
	subjectFourExamination: string;
	subjectFourRate: number;
	subjectOneExamination: string;
	subjectOneRate: number;
	subjectThreeExamination: string;
	subjectThreeRate: number;
	subjectTwoExamination: string;
	subjectTwoRate: number;
	addressName: number;
	spaSchoolName: string;
	trainingType: string;
	cultivateType: string;
	pendingNewNumber: number;
}
