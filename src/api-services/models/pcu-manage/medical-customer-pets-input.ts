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

 /**
 * 
 *
 * @export
 * @interface MedicalCustomerPetsInput
 */
export interface MedicalCustomerPetsInput {

    /**
     * 类型 1手机号  2 会员名称  3 宠物名称  4 会员卡号
     *
     * @type {number}
     * @memberof MedicalCustomerPetsInput
     */
    type?: number;

    /**
     * 查询条件
     *
     * @type {string}
     * @memberof MedicalCustomerPetsInput
     */
    parmarm?: string | null;
}
