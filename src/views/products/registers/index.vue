<template>
	<div class="productRegisters-container" :class="isTagsViewCurrenFull?'tab-cus-full-Content':'tab-cus-Content'">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
			<Search :search="tb.tableData.search" :param="tb.tableData.param" @search="onSearch">
				<template #command>
					<el-form-item>
						<el-button-group>
							<el-button type="primary" icon="ele-Plus" @click="openAddProductRegisters" v-auth="'sysRegisters:add'"> 新增 </el-button>
						</el-button-group>
					</el-form-item>
				</template>
			</Search>

			<!-- <el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="名称">
							<el-input v-model="queryParams.name" clearable placeholder="请输入名称" />
						</el-form-item>
						<el-form-item>
							<el-button-group>
								<el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'sysRegisters:page'"> 查询 </el-button>
								<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置 </el-button>
							</el-button-group>
						</el-form-item>
						<el-form-item>
							<el-button-group>
								<el-button type="primary" icon="ele-Plus" @click="openAddProductRegisters" v-auth="'sysRegisters:add'"> 新增 </el-button>
							</el-button-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form> -->
		</el-card>
		<el-card class="full-table" shadow="hover" style="overflow: auto; margin-top: 8px">
			<!-- <el-table :data="tableData" style="width: 100%" v-loading="loading" tooltip-effect="light" row-key="id" border>
				<el-table-column type="index" label="序号" width="80" align="center" fixed="" />
				<el-table-column prop="name" label="名称" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="salePrice" label="销售价格" show-overflow-tooltip="" />
				<el-table-column prop="outUnitName" label="单位" show-overflow-tooltip="" />
				<el-table-column label="操作" width="140" align="center" fixed="right" show-overflow-tooltip="" v-if="auth('sysRegisters:update') || auth('sysRegisters:delete')">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditProductRegisters(scope.row)" v-auth="'sysRegisters:update'"> 编辑 </el-button>
						<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delProductRegisters(scope.row)" v-auth="'sysRegisters:delete'"> 删除 </el-button>
					</template>
				</el-table-column>
			</el-table> -->
			<Table ref="tableDrugsRef" v-bind="tb.tableData" :getData="getData" border @sortHeader="onSortHeader">
				<template #action="scope" v-if="auth('sysRegisters:update') || auth('sysRegisters:delete')">
					<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditProductRegisters(scope.row)" v-auth="'sysRegisters:update'"> 编辑 </el-button>
					<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delProductRegisters(scope.row)" v-auth="'sysRegisters:delete'"> 删除 </el-button>
				</template>
			</Table>

			<editDialog ref="editDialogRef" :title="editProductRegistersTitle" @reloadTable="handleQuery" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineAsyncComponent, reactive, nextTick } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import editDialog from '/@/views/products/registers/component/editDialog.vue';
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const Search = defineAsyncComponent(() => import('/@/components/table/search.vue'));

import { getAPI } from '/@/utils/axios-utils';
import { ProductRegistersApi } from '/@/api-services/api';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes'; 
import { storeToRefs } from 'pinia';
const storesTagsViewRoutes = useTagsViewRoutes(); 
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);

const editDialogRef = ref();

const editProductRegistersTitle = ref('');
const tableDrugsRef = ref();
const tb = reactive<TableDemoState>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'name',
				label: '名称',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'outUnitName',
				label: '单位',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'salePrice',
				label: '销售价格',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				type: 'price',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'memberPrice',
				label: '会员价格',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				type: 'price',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'action',
				label: '操作',
				type: 'action',
				align: 'center',
				isCheck: true,
				fixed: 'right',
				hideCheck: true,
			},
		],
		// 配置项（必传）
		config: {
			isStripe: true, // 是否显示表格斑马纹
			isBorder: false, // 是否显示表格边框
			isSerialNo: true, // 是否显示表格序号
			isSelection: true, // 是否勾选表格多选
			showSelection: true, //是否显示表格多选
			pageSize: 20, // 每页条数
			hideExport: true, //是否隐藏导出按钮
			exportFileName: '挂号', //导出报表的文件名，不填写取应用名称
			// hideLoad: false,
			isDisabled: false,
			hidePrint: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [
			{
				label: '名称',
				prop: 'name',
				placeholder: '请输入名称',
				required: false,
				type: 'input',
			},
		],
		param: { name: '', categoryId: -1, canOrder: true, canSale: true },
		defaultSort: {
			prop: 'name',
			order: 'ascending',
		},
	},
});

const getData = async (par: any) => {
	let res = await getAPI(ProductRegistersApi).apiProductRegistersPagePost(par);
	return res.data;
};

// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};

// 查询操作
const handleQuery = async (data: any) => {
	// loading.value = true;
	// var res = await getAPI(SysRegistersApi).apiSysRegistersPagePost(Object.assign(queryParams.value, tableParams.value));
	// tableData.value = res.data.result?.items ?? [];
	// console.log('tableData.value', tableData.value);
	// tableParams.value.total = res.data.result?.total;
	// loading.value = false;
	await nextTick(() => {
		tableDrugsRef?.value?.pageReset();
	});
};
// 搜索点击时表单回调
const onSearch = (data: EmptyObjectType) => {
	tb.tableData.param = Object.assign({}, tb.tableData.param, { ...data });
	nextTick(() => {
		tableDrugsRef.value.pageReset();
	});
};
// 打开新增页面
const openAddProductRegisters = (data: any) => {
	editProductRegistersTitle.value = '添加挂号项目';
	editDialogRef.value.openDialog({ salePrice: 0, memberPrice: 0 });
};

// 打开编辑页面
const openEditProductRegisters = (row: any) => {
	editProductRegistersTitle.value = '编辑挂号项目';
	editDialogRef.value.openDialog({ ...row });
};

// 删除
const delProductRegisters = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(ProductRegistersApi).apiProductRegistersIdDeleteDelete(row.id);
			handleQuery({});
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};
// 页面加载时
onMounted(async () => {
	await handleQuery({});
});
</script>
