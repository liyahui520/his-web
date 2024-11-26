/* tslint:disable */
/* eslint-disable */
/**
 * 新增宠物种类
 * @export
 * @interface AddSysPetKindInput
 */
export interface AddSysPetKindInput {
    /**
     * 种类名称
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
}
