/* tslint:disable */
/* eslint-disable */
/**
 * 库存管理
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { OrderStatusEnum } from './order-status-enum';
import { OutOrderTypeEnum } from './out-order-type-enum';
import { OutStorageDetails } from './out-storage-details';
/**
 * 出库单
 * @export
 * @interface OutStorage
 */
export interface OutStorage {
    /**
     * 雪花Id
     * @type {number}
     * @memberof OutStorage
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof OutStorage
     */
    createTime?: Date | null;
    /**
     * 更新时间
     * @type {Date}
     * @memberof OutStorage
     */
    updateTime?: Date | null;
    /**
     * 创建者Id
     * @type {number}
     * @memberof OutStorage
     */
    createUserId?: number | null;
    /**
     * 修改者Id
     * @type {number}
     * @memberof OutStorage
     */
    updateUserId?: number | null;
    /**
     * 软删除
     * @type {boolean}
     * @memberof OutStorage
     */
    isDelete?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OutStorage
     */
    ver?: string | null;
    /**
     * 创建者部门Id
     * @type {number}
     * @memberof OutStorage
     */
    createOrgId?: number | null;
    /**
     * 租户Id
     * @type {number}
     * @memberof OutStorage
     */
    tenantId?: number | null;
    /**
     * 出库单号
     * @type {string}
     * @memberof OutStorage
     */
    orderNo?: string | null;
    /**
     * 总项目数
     * @type {number}
     * @memberof OutStorage
     */
    inCount?: number;
    /**
     * 总金额
     * @type {number}
     * @memberof OutStorage
     */
    amount?: number;
    /**
     * 入库人
     * @type {number}
     * @memberof OutStorage
     */
    inOperator?: number;
    /**
     * 入库人名称
     * @type {string}
     * @memberof OutStorage
     */
    inOperatorName?: string | null;
    /**
     * 
     * @type {OutOrderTypeEnum}
     * @memberof OutStorage
     */
    type?: OutOrderTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof OutStorage
     */
    typeName?: string | null;
    /**
     * 供应商id
     * @type {number}
     * @memberof OutStorage
     */
    providerId?: number;
    /**
     * 供应商名称
     * @type {string}
     * @memberof OutStorage
     */
    providerName?: string | null;
    /**
     * 
     * @type {OrderStatusEnum}
     * @memberof OutStorage
     */
    status?: OrderStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof OutStorage
     */
    statusName?: string | null;
    /**
     * 审核时间
     * @type {Date}
     * @memberof OutStorage
     */
    examineDate?: Date | null;
    /**
     * 审核人id
     * @type {number}
     * @memberof OutStorage
     */
    examineId?: number | null;
    /**
     * 审核人名称
     * @type {string}
     * @memberof OutStorage
     */
    examineName?: string | null;
    /**
     * 备注
     * @type {string}
     * @memberof OutStorage
     */
    remark?: string | null;
    /**
     * 
     * @type {Array<OutStorageDetails>}
     * @memberof OutStorage
     */
    outStorageDetails?: Array<OutStorageDetails> | null;
}
