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
 * 打印化验明细集合
 *
 * @export
 * @interface PrintPaperItemDto
 */
export interface PrintPaperItemDto {

    /**
     * 项目名称
     *
     * @type {string}
     * @memberof PrintPaperItemDto
     */
    name?: string | null;

    /**
     * 单位
     *
     * @type {string}
     * @memberof PrintPaperItemDto
     */
    unit?: string | null;

    /**
     * 临床意义
     *
     * @type {string}
     * @memberof PrintPaperItemDto
     */
    remark?: string | null;

    /**
     * 最大值
     *
     * @type {string}
     * @memberof PrintPaperItemDto
     */
    maxValue?: string | null;

    /**
     * 最小值
     *
     * @type {string}
     * @memberof PrintPaperItemDto
     */
    minValue?: string | null;

    /**
     * 结果值
     *
     * @type {string}
     * @memberof PrintPaperItemDto
     */
    resultValue?: string | null;
}
