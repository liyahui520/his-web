/* tslint:disable */
/* eslint-disable */
/**
 * 住院留观
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { InHospitalTypeEnum } from './in-hospital-type-enum';
import { InHospitalCostTypeEnum } from './in-hospital-cost-type-enum';
 /**
 * 
 *
 * @export
 * @interface InHospitalRoomsOutput
 */
export interface InHospitalRoomsOutput {

    /**
     * 主键Id
     *
     * @type {number}
     * @memberof InHospitalRoomsOutput
     */
    id?: number;

    /**
     * 笼位名称
     *
     * @type {string}
     * @memberof InHospitalRoomsOutput
     */
    name?: string | null;

    /**
     * 位置  楼层
     *
     * @type {string}
     * @memberof InHospitalRoomsOutput
     */
    location?: string | null;

    /**
     * 容量  （可留观宠物数量）
     *
     * @type {number}
     * @memberof InHospitalRoomsOutput
     */
    capacity?: number;

    /**
     * @type {InHospitalTypeEnum}
     * @memberof InHospitalRoomsOutput
     */
    inHospitalType?: InHospitalTypeEnum;

    /**
     * 类型   住院 还是 留观
     *
     * @type {string}
     * @memberof InHospitalRoomsOutput
     */
    inHospitalTypeText?: string | null;
    /**
     * 收费类型
     * 
     * @type {InHospitalCostTypeEnum}
     * @memberof InHospitalNursesItemsDto
     */
    inHospitalCostType?: InHospitalCostTypeEnum;
    /**
     * 收费类型文本
     *
     * @type {string}
     * @memberof InHospitalNursesItemsDto
     */
    inHospitalCostTypeText?: string | null;

    /**
     * 房间大小
     *
     * @type {string}
     * @memberof InHospitalRoomsOutput
     */
    size?: string | null;

    /**
     * 销售价格/天
     *
     * @type {number}
     * @memberof InHospitalRoomsOutput
     */
    salePrice?: number;

    /**
     * 会员价格/天
     *
     * @type {number}
     * @memberof InHospitalRoomsOutput
     */
    memberPrice?: number;

    /**
     * 销售价格/月租
     *
     * @type {number}
     * @memberof InHospitalRoomsOutput
     */
    monthSalePrice?: number;

    /**
     * 会员价格/月租
     *
     * @type {number}
     * @memberof InHospitalRoomsOutput
     */
    monthMemberPrice?: number;

    /**
     * 笼位图片
     *
     * @type {string}
     * @memberof InHospitalRoomsOutput
     */
    imageUrl?: string | null;

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof ApprovalFlow
     */
    createTime?: Date | null;
    /**
     * 备注
     *
     * @type {string}
     * @memberof InHospitalRoomsOutput
     */
    remark?: string | null;
    /**
     * 是否可用
     *
     * @type {boolean}
     * @memberof InHospitalRoomsAddInput
     */
    isEnable?: boolean;
    /**
     * 是否被占用
     *
     * @type {boolean}
     * @memberof InHospitalRoomsAddInput
     */
    isOccupy?: boolean;

    /**
     * 版本标识
     *
     * @type {string}
     * @memberof InHospitalRoomsOutput
     */
    ver?: string | null;
}
