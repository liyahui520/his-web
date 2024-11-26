<template>
    <div class="product-Tests-container">
        <el-dialog v-model="isShowDialog" :title="props.title" width="60%" draggable
            :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
                        <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
            <el-row :gutter="8">
                <el-col :span="5">
                    <el-card shadow="always" style="height: 700px;">
                        <template #header>
                            <span>检查类目</span>
                        </template>
                        <el-tree v-loading="inspectionsLoading" :data="inspectionsData" accordion
                            @node-click="handleNodeClick" highlight-current empty-text="暂无检查类目，请先添加一个吧~">
                            <template #default="{ node }">
                                <el-row justify="space-between" style="width: 100%;">
                                    <el-col :span="19">
                                        <span> {{ node.label }}</span>
                                    </el-col>

                                </el-row>
                            </template>
                        </el-tree>
                    </el-card>
                </el-col>
                <el-col :span="19">
                    
                    <el-card class="full-table" shadow="always" style="height: 700px;">
                        <el-table ref="inspectionsDetailsRef" :data="tableData" style="width: 100%" v-loading="loading"
                            tooltip-effect="light" row-key="id">
                            <el-table-column type="selection" width="40" align="center" />
                            <el-table-column prop="name" label="项目名称" fixed="" align="left" width="250"
                                show-overflow-tooltip="" />
                            <el-table-column prop="unit" label="单位" width="100" show-overflow-tooltip="" />
                            <el-table-column label="犬(成年)" align="center">
                                <el-table-column prop="dogMax" align="center" label="最大" show-overflow-tooltip="" />
                                <el-table-column prop="dogMin" align="center" label="最小" show-overflow-tooltip="" />
                            </el-table-column>
                            <el-table-column label="猫(成年)" align="center">
                                <el-table-column prop="dogMax" align="center" label="最大" show-overflow-tooltip="" />
                                <el-table-column prop="dogMin" align="center" label="最小" show-overflow-tooltip="" />
                            </el-table-column>
                            <el-table-column label="其他(成年)" align="center">
                                <el-table-column prop="dogMax" align="center" label="最大" show-overflow-tooltip="" />
                                <el-table-column prop="dogMin" align="center" label="最小" show-overflow-tooltip="" />
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

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductInspectionApi, ProductInspectionDetailApi } from '/@/api-services/api';
import other from '/@/utils/other';

const inspectionsData = ref<any>([])

const isShowDialog = ref(false);
const ruleFormRef = ref();
const inspectionsDetailsRef = ref();
const inspectionsLoading = ref(false);
const loading = ref(false);
const ruleForm = ref<any>({});
const tableData = ref<any>([]);
const queryParams = ref<any>({ productInspectionId: '-1', name: '' });
const tableParams = ref({
    page: 1,
    pageSize: 9999,
    total: 0,
});
//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: '',
    }
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);


// 查询操作
const handleInspectionsQuery = async () => {
    inspectionsLoading.value = true;
    var res = await getAPI(ProductInspectionApi).apiProductInspectionListGet();
    var result = res.data.result ?? [];
    inspectionsData.value = [];
    result.forEach((element: any) => {
        inspectionsData.value.push({ label: element.itemName, id: element.id, ver: element.ver });
    });
    inspectionsLoading.value = false;
};

const handleDetailsQuery = async () => {
    loading.value = true;
    var res = await getAPI(ProductInspectionDetailApi).apiProductInspectionDetailPagePost(Object.assign(queryParams.value, tableParams.value));
    tableData.value = res.data.result?.items ?? [];
    tableParams.value.total = res.data.result?.total;
    nextTick(() => {
        backFillTable();
    })
    loading.value = false;
}
const handleNodeClick = async (data: any) => {
    queryParams.value.productInspectionId = data.id; // 选中当前节点
    await handleDetailsQuery();
}

// 打开弹窗
const openDialog = (row: any) => {
    ruleForm.value = other.deepClone(row);
    isShowDialog.value = true;
    nextTick(() => {
        backFillTable();
    })
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
    let values = ruleForm.value;
    var slectionList = inspectionsDetailsRef.value.getSelectionRows();
    if (!values.productMedicationInspectionDetails)
        values.productMedicationInspectionDetails = [];
    const sourceContent =[...new Set([...values.productMedicationInspectionDetails, ...slectionList])]

    emit('reloadTable', sourceContent);
    isShowDialog.value = false;
};

const backFillTable = () => {

    inspectionsDetailsRef.value.clearSelection();
    tableData.value.forEach((item: any) => {

        ruleForm.value.productMedicationInspectionDetails.forEach((it: any) => {
            if (it.id == item.id) {
                nextTick(() => {
                    inspectionsDetailsRef.value.toggleRowSelection(item, true);
                })
            }
        });
    });
}
handleInspectionsQuery();
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