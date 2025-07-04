/* tslint:disable */
/* eslint-disable */
/**
 * 病例相关打印
 * <br/><u><b><font color='FF0000'> 👮不得利用本项目从事危害国家安全、扰乱社会秩序、侵犯他人合法权益等法律法规禁止的活动！任何基于本项目二次开发而产生的一切法律纠纷和责任，我们不承担任何责任！</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { ProductTypeEnums } from './product-type-enums';
 /**
 * 处方明细
 *
 * @export
 * @interface PrescriptionItemOutput
 */
export interface PrescriptionItemOutput {

    /**
     * 处方主表id
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    prescriptionId?: number;

    /**
     * 项目id
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    itemId?: number;

    /**
     * 项目名称
     *
     * @type {string}
     * @memberof PrescriptionItemOutput
     */
    itemName?: string | null;

    /**
     * @type {ProductTypeEnums}
     * @memberof PrescriptionItemOutput
     */
    type?: ProductTypeEnums;

    /**
     * 产品类型
     *
     * @type {string}
     * @memberof PrescriptionItemOutput
     */
    typeText?: string | null;

    /**
     * 单位id
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    unitId?: number | null;

    /**
     * 单位名称
     *
     * @type {string}
     * @memberof PrescriptionItemOutput
     */
    unitName?: string | null;

    /**
     * 规格
     *
     * @type {string}
     * @memberof PrescriptionItemOutput
     */
    specific?: string | null;

    /**
     * 单次用量
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    useDose?: number | null;

    /**
     * 次/天
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    useMethods?: number | null;

    /**
     * 天数
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    dayNum?: number | null;

    /**
     * 总次数
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    amountCount?: number | null;

    /**
     * 处方医生Id
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    doctorId?: number;

    /**
     * 处方医生
     *
     * @type {string}
     * @memberof PrescriptionItemOutput
     */
    doctorName?: string | null;

    /**
     * 数量
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    count?: number;

    /**
     * 单价
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    salePrice?: number;

    /**
     * 总金额
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    amountPrice?: number;

    /**
     * 是否打包
     *
     * @type {boolean}
     * @memberof PrescriptionItemOutput
     */
    isPack?: boolean;

    /**
     * 使用方式
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    dosingWay?: number;

    /**
     * 分组
     *
     * @type {number}
     * @memberof PrescriptionItemOutput
     */
    orderId?: number | null;

    /**
     * 分组
     *
     * @type {string}
     * @memberof PrescriptionItemOutput
     */
    orderName?: string | null;
}
