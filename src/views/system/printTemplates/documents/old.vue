<template>
  <div class="documentTemplate-container">
    <el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="文书名称">
          <el-input v-model="queryParams.name" clearable placeholder="请输入文书名称" />
        </el-form-item>

        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
            <el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button icon="ele-Plus" @click="openAddDocumentTemplate"> 新增 </el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="full-table" shadow="hover" style="margin-top: 8px">
      <el-table :data="tableData" style="width: 100%" v-loading="loading" tooltip-effect="light" row-key="id">
        <el-table-column type="index" label="序号" width="55" align="center" fixed="" />
        <el-table-column prop="name" label="文书名称" show-overflow-tooltip="" />
        <el-table-column prop="remark" label="备注" show-overflow-tooltip="" />
        <el-table-column label="操作" width="140" align="center">
          <template #default="scope">
            <el-button icon="ele-Edit" size="small" text="" type="primary"
                       @click="openEditDocumentTemplate(scope.row)"> 编辑
            </el-button>
            <el-button icon="ele-Delete" size="small" text="" type="danger"
                       @click="delDocumentTemplate(scope.row)"> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:currentPage="tableParams.page" v-model:page-size="tableParams.pageSize"
                     :total="tableParams.total" :page-sizes="[10, 20, 50, 100]" background=""
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total, sizes, prev, pager, next, jumper" />
      <editDocumentDialog ref="editDocumentRef" :title="editDocumentTemplateTitle" @reloadTable="handleQuery" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import editDocumentDialog from './component/editDocument.vue';
import { getAPI } from '/@/utils/axios-utils';
import { DocumentTemplateApi } from '/@/api-services/api';

const editDocumentRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({});
const tableParams = ref({
  page: 1,
  pageSize: 20,
  total: 0,
});
const editDocumentTemplateTitle = ref('');

// 查询操作
const handleQuery = async () => {
  loading.value = true;
  var res = await getAPI(DocumentTemplateApi).apiDocumentTemplatePagePost(Object.assign(queryParams.value, tableParams.value));
  tableData.value = res.data.result?.items ?? [];
  tableParams.value.total = res.data.result?.total;
  loading.value = false;
};

// 打开新增页面
const openAddDocumentTemplate = () => {
  editDocumentTemplateTitle.value = '添加文书';
  editDocumentRef.value.openDialog({});
};

// 打开编辑页面
const openEditDocumentTemplate = (row: any) => {
  editDocumentTemplateTitle.value = '编辑文书';
  editDocumentRef.value.openDialog({ ...row });
};

// 删除
const delDocumentTemplate = (row: any) => {
  ElMessageBox.confirm(`确定要删除吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(async () => {
        await getAPI(DocumentTemplateApi).apiDocumentTemplateDeleteDelete(row);
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