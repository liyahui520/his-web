/* tslint:disable */
/* eslint-disable */
/**
 * 会员押金
 * <br/><u><b><font color='FF0000'> 👮不得利用本项目从事危害国家安全、扰乱社会秩序、侵犯他人合法权益等法律法规禁止的活动！任何基于本项目二次开发而产生的一切法律纠纷和责任，我们不承担任何责任！</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { MemberDepositDetailDto } from './member-deposit-detail-dto';
 /**
 * 分页泛型集合
 *
 * @export
 * @interface SqlSugarPagedListMemberDepositDetailDto
 */
export interface SqlSugarPagedListMemberDepositDetailDto {

    /**
     * 页码
     *
     * @type {number}
     * @memberof SqlSugarPagedListMemberDepositDetailDto
     */
    page?: number;

    /**
     * 页容量
     *
     * @type {number}
     * @memberof SqlSugarPagedListMemberDepositDetailDto
     */
    pageSize?: number;

    /**
     * 总条数
     *
     * @type {number}
     * @memberof SqlSugarPagedListMemberDepositDetailDto
     */
    total?: number;

    /**
     * 总页数
     *
     * @type {number}
     * @memberof SqlSugarPagedListMemberDepositDetailDto
     */
    totalPages?: number;

    /**
     * 当前页集合
     *
     * @type {Array<MemberDepositDetailDto>}
     * @memberof SqlSugarPagedListMemberDepositDetailDto
     */
    items?: Array<MemberDepositDetailDto> | null;

    /**
     * 是否有上一页
     *
     * @type {boolean}
     * @memberof SqlSugarPagedListMemberDepositDetailDto
     */
    hasPrevPage?: boolean;

    /**
     * 是否有下一页
     *
     * @type {boolean}
     * @memberof SqlSugarPagedListMemberDepositDetailDto
     */
    hasNextPage?: boolean;
}
