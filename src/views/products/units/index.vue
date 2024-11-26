<template>
	<div class="productUnits-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="单位名称">
					<el-input v-model="queryParams.name" clearable placeholder="请输入单位名称" />
				</el-form-item>

				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'products:units:page'"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
					</el-button-group>
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button icon="ele-Plus" @click="openAddProductUnits" v-auth="'products:units:add'"> 新增 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" style="height: calc(100vh - 235px); overflow: auto; margin-top: 8px">
			<el-table :data="tableData" style="height: calc(100vh - 310px)" v-loading="loading" tooltip-effect="light" row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="单位名称" align="center" show-overflow-tooltip="" />
				<el-table-column label="操作" width="160" align="center" show-overflow-tooltip="" v-if="auth('products:units:update') || auth('products:units:delete')">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditProductUnits(scope.row)" v-auth="'products:units:update'"> 编辑 </el-button>
						<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delProductUnits(scope.row)" v-auth="'products:units:delete'"> 删除 </el-button>
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
			<editDialog ref="editDialogRef" :title="editProductUnitsTitle" @reloadTable="handleQuery" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import editDialog from '/@/views/products/units/component/editDialog.vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductUnitsApi } from '/@/api-services/api';
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
const editProductUnitsTitle = ref('');

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(ProductUnitsApi).apiProductUnitsPagePost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

// 打开新增页面
const openAddProductUnits = () => {
	editProductUnitsTitle.value = '添加单位';
	editDialogRef.value.openDialog({});
};

// 打开编辑页面
const openEditProductUnits = (row: any) => {
	editProductUnitsTitle.value = '编辑单位';
	editDialogRef.value.openDialog({ ...row });
};

// 删除
const delProductUnits = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(ProductUnitsApi).apiProductUnitsDeleteDelete(row);
			handleQuery();
			ElMessage.success('删除成功');
			await useUserInfo().reloadProductUnitList();
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
