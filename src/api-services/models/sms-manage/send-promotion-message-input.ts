/* tslint:disable */
/* eslint-disable */
/**
 * 短信发送
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
 * 
 *
 * @export
 * @interface SendPromotionMessageInput
 */
export interface SendPromotionMessageInput {

    /**
     * 手机号码集合
     *
     * @type {Array<string>}
     * @memberof SendPromotionMessageInput
     */
    mobiles?: Array<string> | null;

    /**
     * 默认发送不带参数的短信内容
     *
     * @type {string}
     * @memberof SendPromotionMessageInput
     */
    templateType?: string | null;

    /**
     * 短信内容
     *
     * @type {string}
     * @memberof SendPromotionMessageInput
     */
    content?: string | null;
}
