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

 /**
 * 化验打印
 *
 * @export
 * @interface TestPrintInput
 */
export interface TestPrintInput {

    /**
     * 化验ID
     *
     * @type {number}
     * @memberof TestPrintInput
     */
    testId?: number;

    /**
     * 病例ID
     *
     * @type {number}
     * @memberof TestPrintInput
     */
    recordId?: number;

    /**
     * 挂号ID
     *
     * @type {number}
     * @memberof TestPrintInput
     */
    regId?: number;
}
