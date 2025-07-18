/**
 * 当前版本：v1.4.0
 * 使用描述：https://editor.swagger.io 代码生成 typescript-axios 辅组工具库
 * 依赖说明：适配 axios 版本：v0.21.4
 * 视频教程：https://www.bilibili.com/video/BV1EW4y1C71D
 */

import globalAxios, {AxiosInstance} from 'axios';
import {Configuration} from '../api-services';
import {BaseAPI, BASE_PATH} from '../api-services/base';
import {ElMessage} from 'element-plus';
import {Local, Session} from '../utils/storage';
import { sm2 } from 'sm-crypto-v2';
// import {sm2} from 'sm-crypto';
// import { SM4, SM3, SM2 } from 'gm-crypto';

// 接口服务器配置
export const serveConfig = new Configuration({
    basePath: window.__env__.VITE_API_URL,
});

// token 键定义
export const accessTokenKey = 'access-token';

export const accessTempTokenKey ='access-temp-token';
export const refreshAccessTokenKey = `x-${accessTokenKey}`;

// 获取 token
export const getToken = () => {
    return Local.get(accessTokenKey);
};
export const getHeader = () => {
    return { authorization: 'Bearer ' + getToken() };
};

// 清除 token
export const clearAccessAfterReload = () => {
	clearTokens();
	// 刷新浏览器
	window.location.reload();
};
export const getTempToken = () => {
    let t= Local.get(accessTempTokenKey);
    if(t!=null)return t;
    else{
        let g=generateGUID();
        // 缓存token
        Local.set(accessTempTokenKey, g);
        return g;
    }
};
const generateGUID = () => {
    return Date.now();
}
// 清除 token
export const clearAccessTokens = () => {
    clearTokens();

    // 刷新浏览器
    window.location.reload();
};

// 清除 token
export const clearTokens = () => {
    Local.remove(accessTokenKey);
    Local.remove(refreshAccessTokenKey);
    // Local.remove(accessTempTokenKey);
    Session.clear();
};

// axios 默认实例
export const axiosInstance: AxiosInstance = globalAxios;

// 这里可以配置 axios 更多选项 =========================================
axiosInstance.defaults.timeout = 1000 * 60 * 10; // 设置超时，默认 10 分钟

// axios 请求拦截
axiosInstance.interceptors.request.use(
	(conf) => {
		// 获取本地的 token或session中的token
		const accessToken = Local.get(accessTokenKey) ? Local.get(accessTokenKey) : Session.get('token');
		if (accessToken) {
			// 将 token 添加到请求报文头中
			conf.headers!['Authorization'] = `Bearer ${accessToken}`;

            // 判断 accessToken 是否过期
            const jwt: any = decryptJWT(accessToken);
            const exp = getJWTDate(jwt.exp as number);

            // token 已经过期
            if (new Date() >= exp) {
                // 获取刷新 token
                const refreshAccessToken = Local.get(refreshAccessTokenKey);

                // 携带刷新 token
                if (refreshAccessToken) {
                    conf.headers!['X-Authorization'] = `Bearer ${refreshAccessToken}`;
                }
            }
        }

        // 这里编写请求拦截代码 =========================================

        // 获取前端设置的语言
        const globalI18n = Local.get('themeConfig')?.globalI18n;
        if (globalI18n) {
            // 添加到请求报文头中
            conf.headers!['Accept-Language'] = globalI18n;
        }
        return conf;
    },
    (error) => {
        // 处理请求错误
        if (error.request) {
            ElMessage.error(error);
        }

        // 请求错误代码及自定义处理
        ElMessage.error(error);

        return Promise.reject(error);
    }
);

// axios 响应拦截
axiosInstance.interceptors.response.use(
    (r) => {
        let res = r;
        if(res.data.type!='application/octet-stream'&&window.__env__.VITE_ENV!='development'){
            const priveKey = window.__env__.VITE_SM_PRIVE_KEY;
            // if (window.__env__.VITE_ENV === 'development') { 
            //     const a = sm2.doDecrypt(r.data.substring(2), publicKey, 1);
            //     res.data = JSON.parse(a as any);
            // }
    
            const a = sm2.doDecrypt(r.data.substring(2), priveKey, 1);
            res.data = JSON.parse(a as any); 
        }
        
        // 获取状态码和返回数据
        var status = res.status;
        var serve = res.data;

        // 处理 401
        if (status === 401) {
            clearAccessTokens();
        }

        // 处理未进行规范化处理的
        if (status >= 400) {
            throw new Error(res.statusText || 'Request Error.');
        }

        // 处理规范化结果错误
        if (serve && serve.hasOwnProperty('errors') && serve.errors) {
            throw new Error(JSON.stringify(serve.errors || 'Request Error.'));
        }

        // 读取响应报文头 token 信息
        var accessToken = r.headers[accessTokenKey];
        var refreshAccessToken = r.headers[refreshAccessTokenKey];

        // 判断是否是无效 token
        if (accessToken === 'invalid_token') {
            clearAccessTokens();
        }
        // 判断是否存在刷新 token，如果存在则存储在本地
        else if (refreshAccessToken && accessToken && accessToken !== 'invalid_token') {
            Local.set(accessTokenKey, accessToken);
            Local.set(refreshAccessTokenKey, refreshAccessToken);
        }

        //console.log('serve',serve)
		// 响应拦截及自定义处理
		if (serve.code === 401) {
			clearAccessTokens();
		} else if (serve.code === undefined) {
			return Promise.resolve(res);
		} else if (serve.code !== 200) {
			var message;
			// 判断 serve.message 是否为对象
			if (serve.message && typeof serve.message == 'object') {
				message = JSON.stringify(serve.message);
			} else {
				message = serve.message;
			}
			// 用户自定义处理异常
			if (!res.config?.customCatch) {
				ElMessage.error(message);
			}
			throw new Error(message);
		}

        return res;
    },
    (error) => {

        console.log('error',error)
        // 处理响应错误
        if (error.response) {
            if (error.response.status === 401) {
                clearAccessTokens();
            }
        }

		// 用户自定义处理异常
		if (!error.config?.customCatch) {
			// 响应错误代码及自定义处理
			ElMessage.error(error);
		}

        return Promise.reject(error);
    }
);

/**
 * 包装 Promise 并返回 [Error, any]
 * @param promise Promise 方法
 * @param errorExt 自定义错误信息（拓展）
 * @returns [Error, any]
 */
export function feature<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((err: U) => {
            if (errorExt) {
                const parsedError = Object.assign({}, err, errorExt);
                return [parsedError, undefined];
            }

            return [err, undefined];
        });
}

/**
 * 获取/创建服务 API 实例
 * @param apiType BaseAPI 派生类型
 * @param configuration 服务器配置对象
 * @param basePath 服务器地址
 * @param axiosObject axios 实例
 * @returns 服务API 实例
 */
export function getAPI<T>(
	// eslint-disable-next-line no-unused-vars
	apiType: new (configuration?: Configuration, basePath?: string, axiosInstance?: AxiosInstance) => T,
	configuration: Configuration = serveConfig,
	basePath: string = BASE_PATH,
	axiosObject: AxiosInstance = axiosInstance
) {
    return new apiType(configuration, basePath, axiosObject);
}

/**
 * 解密 JWT token 的信息
 * @param token jwt token 字符串
 * @returns <any>object
 */
export function decryptJWT(token: string): any {
    token = token.replace(/_/g, '/').replace(/-/g, '+');
    var json = decodeURIComponent(escape(window.atob(token.split('.')[1])));
    return JSON.parse(json);
}

/**
 * 将 JWT 时间戳转换成 Date
 * @description 主要针对 `exp`，`iat`，`nbf`
 * @param timestamp 时间戳
 * @returns Date 对象
 */
export function getJWTDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
}

/**
 * 实现异步延迟
 * @param delay 延迟时间（毫秒）
 * @returns
 */
export function sleep(delay: number) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}
