export interface Role {
    id: string
    roleCode: string
    roleName: string
    roleSort: number
  }
export interface UserInfo {
    account: string
    headSculpture: string
    phoneNumber: string
    studentStatusValue: string
    userId: string
    userName: string
    studentStatusCode: number
    cultivateType:string
    roleCode:string
    roleId:number
    schoolName:string
  }

export interface UserMsg {
  cardNum: string,
  id: string,
  name: string,
  phoneNumber: string,
  post: string,
  remark: string,
  schoolName: string,
  teachCarType: string,
  yearsOfTeaching: string,
  address: string,
  briefIntroduction: string,
  driverImg: string[],
  driverLogo: string[],
  region: string,
  schoolId: string,
  trainingScope: string,
  headSculpture: string,
  bmTime: string,
  statusCode: number,
  statusValue: string,
  subjectFourExamination: string,
  subjectFourRate: number,
  subjectOneExamination: string,
  subjectOneRate: number,
  subjectThreeExamination: string,
  subjectThreeRate: number,
  subjectTwoExamination: string,
  subjectTwoRate: number,
  addressName: number,
  spaSchoolName: string,
  trainingType: string,
  cultivateType: string,
  pendingNewNumber: number
}