<template>
    <div class="have-card-customer-container">
        <el-dialog v-model="isShowDialog" :title="props.title" width="50%" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
            <el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
                <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="70px">
                    <el-row :gutter="35">
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                            <el-form-item label="会员名称">
                                <el-input v-model="queryParams.name" clearable placeholder="请输入会员名称" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                            <el-form-item label="手机号码">
                                <el-input v-model="queryParams.cellPhone" clearable placeholder="请输入手机号码" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                            <div style="text-align: right">
                                <el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>

            <el-card class="full-table" shadow="hover" style="margin-top: 8px">
                <el-table :data="tableData" border style="width: 100%" height="400" v-loading="loading" tooltip-effect="light"
                    row-key="id" default-expand-all>
                    <el-table-column prop="cardNumber" label="会员编号" show-overflow-tooltip="" />
                    <el-table-column prop="customerName" label="名称" show-overflow-tooltip="" />
                    <el-table-column prop="cellPhone" label="手机电话" show-overflow-tooltip="" />
                    <el-table-column prop="totalCount" label="总次数" show-overflow-tooltip="" />
                    <el-table-column prop="useCount" label="已使用" show-overflow-tooltip="" />
                    <el-table-column label="剩余">
                        <template #default="scope">
                            <el-tag>{{ scope.row.totalCount - scope.row.useCount }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createOrgName" label="所在机构" show-overflow-tooltip="" />
                    <el-table-column prop="lastUseTime" label="最后使用" show-overflow-tooltip="" />
                </el-table>
                <el-pagination v-model:currentPage="tableParams.page" v-model:page-size="tableParams.pageSize"
                    :total="tableParams.total" :page-sizes="[10, 20, 50, 100]" background=""
                    @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper" />
            </el-card>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog" size="default" type="primary">关 闭</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { SecondaryCardsApi } from '/@/api-services/api';

//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: '持卡客户',
    }
});
const isShowDialog = ref(false);
const loading = ref(false);
const queryParams = ref<any>({ name: '', cellPhone: '', id: '' });
const tableData = ref<any>([]);
const tableParams = ref({
    page: 1,
    pageSize: 20,
    total: 0,
});

// 打开弹窗
const openDialog = async (data: any) => {
    isShowDialog.value = true;
    queryParams.value.id = data.cardId;
    await handleQuery();
};
// 关闭弹窗
const closeDialog = (data: any) => {
    isShowDialog.value = false;
};

const handleQuery = async () => {
    loading.value = true;
    var res = await getAPI(SecondaryCardsApi).apiSecondaryCardsGetContainCustomerPost(Object.assign(queryParams.value, tableParams.value));
    tableData.value = res.data.result?.items ?? [];
    tableParams.value.total = res.data.result?.total ?? 0;
    loading.value = false;
}

// 改变页面容量
const handleSizeChange = (val: number) => {
    tableParams.value.pageSize = val;
    handleQuery();
};

// 改变页码序号
const handleCurrentChange = (val: number) => {
    tableParams.value.page = val;
    handleQuery();
};

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style scoped lang="scss">
.have-card-customer-container {

    :deep(.el-dialog__body) {
        height: 600px;
    }
}
</style>
