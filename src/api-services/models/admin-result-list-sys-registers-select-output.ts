/* tslint:disable */
/* eslint-disable */
/**
 * Admin.NET
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * Contact: liyahui360@163.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { SysRegistersSelectOutput } from './sys-registers-select-output';
/**
 * 全局返回结果
 * @export
 * @interface AdminResultListSysRegistersSelectOutput
 */
export interface AdminResultListSysRegistersSelectOutput {
    /**
     * 状态码
     * @type {number}
     * @memberof AdminResultListSysRegistersSelectOutput
     */
    code?: number;
    /**
     * 类型success、warning、error
     * @type {string}
     * @memberof AdminResultListSysRegistersSelectOutput
     */
    type?: string | null;
    /**
     * 错误信息
     * @type {string}
     * @memberof AdminResultListSysRegistersSelectOutput
     */
    message?: string | null;
    /**
     * 数据
     * @type {Array<SysRegistersSelectOutput>}
     * @memberof AdminResultListSysRegistersSelectOutput
     */
    result?: Array<SysRegistersSelectOutput> | null;
    /**
     * 附加数据
     * @type {any}
     * @memberof AdminResultListSysRegistersSelectOutput
     */
    extras?: any | null;
    /**
     * 时间
     * @type {Date}
     * @memberof AdminResultListSysRegistersSelectOutput
     */
    time?: Date;
}
