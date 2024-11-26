<template>
    <div class="vaccina-manage-contains">
        <el-dialog v-model="isShowDialog" :title="props.title" width="70%" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
            <el-card class="full-table" shadow="hover" style="margin-top: 8px;height: calc(100vh - 400px)">
                <el-table :data="tableData" style="width: 100%" v-loading="loading" tooltip-effect="light" row-key="id"
                    border="">
                    <el-table-column type="index" label="序号" width="55" align="center" fixed="" />
                    <el-table-column prop="customerName" label="会员名称" width="100" fixed="left" show-overflow-tooltip="" />
                    <el-table-column prop="petName" label="宠物名称" width="100" fixed="left" show-overflow-tooltip="" />
                    <el-table-column prop="expectVaccinations" label="预接种时间" width="100" fixed="left"
                        show-overflow-tooltip="">
                        <template #default="scope">
                            <span>{{ formatDate(new Date(scope.row.expectVaccinations), 'YYYY-mm-dd') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="productName" label="项目名称" fixed="left" show-overflow-tooltip="" />
                    <el-table-column prop="vaccinates" label="执行时间" show-overflow-tooltip="">
                        <template #default="scope">
                            <span>{{ (scope.row.vaccinates != null && scope.row.vaccinates != undefined) ? formatDate(new
                                Date(scope.row.vaccinates), 'YYYY-mm-dd') : '' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operateName" label="操作人" show-overflow-tooltip="" />
                    <el-table-column label="状态" width="90">
                        <template #default="scope">
                            <el-tag type="danger" v-if="!scope.row.isWillOrder && !scope.row.isPayed"> 待下单 </el-tag>
                            <el-tag type="danger" v-else-if="scope.row.isWillOrder && !scope.row.isPayed"> 待付款 </el-tag>
                            <el-tag v-else-if="scope.row.isPayed"> 已支付 </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel" size="default">取 消</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>
<script setup lang="ts" name="vaccinaManagement">

import { ref } from "vue";
import { formatDate } from "/@/utils/formatTime";
import { getAPI } from '/@/utils/axios-utils';
import { VaccinationApi } from '/@/api-services/api';

//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const queryParams = ref<any>({});
const loading = ref(false);
const isShowDialog = ref(false);
const tableData = ref<any>([]);
//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: '',
    },
});
// 打开弹窗
const openDialog = (row: any) => {
    queryParams.value = row;
    isShowDialog.value = true;
    handleQuery();
};

// 取消
const cancel = () => {
    isShowDialog.value = false;
};

// 查询操作
const handleQuery = async () => {
    loading.value = true;
    var res = await getAPI(VaccinationApi).apiVaccinationGetVaccinationListByPetPost(queryParams.value);
    tableData.value = res.data.result ?? [];
    loading.value = false;
};
//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>