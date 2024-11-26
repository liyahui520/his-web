/* tslint:disable */
/* eslint-disable */
import {BaseEntity} from "/@/api-services/models/base/base-entity";

/**
 * 种类返回参
 * @export
 * @interface PetKindOutPut
 */
export interface PetKindOutPut extends BaseEntity{
    /**
     * 种类名称
     * @type {number}
     * @memberof AddSysPetKindInput
     */
    name: string;
    /**
     * 序号
     * @type {Date}
     * @memberof AddSysPetKindInput
     */
    order?: number | 0;
    /**
     * 英文名称
     * @type {Date}
     * @memberof AddSysPetKindInput
     */
    englishName?: string | null;
}
