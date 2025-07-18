/* tslint:disable */
/* eslint-disable */
/**
 * 挂号服务
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { RegistersStatusEnum } from './registers-status-enum';
import {RegTypeEnum} from "/@/api-services/models/register-manage/reg-type-enum";
/**
 * 实体
 * @export
 * @interface RegistersDto
 */
export interface RegistersDto {
    /**
     * 创建时间
     * @type {Date}
     * @memberof RegistersDto
     */
    createTime?: Date | null;
    /**
     * 更新时间
     * @type {Date}
     * @memberof RegistersDto
     */
    updateTime?: Date | null;
    /**
     * 创建者Id
     * @type {number}
     * @memberof RegistersDto
     */
    createUserId?: number | null;
    /**
     * 修改者Id
     * @type {number}
     * @memberof RegistersDto
     */
    updateUserId?: number | null;
    /**
     * 软删除
     * @type {boolean}
     * @memberof RegistersDto
     */
    isDelete?: boolean;
    /**
     * 版本标识
     * @type {string}
     * @memberof RegistersDto
     */
    ver?: string | null;
    /**
     * 用户ID
     * @type {number}
     * @memberof RegistersDto
     */
    customerId?: number;
    /**
     * 用户名
     * @type {string}
     * @memberof RegistersDto
     */
    customerName?: string | null;
    /**
     * 宠物ID
     * @type {number}
     * @memberof RegistersDto
     */
    petId?: number;
    /**
     * 宠物名称
     * @type {string}
     * @memberof RegistersDto
     */
    petName?: string | null;
    /**
     * 挂号医生ID
     * @type {number}
     * @memberof RegistersDto
     */
    doctorId?: number;
    /**
     * 项目ID
     * @type {number}
     * @memberof RegistersDto
     */
    itemId?: number;
    /**
     * 销售人员ID
     * @type {number}
     * @memberof RegistersDto
     */
    saleId?: number;
    /**
     * 预约id
     * @type {number}
     * @memberof RegistersDto
     */
    reservationId?: number | null;
    /**
     * 诊室Id
     * @type {number}
     * @memberof RegistersDto
     */
    roomId?: number | null;
    /**
     * 叫号编码
     * @type {number}
     * @memberof RegistersDto
     */
    callNumber?: number;
    /**
     * 叫号编码
     * @type {string}
     * @memberof RegistersDto
     */
    callNumberText?: string | null;
    /**
     * 
     * @type {RegistersStatusEnum}
     * @memberof RegistersDto
     */
    status?: RegistersStatusEnum;

    /**
     * 挂号类型
     */
    regType?:RegTypeEnum;
}
