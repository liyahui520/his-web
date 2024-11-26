/* tslint:disable */
/* eslint-disable */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { AddSysPetKindInput } from '../models/pets/kind/add-pet-kind-input';
import {PagePetKindInput} from '../models/pets/kind/page-pet-kind-input';
import {PetKindOutPut} from "/@/api-services/models/pets/kind/pet-kind-output";
import {BaseOuput} from "/@/api-services/models/base/base-ouput";
import {EditSysPetKindInput} from "/@/api-services/models/pets/kind/edit-pet-kind-input";
import {PagePetKindOutPut} from "/@/api-services/models/pets/kind/page-pet-kind-output";
import {AddSysPetVarietieInput} from "/@/api-services/models/pets/varietie/add-pet-varietie-input";
import {PagePetVarietieInput} from "/@/api-services/models/pets/varietie/page-pet-varietieinput";
import {EditSysPetVarietieInput} from "/@/api-services/models/pets/varietie/edit-pet-varietie-input";
import {PetVarietieOutPut} from "/@/api-services/models/pets/varietie/pet-varietie-output";
import {PagePetVarietieOutPut} from "/@/api-services/models/pets/varietie/page-pet-varietie-output";
import { Local, Session } from '../../utils/storage';
/**
 * SysPetConfigApi - axios parameter creator
 * @export
 */
export const SysPetConfigApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary 增加种类
         * @param {AddOrgInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetAddKind: async (body?: AddSysPetKindInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
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
         * @summary 删除种类
         * @param {number} [kindId]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetDeleteKind: async (kindId?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            if (kindId === null || kindId === undefined) {
                throw new RequiredError('kindId','参数kindId不可为空');
            }
            const localVarPath = `/api/sysPcuPetConfig/`+kindId+`/delete-kind`;
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
            // const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            // localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },

        /**
         *
         * @summary 获取种类分页列表
         * @param {PagePetKindInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetPageKind: async (body?: PagePetKindInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
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
         * @summary 获取种类列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetKindGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
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
         * @summary 更新种类
         * @param {AddOrgInput} [body]
         * @param id 种类id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetUpdateKind: async (id:number, body?: EditSysPetKindInput,options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            if (id === null || id === undefined) {
                throw new RequiredError('id','参数kindId不可为空');
            }
            const localVarPath = `/api/sysPcuPetConfig/`+id+`/edit-kind`;
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
         * @summary 增加品种
         * @param {AddOrgInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetAddVarietie: async (body?: AddSysPetVarietieInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
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
         * @summary 删除品种
         * @param {number} [id]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetDeleteVarietie: async (id?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            if (id === null || id === undefined) {
                throw new RequiredError('id','参数id不可为空');
            }
            const localVarPath = `/api/sysPcuPetConfig/`+id+`/delete-varietie`;
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
            // const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            // localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },

        /**
         *
         * @summary 获取品种分页列表
         * @param {PagePetKindInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetPageVarietie: async (body?: PagePetVarietieInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
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
         * @summary 获取品种列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetVarietieGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
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
         * @summary 更新品种
         * @param {AddOrgInput} [body]
         * @param id 品种id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetUpdateVarietie: async (id:number, body?: EditSysPetVarietieInput,options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            if (id === null || id === undefined) {
                throw new RequiredError('id','参数kindId不可为空');
            }
            const localVarPath = `/api/sysPcuPetConfig/`+id+`/edit-varietie`;
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
         * @summary 跟进种类id获取品种列表
         * @param {number} kindId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSysPetVarietieGetByKindId: async (kindId:number,options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/sysPcuPetConfig/`+kindId+`/get-varietie`;
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
 * PetConfigApi - functional programming interface
 * @export
 */
export const SysPetConfigApiFp = function(configuration?: Configuration) {
    return {
        /**
         *
         * @summary 新增种类
         * @param {AddSysPetKindInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetAddKind(body?: AddSysPetKindInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetAddKind(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 删除种类
         * @param {number} [kindId]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetDeleteKind(kindId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetDeleteKind(kindId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 获取种类分页列表
         * @param {PagePetKindInput} body 主键Id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetPageKind(body?:PagePetKindInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<BaseOuput<PagePetKindOutPut>>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetPageKind(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },

        /**
         *
         * @summary 获取种类列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetKindGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<BaseOuput<PetKindOutPut>>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetKindGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },

        /**
         *
         * @summary 更新种类
         * @param {number} [id]
         * @param {UpdateOrgInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetUpdateKind(id:number,body?: EditSysPetKindInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetUpdateKind(id,body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 新增品种
         * @param {AddSysPetKindInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetAddVarietie(body?: AddSysPetVarietieInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetAddVarietie(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 删除品种
         * @param {number} [kindId]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetDeleteVarietie(kindId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetDeleteVarietie(kindId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 获取品种分页列表
         * @param {PagePetKindInput} body 主键Id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetPageVarietie(body?:PagePetVarietieInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<BaseOuput<PagePetVarietieOutPut>>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetPageVarietie(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },

        /**
         *
         * @summary 获取品种列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetVarietieGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<BaseOuput<PetVarietieOutPut>>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetVarietieGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 更新品种
         * @param {number} [id]
         * @param {UpdateOrgInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetUpdateVarietie(id:number,body?: EditSysPetVarietieInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetUpdateVarietie(id,body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @summary 根据种类id获取品种信息
         * @param {number} [id]
         * @param {UpdateOrgInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetVarietieGetByKindId(id:number,options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await SysPetConfigApiAxiosParamCreator(configuration).apiSysPetVarietieGetByKindId(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PetConfigApi - factory interface
 * @export
 */
export const SysPetConfigApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         *
         * @summary 增加种类
         * @param {AddOrgInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetAddKind(body?: AddSysPetKindInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPetConfigApiFp(configuration).apiSysPetAddKind(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 删除种类
         * @param {number} [kindId]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetDeleteKind(kindId:number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPetConfigApiFp(configuration).apiSysPetDeleteKind(kindId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 获取种类分页列表
         * @param {PagePetKindInput} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetPageKind(body?: PagePetKindInput, options?: AxiosRequestConfig): Promise<AxiosResponse<BaseOuput<PagePetKindOutPut>>> {
            return SysPetConfigApiFp(configuration).apiSysPetPageKind(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 更新种类
         * @param {number} [id] 种类Id
         * @param {UpdateOrgInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetUpdateKind(id:number,body?: EditSysPetKindInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPetConfigApiFp(configuration).apiSysPetUpdateKind(id,body, options).then((request) => request(axios, basePath));
        },

        /**
         *
         * @summary 获取种类列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetKindGet(options?: AxiosRequestConfig): Promise<AxiosResponse<BaseOuput<PetKindOutPut>>> {
            return SysPetConfigApiFp(configuration).apiSysPetKindGet(options).then((request) => request(axios, basePath));
        },

        /*****************************************************  品种 ***************************************************/
        /**
         *
         * @summary 增加品种
         * @param {AddOrgInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetAddVarietie(body?: AddSysPetVarietieInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPetConfigApiFp(configuration).apiSysPetAddVarietie(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 删除品种
         * @param {number} [kindId]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetDeleteVarietie(kindId:number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPetConfigApiFp(configuration).apiSysPetDeleteVarietie(kindId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 获取品种分页列表
         * @param {PagePetKindInput} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetPageVarietie(body?: PagePetVarietieInput, options?: AxiosRequestConfig): Promise<AxiosResponse<BaseOuput<PagePetKindOutPut>>> {
            return SysPetConfigApiFp(configuration).apiSysPetPageVarietie(body, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary 更新品种
         * @param {number} [id] 种类Id
         * @param {UpdateOrgInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetUpdateVarietie(id:number,body?: EditSysPetVarietieInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysPetConfigApiFp(configuration).apiSysPetUpdateVarietie(id,body, options).then((request) => request(axios, basePath));
        },

        /**
         *
         * @summary 获取品种列表
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetVarietieGet(options?: AxiosRequestConfig): Promise<AxiosResponse<BaseOuput<PetVarietieOutPut>>> {
            return SysPetConfigApiFp(configuration).apiSysPetVarietieGet(options).then((request) => request(axios, basePath));
        },

        /**
         *
         * @summary 根据种类id获取品种信息
         * @param {number} [id]
         * @param {UpdateOrgInput} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSysPetVarietieGetByKindId(id:number,options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return SysPetConfigApiFp(configuration).apiSysPetVarietieGetByKindId(id,options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PetConfigApi - object-oriented interface
 * @export
 * @class SysOrgApi
 * @extends {BaseAPI}
 */
export class SysPetConfigApi extends BaseAPI {
    /**
     *
     * @summary 新增种类
     * @param {AddOrgInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async apiSysPetAddKind(body?: AddSysPetKindInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetAddKind(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 删除种类
     * @param {DeleteOrgInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async apiSysPetDeleteKind(id:number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetDeleteKind(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 获取机构分页列表
     * @param {PagePetKindInput} body 主键Id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async apiSysPetPageKind(body?: PagePetKindInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<BaseOuput<PagePetKindOutPut>>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetPageKind(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 更新种类
     * @param {EditSysPetKindInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async apiSysPetUpdateKind(id:number,body?: EditSysPetKindInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetUpdateKind(id,body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary 获取种类列表
     * @param {EditSysPetKindInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async apiSysPetKindGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<BaseOuput<PetKindOutPut>>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetKindGet(options).then((request) => request(this.axios, this.basePath));
    }

    /******************************************************** 品种  *************************************************************/
    /**
     *
     * @summary 新增品种
     * @param {AddOrgInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async apiSysPetAddVarietie(body?: AddSysPetVarietieInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetAddVarietie(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 删除品种
     * @param {DeleteOrgInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async apiSysPetDeleteVarietie(id:number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetDeleteVarietie(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 获取品种分页列表
     * @param {PagePetKindInput} body 主键Id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async apiSysPetPageVarietie(body?: PagePetVarietieInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<BaseOuput<PagePetVarietieOutPut>>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetPageVarietie(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary 更新品种
     * @param {EditSysPetKindInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async apiSysPetUpdateVarietie(id:number,body?: EditSysPetVarietieInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetUpdateVarietie(id,body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary 获取品种列表
     * @param {EditSysPetKindInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async apiSysPetVarietieGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<BaseOuput<PetVarietieOutPut>>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetVarietieGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary 根据种类id获取品种信息
     * @param {number} [id]
     * @param {UpdateOrgInput} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiSysPetVarietieGetByKindId(id:number,options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return SysPetConfigApiFp(this.configuration).apiSysPetVarietieGetByKindId(id,options).then((request) => request(this.axios, this.basePath));
    }
}
