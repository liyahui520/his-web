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

import { Filter } from './filter';
import { ProductDosings } from './product-dosings';
import { ProductTypeEnums } from './product-type-enums';
import { Search } from './search';
 /**
 * 
 *
 * @export
 * @interface AddProductFostersInput
 */
export interface AddProductFostersInput {

    /**
     * @type {Search}
     * @memberof AddProductFostersInput
     */
    search?: Search;

    /**
     * 模糊查询关键字
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    keyword?: string | null;

    /**
     * @type {Filter}
     * @memberof AddProductFostersInput
     */
    filter?: Filter;

    /**
     * 当前页码
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    page?: number;

    /**
     * 页码容量
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    pageSize?: number;

    /**
     * 排序字段
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    field?: string | null;

    /**
     * 排序方向
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    order?: string | null;

    /**
     * 降序排序
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    descStr?: string | null;

    /**
     * Id
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    id?: number;

    /**
     * @type {ProductTypeEnums}
     * @memberof AddProductFostersInput
     */
    type?: ProductTypeEnums;

    /**
     * 产品类型
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    typeText?: string | null;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    tenantId?: number;

    /**
     * 名称
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    name?: string | null;

    /**
     * 目录ID
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    categoryId?: number;

    /**
     * 目录名称
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    categoryName?: string | null;

    /**
     * 条形码
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    barCode?: string | null;

    /**
     * 供应商ID
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    providerId?: number;

    /**
     * 供应商名称
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    providerName?: string | null;

    /**
     * 生产商ID
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    manufacturerId?: number;

    /**
     * 生产商名称
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    manufacturerName?: string | null;

    /**
     * 成分
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    ingredient?: string | null;

    /**
     * 缩写
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    nameLetter?: string | null;

    /**
     * 英文名称
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    englishName?: string | null;

    /**
     * 通用名称
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    commonName?: string | null;

    /**
     * 使用方式
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    usingMethod?: number;

    /**
     * 投药方式
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    dosingWay?: number;

    /**
     * 有无批次
     *
     * @type {boolean}
     * @memberof AddProductFostersInput
     */
    isAnaesthesia?: boolean;

    /**
     * 库存个数
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    count?: number;

    /**
     * 成本价
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    costPrice?: number;

    /**
     * 销售价格
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    salePrice?: number;

    /**
     * 会员价格
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    memberPrice?: number;

    /**
     * 编码
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    serialNumber?: string | null;

    /**
     * 是否参与打折
     *
     * @type {boolean}
     * @memberof AddProductFostersInput
     */
    isDiscount?: boolean;

    /**
     * 是否允许零库存
     *
     * @type {boolean}
     * @memberof AddProductFostersInput
     */
    isZeroSale?: boolean;

    /**
     * 可销
     *
     * @type {boolean}
     * @memberof AddProductFostersInput
     */
    canSale?: boolean;

    /**
     * 可订
     *
     * @type {boolean}
     * @memberof AddProductFostersInput
     */
    canOrder?: boolean;

    /**
     * 入库单位ID
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    inUnitId?: number;

    /**
     * 入库单位ID
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    inUnitName?: string | null;

    /**
     * 投药单位ID
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    outUnitId?: number;

    /**
     * 投药单位名称
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    outUnitName?: string | null;

    /**
     * 入库转换因子
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    inSpecific?: number;

    /**
     * 品牌ID
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    brandId?: number;

    /**
     * 品牌名称
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    brandName?: string | null;

    /**
     * 规格
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    specific?: string | null;

    /**
     * 注意事项
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    notice?: string | null;

    /**
     * 性状
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    characters?: string | null;

    /**
     * 适用对象
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    forr?: string | null;

    /**
     * 适应症
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    indication?: string | null;

    /**
     * 药品相互作用
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    drugInteractions?: string | null;

    /**
     * 禁忌
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    taboo?: string | null;

    /**
     * 不良反应
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    adverseReactions?: string | null;

    /**
     * 备注
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    remark?: string | null;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    ver?: string | null;

    /**
     * 可盘
     *
     * @type {boolean}
     * @memberof AddProductFostersInput
     */
    canCable?: boolean;

    /**
     * 停用
     *
     * @type {boolean}
     * @memberof AddProductFostersInput
     */
    isDisable?: boolean;

    /**
     * 标识id
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    tagId?: number | null;

    /**
     * 标识名称
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    tagName?: string | null;

    /**
     * 接种间隔
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    interval?: number;

    /**
     * 接种间隔单位 Day Week Month Year
     *
     * @type {string}
     * @memberof AddProductFostersInput
     */
    intervalUnit?: string | null;

    /**
     * 接种次数
     *
     * @type {number}
     * @memberof AddProductFostersInput
     */
    times?: number;

    /**
     * 种类投药
     *
     * @type {Array<ProductDosings>}
     * @memberof AddProductFostersInput
     */
    productDosings?: Array<ProductDosings> | null;
}
