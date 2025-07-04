/* tslint:disable */
/* eslint-disable */
/**
 * 病例管理
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
import { AdminResultXrayInspectDto } from '../../models/laboratory-manage/admin-result-xray-inspect-dto';
import { SaveXrayInspectInput } from '../../models/laboratory-manage/save-xray-inspect-input';
/**
 * XrayInspectApi - axios parameter creator
 * @export
 */
export const XrayInspectApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 获取摄影检查检查项目结果
         * @param {number} cEMRecordTestItemId 检验项目明细表id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiXrayInspectByRecordTestItemIdCEMRecordTestItemIdGet: async (cEMRecordTestItemId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'cEMRecordTestItemId' is not null or undefined
            if (cEMRecordTestItemId === null || cEMRecordTestItemId === undefined) {
                throw new RequiredError('cEMRecordTestItemId','Required parameter cEMRecordTestItemId was null or undefined when calling apiXrayInspectByRecordTestItemIdCEMRecordTestItemIdGet.');
            }
            const localVarPath = `/api/xrayInspect/by-RecordTestItemId/{cEMRecordTestItemId}`
                .replace(`{${"cEMRecordTestItemId"}}`, encodeURIComponent(String(cEMRecordTestItemId)));
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
         * @summary 保存摄影检查检查项目结果
         * @param {SaveXrayInspectInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiXrayInspectSavePost: async (body?: SaveXrayInspectInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/xrayInspect/save`;
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
    }
};

/**
 * XrayInspectApi - functional programming interface
 * @export
 */
export const XrayInspectApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 获取摄影检查检查项目结果
         * @param {number} cEMRecordTestItemId 检验项目明细表id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiXrayInspectByRecordTestItemIdCEMRecordTestItemIdGet(cEMRecordTestItemId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultXrayInspectDto>>> {
            const localVarAxiosArgs = await XrayInspectApiAxiosParamCreator(configuration).apiXrayInspectByRecordTestItemIdCEMRecordTestItemIdGet(cEMRecordTestItemId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 保存摄影检查检查项目结果
         * @param {SaveXrayInspectInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiXrayInspectSavePost(body?: SaveXrayInspectInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await XrayInspectApiAxiosParamCreator(configuration).apiXrayInspectSavePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * XrayInspectApi - factory interface
 * @export
 */
export const XrayInspectApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 获取摄影检查检查项目结果
         * @param {number} cEMRecordTestItemId 检验项目明细表id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiXrayInspectByRecordTestItemIdCEMRecordTestItemIdGet(cEMRecordTestItemId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultXrayInspectDto>> {
            return XrayInspectApiFp(configuration).apiXrayInspectByRecordTestItemIdCEMRecordTestItemIdGet(cEMRecordTestItemId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 保存摄影检查检查项目结果
         * @param {SaveXrayInspectInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiXrayInspectSavePost(body?: SaveXrayInspectInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return XrayInspectApiFp(configuration).apiXrayInspectSavePost(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * XrayInspectApi - object-oriented interface
 * @export
 * @class XrayInspectApi
 * @extends {BaseAPI}
 */
export class XrayInspectApi extends BaseAPI {
    /**
     * 
     * @summary 获取摄影检查检查项目结果
     * @param {number} cEMRecordTestItemId 检验项目明细表id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof XrayInspectApi
     */
    public async apiXrayInspectByRecordTestItemIdCEMRecordTestItemIdGet(cEMRecordTestItemId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultXrayInspectDto>> {
        return XrayInspectApiFp(this.configuration).apiXrayInspectByRecordTestItemIdCEMRecordTestItemIdGet(cEMRecordTestItemId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 保存摄影检查检查项目结果
     * @param {SaveXrayInspectInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof XrayInspectApi
     */
    public async apiXrayInspectSavePost(body?: SaveXrayInspectInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return XrayInspectApiFp(this.configuration).apiXrayInspectSavePost(body, options).then((request) => request(this.axios, this.basePath));
    }
}
