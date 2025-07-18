import { IdInput } from './../../models/product-manage/id-input';
/* tslint:disable */
/* eslint-disable */
/**
 * 产品显微镜
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
import { AddProductMicroscopeInput,IdInput } from '../../models/product-manage';
import { AdminResultObject } from '../../models/product-manage';
import { AdminResultProductDrugs } from '../../models/product-manage';
import { DeleteProductMicroscopeInput } from '../../models/product-manage';
import { ProductMicroscopeInput } from '../../models/product-manage';
import { QueryeProductMicroscopeInput } from '../../models/product-manage';
import { UpdateProductMicroscopeInput } from '../../models/product-manage';
/**
 * ProductMicroscopeApi - axios parameter creator
 * @export
 */
export const ProductMicroscopeApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加显微镜
         * @param {AddProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductMicroscopeAddPost: async (body?: AddProductMicroscopeInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productMicroscope/add`;
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
         * @summary 删除显微镜
         * @param {DeleteProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductMicroscopeDeletePost: async (body?: DeleteProductMicroscopeInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productMicroscope/delete`;
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
         * @summary 获取显微镜
         * @param {QueryeProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductMicroscopeDetailPost: async (body?: QueryeProductMicroscopeInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productMicroscope/detail`;
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
         * @summary 更新显微镜
         * @param {UpdateProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductMicroscopeEditPut: async (body?: UpdateProductMicroscopeInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productMicroscope/edit`;
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
         * @summary 获取显微镜列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductMicroscopeListPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productMicroscope/list`;
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
         * @summary 分页查询显微镜
         * @param {ProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductMicroscopePagePost: async (body?: ProductMicroscopeInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productMicroscope/page`;
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
         * @summary 批量删除显微镜
         * @param {IdInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductMicroscopeDeleteByIdsDelete: async (body?: IdInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productMicroscope/delete-by-ids`;
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
 * ProductMicroscopeApi - functional programming interface
 * @export
 */
export const ProductMicroscopeApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加显微镜
         * @param {AddProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeAddPost(body?: AddProductMicroscopeInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductMicroscopeApiAxiosParamCreator(configuration).apiProductMicroscopeAddPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除显微镜
         * @param {DeleteProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeDeletePost(body?: DeleteProductMicroscopeInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductMicroscopeApiAxiosParamCreator(configuration).apiProductMicroscopeDeletePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取显微镜
         * @param {QueryeProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeDetailPost(body?: QueryeProductMicroscopeInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultProductDrugs>>> {
            const localVarAxiosArgs = await ProductMicroscopeApiAxiosParamCreator(configuration).apiProductMicroscopeDetailPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新显微镜
         * @param {UpdateProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeEditPut(body?: UpdateProductMicroscopeInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductMicroscopeApiAxiosParamCreator(configuration).apiProductMicroscopeEditPut(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取显微镜列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeListPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await ProductMicroscopeApiAxiosParamCreator(configuration).apiProductMicroscopeListPost(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 分页查询显微镜
         * @param {ProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopePagePost(body?: ProductMicroscopeInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await ProductMicroscopeApiAxiosParamCreator(configuration).apiProductMicroscopePagePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 批量删除显微镜
         * @param {IdInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeDeleteByIdsDelete(body?: IdInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductMicroscopeApiAxiosParamCreator(configuration).apiProductMicroscopeDeleteByIdsDelete(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ProductMicroscopeApi - factory interface
 * @export
 */
export const ProductMicroscopeApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 增加显微镜
         * @param {AddProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeAddPost(body?: AddProductMicroscopeInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductMicroscopeApiFp(configuration).apiProductMicroscopeAddPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除显微镜
         * @param {DeleteProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeDeletePost(body?: DeleteProductMicroscopeInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductMicroscopeApiFp(configuration).apiProductMicroscopeDeletePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取显微镜
         * @param {QueryeProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeDetailPost(body?: QueryeProductMicroscopeInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultProductDrugs>> {
            return ProductMicroscopeApiFp(configuration).apiProductMicroscopeDetailPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新显微镜
         * @param {UpdateProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeEditPut(body?: UpdateProductMicroscopeInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductMicroscopeApiFp(configuration).apiProductMicroscopeEditPut(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取显微镜列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeListPost(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return ProductMicroscopeApiFp(configuration).apiProductMicroscopeListPost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 分页查询显微镜
         * @param {ProductMicroscopeInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopePagePost(body?: ProductMicroscopeInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return ProductMicroscopeApiFp(configuration).apiProductMicroscopePagePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 批量删除显微镜
         * @param {IdInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductMicroscopeDeleteByIdsDelete(body?: IdInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductMicroscopeApiFp(configuration).apiProductMicroscopeDeleteByIdsDelete(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ProductMicroscopeApi - object-oriented interface
 * @export
 * @class ProductMicroscopeApi
 * @extends {BaseAPI}
 */
export class ProductMicroscopeApi extends BaseAPI {
    /**
     * 
     * @summary 增加显微镜
     * @param {AddProductMicroscopeInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductMicroscopeApi
     */
    public async apiProductMicroscopeAddPost(body?: AddProductMicroscopeInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductMicroscopeApiFp(this.configuration).apiProductMicroscopeAddPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除显微镜
     * @param {DeleteProductMicroscopeInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductMicroscopeApi
     */
    public async apiProductMicroscopeDeletePost(body?: DeleteProductMicroscopeInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductMicroscopeApiFp(this.configuration).apiProductMicroscopeDeletePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取显微镜
     * @param {QueryeProductMicroscopeInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductMicroscopeApi
     */
    public async apiProductMicroscopeDetailPost(body?: QueryeProductMicroscopeInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultProductDrugs>> {
        return ProductMicroscopeApiFp(this.configuration).apiProductMicroscopeDetailPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新显微镜
     * @param {UpdateProductMicroscopeInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductMicroscopeApi
     */
    public async apiProductMicroscopeEditPut(body?: UpdateProductMicroscopeInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductMicroscopeApiFp(this.configuration).apiProductMicroscopeEditPut(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取显微镜列表
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductMicroscopeApi
     */
    public async apiProductMicroscopeListPost(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return ProductMicroscopeApiFp(this.configuration).apiProductMicroscopeListPost(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 分页查询显微镜
     * @param {ProductMicroscopeInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductMicroscopeApi
     */
    public async apiProductMicroscopePagePost(body?: ProductMicroscopeInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return ProductMicroscopeApiFp(this.configuration).apiProductMicroscopePagePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 批量删除显微镜
     * @param {IdInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductMicroscopeApi
     */
    public async apiProductMicroscopeDeleteByIdsDelete(body?: IdInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductMicroscopeApiFp(this.configuration).apiProductMicroscopeDeleteByIdsDelete(body, options).then((request) => request(this.axios, this.basePath));
    }
}
