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

import { DiagnosisOutput } from './diagnosis-output';
import { PhysicalOutput } from './physical-output';
import { PrescriptionOutput } from './prescription-output';
import { RegType } from './reg-type';
import { TestOutput } from './test-output';
import { ZhuSuOutput } from './zhu-su-output';
 /**
 * 整体病例输出对象
 *
 * @export
 * @interface GetCEMRecordInfoOutput
 */
export interface GetCEMRecordInfoOutput {

    /**
     * 病例主键Id
     *
     * @type {number}
     * @memberof GetCEMRecordInfoOutput
     */
    id?: number;

    /**
     * 挂号Id
     *
     * @type {number}
     * @memberof GetCEMRecordInfoOutput
     */
    regId?: number;

    /**
     * @type {RegType}
     * @memberof GetCEMRecordInfoOutput
     */
    regType?: RegType;

    /**
     * 病例类型
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    regTypeText?: string | null;

    /**
     * 就诊医生id
     *
     * @type {number}
     * @memberof GetCEMRecordInfoOutput
     */
    visitDoctorId?: number;

    /**
     * 就诊医生名称
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    visitDoctorName?: string | null;

    /**
     * 用户id
     *
     * @type {number}
     * @memberof GetCEMRecordInfoOutput
     */
    customerId?: number;

    /**
     * 用户名称
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    customerName?: string | null;

    /**
     * 用户手机号
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    customerPhone?: string | null;

    /**
     * 宠物id
     *
     * @type {number}
     * @memberof GetCEMRecordInfoOutput
     */
    petId?: number;

    /**
     * 宠物名称
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    petName?: string | null;

    /**
     * 性别 (0 公 1 母 2 未知)
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    petGender?: string | null;

    /**
     * 性别 (公 母 未知)
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    petGenderText?: string | null;

    /**
     * 生日
     *
     * @type {Date}
     * @memberof GetCEMRecordInfoOutput
     */
    petBirthDate?: Date | null;

    /**
     * 宠物种类
     *
     * @type {number}
     * @memberof GetCEMRecordInfoOutput
     */
    petKind?: number | null;

    /**
     * 宠物种类别名
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    petKindText?: string | null;

    /**
     * 宠物毛色
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    petColor?: string | null;

    /**
     * 宠物毛色别名
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    petColorText?: string | null;

    /**
     * 病例编号
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    orderNo?: string | null;

    /**
     * @type {ZhuSuOutput}
     * @memberof GetCEMRecordInfoOutput
     */
    zhuSu?: ZhuSuOutput;

    /**
     * @type {PhysicalOutput}
     * @memberof GetCEMRecordInfoOutput
     */
    physical?: PhysicalOutput;

    /**
     * 处方
     *
     * @type {Array<PrescriptionOutput>}
     * @memberof GetCEMRecordInfoOutput
     */
    prescriptions?: Array<PrescriptionOutput> | null;

    /**
     * 化验
     *
     * @type {Array<TestOutput>}
     * @memberof GetCEMRecordInfoOutput
     */
    tests?: Array<TestOutput> | null;

    /**
     * 疾病诊断
     *
     * @type {Array<DiagnosisOutput>}
     * @memberof GetCEMRecordInfoOutput
     */
    diagnoses?: Array<DiagnosisOutput> | null;

    /**
     * 医嘱
     *
     * @type {string}
     * @memberof GetCEMRecordInfoOutput
     */
    adviceText?: string | null;
}
