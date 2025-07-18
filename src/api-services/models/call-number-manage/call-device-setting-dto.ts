/* tslint:disable */
/* eslint-disable */
/**
 * 叫号服务
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { CallDeviceProductItem } from './call-device-product-item';
 /**
 * 
 *
 * @export
 * @interface CallDeviceSettingDto
 */
export interface CallDeviceSettingDto {

    /**
     * 设备表Id
     *
     * @type {number}
     * @memberof CallDeviceSettingDto
     */
    id?: number;

    /**
     * 设备标识
     *
     * @type {string}
     * @memberof CallDeviceSettingDto
     */
    deviceIdentity?: string | null;

    /**
     * 呼叫次数
     *
     * @type {number}
     * @memberof CallDeviceSettingDto
     */
    times?: number;

    /**
     * 呼叫语速
     *
     * @type {number}
     * @memberof CallDeviceSettingDto
     */
    rate?: number;

    /**
     * 呼叫音调
     *
     * @type {number}
     * @memberof CallDeviceSettingDto
     */
    pitch?: number;

    /**
     * 叫号内容
     *
     * @type {string}
     * @memberof CallDeviceSettingDto
     */
    content?: string | null;

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof CallDeviceSettingDto
     */
    createTime?: Date;

    /**
     * 设备版本
     *
     * @type {string}
     * @memberof CallDeviceSettingDto
     */
    ver?: string | null;

    /**
     * 推荐产品
     *
     * @type {Array<CallDeviceProductItem>}
     * @memberof CallDeviceSettingDto
     */
    productItems?: Array<CallDeviceProductItem> | null;
}
