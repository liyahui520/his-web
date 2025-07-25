/* tslint:disable */
/* eslint-disable */
/**
 * 订单汇总
 * <br/><u><b><font color='FF0000'> 👮不得利用本项目从事危害国家安全、扰乱社会秩序、侵犯他人合法权益等法律法规禁止的活动！任何基于本项目二次开发而产生的一切法律纠纷和责任，我们不承担任何责任！</font></b></u>
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
import { AdminResultDecimal } from '../../models/order-summary-manage';
import { AdminResultInt32 } from '../../models/order-summary-manage';
import { AdminResultListLastFittenDaysPayOutput,CalendarListInput,AdminResultListCalendarListOutput } from '../../models/order-summary-manage';
/**
 * OrderSummaryApi - axios parameter creator
 * @export
 */
export const OrderSummaryApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 获取指定日期待办事项
         * @param {CalendarListInput} [body] 请求参数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderSummaryGetCalendarListPost: async (body?: CalendarListInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/orderSummary/get-calendar-list`;
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
         * @summary 获取近15日收款金额
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderSummaryLastFittenPayGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/orderSummary/last-fitten-pay`;
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
         * @summary 获取今日住院客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderSummaryTodayInHospitalGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/orderSummary/today-in-hospital`;
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
         * @summary 获取今日登记客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderSummaryTodayNewCustomerGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/orderSummary/today-new-customer`;
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
         * @summary 获取今日订单实收金额
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderSummaryTodayPayGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/orderSummary/today-pay`;
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
         * @summary 获取今日挂号客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderSummaryTodayRegistrationGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/orderSummary/today-registration`;
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
         * @summary 获取今日回访客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderSummaryTodayReturnCustomerGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/orderSummary/today-return-customer`;
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
         * @summary 获取系统未收款总金额
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderSummaryTodayUnPayGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/orderSummary/today-un-pay`;
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
 * OrderSummaryApi - functional programming interface
 * @export
 */
export const OrderSummaryApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 获取指定日期待办事项
         * @param {CalendarListInput} [body] 请求参数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryGetCalendarListPost(body?: CalendarListInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListCalendarListOutput>>> {
            const localVarAxiosArgs = await OrderSummaryApiAxiosParamCreator(configuration).apiOrderSummaryGetCalendarListPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取近15日收款金额
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryLastFittenPayGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListLastFittenDaysPayOutput>>> {
            const localVarAxiosArgs = await OrderSummaryApiAxiosParamCreator(configuration).apiOrderSummaryLastFittenPayGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取今日住院客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayInHospitalGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultInt32>>> {
            const localVarAxiosArgs = await OrderSummaryApiAxiosParamCreator(configuration).apiOrderSummaryTodayInHospitalGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取今日登记客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayNewCustomerGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultInt32>>> {
            const localVarAxiosArgs = await OrderSummaryApiAxiosParamCreator(configuration).apiOrderSummaryTodayNewCustomerGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取今日订单实收金额
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayPayGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultDecimal>>> {
            const localVarAxiosArgs = await OrderSummaryApiAxiosParamCreator(configuration).apiOrderSummaryTodayPayGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取今日挂号客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayRegistrationGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultInt32>>> {
            const localVarAxiosArgs = await OrderSummaryApiAxiosParamCreator(configuration).apiOrderSummaryTodayRegistrationGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取今日回访客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayReturnCustomerGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultInt32>>> {
            const localVarAxiosArgs = await OrderSummaryApiAxiosParamCreator(configuration).apiOrderSummaryTodayReturnCustomerGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取系统未收款总金额
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayUnPayGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultDecimal>>> {
            const localVarAxiosArgs = await OrderSummaryApiAxiosParamCreator(configuration).apiOrderSummaryTodayUnPayGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * OrderSummaryApi - factory interface
 * @export
 */
export const OrderSummaryApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 获取指定日期待办事项
         * @param {CalendarListInput} [body] 请求参数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryGetCalendarListPost(body?: CalendarListInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListCalendarListOutput>> {
            return OrderSummaryApiFp(configuration).apiOrderSummaryGetCalendarListPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取近15日收款金额
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryLastFittenPayGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListLastFittenDaysPayOutput>> {
            return OrderSummaryApiFp(configuration).apiOrderSummaryLastFittenPayGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取今日住院客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayInHospitalGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultInt32>> {
            return OrderSummaryApiFp(configuration).apiOrderSummaryTodayInHospitalGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取今日登记客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayNewCustomerGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultInt32>> {
            return OrderSummaryApiFp(configuration).apiOrderSummaryTodayNewCustomerGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取今日订单实收金额
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayPayGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultDecimal>> {
            return OrderSummaryApiFp(configuration).apiOrderSummaryTodayPayGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取今日挂号客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayRegistrationGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultInt32>> {
            return OrderSummaryApiFp(configuration).apiOrderSummaryTodayRegistrationGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取今日回访客户数
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayReturnCustomerGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultInt32>> {
            return OrderSummaryApiFp(configuration).apiOrderSummaryTodayReturnCustomerGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取系统未收款总金额
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiOrderSummaryTodayUnPayGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultDecimal>> {
            return OrderSummaryApiFp(configuration).apiOrderSummaryTodayUnPayGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * OrderSummaryApi - object-oriented interface
 * @export
 * @class OrderSummaryApi
 * @extends {BaseAPI}
 */
export class OrderSummaryApi extends BaseAPI {
    /**
     * 
     * @summary 获取指定日期待办事项
     * @param {CalendarListInput} [body] 请求参数
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderSummaryApi
     */
    public async apiOrderSummaryGetCalendarListPost(body?: CalendarListInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListCalendarListOutput>> {
        return OrderSummaryApiFp(this.configuration).apiOrderSummaryGetCalendarListPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取近15日收款金额
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderSummaryApi
     */
    public async apiOrderSummaryLastFittenPayGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListLastFittenDaysPayOutput>> {
        return OrderSummaryApiFp(this.configuration).apiOrderSummaryLastFittenPayGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取今日住院客户数
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderSummaryApi
     */
    public async apiOrderSummaryTodayInHospitalGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultInt32>> {
        return OrderSummaryApiFp(this.configuration).apiOrderSummaryTodayInHospitalGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取今日登记客户数
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderSummaryApi
     */
    public async apiOrderSummaryTodayNewCustomerGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultInt32>> {
        return OrderSummaryApiFp(this.configuration).apiOrderSummaryTodayNewCustomerGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取今日订单实收金额
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderSummaryApi
     */
    public async apiOrderSummaryTodayPayGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultDecimal>> {
        return OrderSummaryApiFp(this.configuration).apiOrderSummaryTodayPayGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取今日挂号客户数
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderSummaryApi
     */
    public async apiOrderSummaryTodayRegistrationGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultInt32>> {
        return OrderSummaryApiFp(this.configuration).apiOrderSummaryTodayRegistrationGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取今日回访客户数
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderSummaryApi
     */
    public async apiOrderSummaryTodayReturnCustomerGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultInt32>> {
        return OrderSummaryApiFp(this.configuration).apiOrderSummaryTodayReturnCustomerGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取系统未收款总金额
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderSummaryApi
     */
    public async apiOrderSummaryTodayUnPayGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultDecimal>> {
        return OrderSummaryApiFp(this.configuration).apiOrderSummaryTodayUnPayGet(options).then((request) => request(this.axios, this.basePath));
    }
}
