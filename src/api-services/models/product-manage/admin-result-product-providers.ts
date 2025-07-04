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

import { ProductProviders } from './product-providers';
 /**
 * 全局返回结果
 *
 * @export
 * @interface AdminResultProductProviders
 */
export interface AdminResultProductProviders {

    /**
     * 状态码
     *
     * @type {number}
     * @memberof AdminResultProductProviders
     */
    code?: number;

    /**
     * 类型success、warning、error
     *
     * @type {string}
     * @memberof AdminResultProductProviders
     */
    type?: string | null;

    /**
     * 错误信息
     *
     * @type {string}
     * @memberof AdminResultProductProviders
     */
    message?: string | null;

    /**
     * @type {ProductProviders}
     * @memberof AdminResultProductProviders
     */
    result?: ProductProviders;

    /**
     * 附加数据
     *
     * @type {any}
     * @memberof AdminResultProductProviders
     */
    extras?: any | null;

    /**
     * 时间
     *
     * @type {Date}
     * @memberof AdminResultProductProviders
     */
    time?: Date;
}
