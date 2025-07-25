/* tslint:disable */
/* eslint-disable */
/**
 * 驱虫疫苗
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { SqlSugarPagedListVaccinationOutput } from './sql-sugar-paged-list-vaccination-output';
import {
    SqlSugarPagedListVaccinationOutput,
} from ".";

/**
 * 全局返回结果
 *
 * @export
 * @interface AdminResultSqlSugarPagedListVaccinationOutput
 */
export interface AdminResultSqlSugarPagedListVaccinationOutput {

    /**
     * 状态码
     *
     * @type {number}
     * @memberof AdminResultSqlSugarPagedListVaccinationOutput
     */
    code?: number;

    /**
     * 类型success、warning、error
     *
     * @type {string}
     * @memberof AdminResultSqlSugarPagedListVaccinationOutput
     */
    type?: string | null;

    /**
     * 错误信息
     *
     * @type {string}
     * @memberof AdminResultSqlSugarPagedListVaccinationOutput
     */
    message?: string | null;

    /**
     * @type {SqlSugarPagedListVaccinationOutput}
     * @memberof AdminResultSqlSugarPagedListVaccinationOutput
     */
    result?: SqlSugarPagedListVaccinationOutput;

    /**
     * 附加数据
     *
     * @type {any}
     * @memberof AdminResultSqlSugarPagedListVaccinationOutput
     */
    extras?: any | null;

    /**
     * 时间
     *
     * @type {Date}
     * @memberof AdminResultSqlSugarPagedListVaccinationOutput
     */
    time?: Date;
}
