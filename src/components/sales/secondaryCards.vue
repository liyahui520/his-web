<template>
    <div class="sale-secondary-card-container">
        <el-dialog v-model="isShowDialog" width="70%" draggable :close-on-click-modal="false" destroy-on-close>
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
                        <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
            <div class="sale-secondary-card-content">
                <el-card shadow="always" v-for="(card, index) in cards" :key="index" style="margin-bottom: 10px;"
                    :class="card.checked ? 'select-border' : ''" @click="handleCardClick(card)">
                    <template #header>
                        <div class="card-header">
                            <el-row>
                                <el-col :span="18">
                                    <el-tooltip :content="card.name" placement="top" effect="light">
                                        <el-text tag="b" size="large" truncated>{{ card.name }}</el-text>
                                    </el-tooltip>
                                </el-col>
                                <el-col :span="6" style="text-align: end;">
                                    <el-text type="primary" size="default">￥{{ twoFloorNum(card.salePrice) }}</el-text>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                    <div class="card-content">
                        <el-text>项目：<span v-for="(cardItem, index) in card.secondaryCardItems" :key="index">【{{
                            cardItem.productName }}】</span></el-text>
                    </div>
                    <template #footer>
                        <div class="card-footer">
                            <el-row style="margin-bottom: 5px;margin-top: -5px;">
                                <el-col :span="19">
                                    <el-text size="default" style="margin-right: 5px;">有效期至：{{ formatDate(new
                                        Date(card.endTime), "YYYY-mm-dd") }}</el-text>
                                </el-col>
                                <el-col :span="5">
                                    <el-text size="default">次数：{{ card.totalCount }}</el-text>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                </el-card>
            </div>
            <template #footer>
                <span class="dialog-footer">

                    <el-row>
                        <el-col :span="20">
                            总金额：￥{{ twoFloorNum(computeTotalAmount) }}
                        </el-col>
                        <el-col :span="4">
                            <el-button size="default" @click="cancel">取 消</el-button>
                            <el-button type="primary" :disabled="paymentCarts.length == 0" size="default"
                                @click="submitOrder">下 单</el-button>
                        </el-col>
                    </el-row>

                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup name="secondary-card-view-container" lang="ts">
import { ref, computed } from "vue";
import { getAPI } from "/@/utils/axios-utils";
import { PaymentCartsApi, SecondaryCardsApi } from "/@/api-services";
import { ElMessage } from "element-plus";
import commonFunction from '/@/utils/commonFunction';
import { BusinessTypeEnum, ProductCostTypeEnums } from '/@/api-services/models/order-manage';
import { formatDate } from "/@/utils/formatTime";
import Decimal from 'decimal.js';

//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: "购买次卡",
    },
    pcustomer: {} as any,
    petInfo: {} as any,
});
const { twoFloorNum } = commonFunction();
const isShowDialog = ref(false);
const paymentCarts = ref<any>([]);
const cards = ref<any>([]);
// 打开弹窗
const openDialog = async (petData: any) => {
    isShowDialog.value = true;
    await handleEnabledQuery();
};

/**
 * 查询所有可用次卡操作
 */
const handleEnabledQuery = async () => {
    var res = await getAPI(SecondaryCardsApi).apiSecondaryCardsListGet();
    cards.value = res.data.result ?? [];
};
/**
 * 操作次卡点击事件
 */
const handleCardClick = (card: any) => {
    card.checked = !card.checked;
    var info =
    {
        productId: card.id,
        productName: card.name,
        costType: ProductCostTypeEnums.NUMBER_12,
        customerId: props.pcustomer.id,
        customerName: props.pcustomer.name,
        petId: props.petInfo.id,
        petName: props.petInfo.petName,
        count: 1,
        salePrice: card.memberPrice,
        amountPrice: card.memberPrice,
        outUnitId: -1,
        outUnitName: "张",
        type: 0,
        businessId: card.id,
        businessType: BusinessTypeEnum.NUMBER_5
    }
    if (card.checked) {
        paymentCarts.value.push(info);
    }
    else {
        paymentCarts.value.splice(paymentCarts.value.indexOf(info), 1);
    }

}
/**
 * 计算总金额
 */
const computeTotalAmount = computed(() => {
    return paymentCarts.value.reduce((pre: any, item: any) => {
        let accumulateAmount = new Decimal(pre).add(new Decimal(item.salePrice));
        return accumulateAmount;
    }, 0)
})


/**
 * 下单
 */
const submitOrder = async () => {
    if (paymentCarts.value.length == 0) {
        ElMessage.warning('至少选择一张次卡！');
        return;
    }
    await getAPI(PaymentCartsApi).apiPaymentCartsAddCartsForSalePost(paymentCarts.value).then((res: any) => {
        ElMessage.success('下单成功，结算后即可使用！');
        cancel();
    })
};

// 取消
const cancel = () => {
    isShowDialog.value = false;
};


//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style scoped lang="scss">
.sale-secondary-card-container {
    :deep(.el-dialog__body) {
        height: 600px;
    }

    .sale-secondary-card-content {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap;

        .select-border {
            border: 1px solid red !important;
        }

        .el-card {
            cursor: pointer;
            width: 32%;
            margin-right: 10px;

            .card-header {
                height: 10px;
            }

            .card-content {
                width: 100%;
                height: 90px;

                .el-text--small {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 5;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }


        }
    }
}
</style>