/* tslint:disable */
/* eslint-disable */
/**
 * 产品管理
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * Contact: liyahui360@163.com
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
 * @interface UpdateProductProvidersInput
 */
export interface UpdateProductProvidersInput {

    /**
     * @type {Search}
     * @memberof UpdateProductProvidersInput
     */
    search?: Search;

    /**
     * 模糊查询关键字
     *
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    keyword?: string | null;

    /**
     * @type {Filter}
     * @memberof UpdateProductProvidersInput
     */
    filter?: Filter;

    /**
     * 当前页码
     *
     * @type {number}
     * @memberof UpdateProductProvidersInput
     */
    page?: number;

    /**
     * 页码容量
     *
     * @type {number}
     * @memberof UpdateProductProvidersInput
     */
    pageSize?: number;

    /**
     * 排序字段
     *
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    field?: string | null;

    /**
     * 排序方向
     *
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    order?: string | null;

    /**
     * 降序排序
     *
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    descStr?: string | null;

    /**
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    ver?: string | null;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof UpdateProductProvidersInput
     */
    tenantId?: number;

    /**
     * 名称
     *
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    name?: string | null;

    /**
     * 联系人
     *
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    contacter?: string | null;

    /**
     * 联系人电话
     *
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    telePhone?: string | null;

    /**
     * 联系地址
     *
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    address?: string | null;

    /**
     * 备注
     *
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    reamrk?: string | null;

    /**
     * 编码  总控使用
     *
     * @type {string}
     * @memberof UpdateProductProvidersInput
     */
    serialNumber?: string | null;

    /**
     * Id
     *
     * @type {number}
     * @memberof UpdateProductProvidersInput
     */
    id: number;
}
