/* tslint:disable */
/* eslint-disable */
/**
 * 短信模板管理
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { SysSMSTemplateEnum } from './sys-smstemplate-enum';
/**
 * 
 *
 * @export
 * @interface SMSTemplateInput
 */
export interface SMSTemplateInput {

    /**
     * @type {SysSMSTemplateEnum}
     * @memberof SMSTemplateInput
     */
    type?: SysSMSTemplateEnum;

    /**
     * @type {string}
     * @memberof SMSTemplateInput
     */
    templateName?: string | null;

    /**
     * @type {string}
     * @memberof SMSTemplateInput
     */
    content?: string | null;

    /**
     * @type {boolean}
     * @memberof SMSTemplateInput
     */
    isEnable?: boolean;
}
