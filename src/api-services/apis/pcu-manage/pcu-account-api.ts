/* tslint:disable */
/* eslint-disable */
/**
 * 会员管理
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
import { AdminResultBoolean } from '../../models/pcu-manage';
import { AdminResultListPcuAccountDetails } from '../../models/pcu-manage';
import { AdminResultObject } from '../../models/pcu-manage';
import { AdminResultPcuAccount } from '../../models/pcu-manage';
import { PagePcuAccountDto } from '../../models/pcu-manage';
import { RechargeAccountDto } from '../../models/pcu-manage';
import { RefundAccountInput } from '../../models/pcu-manage';
/**
 * PcuAccountApi - axios parameter creator
 * @export
 */
export const PcuAccountApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary 根据顾客id明细信息
         * @param {number} customerId 顾客id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPcuAccountCustomerIdGetPcuAccountDetailGet: async (customerId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'customerId' is not null or undefined
            if (customerId === null || customerId === undefined) {
                throw new RequiredError('customerId','Required parameter customerId was null or undefined when calling apiPcuAccountCustomerIdGetPcuAccountDetailGet.');
            }
            const localVarPath = `/api/pcuAccount/{customerId}/get-pcu-account-detail`
                .replace(`{${"customerId"}}`, encodeURIComponent(String(customerId)));
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
         * @summary 根据顾客id获取账户信息
         * @param {number} customerId 顾客id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPcuAccountCustomerIdGetPcuAccountInfoGet: async (customerId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'customerId' is not null or undefined
            if (customerId === null || customerId === undefined) {
                throw new RequiredError('customerId','Required parameter customerId was null or undefined when calling apiPcuAccountCustomerIdGetPcuAccountInfoGet.');
            }
            const localVarPath = `/api/pcuAccount/{customerId}/get-pcu-account-info`
                .replace(`{${"customerId"}}`, encodeURIComponent(String(customerId)));
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
         * @summary 分页查询账户明细
         * @param {PagePcuAccountDto} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPcuAccountPagePost: async (body?: PagePcuAccountDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/pcuAccount/page`;
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
         * @summary 充值方法
         * @param {RechargeAccountDto} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPcuAccountRechargeAccountPost: async (body?: RechargeAccountDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/pcuAccount/recharge-account`;
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
         * @summary 账户退款
         * @param {RefundAccountInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPcuAccountRefundAccountPost: async (body?: RefundAccountInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/pcuAccount/refund-account`;
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
 * PcuAccountApi - functional programming interface
 * @export
 */
export const PcuAccountApiFp = function(configuration?: Configuration) {
    return {
        /**
         *
         * @summary 根据顾客id明细信息
         * @param {number} customerId 顾客id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPcuAccountCustomerIdGetPcuAccountDetailGet(customerId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListPcuAccountDetails>>> {
            const localVarAxiosArgs = await PcuAccountApiAxiosParamCreator(configuration).apiPcuAccountCustomerIdGetPcuAccountDetailGet(customerId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 根据顾客id获取账户信息
         * @param {number} customerId 顾客id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPcuAccountCustomerIdGetPcuAccountInfoGet(customerId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultPcuAccount>>> {
            const localVarAxiosArgs = await PcuAccountApiAxiosParamCreator(configuration).apiPcuAccountCustomerIdGetPcuAccountInfoGet(customerId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 分页查询账户明细
         * @param {PagePcuAccountDto} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPcuAccountPagePost(body?: PagePcuAccountDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await PcuAccountApiAxiosParamCreator(configuration).apiPcuAccountPagePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 充值方法
         * @param {RechargeAccountDto} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPcuAccountRechargeAccountPost(body?: RechargeAccountDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultBoolean>>> {
            const localVarAxiosArgs = await PcuAccountApiAxiosParamCreator(configuration).apiPcuAccountRechargeAccountPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 账户退款
         * @param {RefundAccountInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPcuAccountRefundAccountPost(body?: RefundAccountInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultBoolean>>> {
            const localVarAxiosArgs = await PcuAccountApiAxiosParamCreator(configuration).apiPcuAccountRefundAccountPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PcuAccountApi - factory interface
 * @export
 */
export const PcuAccountApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         *
         * @summary 根据顾客id明细信息
         * @param {number} customerId 顾客id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPcuAccountCustomerIdGetPcuAccountDetailGet(customerId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListPcuAccountDetails>> {
            return PcuAccountApiFp(configuration).apiPcuAccountCustomerIdGetPcuAccountDetailGet(customerId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 根据顾客id获取账户信息
         * @param {number} customerId 顾客id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPcuAccountCustomerIdGetPcuAccountInfoGet(customerId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultPcuAccount>> {
            return PcuAccountApiFp(configuration).apiPcuAccountCustomerIdGetPcuAccountInfoGet(customerId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 分页查询账户明细
         * @param {PagePcuAccountDto} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPcuAccountPagePost(body?: PagePcuAccountDto, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return PcuAccountApiFp(configuration).apiPcuAccountPagePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 充值方法
         * @param {RechargeAccountDto} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPcuAccountRechargeAccountPost(body?: RechargeAccountDto, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultBoolean>> {
            return PcuAccountApiFp(configuration).apiPcuAccountRechargeAccountPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 账户退款
         * @param {RefundAccountInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPcuAccountRefundAccountPost(body?: RefundAccountInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultBoolean>> {
            return PcuAccountApiFp(configuration).apiPcuAccountRefundAccountPost(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PcuAccountApi - object-oriented interface
 * @export
 * @class PcuAccountApi
 * @extends {BaseAPI}
 */
export class PcuAccountApi extends BaseAPI {
    /**
     *
     * @summary 根据顾客id明细信息
     * @param {number} customerId 顾客id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PcuAccountApi
     */
    public async apiPcuAccountCustomerIdGetPcuAccountDetailGet(customerId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListPcuAccountDetails>> {
        return PcuAccountApiFp(this.configuration).apiPcuAccountCustomerIdGetPcuAccountDetailGet(customerId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 根据顾客id获取账户信息
     * @param {number} customerId 顾客id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PcuAccountApi
     */
    public async apiPcuAccountCustomerIdGetPcuAccountInfoGet(customerId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultPcuAccount>> {
        return PcuAccountApiFp(this.configuration).apiPcuAccountCustomerIdGetPcuAccountInfoGet(customerId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 分页查询账户明细
     * @param {PagePcuAccountDto} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PcuAccountApi
     */
    public async apiPcuAccountPagePost(body?: PagePcuAccountDto, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return PcuAccountApiFp(this.configuration).apiPcuAccountPagePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 充值方法
     * @param {RechargeAccountDto} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PcuAccountApi
     */
    public async apiPcuAccountRechargeAccountPost(body?: RechargeAccountDto, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultBoolean>> {
        return PcuAccountApiFp(this.configuration).apiPcuAccountRechargeAccountPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 账户退款
     * @param {RefundAccountInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PcuAccountApi
     */
    public async apiPcuAccountRefundAccountPost(body?: RefundAccountInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultBoolean>> {
        return PcuAccountApiFp(this.configuration).apiPcuAccountRefundAccountPost(body, options).then((request) => request(this.axios, this.basePath));
    }
}
