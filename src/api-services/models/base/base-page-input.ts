/* tslint:disable */
/* eslint-disable */
import {SysDictType} from "/@/api-services";

/**
 * 基础分页
 * @export
 * @interface BasePageInput
 */
export interface BasePageInput<T> {
    /**
     * 页码
     * @type {number}
     * @memberof SqlSugarPagedListSysDictType
     */
    page?: number;
    /**
     * 页容量
     * @type {number}
     * @memberof SqlSugarPagedListSysDictType
     */
    pageSize?: number;
    /**
     * 总条数
     * @type {number}
     * @memberof SqlSugarPagedListSysDictType
     */
    total?: number;
    /**
     * 总页数
     * @type {number}
     * @memberof SqlSugarPagedListSysDictType
     */
    totalPages?: number;
    /**
     * 当前页集合
     * @type {Array<T>}
     * @memberof SqlSugarPagedListSysDictType
     */
    items?: Array<T> | null;
    /**
     * 是否有上一页
     * @type {boolean}
     * @memberof SqlSugarPagedListSysDictType
     */
    hasPrevPage?: boolean;
    /**
     * 是否有下一页
     * @type {boolean}
     * @memberof SqlSugarPagedListSysDictType
     */
    hasNextPage?: boolean;
}
