/* tslint:disable */
/* eslint-disable */
/**
 * 实验室管理
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { CEMDocPayTypeEnum } from './cemdoc-pay-type-enum';
import { CEMRecordTestItemResult } from './cemrecord-test-item-result';
import { ProductTypeEnums } from './product-type-enums';
 /**
 * 
 *
 * @export
 * @interface ReportImageOutput
 */
export interface ReportImageOutput {

    /**
     * 化验项目明细
     *
     * @type {number}
     * @memberof ReportImageOutput
     */
    id?: number;

    /**
     * 病例ID
     *
     * @type {number}
     * @memberof ReportImageOutput
     */
    recordId?: number;

    /**
     * 挂号ID
     *
     * @type {number}
     * @memberof ReportImageOutput
     */
    regId?: number;

    /**
     * 宠主ID
     *
     * @type {number}
     * @memberof ReportImageOutput
     */
    customerId?: number;

    /**
     * 宠主名称
     *
     * @type {string}
     * @memberof ReportImageOutput
     */
    customerName?: string | null;

    /**
     * 宠物ID
     *
     * @type {number}
     * @memberof ReportImageOutput
     */
    petId?: number;

    /**
     * 宠物名称
     *
     * @type {string}
     * @memberof ReportImageOutput
     */
    petName?: string | null;

    /**
     * 宠物种类
     *
     * @type {number}
     * @memberof ReportImageOutput
     */
    petKind?: number | null;

    /**
     * 宠物种类别名
     *
     * @type {string}
     * @memberof ReportImageOutput
     */
    petKindText?: string | null;

    /**
     * 宠物品种
     *
     * @type {number}
     * @memberof ReportImageOutput
     */
    petVarietie?: number | null;

    /**
     * 宠物品种别名
     *
     * @type {string}
     * @memberof ReportImageOutput
     */
    petVarietieText?: string | null;

    /**
     * 产品id
     *
     * @type {number}
     * @memberof ReportImageOutput
     */
    itemId?: number;

    /**
     * 产品名称
     *
     * @type {string}
     * @memberof ReportImageOutput
     */
    itemName?: string | null;

    /**
     * @type {ProductTypeEnums}
     * @memberof ReportImageOutput
     */
    type?: ProductTypeEnums;

    /**
     * 产品类型文本
     *
     * @type {string}
     * @memberof ReportImageOutput
     */
    typeText?: string | null;

    /**
     * 开单时间
     *
     * @type {Date}
     * @memberof ReportImageOutput
     */
    billingTime?: Date;

    /**
     * 检查时间
     *
     * @type {Date}
     * @memberof ReportImageOutput
     */
    inspectTime?: Date | null;

    /**
     * 处方医生Id
     *
     * @type {number}
     * @memberof ReportImageOutput
     */
    doctorId?: number;

    /**
     * 处方医生
     *
     * @type {string}
     * @memberof ReportImageOutput
     */
    doctorName?: string | null;

    /**
     * @type {CEMDocPayTypeEnum}
     * @memberof ReportImageOutput
     */
    payStatus?: CEMDocPayTypeEnum;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof ReportImageOutput
     */
    ver?: string | null;

    /**
     * 备注
     *
     * @type {string}
     * @memberof ReportImageOutput
     */
    remark?: string | null;

    /**
     * 化验结果
     *
     * @type {Array<CEMRecordTestItemResult>}
     * @memberof ReportImageOutput
     */
    cemRecordTestItemResults?: Array<CEMRecordTestItemResult> | null;
}
