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

import { CallRoomStatusEnum } from './call-room-status-enum';
 /**
 * 添加诊室
 *
 * @export
 * @interface CallRoomSettingAddInput
 */
export interface CallRoomSettingAddInput {

    /**
     * 诊室名称
     *
     * @type {string}
     * @memberof CallRoomSettingAddInput
     */
    code?: string | null;
    /**
     * 诊室名称
     *
     * @type {string}
     * @memberof CallRoomSettingAddInput
     */
    name?: string | null;

    /**
     * 排序编码
     *
     * @type {number}
     * @memberof CallRoomSettingAddInput
     */
    sortIndex?: number;

    /**
     * @type {CallRoomStatusEnum}
     * @memberof CallRoomSettingAddInput
     */
    status?: CallRoomStatusEnum;
}
