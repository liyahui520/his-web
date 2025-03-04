<template>
    <div class="will-pay-container">
        <el-row>
            <el-col :span="5">
                <el-container class="layout-mian-height-160" style="border: 1px solid #eee">
                    <el-header class="container-header-left">
                        <el-input v-model="queryParams.name" placeholder="搜索会员名称/手机号" maxlength="11"
                            class="search-input input-with-select"></el-input>
                        <div class="right-btn">
                            <el-icon :size="20" color="#0D76F7" style="cursor: pointer;" @click="loadCustomer">
                                <Search />
                            </el-icon>
                        </div>
                    </el-header>
                    <el-main class="container-main-left" v-loading="customerLoading">
                        <el-card shadow="hover" class="container-main-left-card el-card-product"
                            v-for="(item, index) in customerData" :key="item.id"
                            :class="slectCustomerIndex == item.id ? 'active-product' : ''"
                            @click.native="handleCustomer(item)">
                            <div class="cus-info">
                                <p class="cus-name">{{ item.customerName }}</p>
                                <p class="cus-level" v-show="item.levelName != ''">{{ item.levelName }}</p>
                            </div>
                            <div class="cus-phone">{{ item.cellPhone }}</div>

                            <!-- <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-text tag="b" class="mx-1" size="default">{{ item.customerName }}</el-text>
                                </el-col>
                                <el-col :span="8">
                                    {{ item.cellPhone }}
                                </el-col>
                                <el-col :span="8">
                                    <el-tag v-show="item.levelName != ''" effect="dark">{{ item.levelName }}</el-tag>
                                </el-col>
                            </el-row> -->
                            <div class="pet-card">
                                <div class="pet-item" v-for="(pItem, pIndex) in item.pets" :key="pIndex">
                                    <div class="pet-img" @click="handleCheckedPetChange(pItem.id)">
                                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                                            alt="">
                                        <div class="active-pet" v-if="cartsTableParams.petIds?.includes(pItem.id)">
                                            <el-icon :size="20" color="#fff">
                                                <Select />
                                            </el-icon>
                                        </div>
                                    </div>
                                    <div class="pet-name">{{ pItem.petName }}</div>
                                </div>

                            </div>
                            <!-- <el-row type="flex" class="container-main-left-pet">
                                <el-col :span="24">
                                    <div @click.stop>
                                        <el-collapse v-model="item.collapseId" accordion>
                                            <el-collapse-item title="宠物" :name="item.name">
                                                <el-checkbox-group v-model="item.petIds" @change="handleCheckedPetChange">
                                                    <el-checkbox v-for="pet in item.pets" :key="pet.id" :label="pet.id">
                                                        {{ pet.petName }}
                                                    </el-checkbox>
                                                </el-checkbox-group>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                </el-col>
                            </el-row> -->
                        </el-card>
                    </el-main>
                </el-container>
            </el-col>
            <el-col :span="19">
                <el-container class="layout-mian-height-160" style="border: 1px solid #eee">
                    <el-header class="container-header-center" style="height:70px" v-loading="customerFundLoading">
                        <div class="cus-detail">
                            <div class="left-info">
                                <p class="name">{{ customerFundData.name }}</p>
                                <p class="level-name">{{ customerFundData.levelName ?? '' }}</p>
                                <p class="card-name">会员卡号：{{ customerFundData.cardNumber ?? '-' }}</p>
                            </div>
                            <div class="right-info">
                                <p class="amount">会员卡余额：{{ customerFundData.cardBalance ?? 0 }}</p>
                                <p class="amount">押金余额：{{ customerFundData.depositAmount ?? 0 }}</p>
                                <p class="amount">次卡余次：{{ customerFundData.secondaryCardBalance ?? 0 }}</p>
                                <p class="amount">记账金额：{{ customerFundData.secondaryCardBalance ?? 0 }}</p>
                            </div>
                        </div>
                        <div class="own-info">
                            <p class="phone">{{ customerFundData.cellPhone ?? '-' }}</p>
                            <p class="sex">{{ customerFundData.sexText ?? '' }}</p>
                        </div>

                    </el-header>

                    <el-main class="container-main-center">
                        <el-table v-loading="cartTableLoading" ref="willPayTableRef" row-key="id" default-expand-all
                            empty-text="暂无收款项" :size="'default'" :data="cartTableData" :span-method="arraySpanMethod"
                            :tree-props="{ children: 'paymentCarts' }" height="100%" @select="handleSelectionChange"
                            @select-all="handleSelectAll" header-row-class-name="table-header">
                            <el-table-column type="selection" align="center" :reserve-selection="true" width="30" />
                            <el-table-column prop="petName" label="宠物名称" width="80">
                                <template #default="scope">
                                    <span v-if="!scope.row.petName">下单日期：<el-text tag="b" style="margin-right: 20px;">
                                            {{ formatDate(new Date(scope.row.createTime), 'YYYY-mm-dd') }}</el-text>
                                        项数：<el-text tag="b" type="primary"> {{ scope.row.itemCount }}</el-text></span>
                                    <span v-else>{{ scope.row.petName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="costTypeName" label="收费类型" width="100" show-overflow-tooltip />
                            <el-table-column prop="productName" label="收费项目" show-overflow-tooltip>
                                <template #default="scope">
                                    <el-text type="danger" v-if="scope.row.isMeal">[套餐]</el-text>
                                    <el-text type="danger" v-else-if="scope.row.isPackage">[打包]</el-text>
                                    <span>{{ scope.row.productName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="saleName" label="销售人员" width="100" show-overflow-tooltip />
                            <el-table-column prop="salePrice" label="单价" width="100" show-overflow-tooltip />
                            <el-table-column prop="memberPrice" label="会员价" width="100" show-overflow-tooltip />
                            <el-table-column prop="count" label="数量" width="60" />
                            <el-table-column prop="discountRatio" label="折扣率" width="100">
                                <template #default="scope">
                                    <el-input-number :precision="2" :min="0" :max="1" controls-position="right"
                                        class="input-number-width" v-model="scope.row.discountRatio"
                                        @change="(value: any) => handleDiscountRatioChange(value, scope.row)" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="actualPrice" label="合计" width="120">
                                <template #default="scope">
                                    <el-input-number class="input-number-width" v-model="scope.row.actualPrice"
                                        :precision="2" :min="0" :max="scope.row.amountPrice" controls-position="right"
                                        @change="(value: any) => handleActualPriceChange(value, scope.row)" />
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="50" fixed="right" align="center">
                                <template #default="scope">
                                    <el-button icon="ele-Delete" size="small" text="" type="danger"
                                        @click="handleDeletePaymentCarts([scope.row])"> </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>
                    <el-footer>
                        <el-row>
                            <el-col :span="16">
                                <el-button type="danger" :disabled="!deleteDisabled"
                                    @click="batchDeletePaymentCarts">删除：{{
                                        selectProductLength }}项</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-form ref="queryForm" class="bottom-group" :inline="true">
                                    <el-form-item label="总金额：">
                                        <el-input-number :precision="2" :min="0" :max="totalAmountComputed"
                                            controls-position="right" class="input-number-width"
                                            v-model="payTotalAmount" @change="handlePaymentAmountChange" />
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button
                                            :disabled="cartTableLoading || customerFundLoading || customerLoading || multipleSelection.length === 0"
                                            type="primary" @click="openPaymentMethods">支付</el-button>
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
import { Search, Delete, Select } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import commonFunction from "/@/utils/commonFunction";
import { PcustomerApi, PaymentCartsApi, WillPaymentApi } from '/@/api-services/api';
import { PaymentCartsForCustomerInput } from '/@/api-services/models/cart-manage/index';
import paymentMethodsDrawer from '/@/views/payments/pays/components/paymentmethods.vue';
import Decimal from 'decimal.js';
import { formatDate } from "/@/utils/formatTime";
import { ElMessageBox, ElMessage } from 'element-plus';


const { adjustAmounts } = commonFunction();
const paymentMethodsDrawerRef = ref();
const willPayTableRef = ref();
const slectCustomerIndex = ref<string>('0');
const multipleSelection = ref<any>([]);
const payTotalAmount = ref<number>(0.00);
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
    petIds: [-1]
})
const cartTableData = ref<any>([]);
const cartTableLoading = ref(false);

/**
 * 批量删除购物车数据
 */
const batchDeletePaymentCarts = () => {
    handleDeletePaymentCarts(multipleSelection.value)
}

/**
 * 删除购物车
 * @param rows 选中的行
 */
const handleDeletePaymentCarts = (rows: any) => {
    ElMessageBox.confirm(`确定要删除收款项目吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        cartTableLoading.value = true;
        let deleteCarts = rows.map((item: any) => { return { id: item.id, ver: item.ver }; });
        await getAPI(PaymentCartsApi).apiPaymentCartsDeleteCartsPost(deleteCarts).then(() => {
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
                    };
                });
                if (item.paymentCarts.length == 0) sourceParent.splice(indexParent, 1);

            })
        }).catch(() => {
            cartTableLoading.value = false;
        });
    }).catch(() => {

        cartTableLoading.value = false;
    });

}


/**
 * 打开支付方式
 */
const openPaymentMethods = async () => {
    paymentMethodsDrawerRef.value.openDrawer({
        actualTotalAmount: payTotalAmount.value,
        paymentDetails: multipleSelection.value,
        customerId: customerFundData.value.id,
        customerName:customerFundData.value.name
    })
}


/**
 * 直接修改金额
 */
const handlePaymentAmountChange = (value: any) => {
    let totalAmountValue = totalAmountComputed;
    let actualPriceArray = multipleSelection.value.map(row => new Decimal(row.actualPrice).toFixed(2, Decimal.ROUND_DOWN));
    let priceResult = adjustAmounts(actualPriceArray, totalAmountValue.value, value);
    priceResult.forEach((item: any, index: number) => {
        multipleSelection.value[index].actualPrice = item;
        multipleSelection.value[index].isEditPrice = true;
        let row = multipleSelection.value[index];
        let discountRatio = new Decimal(item).div(new Decimal(row.amountPrice)).toFixed(2, Decimal.ROUND_DOWN);
        multipleSelection.value[index].discountRatio = new Decimal(discountRatio).toNumber();

    })
}
/**
 * 折扣率变更事件
 * @param value 变更后的值
 * @param row 当前行对象
 */
const handleDiscountRatioChange = (value: any, row: any) => {
    let actualAmount = new Decimal(row.memberPrice).mul(new Decimal(value)).mul(new Decimal(row.count)).toFixed(2, Decimal.ROUND_DOWN);
    row.actualPrice = new Decimal(actualAmount).toNumber();
    row.isEditPrice = true;
    computeTotalAmount();
}
/**
 * 结算金额改变事件
 * @param value 变更后的值
 * @param row 当前行对象
 */
const handleActualPriceChange = (value: any, row: any) => {
    let discountRatio = new Decimal(value).div(new Decimal(row.amountPrice)).toFixed(2, Decimal.ROUND_DOWN);
    row.discountRatio = new Decimal(discountRatio).toNumber();
    row.isEditPrice = true;
    computeTotalAmount();
}
/**
 * 计算总金额
 */
const computeTotalAmount = () => {
    let totalAmountValue = multipleSelection.value.reduce((pre, item) => {
        let accumulateAmount = new Decimal(pre).add(new Decimal(item.actualPrice)).toFixed(2, Decimal.ROUND_DOWN);
        return new Decimal(accumulateAmount);
    }, 0)
    payTotalAmount.value = new Decimal(new Decimal(totalAmountValue).toFixed(2, Decimal.ROUND_DOWN)).toNumber();
}

/**
 * 全选和全不选
 * @param selection 选中项集合
 */
const handleSelectAll = (selection: any) => {
    multipleSelection.value = [];
    const result = selection.filter((item: any) => {
        return item.paymentCarts && item.paymentCarts.length > 0
    })
    if (result.length > 0) {
        result.forEach((item: any) => {
            willPayTableRef.value.toggleRowSelection(item, true);
            item.paymentCarts.forEach((child: any) => {
                multipleSelection.value.push(child);
                willPayTableRef.value.toggleRowSelection(child, true);
            });
        })
    }
    else {
        cartTableData.value.forEach((item: any) => {
            willPayTableRef.value.toggleRowSelection(item, false);
            item.paymentCarts.forEach((child: any) => {
                willPayTableRef.value.toggleRowSelection(child, false);
            });
        })
    }
    computeTotalAmount();
}
/**
 * 待付款项目明细选中变更事件
 * @param selection 选中项集合
 * @param row 点击行
 */
const handleSelectionChange = (selection: any, row: any) => {
    //点击了父级
    if (row.paymentCarts && row.paymentCarts.length > 0) {
        let status = selection.includes(row);
        row.paymentCarts.forEach((child: any) => {
            willPayTableRef.value.toggleRowSelection(child, status);
        });
    }
    //点击了子级
    else {
        let parentInfo = cartTableData.value.find((item: any) => item.paymentCarts && item.paymentCarts.includes(row))
        let isSelectedAll = parentInfo.paymentCarts.every((child: any) => !selection.includes(child));
        if (isSelectedAll) {
            willPayTableRef.value.toggleRowSelection(parentInfo, false);
        }
        else if (!selection.includes(parentInfo)) {
            willPayTableRef.value.toggleRowSelection(parentInfo, true);
        }
    }
    let selectionArr = willPayTableRef.value?.getSelectionRows();
    multipleSelection.value = [];
    selectionArr.forEach((item: any) => {
        if (item.paymentCarts && item.paymentCarts.length > 0) {
        }
        else {
            multipleSelection.value.push(item);
        }
    })
    computeTotalAmount();
}

/**
 * 处理表格折叠状态
 * @param param0 row 行对象 column 列对象, rowIndex 行索引, columnIndex 列索引
 */
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
    if (row.paymentCarts && row.paymentCarts.length > 0) {
        if (columnIndex === 1) {
            return [1, 11]
        } else if (columnIndex >= 2 && columnIndex <= 10) {
            return [0, 0];
        }
    }
}
/**
 * 加载可付款用户列表
 */
const loadCustomer = async () => {
    customerLoading.value = true;
    var res = await getAPI(WillPaymentApi).apiWillPaymentGetWillPaymentCustomerPetListPost(queryParams.value);
    customerLoading.value = false;
    customerData.value = res.data.result ?? [];
    customerData.value.forEach((item: any) => {
        item["petIds"] = item.pets.map((v: any) => { return v.id });
        item["collapseId"] = item.name;
    });

    if (customerData.value.length > 0) {
        await handleCustomer(customerData.value[0]);
    }
}

/**
 * 选中用户事件
 * @param val 当前选中用户对象
 */
const handleCustomer = async (val: any) => {
    if (cartsTableParams.value.customerId == val.id) return;
    cartsTableParams.value.customerId = val.id;
    cartsTableParams.value.petIds = val.pets.map((v: any) => { return v.id });
    slectCustomerIndex.value = val.id + '';
    customerFundLoading.value = true;
    cartTableLoading.value = true;
    var res = await getAPI(PcustomerApi).apiPcustomerIdGetCustomerFundGet(val.id);
    customerFundLoading.value = false;
    customerFundData.value = res.data.result ?? {};
    await loadPaymentCarts();
}
/**
 * 加载支付清单
 */
const loadPaymentCarts = async () => {
    willPayTableRef.value?.clearSelection();
    if (cartsTableParams.value.petIds && cartsTableParams.value.petIds.length > 0) {
        var res = await getAPI(PaymentCartsApi).apiPaymentCartsGetPaymentCartsGroupDatePost(cartsTableParams.value)
        cartTableData.value = res.data.result ?? [];
        cartTableLoading.value = false;
    }
    else {
        cartTableLoading.value = false;
        cartTableData.value = [];
    }

    willPayTableRef.value?.toggleAllSelection();
}
/**
 * 宠物选中事件
 * @param value 当前组件选中值集合
 */
const handleCheckedPetChange = async (value: any) => {
    console.log(cartsTableParams.value.petIds)
    if (cartsTableParams.value.petIds?.includes(value)) {
        let index = cartsTableParams.value.petIds?.findIndex(ele => ele == value)
        cartsTableParams.value.petIds?.splice(index, 1)
        console.log(cartsTableParams.value.petIds)
    } else {
        cartsTableParams.value.petIds?.push(value)
    }
    // cartsTableParams.value.petIds = value;
    cartTableLoading.value = true;
    await loadPaymentCarts();
}
/**
 * 选中产品个数计算
 */
const selectProductLength = computed((): number => {
    if (willPayTableRef.value) {
        let selection = multipleSelection.value.length;
        return selection;
    }
    else {
        return 0;
    }
})
/**
 * 删除选中按钮状态
 */
const deleteDisabled = computed(() => {
    return selectProductLength.value > 0;
})
/**
 * 页面加载时
 */

onMounted(async () => {
    await loadCustomer();

});

const totalAmountComputed = computed(() => {
    let result = multipleSelection.value.reduce((pre, item) => {
        let accumulateAmount = new Decimal(pre).add(new Decimal(item.amountPrice)).toFixed(2, Decimal.ROUND_DOWN);
        return new Decimal(accumulateAmount);
    }, 0)
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
                background: #F2F4FF;

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
                        background: #0D76EF;
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
                        color: #0D76EF;
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

                    .name {
                        font-size: 20px;
                    }

                    .card-name {
                        margin-left: 12px;
                        font-size: 14px;
                    }

                    .level-name {
                        margin-left: 12px;
                        padding: 0 3px;
                        border-radius: 4px;
                        height: 18px;
                        font-size: 12px;
                        background: #0D76EF;
                        color: #fff;
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

            .input-number-width {
                width: 100% !important;
            }
            :deep(.el-table__placeholder){
                width: 0px;
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