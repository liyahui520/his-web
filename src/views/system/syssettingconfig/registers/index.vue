<template>
	<div class="productRegisters-container" :class="isTagsViewCurrenFull?'tab-cus-full-Content':'tab-cus-Content'">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
			<Search :search="tb.tableData.search" :param="tb.tableData.param" @search="onSearch">
				<template #command>
					<el-form-item>
						<el-button-group>
							<el-button type="primary" icon="ele-Plus" @click="openAddProductRegisters"> 新增 </el-button>
						</el-button-group>
					</el-form-item>
				</template>
			</Search>
		</el-card>
		<el-card class="full-table" shadow="hover" style="overflow: auto; margin-top: 8px">
			<Table ref="tableDrugsRef" v-bind="tb.tableData" :getData="getData" border @sortHeader="onSortHeader">
				<template #action="scope" v-if="auth('settings:register:update') || auth('settings:register:delete')">
					<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditProductRegisters(scope.row)"> 编辑 </el-button>
					<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delProductRegisters(scope.row)"> 删除 </el-button>
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
import editDialog from './component/editDialog.vue';
import { EmptyObjectType } from '/@/types/global';
import { getAPI } from '/@/utils/axios-utils';
import { ProductRegistersApi } from '/@/api-services/api';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes'; 
import { storeToRefs } from 'pinia';

const storesTagsViewRoutes = useTagsViewRoutes(); 
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const Search = defineAsyncComponent(() => import('/@/components/table/search.vue'));
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
