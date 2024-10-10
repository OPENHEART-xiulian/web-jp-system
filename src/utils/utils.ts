import pinia from '@/utils/store'
import { useUserInfo } from '@/store/userStore'
import { getUserInfo } from '@/api/api'
import md5 from 'js-md5'
const store = useUserInfo(pinia)
//保存跳转登录前的页面信息
export const returnToPage = () => {
  const url = uni.getStorageSync('beforePage')
  const tabBarList = ["/pages/home/home_page/index", "/pages/my/my_page/index"];
  if (tabBarList.includes(url)) {
    uni.switchTab({ url });
  } else {
    uni.redirectTo({ url })
  }
}

// 保存用户信息
export const preserveUserMsg = (data: { role: any, token: string, userInfo: any }, callback?: any) => {
  const { role, token, userInfo } = data;
  store.setToken(token);
  store.setRole(role);
  store.setUser(userInfo);
  callback && callback()
}
// 跳转登录
export const jumpLogin = (isJump = true) => {
  store.removeUser();
  if (isJump && !uni.$u.page().includes('/pages/login/login_page/index')) {
    uni.navigateTo({ url: '/pages/login/login_page/index' });
  }
}

//姓名脱敏
export const nameDes = (name: string) => {
  if (name.length == 3) {
    return name.replace(/^(.).+(.)$/, "$1*$2")
  }else if (name.length > 3) {
    return name.replace(/^(.{2}).+(.)/, "$1**$2")
  } else {
    return name.replace(/^(.).+$/, "$1*")
  }
}
// 电话脱敏
export const desensitization = (phoneNumber: string) => {
  const exp = new RegExp(/^(.{3})(?:\d+)(.{4})$/)
  return phoneNumber.replace(exp, "$1****$2");
}
//项目本地图片获取函数
export const $src = (name: string) => {
  return import.meta.env.VITE_ITEM_IMG_HOST + name
}
//项目上传图片获取函数
export const _src = (name: string) => {
  return (name ?? '').replaceAll('/data/jp-backend/picture', import.meta.env.VITE_IMG_HOST)
}
//解析项目上传图片文件名
export const repairSrc = (name: string) => {
  return (name ?? '').replaceAll(import.meta.env.VITE_IMG_HOST, '/data/jp-backend/picture')
}
// 上传函数
export const uploadFiles = async (tempFilePaths: any, token = store.getToken()) => {
  return uni.uploadFile({
    url: import.meta.env.VITE_API_HOST + 'training/upload/files', //后端用于处理图片并返回图片地址的接口
    filePath: tempFilePaths,
    name: 'files',
    header: { Authorization: token },
  });
};

//预览图片
export const showPreviewImage = (imgList: string[], current = 0) => {
  uni.previewImage({
    urls: imgList,
    current
  });
}
const hanldeFn = (i:  number) => {
  return i < 10 ? '0' + i : i
}
//倒计时剩余时间
export const IntervalTime = (endTime: string) => {
  const date1 = new Date(endTime);    //结束时间
  const date2 = new Date();
  const date3 = (date1.getTime() + 1000 * 60 * 60 * 24 * 3) - date2.getTime();  //时间差的毫秒数
  if (date3 < 0) return '已超时'
  //计算出相差天数
  const days = Math.floor(date3 / (24 * 3600 * 1000));
  //计算出小时数

  const leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  const leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));

  //计算相差秒数

  const leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);

  return `${!!days ? days + '天' : ''}${hours && hanldeFn(hours) + ':'}${minutes && hanldeFn(minutes) + ':'}${seconds && hanldeFn(seconds)}`
}
//获取用户信息
export const getUserMsg = () => {
  if (store.getToken()) {
    const { userId, roleId } = store.getUser()!;
    getUserInfo({ userId, roleId }).then((res: any) => {
      const data = res.data;//获取用户信息列表数据
      data.headSculpture = JSON.parse(_src(data.headSculpture))[0]
      store.setUserMsg(data)
    });
  }
};

// 生成接口加密key方法
// TODD 需前后端用同套生成规则，如需修改必须前后端一起更改
export const encryptionMD5=(keys:string)=>{
  const key = keys + keys.split('').reverse().join('');
  let date = new Date(); // 获取时间
  let year = date.getFullYear(); // 获取年
  let month = date.getMonth() + 1; // 获取月
  let strDate = date.getDate(); // 获取日
  const keystr = `${year}${key.substr(month, 5)}${hanldeFn(month)}${key.substr(strDate, 5)}${hanldeFn(strDate)}`;
  return md5.hex(keystr);
}
