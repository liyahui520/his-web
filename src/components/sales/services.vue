<template>
    <div class="sales-services-container">
        <el-dialog v-model="isShowDialog" title="洗美服务" width="70%" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
                        <ele-Edit />
                    </el-icon>
                    <span>洗美服务</span>
                </div>
            </template>
            <el-row style="margin-bottom: 10px;">
                <el-col :span="20">
                    <div>
                        <el-button icon="ele-Plus" type="primary" @click="remoteSerchProduct">选择项目</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    总金额：<el-text size="large" type="danger">{{ twoFloorNum(computeTotalAmount) || '0.00'
                        }}</el-text>
                </el-col>
            </el-row>
            <el-card class="full-table" shadow="always" style="height: 550px;margin-top: 3px;">
                <el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :scroll-to-error="true">
                    <el-table ref="servicesTableRef" border row-key="id" :data="ruleForm.servicesProductList"
                        style="width: 100%">
                        <el-table-column label="项目类型" fixed="" width="100" align="center">
                            <template #default="scope">
                                <span>{{ productTypeNameObject[scope.row.type] }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="productName" label="名称" />
                        <el-table-column property="outUnitName" label="单位" width="150" />
                        <el-table-column label="助理" width="150">
                            <template #default="scope">
                                <el-select v-model="scope.row.assistantId" filterable clearable placeholder="选择助理"
                                    style="width: 100%" @change="checkAssistantChange(scope.row)">
                                    <el-option v-for="item in assistantUserList" :key="item.id" :label="item.realName"
                                        :value="item.id"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column property="salePrice" label="销售价格" width="150">
                            <template #default="scope">
                                <el-form-item label-width="0" :key="`salePrice${scope.$index}`"
                                    :prop="'servicesProductList.' + scope.$index + '.salePrice'" :rules="{
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
                                    :prop="'servicesProductList.' + scope.$index + '.memberPrice'" :rules="{
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
                                    :prop="'servicesProductList.' + scope.$index + '.count'" :rules="{
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
                        <el-table-column label="总金额" property="amountPrice" width="150">
                            <template #default="scope">
                                <el-text>{{ twoFloorNum(scope.row.amountPrice) || '0.00' }}</el-text>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="70" align="center" fixed="right">
                            <template #default="scope">
                                <el-button icon="ele-Delete" size="small" text="" type="danger"
                                    @click="deleteServices(scope.$index)"></el-button>
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
        <Products ref="productRef" :title="'选择美容/洗澡'" @reloadTable="checkProductQuery" />

    </div>
</template>

<script lang="ts" setup>
import { ref, computed ,defineAsyncComponent} from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { PaymentCartsApi, ProductApi, SysUserApi } from '/@/api-services/api';
import commonFunction from '/@/utils/commonFunction';
import Decimal from 'decimal.js';
import { ProductCostTypeEnums, BusinessTypeEnum, ProductTypeEnums } from '/@/api-services/models/order-manage';

const Products = defineAsyncComponent(() => import('/@/components/products/selectProducts.vue'));
const productRef = ref();
const emit = defineEmits(["reloadTable"]);
const { twoFloorNum } = commonFunction();
const submitLoading = ref(false);
const isShowDialog = ref(false);
const servicesTableRef = ref();
const queryParams = ref<any>({ name: '' });
const productInfo = ref<any>({});
const productOptions = ref<any>([]);
const customerInfo = ref<any>({});
const petInfo = ref<any>({});
const ruleForm = ref<any>({ servicesProductList: [] as any });
const ruleFormRef = ref();
const assistantUserList = ref<any>([]);
const assistantUserObject = ref<any>({})
const productTypeNameObject = ref<any>({
    30001: '美容',
    40001: '洗澡',
});

/**
 * 更新助理名称
 * @param row 
 */
const checkAssistantChange = (row: any) => {
    row.assistantName = assistantUserObject.value[row.assistantId];
}
/**
 * 加载助理列表
 */
const loadAssistantUserList = async () => {
    var res = await getAPI(SysUserApi).apiSysUserByPosPosCodeGet("zhuli");
    assistantUserList.value = res.data.result ?? [];
    assistantUserList.value.map((item: any) => {
        assistantUserObject.value[item.id] = item.realName;
    })
}
/**
 * 删除服务项
 * @param index 
 */
const deleteServices = (index: number) => {
    ruleForm.value.servicesProductList.splice(index, 1);
};
/**
 * 远程搜索服务项
 * @param param 
 */
const remoteSerchProduct = () => {
    productRef.value.openDialog([{ label: "美容", value: ProductTypeEnums.NUMBER_30001 },
    { label: "洗澡", value: ProductTypeEnums.NUMBER_40001 }], ProductTypeEnums.NUMBER_30001);
};

/**
 * 总个数改变事件
 * @param row 
 */
const countChange = (row: any) => {
    if (row.count > 0) {
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
    let totalAmountValue = ruleForm.value.servicesProductList.reduce((pre: any, item: any) => {
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
/**
 * 项目选中事件
 * @param item 
 */
const checkProductChange = (item: any) => {
    let info = {
        productId: item.productId,
        productName: item.productName,
        costType: item.productType == ProductTypeEnums.NUMBER_30001 ? ProductCostTypeEnums.NUMBER_3 : ProductCostTypeEnums.NUMBER_2,
        customerId: customerInfo.value.id,
        customerName: customerInfo.value.name,
        petId: petInfo.value.id,
        petName: petInfo.value.petName,
        assistantId: null,
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
        memberPrice: item.memberPrice
    }
    var servicesInfo = ruleForm.value.servicesProductList.find((services: any) => services.productId == info.productId);
    if (servicesInfo) {
        servicesInfo.count += 1;
        countChange(servicesInfo);
    } else {
        countChange(info);
        ruleForm.value.servicesProductList.push(info);
    }
    productInfo.value = {};
    productOptions.value = [];
    queryParams.value.name = '';
};


// 打开弹窗
const openDialog = async (info: any) => {
    ruleForm.value.servicesProductList = [];
    customerInfo.value = info.customerInfo;
    petInfo.value = info.petInfo;
    isShowDialog.value = true;
    await loadAssistantUserList();
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

            await getAPI(PaymentCartsApi).apiPaymentCartsAddCartsForSalePost(ruleForm.value.servicesProductList).then((res) => {
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
.sales-services-container {
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
