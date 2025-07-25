﻿<template>
	<div class="productManufacturers-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="名称">
					<el-input v-model="queryParams.name" clearable placeholder="请输入名称/联系人" />
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'products:manufacturers:page'"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
					</el-button-group>
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button icon="ele-Plus" @click="openAddProductManufacturers" v-auth="'products:manufacturers:add'"> 新增 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" style="height: calc(100vh - 235px); overflow: auto; margin-top: 8px">
			<el-table :data="tableData" style="height: calc(100vh - 310px)" v-loading="loading" tooltip-effect="light" row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="名称" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="contacter" label="联系人" show-overflow-tooltip="" />
				<el-table-column prop="telePhone" label="联系人电话" show-overflow-tooltip="" />
				<el-table-column prop="address" label="联系地址" show-overflow-tooltip="" />
				<el-table-column label="操作" width="140" align="center" fixed="right" show-overflow-tooltip="" v-if="auth('products:manufacturers:update') || auth('products:manufacturers:delete')">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditProductManufacturers(scope.row)" v-auth="'products:manufacturers:update'"> 编辑 </el-button>
						<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delProductManufacturers(scope.row)" v-auth="'products:manufacturers:delete'"> 删除 </el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				v-model:currentPage="tableParams.page"
				v-model:page-size="tableParams.pageSize"
				:total="tableParams.total"
				:page-sizes="[10, 20, 50, 100]"
				background=""
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				layout="total, sizes, prev, pager, next, jumper"
			/>
			<editDialog ref="editDialogRef" :title="editProductManufacturersTitle" @reloadTable="handleQuery" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';

import editDialog from '/@/views/products/manufacturers/component/editDialog.vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductManufacturersApi } from '/@/api-services/api';
import { useUserInfo } from '/@/stores/userInfo';

const editDialogRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({});
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0,
});
const editProductManufacturersTitle = ref('');

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(ProductManufacturersApi).apiProductManufacturersPagePost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

// 打开新增页面
const openAddProductManufacturers = () => {
	editProductManufacturersTitle.value = '添加生产商';
	editDialogRef.value.openDialog({});
};

// 打开编辑页面
const openEditProductManufacturers = (row: any) => {
	editProductManufacturersTitle.value = '编辑生产商';
	editDialogRef.value.openDialog({ ...row });
};

// 删除
const delProductManufacturers = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(ProductManufacturersApi).apiProductManufacturersDeleteDelete(row);
			handleQuery();
			ElMessage.success('删除成功');
			await useUserInfo().reloadProductManufacturerList();
		})
		.catch(() => {});
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
