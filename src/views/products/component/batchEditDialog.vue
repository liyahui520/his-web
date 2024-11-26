<template>
    <div class="product-Tests-container">
        <el-dialog v-model="isShowDialog" :title="props.title" width="90%" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
                        <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
            <el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="80px" :rules="rules">
                <el-row :gutter="8">
                    <el-col :span="18">
                        <el-row :gutter="8">
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                                <el-card shadow="hover" style="padding-bottom: 40px;">
                                    <template #header>
                                        <el-row justify="space-between">
                                            <el-col :span="18">
                                                <span>已选产品</span>
                                            </el-col>
                                        </el-row>
                                    </template>
                                    <el-table :data="ruleForm.products" style="width: 100%;">
                                        <el-table-column prop="name" label="名称" width="230" />
                                        <el-table-column prop="categoryName" label="目录"  width="230"  show-overflow-tooltip="" />
                                        <el-table-column prop="providerName" label="生产商" show-overflow-tooltip="" />
                                        <el-table-column prop="manufacturerName" label="供应商" show-overflow-tooltip="" />
                                        <el-table-column label="可销" width="80" >
                                            <template #default="scope">
                                                <el-tag v-if="scope.row.canSale"> 是</el-tag>
                                                <el-tag type="danger" v-else> 否</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="可订" width="80" >
                                            <template #default="scope">
                                                <el-tag v-if="scope.row.canOrder"> 是</el-tag>
                                                <el-tag type="danger" v-else> 否</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="可盘" width="80" >
                                            <template #default="scope">
                                                <el-tag v-if="scope.row.canCable"> 是</el-tag>
                                                <el-tag type="danger" v-else> 否</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="参与打折" width="80" >
                                            <template #default="scope">
                                                <el-tag v-if="scope.row.isDiscount"> 是</el-tag>
                                                <el-tag type="danger" v-else> 否</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作" width="80" align="center">
                                            <template #default="scope">
                                                <el-button icon="ele-Delete" size="small" text="" type="danger"
                                                    @click="deleteProduct(scope.$index)"> 删除
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover">
                            <el-row :gutter="35">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                                    <el-form-item label="所属目录" prop="categoryArr">
                                        <el-cascader ref="categoryRef" separator=">" v-model="ruleForm.categoryArr"
                                            :props="carcerProp" :options="props.productCategorysData" filterable clearable
                                            style="width: 100%;">
                                            <template #default="{ node, data }">
                                                <span>{{ data.label }}</span>
                                                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                                            </template>
                                        </el-cascader>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="35" v-if="isShowSource">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                                    <el-form-item label="供应商" prop="providerId">
                                        <el-select v-model="ruleForm.providerId" filterable clearable placeholder="未选择表示不修改"
                                            style="width: 100%;">
                                            <el-option v-for="item in providerData" :key="item.id" :label="item.name"
                                                :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                                    <el-form-item label="生产商" prop="manufacturerId">
                                        <el-select v-model="ruleForm.manufacturerId" filterable clearable
                                            placeholder="未选择表示不修改" style="width: 100%;">
                                            <el-option v-for="item in manufacturerData" :key="item.id" :label="item.name"
                                                :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row :gutter="35">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                                    <el-form-item label="状态">
                                        <el-checkbox v-model="editStatus" label="编辑状态" size="large"
                                            @change="editStatusChange" />
                                        <div>
                                            <el-checkbox label="参与打折" v-model="ruleForm.isDiscount" :disabled="!editStatus" />
                                            <el-checkbox label="可销" v-model="ruleForm.canSale" :disabled="!editStatus" />
                                            <el-checkbox v-if="isShowOrderAndCheck" label="可订" v-model="ruleForm.canOrder" :disabled="!editStatus" />
                                            <el-checkbox v-if="isShowOrderAndCheck" label="可盘" v-model="ruleForm.canCable" :disabled="!editStatus" />
                                        </div>

                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>

                </el-row>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel" size="default">取 消</el-button>
                    <el-button type="primary" @click="submit" size="default">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { ProductExtendsApi } from '/@/api-services/api';

import { useUserInfo } from '/@/stores/userInfo';
import other from '/@/utils/other';

const stores = useUserInfo();
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const editSerialNumber = ref(false);
const ruleForm = ref<any>({});
const carcerProp = ref<any>({ checkStrictly: true, value: 'id' })
const manufacturerData = ref<any>([]);
const providerData = ref<any>([]);
//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: '',
    },
    productCategorysData: {
        type: Array,
        default: [] as any
    }
});
const isShowSource = ref(false);
const isShowOrderAndCheck = ref(false);
const editStatus = ref(false);

//自行删除非必填规则
const rules = ref<FormRules>({
    categoryArr: [{ required: true, message: '请选择目录！', trigger: 'change' }],
});
const deleteProduct = (index: any) => {
    ruleForm.value.products.splice(index, 1)
}
const editStatusChange = (value: any) => {
    ruleForm.value.canCable = value;
    ruleForm.value.canOrder = value;
    ruleForm.value.canSale = value;
    ruleForm.value.isDiscount = value;
}
const loadManufacturerData = async () => {
    var res =stores.productManufacturers;
    manufacturerData.value = res ?? [];
};
const loadProviderData = async () => {
    var res = stores.productProviders;
    providerData.value = res ?? [];
};
// 打开弹窗
const openDialog = async (row: any, isShowSourceValue: any) => {
    ruleForm.value = other.deepClone(row);
    isShowDialog.value = true;
    editStatus.value=false;
    ruleForm.value.canCable = false;
    ruleForm.value.canOrder = false;
    ruleForm.value.canSale = false;
    ruleForm.value.isDiscount = false;
    if (!ruleForm.value.products)
        ruleForm.value.products = [];
    isShowSource.value = isShowSourceValue;
    if (isShowSourceValue) {
        await loadManufacturerData();
        await loadProviderData();
    }
};

// 关闭弹窗
const closeDialog = () => {
    emit('reloadTable');
    isShowDialog.value = false;
};

// 取消
const cancel = () => {
    isShowDialog.value = false;
};

// 提交
const submit = async () => {
    if (ruleForm.value.products.length > 0) {
        ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
            if (isValid) {
                var requestParams = { ...ruleForm.value };
                requestParams.productType = ruleForm.value.products[0].type;
                requestParams.categoryId = ruleForm.value.categoryArr[ruleForm.value.categoryArr.length - 1];
                if (!editStatus.value) {
                    requestParams.canCable = null;
                    requestParams.canOrder = null;
                    requestParams.canSale = null;
                    requestParams.isDiscount = null;
                }
                requestParams.ids = ruleForm.value.products.map(item => { return item.id; });
                await getAPI(ProductExtendsApi).apiProductExtendsBatchEditProductPost(requestParams);
                closeDialog();
            }
        });
    }
    else {
        closeDialog();
    }

};

// 页面加载时
onMounted(async () => {
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>


<style lang="scss" scoped>
.product-Tests-container {
    .el-tag {
        white-space: normal;
        height: auto;
        padding: 9px 9px;
    }
}
</style>
