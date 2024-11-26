/* tslint:disable */
/* eslint-disable */
import {BaseEntity} from "/@/api-services/models/base/base-entity";

/**
 * 品种返回参
 * @export
 * @interface PetVarietieOutPut
 */
export interface PetVarietieOutPut extends BaseEntity{
    /**
     * 品种名称
     * @type {number}
     * @memberof PetVarietieOutPut
     */
    name: string;
    /**
     * 序号
     * @type {number}
     * @memberof PetVarietieOutPut
     */
    order?: number | 0;
    /**
     * 英文名称
     * @type {string}
     * @memberof PetVarietieOutPut
     */
    englishName?: string | null;
}
