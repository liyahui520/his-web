<template>
    <div class="sales-goods-container">
        <el-dialog v-model="isShowDialog" title="商品销售" width="70%" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
                        <ele-Edit />
                    </el-icon>
                    <span>商品销售</span>
                </div>
            </template>
            <el-row style="margin-bottom: 10px;">
                <el-col :span="20">
                    <div>
                        <el-button icon="ele-Plus" type="primary" @click="remoteSerchProduct">选择项目</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    总金额：<el-text size="large" type="danger">{{ twoFloorNum(computeTotalAmount) || '0.00' }}</el-text>
                </el-col>
            </el-row>
            <el-card class="full-table" shadow="always" style="height: 550px;margin-top: 3px;">
                <el-form :model="ruleForm" ref="ruleFormRef" size="default" :scroll-to-error="true">
                    <el-table ref="goodsTableRef" row-key="id" :data="ruleForm.goodsProductList" style="width: 100%"
                        max-height="500" border>
                        <el-table-column property="productName" label="名称" />
                        <el-table-column property="specific" label="规格" width="150" />
                        <el-table-column property="outUnitName" label="单位" width="150" />
                        <el-table-column property="totalCount" label="库存" width="100" />
                        <el-table-column property="salePrice" label="销售价格" width="150">
                            <template #default="scope">
                                <el-form-item label-width="0" :key="`salePrice${scope.$index}`"
                                    :prop="'goodsProductList.' + scope.$index + '.salePrice'" :rules="{
                                        required: true,
                                        message: '请输入销售价格',
                                        trigger: 'blur',
                                    }" :inline-message="true" style="margin-bottom: 0px">
                                    <el-input-number v-model="scope.row.salePrice" :min="0.00" :precision="2"
                                        :max="9999999.99" controls-position="right" style="width: 100%"
                                        @change="countChange(scope.row)"></el-input-number>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column property="memberPrice" label="会员价格" width="150"
                            v-if="!customerInfo.isScattered">
                            <template #default="scope">
                                <el-form-item label-width="0" :key="`memberPrice${scope.$index}`"
                                    :prop="'goodsProductList.' + scope.$index + '.memberPrice'" :rules="{
                                        required: true,
                                        message: '请输入会员价格',
                                        trigger: 'blur',
                                    }" :inline-message="true" style="margin-bottom: 0px">
                                    <el-input-number v-model="scope.row.memberPrice" :min="0.00" :precision="2"
                                        :max="9999999.99" controls-position="right" style="width: 100%"
                                        @change="countChange(scope.row)"></el-input-number>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="数量" width="150">
                            <template #default="scope">
                                <el-form-item label-width="0" :key="`count${scope.$index}`"
                                    :prop="'goodsProductList.' + scope.$index + '.count'" :rules="{
                                        required: true,
                                        message: '请输入数量',
                                        trigger: 'blur',
                                    }" :inline-message="true" style="margin-bottom: 0px">
                                    <el-input-number v-model="scope.row.count" :min="1" :max="9999999" :precision="0"
                                        controls-position="right" @change="countChange(scope.row)"
                                        style="width: 100%" />
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="总金额" property="amountPrice" width="130">
                            <template #default="scope">
                                <el-text>{{ twoFloorNum(scope.row.amountPrice) || '0.00' }}</el-text>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="70" align="center" fixed="right">
                            <template #default="scope">
                                <el-button icon="ele-Delete" size="small" text="" type="danger"
                                    @click="deleteGoods(scope.$index)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>

            </el-card>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel" size="default">取 消</el-button>
                    <el-button type="primary" :loading="submitLoading" @click="submit" size="default">下 单</el-button>
                </span>
            </template>
        </el-dialog>
        <Products ref="productRef" :title="'选择商品'" @reloadTable="checkProductQuery" />

    </div>
</template>

<script lang="ts" setup>
import { ref, computed,defineAsyncComponent } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { PaymentCartsApi } from '/@/api-services/api';
import commonFunction from '/@/utils/commonFunction';
import Decimal from 'decimal.js';
import { ProductCostTypeEnums, BusinessTypeEnum } from '/@/api-services/models/order-manage';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';;


const Products = defineAsyncComponent(() => import('/@/components/products/selectProducts.vue'));
const productRef = ref();
const emit = defineEmits(["reloadTable"]);
const { twoFloorNum } = commonFunction();
const submitLoading = ref(false);
const isShowDialog = ref(false);
const goodsTableRef = ref();
const customerInfo = ref<any>({});
const petInfo = ref<any>({});
const ruleForm = ref<any>({ goodsProductList: [] as any });
const ruleFormRef = ref();


//删除
const deleteGoods = (index: number) => {
    ruleForm.value.goodsProductList.splice(index, 1);
};
const remoteSerchProduct = () => {
    productRef.value.openDialog([{ label: "商品", value: ProductTypeEnums.NUMBER_10001 }], ProductTypeEnums.NUMBER_10001);
};

//总个数改变事件
const countChange = (row: any) => {
    if (row.count) {
        if (customerInfo.value.isScattered)
            row.amountPrice = new Decimal(row.salePrice).mul(new Decimal(row.count));
        else
            row.amountPrice = new Decimal(row.memberPrice).mul(new Decimal(row.count));
    }
    else row.amountPrice = 0;
};
/**
 * 计算总金额
 */
const computeTotalAmount = computed((): number => {
    let totalAmountValue = ruleForm.value.goodsProductList.reduce((pre: any, item: any) => {
        let accumulateAmount = new Decimal(pre).add(new Decimal(item.amountPrice));
        return new Decimal(accumulateAmount);
    }, 0)
    return totalAmountValue;
})
/**
 * 选择产品回调函数
 * @param data 
 */
 const checkProductQuery = (data: any) => {
    data.forEach((item:any)=>{
        checkProductChange(item);
    })
}
//产品选中以后
const checkProductChange = (item: any) => {
    let info = {
        productId: item.productId,
        productName: item.productName,
        costType: ProductCostTypeEnums.NUMBER_0,
        customerId: customerInfo.value.id,
        customerName: customerInfo.value.name,
        petId: petInfo.value.id,
        petName: petInfo.value.petName,
        count: 1,
        salePrice: item.salePrice,
        amountPrice: 0,
        outUnitId: item.outUnitId,
        outUnitName: item.outUnitName,
        type: item.productType,
        businessId: item.productId,
        businessType: BusinessTypeEnum.NUMBER_6,
        specific: item.specific,
        totalCount: 1,
        memberPrice: item.memberPrice,
    }
    var gooodsInfo = ruleForm.value.goodsProductList.find((goods: any) => goods.productId == info.productId);
    if (gooodsInfo) {
        gooodsInfo.count += 1;
        countChange(gooodsInfo);
    } else {
        countChange(info);
        ruleForm.value.goodsProductList.push(info);
    }
};



// 打开弹窗
const openDialog = async (info: any) => {
    ruleForm.value.goodsProductList = [];
    customerInfo.value = info.customerInfo;
    petInfo.value = info.petInfo;
    isShowDialog.value = true;
};

// 取消
const cancel = async () => {
    emit("reloadTable");
    isShowDialog.value = false;

};

// 提交
const submit = async () => {
    ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
        if (isValid) {
            submitLoading.value = true;
            await getAPI(PaymentCartsApi).apiPaymentCartsAddCartsForSalePost(ruleForm.value.goodsProductList).then((res) => {
                submitLoading.value = false;
                cancel();
            });

        }
    });
};

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>


<style lang="scss" scoped>
.sales-goods-container {
    :deep(.el-input-number.is-controls-right .el-input__wrapper) {
        padding-right: 15px;
    }

    :deep(.el-input-number.is-controls-right .el-input-number__decrease) {
        display: none;
    }

    :deep(.el-input-number.is-controls-right .el-input-number__increase) {
        display: none;
    }

}
</style>
