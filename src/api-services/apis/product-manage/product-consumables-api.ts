/* tslint:disable */
/* eslint-disable */
/**
 * 消耗品和化验
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
import { AddProductConsumablesInput,IdInput } from '../../models/product-manage';
import { AdminResultObject } from '../../models/product-manage';
import { AdminResultProductDrugs } from '../../models/product-manage';
import { DeleteProductConsumablesInput } from '../../models/product-manage';
import { ProductConsumablesInput } from '../../models/product-manage';
import { QueryeProductConsumablesInput } from '../../models/product-manage';
import { UpdateProductConsumablesInput } from '../../models/product-manage';
/**
 * ProductConsumablesApi - axios parameter creator
 * @export
 */
export const ProductConsumablesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加产品
         * @param {AddProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductConsumablesAddPost: async (body?: AddProductConsumablesInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productConsumables/add`;
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
         * @summary 按照目录或者名称查询消耗品
         * @param {ProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductConsumablesConsumablesListPost: async (body?: ProductConsumablesInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productConsumables/consumablesList`;
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
         * @summary 删除产品
         * @param {DeleteProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductConsumablesDeletePost: async (body?: DeleteProductConsumablesInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productConsumables/delete`;
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
         * @summary 获取产品
         * @param {QueryeProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductConsumablesDetailPost: async (body?: QueryeProductConsumablesInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productConsumables/detail`;
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
         * @summary 更新产品
         * @param {UpdateProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductConsumablesEditPut: async (body?: UpdateProductConsumablesInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productConsumables/edit`;
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
         * @summary 获取产品列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductConsumablesListPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productConsumables/list`;
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
         * @summary 分页查询产品
         * @param {ProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductConsumablesPagePost: async (body?: ProductConsumablesInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productConsumables/page`;
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
         * @summary 批量删除产品
         * @param {IdInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductConsumablesDeleteByIdsDelete: async (body?: IdInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/productConsumables/delete-by-ids`;
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
 * ProductConsumablesApi - functional programming interface
 * @export
 */
export const ProductConsumablesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加产品
         * @param {AddProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesAddPost(body?: AddProductConsumablesInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductConsumablesApiAxiosParamCreator(configuration).apiProductConsumablesAddPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 按照目录或者名称查询消耗品
         * @param {ProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesConsumablesListPost(body?: ProductConsumablesInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await ProductConsumablesApiAxiosParamCreator(configuration).apiProductConsumablesConsumablesListPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除产品
         * @param {DeleteProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesDeletePost(body?: DeleteProductConsumablesInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductConsumablesApiAxiosParamCreator(configuration).apiProductConsumablesDeletePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取产品
         * @param {QueryeProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesDetailPost(body?: QueryeProductConsumablesInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultProductDrugs>>> {
            const localVarAxiosArgs = await ProductConsumablesApiAxiosParamCreator(configuration).apiProductConsumablesDetailPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新产品
         * @param {UpdateProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesEditPut(body?: UpdateProductConsumablesInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductConsumablesApiAxiosParamCreator(configuration).apiProductConsumablesEditPut(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取产品列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesListPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await ProductConsumablesApiAxiosParamCreator(configuration).apiProductConsumablesListPost(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 分页查询产品
         * @param {ProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesPagePost(body?: ProductConsumablesInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await ProductConsumablesApiAxiosParamCreator(configuration).apiProductConsumablesPagePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        
        /**
         *
         * @summary 批量删除产品
         * @param {IdInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesDeleteByIdsDelete(body?: IdInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ProductConsumablesApiAxiosParamCreator(configuration).apiProductConsumablesDeleteByIdsDelete(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ProductConsumablesApi - factory interface
 * @export
 */
export const ProductConsumablesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 增加产品
         * @param {AddProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesAddPost(body?: AddProductConsumablesInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductConsumablesApiFp(configuration).apiProductConsumablesAddPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 按照目录或者名称查询消耗品
         * @param {ProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesConsumablesListPost(body?: ProductConsumablesInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return ProductConsumablesApiFp(configuration).apiProductConsumablesConsumablesListPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除产品
         * @param {DeleteProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesDeletePost(body?: DeleteProductConsumablesInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductConsumablesApiFp(configuration).apiProductConsumablesDeletePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取产品
         * @param {QueryeProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesDetailPost(body?: QueryeProductConsumablesInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultProductDrugs>> {
            return ProductConsumablesApiFp(configuration).apiProductConsumablesDetailPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新产品
         * @param {UpdateProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesEditPut(body?: UpdateProductConsumablesInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductConsumablesApiFp(configuration).apiProductConsumablesEditPut(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取产品列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesListPost(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return ProductConsumablesApiFp(configuration).apiProductConsumablesListPost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 分页查询产品
         * @param {ProductConsumablesInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesPagePost(body?: ProductConsumablesInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return ProductConsumablesApiFp(configuration).apiProductConsumablesPagePost(body, options).then((request) => request(axios, basePath));
        },
        
        /**
         *
         * @summary 批量删除产品
         * @param {IdInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductConsumablesDeleteByIdsDelete(body?: IdInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ProductConsumablesApiFp(configuration).apiProductConsumablesDeleteByIdsDelete(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ProductConsumablesApi - object-oriented interface
 * @export
 * @class ProductConsumablesApi
 * @extends {BaseAPI}
 */
export class ProductConsumablesApi extends BaseAPI {
    /**
     * 
     * @summary 增加产品
     * @param {AddProductConsumablesInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductConsumablesApi
     */
    public async apiProductConsumablesAddPost(body?: AddProductConsumablesInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductConsumablesApiFp(this.configuration).apiProductConsumablesAddPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 按照目录或者名称查询消耗品
     * @param {ProductConsumablesInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductConsumablesApi
     */
    public async apiProductConsumablesConsumablesListPost(body?: ProductConsumablesInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return ProductConsumablesApiFp(this.configuration).apiProductConsumablesConsumablesListPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除产品
     * @param {DeleteProductConsumablesInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductConsumablesApi
     */
    public async apiProductConsumablesDeletePost(body?: DeleteProductConsumablesInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductConsumablesApiFp(this.configuration).apiProductConsumablesDeletePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取产品
     * @param {QueryeProductConsumablesInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductConsumablesApi
     */
    public async apiProductConsumablesDetailPost(body?: QueryeProductConsumablesInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultProductDrugs>> {
        return ProductConsumablesApiFp(this.configuration).apiProductConsumablesDetailPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新产品
     * @param {UpdateProductConsumablesInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductConsumablesApi
     */
    public async apiProductConsumablesEditPut(body?: UpdateProductConsumablesInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductConsumablesApiFp(this.configuration).apiProductConsumablesEditPut(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取产品列表
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductConsumablesApi
     */
    public async apiProductConsumablesListPost(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return ProductConsumablesApiFp(this.configuration).apiProductConsumablesListPost(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 分页查询产品
     * @param {ProductConsumablesInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductConsumablesApi
     */
    public async apiProductConsumablesPagePost(body?: ProductConsumablesInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return ProductConsumablesApiFp(this.configuration).apiProductConsumablesPagePost(body, options).then((request) => request(this.axios, this.basePath));
    }
     /**
     *
     * @summary 批量删除产品
     * @param {IdInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductConsumablesApi
     */
     public async apiProductConsumablesDeleteByIdsDelete(body?: IdInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ProductConsumablesApiFp(this.configuration).apiProductConsumablesDeleteByIdsDelete(body, options).then((request) => request(this.axios, this.basePath));
    }
}
