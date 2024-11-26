

import { ProductId } from './product-id';

/**
 * 
 * @export
 * @interface UserChargesInput
 */
export interface UserChargesInput {
    /**
     * 雪花Id
     * @type {number}
     * @memberof UserChargesInput
     */
    userId?: number;
        /**
     * 菜单子项
     * @type {Array<ProductId>}
     * @memberof UserChargesInput
     */
    productIds?: Array<ProductId> | null;
}
