<template>
    <div class="medicineRecords-container">
        <el-card shadow="hover" :body-style="{ paddingBottom: '0' }"> 
        </el-card>
        <el-card class="full-table" shadow="hover" style="margin-top: 8px"> 
            <!-- <editDialog ref="editDialogRef" :title="editPrintTemplateTitle" @reloadTable="handleQuery" /> -->
        </el-card>
    </div>
</template>

<script lang="ts" setup  name="medicineRecords-container">
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import editDialog from '/@/views/products/units/component/editDialog.vue';
import { getAPI } from '/@/utils/axios-utils';
import { PrintTemplateApi } from '/@/api-services/api';

const editDialogRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({});
const tableParams = ref({
    page: 1,
    pageSize: 20,
    total: 0 as any,
});
const editPrintTemplateTitle = ref('');

// 查询操作
const handleQuery = async () => {
    loading.value = true;
    var res = await getAPI(PrintTemplateApi).apiPrintTemplatePagePost(Object.assign(queryParams.value, tableParams.value));
    tableData.value = res.data.result?.items ?? [];
    tableParams.value.total = res.data.result?.total;
    loading.value = false;
};

// 打开新增页面
const openAddPrintTemplate = () => {
    editPrintTemplateTitle.value = '添加';
    editDialogRef.value.openDialog({});
};

// 打开编辑页面
const openEditPrintTemplate = (row: any) => {
    editPrintTemplateTitle.value = '编辑';
    editDialogRef.value.openDialog({ ...row });
};

// 删除
const delPrintTemplate = (row: any) => {
    ElMessageBox.confirm(`确定要删除吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            //await getAPI(PrintTemplateApi).apiPrintTemplateDeletePost(row);
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