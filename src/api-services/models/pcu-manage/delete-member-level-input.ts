/* tslint:disable */
/* eslint-disable */
/**
 * 会员管理
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
 * 
 *
 * @export
 * @interface DeleteMemberLevelInput
 */
export interface DeleteMemberLevelInput {

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof DeleteMemberLevelInput
     */
    createTime?: Date | null;

    /**
     * 更新时间
     *
     * @type {Date}
     * @memberof DeleteMemberLevelInput
     */
    updateTime?: Date | null;

    /**
     * 创建者Id
     *
     * @type {number}
     * @memberof DeleteMemberLevelInput
     */
    createUserId?: number | null;

    /**
     * 修改者Id
     *
     * @type {number}
     * @memberof DeleteMemberLevelInput
     */
    updateUserId?: number | null;

    /**
     * 软删除
     *
     * @type {boolean}
     * @memberof DeleteMemberLevelInput
     */
    isDelete?: boolean;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof DeleteMemberLevelInput
     */
    ver?: string | null;

    /**
     * 创建者部门名称
     *
     * @type {string}
     * @memberof DeleteMemberLevelInput
     */
    createOrgName?: string | null;

    /**
     * 修改者姓名
     *
     * @type {string}
     * @memberof DeleteMemberLevelInput
     */
    updateUserName?: string | null;

    /**
     * 创建者姓名
     *
     * @type {string}
     * @memberof DeleteMemberLevelInput
     */
    createUserName?: string | null;

    /**
     * 主键Id
     *
     * @type {number}
     * @memberof DeleteMemberLevelInput
     */
    id: number;
}
