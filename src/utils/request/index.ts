// 引入拦截器配置
import { requestInterceptors, responseInterceptors } from './interceptors';
//  初始化请求配置
const initRequest = (vm: any) => {
	uni.$u.http.setConfig((defaultConfig: any) => {
		/* defaultConfig 为默认全局配置 */
		defaultConfig.baseURL = import.meta.env.VITE_API_HOST; /* 根域名 */
		defaultConfig.custom = {
			loading: true,//是否开启加载
			increaseToken: true,//是否携带token
			isPrompt: true//是否开启报错提示
		}
		return defaultConfig;
	});
	requestInterceptors();
	responseInterceptors();
};
export { initRequest };
