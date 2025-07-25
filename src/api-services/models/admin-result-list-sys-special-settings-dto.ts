/* tslint:disable */
/* eslint-disable */
/**
 * 权益设置
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { SysSpecialSettingsDto } from './sys-special-settings-dto';
 /**
 * 全局返回结果
 *
 * @export
 * @interface AdminResultListSysSpecialSettingsDto
 */
export interface AdminResultListSysSpecialSettingsDto {

    /**
     * 状态码
     *
     * @type {number}
     * @memberof AdminResultListSysSpecialSettingsDto
     */
    code?: number;

    /**
     * 类型success、warning、error
     *
     * @type {string}
     * @memberof AdminResultListSysSpecialSettingsDto
     */
    type?: string | null;

    /**
     * 错误信息
     *
     * @type {string}
     * @memberof AdminResultListSysSpecialSettingsDto
     */
    message?: string | null;

    /**
     * 数据
     *
     * @type {Array<SysSpecialSettingsDto>}
     * @memberof AdminResultListSysSpecialSettingsDto
     */
    result?: Array<SysSpecialSettingsDto> | null;

    /**
     * 附加数据
     *
     * @type {any}
     * @memberof AdminResultListSysSpecialSettingsDto
     */
    extras?: any | null;

    /**
     * 时间
     *
     * @type {Date}
     * @memberof AdminResultListSysSpecialSettingsDto
     */
    time?: Date;
}
