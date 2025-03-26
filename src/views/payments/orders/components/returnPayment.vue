<template>
    <div class="return-order-manage-container">
        <el-dialog v-model="isShowDialog" title="退单" width="80%" draggable :close-on-click-modal="false"
            destroy-on-close>
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit />
                    </el-icon>
                    <span>退单</span>
                </div>
            </template>
            <el-row>
                <el-col :span="18">
                    <el-card v-if="canReturnOrder" class="left-card" v-loading="pageLoading">
                        <el-table ref="returnTableRef" :data="paymentInfo.details" stripe max-height="500" border
                            @selection-change="handleDetailChange">
                            <el-table-column type="selection" width="40" align="center" />
                            <el-table-column label="宠物名称" prop="petName" width="100">
                                <template #default="scope">
                                    <el-text>{{ scope.row.petName }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="费用类型" prop="costTypeText" width="100">
                                <template #default="scope">
                                    <el-text>{{ scope.row.costTypeText }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="项目名称" prop="productName" show-overflow-tooltip="">
                                <template #default="scope">
                                    <el-text>{{ scope.row.productName }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="单价" prop="settlementPrice" width="80">
                                <template #default="scope">
                                    <el-text>{{ verifyNumberComma(scope.row.settlementPrice.toFixed(2)) || '0.00'
                                        }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="付款金额" prop="actualPrice" width="80">
                                <template #default="scope">
                                    <el-text>{{ verifyNumberComma(scope.row.actualPrice.toFixed(2)) || '0.00'
                                        }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位" prop="outUnitName" width="100">
                                <template #default="scope">
                                    <el-text>{{ scope.row.outUnitName }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="销售员" prop="saleName" width="80">
                                <template #default="scope">
                                    <el-text>{{ scope.row.saleName }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="可退" prop="count" width="60">
                                <template #default="scope">
                                    <el-text>{{ scope.row.count }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="已退" prop="count" width="60">
                                <template #default="scope">
                                    <el-text>{{ scope.row.returnCount }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="退单数量" width="100">
                                <template #default="scope">
                                    <el-input-number style="width:100%" v-model="scope.row.canReturn" :precision="0"
                                        :min="1" :max="scope.row.count" controls-position="right"
                                        @change="(value: any) => handleReturnCount(value, scope.row)" />
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row>
                            <el-col :span="24">
                                <el-text type="danger">注：1、次卡结算只能原路退回。2、已使用的次卡项目不支持退款。</el-text>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">订单编号：
                                <el-text size="default" tag="b">{{ returnInput.serialNumber }}</el-text>
                            </el-col>
                            <el-col :span="6">可退金额：
                                <el-text type="success" size="default">{{ verifyNumberComma(canReturnAmount.toFixed(2))
                                    || '0.00'
                                    }}</el-text>
                            </el-col>
                            <el-col :span="6">退款金额：
                                <el-text type="danger" size="default">{{ verifyNumberComma(returnAmount) || '0.00'
                                    }}</el-text>
                            </el-col>
                            <el-col :span="6"></el-col>
                        </el-row>
                    </el-card>

                    <el-empty style="height: 600px;" v-else description="暂无收款项" />
                </el-col>
                <el-col :span="6">
                    <el-card v-if="canReturnOrder" class="right-card" v-loading="pageLoading">
                        <el-form :model="formModel" label-width="50px">
                            <el-row>
                                <el-col :span="12" v-for="(item, index) in paymentMethods" :key="index" :offset="0">
                                    <el-form-item style="height: 38px;">
                                        <template #label>
                                            <img :src="paymentTypeImgs[item.value]" width="30px" height="30px;">
                                        </template>
                                        <el-input-number v-if="item.value == 'secondarycard'"
                                            v-model="paymentInfo.paymentMethodObject[item.id]" :min="0"
                                            :precision="0" :max="paymentInfo.actlyAmount"
                                            :placeholder="!customerFundDetails.secondaryCard ? '不可退' + item.label : item.label"
                                            controls-position="right" size="default" disabled
                                            @change="(value: any) => handlePaymentMethodsChange(value, item)" />
                                        <el-input-number v-else-if="item.value == 'memberscard'"
                                            v-model="paymentInfo.paymentMethodObject[item.id]" :min="0.00"
                                            :precision="2" :max="paymentInfo.actlyAmount"
                                            :placeholder="!customerFundDetails.membersCard ? '不可退' + item.label : item.label"
                                            controls-position="right" size="default"
                                            :disabled="!customerFundDetails.membersCard"
                                            @change="(value: any) => handlePaymentMethodsChange(value, item)" />
                                        <el-input-number v-else-if="item.value == 'deposit'"
                                            v-model="paymentInfo.paymentMethodObject[item.id]" :min="0.00"
                                            :precision="2" :max="paymentInfo.actlyAmount"
                                            :placeholder="paymentInfo.isScattered ? '不可退' + item.label : item.label"
                                            controls-position="right" size="default" :disabled="paymentInfo.isScattered"
                                            @change="(value: any) => handlePaymentMethodsChange(value, item)" />
                                        <el-input-number v-else v-model="paymentInfo.paymentMethodObject[item.id]"
                                            :min="0.00" :precision="2" :max="paymentInfo.actlyAmount"
                                            :placeholder="item.label" controls-position="right" size="default"
                                            @change="(value: any) => handlePaymentMethodsChange(value, item)" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>

                        <div>
                            <el-input type="textarea" placeholder="请输入退款原因" v-model="returnInput.remark" show-word-limit
                                maxlength="100" :rows="3" />
                        </div>
                    </el-card>

                </el-col>
            </el-row>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel" size="default">取 消</el-button>
                    <el-button type="primary" :loading="submitLoading" @click="submitReturnOrder" size="default" :disabled="!submitDisbled">退
                        款</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { ConsumptionApi, ReturnPaymentApi } from '/@/api-services/api';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import Decimal from 'decimal.js';
import commonFunction from "/@/utils/commonFunction";

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

const { equalDivision, getSubArray } = commonFunction();

//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const formModel = ref<any>({});
const isShowDialog = ref(false);
const paymentInfo = ref<any>();
const paymentStatusType = ref<any>({})
const returnTableRef = ref();
const paymentMethods = ref<any>([]);
const returnInput = ref<any>({
    remark: '',
    paymentId: 0,
    serialNumber: '',
    paymentVer: '',
    paymentMethods: [],
    returnPaymentDetails: [],
    customerId: 0,
});
const paymentTypeImgs = ref<any>({
    "account": account,
    "ali": ali,
    "applet": applet,
    "cash": cash,
    "deposit": deposit,
    "jd": jd,
    "meituan": meituan,
    "memberscard": memberscard,
    "other": other,
    "pos": POS,
    "secondarycard": secondarycard,
    "taobao": taobao,
    "tiktok": tiktok,
    "wechat": wechat
})
const customerFundDetails = ref<any>({});
const multipleSelectionData = ref<any>([]);
const sourcePaymentMethodObject = ref<any>({});
const secondaryCardId = ref<string>('0');
const pageLoading = ref<boolean>(false);
const canReturnOrder = ref<boolean>(true);
const secondaryCardRowChangeValue = ref<any>(false);
const submitLoading=ref<any>(false);
/**
 * 可退款总金额
 */
const canReturnAmount = computed(() => {
    let canTotalAmount = new Decimal(0);
    for (const key in sourcePaymentMethodObject.value) {
        if (Object.prototype.hasOwnProperty.call(sourcePaymentMethodObject.value, key)) {
            const element = sourcePaymentMethodObject.value[key];
            canTotalAmount = new Decimal(element).add(canTotalAmount);
        }
    }
    return canTotalAmount.toNumber();
});

/**
 * 计算退款金额
 */
const returnAmount = computed(() => {
    if (multipleSelectionData.value && multipleSelectionData.value.length > 0) {
        let resultAmount = multipleSelectionData.value.reduce((total: any, item: any) => {
            let returnAmountValue = item.returnAmount || 0;
            return new Decimal(total).add(new Decimal(returnAmountValue));
        }, 0);
        return resultAmount.toFixed(2, Decimal.ROUND_UP);
    }
    else {
        return '0.00';
    }

});
/**
 * 打开弹窗
 * @param row 
 */
const openDialog = async (row: any) => {
    canReturnOrder.value = true;
    pageLoading.value = true;
    isShowDialog.value = true;
    paymentInfo.value = row.data;
    paymentInfo.value.actlyAmount= new Decimal(paymentInfo.value.actlyAmount).toNumber();
    if (paymentInfo.value.details == undefined) {
        let details = await getAPI(ConsumptionApi).apiConsumptionGetPaymentDetailsPost({ paymentId: paymentInfo.value.id, customerId: paymentInfo.value.customerId });
        paymentInfo.value.details = details.data.result ?? [];
    }
    if (paymentInfo.value.details.filter((m: any) => m.count - m.returnCount > 0).length == 0) {
        ElMessage.error('该订单暂无可退项目');
        canReturnOrder.value = false;
        return;
    }
    await loadCustomerFundDetails();
    let paymentDetails = paymentInfo.value.details.filter((item: any) => item.count != item.returnCount && item.status != 2)
    paymentDetails.forEach((row: any) => {
        console.log("row", row)
        let resultArray = equalDivision(row.actualPrice, row.count);
        let rangeList = getSubArray(resultArray, row.returnCount, row.canReturn)
        let handleAmount = rangeList.reduce((pre: number, itemAmount: number) => {
            let accumulateAmount = new Decimal(pre).add(new Decimal(itemAmount));
            return accumulateAmount;
        }, 0);
        row.returnAmount = new Decimal(handleAmount).toNumber();
    });
    paymentInfo.value.details = paymentDetails;
    paymentStatusType.value = row.paymentStatusType;
    paymentMethods.value = row.paymentMethods;
    returnInput.value.remark = '';
    returnInput.value.customerId = paymentInfo.value.customerId;
    returnInput.value.serialNumber = paymentInfo.value.serialNumber;
    returnInput.value.paymentId = paymentInfo.value.id;
    returnInput.value.paymentVer = paymentInfo.value.ver;
    returnTableRef.value?.toggleAllSelection();
    sourcePaymentMethodObject.value = paymentInfo.value.paymentMethodObject;
    secondaryCardId.value = paymentMethods.value.find((item: any) => item.value == "secondarycard")?.id || '0';
};
/**
 * 加载用户资金详情
 */
const loadCustomerFundDetails = async () => {
    await getAPI(ConsumptionApi).apiConsumptionGetOrderCustomerFundPost({ id: paymentInfo.value.id, customerId: paymentInfo.value.customerId }).then((res: any) => {
        pageLoading.value = false;
        customerFundDetails.value = res.data.result ?? {};
    }).catch(() => {
        pageLoading.value = false;
    });

}

/**
 * 表格选择项发生改变时事件
 * @param newSelection 最新的选择行
 */
const handleDetailChange = (newSelection: any) => {
    multipleSelectionData.value = newSelection;
    const secondaryCardRowInfo = multipleSelectionData.value.find((item: any) => item.isSecondaryCard == true);
    let secondaryCardRowAmount = 0;
    let secondaryCardRowChange = false;
    if (secondaryCardRowInfo != null && !secondaryCardRowChangeValue.value) {
        secondaryCardRowChangeValue.value = true;
        secondaryCardRowChange = true;
        secondaryCardRowAmount = secondaryCardRowInfo.returnAmount;
        handleReturnCount(secondaryCardRowInfo.canReturn, secondaryCardRowInfo);
        return;
    }
    else {
        secondaryCardRowChangeValue.value = false;
    }
    handlePaymentMethodsAmount(secondaryCardRowChange, secondaryCardRowAmount);
}
/**
 * 支付方式变更
 * @param value 
 * @param item 
 */
const handlePaymentMethodsChange = (value: any, item: any) => {
    if (!value) item.amount = 0;
}
/**
 * 退款个数变更
 */
const handleReturnCount = (value: any, row: any) => {
    if (!value) {
        row.canReturn = 1;
        return;
    }
    if (!multipleSelectionData.value.find((item: any) => item.id == row.id)) {
        return;
    }
    let resultArray = equalDivision(row.actualPrice, row.count);
    let rangeList = getSubArray(resultArray, row.returnCount, row.canReturn)
    let handleAmount = rangeList.reduce((pre: number, itemAmount: number) => {
        let accumulateAmount = new Decimal(pre).add(new Decimal(itemAmount));
        return accumulateAmount;
    }, 0);
    row.returnAmount = new Decimal(handleAmount).toNumber();
    handlePaymentMethodsAmount(row.isSecondaryCard, row.returnAmount);
}
/**
 * 处理支付方式的金额
 */
const handlePaymentMethodsAmount = (secondaryCardRowChange: boolean, amount: number) => {
    let sourcePayemntMethods = sourcePaymentMethodObject.value;
    let payemntMethods = { ...sourcePayemntMethods };
    payemntMethods[secondaryCardId.value] = secondaryCardRowChange ? amount : (multipleSelectionData.value.some((item: any) => item.isSecondaryCard == true) ? paymentInfo.value.paymentMethodObject[secondaryCardId.value] : 0);

    let sourceActualPrice = new Decimal(returnAmount.value).sub(payemntMethods[secondaryCardId.value]);
    let nextSubAmount = sourceActualPrice;
    //此处需要重新计算    
    for (const key in payemntMethods) {
        if (secondaryCardId.value == key + '') {
            continue;
        }
        const amountValue = new Decimal(payemntMethods[key]); 
        if (nextSubAmount.toNumber() <= 0) {
            payemntMethods[key] = 0;
        }
        else if (amountValue.comparedTo(nextSubAmount) >= 0) {
            payemntMethods[key] = nextSubAmount.toNumber();
            nextSubAmount = new Decimal(0);
        }
        else{
            payemntMethods[key] = amountValue;
            nextSubAmount = nextSubAmount.sub(amountValue);
        }
    }
    paymentInfo.value.paymentMethodObject = payemntMethods;
    console.log("paymentInfo.value.paymentMethodObject",paymentInfo.value.paymentMethodObject)
}

// 关闭弹窗
const closeDialog = () => {
    emit('reloadTable');
    isShowDialog.value = false;
};

// 取消
const cancel = () => {
    isShowDialog.value = false;
};
/**
 * 提交退款
 */
const submitReturnOrder = async () => {
    submitLoading.value=true;
    let payemntMethods = paymentInfo.value.paymentMethodObject;
    let submitReturnAmount = new Decimal(0);
    const submitPaymentMethod = [] as any;
    for (const key in payemntMethods) {
        const amountValue = payemntMethods[key];
        submitReturnAmount = new Decimal(amountValue).add(submitReturnAmount);
        if (amountValue > 0) {
            const methodInfo = paymentInfo.value.payMethods.find((item: any) => item.typeId == key) ?? { businessId: 0 };
            const systemMethodInfo = paymentMethods.value.find((item: any) => item.id == key);
            submitPaymentMethod.push({
                remark: '',
                id: key,
                name: systemMethodInfo.value,
                code: systemMethodInfo.code,
                businessId: methodInfo.businessId,
                amount: amountValue
            })
        }
    }
    if (submitReturnAmount.toNumber() !== new Decimal(returnAmount.value).toNumber()) {
        submitLoading.value=false;
        ElMessage.warning('退款金额不正确！');
        return;
    }
    let multipleSelections = returnTableRef.value.getSelectionRows();
    returnInput.value.returnPaymentDetails = multipleSelections;
    returnInput.value.paymentMethods = submitPaymentMethod;
    const sourceSecondaryCardAmount = multipleSelections.filter((item: any) => item.isSecondaryCard == true).reduce((prev: any, cur: any) => new Decimal(prev).add(cur.returnAmount), 0).toFixed(2, Decimal.ROUND_UP)
    //实际提交时次卡支付金额  
    const factSecondaryCardAmount = paymentInfo.value.paymentMethodObject[secondaryCardId.value] || 0;
    if (new Decimal(sourceSecondaryCardAmount).toNumber() !== new Decimal(factSecondaryCardAmount).toNumber()) {
        submitLoading.value=false;
        ElMessage.warning('次卡支付金额不正确！');
        return;
    }
    await getAPI(ReturnPaymentApi).apiReturnPaymentReturnPaymentPost(returnInput.value).then(() => {
        submitLoading.value=false;
        ElMessage.success('退单成功！');
        closeDialog();
    }).catch((res)=>{
        submitLoading.value=false;
    });
}
/**
 * 计算提交按钮是否禁用
 */
const submitDisbled = computed(() => {
    if (!returnTableRef.value) return false;
    else {
        return returnTableRef.value.getSelectionRows().length > 0
    }
})


//将属性或者函数暴露给父组件
defineExpose({ openDialog });

</script>

<style lang="scss" scoped>
.return-order-manage-container {

    :deep(.el-input-number.is-controls-right .el-input__wrapper) {
        padding-right: 15px;
    }

    :deep(.el-input-number.is-controls-right .el-input-number__decrease) {
        display: none;
    }

    :deep(.el-input-number.is-controls-right .el-input-number__increase) {
        display: none;
    }

    .left-card {

        height: 600px;

    }

    .right-card {
        height: 600px;
        margin-left: 10px;

        :deep(.el-form-item--small .el-form-item__label) {
            height: 38px;
            line-height: 38px;
            align-items: center;
            padding: 0 5px 0 0;
        }
    }
}
</style>
