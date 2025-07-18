/* tslint:disable */
/* eslint-disable */
/**
 * 会员管理
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
import { Search } from './search';
 /**
 * 
 *
 * @export
 * @interface AddPPetsInput
 */
export interface AddPPetsInput {

    /**
     * @type {Search}
     * @memberof AddPPetsInput
     */
    search?: Search;

    /**
     * 模糊查询关键字
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    keyword?: string | null;

    /**
     * @type {Filter}
     * @memberof AddPPetsInput
     */
    filter?: Filter;

    /**
     * 当前页码
     *
     * @type {number}
     * @memberof AddPPetsInput
     */
    page?: number;

    /**
     * 页码容量
     *
     * @type {number}
     * @memberof AddPPetsInput
     */
    pageSize?: number;

    /**
     * 排序字段
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    field?: string | null;

    /**
     * 排序方向
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    order?: string | null;

    /**
     * 降序排序
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    descStr?: string | null;

    /**
     * @type {string}
     * @memberof AddPPetsInput
     */
    ver?: string | null;

    /**
     * 宠主id
     *
     * @type {number}
     * @memberof AddPPetsInput
     */
    customerId?: number;

    /**
     * 宠物名称
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petName: string;

    /**
     * 英文名
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    fullNamePinyin?: string | null;

    /**
     * 性别 (0 公 1 母 2 未知)
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petGender?: string | null;

    /**
     * 生日
     *
     * @type {Date}
     * @memberof AddPPetsInput
     */
    petBirthDate?: Date | null;

    /**
     * 宠物来家日期
     *
     * @type {Date}
     * @memberof AddPPetsInput
     */
    petComeHomeDate?: Date | null;

    /**
     * 宠物种类
     *
     * @type {number}
     * @memberof AddPPetsInput
     */
    petKind: number;

    /**
     * 宠物品种
     *
     * @type {number}
     * @memberof AddPPetsInput
     */
    petVarietie: number;

    /**
     * 宠物血型  -1未知 0 纯种 1 杂交
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petBlood?: string | null;

    /**
     * 宠物毛色
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petColor?: string | null;

    /**
     * 宠物体重
     *
     * @type {number}
     * @memberof AddPPetsInput
     */
    petWeight?: number;

    /**
     * 是否绝育 -1 未知 0否 1 是
     *
     * @type {number}
     * @memberof AddPPetsInput
     */
    petIsSterilization?: number;

    /**
     * 犬证号码
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petIdentityNumber?: string | null;

    /**
     * 病历号码
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petRecordNumber?: string | null;

    /**
     * 药物过敏
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petDrugAllergy?: string | null;

    /**
     * 已接种疫苗 -1未知 0 否 1 是
     *
     * @type {number}
     * @memberof AddPPetsInput
     */
    petIsVaccinated?: number;

    /**
     * 上次疫苗时间
     *
     * @type {Date}
     * @memberof AddPPetsInput
     */
    petPrevVaccineDate?: Date | null;

    /**
     * 已驱虫 -1未知 0 否 1 是
     *
     * @type {number}
     * @memberof AddPPetsInput
     */
    petIsDeworming?: number;

    /**
     * 上次驱虫时间
     *
     * @type {Date}
     * @memberof AddPPetsInput
     */
    petPrevDewormingDate?: Date | null;

    /**
     * 宠物芯片
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petChip?: string | null;

    /**
     * 宠物照片
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petImageUrl?: string | null;

    /**
     * 宠物状态 默认饲养中
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petStatus?: string | null;

    /**
     * 宠物备注
     *
     * @type {string}
     * @memberof AddPPetsInput
     */
    petRemark?: string | null;
}
