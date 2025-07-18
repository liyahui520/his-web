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

import { SqlSugarPagedListSysPetKind } from './sql-sugar-paged-list-sys-pet-kind';
 /**
 * 全局返回结果
 *
 * @export
 * @interface AdminResultSqlSugarPagedListSysPetKind
 */
export interface AdminResultSqlSugarPagedListSysPetKind {

    /**
     * 状态码
     *
     * @type {number}
     * @memberof AdminResultSqlSugarPagedListSysPetKind
     */
    code?: number;

    /**
     * 类型success、warning、error
     *
     * @type {string}
     * @memberof AdminResultSqlSugarPagedListSysPetKind
     */
    type?: string | null;

    /**
     * 错误信息
     *
     * @type {string}
     * @memberof AdminResultSqlSugarPagedListSysPetKind
     */
    message?: string | null;

    /**
     * @type {SqlSugarPagedListSysPetKind}
     * @memberof AdminResultSqlSugarPagedListSysPetKind
     */
    result?: SqlSugarPagedListSysPetKind;

    /**
     * 附加数据
     *
     * @type {any}
     * @memberof AdminResultSqlSugarPagedListSysPetKind
     */
    extras?: any | null;

    /**
     * 时间
     *
     * @type {Date}
     * @memberof AdminResultSqlSugarPagedListSysPetKind
     */
    time?: Date;
}
