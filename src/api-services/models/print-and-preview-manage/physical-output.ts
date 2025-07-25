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
 * 体格检查
 *
 * @export
 * @interface PhysicalOutput
 */
export interface PhysicalOutput {

    /**
     * 体重
     *
     * @type {number}
     * @memberof PhysicalOutput
     */
    petWeight?: number | null;

    /**
     * 体温
     *
     * @type {number}
     * @memberof PhysicalOutput
     */
    temperature?: number | null;

    /**
     * 呼吸频率
     *
     * @type {number}
     * @memberof PhysicalOutput
     */
    respiratoryRate?: number | null;

    /**
     * CRT(S)
     *
     * @type {number}
     * @memberof PhysicalOutput
     */
    crt?: number | null;

    /**
     * BCS评分
     *
     * @type {number}
     * @memberof PhysicalOutput
     */
    bcs?: number | null;

    /**
     * 心率
     *
     * @type {number}
     * @memberof PhysicalOutput
     */
    heartRate?: number | null;
}
