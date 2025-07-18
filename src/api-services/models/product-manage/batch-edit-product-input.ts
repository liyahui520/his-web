/* tslint:disable */
/* eslint-disable */
/**
 * 产品扩展服务
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ProductTypeEnums } from './product-type-enums';
/**
 * 批量编辑产品请求参数
 * @export
 * @interface BatchEditProductInput
 */
export interface BatchEditProductInput {
    /**
     * Id
     * @type {Array<number>}
     * @memberof BatchEditProductInput
     */
    ids?: Array<number> | null;
    /**
     * 
     * @type {ProductTypeEnums}
     * @memberof BatchEditProductInput
     */
    productType?: ProductTypeEnums;
    /**
     * 编辑目录Id
     * @type {boolean}
     * @memberof BatchEditProductInput
     */
    editCategory?: boolean;
    /**
     * 目录Id
     * @type {number}
     * @memberof BatchEditProductInput
     */
    categoryId?: number;
    /**
     * 目标供应商Id
     * @type {number}
     * @memberof BatchEditProductInput
     */
    providerId?: number | null;
    /**
     * 目标生产商ID
     * @type {number}
     * @memberof BatchEditProductInput
     */
    manufacturerId?: number | null;
    /**
     * 可销
     * @type {boolean}
     * @memberof BatchEditProductInput
     */
    canSale?: boolean | null;
    /**
     * 可订
     * @type {boolean}
     * @memberof BatchEditProductInput
     */
    canOrder?: boolean | null;
    /**
     * 可盘
     * @type {boolean}
     * @memberof BatchEditProductInput
     */
    canCable?: boolean | null;
    /**
     * 参与打折
     * @type {boolean}
     * @memberof BatchEditProductInput
     */
    isDiscount?: boolean | null;
}
