/* tslint:disable */
/* eslint-disable */
/**
 * 订单信息
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * 打印A4账单
 *
 * @export
 * @interface PrintBillInput
 */
export interface PrintBillInput {

    /**
     * 账单Id
     *
     * @type {number}
     * @memberof PrintBillInput
     */
    id?: number;

    /**
     * 用户Id
     *
     * @type {number}
     * @memberof PrintBillInput
     */
    customerId?: number;

    /**
     * 小票类型  账单打印随便填写  小票打印  如果是 收款小票 是0  补打的话  是1
     *
     * @type {number}
     * @memberof PrintBillInput
     */
    noteType?: number;
}
