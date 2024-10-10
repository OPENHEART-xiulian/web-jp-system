import { jumpLogin } from '../utils';
import { useUserInfo } from '@/store/userStore';
import { Encrypt, Decrypt } from '@/utils/secrypt';
const { getToken } = useUserInfo();
import jsmd5 from 'js-md5';
import { emd5 } from '@/static/js/emd5';
const IV = import.meta.env.VITE_IV;
const requestInterceptors = () => {
	/**
	 * 请求拦截
	 */
	uni.$u.http.interceptors.request.use(
		(config: config) => {
			if (config?.custom?.loading) {
				uni.showToast({
					title: '加载中...',
					icon: 'loading',
					mask: true,
				});
			}
			// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
			if (config?.custom?.increaseToken) {
				//时候需要加token，默认要添加
				if (!getToken(true)) return;
				config.header = {
					Authorization: getToken(true) ?? '',
				};
			}
			if (config.method == 'POST') {
				config.data = { body: config.data };
			}
			if (import.meta.env.VITE_ENCRYPT == 'true') {
				//加密数据
				const key = jsmd5.hex(emd5());
				config.data = Encrypt(
					Encrypt(JSON.stringify(config.data), key, IV),
					key,
					IV
				);
			}
			return config;
		},
		(
			config: config // 可使用async await 做异步操作
		) => Promise.reject(config)
	);
};
const codeList = [-2, -3, -5, -6, -10, -12, -23];
const responseInterceptors = (vm?: any) => {
	/**
	 * 响应拦截
	 */
	uni.$u.http.interceptors.response.use(
		(response: any) => {
			const custom = response.config?.custom;
			if (custom?.loading) {
				uni.hideToast();
			}
			/* 对响应成功做点什么 可使用async await 做异步操作*/
			const data = response.data;
			if (import.meta.env.VITE_ENCRYPT == 'true' && !!data.data) {
				//解密数据
				const key = jsmd5.hex(emd5());
				data.data = JSON.parse(Decrypt(Decrypt(data.data, key, IV), key, IV));
			}
			const code = data.code;
			// 自定义参数
			if (code !== 200) {
				// 服务端返回的状态码不等于200，则reject()
				// 如果没有显式定义custom的isPrompt参数为false的话，默认对报错进行toast弹出提示
				if (codeList.includes(code)) {
					jumpLogin();
					const time = setTimeout(() => {
						uni.$u.toast(data.message);
						clearTimeout(time);
					}, 100);
				} else if (custom?.isPrompt) {
					//是否需要处理报错
					uni.$u.toast(data.message);
				}
				return Promise.reject(data);
			}
			return data || {};
		},
		(response: any) => {
			const custom = response.config?.custom;
			if (custom?.loading) {
				uni.hideToast();
			}
			uni.$u.toast('操作频繁，请稍后重试');
			return Promise.reject(response);
		}
	);
};

export { requestInterceptors, responseInterceptors };
