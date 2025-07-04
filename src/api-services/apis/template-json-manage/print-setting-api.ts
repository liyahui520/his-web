/* tslint:disable */
/* eslint-disable */
/**
 * 病例相关打印
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../../base';
import { AdminResultSysOnlinePrint } from '../../models/template-json-manage';
import { SysPrintSettingConfig } from '../../models/template-json-manage';
import { AdminResultObject } from '../../models/template-json-manage/admin-result-object';
/**
 * PrintSettingApi - axios parameter creator
 * @export
 */
export const PrintSettingApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 获取当前打印机配置
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPrintSettingConfigGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/get-print-setting-config`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 删除打印机配置
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        idDeletePrintSettingDelete: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling idDeletePrintSettingDelete.');
            }
            const localVarPath = `/{id}/delete-print-setting`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 修改打印机配置
         * @param {number} id 
         * @param {SysPrintSettingConfig} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        idEditPrintSettingPut: async (id: number, body?: SysPrintSettingConfig, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling idEditPrintSettingPut.');
            }
            const localVarPath = `/{id}/edit-print-setting`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 添加打印机配置
         * @param {number} printId 
         * @param {Array<SysPrintSettingConfig>} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        printIdAddPrintSettingPost: async (printId: number, body?: Array<SysPrintSettingConfig>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'printId' is not null or undefined
            if (printId === null || printId === undefined) {
                throw new RequiredError('printId','Required parameter printId was null or undefined when calling printIdAddPrintSettingPost.');
            }
            const localVarPath = `/{printId}/add-print-setting`
                .replace(`{${"printId"}}`, encodeURIComponent(String(printId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 获取远程打印机连接Id
         * @param {string} sernumberNo 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sernumberNoGetPrintConnectionIdGet: async (sernumberNo: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'sernumberNo' is not null or undefined
            if (sernumberNo === null || sernumberNo === undefined) {
                throw new RequiredError('sernumberNo','Required parameter sernumberNo was null or undefined when calling sernumberNoGetPrintConnectionIdGet.');
            }
            const localVarPath = `/{sernumberNo}/get-print-connectionId`
                .replace(`{${"sernumberNo"}}`, encodeURIComponent(String(sernumberNo)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PrintSettingApi - functional programming interface
 * @export
 */
export const PrintSettingApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 获取当前打印机配置
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPrintSettingConfigGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await PrintSettingApiAxiosParamCreator(configuration).getPrintSettingConfigGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除打印机配置
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async idDeletePrintSettingDelete(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await PrintSettingApiAxiosParamCreator(configuration).idDeletePrintSettingDelete(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 修改打印机配置
         * @param {number} id 
         * @param {SysPrintSettingConfig} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async idEditPrintSettingPut(id: number, body?: SysPrintSettingConfig, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await PrintSettingApiAxiosParamCreator(configuration).idEditPrintSettingPut(id, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 添加打印机配置
         * @param {number} printId 
         * @param {Array<SysPrintSettingConfig>} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async printIdAddPrintSettingPost(printId: number, body?: Array<SysPrintSettingConfig>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await PrintSettingApiAxiosParamCreator(configuration).printIdAddPrintSettingPost(printId, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取远程打印机连接Id
         * @param {string} sernumberNo 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sernumberNoGetPrintConnectionIdGet(sernumberNo: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultSysOnlinePrint>>> {
            const localVarAxiosArgs = await PrintSettingApiAxiosParamCreator(configuration).sernumberNoGetPrintConnectionIdGet(sernumberNo, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PrintSettingApi - factory interface
 * @export
 */
export const PrintSettingApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 获取当前打印机配置
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPrintSettingConfigGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return PrintSettingApiFp(configuration).getPrintSettingConfigGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除打印机配置
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async idDeletePrintSettingDelete(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return PrintSettingApiFp(configuration).idDeletePrintSettingDelete(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 修改打印机配置
         * @param {number} id 
         * @param {SysPrintSettingConfig} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async idEditPrintSettingPut(id: number, body?: SysPrintSettingConfig, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return PrintSettingApiFp(configuration).idEditPrintSettingPut(id, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 添加打印机配置
         * @param {number} printId 
         * @param {Array<SysPrintSettingConfig>} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async printIdAddPrintSettingPost(printId: number, body?: Array<SysPrintSettingConfig>, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return PrintSettingApiFp(configuration).printIdAddPrintSettingPost(printId, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取远程打印机连接Id
         * @param {string} sernumberNo 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sernumberNoGetPrintConnectionIdGet(sernumberNo: string, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultSysOnlinePrint>> {
            return PrintSettingApiFp(configuration).sernumberNoGetPrintConnectionIdGet(sernumberNo, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PrintSettingApi - object-oriented interface
 * @export
 * @class PrintSettingApi
 * @extends {BaseAPI}
 */
export class PrintSettingApi extends BaseAPI {
    /**
     * 
     * @summary 获取当前打印机配置
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PrintSettingApi
     */
    public async getPrintSettingConfigGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return PrintSettingApiFp(this.configuration).getPrintSettingConfigGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除打印机配置
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PrintSettingApi
     */
    public async idDeletePrintSettingDelete(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return PrintSettingApiFp(this.configuration).idDeletePrintSettingDelete(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 修改打印机配置
     * @param {number} id 
     * @param {SysPrintSettingConfig} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PrintSettingApi
     */
    public async idEditPrintSettingPut(id: number, body?: SysPrintSettingConfig, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return PrintSettingApiFp(this.configuration).idEditPrintSettingPut(id, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 添加打印机配置
     * @param {number} printId 
     * @param {Array<SysPrintSettingConfig>} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PrintSettingApi
     */
    public async printIdAddPrintSettingPost(printId: number, body?: Array<SysPrintSettingConfig>, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return PrintSettingApiFp(this.configuration).printIdAddPrintSettingPost(printId, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取远程打印机连接Id
     * @param {string} sernumberNo 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PrintSettingApi
     */
    public async sernumberNoGetPrintConnectionIdGet(sernumberNo: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultSysOnlinePrint>> {
        return PrintSettingApiFp(this.configuration).sernumberNoGetPrintConnectionIdGet(sernumberNo, options).then((request) => request(this.axios, this.basePath));
    }
}
