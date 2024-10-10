type Record<K extends keyof any, T> = {
	[P in K]: T;
};
type AnyObject = Record<string | number | symbol, any>;
type HttpPromise<T> = Promise<HttpResponse<T>>;
type Tasks = UniApp.RequestTask | UniApp.UploadTask | UniApp.DownloadTask;
type config = {
	/** 请求基地址 */
	baseURL?: string;
	/** 请求服务器接口地址 */
	url?: string;

	/** 请求查询参数，自动拼接为查询字符串 */
	params?: AnyObject;
	/** 请求体参数 */
	data?: any;

	/** 文件对应的 key */
	name?: string;
	/** HTTP 请求中其他额外的 form data */
	formData?: AnyObject;
	/** 要上传文件资源的路径。 */
	filePath?: string;
	/** 需要上传的文件列表。使用 files 时，filePath 和 name 不生效，App、H5（ 2.6.15+） */
	files?: Array<{
		name?: string;
		file?: File;
		uri: string;
	}>;
	/** 要上传的文件对象，仅H5（2.6.15+）支持 */
	file?: File;

	/** 请求头信息 */
	header?: AnyObject;
	/** 请求方式 */
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'UPLOAD' | 'DOWNLOAD';
	/** 如果设为 json，会尝试对返回的数据做一次 JSON.parse */
	dataType?: string;
	/** 设置响应的数据类型，支付宝小程序不支持 */
	responseType?: 'text' | 'arraybuffer';
	/** 自定义参数 */
	custom?: AnyObject;
	/** 超时时间，仅微信小程序（2.10.0）、支付宝小程序支持 */
	timeout?: number;
	/** DNS解析时优先使用ipv4，仅 App-Android 支持 (HBuilderX 2.8.0+) */
	firstIpv4?: boolean;
	/** 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+） */
	sslVerify?: boolean;
	/** 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+） */
	withCredentials?: boolean;

	/** 返回当前请求的task, options。请勿在此处修改options。 */
	getTask?: (task: T, options: HttpRequestConfig<T>) => void;
	/**  全局自定义验证器 */
	validateStatus?: (statusCode: number) => boolean | void;
	/** params 参数自定义处理 */
	paramsSerializer?: (params: AnyObject) => string | void;
};
type dataType = config & {
	params?: any;
};
// // 为 UniApp.Uni 扩展 $u 属性
interface Uni {
	$u: {
		http: {
			post: (url: string, params?: any, config?: config) => Promise;
			get: (url: string, data?: dataType) => Promise;
			[key: string]: any;
		};
		toast:(text: string) => void;
		[key: string]: any;
	};
}
declare function requirePlugin<T>(name:string): T
declare module '*'
