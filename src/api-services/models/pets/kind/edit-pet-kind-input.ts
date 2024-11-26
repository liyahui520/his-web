/* tslint:disable */
/* eslint-disable */
import {BaseEntity} from "/@/api-services/models/base/base-entity";

/**
 * 新增宠物种类
 * @export
 * @interface EditSysPetKindInput
 */
export interface EditSysPetKindInput extends BaseEntity{
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
