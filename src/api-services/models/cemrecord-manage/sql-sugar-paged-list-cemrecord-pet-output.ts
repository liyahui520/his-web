/* tslint:disable */
/* eslint-disable */
/**
 * 病例管理
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { CEMRecordPetOutput } from './cemrecord-pet-output';
 /**
 * 分页泛型集合
 *
 * @export
 * @interface SqlSugarPagedListCEMRecordPetOutput
 */
export interface SqlSugarPagedListCEMRecordPetOutput {

    /**
     * 页码
     *
     * @type {number}
     * @memberof SqlSugarPagedListCEMRecordPetOutput
     */
    page?: number;

    /**
     * 页容量
     *
     * @type {number}
     * @memberof SqlSugarPagedListCEMRecordPetOutput
     */
    pageSize?: number;

    /**
     * 总条数
     *
     * @type {number}
     * @memberof SqlSugarPagedListCEMRecordPetOutput
     */
    total?: number;

    /**
     * 总页数
     *
     * @type {number}
     * @memberof SqlSugarPagedListCEMRecordPetOutput
     */
    totalPages?: number;

    /**
     * 当前页集合
     *
     * @type {Array<CEMRecordPetOutput>}
     * @memberof SqlSugarPagedListCEMRecordPetOutput
     */
    items?: Array<CEMRecordPetOutput> | null;

    /**
     * 是否有上一页
     *
     * @type {boolean}
     * @memberof SqlSugarPagedListCEMRecordPetOutput
     */
    hasPrevPage?: boolean;

    /**
     * 是否有下一页
     *
     * @type {boolean}
     * @memberof SqlSugarPagedListCEMRecordPetOutput
     */
    hasNextPage?: boolean;
}
