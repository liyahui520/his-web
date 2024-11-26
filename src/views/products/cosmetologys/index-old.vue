<template>
		<el-card class="full-table"  shadow="hover" style="margin-top: 8px">
			<el-table :data="tableData" style="width: 100%" v-loading="loading" tooltip-effect="light" row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="名称" fixed="" width="150"  show-overflow-tooltip="" />
				<el-table-column prop="categoryName" label="目录" width="150"  show-overflow-tooltip="" />
				<el-table-column prop="barCode" label="条形码" width="150" show-overflow-tooltip="" />
				<el-table-column prop="nameLetter" label="缩写" width="150" show-overflow-tooltip="" />
				<el-table-column prop="englishName" label="英文名称" width="150" show-overflow-tooltip="" />
				<el-table-column prop="commonName" label="通用名称" width="150" show-overflow-tooltip="" />
				<el-table-column prop="salePrice" label="销售价格" width="150" show-overflow-tooltip="" />
				<el-table-column prop="memberPrice" label="会员价格"  width="150" show-overflow-tooltip="" />
				<el-table-column prop="isDiscount" label="参与打折" width="80" show-overflow-tooltip="">
					<template #default="scope">
						<el-tag v-if="scope.row.isDiscount"> 是 </el-tag>
						<el-tag type="danger" v-else> 否 </el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="outUnitName" label="单位" width="80" show-overflow-tooltip="" />
				<el-table-column label="操作" width="140" align="center" fixed="right" show-overflow-tooltip="" v-if="auth('products:cosmetologys:update') || auth('products:cosmetologys:delete')">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditProductCosmetologys(scope.row)" v-auth="'products:cosmetologys:update'"> 编辑 </el-button>
						<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delProductCosmetologys(scope.row)" v-auth="'products:cosmetologys:delete'"> 删除 </el-button>
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
			<editDialog ref="editDialogRef" :title="editProductCosmetologysTitle" @reloadTable="handleQuery" />
		</el-card>
</template>

<script lang="ts" setup>
import { ref ,onMounted} from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import editDialog from '/@/views/products/cosmetologys/component/editDialog.vue';

import { getAPI } from '/@/utils/axios-utils';
import { ProductCosmetologysApi } from '/@/api-services/api';

import mittBus from '/@/utils/newmitt';

const editDialogRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({});
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0,
});
const editProductCosmetologysTitle = ref('');

// 查询操作
const handleQuery = async  (data: any) => {
	loading.value = true;
	if (data) {
		if (data.hasOwnProperty('name')) queryParams.value.name = data.name;
		else queryParams.value.name = '';
		if (data.hasOwnProperty('isDiscount')) queryParams.value.isDiscount = data.isDiscount;
		else queryParams.value.isDiscount = true;
		if (data.hasOwnProperty('categoryId')) queryParams.value.categoryId = data.categoryId;
		else queryParams.value.categoryId = -1;
	} else {
		queryParams.value.name = '';
		queryParams.value.isDiscount = true;
		queryParams.value.categoryId = -1;
	}
	var res = await getAPI(ProductCosmetologysApi).apiProductCosmetologysPagePost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

// 打开新增页面
const openAddProductCosmetologys = (data:any) => {
	editProductCosmetologysTitle.value = '添加美容';
	editDialogRef.value.openDialog({ categoryName: data.categoryName, categoryId: data.categoryId, isDiscount: true, costPrice: 0, salePrice: 0, memberPrice: 0});
};

// 打开编辑页面
const openEditProductCosmetologys = (row: any) => {
	editProductCosmetologysTitle.value = '编辑美容';
	editDialogRef.value.openDialog({...row});
};

// 删除
const delProductCosmetologys = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(ProductCosmetologysApi).apiProductCosmetologysDeleteDelete(row);
			handleQuery({});
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

// 改变页面容量
const handleSizeChange = (val: number) => {
	tableParams.value.pageSize = val;
	handleQuery({});
};

// 改变页码序号
const handleCurrentChange = (val: number) => {
	tableParams.value.page = val;
	handleQuery({});
};
// 页面加载时
onMounted(async () => {
	// 监听布局配'置弹窗点击打开
	mittBus.on('cosmetologysQueryMthods', async (params) => {
		await handleQuery(params);
	});
	// 监听布局配'置弹窗点击打开
	mittBus.on('cosmetologysAddMthods', async (params) => {
		openAddProductCosmetologys(params);
	});
	
	await handleQuery({});
});

</script> 