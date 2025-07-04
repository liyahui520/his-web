/* tslint:disable */
/* eslint-disable */
/**
 * 产品管理
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * Contact: liyahui360@163.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 商品表
 * @export
 * @interface ProductGoods
 */
export interface ProductGoods {
    /**
     * 雪花Id
     * @type {number}
     * @memberof ProductGoods
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof ProductGoods
     */
    createTime?: Date | null;
    /**
     * 更新时间
     * @type {Date}
     * @memberof ProductGoods
     */
    updateTime?: Date | null;
    /**
     * 创建者Id
     * @type {number}
     * @memberof ProductGoods
     */
    createUserId?: number | null;
    /**
     * 修改者Id
     * @type {number}
     * @memberof ProductGoods
     */
    updateUserId?: number | null;
    /**
     * 软删除
     * @type {boolean}
     * @memberof ProductGoods
     */
    isDelete?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ProductGoods
     */
    ver?: string | null;
    /**
     * 创建者部门Id
     * @type {number}
     * @memberof ProductGoods
     */
    createOrgId?: number | null;
    /**
     * 租户Id
     * @type {number}
     * @memberof ProductGoods
     */
    tenantId?: number | null;
    /**
     * 名称
     * @type {string}
     * @memberof ProductGoods
     */
    name?: string | null;
    /**
     * 产品类型
     * @type {string}
     * @memberof ProductGoods
     */
    type?: string | null;
    /**
     * 目录ID
     * @type {number}
     * @memberof ProductGoods
     */
    categoryId?: number;
    /**
     * 目录名称
     * @type {string}
     * @memberof ProductGoods
     */
    categoryName?: string | null;
    /**
     * 条形码
     * @type {string}
     * @memberof ProductGoods
     */
    barCode?: string | null;
    /**
     * 供应商ID
     * @type {number}
     * @memberof ProductGoods
     */
    providerId?: number;
    /**
     * 生产商ID
     * @type {number}
     * @memberof ProductGoods
     */
    manufacturerId?: number;
    /**
     * 总部编码
     * @type {string}
     * @memberof ProductGoods
     */
    serialNumber?: string | null;
    /**
     * 缩写
     * @type {string}
     * @memberof ProductGoods
     */
    nameLetter?: string | null;
    /**
     * 英文名称
     * @type {string}
     * @memberof ProductGoods
     */
    englishName?: string | null;
    /**
     * 通用名称
     * @type {string}
     * @memberof ProductGoods
     */
    commonName?: string | null;
    /**
     * 库存个数
     * @type {number}
     * @memberof ProductGoods
     */
    count?: number;
    /**
     * 成本价
     * @type {number}
     * @memberof ProductGoods
     */
    costPrice?: number;
    /**
     * 销售价格
     * @type {number}
     * @memberof ProductGoods
     */
    salePrice?: number;
    /**
     * 会员价格
     * @type {number}
     * @memberof ProductGoods
     */
    memberPrice?: number;
    /**
     * 是否参与打折
     * @type {boolean}
     * @memberof ProductGoods
     */
    isDiscount?: boolean;
    /**
     * 是否允许零库存
     * @type {boolean}
     * @memberof ProductGoods
     */
    isZeroSale?: boolean;
    /**
     * 可销
     * @type {boolean}
     * @memberof ProductGoods
     */
    canSale?: boolean;
    /**
     * 可订
     * @type {boolean}
     * @memberof ProductGoods
     */
    canOrder?: boolean;
    /**
     * 入库单位ID
     * @type {number}
     * @memberof ProductGoods
     */
    inUnitId?: number;
    /**
     * 投药单位ID
     * @type {number}
     * @memberof ProductGoods
     */
    outUnitId?: number;
    /**
     * 入库转换因子
     * @type {number}
     * @memberof ProductGoods
     */
    inSpecific?: number;
    /**
     * 品牌ID
     * @type {number}
     * @memberof ProductGoods
     */
    brandId?: number;
    /**
     * 规格
     * @type {string}
     * @memberof ProductGoods
     */
    specific?: string | null;
    /**
     * 备注
     * @type {string}
     * @memberof ProductGoods
     */
    remark?: string | null;
    /**
     * 注意事项
     * @type {string}
     * @memberof ProductGoods
     */
    notice?: string | null;
}
