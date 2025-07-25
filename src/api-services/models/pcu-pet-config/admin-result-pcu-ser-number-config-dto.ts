/* tslint:disable */
/* eslint-disable */
/**
 * 会员宠物参数配置
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { PcuSerNumberConfigDto } from './pcu-ser-number-config-dto';
 /**
 * 全局返回结果
 *
 * @export
 * @interface AdminResultPcuSerNumberConfigDto
 */
export interface AdminResultPcuSerNumberConfigDto {

    /**
     * 状态码
     *
     * @type {number}
     * @memberof AdminResultPcuSerNumberConfigDto
     */
    code?: number;

    /**
     * 类型success、warning、error
     *
     * @type {string}
     * @memberof AdminResultPcuSerNumberConfigDto
     */
    type?: string | null;

    /**
     * 错误信息
     *
     * @type {string}
     * @memberof AdminResultPcuSerNumberConfigDto
     */
    message?: string | null;

    /**
     * @type {PcuSerNumberConfigDto}
     * @memberof AdminResultPcuSerNumberConfigDto
     */
    result?: PcuSerNumberConfigDto;

    /**
     * 附加数据
     *
     * @type {any}
     * @memberof AdminResultPcuSerNumberConfigDto
     */
    extras?: any | null;

    /**
     * 时间
     *
     * @type {Date}
     * @memberof AdminResultPcuSerNumberConfigDto
     */
    time?: Date;
}
