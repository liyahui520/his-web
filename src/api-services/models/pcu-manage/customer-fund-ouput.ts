/**
 * 
 * @export
 * @interface CustomerFundOuput
 */
export interface CustomerFundOuput {
    /**
     * 用户ID
     * @type {number}
     * @memberof CustomerFundOuput
     */
    id?: number;
    /**
     * 用户名称
     * @type {string}
     * @memberof CustomerFundOuput
     */
    name?: string | null;
    
    /**
     * 会员编号
     * @type {string}
     * @memberof CustomerFundOuput
     */
    cardNumber?: string | null;
    /**
     * 性别
     * @type {string}
     * @memberof CustomerFundOuput
     */
    sex?: string | null;
    /**
     * 性别别名
     * @type {string}
     * @memberof CustomerFundOuput
     */
    sexText?: string | null;
    /**
     * 客户来源
     * @type {string}
     * @memberof CustomerFundOuput
     */
    sourceId?: string | null;
    /**
     * 客户来源别名
     * @type {string}
     * @memberof CustomerFundOuput
     */
    sourceText?: string | null;
    /**
     * 会员级别
     * @type {number}
     * @memberof CustomerFundOuput
     */
    level?: number;
    /**
     * 会员级别名称
     * @type {string}
     * @memberof CustomerFundOuput
     */
    levelName?: string | null;
    /**
     * 手机号
     * @type {string}
     * @memberof CustomerFundOuput
     */
    cellPhone?: string | null;
    /**
     * 性别
     * @type {string}
     * @memberof CustomerFundOuput
     */
    cardBalance?: number;
    /**
     * 备注
     * @type {string}
     * @memberof CustomerFundOuput
     */
    keepAccount?: number;
    /**
     * 账户余额
     * @type {string}
     * @memberof CustomerFundOuput
     */
    accountBalance?: number;
}
