/* tslint:disable */
/* eslint-disable */
/**
 * 宠物配置管理
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
 * 模糊查询条件
 *
 * @export
 * @interface Search
 */
export interface Search {

    /**
     * 字段名称集合
     *
     * @type {Array<string>}
     * @memberof Search
     */
    fields?: Array<string> | null;

    /**
     * 关键字
     *
     * @type {string}
     * @memberof Search
     */
    keyword?: string | null;
}
