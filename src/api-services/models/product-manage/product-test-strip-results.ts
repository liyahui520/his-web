/* tslint:disable */
/* eslint-disable */
/**
 * 产品管理
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * Contact: liyahui360@163.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * 试纸结果表
 *
 * @export
 * @interface ProductTestStripResults
 */
export interface ProductTestStripResults {

    /**
     * 雪花Id
     *
     * @type {number}
     * @memberof ProductTestStripResults
     */
    id?: number;

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof ProductTestStripResults
     */
    createTime?: Date;

    /**
     * 更新时间
     *
     * @type {Date}
     * @memberof ProductTestStripResults
     */
    updateTime?: Date | null;

    /**
     * 创建者Id
     *
     * @type {number}
     * @memberof ProductTestStripResults
     */
    createUserId?: number | null;

    /**
     * 创建者姓名
     *
     * @type {string}
     * @memberof ProductTestStripResults
     */
    createUserName?: string | null;

    /**
     * 修改者Id
     *
     * @type {number}
     * @memberof ProductTestStripResults
     */
    updateUserId?: number | null;

    /**
     * 修改者姓名
     *
     * @type {string}
     * @memberof ProductTestStripResults
     */
    updateUserName?: string | null;

    /**
     * 软删除
     *
     * @type {boolean}
     * @memberof ProductTestStripResults
     */
    isDelete?: boolean;

    /**
     * @type {string}
     * @memberof ProductTestStripResults
     */
    ver?: string | null;

    /**
     * 创建者部门Id
     *
     * @type {number}
     * @memberof ProductTestStripResults
     */
    createOrgId?: number | null;

    /**
     * 创建者部门名称
     *
     * @type {string}
     * @memberof ProductTestStripResults
     */
    createOrgName?: string | null;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof ProductTestStripResults
     */
    tenantId?: number | null;

    /**
     * 情况  正常/异常
     *
     * @type {string}
     * @memberof ProductTestStripResults
     */
    situation?: string | null;

    /**
     * 结果
     *
     * @type {string}
     * @memberof ProductTestStripResults
     */
    result?: string | null;

    /**
     * 描述
     *
     * @type {string}
     * @memberof ProductTestStripResults
     */
    description?: string | null;

    /**
     * 产品 试纸 ID
     *
     * @type {number}
     * @memberof ProductTestStripResults
     */
    productId?: number;
}
