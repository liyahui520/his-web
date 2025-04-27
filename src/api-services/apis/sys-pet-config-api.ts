/* tslint:disable */
/* eslint-disable */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { AddSysPetKindInput } from '../models';
import { AddSysPetVarietieInput } from '../models';
import { AdminResultListSysPetKind } from '../models';
import { AdminResultListSysPetVarietie } from '../models';
import { AdminResultObject } from '../models';
import { AdminResultSqlSugarPagedListSysPetKind } from '../models';
import { AdminResultSqlSugarPagedListSysPetVarietie } from '../models';
import { PageSysPetKindInput } from '../models';
import { PageSysPetVarietieInput } from '../models';
import { UpdateSysPetKindInput } from '../models';
import { UpdateSysPetVarietieInput } from '../models';
/**
 * SysPetConfigApi - axios parameter creator
 * @export
 */
export const SysPcuPetConfigApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 新增宠物种类
         * @param {AddSysPetKindInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigAddKindPost: async (body?: AddSysPetKindInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sysPcuPetConfig/add-kind`;
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
         * @summary 新增宠物品种
         * @param {AddSysPetVarietieInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigAddVarietiePost: async (body?: AddSysPetVarietieInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sysPcuPetConfig/add-varietie`;
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
         * @summary 获取宠物种类列表【下拉框】
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigGetAllKindGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sysPcuPetConfig/get-all-kind`;
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
         * @summary 获取宠物品种列表【下拉框】
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigGetAllVarietieGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sysPcuPetConfig/get-all-varietie`;
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
         * @summary 获取宠物种类列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigGetKindGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sysPcuPetConfig/get-kind`;
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
         * @summary 分页品种列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigGetVarietieGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sysPcuPetConfig/get-varietie`;
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
         * @summary 删除种类
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigIdDeleteKindDelete: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiSysPcuPetConfigIdDeleteKindDelete.');
            }
            const localVarPath = `/api/sysPcuPetConfig/{id}/delete-kind`
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
         * @summary 删除品种
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigIdDeleteVarietieDelete: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiSysPcuPetConfigIdDeleteVarietieDelete.');
            }
            const localVarPath = `/api/sysPcuPetConfig/{id}/delete-varietie`
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
         * @summary 更新宠物种类
         * @param {number} id 种类id
         * @param {UpdateSysPetKindInput} [body] 更新实体
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigIdEditKindPut: async (id: number, body?: UpdateSysPetKindInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiSysPcuPetConfigIdEditKindPut.');
            }
            const localVarPath = `/api/sysPcuPetConfig/{id}/edit-kind`
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
         * @summary 更新宠物品种
         * @param {number} id 品种id
         * @param {UpdateSysPetVarietieInput} [body] 更新实体
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigIdEditVarietiePut: async (id: number, body?: UpdateSysPetVarietieInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiSysPcuPetConfigIdEditVarietiePut.');
            }
            const localVarPath = `/api/sysPcuPetConfig/{id}/edit-varietie`
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
         * @summary 跟进种类id  获取宠物品种信息
         * @param {number} kindId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigKindIdGetVarietieGet: async (kindId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'kindId' is not null or undefined
            if (kindId === null || kindId === undefined) {
                throw new RequiredError('kindId','Required parameter kindId was null or undefined when calling apiSysPcuPetConfigKindIdGetVarietieGet.');
            }
            const localVarPath = `/api/sysPcuPetConfig/{kindId}/get-varietie`
                .replace(`{${"kindId"}}`, encodeURIComponent(String(kindId)));
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
         * @summary 跟进种类id  获取宠物品种信息
         * @param {number} kindId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigKindIdMiniGetVarietieGet: async (kindId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'kindId' is not null or undefined
            if (kindId === null || kindId === undefined) {
                throw new RequiredError('kindId','Required parameter kindId was null or undefined when calling apiSysPcuPetConfigKindIdMiniGetVarietieGet.');
            }
            const localVarPath = `/api/sysPcuPetConfig/{kindId}/mini-get-varietie`
                .replace(`{${"kindId"}}`, encodeURIComponent(String(kindId)));
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
         * @summary 获取宠物种类列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigMiniGetKindGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sysPcuPetConfig/mini-get-kind`;
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
         * @summary 分页获取种类
         * @param {PageSysPetKindInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigPageKindPost: async (body?: PageSysPetKindInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sysPcuPetConfig/page-kind`;
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
         * @summary 分页获取品种
         * @param {PageSysPetVarietieInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPcuPetConfigPageVarietiePost: async (body?: PageSysPetVarietieInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sysPcuPetConfig/page-varietie`;
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
 * SysPcuPetConfigApi - functional programming interface
 * @export
 */
export const SysPcuPetConfigApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 新增宠物种类
         * @param {AddSysPetKindInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigAddKindPost(body?: AddSysPetKindInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigAddKindPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 新增宠物品种
         * @param {AddSysPetVarietieInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigAddVarietiePost(body?: AddSysPetVarietieInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigAddVarietiePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取宠物种类列表【下拉框】
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigGetAllKindGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigGetAllKindGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取宠物品种列表【下拉框】
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigGetAllVarietieGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultObject>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigGetAllVarietieGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取宠物种类列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigGetKindGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListSysPetKind>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigGetKindGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 分页品种列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigGetVarietieGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListSysPetVarietie>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigGetVarietieGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除种类
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigIdDeleteKindDelete(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigIdDeleteKindDelete(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除品种
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigIdDeleteVarietieDelete(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigIdDeleteVarietieDelete(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新宠物种类
         * @param {number} id 种类id
         * @param {UpdateSysPetKindInput} [body] 更新实体
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigIdEditKindPut(id: number, body?: UpdateSysPetKindInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigIdEditKindPut(id, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新宠物品种
         * @param {number} id 品种id
         * @param {UpdateSysPetVarietieInput} [body] 更新实体
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigIdEditVarietiePut(id: number, body?: UpdateSysPetVarietieInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigIdEditVarietiePut(id, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 跟进种类id  获取宠物品种信息
         * @param {number} kindId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigKindIdGetVarietieGet(kindId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListSysPetVarietie>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigKindIdGetVarietieGet(kindId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 跟进种类id  获取宠物品种信息
         * @param {number} kindId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigKindIdMiniGetVarietieGet(kindId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListSysPetVarietie>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigKindIdMiniGetVarietieGet(kindId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取宠物种类列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigMiniGetKindGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListSysPetKind>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigMiniGetKindGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 分页获取种类
         * @param {PageSysPetKindInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigPageKindPost(body?: PageSysPetKindInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultSqlSugarPagedListSysPetKind>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigPageKindPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 分页获取品种
         * @param {PageSysPetVarietieInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigPageVarietiePost(body?: PageSysPetVarietieInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultSqlSugarPagedListSysPetVarietie>>> {
            const localVarAxiosArgs = await SysPcuPetConfigApiAxiosParamCreator(configuration).apiSysPcuPetConfigPageVarietiePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SysPcuPetConfigApi - factory interface
 * @export
 */
export const SysPcuPetConfigApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 新增宠物种类
         * @param {AddSysPetKindInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigAddKindPost(body?: AddSysPetKindInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigAddKindPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 新增宠物品种
         * @param {AddSysPetVarietieInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigAddVarietiePost(body?: AddSysPetVarietieInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigAddVarietiePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取宠物种类列表【下拉框】
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigGetAllKindGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigGetAllKindGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取宠物品种列表【下拉框】
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigGetAllVarietieGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultObject>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigGetAllVarietieGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取宠物种类列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigGetKindGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListSysPetKind>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigGetKindGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 分页品种列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigGetVarietieGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListSysPetVarietie>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigGetVarietieGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除种类
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigIdDeleteKindDelete(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigIdDeleteKindDelete(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除品种
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigIdDeleteVarietieDelete(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigIdDeleteVarietieDelete(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新宠物种类
         * @param {number} id 种类id
         * @param {UpdateSysPetKindInput} [body] 更新实体
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigIdEditKindPut(id: number, body?: UpdateSysPetKindInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigIdEditKindPut(id, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新宠物品种
         * @param {number} id 品种id
         * @param {UpdateSysPetVarietieInput} [body] 更新实体
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigIdEditVarietiePut(id: number, body?: UpdateSysPetVarietieInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigIdEditVarietiePut(id, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 跟进种类id  获取宠物品种信息
         * @param {number} kindId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigKindIdGetVarietieGet(kindId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListSysPetVarietie>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigKindIdGetVarietieGet(kindId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 跟进种类id  获取宠物品种信息
         * @param {number} kindId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigKindIdMiniGetVarietieGet(kindId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListSysPetVarietie>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigKindIdMiniGetVarietieGet(kindId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取宠物种类列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigMiniGetKindGet(options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListSysPetKind>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigMiniGetKindGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 分页获取种类
         * @param {PageSysPetKindInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigPageKindPost(body?: PageSysPetKindInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultSqlSugarPagedListSysPetKind>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigPageKindPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 分页获取品种
         * @param {PageSysPetVarietieInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPcuPetConfigPageVarietiePost(body?: PageSysPetVarietieInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultSqlSugarPagedListSysPetVarietie>> {
            return SysPcuPetConfigApiFp(configuration).apiSysPcuPetConfigPageVarietiePost(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SysPcuPetConfigApi - object-oriented interface
 * @export
 * @class SysPcuPetConfigApi
 * @extends {BaseAPI}
 */
export class SysPcuPetConfigApi extends BaseAPI {
    /**
     * 
     * @summary 新增宠物种类
     * @param {AddSysPetKindInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigAddKindPost(body?: AddSysPetKindInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigAddKindPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 新增宠物品种
     * @param {AddSysPetVarietieInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigAddVarietiePost(body?: AddSysPetVarietieInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigAddVarietiePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取宠物种类列表【下拉框】
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigGetAllKindGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigGetAllKindGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取宠物品种列表【下拉框】
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigGetAllVarietieGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultObject>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigGetAllVarietieGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取宠物种类列表
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigGetKindGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListSysPetKind>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigGetKindGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 分页品种列表
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigGetVarietieGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListSysPetVarietie>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigGetVarietieGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除种类
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigIdDeleteKindDelete(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigIdDeleteKindDelete(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除品种
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigIdDeleteVarietieDelete(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigIdDeleteVarietieDelete(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新宠物种类
     * @param {number} id 种类id
     * @param {UpdateSysPetKindInput} [body] 更新实体
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigIdEditKindPut(id: number, body?: UpdateSysPetKindInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigIdEditKindPut(id, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新宠物品种
     * @param {number} id 品种id
     * @param {UpdateSysPetVarietieInput} [body] 更新实体
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigIdEditVarietiePut(id: number, body?: UpdateSysPetVarietieInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigIdEditVarietiePut(id, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 跟进种类id  获取宠物品种信息
     * @param {number} kindId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigKindIdGetVarietieGet(kindId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListSysPetVarietie>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigKindIdGetVarietieGet(kindId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 跟进种类id  获取宠物品种信息
     * @param {number} kindId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigKindIdMiniGetVarietieGet(kindId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListSysPetVarietie>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigKindIdMiniGetVarietieGet(kindId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取宠物种类列表
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigMiniGetKindGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListSysPetKind>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigMiniGetKindGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 分页获取种类
     * @param {PageSysPetKindInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigPageKindPost(body?: PageSysPetKindInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultSqlSugarPagedListSysPetKind>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigPageKindPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 分页获取品种
     * @param {PageSysPetVarietieInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysPcuPetConfigApi
     */
    public async apiSysPcuPetConfigPageVarietiePost(body?: PageSysPetVarietieInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultSqlSugarPagedListSysPetVarietie>> {
        return SysPcuPetConfigApiFp(this.configuration).apiSysPcuPetConfigPageVarietiePost(body, options).then((request) => request(this.axios, this.basePath));
    }
}
