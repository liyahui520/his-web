/* tslint:disable */
/* eslint-disable */
import {BaseEntity} from "/@/api-services/models/base/base-entity";

/**
 * 新增宠物品种
 * @export
 * @interface EditSysPetVarietieInput
 */
export interface EditSysPetVarietieInput extends BaseEntity{
    /**
     * 品种名称
     * @type {number}
     * @memberof AddSysPetVarietieInput
     */
    name: string;
    /**
     * 序号
     * @type {Date}
     * @memberof AddSysPetVarietieInput
     */
    order?: number | 0;
    /**
     * 英文名称
     * @type {Date}
     * @memberof AddSysPetVarietieInput
     */
    englishName?: string | null;

    /**
     * 种类id
     */
    kindId:number;
}
