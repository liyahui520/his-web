/* tslint:disable */
/* eslint-disable */
import {BasePageInput} from '../../base/base-page-input'
/**
 * 品种分页参数
 * @export
 * @interface PagePetVarietieInput
 */
export interface PagePetVarietieInput extends BasePageInput<[]> {
    /**
     * 查询参数
     * @type {string}
     * @memberof PagePetVarietieInput
     */
    params?: string | null;

    /**
     * 种类id
     */
    kindId:number;
}
