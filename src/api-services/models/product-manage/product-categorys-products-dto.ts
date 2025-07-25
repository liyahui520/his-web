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

import { ProductDrugs } from './product-drugs';
 /**
 * 
 *
 * @export
 * @interface ProductCategorysProductsDto
 */
export interface ProductCategorysProductsDto {

    /**
     * Id
     *
     * @type {number}
     * @memberof ProductCategorysProductsDto
     */
    id?: number;

    /**
     * 目录名称
     *
     * @type {string}
     * @memberof ProductCategorysProductsDto
     */
    label?: string | null;

    /**
     * 父级id 为0则为根基目录
     *
     * @type {number}
     * @memberof ProductCategorysProductsDto
     */
    parentId?: number;

    /**
     * @type {string}
     * @memberof ProductCategorysProductsDto
     */
    name?: string | null;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof ProductCategorysProductsDto
     */
    ver?: string | null;

    /**
     * @type {number}
     * @memberof ProductCategorysProductsDto
     */
    tenantId?: number | null;

    /**
     * @type {boolean}
     * @memberof ProductCategorysProductsDto
     */
    isPro?: boolean;

    /**
     * @type {boolean}
     * @memberof ProductCategorysProductsDto
     */
    disabled?: boolean;

    /**
     * @type {ProductDrugs}
     * @memberof ProductCategorysProductsDto
     */
    product?: ProductDrugs;

    /**
     * 子集集合
     *
     * @type {Array<ProductCategorysProductsDto>}
     * @memberof ProductCategorysProductsDto
     */
    children?: Array<ProductCategorysProductsDto> | null;

    /**
     * @type {Array<ProductCategorysProductsDto>}
     * @memberof ProductCategorysProductsDto
     */
    childrenTree?: Array<ProductCategorysProductsDto> | null;
}
