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
 * @interface AddProductHospitalsInput
 */
export interface AddProductHospitalsInput {

    /**
     * @type {Search}
     * @memberof AddProductHospitalsInput
     */
    search?: Search;

    /**
     * 模糊查询关键字
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    keyword?: string | null;

    /**
     * @type {Filter}
     * @memberof AddProductHospitalsInput
     */
    filter?: Filter;

    /**
     * 当前页码
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    page?: number;

    /**
     * 页码容量
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    pageSize?: number;

    /**
     * 排序字段
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    field?: string | null;

    /**
     * 排序方向
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    order?: string | null;

    /**
     * 降序排序
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    descStr?: string | null;

    /**
     * Id
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    id?: number;

    /**
     * @type {ProductTypeEnums}
     * @memberof AddProductHospitalsInput
     */
    type?: ProductTypeEnums;

    /**
     * 产品类型
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    typeText?: string | null;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    tenantId?: number;

    /**
     * 名称
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    name?: string | null;

    /**
     * 目录ID
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    categoryId?: number;

    /**
     * 目录名称
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    categoryName?: string | null;

    /**
     * 条形码
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    barCode?: string | null;

    /**
     * 供应商ID
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    providerId?: number;

    /**
     * 供应商名称
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    providerName?: string | null;

    /**
     * 生产商ID
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    manufacturerId?: number;

    /**
     * 生产商名称
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    manufacturerName?: string | null;

    /**
     * 成分
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    ingredient?: string | null;

    /**
     * 缩写
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    nameLetter?: string | null;

    /**
     * 英文名称
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    englishName?: string | null;

    /**
     * 通用名称
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    commonName?: string | null;

    /**
     * 使用方式
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    usingMethod?: number;

    /**
     * 投药方式
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    dosingWay?: number;

    /**
     * 有无批次
     *
     * @type {boolean}
     * @memberof AddProductHospitalsInput
     */
    isAnaesthesia?: boolean;

    /**
     * 库存个数
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    count?: number;

    /**
     * 成本价
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    costPrice?: number;

    /**
     * 销售价格
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    salePrice?: number;

    /**
     * 会员价格
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    memberPrice?: number;

    /**
     * 编码
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    serialNumber?: string | null;

    /**
     * 是否参与打折
     *
     * @type {boolean}
     * @memberof AddProductHospitalsInput
     */
    isDiscount?: boolean;

    /**
     * 是否允许零库存
     *
     * @type {boolean}
     * @memberof AddProductHospitalsInput
     */
    isZeroSale?: boolean;

    /**
     * 可销
     *
     * @type {boolean}
     * @memberof AddProductHospitalsInput
     */
    canSale?: boolean;

    /**
     * 可订
     *
     * @type {boolean}
     * @memberof AddProductHospitalsInput
     */
    canOrder?: boolean;

    /**
     * 入库单位ID
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    inUnitId?: number;

    /**
     * 入库单位ID
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    inUnitName?: string | null;

    /**
     * 投药单位ID
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    outUnitId?: number;

    /**
     * 投药单位名称
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    outUnitName?: string | null;

    /**
     * 入库转换因子
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    inSpecific?: number;

    /**
     * 品牌ID
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    brandId?: number;

    /**
     * 品牌名称
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    brandName?: string | null;

    /**
     * 规格
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    specific?: string | null;

    /**
     * 注意事项
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    notice?: string | null;

    /**
     * 性状
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    characters?: string | null;

    /**
     * 适用对象
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    forr?: string | null;

    /**
     * 适应症
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    indication?: string | null;

    /**
     * 药品相互作用
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    drugInteractions?: string | null;

    /**
     * 禁忌
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    taboo?: string | null;

    /**
     * 不良反应
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    adverseReactions?: string | null;

    /**
     * 备注
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    remark?: string | null;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    ver?: string | null;

    /**
     * 可盘
     *
     * @type {boolean}
     * @memberof AddProductHospitalsInput
     */
    canCable?: boolean;

    /**
     * 停用
     *
     * @type {boolean}
     * @memberof AddProductHospitalsInput
     */
    isDisable?: boolean;

    /**
     * 标识id
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    tagId?: number | null;

    /**
     * 标识名称
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    tagName?: string | null;

    /**
     * 接种间隔
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    interval?: number;

    /**
     * 接种间隔单位 Day Week Month Year
     *
     * @type {string}
     * @memberof AddProductHospitalsInput
     */
    intervalUnit?: string | null;

    /**
     * 接种次数
     *
     * @type {number}
     * @memberof AddProductHospitalsInput
     */
    times?: number;

    /**
     * 种类投药
     *
     * @type {Array<ProductDosings>}
     * @memberof AddProductHospitalsInput
     */
    productDosings?: Array<ProductDosings> | null;
}
