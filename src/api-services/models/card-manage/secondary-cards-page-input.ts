/* tslint:disable */
/* eslint-disable */
/**
 * 次卡管理
 * <br/><u><b><font color='FF0000'> 👮不得利用本项目从事危害国家安全、扰乱社会秩序、侵犯他人合法权益等法律法规禁止的活动！任何基于本项目二次开发而产生的一切法律纠纷和责任，我们不承担任何责任！</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { MemberCardStatusEnum } from './member-card-status-enum';
 /**
 * 
 *
 * @export
 * @interface SecondaryCardsPageInput
 */
export interface SecondaryCardsPageInput {

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof SecondaryCardsPageInput
     */
    createTime?: Date | null;

    /**
     * 更新时间
     *
     * @type {Date}
     * @memberof SecondaryCardsPageInput
     */
    updateTime?: Date | null;

    /**
     * 创建者Id
     *
     * @type {number}
     * @memberof SecondaryCardsPageInput
     */
    createUserId?: number | null;

    /**
     * 修改者Id
     *
     * @type {number}
     * @memberof SecondaryCardsPageInput
     */
    updateUserId?: number | null;

    /**
     * 软删除
     *
     * @type {boolean}
     * @memberof SecondaryCardsPageInput
     */
    isDelete?: boolean;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof SecondaryCardsPageInput
     */
    ver?: string | null;

    /**
     * 创建者部门名称
     *
     * @type {string}
     * @memberof SecondaryCardsPageInput
     */
    createOrgName?: string | null;

    /**
     * 修改者姓名
     *
     * @type {string}
     * @memberof SecondaryCardsPageInput
     */
    updateUserName?: string | null;

    /**
     * 创建者姓名
     *
     * @type {string}
     * @memberof SecondaryCardsPageInput
     */
    createUserName?: string | null;

    /**
     * 当前页码
     *
     * @type {number}
     * @memberof SecondaryCardsPageInput
     */
    page?: number;

    /**
     * 页码容量
     *
     * @type {number}
     * @memberof SecondaryCardsPageInput
     */
    pageSize?: number;

    /**
     * 排序字段
     *
     * @type {string}
     * @memberof SecondaryCardsPageInput
     */
    field?: string | null;

    /**
     * 排序方向
     *
     * @type {string}
     * @memberof SecondaryCardsPageInput
     */
    order?: string | null;

    /**
     * 降序排序
     *
     * @type {string}
     * @memberof SecondaryCardsPageInput
     */
    descStr?: string | null;

    /**
     * @type {MemberCardStatusEnum}
     * @memberof SecondaryCardsPageInput
     */
    status?: MemberCardStatusEnum;
}
