/* tslint:disable */
/* eslint-disable */
/**
 * 病例管理
 * <br/><u><b><font color='FF0000'> 👮不得利用本项目从事危害国家安全、扰乱社会秩序、侵犯他人合法权益等法律法规禁止的活动！任何基于本项目二次开发而产生的一切法律纠纷和责任，我们不承担任何责任！</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { CEMRecordPrescriptionItem } from './cemrecord-prescription-item';
 /**
 * 
 *
 * @export
 * @interface CEMRecordPrescription
 */
export interface CEMRecordPrescription {

    /**
     * 雪花Id
     *
     * @type {number}
     * @memberof CEMRecordPrescription
     */
    id?: number;

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof CEMRecordPrescription
     */
    createTime?: Date;

    /**
     * 更新时间
     *
     * @type {Date}
     * @memberof CEMRecordPrescription
     */
    updateTime?: Date | null;

    /**
     * 创建者Id
     *
     * @type {number}
     * @memberof CEMRecordPrescription
     */
    createUserId?: number | null;

    /**
     * 创建者姓名
     *
     * @type {string}
     * @memberof CEMRecordPrescription
     */
    createUserName?: string | null;

    /**
     * 修改者Id
     *
     * @type {number}
     * @memberof CEMRecordPrescription
     */
    updateUserId?: number | null;

    /**
     * 修改者姓名
     *
     * @type {string}
     * @memberof CEMRecordPrescription
     */
    updateUserName?: string | null;

    /**
     * 软删除
     *
     * @type {boolean}
     * @memberof CEMRecordPrescription
     */
    isDelete?: boolean;

    /**
     * @type {string}
     * @memberof CEMRecordPrescription
     */
    ver?: string | null;

    /**
     * 创建者部门Id
     *
     * @type {number}
     * @memberof CEMRecordPrescription
     */
    createOrgId?: number | null;

    /**
     * 创建者部门名称
     *
     * @type {string}
     * @memberof CEMRecordPrescription
     */
    createOrgName?: string | null;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof CEMRecordPrescription
     */
    tenantId?: number | null;

    /**
     * 病例id
     *
     * @type {number}
     * @memberof CEMRecordPrescription
     */
    recordId?: number;

    /**
     * 挂号id
     *
     * @type {number}
     * @memberof CEMRecordPrescription
     */
    regId?: number;

    /**
     * 是否住院
     *
     * @type {boolean}
     * @memberof CEMRecordPrescription
     */
    isHospital?: boolean;
    /**
     * 开单时间
     *
     * @type {Date}
     * @memberof CEMRecordPrescription
     */
    billingTime?: Date;

    /**
     * 总金额
     *
     * @type {number}
     * @memberof CEMRecordPrescription
     */
    amountPrice?: number;

    /**
     * 项目数量
     *
     * @type {number}
     * @memberof CEMRecordPrescription
     */
    count?: number;

    /**
     * 处方明细
     *
     * @type {Array<CEMRecordPrescriptionItem>}
     * @memberof CEMRecordPrescription
     */
    cemRecordPrescriptionItems?: Array<CEMRecordPrescriptionItem> | null;
}
