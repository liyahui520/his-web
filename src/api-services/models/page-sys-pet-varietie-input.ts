/* tslint:disable */
/* eslint-disable */
/**
 * 宠物配置管理
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { Filter } from './filter';
import { Search } from './search';
 /**
 * 
 *
 * @export
 * @interface PageSysPetVarietieInput
 */
export interface PageSysPetVarietieInput {

    /**
     * @type {Search}
     * @memberof PageSysPetVarietieInput
     */
    search?: Search;

    /**
     * 模糊查询关键字
     *
     * @type {string}
     * @memberof PageSysPetVarietieInput
     */
    keyword?: string | null;

    /**
     * @type {Filter}
     * @memberof PageSysPetVarietieInput
     */
    filter?: Filter;

    /**
     * 当前页码
     *
     * @type {number}
     * @memberof PageSysPetVarietieInput
     */
    page?: number;

    /**
     * 页码容量
     *
     * @type {number}
     * @memberof PageSysPetVarietieInput
     */
    pageSize?: number;

    /**
     * 排序字段
     *
     * @type {string}
     * @memberof PageSysPetVarietieInput
     */
    field?: string | null;

    /**
     * 排序方向
     *
     * @type {string}
     * @memberof PageSysPetVarietieInput
     */
    order?: string | null;

    /**
     * 降序排序
     *
     * @type {string}
     * @memberof PageSysPetVarietieInput
     */
    descStr?: string | null;

    /**
     * @type {string}
     * @memberof PageSysPetVarietieInput
     */
    ver?: string | null;

    /**
     * 参数
     *
     * @type {string}
     * @memberof PageSysPetVarietieInput
     */
    params?: string | null;

    /**
     * 种类id
     *
     * @type {number}
     * @memberof PageSysPetVarietieInput
     */
    kindId?: number;
}
