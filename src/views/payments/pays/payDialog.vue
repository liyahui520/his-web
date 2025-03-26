<template>
	<div class="will-pay-container-dialog">
		<el-dialog v-model="isShowDialog" width="85%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>订单结算</span>
				</div>
			</template>
			<el-container class="layout-mian-height-160" style="border: 1px solid #eee">
				<el-header class="container-header-center">
					<el-form :model="cartsTableParams" ref="ruleFormRef" label-width="50px" style="margin-top: 10px; margin-bottom: -10px" :inline="true">
						<el-form-item label="宠物">
							<el-select v-model="cartsTableParams.petIds" style="width: 500px" multiple placeholder="请选择一只宠物" clearable>
								<el-option v-for="item in pets" :key="item.id" :label="item.petName" :value="item.id" />
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button-group>
								<el-button type="primary" icon="ele-Search" @click="loadPaymentCarts"> 查 询 </el-button>
							</el-button-group>
						</el-form-item>
						<el-form-item> </el-form-item>
					</el-form>
				</el-header>

				<el-main class="container-main-center" v-loading="cartTableLoading">
					<el-text v-if="cartTableData.length > 0 && cartTableData[0].paymentCarts[0].isScattered" type="danger" tag="b">注：当前会员为 <el-tag>散客</el-tag> 不参与任何折扣。</el-text>
					<el-text v-else-if="cartTableData.length > 0 && !cartTableData[0].paymentCarts[0].isScattered" type="danger" tag="b"
						>注：当前会员级别为 <el-tag>{{ sourceRowInfo.levelText }}</el-tag> {{ cartTableData[0].paymentCarts[0].enabledDiscount ? '参与' : '不参与' }}折扣。</el-text
					>
					<div v-if="cartTableData.length > 0" style="margin-top: 5px">
						<el-collapse class="container-main-center-table-content" v-model="checkedPayData" @click.stop>
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
														:disabled="!scope.row.isDiscount && !scope.row.isScattered"
														controls-position="right"
														class="input-number-width"
														v-model="scope.row.discountRatio"
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
														:disabled="!scope.row.isDiscount && !scope.row.isScattered"
														:max="scope.row.amountPrice"
														controls-position="right"
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
					<el-row style="margin-top: 10px">
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
									<el-button :disabled="cartTableLoading || multipleSelection.length === 0" type="primary" @click="openPaymentMethods">支付</el-button>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
				</el-footer>
			</el-container>
		</el-dialog>

		<paymentMethodsDrawer ref="paymentMethodsDrawerRef" @refresh="closeDialog" />
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import commonFunction from '/@/utils/commonFunction';
import { PcustomerApi, PaymentCartsApi, PPetsApi, MemberDepositApi } from '/@/api-services/api';
import { PaymentCartsForCustomerInput } from '/@/api-services/models/cart-manage/index';
import paymentMethodsDrawer from '/@/views/payments/pays/components/paymentmethods.vue';
import Decimal from 'decimal.js';
import { formatDate } from '/@/utils/formatTime';
import { ElMessageBox, ElMessage } from 'element-plus';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import other from '/@/utils/other';

const pets = ref<any>([]);
const { adjustAmounts } = commonFunction();
const isShowDialog = ref(false);
const paymentMethodsDrawerRef = ref();
const checkedPayData = ref<any>([]);
const multipleSelection = ref<any>([]);
const payTotalAmount = ref<number>(0.0);
//用户资金相关
const customerFundData = ref<any>({});
//购物车相关
const cartsTableParams = ref<PaymentCartsForCustomerInput>({
	customerId: -1,
	petIds: [],
});
const cartTableData = ref<any>([]);
const cartTableLoading = ref(false);
const secondaryCardData = ref<any>([]);
const depositTypes = ref<any>([]);
const sourceRowInfo = ref<any>({});

//父级传递来的函数，用于回调
const emit = defineEmits(['refresh']);
/**
 * 打开弹窗
 * @param row
 */
const openDialog = async (row: any) => {
	isShowDialog.value = true;
	sourceRowInfo.value = row;
	cartTableData.value = [];
	await getAPI(PPetsApi)
		.apiPPetsPcustomerIdDetailByCustomeridGet(row.customerId)
		.then((res) => {
			let result = res.data?.result ?? [];
			pets.value = result;
		});
	await handleCustomer(row);
};

// 关闭弹窗
const closeDialog = () => {
	emit('refresh');
	isShowDialog.value = false;
};

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
				.then(() => {
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
	let actualPriceArray = multipleSelection.value.map((row:any) => new Decimal(row.actualPrice).toFixed(2, Decimal.ROUND_DOWN));
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
	const totalAmountValue = multipleSelection.value.reduce((pre:any, item:any) => {
		return new Decimal(pre).add(new Decimal(item.actualPrice));
	}, 0);
	const result = totalAmountValue.toFixed(2, Decimal.ROUND_UP);
	payTotalAmount.value = new Decimal(result).toNumber();
};

/**
 * 选中用户事件
 * @param val 当前选中用户对象
 */
const handleCustomer = async (val: any) => {
	cartsTableParams.value.customerId = val.customerId;
	cartsTableParams.value.petIds = [val.petId];
	cartTableLoading.value = true;
	let res = await getAPI(PcustomerApi).apiPcustomerIdGetCustomerFundGet(val.customerId);

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
	cartTableLoading.value = true;
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
/**
 * 计算结算金额
 */
const totalAmountComputed = computed(() => {
	let totalAmountValue = multipleSelection.value.reduce((pre:any, item:any) => {
		let accumulateAmount = new Decimal(pre).add(new Decimal(item.amountPrice));
		return new Decimal(accumulateAmount);
	}, 0);
	const result = totalAmountValue.toFixed(2, Decimal.ROUND_UP);
	return new Decimal(result).toNumber();
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style scoped lang="scss">
.will-pay-container-dialog {
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
		height: calc(100vh - 200px);
		background-color: white;

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

			.own-info {
				margin-top: 8px;
				display: flex;

				p {
					line-height: 15px;
					margin-right: 12px;
					font-size: 12px;
					color: #666;
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
			// margin-top: 22px;

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
