/* tslint:disable */
/* eslint-disable */
/**
 * 会员押金
 * <br/><u><b><font color='FF0000'> 👮不得利用本项目从事危害国家安全、扰乱社会秩序、侵犯他人合法权益等法律法规禁止的活动！任何基于本项目二次开发而产生的一切法律纠纷和责任，我们不承担任何责任！</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * 
 *
 * @export
 * @interface MemberDepositAmountDto
 */
export interface MemberDepositAmountDto {

    /**
     * 用户Id
     *
     * @type {number}
     * @memberof MemberDepositAmountDto
     */
    customerId?: number;

    /**
     * 总余额
     *
     * @type {number}
     * @memberof MemberDepositAmountDto
     */
    totalAmount?: number;

    /**
     * 总充值金额
     *
     * @type {number}
     * @memberof MemberDepositAmountDto
     */
    totalRechargeAmount?: number;

    /**
     * 总消费金额
     *
     * @type {number}
     * @memberof MemberDepositAmountDto
     */
    totalPayAmount?: number;
}
