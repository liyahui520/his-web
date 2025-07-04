/* tslint:disable */
/* eslint-disable */
/**
 * 产品管理
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * Contact: liyahui360@163.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ProductDefaunations } from './product-defaunations';
/**
 * 全局返回结果
 * @export
 * @interface AdminResultProductDefaunations
 */
export interface AdminResultProductDefaunations {
    /**
     * 状态码
     * @type {number}
     * @memberof AdminResultProductDefaunations
     */
    code?: number;
    /**
     * 类型success、warning、error
     * @type {string}
     * @memberof AdminResultProductDefaunations
     */
    type?: string | null;
    /**
     * 错误信息
     * @type {string}
     * @memberof AdminResultProductDefaunations
     */
    message?: string | null;
    /**
     * 
     * @type {ProductDefaunations}
     * @memberof AdminResultProductDefaunations
     */
    result?: ProductDefaunations;
    /**
     * 附加数据
     * @type {any}
     * @memberof AdminResultProductDefaunations
     */
    extras?: any | null;
    /**
     * 时间
     * @type {Date}
     * @memberof AdminResultProductDefaunations
     */
    time?: Date;
}
