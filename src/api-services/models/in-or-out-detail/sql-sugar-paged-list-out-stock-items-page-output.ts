/* tslint:disable */
/* eslint-disable */
/**
 * 出入库明细
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { OutStockItemsPageOutput } from './out-stock-items-page-output';

/**
 * 分页泛型集合
 *
 * @export
 * @interface SqlSugarPagedListOutStockItemsPageOutput
 */
export interface SqlSugarPagedListOutStockItemsPageOutput {

    /**
     * 页码
     *
     * @type {number}
     * @memberof SqlSugarPagedListOutStockItemsPageOutput
     */
    page?: number;

    /**
     * 页容量
     *
     * @type {number}
     * @memberof SqlSugarPagedListOutStockItemsPageOutput
     */
    pageSize?: number;

    /**
     * 总条数
     *
     * @type {number}
     * @memberof SqlSugarPagedListOutStockItemsPageOutput
     */
    total?: number;

    /**
     * 总页数
     *
     * @type {number}
     * @memberof SqlSugarPagedListOutStockItemsPageOutput
     */
    totalPages?: number;

    /**
     * 当前页集合
     *
     * @type {Array<OutStockItemsPageOutput>}
     * @memberof SqlSugarPagedListOutStockItemsPageOutput
     */
    items?: Array<OutStockItemsPageOutput> | null;

    /**
     * 是否有上一页
     *
     * @type {boolean}
     * @memberof SqlSugarPagedListOutStockItemsPageOutput
     */
    hasPrevPage?: boolean;

    /**
     * 是否有下一页
     *
     * @type {boolean}
     * @memberof SqlSugarPagedListOutStockItemsPageOutput
     */
    hasNextPage?: boolean;
}
