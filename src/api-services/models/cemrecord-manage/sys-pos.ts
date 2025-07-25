/* tslint:disable */
/* eslint-disable */
/**
 * 病例管理
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { StatusEnum } from './status-enum';
import { SysUser } from './sys-user';
/**
 * 系统职位表
 * @export
 * @interface SysPos
 */
export interface SysPos {
    /**
     * 雪花Id
     * @type {number}
     * @memberof SysPos
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof SysPos
     */
    createTime?: Date | null;
    /**
     * 更新时间
     * @type {Date}
     * @memberof SysPos
     */
    updateTime?: Date | null;
    /**
     * 创建者Id
     * @type {number}
     * @memberof SysPos
     */
    createUserId?: number | null;
    /**
     * 
     * @type {SysUser}
     * @memberof SysPos
     */
    createUser?: SysUser;
    /**
     * 创建者姓名
     * @type {string}
     * @memberof SysPos
     */
    createUserName?: string | null;
    /**
     * 修改者Id
     * @type {number}
     * @memberof SysPos
     */
    updateUserId?: number | null;
    /**
     * 
     * @type {SysUser}
     * @memberof SysPos
     */
    updateUser?: SysUser;
    /**
     * 修改者姓名
     * @type {string}
     * @memberof SysPos
     */
    updateUserName?: string | null;
    /**
     * 软删除
     * @type {boolean}
     * @memberof SysPos
     */
    isDelete?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SysPos
     */
    ver?: string | null;
    /**
     * 租户Id
     * @type {number}
     * @memberof SysPos
     */
    tenantId?: number | null;
    /**
     * 名称
     * @type {string}
     * @memberof SysPos
     */
    name: string;
    /**
     * 编码
     * @type {string}
     * @memberof SysPos
     */
    code?: string | null;
    /**
     * 排序
     * @type {number}
     * @memberof SysPos
     */
    orderNo?: number;
    /**
     * 备注
     * @type {string}
     * @memberof SysPos
     */
    remark?: string | null;
    /**
     * 
     * @type {StatusEnum}
     * @memberof SysPos
     */
    status?: StatusEnum;
}
