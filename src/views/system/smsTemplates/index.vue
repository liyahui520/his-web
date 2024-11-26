<template>
    <div class="productBrands-container">
        <el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
            <el-form :model="queryParams" ref="queryForm" :inline="true">
                <el-form-item label="类型">
                    <el-select v-model="queryParams.type">
                        <el-option v-for="(item, index) in sysSMSTemplateEnum" :key="index" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模板名称">
                    <el-input v-model="queryParams.templateName" clearable placeholder="请输入模板名称" />
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'smsTemplate:query'"> 查询
                        </el-button>
                        <el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
                    </el-button-group>
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-button icon="ele-Plus" @click="openAddProductBrands" v-auth="'smsTemplate:add'"> 新增
                        </el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="full-table" shadow="hover" style="margin-top: 8px">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" tooltip-effect="light" row-key="id">
                <el-table-column type="index" label="序号" width="55" align="center" fixed="" />
                <el-table-column prop="type" label="类型" width="100">
                    <template #default="scope">
                        <el-tag > {{ sysSMSTemplateInfo[scope.row.type] }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="templateName" label="模板名称" width="150" />
                <el-table-column label="启用" width="100" >
                    <template #default="scope">
                        <el-tag v-if="scope.row.isEnable"> 是</el-tag>
                        <el-tag type="danger" v-else> 否</el-tag>
                    </template>
                    </el-table-column>
                <el-table-column prop="content" label="短信内容" />
                <el-table-column label="操作" width="140" align="center" fixed="right" show-overflow-tooltip=""
                    v-if="auth('smsTemplate:update') || auth('smsTemplate:delete')">
                    <template #default="scope">
                        <el-button icon="ele-Edit" size="small" text="" type="primary"
                            @click="openEditProductBrands(scope.row)" v-auth="'smsTemplate:update'"> 编辑
                        </el-button>
                        <el-button icon="ele-Delete" size="small" text="" type="danger"
                            @click="delProductBrands(scope.row)" v-auth="'smsTemplate:delete'"> 删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:currentPage="tableParams.page" v-model:page-size="tableParams.pageSize"
                :total="tableParams.total" :page-sizes="[10, 20, 50, 100]" background=""
                @size-change="handleSizeChange" @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper" />
            <editDialog ref="editDialogRef" :title="editProductBrandsTitle" @reloadTable="handleQuery" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';

import editDialog from '/@/views/system/smsTemplates/component/editDialog.vue';

import { getAPI } from '/@/utils/axios-utils';
import { SMSTemplateApi } from '/@/api-services/api';

const editDialogRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({
    type: -1,
    templateName: ''
});
const tableParams = ref({
    page: 1,
    pageSize: 20,
    total: 0 as any,
});
const editProductBrandsTitle = ref('');


const sysSMSTemplateEnum = ref<any>([
    { id: -1, name: '全部' },
    { id: 0, name: '疫苗短信' },
    { id: 1, name: '预约短信' },
    { id: 2, name: '推广短信' },
    { id: 3, name: '系统短信' },
])
const sysSMSTemplateInfo = ref<any>({
    0: '疫苗短信',
    1: '预约短信',
    2: '推广短信',
    3: '系统短信',
})
// 查询操作
const handleQuery = async () => {
    loading.value = true;
    let requestInfo = { type: queryParams.value.type == -1 ? null : queryParams.value.type, templateName: queryParams.value.templateName };
    var res = await getAPI(SMSTemplateApi).apiSMSTemplatePagePost(Object.assign(requestInfo, tableParams.value));
    tableData.value = res.data.result?.items ?? [];
    tableParams.value.total = res.data.result?.total;
    loading.value = false;
};

// 打开新增页面
const openAddProductBrands = () => {
    editProductBrandsTitle.value = '添加';
    editDialogRef.value.openDialog({ type: 0, isEnable: true });
};

// 打开编辑页面
const openEditProductBrands = (row: any) => {
    editProductBrandsTitle.value = '编辑';
    editDialogRef.value.openDialog({ ...row });
};

// 删除
const delProductBrands = (row: any) => {
    ElMessageBox.confirm(`确定要删除吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            await getAPI(SMSTemplateApi).apiSMSTemplateDeletePost(row);
            handleQuery();
            ElMessage.success('删除成功');
        })
        .catch(() => {
        });
};

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

handleQuery();
</script> 