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

 /**
 * 
 *
 * @export
 * @interface PrescriptionPrintOutput
 */
export interface PrescriptionPrintOutput {

    /**
     * 处方Id
     *
     * @type {number}
     * @memberof PrescriptionPrintOutput
     */
    id?: number;

    /**
     * 打印时间
     *
     * @type {Date}
     * @memberof PrescriptionPrintOutput
     */
    printTime?: Date;

    /**
     * 开具时间
     *
     * @type {Date}
     * @memberof PrescriptionPrintOutput
     */
    createTime?: Date | null;

    /**
     * 医院名称
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    createOrgName?: string | null;

    /**
     * 用户名称
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    customerName?: string | null;

    /**
     * 用户手机号码
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    cellPhone?: string | null;

    /**
     * 会员编号
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    cardNumber?: string | null;

    /**
     * 动物名称
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    petName?: string | null;

    /**
     * 动物性别
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    petGenderText?: string | null;

    /**
     * 宠物-病例号
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    serialNumber?: string | null;

    /**
     * 体重
     *
     * @type {number}
     * @memberof PrescriptionPrintOutput
     */
    petWeight?: number | null;

    /**
     * 宠物出生日期
     *
     * @type {Date}
     * @memberof PrescriptionPrintOutput
     */
    petBirthDate?: Date | null;

    /**
     * 宠物年龄
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    petAge?: string | null;

    /**
     * 动物种类
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    petKindText?: string | null;

    /**
     * 动物品种
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    petVarietieText?: string | null;

    /**
     * 犬证号码
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    petIdentityNumber?: string | null;

    /**
     * 动物毛色
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    petColorText?: string | null;

    /**
     * 主管诊断
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    diagnose?: string | null;

    /**
     * 总金额
     *
     * @type {number}
     * @memberof PrescriptionPrintOutput
     */
    totalAmount?: number | null;

    /**
     * 折扣金额
     *
     * @type {number}
     * @memberof PrescriptionPrintOutput
     */
    discountAmount?: number | null;

    /**
     * 抹零金额
     *
     * @type {number}
     * @memberof PrescriptionPrintOutput
     */
    downIntegerAmount?: number | null;

    /**
     * 实付金额
     *
     * @type {number}
     * @memberof PrescriptionPrintOutput
     */
    actlyAmount?: number | null;

    /**
     * 支付时间
     *
     * @type {Date}
     * @memberof PrescriptionPrintOutput
     */
    payTime?: Date | null;

    /**
     * 兽医证号
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    doctorIdNumber?: string | null;

    /**
     * 执业兽医师
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    doctorName?: string | null;

    /**
     * 打印模板
     *
     * @type {string}
     * @memberof PrescriptionPrintOutput
     */
    template?: string | null;
}
