


import globalAxios, {AxiosResponse, AxiosInstance, AxiosRequestConfig} from 'axios';
import {Configuration} from '../../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import {BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError} from '../../base';
import {UserChargesInput} from '../../models/usercharges/user-charges-input';
import {ProductId} from '../../models/usercharges/product-id';



export const UserChargesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary 增加用户收费项目
         * @param {UserChargesInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserChargesAddPost: async (body?: UserChargesInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/medicalrecord/add-doctor-charges`;
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
         * @summary 删除用户收费项目
         * @param {UserChargesInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserChargesDeletePost: async (body?: UserChargesInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/medicalrecord/delete-doctor-charges`;
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
         * @summary 获取用户配置的收费信息
         * @param {string} [userId] 用户id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserChargesListPost: async (userId?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/medicalrecord/get-doctor-charges`;
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
            localVarRequestOptions.data =   JSON.stringify({userId:userId}) ;

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};
export const UserChargesApiFp = function(configuration?: Configuration) {
    return {
        /**
         *
         * @summary 增加用户收费项目
         * @param {AddUserChargesInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserChargesAddPost(body?: UserChargesInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await UserChargesApiAxiosParamCreator(configuration).apiUserChargesAddPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 删除用户收费项目
         * @param {DeleteUserChargesInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserChargesDeletePost(body?: UserChargesInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await UserChargesApiAxiosParamCreator(configuration).apiUserChargesDeletePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 获取用户配置的收费信息
         * @param {string} [userId] 用户id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserChargesListPost(userId?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ProductId>>> {
            const localVarAxiosArgs = await UserChargesApiAxiosParamCreator(configuration).apiUserChargesListPost(userId,  options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * UserChargesApi - factory interface
 * @export
 */
export const UserChargesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         *
         * @summary 增加用户收费项目
         * @param {AddUserChargesInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserChargesAddPost(body?: UserChargesInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return UserChargesApiFp(configuration).apiUserChargesAddPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 删除用户收费项目
         * @param {DeleteUserChargesInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserChargesDeletePost(body?: UserChargesInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return UserChargesApiFp(configuration).apiUserChargesDeletePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 获取用户配置的收费信息
         * @param {string} [userId] 用户id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserChargesListPost(userId?: number,  options?: AxiosRequestConfig): Promise<AxiosResponse<ProductId>> {
            return UserChargesApiFp(configuration).apiUserChargesListPost(userId, options).then((request) => request(axios, basePath));
        },
    };
};


/**
 * UserChargesApi - object-oriented interface
 * @export
 * @class UserChargesApi
 * @extends {BaseAPI}
 */
export class UserChargesApi extends BaseAPI {
    /**
     *
     * @summary 增加用户收费项目
     * @param {AddUserChargesInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserChargesApi
     */
    public async apiUserChargesAddPost(body?: UserChargesInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return UserChargesApiFp(this.configuration).apiUserChargesAddPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 删除用户收费项目
     * @param {DeleteUserChargesInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserChargesApi
     */
    public async apiUserChargesDeletePost(body?: UserChargesInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return UserChargesApiFp(this.configuration).apiUserChargesDeletePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
         * @summary 获取用户配置的收费信息
         * @param {string} [userId] 用户id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MemberLevelApi
     */
    public async apiUserChargesListPost(userId?: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<ProductId>> {
        return UserChargesApiFp(this.configuration).apiUserChargesListPost(userId, options).then((request) => request(this.axios, this.basePath));
    }
}

