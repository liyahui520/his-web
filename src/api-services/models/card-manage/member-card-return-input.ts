
import { MemberCardRechargeDetailsDto } from './member-card-recharge-details-dto';

/**
 * 
 *
 * @export
 * @interface MemberCardReturnInput
 */
export interface MemberCardReturnInput {

    /**
     * 会员卡id
     *
     * @type {number}
     * @memberof MemberCardReturnInput
     */
    cardId?: number;

    /**
     * 用户Id
     *
     * @type {number}
     * @memberof MemberCardReturnInput
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
     * @memberof MemberCardReturnInput
     */
    rechargeDetails?: Array<MemberCardRechargeDetailsDto> | null;
}
