/* tslint:disable */
/* eslint-disable */
/**
 * 住院留观
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
 * @interface DeleteInHospitalNursesInput
 */
export interface DeleteInHospitalNursesInput {

    /**
     * 主键Id
     *
     * @type {number}
     * @memberof DeleteInHospitalNursesInput
     */
    id?: number;

    /**
     * 用户Id
     *
     * @type {number}
     * @memberof DeleteInHospitalNursesInput
     */
    customerId?: number;

    /**
     * 住院Id
     *
     * @type {number}
     * @memberof DeleteInHospitalNursesInput
     */
    inHospitalId?: number;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof DeleteInHospitalNursesInput
     */
    ver?: string | null;
}
