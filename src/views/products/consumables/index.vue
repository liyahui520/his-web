<template>
	<Table ref="tableRef" v-bind="tb.tableData" :getData="getData" border @sortHeader="onSortHeader" @selectionChange="selectionChange">
		<template v-slot:command>
			<el-button type="danger" :icon="Delete" plain size="small" @click="batchDelete" v-auth="'products:consumables:delete'">批量删除</el-button>
			<el-button type="primary" :icon="Edit" plain size="small" @click="batchEdit" v-auth="'products:consumables:update'">批量编辑</el-button>
			<el-button type="warning" size="small" icon="ele-Upload" round @click="downTemp"> 导入产品 </el-button>
		</template>
		<template #isDiscount="scope">
			<el-tag v-if="scope.row.isDiscount"> 是</el-tag>
			<el-tag type="danger" v-else> 否</el-tag>
		</template>
		<template #canCable="scope">
			<el-tag v-if="scope.row.canCable"> 是</el-tag>
			<el-tag type="danger" v-else> 否</el-tag>
		</template>
		<template #canOrder="scope">
			<el-tag v-if="scope.row.canOrder"> 是</el-tag>
			<el-tag type="danger" v-else> 否</el-tag>
		</template>
		<template #canSale="scope">
			<el-tag v-if="scope.row.canSale"> 是</el-tag>
			<el-tag type="danger" v-else> 否</el-tag>
		</template>
		<template #isDisable="scope">
			<el-tag v-if="scope.row.isDisable"> 是</el-tag>
			<el-tag type="danger" v-else> 否</el-tag>
		</template>
		<template #action="scope" v-if="auth('products:consumables:update') || auth('products:consumables:delete')">
			<el-button icon="ele-Edit" size="small" text="" type="primary" v-auth="'products:consumables:update'" @click="openEditProductconsumables(scope.row)"> 编辑 </el-button>
			<el-button icon="ele-Delete" size="small" text="" type="danger" v-auth="'products:consumables:delete'" @click="delProductconsumables(scope.row)"> 删除 </el-button>
		</template>
	</Table>
	<editDialog ref="editDialogRef" :title="editProductconsumablesTitle" @reloadTable="handleQuery" :productCategorysData="props.productCategorysData" />
	<batchEditDialog ref="batchEditDialogRef" :title="'批量编辑'" @reloadTable="handleQuery" :productCategorysData="props.productCategorysData" />
	<downloadTemp ref="downloadTempRef" :title="importTempTitle" />
</template>

<script lang="ts" setup name="productConsumablesVue">
import { ref, watch, onMounted, reactive, defineAsyncComponent, nextTick } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';

import editDialog from '/@/views/products/consumables/component/editDialog.vue';
import batchEditDialog from '/@/views/products/component/batchEditDialog.vue';
import { Delete, Edit } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductConsumablesApi } from '/@/api-services/api';
import mittBus from '/@/utils/newmitt';
import { verifyTextColor } from '/@/utils/toolsValidate';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';
import downloadTemp from '/@/views/products/component/downloadTemp.vue';

const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const tableRef = ref<RefType>();
const editDialogRef = ref();
const batchEditDialogRef = ref();
const deleteIds = ref<any>([]);
const editProductconsumablesTitle = ref('');
const importTempTitle = ref('');
const downloadTempRef = ref();

var props = defineProps({
	productCategorysData: {
		type: Array,
		default: [] as any,
	},
});

const tb = reactive<TableDemoState>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'categoryName',
				width: '120',
				label: '所属目录',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'name',
				width: '',
				label: '名称',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'barCode',
				width: '120',
				label: '条形码',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'nameLetter',
				width: '120',
				label: '缩写',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'englishName',
				width: '120',
				label: '英文名称',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'commonName',
				width: '120',
				label: '通用名称',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'count',
				width: '80',
				label: '库存',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'salePrice',
				width: '120',
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
				width: '120',
				label: '会员价格',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				type: 'price',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'isDiscount',
				width: '120',
				label: '参与打折',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'outUnitName',
				width: '120',
				label: '出库单位',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},

			{
				prop: 'providerName',
				width: '120',
				label: '供应商',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'manufacturerName',
				width: '120',
				label: '生产商',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'canOrder',
				width: '100',
				label: '可订',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				align: 'center',
				isCheck: true,
			},
			{
				prop: 'canSale',
				width: '100',
				label: '可销',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				align: 'center',
				isCheck: true,
			},
			{
				prop: 'canCable',
				width: '100',
				label: '可盘',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				align: 'center',
				isCheck: true,
			},
			{
				prop: 'action',
				width: 150,
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
			hideExport: false, //是否隐藏导出按钮
			isDisabled: false,
			exportFileName: '消耗品信息', //导出报表的文件名，不填写取应用名称
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [
			// { label: '创建时间', prop: 'time', placeholder: '请选择', required: false, type: 'date' },
		],
		param: { name: '', categoryId: -1, canOrder: true, canSale: true },
		defaultSort: {
			prop: 'name',
			order: 'ascending',
		},
	},
});

// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};

/**
 * 下载导入模板信息
 */
const downTemp = async () => {
	importTempTitle.value = '导入产品信息';
	downloadTempRef.value?.openDialog(ProductTypeEnums.NUMBER_140001, [], []);
};
// 查询操作
const handleQuery = async (data: any) => {
	if (data) {
		if (data.hasOwnProperty('name')) tb.tableData.param.name = data.name;
		else tb.tableData.param.name = '';
		if (data.hasOwnProperty('isDiscount')) tb.tableData.param.isDiscount = data.isDiscount;
		else tb.tableData.param.isDiscount = false;
		if (data.hasOwnProperty('canOrder')) tb.tableData.param.canOrder = data.canOrder;
		else tb.tableData.param.canOrder = false;
		if (data.hasOwnProperty('canSale')) tb.tableData.param.canSale = data.canSale;
		else tb.tableData.param.canSale = false;
		if (data.hasOwnProperty('canCable')) tb.tableData.param.canCable = data.canCable;
		else tb.tableData.param.canCable = false;
		if (data.hasOwnProperty('categoryId')) tb.tableData.param.categoryId = data.categoryId;
		else tb.tableData.param.categoryId = -1;
	}
	await nextTick(() => {
		tableRef?.value?.pageReset();
	});
};

//选中的值
const selectionChange = async (d) => {
	deleteIds.value = [];
	d.forEach((v) => {
		deleteIds.value.push(v.id);
	});
};

//搜索时字体高亮
const colorformatter = async (a, b, val) => {
	console.log(tb.tableData.param.name);
	val = '111';
	if (tb.tableData.param.name) return verifyTextColor(val, tb.tableData.param.name);
	else return val;
};

const getData = async (par: any) => {
	let res = await getAPI(ProductConsumablesApi).apiProductConsumablesPagePost(par);
	return res.data;
};

// 打开新增页面
const openAddProductconsumables = (data: any) => {
	editProductconsumablesTitle.value = '添加消耗品';
	editDialogRef.value?.openDialog({
		categoryName: data.categoryName,
		canOrder: true,
		categoryArr: data.categoryId == -1 ? [] : [data.categoryId],
		canSale: true,
		isDiscount: true,
		costPrice: 0,
		salePrice: 0,
		memberPrice: 0,
		inSpecific: 1,
	});
};

// 打开编辑页面
const openEditProductconsumables = (row: any) => {
	editProductconsumablesTitle.value = '编辑消耗品';
	row.categoryArr = row.categoryId == -1 ? [] : [row.categoryId];
	editDialogRef.value.openDialog({ ...row });
};

// 删除
const delProductconsumables = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '系统提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(ProductConsumablesApi).apiProductConsumablesDeletePost(row);
			await nextTick(() => {
				tableRef?.value?.pageReset();
			});
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

//批量编辑
const batchEdit = () => {
	const tableRows = tableRef.value.getSelectionRows();
	if (tableRows.length <= 0) {
		ElMessage.warning('请先选择要编辑的数据');
		return;
	}
	batchEditDialogRef.value?.openDialog({ products: tableRows }, true);
};
const batchDelete = () => {
	const tableRows = tableRef.value.getSelectionRows();
	if (tableRows.length <= 0) {
		ElMessage.warning('请先选择要删除的数据');
		return;
	}
	ElMessageBox.confirm(`确定要删除吗？共 ` + tableRows.length + ` 条数据`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(ProductConsumablesApi)
				.apiProductConsumablesDeleteByIdsDelete({
					ids: tableRows.map((m) => {
						return m.id;
					}),
				})
				.then((_) => {
					nextTick(() => {
						tableRef?.value?.pageReset();
					});
					ElMessage.success('删除成功');
				})
				.catch((_) => {
					ElMessage.error('删除失败');
				});
		})
		.catch(() => {});
};
// 页面加载时
onMounted(async () => {
	// 监听布局配'置弹窗点击打开
	mittBus.on('consumablesQueryMthods', async (params) => {
		await handleQuery(params);
	});
	// 监听布局配'置弹窗点击打开
	mittBus.on('consumablesAddMthods', async (params) => {
		openAddProductconsumables(params);
	});
});
</script>
<style scoped lang="scss">
.btn-edit-bg {
	margin-left: 10px;
}
</style>
