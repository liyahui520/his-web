/* tslint:disable */
/* eslint-disable */
/**
 * 病例管理
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
 * @interface CEMRecordFollow
 */
export interface CEMRecordFollow {

    /**
     * 雪花Id
     *
     * @type {number}
     * @memberof CEMRecordFollow
     */
    id?: number;

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof CEMRecordFollow
     */
    createTime?: Date;

    /**
     * 更新时间
     *
     * @type {Date}
     * @memberof CEMRecordFollow
     */
    updateTime?: Date | null;

    /**
     * 创建者Id
     *
     * @type {number}
     * @memberof CEMRecordFollow
     */
    createUserId?: number | null;

    /**
     * 创建者姓名
     *
     * @type {string}
     * @memberof CEMRecordFollow
     */
    createUserName?: string | null;

    /**
     * 修改者Id
     *
     * @type {number}
     * @memberof CEMRecordFollow
     */
    updateUserId?: number | null;

    /**
     * 修改者姓名
     *
     * @type {string}
     * @memberof CEMRecordFollow
     */
    updateUserName?: string | null;

    /**
     * 软删除
     *
     * @type {boolean}
     * @memberof CEMRecordFollow
     */
    isDelete?: boolean;

    /**
     * @type {string}
     * @memberof CEMRecordFollow
     */
    ver?: string | null;

    /**
     * 创建者部门Id
     *
     * @type {number}
     * @memberof CEMRecordFollow
     */
    createOrgId?: number | null;

    /**
     * 创建者部门名称
     *
     * @type {string}
     * @memberof CEMRecordFollow
     */
    createOrgName?: string | null;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof CEMRecordFollow
     */
    tenantId?: number | null;

    /**
     * 病例id
     *
     * @type {number}
     * @memberof CEMRecordFollow
     */
    recordId?: number;

    /**
     * 挂号id
     *
     * @type {number}
     * @memberof CEMRecordFollow
     */
    regId?: number;
}
