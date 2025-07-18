/* tslint:disable */
/* eslint-disable */
/**
 * 病例管理
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
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
import { AdminResultListPhysicalItems } from '../../models/cemrecord-manage';
import { PhysicalItemDto } from '../../models/cemrecord-manage';
import { UpdatePhysicalItemDto } from '../../models/cemrecord-manage';
/**
 * PhysicalItemsApi - axios parameter creator
 * @export
 */
export const PhysicalItemsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 新增检查项目
         * @param {PhysicalItemDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPhysicalItemsAddPost: async (body?: PhysicalItemDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/physicalItems/add`;
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
            // @ts-ignore
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 修改检查项目
         * @param {UpdatePhysicalItemDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPhysicalExamDetailPut: async (body?: UpdatePhysicalItemDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/cEMRecord/physical-exam-detail`;
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
            // @ts-ignore
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 获取体格检查项目
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPhysicalExamDetailGet: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/cEMRecord/physical-exam-detail?recordId=${id}`
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
         * @summary 删除检查项目
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPhysicalItemsIdDeleteDelete: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiPhysicalItemsIdDeleteDelete.');
            }
            const localVarPath = `/api/physicalItems/{id}/delete`
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
    }
};

/**
 * PhysicalItemsApi - functional programming interface
 * @export
 */
export const PhysicalItemsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 新增检查项目
         * @param {PhysicalItemDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPhysicalItemsAddPost(body?: PhysicalItemDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await PhysicalItemsApiAxiosParamCreator(configuration).apiPhysicalItemsAddPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 修改检查项目
         * @param {UpdatePhysicalItemDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPhysicalExamDetailPut(body?: UpdatePhysicalItemDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await PhysicalItemsApiAxiosParamCreator(configuration).apiPhysicalExamDetailPut(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取体格检查项目
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPhysicalExamDetailGet(id:number,options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListPhysicalItems>>> {
            const localVarAxiosArgs = await PhysicalItemsApiAxiosParamCreator(configuration).apiPhysicalExamDetailGet(id,options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除检查项目
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPhysicalItemsIdDeleteDelete(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await PhysicalItemsApiAxiosParamCreator(configuration).apiPhysicalItemsIdDeleteDelete(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PhysicalItemsApi - factory interface
 * @export
 */
export const PhysicalItemsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 新增检查项目
         * @param {PhysicalItemDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPhysicalItemsAddPost(body?: PhysicalItemDto, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return PhysicalItemsApiFp(configuration).apiPhysicalItemsAddPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 修改检查项目
         * @param {UpdatePhysicalItemDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPhysicalExamDetailPut(body?: UpdatePhysicalItemDto, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return PhysicalItemsApiFp(configuration).apiPhysicalExamDetailPut(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取体格检查项目
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPhysicalExamDetailGet(id: number,options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListPhysicalItems>> {
            return PhysicalItemsApiFp(configuration).apiPhysicalExamDetailGet(id,options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除检查项目
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPhysicalItemsIdDeleteDelete(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return PhysicalItemsApiFp(configuration).apiPhysicalItemsIdDeleteDelete(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PhysicalItemsApi - object-oriented interface
 * @export
 * @class PhysicalItemsApi
 * @extends {BaseAPI}
 */
export class PhysicalItemsApi extends BaseAPI {
    /**
     * 
     * @summary 新增检查项目
     * @param {PhysicalItemDto} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PhysicalItemsApi
     */
    public async apiPhysicalItemsAddPost(body?: PhysicalItemDto, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return PhysicalItemsApiFp(this.configuration).apiPhysicalItemsAddPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 修改检查项目
     * @param {UpdatePhysicalItemDto} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PhysicalItemsApi
     */
    public async apiPhysicalExamDetailPut(body?: UpdatePhysicalItemDto, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return PhysicalItemsApiFp(this.configuration).apiPhysicalExamDetailPut(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取体格检查项目
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PhysicalItemsApi
     */
    public async apiPhysicalExamDetailGet(id:number,options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListPhysicalItems>> {
        return PhysicalItemsApiFp(this.configuration).apiPhysicalExamDetailGet(id,options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除检查项目
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PhysicalItemsApi
     */
    public async apiPhysicalItemsIdDeleteDelete(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return PhysicalItemsApiFp(this.configuration).apiPhysicalItemsIdDeleteDelete(id, options).then((request) => request(this.axios, this.basePath));
    }
}
