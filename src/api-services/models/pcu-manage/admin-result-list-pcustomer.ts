/* tslint:disable */
/* eslint-disable */
/**
 * 会员管理
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * Contact: liyahui360@163.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { Pcustomer } from './pcustomer';
 /**
 * 全局返回结果
 *
 * @export
 * @interface AdminResultListPcustomer
 */
export interface AdminResultListPcustomer {

    /**
     * 状态码
     *
     * @type {number}
     * @memberof AdminResultListPcustomer
     */
    code?: number;

    /**
     * 类型success、warning、error
     *
     * @type {string}
     * @memberof AdminResultListPcustomer
     */
    type?: string | null;

    /**
     * 错误信息
     *
     * @type {string}
     * @memberof AdminResultListPcustomer
     */
    message?: string | null;

    /**
     * 数据
     *
     * @type {Array<Pcustomer>}
     * @memberof AdminResultListPcustomer
     */
    result?: Array<Pcustomer> | null;

    /**
     * 附加数据
     *
     * @type {any}
     * @memberof AdminResultListPcustomer
     */
    extras?: any | null;

    /**
     * 时间
     *
     * @type {Date}
     * @memberof AdminResultListPcustomer
     */
    time?: Date;
}
