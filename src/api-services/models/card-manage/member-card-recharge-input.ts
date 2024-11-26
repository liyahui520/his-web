
import { MemberCardRechargeDetailsDto } from './member-card-recharge-details-dto';

/**
 * 
 *
 * @export
 * @interface MemberCardRechargeInput
 */
export interface MemberCardRechargeInput {

    /**
     * 会员卡id
     *
     * @type {number}
     * @memberof MemberCardRechargeInput
     */
    cardId?: number;

    /**
     * 用户Id
     *
     * @type {number}
     * @memberof MemberCardRechargeInput
     */
    customerId?: number;
    
    /**
     * 赠送金额
     *
     * @type {number}
     * @memberof MemberCardRechargeInput
     */
    giveAmount?: number;
    /**
     * 备注
     *
     * @type {number}
     * @memberof MemberCardRechargeInput
     */
    remark?: String | null;
    
    /**
     * @type {Array<MemberCardRechargeDetailsDto>}
     * @memberof MemberCardRechargeInput
     */
    rechargeDetails?: Array<MemberCardRechargeDetailsDto> | null;
}
