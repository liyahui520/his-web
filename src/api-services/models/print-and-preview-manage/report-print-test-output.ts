/* tslint:disable */
/* eslint-disable */
/**
 * 打印和预览相关服务
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { PrintTestItemDto } from './print-test-item-dto';
 /**
 * 化验报告返回对象
 *
 * @export
 * @interface ReportPrintTestOutput
 */
export interface ReportPrintTestOutput {

    /**
     * 机构名称
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    createOrgName?: string | null;

    /**
     * 机构地址
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    orgAddress?: string | null;

    /**
     * 机构Logo
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    orgImg?: string | null;

    /**
     * 机构联系方式
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    orgPhone?: string | null;

    /**
     * 机构名称
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    customerName?: string | null;

    /**
     * 客户电话
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    customerPhone?: string | null;

    /**
     * 用户编号
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    cardNumber?: string | null;

    /**
     * 宠物名称
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    petName?: string | null;

    /**
     * 宠物性别
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    petGenderText?: string | null;

    /**
     * 病历号码
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    serialNumber?: string | null;

    /**
     * 宠物出生日期
     *
     * @type {Date}
     * @memberof ReportPrintTestOutput
     */
    petBirthDate?: Date | null;

    /**
     * 宠物年龄
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    petAgeText?: string | null;

    /**
     * 宠物体重
     *
     * @type {number}
     * @memberof ReportPrintTestOutput
     */
    petWeight?: number | null;

    /**
     * 宠物毛色
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    petColorText?: string | null;

    /**
     * 宠物种类别名
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    petKindText?: string | null;

    /**
     * 宠物品种别名
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    petVarietieText?: string | null;

    /**
     * 犬证号码
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    petIdentityNumber?: string | null;

    /**
     * 兽医证号
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    doctorIdNumber?: string | null;

    /**
     * 化验编号   暂时取化验单ID  T+化验单ID
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    orderNo?: string | null;

    /**
     * 检查时间
     *
     * @type {Date}
     * @memberof ReportPrintTestOutput
     */
    createTime?: Date | null;

    /**
     * 检查医生名称
     *
     * @type {string}
     * @memberof ReportPrintTestOutput
     */
    doctorName?: string | null;

    /**
     * 化验明细
     *
     * @type {Array<PrintTestItemDto>}
     * @memberof ReportPrintTestOutput
     */
    testItems?: Array<PrintTestItemDto> | null;
}
