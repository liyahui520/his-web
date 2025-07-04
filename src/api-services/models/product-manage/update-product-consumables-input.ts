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

 /**
 * 
 *
 * @export
 * @interface UpdateProductConsumablesInput
 */
export interface UpdateProductConsumablesInput {

    /**
     * 产品类型
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    type?: string | null;

    /**
     * 商品名称
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    name?: string | null;

    /**
     * 目录ID
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    categoryId?: number;

    /**
     * 目录名称
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    categoryName?: string | null;

    /**
     * 可盘
     *
     * @type {boolean}
     * @memberof UpdateProductConsumablesInput
     */
    canCable?: boolean;

    /**
     * 条形码
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    barCode?: string | null;

    /**
     * 产品编码
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    serialNumber?: string | null;

    /**
     * 供应商ID
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    providerId?: number;

    /**
     * 供应商名称
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    providerName?: string | null;

    /**
     * 生产商ID
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    manufacturerId?: number;

    /**
     * 生产商名称
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    manufacturerName?: string | null;

    /**
     * 库存
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    count?: number;

    /**
     * 缩写
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    nameLetter?: string | null;

    /**
     * 英文名称
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    englishName?: string | null;

    /**
     * 通用名称
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    commonName?: string | null;

    /**
     * 成本价
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    costPrice?: number;

    /**
     * 销售价格
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    salePrice?: number;

    /**
     * 会员价格
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    memberPrice?: number;

    /**
     * 是否参与打折
     *
     * @type {boolean}
     * @memberof UpdateProductConsumablesInput
     */
    isDiscount?: boolean;

    /**
     * 是否允许零库存
     *
     * @type {boolean}
     * @memberof UpdateProductConsumablesInput
     */
    isZeroSale?: boolean;

    /**
     * 可销
     *
     * @type {boolean}
     * @memberof UpdateProductConsumablesInput
     */
    canSale?: boolean;

    /**
     * 可订
     *
     * @type {boolean}
     * @memberof UpdateProductConsumablesInput
     */
    canOrder?: boolean;

    /**
     * 入库单位ID
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    inUnitId?: number;

    /**
     * 入库单位名称
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    inUnitName?: string | null;

    /**
     * 出库单位ID
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    outUnitId?: number;

    /**
     * 出库单位名称
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    outUnitName?: string | null;

    /**
     * 入库转换因子
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    inSpecific?: number;

    /**
     * 品牌ID
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    brandId?: number;

    /**
     * 品牌名称
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    brandName?: string | null;

    /**
     * 备注
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    remark?: string | null;

    /**
     * 注意事项
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    notice?: string | null;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof UpdateProductConsumablesInput
     */
    ver?: string | null;

    /**
     * Id
     *
     * @type {number}
     * @memberof UpdateProductConsumablesInput
     */
    id: number;
}
