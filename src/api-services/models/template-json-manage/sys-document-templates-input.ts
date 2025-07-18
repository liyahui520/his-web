/* tslint:disable */
/* eslint-disable */
/**
 * 文书模板管理
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
 * @interface SysDocumentTemplatesInput
 */
export interface SysDocumentTemplatesInput {

    /**
     * 名称
     *
     * @type {string}
     * @memberof SysDocumentTemplatesInput
     */
    name?: string | null;

    /**
     * 打印模板
     *
     * @type {string}
     * @memberof SysDocumentTemplatesInput
     */
    template?: string | null;

    /**
     * 是否启用
     *
     * @type {boolean}
     * @memberof SysDocumentTemplatesInput
     */
    isEnable?: boolean;

    /**
     * 备注
     *
     * @type {string}
     * @memberof SysDocumentTemplatesInput
     */
    remark?: string | null;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof SysDocumentTemplatesInput
     */
    ver?: string | null;
}
