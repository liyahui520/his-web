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

import { CEMRecordDiagnosisDetails } from './cemrecord-diagnosis-details';
 /**
 * 诊疗疾病诊断
 *
 * @export
 * @interface CEMRecordDiagnosis
 */
export interface CEMRecordDiagnosis {

    /**
     * 雪花Id
     *
     * @type {number}
     * @memberof CEMRecordDiagnosis
     */
    id?: number;

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof CEMRecordDiagnosis
     */
    createTime?: Date;

    /**
     * 更新时间
     *
     * @type {Date}
     * @memberof CEMRecordDiagnosis
     */
    updateTime?: Date | null;

    /**
     * 创建者Id
     *
     * @type {number}
     * @memberof CEMRecordDiagnosis
     */
    createUserId?: number | null;

    /**
     * 创建者姓名
     *
     * @type {string}
     * @memberof CEMRecordDiagnosis
     */
    createUserName?: string | null;

    /**
     * 修改者Id
     *
     * @type {number}
     * @memberof CEMRecordDiagnosis
     */
    updateUserId?: number | null;

    /**
     * 修改者姓名
     *
     * @type {string}
     * @memberof CEMRecordDiagnosis
     */
    updateUserName?: string | null;

    /**
     * 软删除
     *
     * @type {boolean}
     * @memberof CEMRecordDiagnosis
     */
    isDelete?: boolean;

    /**
     * @type {string}
     * @memberof CEMRecordDiagnosis
     */
    ver?: string | null;

    /**
     * 创建者部门Id
     *
     * @type {number}
     * @memberof CEMRecordDiagnosis
     */
    createOrgId?: number | null;

    /**
     * 创建者部门名称
     *
     * @type {string}
     * @memberof CEMRecordDiagnosis
     */
    createOrgName?: string | null;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof CEMRecordDiagnosis
     */
    tenantId?: number | null;

    /**
     * 病例id
     *
     * @type {number}
     * @memberof CEMRecordDiagnosis
     */
    recordId?: number;

    /**
     * 挂号id
     *
     * @type {number}
     * @memberof CEMRecordDiagnosis
     */
    regId?: number;

    /**
     * 是否住院
     *
     * @type {boolean}
     * @memberof CEMRecordDiagnosis
     */
    isHospital?: boolean;
    /**
     * 备注
     *
     * @type {string}
     * @memberof CEMRecordDiagnosis
     */
    remark?: string | null;

    /**
     * 疾病名称全
     *
     * @type {string}
     * @memberof CEMRecordDiagnosis
     */
    allName?: string | null;

    /**
     * 疾病诊断明细
     *
     * @type {Array<CEMRecordDiagnosisDetails>}
     * @memberof CEMRecordDiagnosis
     */
    cemRecordDiagnosisDetailss?: Array<CEMRecordDiagnosisDetails> | null;
}
