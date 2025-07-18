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

import { CEMRecordItemGroupOutput } from './cemrecord-item-group-output';
 /**
 * 全局返回结果
 *
 * @export
 * @interface AdminResultListCEMRecordItemGroupOutput
 */
export interface AdminResultListCEMRecordItemGroupOutput {

    /**
     * 状态码
     *
     * @type {number}
     * @memberof AdminResultListCEMRecordItemGroupOutput
     */
    code?: number;

    /**
     * 类型success、warning、error
     *
     * @type {string}
     * @memberof AdminResultListCEMRecordItemGroupOutput
     */
    type?: string | null;

    /**
     * 错误信息
     *
     * @type {string}
     * @memberof AdminResultListCEMRecordItemGroupOutput
     */
    message?: string | null;

    /**
     * 数据
     *
     * @type {Array<CEMRecordItemGroupOutput>}
     * @memberof AdminResultListCEMRecordItemGroupOutput
     */
    result?: Array<CEMRecordItemGroupOutput> | null;

    /**
     * 附加数据
     *
     * @type {any}
     * @memberof AdminResultListCEMRecordItemGroupOutput
     */
    extras?: any | null;

    /**
     * 时间
     *
     * @type {Date}
     * @memberof AdminResultListCEMRecordItemGroupOutput
     */
    time?: Date;
}
