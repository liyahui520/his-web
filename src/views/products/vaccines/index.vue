<template>
	<Table ref="tableVaccinesRef" v-bind="tb.tableData" :getData="getData" border @sortHeader="onSortHeader" @selectionChange="selectionChange">
		<template v-slot:command>
			<el-button type="danger" :icon="Delete" plain size="small" @click="batchDelete" v-auth="'products:vaccines:delete'">批量删除</el-button>
			<el-button type="primary" :icon="Edit" plain size="small" @click="batchEdit" v-auth="'products:vaccines:update'">批量编辑</el-button>
			<el-button type="warning" size="small" icon="ele-Upload" round @click="downTemp" v-auth="'products:vaccines:import'"> 导入产品 </el-button>
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
		<template #intervalUnit="scope">
			<el-tag>{{ intervalUnitObject[scope.row.intervalUnit] }}</el-tag>
		</template>
		<template #inSpecific="scope">
			<el-tag> 1 {{ scope.row.inUnitName }} = {{ scope.row.inSpecific }} {{ scope.row.outUnitName }}</el-tag>
		</template>
		<template #action="scope" v-if="auth('products:vaccines:update') || auth('products:vaccines:delete')">
			<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditProductVaccines(scope.row)" v-auth="'products:vaccines:update'"> 编辑 </el-button>
			<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delProductVaccines(scope.row)" v-auth="'products:vaccines:delete'"> 删除 </el-button>
		</template>
	</Table>
	<editDialog ref="editDialogRef" :title="editProductVaccinesTitle" @reloadTable="handleQuery" :productCategorysData="props.productCategorysData" />
	<batchEditDialog ref="batchEditDialogRef" :title="'批量编辑'" @reloadTable="handleQuery" :productCategorysData="props.productCategorysData" />
	<downloadTemp ref="downloadTempRef" :title="importTempTitle" />
</template>

<script lang="ts" setup>
import { ref, onMounted, defineAsyncComponent, nextTick, reactive } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import editDialog from '/@/views/products/vaccines/component/editDialog.vue';
import batchEditDialog from '/@/views/products/component/batchEditDialog.vue';
import { getAPI } from '/@/utils/axios-utils';
import { Delete, Edit } from '@element-plus/icons-vue';
import { ProductVaccinesApi } from '/@/api-services/api';
import mittBus from '/@/utils/newmitt';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';
import downloadTemp from '/@/views/products/component/downloadTemp.vue';

const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));

const editDialogRef = ref();
const batchEditDialogRef = ref();
const loading = ref(false);
const tableVaccinesRef = ref();
const deleteIds = ref<any>([]);
const intervalUnitObject = ref<any>({ Day: '天', Week: '周', Month: '月', Year: '年' });

const editProductVaccinesTitle = ref('');
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
				width: '150',
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
				width: '120',
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
				'show-overflow-tooltip': true,
			},
			{
				prop: 'serialNumber',
				width: '160',
				label: '编码',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'nameLetter',
				width: '',
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
				prop: 'interval',
				width: '120',
				label: '接种间隔',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'intervalUnit',
				width: '120',
				label: '间隔单位',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'specific',
				width: '120',
				label: '规格',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
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
				prop: 'inUnitName',
				width: '120',
				label: '入库单位',
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
				prop: 'inSpecific',
				width: '120',
				label: '转换方式',
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
				prop: 'brandName',
				width: '120',
				label: '品牌',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'canOrder',
				width: '120',
				label: '可订',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
			},
			{
				prop: 'canSale',
				width: '120',
				label: '可销',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
			},
			{
				prop: 'canCable',
				width: '120',
				label: '可盘',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
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
			exportFileName: '疫苗信息', //导出报表的文件名，不填写取应用名称
			hidePrint: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [],
		param: { name: '', categoryId: -1, canOrder: true, canSale: true },
		defaultSort: {
			prop: 'name',
			order: 'ascending',
		},
	},
});

/**
 * 下载导入模板信息
 */
 const downTemp = async () => {
	importTempTitle.value = '导入产品信息';
	downloadTempRef.value?.openDialog(ProductTypeEnums.NUMBER_60001, [], []);
};
// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};
const getData = async (par: any) => {
	let res = await getAPI(ProductVaccinesApi).apiProductVaccinesPagePost(par);
	return res.data;
};

//选中的值
const selectionChange = async (d) => {
	deleteIds.value = [];
	d.forEach((v) => {
		deleteIds.value.push(v.id);
	});
};

// 查询操作
const handleQuery = async (data: any) => {
	loading.value = true;
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
		tableVaccinesRef?.value?.pageReset();
	});
	// var res = await getAPI(ProductVaccinesApi).apiProductVaccinesPagePost(Object.assign(queryParams.value, tableParams.value));
	// tableData.value = res.data.result?.items ?? [];
	// tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

// 打开新增页面
const openAddProductVaccines = (data: any) => {
	editProductVaccinesTitle.value = '添加疫苗';
	editDialogRef.value.openDialog({
		categoryName: data.categoryName,
		categoryArr: data.categoryId == -1 ? [] : [data.categoryId],
		canSale: true,
		isDiscount: true,
		costPrice: 0,
		salePrice: 0,
		memberPrice: 0,
		inSpecific: 1,
		interval: 1,
		intervalUnit: 'Year',
		times: 1,
	});
};

// 打开编辑页面
const openEditProductVaccines = (row: any) => {
	editProductVaccinesTitle.value = '编辑疫苗';
	row.categoryArr = row.categoryId == -1 ? [] : [row.categoryId];
	editDialogRef.value.openDialog({ ...row });
};

// 删除
const delProductVaccines = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(ProductVaccinesApi).apiProductVaccinesDeleteDelete(row);
			handleQuery({});
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

//批量编辑
const batchEdit = () => {
	const tableRows = tableVaccinesRef.value.getSelectionRows();
	if (tableRows.length <= 0) {
		ElMessage.warning('请先选择要编辑的数据');
		return;
	}
	batchEditDialogRef.value?.openDialog({ products: tableRows }, true);
};
const batchDelete = () => {
	const tableRows = tableVaccinesRef.value.getSelectionRows();
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
			await getAPI(ProductVaccinesApi)
				.apiProductVaccinesDeleteByIdsDelete({
					ids: tableRows.map((m) => {
						return m.id;
					}),
				})
				.then((_) => {
					nextTick(() => {
						tableVaccinesRef?.value?.pageReset();
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
	mittBus.on('vaccinesQueryMthods', async (params) => {
		await handleQuery(params);
	});
	// 监听布局配'置弹窗点击打开
	mittBus.on('vaccinesAddMthods', async (params) => {
		openAddProductVaccines(params);
	});

	// await handleQuery({});
});
</script>
