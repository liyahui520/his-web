/* tslint:disable */
/* eslint-disable */
/**
 * 挂号服务
 * <br/><u><b><font color='FF0000'> 👮不得利用本项目从事危害国家安全、扰乱社会秩序、侵犯他人合法权益等法律法规禁止的活动！任何基于本项目二次开发而产生的一切法律纠纷和责任，我们不承担任何责任！</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { CEMRecord } from '../cemrecord-manage/cemrecord';
import { PPets } from '../pcu-manage/ppets';
import { Pcustomer } from '../pcu-manage/pcustomer';
import { RegType } from '../cemrecord-manage/reg-type';
import { RegistersStatusEnum } from './registers-status-enum';
 /**
 * 医疗挂号表
 *
 * @export
 * @interface Registers
 */
export interface Registers {

    /**
     * 雪花Id
     *
     * @type {number}
     * @memberof Registers
     */
    id?: number;

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof Registers
     */
    createTime?: Date;

    /**
     * 更新时间
     *
     * @type {Date}
     * @memberof Registers
     */
    updateTime?: Date | null;

    /**
     * 创建者Id
     *
     * @type {number}
     * @memberof Registers
     */
    createUserId?: number | null;

    /**
     * 创建者姓名
     *
     * @type {string}
     * @memberof Registers
     */
    createUserName?: string | null;

    /**
     * 修改者Id
     *
     * @type {number}
     * @memberof Registers
     */
    updateUserId?: number | null;

    /**
     * 修改者姓名
     *
     * @type {string}
     * @memberof Registers
     */
    updateUserName?: string | null;

    /**
     * 软删除
     *
     * @type {boolean}
     * @memberof Registers
     */
    isDelete?: boolean;

    /**
     * @type {string}
     * @memberof Registers
     */
    ver?: string | null;

    /**
     * 创建者部门Id
     *
     * @type {number}
     * @memberof Registers
     */
    createOrgId?: number | null;

    /**
     * 创建者部门名称
     *
     * @type {string}
     * @memberof Registers
     */
    createOrgName?: string | null;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof Registers
     */
    tenantId?: number | null;

    /**
     * 病例ID
     *
     * @type {number}
     * @memberof Registers
     */
    recordId?: number | null;

    /**
     * 用户ID
     *
     * @type {number}
     * @memberof Registers
     */
    customerId?: number;

    /**
     * 用户名
     *
     * @type {string}
     * @memberof Registers
     */
    customerName?: string | null;

    /**
     * 宠物ID
     *
     * @type {number}
     * @memberof Registers
     */
    petId?: number;

    /**
     * 宠物名称
     *
     * @type {string}
     * @memberof Registers
     */
    petName?: string | null;

    /**
     * 挂号医生ID
     *
     * @type {number}
     * @memberof Registers
     */
    doctorId?: number;

    /**
     * 项目ID
     *
     * @type {number}
     * @memberof Registers
     */
    itemId?: number;

    /**
     * 销售人员ID
     *
     * @type {number}
     * @memberof Registers
     */
    saleId?: number;

    /**
     * 预约id
     *
     * @type {number}
     * @memberof Registers
     */
    reservationId?: number | null;

    /**
     * @type {RegistersStatusEnum}
     * @memberof Registers
     */
    status?: RegistersStatusEnum;

    /**
     * @type {RegType}
     * @memberof Registers
     */
    regType?: RegType;

    /**
     * @type {CEMRecord}
     * @memberof Registers
     */
    cemRecord?: CEMRecord;

    /**
     * @type {PPets}
     * @memberof Registers
     */
    pPetsInfo?: PPets;

    /**
     * @type {Pcustomer}
     * @memberof Registers
     */
    pcutomerDetail?: Pcustomer;

    /**
     * 挂号类型
     *
     * @type {string}
     * @memberof Registers
     */
    regTypeText?: string | null;

    /**
     * 挂号状态
     *
     * @type {string}
     * @memberof Registers
     */
    statusText?: string | null;

    /**
     * 挂号医生名称
     *
     * @type {string}
     * @memberof Registers
     */
    doctorName?: string | null;
}
