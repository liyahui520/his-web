
import { CustomerFundDetailsOutput } from './customer-fund-details-output';
/**
 * 全局返回结果
 * @export
 * @interface AdminResultCustomerFundDetailsOutput
 */
export interface AdminResultCustomerFundDetailsOutput {
    /**
     * 状态码
     * @type {number}
     * @memberof AdminResultCustomerFundDetailsOutput
     */
    code?: number;
    /**
     * 类型success、warning、error
     * @type {string}
     * @memberof AdminResultCustomerFundDetailsOutput
     */
    type?: string | null;
    /**
     * 错误信息
     * @type {string}
     * @memberof AdminResultCustomerFundDetailsOutput
     */
    message?: string | null;
    /**
     * 
     * @type {SqlSugarPagedListCustomerSearchForSaleOutput}
     * @memberof AdminResultCustomerFundDetailsOutput
     */
    result?:  Array<CustomerFundDetailsOutput> | null;
    /**
     * 附加数据
     * @type {any}
     * @memberof AdminResultCustomerFundDetailsOutput
     */
    extras?: any | null;
    /**
     * 时间
     * @type {Date}
     * @memberof AdminResultCustomerFundDetailsOutput
     */
    time?: Date;
}
