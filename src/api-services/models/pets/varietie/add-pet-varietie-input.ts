/* tslint:disable */
/* eslint-disable */
/**
 * 新增宠物品种
 * @export
 * @interface AddSysPetVarietieInput
 */
export interface AddSysPetVarietieInput {
    /**
     * 种类品种
     * @type {number}
     * @memberof AddSysPetKindInput
     */
    name: string;
    /**
     * 序号
     * @type {number}
     * @memberof AddSysPetKindInput
     */
    order?: number | 0;
    /**
     * 英文名称
     * @type {string}
     * @memberof AddSysPetKindInput
     */
    englishName?: string | null;

    /**
     * 种类id
     */
    kinId:number;
}
