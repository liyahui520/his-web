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
 * 
 *
 * @export
 * @interface AddSysPetVarietieInput
 */
export interface AddSysPetVarietieInput {

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof AddSysPetVarietieInput
     */
    createTime?: Date | null;

    /**
     * 更新时间
     *
     * @type {Date}
     * @memberof AddSysPetVarietieInput
     */
    updateTime?: Date | null;

    /**
     * 创建者Id
     *
     * @type {number}
     * @memberof AddSysPetVarietieInput
     */
    createUserId?: number | null;

    /**
     * 修改者Id
     *
     * @type {number}
     * @memberof AddSysPetVarietieInput
     */
    updateUserId?: number | null;

    /**
     * 软删除
     *
     * @type {boolean}
     * @memberof AddSysPetVarietieInput
     */
    isDelete?: boolean;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof AddSysPetVarietieInput
     */
    ver?: string | null;

    /**
     * 创建者部门名称
     *
     * @type {string}
     * @memberof AddSysPetVarietieInput
     */
    createOrgName?: string | null;

    /**
     * 修改者姓名
     *
     * @type {string}
     * @memberof AddSysPetVarietieInput
     */
    updateUserName?: string | null;

    /**
     * 创建者姓名
     *
     * @type {string}
     * @memberof AddSysPetVarietieInput
     */
    createUserName?: string | null;

    /**
     * 种类名称
     *
     * @type {string}
     * @memberof AddSysPetVarietieInput
     */
    name?: string | null;

    /**
     * 序号
     *
     * @type {number}
     * @memberof AddSysPetVarietieInput
     */
    order?: number;

    /**
     * 英文名称
     *
     * @type {string}
     * @memberof AddSysPetVarietieInput
     */
    englishName?: string | null;

    /**
     * 种类id
     *
     * @type {number}
     * @memberof AddSysPetVarietieInput
     */
    kindId?: number;
}
