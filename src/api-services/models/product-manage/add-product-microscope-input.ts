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

import { ProductMedicationInspectionDetails } from './product-medication-inspection-details';
import { ProductMedicationRelations } from './product-medication-relations';
import { ProductTypeEnums } from './product-type-enums';
 /**
 * 
 *
 * @export
 * @interface AddProductMicroscopeInput
 */
export interface AddProductMicroscopeInput {

    /**
     * Id
     *
     * @type {number}
     * @memberof AddProductMicroscopeInput
     */
    id?: number;

    /**
     * @type {ProductTypeEnums}
     * @memberof AddProductMicroscopeInput
     */
    type?: ProductTypeEnums;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof AddProductMicroscopeInput
     */
    tenantId?: number;

    /**
     * 名称
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    name?: string | null;

    /**
     * 目录ID
     *
     * @type {number}
     * @memberof AddProductMicroscopeInput
     */
    categoryId?: number;

    /**
     * 目录名称
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    categoryName?: string | null;

    /**
     * 条形码
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    barCode?: string | null;

    /**
     * 缩写
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    nameLetter?: string | null;

    /**
     * 英文名称
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    englishName?: string | null;

    /**
     * 通用名称
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    commonName?: string | null;

    /**
     * 库存个数
     *
     * @type {number}
     * @memberof AddProductMicroscopeInput
     */
    count?: number;

    /**
     * 成本价
     *
     * @type {number}
     * @memberof AddProductMicroscopeInput
     */
    costPrice?: number;

    /**
     * 销售价格
     *
     * @type {number}
     * @memberof AddProductMicroscopeInput
     */
    salePrice?: number;

    /**
     * 会员价格
     *
     * @type {number}
     * @memberof AddProductMicroscopeInput
     */
    memberPrice?: number;

    /**
     * 编码
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    serialNumber?: string | null;

    /**
     * 是否参与打折
     *
     * @type {boolean}
     * @memberof AddProductMicroscopeInput
     */
    isDiscount?: boolean;

    /**
     * 是否允许零库存
     *
     * @type {boolean}
     * @memberof AddProductMicroscopeInput
     */
    isZeroSale?: boolean;

    /**
     * 可销
     *
     * @type {boolean}
     * @memberof AddProductMicroscopeInput
     */
    canSale?: boolean;

    /**
     * 可订
     *
     * @type {boolean}
     * @memberof AddProductMicroscopeInput
     */
    canOrder?: boolean;

    /**
     * 投药单位ID
     *
     * @type {number}
     * @memberof AddProductMicroscopeInput
     */
    outUnitId?: number;

    /**
     * 投药单位名称
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    outUnitName?: string | null;

    /**
     * 注意事项
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    notice?: string | null;

    /**
     * 备注
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    remark?: string | null;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    ver?: string | null;

    /**
     * 可盘
     *
     * @type {boolean}
     * @memberof AddProductMicroscopeInput
     */
    canCable?: boolean;

    /**
     * 停用
     *
     * @type {boolean}
     * @memberof AddProductMicroscopeInput
     */
    isDisable?: boolean;

    /**
     * 标识id
     *
     * @type {number}
     * @memberof AddProductMicroscopeInput
     */
    tagId?: number | null;

    /**
     * 标识名称
     *
     * @type {string}
     * @memberof AddProductMicroscopeInput
     */
    tagName?: string | null;

    /**
     * 化验/显微镜 检查项目明细
     *
     * @type {Array<ProductMedicationInspectionDetails>}
     * @memberof AddProductMicroscopeInput
     */
    productMedicationInspectionDetails?: Array<ProductMedicationInspectionDetails> | null;

    /**
     * 处置/化验/显微镜  关联  消耗品/试纸
     *
     * @type {Array<ProductMedicationRelations>}
     * @memberof AddProductMicroscopeInput
     */
    productMedicationRelations?: Array<ProductMedicationRelations> | null;
}
