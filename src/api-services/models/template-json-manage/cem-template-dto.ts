/* tslint:disable */
/* eslint-disable */
/**
 * 诊疗内文本模板管理
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { CemTemplateTypeEnum } from './cem-template-type-enum';
 /**
 * 
 *
 * @export
 * @interface CemTemplateDto
 */
export interface CemTemplateDto {

    /**
     * @type {CemTemplateTypeEnum}
     * @memberof CemTemplateDto
     */
    type?: CemTemplateTypeEnum;

    /**
     * 名称
     *
     * @type {string}
     * @memberof CemTemplateDto
     */
    name?: string | null;

    /**
     * 内容
     *
     * @type {string}
     * @memberof CemTemplateDto
     */
    content?: string | null;
}
