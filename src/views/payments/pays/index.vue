<template>
	<div class="will-pay-container">
		<el-row>
			<el-col :span="5">
				<el-container class="layout-mian-height-160" style="border: 1px solid #eee">
					<el-header class="container-header-left">
						<el-input v-model="queryParams.name" placeholder="搜索会员名称/手机号" maxlength="11" class="search-input input-with-select"></el-input>
						<div class="right-btn">
							<el-icon :size="20" color="#0D76F7" style="cursor: pointer" @click="loadCustomer">
								<Search />
							</el-icon>
						</div>
					</el-header>
					<el-main class="container-main-left" v-loading="customerLoading">
						<div v-if="customerData.length > 0">
							<el-card
								shadow="hover"
								class="container-main-left-card el-card-product"
								v-for="(item, index) in customerData"
								:key="item.id"
								:class="slectCustomerIndex == item.id ? 'active-product' : ''"
								@click.native="handleCustomer(item)"
							>
								<div class="cus-info">
									<p class="cus-name">{{ item.customerName }}</p>
									<p class="cus-level" v-show="item.levelName != ''">{{ item.levelName }}</p>
								</div>
								<div class="cus-phone">{{ item.cellPhone }}</div>
								<div class="pet-card">
									<div class="pet-item" v-for="(pItem, pIndex) in item.pets" :key="pIndex">
										<div class="pet-img" @click="handleCheckedPetChange(pItem.id)">
											<el-avatar   :src="pItem?.petImageUrl" :size="40"> 
													<img v-if="pItem?.petKind === '1300010000001'" src="https://img.huimopei.com/img/Default/Dog.png" />
														<img v-else-if="pItem?.petKind === '1300010000002'" src="https://img.huimopei.com/img/Default/Cat.png" />
														<img v-else src="https://img.huimopei.com/img/Default/default.png" />
										</el-avatar>  
											<div class="active-pet" v-if="cartsTableParams.petIds?.includes(pItem.id)">
												<el-icon :size="20" color="#fff">
													<Select />
												</el-icon>
											</div>
										</div>
										<div class="pet-name">{{ pItem.petName }}</div>
									</div>
								</div>
							</el-card>
						</div>

						<el-empty v-else description="暂无需收款用户" />
					</el-main>
				</el-container>
			</el-col>
			<el-col :span="19">
				<el-container class="layout-mian-height-160" style="border: 1px solid #eee">
					<el-header class="container-header-center" style="height: 50px" v-loading="customerFundLoading">
						<template v-if="customerFundData.name">
							<div class="cus-detail">
								<div class="left-info">
									<el-breadcrumb separator="\">
										<el-breadcrumb-item
											><el-text tag="b" size="large">{{ customerFundData.name }}</el-text></el-breadcrumb-item
										>
										<el-breadcrumb-item>
											<el-tag effect="light">{{ customerFundData.levelName ?? '' }}</el-tag>
										</el-breadcrumb-item>
										<el-breadcrumb-item>{{ customerFundData.cardNumber ?? '-' }}</el-breadcrumb-item>
										<el-breadcrumb-item>{{ customerFundData.cellPhone ?? '-' }}</el-breadcrumb-item>
									</el-breadcrumb>
								</div>
								<div class="right-info">
									<p class="amount">会员卡余额：{{ verifyNumberComma((customerFundData.cardBalance ?? 0).toFixed(2)) || 0.0 }}</p>
									<p class="amount">押金余额：{{ verifyNumberComma((customerFundData.depositAmount ?? 0).toFixed(2)) || 0.0 }}</p>
									<p class="amount">次卡余次：{{ customerFundData.secondaryCardBalance ?? 0 }}</p>
								</div>
							</div>
						</template>
					</el-header>

					<el-main class="container-main-center">
						<el-text v-if="cartTableData.length > 0 && cartTableData[0].paymentCarts[0].isScattered" type="danger" tag="b">注：当前会员为 <el-tag>散客</el-tag> 不参与任何折扣。</el-text>
						<el-text v-else-if="cartTableData.length > 0 && !cartTableData[0].paymentCarts[0].isScattered" type="danger" tag="b"
							>注：当前会员级别为 {{ customerFundData.levelName }} {{ cartTableData[0].paymentCarts[0].enabledDiscount ? '参与' : '不参与' }}折扣。</el-text
						>
						<div v-if="cartTableData.length > 0" style="margin-top: 5px">
							<el-collapse class="container-main-center-table-content" v-model="checkedPayData" v-loading="cartTableLoading" @click.stop>
								<el-collapse-item v-for="(row, rowIndex) in cartTableData" :key="rowIndex" :name="row.id" @click="(data: any) => collapseChange(data, row)">
									<template #title>
										<el-icon class="el-icon--right">
											<ArrowRight v-if="!row.isActive" />
											<ArrowDown v-else />
										</el-icon>
										<el-checkbox v-model="row.checked" style="margin-right: 10px; margin-left: 10px" @click.stop @change="checkBoxChange(row)" :indeterminate="row.indeterminate" />
										下单日期：<el-text tag="b" style="margin-right: 20px"> {{ formatDate(new Date(row.createTime), 'YYYY-mm-dd') }}</el-text> 项数：<el-text tag="b" type="primary">
											{{ row.itemCount }}</el-text
										>
									</template>
									<template #default>
										<div style="padding-left: 20px">
											<el-table :data="row.paymentCarts" stripe v-loading="row.loadingChild" row-key="id" width="100%" @click.stop>
												<el-table-column align="center" width="30">
													<template #default="scope">
														<el-checkbox v-model="scope.row.checked" @change="detailChecked(scope.row, row)" />
													</template>
												</el-table-column>
												<el-table-column prop="petName" label="宠物名称" width="120" />
												<el-table-column prop="costTypeName" label="收费类型" width="100" show-overflow-tooltip />
												<el-table-column prop="productName" label="收费项目" show-overflow-tooltip>
													<template #default="scope">
														<el-tag type="success" v-if="scope.row.isMeal">[套]</el-tag>
														<el-tag type="warning" v-else-if="scope.row.isPackage">[包]</el-tag>
														<el-tag type="danger" v-else-if="scope.row.isDiscount">[惠]</el-tag>
														<span>{{ scope.row.productName }}</span>
													</template>
												</el-table-column>
												<el-table-column prop="saleName" label="销售人员" width="100" show-overflow-tooltip />
												<el-table-column prop="salePrice" label="单价" width="100" show-overflow-tooltip>
													<template #default="scope">
														<el-text>{{ verifyNumberComma(scope.row.salePrice.toFixed(2)) || 0.0 }}</el-text>
													</template>
												</el-table-column>
												<el-table-column prop="memberPriceText" label="会员价" width="100" show-overflow-tooltip>
													<template #default="scope">
														<el-text>{{ verifyNumberComma(scope.row.memberPriceText.toFixed(2)) || 0.0 }}</el-text>
													</template>
												</el-table-column>
												<el-table-column prop="count" label="数量" width="60" />
												<el-table-column prop="discountRatio" label="折扣率" width="100">
													<template #default="scope">
														<el-input-number
															:precision="2"
															:min="0"
															:max="1"
															controls-position="right"
															class="input-number-width"
															v-model="scope.row.discountRatio"
															:disabled="!scope.row.isDiscount && !scope.row.isScattered"
															@change="(value: any) => handleDiscountRatioChange(value, scope.row)"
														/>
													</template>
												</el-table-column>
												<el-table-column prop="actualPrice" label="合计" width="120">
													<template #default="scope">
														<el-input-number
															class="input-number-width"
															v-model="scope.row.actualPrice"
															:precision="2"
															:min="0"
															:max="scope.row.amountPrice"
															controls-position="right"
															:disabled="!scope.row.isDiscount && !scope.row.isScattered"
															@change="(value: any) => handleActualPriceChange(value, scope.row)"
														/>
													</template>
												</el-table-column>
												<el-table-column label="操作" width="50" fixed="right" align="center">
													<template #default="scope">
														<el-button icon="ele-Delete" size="small" text="" type="danger" @click="handleDeletePaymentCarts([scope.row])"> </el-button>
													</template>
												</el-table-column>
											</el-table>
										</div>
									</template>
								</el-collapse-item>
							</el-collapse>
						</div>

						<el-empty v-else description="暂无收款项" />
					</el-main>
					<el-footer v-if="cartTableData.length > 0">
						<el-row>
							<el-col :span="16">
								<el-button type="danger" :disabled="!deleteDisabled" @click="batchDeletePaymentCarts">删除：{{ selectProductLength }}项</el-button>
							</el-col>
							<el-col :span="8">
								<el-form ref="queryForm" class="bottom-group" :inline="true">
									<el-form-item label="总金额：">
										<el-input-number
											:precision="2"
											:min="0"
											:max="totalAmountComputed"
											controls-position="right"
											class="input-number-width"
											v-model="payTotalAmount"
											@change="handlePaymentAmountChange"
										/>
									</el-form-item>
									<el-form-item>
										<el-button :disabled="cartTableLoading || customerFundLoading || customerLoading || multipleSelection.length === 0" type="primary" @click="openPaymentMethods">支付</el-button>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
					</el-footer>
				</el-container>
			</el-col>
		</el-row>

		<paymentMethodsDrawer ref="paymentMethodsDrawerRef" @refresh="loadCustomer" />
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { Search, ArrowRight, Select, ArrowDown } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import commonFunction from '/@/utils/commonFunction';
import { PcustomerApi, PaymentCartsApi, WillPaymentApi, MemberDepositApi } from '/@/api-services/api';
import { PaymentCartsForCustomerInput } from '/@/api-services/models/cart-manage/index';
import paymentMethodsDrawer from '/@/views/payments/pays/components/paymentmethods.vue';
import Decimal from 'decimal.js';
import { formatDate } from '/@/utils/formatTime';
import { ElMessageBox, ElMessage } from 'element-plus';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import other from '/@/utils/other';

const { adjustAmounts } = commonFunction();
const paymentMethodsDrawerRef = ref();
const checkedPayData = ref<any>([]);
const slectCustomerIndex = ref<string>('0');
const multipleSelection = ref<any>([]);
const payTotalAmount = ref<number>(0.0);
const queryParams = ref<any>({ name: '', cellPhone: '' });
//左侧用户
const customerData = ref<any>([]);
const customerLoading = ref(false);
//用户资金相关
const customerFundData = ref<any>({});
const customerFundLoading = ref(false);
//购物车相关
const cartsTableParams = ref<PaymentCartsForCustomerInput>({
	customerId: -1,
	petIds: [-1],
});
const cartTableData = ref<any>([]);
const cartTableLoading = ref(false);
const secondaryCardData = ref<any>([]);
const depositTypes = ref<any>([]);

/**
 * 子项选中和取消选中事件
 * @param row 子项本身
 * @param parent 组
 */
const detailChecked = (row: any, parent: any) => {
	if (row.checked) {
		if (parent.paymentCarts.some((m: any) => m.checked == false)) {
			parent.indeterminate = true;
		} else {
			parent.indeterminate = false;
			parent.checked = true;
		}
		multipleSelection.value.push(row);
	} else {
		if (parent.paymentCarts.some((m: any) => m.checked == true)) {
			parent.indeterminate = true;
		} else {
			parent.indeterminate = false;
			parent.checked = false;
		}
		multipleSelection.value = multipleSelection.value.filter((item: any) => item.id != row.id);
	}
	computeTotalAmount();
};
/**
 * 外部项选中事件
 * @param row 组本身
 */
const checkBoxChange = (row: any) => {
	if (!row.checked) {
		row.indeterminate = false;
		let objectsToRemoveIds = new Set();
		row.paymentCarts.forEach((item: any) => {
			objectsToRemoveIds.add(item.id);
		});
		multipleSelection.value = multipleSelection.value.filter((obj: any) => !objectsToRemoveIds.has(obj.id));
	} else {
		row.paymentCarts.forEach((item: any) => {
			multipleSelection.value.push(item);
		});
	}
	row.paymentCarts.forEach((item: any) => {
		item.checked = row.checked;
	});
	computeTotalAmount();
};
/**
 * 展开关闭变更事件
 * @param data
 * @param row
 */
const collapseChange = (data: any, row: any) => {
	row.isActive = (data.target.getAttribute('class')?.includes('is-active') && row.isActive) || !row.isActive;
};
/**
 * 批量删除购物车数据
 */
const batchDeletePaymentCarts = () => {
	handleDeletePaymentCarts(multipleSelection.value);
};

/**
 * 删除购物车
 * @param rows 选中的行
 */
const handleDeletePaymentCarts = (rows: any) => {
	ElMessageBox.confirm(`确定要删除收款项目吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			cartTableLoading.value = true;
			let deleteCarts = rows.map((item: any) => {
				return { id: item.id, ver: item.ver };
			});
			await getAPI(PaymentCartsApi)
				.apiPaymentCartsDeleteCartsPost(deleteCarts)
				.then(async () => {
					cartTableLoading.value = false;
					ElMessage.success('删除成功');
					//删除选中集合
					multipleSelection.value.forEach(function (item: any, index: number, sourceList: any) {
						if (rows.includes(item)) sourceList.splice(index, 1);
					});
					//手动删除表格数据防止刷新页面
					cartTableData.value.forEach((item: any, indexParent: number, sourceParent: any) => {
						item.paymentCarts.forEach((child: any, index: number, sourceList: any) => {
							if (rows.includes(child)) {
								sourceList.splice(index, 1);
								item.itemCount -= 1;
							}
						});
						if (item.paymentCarts.length == 0) sourceParent.splice(indexParent, 1);
					});
					await loadPaymentCarts();
				})
				.catch(() => {
					cartTableLoading.value = false;
				});
		})
		.catch(() => {
			cartTableLoading.value = false;
		});
};
/**
 * 打开支付方式
 */
const openPaymentMethods = async () => {
	if (multipleSelection.value.length > 0) {
		let paymentDetails = [] as any;
		multipleSelection.value.forEach((item: any) => {
			paymentDetails.push(item);
		});
		let info = {
			actualTotalAmount: payTotalAmount.value,
			paymentDetails: paymentDetails,
			customerId: customerFundData.value.id,
			customerName: customerFundData.value.name,
			depositTypes: depositTypes.value,
			secondaryCardData: secondaryCardData.value,
		};
		let rowInfo = other.deepClone(info);
		paymentMethodsDrawerRef.value.openDrawer(rowInfo);
	}
};

/**
 * 直接修改金额
 */
const handlePaymentAmountChange = (value: any) => {
	let totalAmountValue = totalAmountComputed;
	let actualPriceArray = multipleSelection.value.map((row: any) => new Decimal(row.actualPrice).toFixed(2, Decimal.ROUND_DOWN));
	let priceResult = adjustAmounts(actualPriceArray, totalAmountValue.value, value);
	priceResult.forEach((item: any, index: number) => {
		multipleSelection.value[index].actualPrice = item;
		multipleSelection.value[index].isEditPrice = true;
		let row = multipleSelection.value[index];
		let discountRatio = new Decimal(item).div(new Decimal(row.amountPrice)).toFixed(2, Decimal.ROUND_DOWN);
		multipleSelection.value[index].discountRatio = new Decimal(discountRatio).toNumber();
	});
};
/**
 * 折扣率变更事件
 * @param value 变更后的值
 * @param row 当前行对象
 */
const handleDiscountRatioChange = (value: any, row: any) => {
	if (!value) {
		row.discountRatio = 1;
	}
	let actualAmount = new Decimal(row.amountPrice).mul(new Decimal(value)).toFixed(2, Decimal.ROUND_DOWN);
	row.actualPrice = new Decimal(actualAmount).toNumber();
	row.isEditPrice = true;
	computeTotalAmount();
};
/**
 * 结算金额改变事件
 * @param value 变更后的值
 * @param row 当前行对象
 */
const handleActualPriceChange = (value: any, row: any) => {
	if (!value) {
		row.actualPrice = 0;
	}
	let discountRatio = new Decimal(row.actualPrice).div(new Decimal(row.amountPrice)).toFixed(2, Decimal.ROUND_DOWN);
	if (discountRatio == '0.00') discountRatio = '0.01';
	row.discountRatio = new Decimal(discountRatio).toNumber();
	row.isEditPrice = true;
	computeTotalAmount();
};
/**
 * 计算总金额
 */
const computeTotalAmount = () => {
	const totalAmountValue = multipleSelection.value.reduce((pre: any, item: any) => {
		return new Decimal(pre).add(new Decimal(item.actualPrice));
	}, 0);
	const result = totalAmountValue.toFixed(2, Decimal.ROUND_UP);
	payTotalAmount.value = new Decimal(result).toNumber();
};

/**
 * 加载可付款用户列表
 */
const loadCustomer = async () => {
	customerLoading.value = true;
	customerFundLoading.value = true;
	cartTableLoading.value = true;
	cartsTableParams.value.customerId = -1;
	let res = await getAPI(WillPaymentApi).apiWillPaymentGetWillPaymentCustomerPetListPost(queryParams.value);
	customerLoading.value = false;
	customerData.value = res.data.result ?? [];
	customerData.value.forEach((item: any) => {
		item['petIds'] = item.pets.map((v: any) => {
			return v.id;
		});
		item['collapseId'] = item.name;
	});
	if (customerData.value.length > 0) {
		await handleCustomer(customerData.value[0]);
	} else {
		customerFundData.value = {};
		cartTableData.value = [];
		multipleSelection.value = [];
		customerFundLoading.value = false;
		cartTableLoading.value = false;
	}
};

/**
 * 选中用户事件
 * @param val 当前选中用户对象
 */
const handleCustomer = async (val: any) => {
	if (cartsTableParams.value.customerId == val.id) return;
	cartsTableParams.value.customerId = val.id;
	cartsTableParams.value.petIds = val.pets.map((v: any) => {
		return v.id;
	});
	slectCustomerIndex.value = val.id + '';
	customerFundLoading.value = true;
	cartTableLoading.value = true;
	let res = await getAPI(PcustomerApi).apiPcustomerIdGetCustomerFundGet(val.id);

	customerFundLoading.value = false;
	customerFundData.value = res.data.result ?? {};
	await loadPaymentCarts();
	await loadCanSecondaryCardDatas();
	await loadCanDepositTypes();
};
/**
 * 加载支付清单
 */
const loadPaymentCarts = async () => {
	multipleSelection.value = [];
	checkedPayData.value.length = 0;
	if (cartsTableParams.value.petIds && cartsTableParams.value.petIds.length > 0) {
		let res = await getAPI(PaymentCartsApi).apiPaymentCartsGetPaymentCartsGroupDatePost(cartsTableParams.value);
		cartTableData.value = res.data.result ?? [];
		cartTableLoading.value = false;
		cartTableData.value.forEach((item: any) => {
			checkedPayData.value.push(item.id);
			item.paymentCarts.forEach((child: any) => {
				multipleSelection.value.push(child);
			});
		});
	} else {
		cartTableLoading.value = false;
		cartTableData.value = [];
	}
	computeTotalAmount();
};
/**
 * 宠物选中事件
 * @param value 当前组件选中值集合
 */
const handleCheckedPetChange = async (value: any) => {
	if (cartsTableParams.value.petIds?.includes(value)) {
		let index = cartsTableParams.value.petIds?.findIndex((ele) => ele == value);
		cartsTableParams.value.petIds?.splice(index, 1);
	} else {
		cartsTableParams.value.petIds?.push(value);
	}
	// cartsTableParams.value.petIds = value;
	cartTableLoading.value = true;
	await loadPaymentCarts();
};
/**
 * 选中产品个数计算
 */
const selectProductLength = computed((): number => {
	return multipleSelection.value.length;
});
/**
 * 删除选中按钮状态
 */
const deleteDisabled = computed(() => {
	return selectProductLength.value > 0;
});
/**
 * 页面加载时
 */

onMounted(async () => {
	await loadCustomer();
});
/**
 * 加载可用的次卡
 */
const loadCanSecondaryCardDatas = async () => {
	let res = await getAPI(PcustomerApi).apiPcustomerCustomerIdGetCustomerSecondaryCardListGet(customerFundData.value.id);
	secondaryCardData.value = res.data.result ?? [];
};
/**
 * 加载可用的押金类型及金额
 */
const loadCanDepositTypes = async () => {
	let res = await getAPI(MemberDepositApi).apiGetMemberDepositListGet(customerFundData.value.id);
	depositTypes.value = res.data.result ?? [];
};

const totalAmountComputed = computed(() => {
	let totalAmountValue = multipleSelection.value.reduce((pre: any, item: any) => {
		let accumulateAmount = new Decimal(pre).add(new Decimal(item.amountPrice));
		return new Decimal(accumulateAmount);
	}, 0);
	const result = totalAmountValue.toFixed(2, Decimal.ROUND_UP);
	return new Decimal(result).toNumber();
});
</script>
<style scoped lang="scss">
.will-pay-container {
	.right-btn {
		position: absolute;
		right: 32px;
		top: 20px;
	}

	:deep(.search-input .el-input__wrapper) {
		border-radius: 20px;
		height: 34px;
		padding-right: 40px;
	}

	:deep(.el-input-number.is-controls-right .el-input__wrapper) {
		padding-right: 15px;
	}

	:deep(.el-table__indent) {
		display: none;
	}

	:deep(.el-input-number.is-controls-right .el-input-number__decrease) {
		display: none;
	}

	:deep(.el-input-number.is-controls-right .el-input-number__increase) {
		display: none;
	}
	:deep(.el-main) {
		padding: 0px 20px 0px 20px !important;
	}
	.layout-mian-height-160 {
		height: calc(100vh - 100px);
		background-color: white;

		.container-header-left {
			position: relative;
			background-color: white;
			display: grid;
			align-items: center;
		}

		.container-main-left {
			cursor: pointer;
			--el-card-padding: 15px;

			.container-main-left-card {
				border-radius: 12px;
				margin-bottom: 14px;
				// padding:5px;
				padding: 0;
				background: #f2f4ff;

				:deep(.el-card__body) {
					padding: 3px;
				}

				.cus-info {
					display: flex;
					align-items: center;
					padding: 9px 9px 0;

					.cus-name {
						font-size: 16px;
						font-weight: 550;
					}

					.cus-level {
						margin-left: 6px;
						padding: 0 3px;
						border-radius: 4px;
						height: 18px;
						font-size: 12px;
						background: #0d76ef;
						color: #fff;
					}
				}

				.cus-phone {
					margin-top: 5px;
					padding: 0 9px;
					color: #999999;
					font-size: 12px;
				}

				.pet-card {
					display: flex;
					flex-wrap: wrap;
					margin-top: 10px;
					padding: 10px;
					border-radius: 10px;

					.pet-item {
						margin-right: 14px;
						display: flex;
						flex-direction: column;
						justify-content: center;

						.pet-img {
							position: relative;
							width: 40px;
							height: 40px;
							border-radius: 50%;
							background: #ccc;
							cursor: pointer;

							img {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}

							.active-pet {
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								background: rgba(0, 0, 0, 0.5);
								border-radius: 50%;
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}

						.pet-name {
							text-align: center;
							font-size: 12px;
							color: #333;
						}
					}
				}
			}

			.el-card-product {
				transition: all 0.05s;
			}

			.active-product {
				background: #337ecc;

				.cus-info {
					.cus-name {
						color: #fff;
					}

					.cus-level {
						background: #fff;
						color: #0d76ef;
					}
				}

				.cus-phone {
					margin-top: 5px;
					color: rgba(255, 255, 255, 0.5);
					font-size: 12px;
				}

				.pet-card {
					// background: #409EFF;
					.pet-item .pet-name {
						color: #fff;
					}
				}
			}

			.container-main-left-pet {
				margin: 10px 0 !important;
			}

			:deep(.el-card__body) {
				padding: 10px;
			}
		}

		.container-header-center {
			background-color: white;
			display: grid;
			align-items: center;

			.cus-detail {
				margin-top: 15px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left-info {
					display: flex;
					align-items: center;
					:deep(.el-breadcrumb) {
						line-height: 2;
					}
				}

				.right-info {
					display: flex;
					align-items: center;

					.amount {
						margin-right: 20px;
						font-size: 14px;
					}
				}
			}
		}

		:deep(.table-header) {
			height: 42px;
		}

		:deep(.el-table__row--level-0) {
			height: 46px;
		}

		.container-main-center {
			background-color: #ffffff;

			.input-number-width {
				width: 100% !important;
			}

			:deep(.el-table__placeholder) {
				width: 0px;
			}

			.container-main-center-table-content {
				:deep(.el-collapse-item__arrow) {
					display: none;
				}
			}
		}
	}

	.bottom-group {
		:deep(.el-form-item__label) {
			line-height: 40px;
			font-size: 16px;
		}

		:deep(.el-input-number) {
			height: 40px;
			width: 120px;

			.el-input__wrapper {
				box-shadow: none;
				border-radius: 10px;
				background: #f2f2f2;
				font-size: 16px;
			}
		}

		.el-button {
			height: 40px;
			width: 100px;
			border-radius: 10px;
		}
	}
}
</style>
