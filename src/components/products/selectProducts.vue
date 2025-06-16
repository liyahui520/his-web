<template>
    <div class="select-products-container">
        <el-dialog v-model="isShowDialog" width="80%" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
                        <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>

            <el-row>
                <el-col :span="6">
                    <el-card shadow="always" style="margin-top: 8px;">
                        <el-select v-model="productTypeValue" placeholder="Select" style="width: 100%;"
                            @change="productTypeChange">
                            <el-option v-for="item in productTypeData" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                        <CategroyProducts ref="categroyProductsRef" style="margin-top: 10px;padding-top: 10px;"
                            :getData="getProductData" :addAuth="false" @handleNodeClick="handleNodeClick"
                            :updateAuth="false" :deleteAuth="false" />
                    </el-card>
                </el-col>
                <el-col :span="18">
                    <el-card shadow="always" style="margin-top: 8px;margin-left: 10px;">
                        <div style="margin-bottom: 12px;">已选中 <el-text type="success">{{ selectProductsData.length
                                }}</el-text> 项
                        </div>
                        <el-table ref="selectProductsTableRef" :data="selectProductsData" style="width: 100%;height: calc(100vh - 300px);" border>
                            <el-table-column label="序号" type="index" width="55" align="center" />
                            <el-table-column prop="productTypeText" label="类型" min-width="60" show-overflow-tooltip />
                            <el-table-column prop="productName" label="项目名称" min-width="150" show-overflow-tooltip />
                            <el-table-column prop="outUnitName" label="单位" min-width="100" show-overflow-tooltip />
                            <el-table-column prop="specific" label="规格" min-width="150" show-overflow-tooltip />
                            <el-table-column prop="salePrice" label="销售价格" min-width="100">
                                <template #default="scope">
                                    <el-text>{{ verifyNumberComma(scope.row.salePrice.toFixed(2)) || '0.00'  }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column prop="memberPrice" label="会员价格" min-width="100" show-overflow-tooltip>
                                <template #default="scope">
                                    <el-text>{{ verifyNumberComma(scope.row.memberPrice.toFixed(2)) || '0.00'  }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="80">
                                <template #default="scope">
                                    <el-button link type="danger" :icon="DeleteFilled"
                                        @click="deleteSelectProducts(scope.$index)">
                                        移除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
            </el-row>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel" size="default">取 消</el-button>
                    <el-button type="primary" @click="submit" size="default">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="productDrag">
import { ref, nextTick, defineAsyncComponent } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductCategorysApi } from '/@/api-services/api';
import { DeleteFilled } from '@element-plus/icons-vue'
import { ProductTypeEnums } from '/@/api-services/models/product-manage';;
import { verifyNumberComma } from '/@/utils/toolsValidate';
import { useUserInfo } from '/@/stores/userInfo';
import { listProduct } from '/@/api/main/middleware';

const stores = useUserInfo();

const CategroyProducts = defineAsyncComponent(() => import('/@/components/tree/categroyProducts.vue'));
const categroyProductsRef = ref();
const unitData = ref<any>([]);
const unitObject = ref<any>({});
//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: "选择项目",
    },
});
//父级传递来的函数，用于回调
const emit = defineEmits(["reloadTable"]);
const isShowDialog = ref(false);
const productTypeData = ref<any>([
    { label: "商品", value: ProductTypeEnums.NUMBER_10001 },
    { label: "药品", value: ProductTypeEnums.NUMBER_20001 },
    { label: "美容", value: ProductTypeEnums.NUMBER_30001 },
    { label: "洗澡", value: ProductTypeEnums.NUMBER_40001 },
    { label: "驱虫", value: ProductTypeEnums.NUMBER_50001 },
    { label: "疫苗", value: ProductTypeEnums.NUMBER_60001 },
    //{ label: "住院", value: ProductTypeEnums.NUMBER_70001 },
    //{ label: "留观", value: ProductTypeEnums.NUMBER_80001 },
    { label: "超声检查", value: ProductTypeEnums.NUMBER_90001 },
    { label: "摄影检查", value: ProductTypeEnums.NUMBER_100001 },
    { label: "化验", value: ProductTypeEnums.NUMBER_110001 },
    { label: "处置", value: ProductTypeEnums.NUMBER_120001 },
    { label: "显微镜", value: ProductTypeEnums.NUMBER_130001 },
    { label: "消耗品", value: ProductTypeEnums.NUMBER_140001 },
    { label: "试纸", value: ProductTypeEnums.NUMBER_150001 },
]);
const productTypeValue = ref<number>(ProductTypeEnums.NUMBER_10001);
const selectProductsData = ref<any>([]);
/**
 * 移除选中的行
 * @param index 
 */
const deleteSelectProducts = (index: number) => {
    selectProductsData.value.splice(index, 1);
}
/**
 * 下拉变更
 */
const productTypeChange = async () => {
    await nextTick(() => {
        categroyProductsRef.value?.handleList(productTypeValue.value);
    });
}
/**
 * 节点点击
 * @param data 
 */
const handleNodeClick = (data: any) => {
    let info = {
        productId: data.id,
        productName: data.name,
        productType: data.type,
        outUnitId: data.outUnitId,
        outUnitName: unitObject.value[data.outUnitId],
        salePrice: data.salePrice,
        memberPrice: data.memberPrice,
        orderIndex: 0,
        specific: data.specific,
        productTypeText: data.typeText,
        interval: data.interval,
        intervalUnit: data.intervalUnit,
        times:data.times
    }
    var gooodsInfo = selectProductsData.value.find((goods: any) => goods.productId == info.productId);
    if (!gooodsInfo)
        selectProductsData.value.push(info)
}
/**
 * 获取产品数据
 */
const getProductData = async () => {
    console.log("开始请求，当前时间：" + new Date().getTime());
    var res =await listProduct(productTypeValue.value);//await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(productTypeValue.value);
    console.log("请求结束，当前时间：" + new Date().getTime());
    console.log("结果为",res)
    return res.data?.result ?? [];
    // return [];
}
// 取消
const cancel = () => {
    isShowDialog.value = false;
};
/**
 * 点击确定按钮
 */
const submit = async () => {
    emit("reloadTable", selectProductsData.value);
    isShowDialog.value = false;
}

/**
 * 打开弹窗
 */
const openDialog = async (typeData: any, productTypeEnums: number) => {
    isShowDialog.value = true;
    loadUnitData();
    if (typeData.length > 0) {
        productTypeData.value = typeData;
    }
    productTypeValue.value = productTypeEnums;
    await nextTick(() => {
        categroyProductsRef.value?.handleList(productTypeValue.value);
    });
    selectProductsData.value = [];
};

const loadUnitData = () => {
    let productUnits = stores.productUnits;
    unitData.value = productUnits ?? [];
    unitData.value.forEach((item: any) => {
        unitObject.value[item.id] = item.name;
    });
};

//将属性或者函数暴露给父组件
defineExpose({ openDialog });

</script>

<style scoped lang="scss">
.select-products-container {
    :deep(.el-overlay .el-overlay-dialog .el-dialog) {
        height: 93%;
    }
}
</style>
