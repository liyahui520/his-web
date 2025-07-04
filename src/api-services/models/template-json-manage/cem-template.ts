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
 * 主诉/既往史/现病史模板表
 *
 * @export
 * @interface CemTemplate
 */
export interface CemTemplate {

    /**
     * 雪花Id
     *
     * @type {number}
     * @memberof CemTemplate
     */
    id?: number;

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof CemTemplate
     */
    createTime?: Date;

    /**
     * 更新时间
     *
     * @type {Date}
     * @memberof CemTemplate
     */
    updateTime?: Date | null;

    /**
     * 创建者Id
     *
     * @type {number}
     * @memberof CemTemplate
     */
    createUserId?: number | null;

    /**
     * 创建者姓名
     *
     * @type {string}
     * @memberof CemTemplate
     */
    createUserName?: string | null;

    /**
     * 修改者Id
     *
     * @type {number}
     * @memberof CemTemplate
     */
    updateUserId?: number | null;

    /**
     * 修改者姓名
     *
     * @type {string}
     * @memberof CemTemplate
     */
    updateUserName?: string | null;

    /**
     * 软删除
     *
     * @type {boolean}
     * @memberof CemTemplate
     */
    isDelete?: boolean;

    /**
     * @type {string}
     * @memberof CemTemplate
     */
    ver?: string | null;

    /**
     * 创建者部门Id
     *
     * @type {number}
     * @memberof CemTemplate
     */
    createOrgId?: number | null;

    /**
     * 创建者部门名称
     *
     * @type {string}
     * @memberof CemTemplate
     */
    createOrgName?: string | null;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof CemTemplate
     */
    tenantId?: number | null;

    /**
     * @type {CemTemplateTypeEnum}
     * @memberof CemTemplate
     */
    type?: CemTemplateTypeEnum;

    /**
     * @type {string}
     * @memberof CemTemplate
     */
    name?: string | null;

    /**
     * @type {string}
     * @memberof CemTemplate
     */
    content?: string | null;
}
