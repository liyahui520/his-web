/* tslint:disable */
/* eslint-disable */
/**
 * 产品管理
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * Contact: liyahui360@163.com
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
import { AddProductWashsInput,IdInput } from '../../models/product-manage';
import { AdminResultObject } from '../../models/product-manage';
import { AdminResultProductWashs } from '../../models/product-manage';
import { DeleteProductWashsInput } from '../../models/product-manage';
import { UpdateProductWashsInput } from '../../models/product-manage';
/**
 * ProductWashsApi - axios parameter creator
 * @export
 */
export const ProductWashsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加洗澡
         * @param {AddProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductWashsAddPost: async (body?: AddProductWashsInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productWashs/add`;
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
         * @summary 删除洗澡
         * @param {DeleteProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductWashsDeleteDelete: async (body?: DeleteProductWashsInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productWashs/delete`;
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
         * @summary 获取洗澡
         * @param {number} id 主键Id
         * @param {Date} [createTime] 创建时间
         * @param {Date} [updateTime] 更新时间
         * @param {number} [createUserId] 创建者Id
         * @param {number} [updateUserId] 修改者Id
         * @param {boolean} [isDelete] 软删除
         * @param {string} [ver] 版本标识
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductWashsDetailGet: async (id: number, createTime?: Date, updateTime?: Date, createUserId?: number, updateUserId?: number, isDelete?: boolean, ver?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiProductWashsDetailGet.');
            }
            const localVarPath = `/api/productWashs/detail`;
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

            if (id !== undefined) {
                localVarQueryParameter['Id'] = id;
            }

            if (createTime !== undefined) {
                localVarQueryParameter['CreateTime'] = (createTime as any instanceof Date) ?
                    (createTime as any).toISOString() :
                    createTime;
            }

            if (updateTime !== undefined) {
                localVarQueryParameter['UpdateTime'] = (updateTime as any instanceof Date) ?
                    (updateTime as any).toISOString() :
                    updateTime;
            }

            if (createUserId !== undefined) {
                localVarQueryParameter['CreateUserId'] = createUserId;
            }

            if (updateUserId !== undefined) {
                localVarQueryParameter['UpdateUserId'] = updateUserId;
            }

            if (isDelete !== undefined) {
                localVarQueryParameter['IsDelete'] = isDelete;
            }

            if (ver !== undefined) {
                localVarQueryParameter['Ver'] = ver;
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
         * @summary 更新洗澡
         * @param {UpdateProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductWashsEditPut: async (body?: UpdateProductWashsInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productWashs/edit`;
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
         * @summary 获取洗澡列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductWashsListPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productWashs/list`;
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
         * @summary 分页查询洗澡
         * @param {AddProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductWashsPagePost: async (body?: AddProductWashsInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productWashs/page`;
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
         * @summary 批量删除洗澡
         * @param {IdInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductWashsDeleteByIdsDelete: async (body?: IdInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productWashs/delete-by-ids`;
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
 * ProductWashsApi - functional programming interface
 * @export
 */
export const ProductWashsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加洗澡
         * @param {AddProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsAddPost(body?: AddProductWashsInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductWashsApiAxiosParamCreator(configuration).apiProductWashsAddPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除洗澡
         * @param {DeleteProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsDeleteDelete(body?: DeleteProductWashsInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductWashsApiAxiosParamCreator(configuration).apiProductWashsDeleteDelete(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取洗澡
         * @param {number} id 主键Id
         * @param {Date} [createTime] 创建时间
         * @param {Date} [updateTime] 更新时间
         * @param {number} [createUserId] 创建者Id
         * @param {number} [updateUserId] 修改者Id
         * @param {boolean} [isDelete] 软删除
         * @param {string} [ver] 版本标识
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsDetailGet(id: number, createTime?: Date, updateTime?: Date, createUserId?: number, updateUserId?: number, isDelete?: boolean, ver?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultProductWashs>>> {
            const localVarAxiosArgs = await ProductWashsApiAxiosParamCreator(configuration).apiProductWashsDetailGet(id, createTime, updateTime, createUserId, updateUserId, isDelete, ver, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新洗澡
         * @param {UpdateProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsEditPut(body?: UpdateProductWashsInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductWashsApiAxiosParamCreator(configuration).apiProductWashsEditPut(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取洗澡列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsListPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await ProductWashsApiAxiosParamCreator(configuration).apiProductWashsListPost(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 分页查询洗澡
         * @param {AddProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsPagePost(body?: AddProductWashsInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await ProductWashsApiAxiosParamCreator(configuration).apiProductWashsPagePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 批量删除洗澡
         * @param {IdInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsDeleteByIdsDelete(body?: IdInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductWashsApiAxiosParamCreator(configuration).apiProductWashsDeleteByIdsDelete(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ProductWashsApi - factory interface
 * @export
 */
export const ProductWashsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 增加洗澡
         * @param {AddProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsAddPost(body?: AddProductWashsInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductWashsApiFp(configuration).apiProductWashsAddPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除洗澡
         * @param {DeleteProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsDeleteDelete(body?: DeleteProductWashsInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductWashsApiFp(configuration).apiProductWashsDeleteDelete(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取洗澡
         * @param {number} id 主键Id
         * @param {Date} [createTime] 创建时间
         * @param {Date} [updateTime] 更新时间
         * @param {number} [createUserId] 创建者Id
         * @param {number} [updateUserId] 修改者Id
         * @param {boolean} [isDelete] 软删除
         * @param {string} [ver] 版本标识
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsDetailGet(id: number, createTime?: Date, updateTime?: Date, createUserId?: number, updateUserId?: number, isDelete?: boolean, ver?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultProductWashs>> {
            return ProductWashsApiFp(configuration).apiProductWashsDetailGet(id, createTime, updateTime, createUserId, updateUserId, isDelete, ver, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新洗澡
         * @param {UpdateProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsEditPut(body?: UpdateProductWashsInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductWashsApiFp(configuration).apiProductWashsEditPut(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取洗澡列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsListPost(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return ProductWashsApiFp(configuration).apiProductWashsListPost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 分页查询洗澡
         * @param {AddProductWashsInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsPagePost(body?: AddProductWashsInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return ProductWashsApiFp(configuration).apiProductWashsPagePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 批量删除洗澡
         * @param {IdInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductWashsDeleteByIdsDelete(body?: IdInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductWashsApiFp(configuration).apiProductWashsDeleteByIdsDelete(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ProductWashsApi - object-oriented interface
 * @export
 * @class ProductWashsApi
 * @extends {BaseAPI}
 */
export class ProductWashsApi extends BaseAPI {
    /**
     * 
     * @summary 增加洗澡
     * @param {AddProductWashsInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductWashsApi
     */
    public async apiProductWashsAddPost(body?: AddProductWashsInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductWashsApiFp(this.configuration).apiProductWashsAddPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除洗澡
     * @param {DeleteProductWashsInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductWashsApi
     */
    public async apiProductWashsDeleteDelete(body?: DeleteProductWashsInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductWashsApiFp(this.configuration).apiProductWashsDeleteDelete(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取洗澡
     * @param {number} id 主键Id
     * @param {Date} [createTime] 创建时间
     * @param {Date} [updateTime] 更新时间
     * @param {number} [createUserId] 创建者Id
     * @param {number} [updateUserId] 修改者Id
     * @param {boolean} [isDelete] 软删除
     * @param {string} [ver] 版本标识
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductWashsApi
     */
    public async apiProductWashsDetailGet(id: number, createTime?: Date, updateTime?: Date, createUserId?: number, updateUserId?: number, isDelete?: boolean, ver?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultProductWashs>> {
        return ProductWashsApiFp(this.configuration).apiProductWashsDetailGet(id, createTime, updateTime, createUserId, updateUserId, isDelete, ver, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新洗澡
     * @param {UpdateProductWashsInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductWashsApi
     */
    public async apiProductWashsEditPut(body?: UpdateProductWashsInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductWashsApiFp(this.configuration).apiProductWashsEditPut(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取洗澡列表
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductWashsApi
     */
    public async apiProductWashsListPost(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return ProductWashsApiFp(this.configuration).apiProductWashsListPost(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 分页查询洗澡
     * @param {AddProductWashsInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductWashsApi
     */
    public async apiProductWashsPagePost(body?: AddProductWashsInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return ProductWashsApiFp(this.configuration).apiProductWashsPagePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 批量删除洗澡
     * @param {IdInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductWashsApi
     */
    public async apiProductWashsDeleteByIdsDelete(body?: IdInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductWashsApiFp(this.configuration).apiProductWashsDeleteByIdsDelete(body, options).then((request) => request(this.axios, this.basePath));
    }
}
