<template>
	<div class="payment-methods-container">
		<el-drawer v-model="isShowDrawer" title="支付方式" :direction="'rtl'" :append-to-body="true" :modal="true" :destroy-on-close="true" :close-on-click-modal="false">
			<template #header>
				<h4 class="title">支付方式</h4>
			</template>
			<template #default>
				<div>
					<el-card v-loading="submitLoading" element-loading-text="支付中，请勿关闭此页面！" :body-style="{ paddingBottom: '0' }">
						<div class="type-list">
							<div class="type-item" v-for="(item, index) in fixedMethods" :key="index">
								<div v-if="accountList[item.code] && item.code == 'deposit'">
									<div class="pay-method-top">
										<el-popover :visible="depositVisible" :width="200" trigger="click" popper-style="padding:0;">
											<template #reference>
												<div class="pay-img-can" @click="openDepositPopover">
													<img class="pay-img-select" :src="item.payImg" alt="" />
													<span v-if="depositTypes.length > 0" class="pay-img-select-right-bottom"></span>
												</div>
											</template>
											<div class="methods-list">
												<div v-for="(depositItem, depositIndex) in depositTypes" :key="depositIndex">
													<div class="methods-item" @click="chooseDepositMethod(index, depositIndex)">
														<el-row>
															<el-col :span="12">{{ depositItem.typeName }} </el-col>
															<el-col :span="12">{{ twoFloorNum(depositItem.amount) }}</el-col>
														</el-row>
													</div>
												</div>
											</div>
										</el-popover>
										<el-input-number v-if="depositTypes.length > 0" v-model="item.amount" :min="0.0" :precision="2" :max="depositMaxValue" style="width: 80%" @change="multAmount(index)" />
										<el-text v-else size="large" style="margin-left: 10px" type="info">未开通{{ item.name }}</el-text>
									</div>

									<div style="width: 100%; text-align: right">
										<el-text v-if="chooseDepositInfo.amount && chooseDepositInfo.amount > 0 && depositTypes.length > 0"
											>{{ chooseDepositInfo.typeName }} 可用金额：¥ {{ twoFloorNum(chooseDepositInfo.amount) }}</el-text
										>
									</div>
								</div>
								<div v-else-if="accountList[item.code] && item.code == 'secondarycard'">
									<div class="pay-method-top">
										<el-popover :visible="secondarycardVisible" :width="200" trigger="click" popper-style="padding:0;">
											<template #reference>
												<div @click="opensecondarycardPopover" class="pay-img-can">
													<img class="pay-img-select" :src="item.payImg" alt="" />
													<span v-if="secondaryCardData.length > 0" class="pay-img-select-right-bottom"></span>
												</div>
											</template>
											<div class="methods-list">
												<div v-for="(secondaryCardItem, secondaryCardIndex) in secondaryCardData" :key="secondaryCardIndex">
													<div class="methods-item" @click="chooseSecondaryCardMethod(index, secondaryCardIndex)">
														<el-row>
															<el-col :span="18">{{ secondaryCardItem.cardName }} </el-col>
															<el-col :span="6">{{ secondaryCardItem.totalCount }} 次</el-col>
														</el-row>
													</div>
												</div>
											</div>
										</el-popover>
										<el-input-number v-if="secondaryCardData.length > 0" v-model="item.amount" :min="0" :max="secondarycardMaxValue" style="width: 80%" @change="multAmount(index)" />
										<el-text v-else size="large" style="margin-left: 10px" type="info">未开通{{ item.name }}</el-text>
									</div>

									<div style="width: 100%; text-align: right">
										<el-text v-if="chooseSecondaryCardInfo.totalCount && chooseSecondaryCardInfo.totalCount > 0 && secondaryCardData.length > 0"
											>可用次数：¥{{ chooseSecondaryCardInfo.canCount }}</el-text
										>
									</div>
								</div>
								<div v-else-if="accountList[item.code] && item.code == 'memberscard'">
									<div class="pay-method-top">
										<div class="pay-img">
											<img class="pay-img-select" :src="item.payImg" alt="" />
										</div>
										<el-input-number
											v-if="item.totalAmount && item.totalAmount > 0"
											v-model="item.amount"
											:min="0"
											:precision="2"
											:max="item.totalAmount"
											style="width: 80%"
											@change="multAmount(index)"
										/>
										<el-text v-else size="large" style="margin-left: 10px" type="info">未开通{{ item.name }}</el-text>
									</div>

									<div style="width: 100%; text-align: right">
										<el-text v-if="item.totalAmount && item.totalAmount > 0">可用金额：¥ {{ twoFloorNum(item.totalAmount) }}</el-text>
									</div>
								</div>
								<div v-else>
									<div class="pay-method-top">
										<div class="pay-img">
											<img class="pay-img-select" :src="item.payImg" alt="" />
										</div>
										<el-input-number v-model="item.amount" :min="0" :precision="2" :max="actualTotalAmount" style="width: 80%" @change="multAmount(index)" />
									</div>
								</div>
							</div>
							<div class="desc" v-if="absMethods.length">更多支付方式</div>

							<div class="type-item" v-if="absMethods.length > 0">
								<div class="pay-method-top">
									<el-popover :width="100" trigger="click" popper-style="padding:0;">
										<template #reference>
											<div class="pay-img-can">
												<img class="pay-img-select" :src="absMethods[firstIndex].payImg" alt="" />
												<span class="pay-img-select-right-bottom"></span>
											</div>
										</template>
										<div class="methods-list">
											<template v-for="(item, index) in absMethods">
												<div class="methods-item" v-if="index != firstIndex && index != secondIndex" :key="index" @click="chooseMethod(index, 1)">{{ item.name }}</div>
											</template>
										</div>
									</el-popover>
									<el-input-number v-model="absMethods[firstIndex].amount" :min="0" :precision="2" :max="actualTotalAmount" style="width: 80%" @change="multAmount(-1)" />
								</div>
							</div>
							<div class="type-item" v-if="absMethods.length > 1">
								<div class="pay-method-top">
									<el-popover :width="100" trigger="click" popper-style="padding:0;">
										<template #reference>
											<div class="pay-img-can">
												<img class="pay-img-select" :src="absMethods[secondIndex].payImg" alt="" />
												<span class="pay-img-select-right-bottom"></span>
											</div>
										</template>
										<div class="methods-list">
											<template v-for="(item, index) in absMethods">
												<div class="methods-item" v-if="index != firstIndex && index != secondIndex" :key="index" @click="chooseMethod(index, 2)">{{ item.name }}</div>
											</template>
										</div>
									</el-popover>

									<el-input-number v-model="absMethods[secondIndex].amount" :min="0" :precision="2" :max="actualTotalAmount" style="width: 80%" @change="multAmount(-1)" />
								</div>
							</div>
						</div>

						<el-row :gutter="35">
							<el-col :span="24" class="mb20">
								<el-form-item>
									<el-input type="textarea" placeholder="请输入订单备注" v-model="paymentRemark" show-word-limit maxlength="50" :rows="2" />
								</el-form-item>
							</el-col>
						</el-row>
						<div>
							<div class="container-collection">
								<el-text>费用合计：</el-text>
								<el-text size="large">￥ {{ twoFloorNum(totalAmount) }}</el-text>
							</div>
							<div class="container-collection" v-if="discountAmount > 0">
								<el-text>会员折扣：</el-text>
								<el-text size="large" type="danger"> {{ twoFloorNum(discountAmount) }}</el-text>
							</div>
							<div class="container-collection" v-if="secondarycardAmount > 0">
								<el-text>次卡折扣：</el-text>
								<el-text size="large" type="danger"> -{{ twoFloorNum(secondarycardAmount) }}</el-text>
							</div>
							<div class="container-collection" v-if="straightSecondarycardAmount > 0">
								<el-text>次卡优惠金额：</el-text>
								<el-text size="large" type="success"> {{ twoFloorNum(straightSecondarycardAmount) }}</el-text>
							</div>
							<div class="container-collection" v-if="isDownInteger">
								<el-text>抹零金额：</el-text>
								<el-text size="large" type="danger"> -{{ twoFloorNum(downIntegerAmount) }}</el-text>
							</div>
							<el-divider border-style="dashed" />
							<div class="container-collection">
								<el-text><el-text tag="b">支付方式</el-text></el-text>
							</div>
							<template v-for="(item, index) in fixedMethods">
								<div class="type-box" v-if="item.amount" :key="index">
									<el-text>
										{{ item.name }} <el-text v-if="item.code == 'secondarycard'">（{{ secondaryCardWriteOff }}）</el-text> ：</el-text
									>
									<el-text size="large" type="danger">-￥ {{ new Decimal(item.amount ?? 0).toFixed(2) }}</el-text>
									<el-icon @click="cancelItem(index, 1)">
										<CircleClose />
									</el-icon>
								</div>
							</template>
							<template v-for="(item, index) in absMethods">
								<div class="type-box" v-if="item.amount" :key="index">
									<el-text>{{ item.name }}：</el-text>
									<el-text size="large" type="danger">-￥ {{ new Decimal(item.amount ?? 0).toFixed(2) }}</el-text>
									<el-icon @click="cancelItem(index, 2)">
										<CircleClose />
									</el-icon>
								</div>
							</template>
							<!-- 
                            <el-divider border-style="dashed" />
                            <div class="container-collection">
                                <el-text><el-text tag="b">优惠金额</el-text></el-text>
                            </div>
                            <div class="container-collection">
                                <el-text><el-icon>
                                        <CircleClose />
                                    </el-icon> 会员满200打9折活动：</el-text>
                                <el-text size="large" type="danger">-￥ {{ totalAmount }}</el-text>
                            </div>
                            <div class="container-collection">
                                <el-text>
                                    <el-icon>
                                        <CircleClose />
                                    </el-icon>
                                    满200减20优惠券：
                                </el-text>
                                <el-text size="large" type="danger">-￥ {{ totalAmount }}</el-text>
                            </div> -->
							<el-divider border-style="dashed" />
							<div class="container-collection" style="margin-bottom: 20px">
								<el-text>待支付金额：</el-text>
								<el-text size="large">￥ {{ willPayAmount }}</el-text>
							</div>
						</div>
					</el-card>
				</div>
			</template>
			<template #footer>
				<div class="footer-group">
					<el-button type="primary" plain @click="downInteger" size="large">抹零</el-button>
					<el-button :loading="submitLoading" style="width: 30%" :disabled="willPayAmount != 0" type="primary" @click="submitPay" size="large">结账</el-button>
				</div>
			</template>
		</el-drawer>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { PcustomerApi, PaymentApi } from '/@/api-services/api';
import { ElMessage } from 'element-plus';
import { CircleClose } from '@element-plus/icons-vue';
import Decimal from 'decimal.js';
import commonFunction from '/@/utils/commonFunction';
import otherHandle from '/@/utils/other';
import account from '/@/assets/pay-type/account.png';
import ali from '/@/assets/pay-type/ali.png';
import applet from '/@/assets/pay-type/applet.png';
import cash from '/@/assets/pay-type/cash.png';
import deposit from '/@/assets/pay-type/deposit.png';
import jd from '/@/assets/pay-type/jd.png';
import meituan from '/@/assets/pay-type/meituan.png';
import memberscard from '/@/assets/pay-type/memberscard.png';
import other from '/@/assets/pay-type/other.png';
import POS from '/@/assets/pay-type/POS.png';
import secondarycard from '/@/assets/pay-type/secondarycard.png';
import taobao from '/@/assets/pay-type/taobao.png';
import tiktok from '/@/assets/pay-type/tiktok.png';
import wechat from '/@/assets/pay-type/wechat.png';
import { useUserInfo } from '/@/stores/userInfo';

const stores = useUserInfo();
const dictList = stores.dictList;
const { twoFloorNum, equalDivision, getSubArray } = commonFunction();
const emit = defineEmits(['refresh']);
const paymentDetails = ref<any>([]);
const isDownInteger = ref<boolean>(false);
const isShowDrawer = ref(false);

const actualTotalAmount = ref<number>(0.0);
const downIntegerAmount = ref<number>(0.0);
const paymentRemark = ref('');
const willPayAmount = ref<number>(0.0);
const PayMentTypeImgs = ref<any>({
	account: account,
	ali: ali,
	applet: applet,
	cash: cash,
	deposit: deposit,
	jd: jd,
	meituan: meituan,
	memberscard: memberscard,
	other: other,
	pos: POS,
	secondarycard: secondarycard,
	taobao: taobao,
	tiktok: tiktok,
	wechat: wechat,
});
const fixedMethods = ref<any>([]); //固定的6个支付方式
const absMethods = ref<any>([]); //可选择的其他支付方式
const firstIndex = ref<number>(0);
const secondIndex = ref<number>(0);
const submitLoading = ref<boolean>(false);
const customerInfo = ref<any>({ customerId: 0, customerName: '' });
const accountList = ref<any>({
	memberscard: true,
	secondarycard: true,
	deposit: true,
});
const secondarycardVisible = ref<any>(false);
const depositVisible = ref<any>(false);
const depositTypes = ref<any>([]);
//选中的押金信息
const chooseDepositInfo = ref<any>({});
const depositMaxValue = ref<number>(0);
const secondarycardMaxValue = ref<number>(0);
const chooseSecondaryCardInfo = ref<any>([]);
//扣减次卡金额
const secondarycardAmount = ref<any>(0);
//正向扣减次卡金额
const straightSecondarycardAmount = ref<any>(0);
//次卡核销的产品
const secondaryCardWriteOff = ref<string>('');
//次卡对象
const secondaryCardData = ref<any>([]);

// 关闭弹窗
const closeDrawer = () => {
	isShowDrawer.value = false;
};

// 打开弹窗
const openDrawer = async (rowInfo: any) => {
	const data = otherHandle.deepClone(rowInfo);
	depositVisible.value = false;
	secondarycardVisible.value = false;
	chooseSecondaryCardInfo.value = {};
	await loadPaymentMethods();
	actualTotalAmount.value = data.actualTotalAmount;
	willPayAmount.value = data.actualTotalAmount;
	paymentDetails.value = data.paymentDetails;
	isShowDrawer.value = true;
	customerInfo.value.customerId = data.customerId;
	customerInfo.value.customerName = data.customerName;
	depositTypes.value = data.depositTypes;
	secondaryCardData.value = data.secondaryCardData;
	secondarycardAmount.value = 0;
	straightSecondarycardAmount.value = 0;
	secondaryCardWriteOff.value = '';
	var res = await getAPI(PcustomerApi).apiPcustomerCustomerIdGetCustomerPetFundDetailsGet(data.customerId);
	res.data.result?.forEach((item:any) => {
		// 次卡、会员卡、押金需要显示余额等信息
		fixedMethods.value.forEach((ele:any) => {
			if (ele.code == item.type) {
				ele.totalAmount = item.totalAmount;
				ele.businessId = item.id;
			}
		});
	});
};
/**
 * 打开选择次卡的弹窗
 */
const opensecondarycardPopover = async () => {
	if (secondaryCardData.value.length > 0) secondarycardVisible.value = !secondarycardVisible.value;
};
/**
 * 打开选择押金的弹窗
 */
const openDepositPopover = () => {
	if (depositTypes.value.length > 0) depositVisible.value = !depositVisible.value;
};
/**
 * 选择对应次卡的内容
 */
const chooseSecondaryCardMethod = (methodIndex: number, secondaryCardIndex: number) => {
	chooseSecondaryCardInfo.value = secondaryCardData.value[secondaryCardIndex];
	secondarycardVisible.value = false;
	let isHandle = false; //此值方式重复处理
	let handleAgainNotice = false;
	paymentDetails.value.forEach((item: any) => {
		let firstProduct = chooseSecondaryCardInfo.value.secondaryCardsItem.find((cardItem: any) => cardItem.productId == item.productId)?.productId || '0';
		if (item.productId == firstProduct && !isHandle) {
			if (item.count > chooseSecondaryCardInfo.value.canCount) {
				ElMessage.warning('次卡数量不足，请重新选择！');
				handleAgainNotice = true;
				return;
			}
			let resultArray = equalDivision(chooseSecondaryCardInfo.value.spendPrice, chooseSecondaryCardInfo.value.totalCount);
			let rangeList = getSubArray(resultArray, chooseSecondaryCardInfo.value.useCount, item.count);
			let handleAmount = rangeList.reduce((pre: number, itemAmount: number) => {
				let accumulateAmount = new Decimal(pre).add(new Decimal(itemAmount));
				return accumulateAmount;
			}, 0);

			item.isSecondaryCard = true;
			if (new Decimal(item.amountPrice).toNumber() > handleAmount.toNumber()) {
				secondarycardAmount.value = new Decimal(item.amountPrice).sub(handleAmount).toNumber();
				straightSecondarycardAmount.value = 0;
			} else {
				secondarycardAmount.value = 0;
				straightSecondarycardAmount.value = new Decimal(handleAmount).sub(item.amountPrice).toNumber();
			}
			isHandle = true;
			item.actualPrice = handleAmount.toNumber();
			fixedMethods.value[methodIndex].amount = handleAmount.toNumber();
			fixedMethods.value[methodIndex].totalAmount = handleAmount.toNumber();
			fixedMethods.value[methodIndex].businessId = chooseSecondaryCardInfo.value.id;
			fixedMethods.value[methodIndex].businessVer = chooseSecondaryCardInfo.value.ver;
			secondaryCardWriteOff.value = `${item.productName} * ${item.count}`;
			return;
		} else {
			item.isSecondaryCard = false;
		}
	});
	if (!isHandle && !handleAgainNotice) {
		ElMessage.warning('该次卡暂无核销项目，请重新选择！');
		secondarycardAmount.value = 0;
		straightSecondarycardAmount.value = 0;
		chooseSecondaryCardInfo.value = {};
		fixedMethods.value[methodIndex].amount = 0;
		fixedMethods.value[methodIndex].totalAmount = 0;
		fixedMethods.value[methodIndex].businessId = 0;
		fixedMethods.value[methodIndex].businessVer = '';
		secondaryCardWriteOff.value = '';
		return;
	}
	multAmount(-1);
};

/**
 * 选择对应押金的内容
 */
const chooseDepositMethod = (methodIndex: number, depositIndex: number) => {
	chooseDepositInfo.value = depositTypes.value[depositIndex];
	if (willPayAmount.value > chooseDepositInfo.value.amount) {
		fixedMethods.value[methodIndex].amount = chooseDepositInfo.value.amount;
		fixedMethods.value[methodIndex].totalAmount = chooseDepositInfo.value.amount;
		depositMaxValue.value = chooseDepositInfo.value.amount;
	} else {
		fixedMethods.value[methodIndex].amount = willPayAmount.value;
		fixedMethods.value[methodIndex].totalAmount = willPayAmount.value;
		depositMaxValue.value = willPayAmount.value;
	}
	fixedMethods.value[methodIndex].businessId = chooseDepositInfo.value.id;
	fixedMethods.value[methodIndex].businessVer = chooseDepositInfo.value.ver;

	depositVisible.value = false;
	multAmount(-1);
};

/**
 * 输入框输入后计算
 * @param index
 */
const multAmount = async (index = -1) => {
	if (index != -1) {
		if (fixedMethods.value[index].totalAmount && fixedMethods.value[index].amount > fixedMethods.value[index].totalAmount) {
			fixedMethods.value[index].amount = fixedMethods.value[index].totalAmount;
		} else if (fixedMethods.value[index].amount == null) {
			fixedMethods.value[index].amount = 0;
		}
	} else if (absMethods.value[firstIndex.value].amount == null) {
		absMethods.value[firstIndex.value].amount = 0;
	} else if (absMethods.value[secondIndex.value].amount == null) {
		absMethods.value[secondIndex.value].amount = 0;
	}
	let amount = 0;
	fixedMethods.value.forEach((ele: any) => {
		if (ele.amount) {
			amount += 1 * ele.amount;
		}
	});
	const willPayMoney = new Decimal(new Decimal(actualTotalAmount.value))
		.sub(new Decimal(downIntegerAmount.value))
		.sub(new Decimal(amount))
		.sub(new Decimal(absMethods.value[firstIndex.value].amount ? absMethods.value[firstIndex.value].amount : 0))
		.sub(new Decimal(absMethods.value[secondIndex.value].amount ? absMethods.value[secondIndex.value].amount : 0))
		.sub(new Decimal(secondarycardAmount.value))
		.add(new Decimal(straightSecondarycardAmount.value))
		.toFixed(2, Decimal.ROUND_UP);
	willPayAmount.value = new Decimal(willPayMoney).toNumber();
};
/**
 * 计算折扣金额
 */
const discountAmount = computed(() => {
	const result = new Decimal(totalAmount.value).sub(actualTotalAmount.value).toFixed(2, Decimal.ROUND_UP);
	return new Decimal(result).toNumber();
});
/**
 * 计算总金额
 */
const totalAmount = computed(() => {
	const totalAmountValue = paymentDetails.value.reduce((pre:any, item:any) => {
		let accumulateAmount = new Decimal(pre).add(new Decimal(item.amountPrice));
		return new Decimal(accumulateAmount);
	}, 0);

	const result = totalAmountValue.toFixed(2, Decimal.ROUND_UP);
	return new Decimal(result).toNumber();
});

/**
 * 抹零
 */
const downInteger = () => {
	if (isDownInteger.value) return;
	let amountResult = new Decimal(actualTotalAmount.value).toFixed(0, Decimal.ROUND_DOWN);
	downIntegerAmount.value = new Decimal(actualTotalAmount.value).sub(new Decimal(amountResult)).toNumber();
	isDownInteger.value = downIntegerAmount.value > 0;
};

// 选择支付方式
const chooseMethod = (index:any, type:any) => {
	if (type == 1) {
		absMethods.value[firstIndex.value].amount = '';
		firstIndex.value = index;
	} else {
		absMethods.value[secondIndex.value].amount = '';
		secondIndex.value = index;
	}
	multAmount(-1);
};

// 删除已输入的支付方式
const cancelItem = (index:any, type:any) => {
	if (type == 1) {
		fixedMethods.value[index].amount = '';
	} else {
		absMethods.value[index].amount = '';
	}
	secondarycardAmount.value = 0;
	straightSecondarycardAmount.value = 0;
	multAmount(-1);
};
/**
 * 加载可用的支付方式
 */
const loadPaymentMethods = async () => {
	let memoryData = dictList['payment_type'];
	if (memoryData.length == 0) {
		ElMessage.error('请先维护支付方式');
		return;
	}
	fixedMethods.value = [];
	memoryData.forEach((item:any, index:any) => {
		let info = {
			id: item.id,
			name: item.label,
			amount: 0,
			principalAmount: 0,
			giftAmount: 0,
			remark: '',
			payImg: PayMentTypeImgs.value[item.value], // '@/assets/pay-type/' + item.code + '.png',
			businessId: item.id,
			businessVer: item.ver,
			code: item.value,
			isShow: false,
		};
		if (index < 6) {
			fixedMethods.value.push(info);
		} else {
			if (index == 6) {
				firstIndex.value = 0;
			}
			if (index == 7) {
				secondIndex.value = 1;
			}
			absMethods.value.push(info);
		}
	});
};

// 提交
const submitPay = async () => {
	if (willPayAmount.value > 0) {
		ElMessage.warning('请先完成支付再进行提交');
		return;
	}
	if (willPayAmount.value < 0) {
		ElMessage.warning('实际支付金额大于总金额，请修改');
		return;
	}
	submitLoading.value = true;
	let arr: any = [];
	fixedMethods.value.forEach((ele:any) => {
		if (ele.amount) {
			arr.push(ele);
		}
	});
	absMethods.value.forEach((ele:any) => {
		if (ele.amount) {
			arr.push(ele);
		}
	});

	await getAPI(PaymentApi)
		.apiPaymentMakePaymentPost({
			actlyAmount: new Decimal(new Decimal(actualTotalAmount.value).sub(secondarycardAmount.value).add(straightSecondarycardAmount.value).toFixed(2, Decimal.ROUND_UP)).toNumber(), //实付需要扣减次卡折扣金额
			downIntegerAmount: downIntegerAmount.value,
			paymentDetails: paymentDetails.value,
			paymentMethods: arr,
			remark: paymentRemark.value,
			customerId: customerInfo.value.customerId,
			customerName: customerInfo.value.customerName,
		})
		.then(() => {
			submitLoading.value = false;
			ElMessage.success('支付成功');
			emit('refresh');
			closeDrawer();
		})
		.catch(() => {
			submitLoading.value = false;
		});
};

//将属性或者函数暴露给父组件
defineExpose({ openDrawer });
</script>

<style scoped lang="scss">
.title {
	text-align: center;
	font-size: 16px;
	color: var(--el-color-primary);
}

.type-list {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;

	.desc {
		margin-bottom: 10px;
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
	}

	.type-item {
		margin-bottom: 20px;
		width: 48%;
		height: 50px;
		border-radius: 12px;
		background: #f4f4f4;

		:deep(.el-input-number__increase) {
			display: none;
		}

		:deep(.el-input-number__decrease) {
			display: none;
		}
		:deep(.el-input__wrapper) {
			background-color: #f4f4f4;
			box-shadow: none;
			font-size: 16px;
			padding-left: 5px;
			padding-right: 0px;
		}
		:deep(.el-input__wrapper.is-focus) {
			box-shadow: none;
		}
		:deep(.el-input__wrapper:hover) {
			box-shadow: none;
		}
		:deep(.el-input-number .el-input__inner) {
			text-align: left;
		}
		.pay-method-top {
			display: flex;
			.pay-img-can {
				width: 50px;
				height: 50px;
				text-align: center;
				padding-top: 9px;
				border-right: 1px solid #e4e7ed;
				cursor: pointer;
				position: relative;
				.pay-img-select {
					width: 32px;
					height: 32px;
				}
				.pay-img-select-right-bottom {
					position: absolute;
					right: 0;
					bottom: 0;
					border: 5px solid rgba(0, 0, 0, 0);
					border-right: 5px solid #0d76f7;
					border-bottom: 5px solid #0d76f7;
				}
			}
			.pay-img {
				width: 50px;
				height: 50px;
				text-align: center;
				padding-top: 9px;
				border-right: 1px solid #e4e7ed;
				.pay-img-select {
					width: 32px;
					height: 32px;
				}
			}
		}
	}
}

:deep(textarea) {
	border: none;
	border-radius: 12px;
	height: 70px;
	box-shadow: none;
	background: #f4f4f4;
	font-size: 16px;
}

.methods-list {
	padding: 4px 0;

	.methods-item {
		cursor: pointer;
		height: 34px;
		line-height: 34px;
		font-size: 14px;
		padding: 0 12px;
		border-bottom: 1px solid #e1e1e1;

		&:hover {
			background: #f1f1f1;
		}

		&:last-child {
			border: none;
		}
	}
}

.el-drawer {
	.container-collection {
		display: flex;
		justify-content: space-between !important;
		line-height: 30px;

		.el-text > .el-icon {
			cursor: pointer;
		}
	}

	.type-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		:deep(.el-icon) {
			margin-left: 10px;
			cursor: pointer;
			font-size: 18px;
		}
	}
}

.footer-group {
	border-top: 1px solid #e3e3e3;
	padding: 10px 20px 30px 0;
	display: flex;
	justify-content: flex-end;

	.el-button {
		// padding:0;
		height: 50px;
		border-radius: 16px;
		font-size: 16px;
	}
}
</style>
