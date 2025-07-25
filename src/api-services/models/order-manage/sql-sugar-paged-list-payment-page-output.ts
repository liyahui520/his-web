/* tslint:disable */
/* eslint-disable */
/**
 * 消费记录
 * <br/><u><b><font color='FF0000'> 👮不得利用本项目从事危害国家安全、扰乱社会秩序、侵犯他人合法权益等法律法规禁止的活动！任何基于本项目二次开发而产生的一切法律纠纷和责任，我们不承担任何责任！</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { PaymentPageOutput } from './payment-page-output';
 /**
 * 分页泛型集合
 *
 * @export
 * @interface SqlSugarPagedListPaymentPageOutput
 */
export interface SqlSugarPagedListPaymentPageOutput {

    /**
     * 页码
     *
     * @type {number}
     * @memberof SqlSugarPagedListPaymentPageOutput
     */
    page?: number;

    /**
     * 页容量
     *
     * @type {number}
     * @memberof SqlSugarPagedListPaymentPageOutput
     */
    pageSize?: number;

    /**
     * 总条数
     *
     * @type {number}
     * @memberof SqlSugarPagedListPaymentPageOutput
     */
    total?: number;

    /**
     * 总页数
     *
     * @type {number}
     * @memberof SqlSugarPagedListPaymentPageOutput
     */
    totalPages?: number;

    /**
     * 当前页集合
     *
     * @type {Array<PaymentPageOutput>}
     * @memberof SqlSugarPagedListPaymentPageOutput
     */
    items?: Array<PaymentPageOutput> | null;

    /**
     * 是否有上一页
     *
     * @type {boolean}
     * @memberof SqlSugarPagedListPaymentPageOutput
     */
    hasPrevPage?: boolean;

    /**
     * 是否有下一页
     *
     * @type {boolean}
     * @memberof SqlSugarPagedListPaymentPageOutput
     */
    hasNextPage?: boolean;
}
