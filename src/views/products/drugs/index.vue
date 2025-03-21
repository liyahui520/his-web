<template>
	<Table ref="tableDrugsRef" v-bind="tb.tableData" :getData="getData" border @sortHeader="onSortHeader" @selectionChange="selectionChange">
		<template v-slot:command>
			<el-button type="danger" :icon="Delete" @click="batchDelete" plain size="small" v-auth="'products:drugs:delete'">批量删除</el-button>
			<el-button type="primary" :icon="Edit" plain size="small" @click="batchEdit" v-auth="'products:drugs:update'">批量编辑</el-button>
            <el-button type="warning" size="small" icon="ele-Upload" round @click="downTemp" v-auth="'products:drugs:import'" > 导入产品 </el-button>
            
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
		<template #inSpecific="scope">
			<el-tag> 1 {{ scope.row.inUnitName }} = {{ scope.row.inSpecific }} {{ scope.row.outUnitName }}</el-tag>
		</template>
		<template #usingMethod="scope">
			{{ usingMethodObject[scope.row.usingMethod + ''] }}
		</template>
		<template #dosingWay="scope">
			{{ dosingWayObject[scope.row.dosingWay + ''] }}
		</template>
		<template #action="scope" v-if="auth('products:drugs:update') || auth('products:drugs:delete')">
			<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditProductDrugs(scope.row)" v-auth="'products:drugs:update'"> 编辑 </el-button>
			<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delProductDrugs(scope.row)" v-auth="'products:drugs:delete'"> 删除 </el-button>
		</template>
	</Table>
	<editDialog ref="editDialogRef" :productCategorysData="props.productCategorysData" :title="editProductDrugsTitle" @reloadTable="handleQuery" />
	<batchEditDialog ref="batchEditDialogRef" :title="'批量编辑'" @reloadTable="handleQuery" :productCategorysData="props.productCategorysData" />
	<downloadTemp ref="downloadTempRef" :title="importTempTitle" />
</template>

<script lang="ts" setup name="productDrugsVue">
import { ref, onMounted, reactive, defineAsyncComponent, nextTick } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import editDialog from '/@/views/products/drugs/component/editDialog.vue';
import { Delete, Edit } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductDrugsApi } from '/@/api-services/api';
import mittBus from '/@/utils/newmitt';
import batchEditDialog from '/@/views/products/component/batchEditDialog.vue';
import downloadTemp from '/@/views/products/component/downloadTemp.vue';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';
import { useUserInfo } from '/@/stores/userInfo';

const stores = useUserInfo();
const dictList = stores.dictList;
console.log("stores.userInfos.authBtnList",stores.userInfos.authBtnList)
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const tableDrugsRef = ref<RefType>();
const usingMethodObject = ref<any>({});
const dosingWayObject = ref<any>({});
const usingMethodTransObject = ref<any>({});
const dosingWayTransObject = ref<any>({});
const editDialogRef = ref();
const downloadTempRef = ref();
const batchEditDialogRef = ref();
const editProductDrugsTitle = ref('');
const importTempTitle = ref('');
const deleteIds = ref<any>([]);
const usingMethodData = ref<any>([]);
const dosingWayData = ref<any>([]);
var props = defineProps({
	productCategorysData: {
		type: Array,
		default: [] as any,
	},
});

// 页面加载时
onMounted(async () => {
	// 监听布局配'置弹窗点击打开
	mittBus.on('drugsQueryMthods', async (params) => {
		await handleQuery(params);
	});
	// 监听布局配'置弹窗点击打开
	mittBus.on('drugsAddMthods', async (params) => {
		openAddProductDrugs(params);
	});
	// await handleQuery({});
	await loadUsingMethodData();
	await loadDosingWayData();
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
				prop: 'ingredient',
				width: '120',
				label: '成分',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'usingMethod',
				width: '120',
				label: '使用方式',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'dosingWay',
				width: '120',
				label: '投药方式',
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
			// {
			//     prop: 'isDisable',
			//     width: '120',
			//     label: '停用',
			//     headerAlign: 'center',
			//     toolTip: true,
			//     sortable: 'custom',
			//     isCheck: true
			// },
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
			exportFileName: '商品信息', //导出报表的文件名，不填写取应用名称
			// hideLoad: false,
			isDisabled: false,
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

// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};
const getData = async (par: any) => {
	let res = await getAPI(ProductDrugsApi).apiProductDrugsPagePost(par);
	return res.data;
};
const loadUsingMethodData = async () => {
	var res = dictList['code_using_method'];
	usingMethodData.value = res ?? [];
	usingMethodData.value.forEach((item: any) => {
		usingMethodObject.value[item.id] = item.label;
		usingMethodTransObject.value[item.code] = item.label;
	});
};
const loadDosingWayData = async () => {
	var res = dictList['code_dosing_way'];
	dosingWayData.value = res ?? [];
	dosingWayData.value.forEach((item: any) => {
		dosingWayObject.value[item.id] = item.label;
		dosingWayTransObject.value[item.code] = item.label;
	});
};
/**
 * 下载导入模板信息
 */
const downTemp = async () => {
	
	importTempTitle.value = "导入产品信息";
	downloadTempRef.value?.openDialog(ProductTypeEnums.NUMBER_20001,usingMethodTransObject.value,dosingWayTransObject.value);
};

// 查询操作
const handleQuery = async (data: any) => {
	if (data) {
		if (data.hasOwnProperty('name')) tb.tableData.param.name = data.name;
		else tb.tableData.param.name = '';
		if (data.hasOwnProperty('isDiscount')) tb.tableData.param.isDiscount = data.isDiscount;
		else tb.tableData.param.isDiscount = false;
		if (data.hasOwnProperty('canOrder')) tb.tableData.param.canOrder = data.canOrder;
		else tb.tableData.param.canOrder = true;
		if (data.hasOwnProperty('canSale')) tb.tableData.param.canSale = data.canSale;
		else tb.tableData.param.canSale = true;
		if (data.hasOwnProperty('canCable')) tb.tableData.param.canCable = data.canCable;
		else tb.tableData.param.canCable = true;
		if (data.hasOwnProperty('categoryId')) tb.tableData.param.categoryId = data.categoryId;
		else tb.tableData.param.categoryId = -1;
	}
	await nextTick(() => {
		tableDrugsRef?.value?.pageReset();
	});
};

//选中的值
const selectionChange = async (d) => {
	deleteIds.value = [];
	d.forEach((v) => {
		deleteIds.value.push(v.id);
	});
};

//批量编辑
const batchEdit = () => {
	const tableRows = tableDrugsRef.value.getSelectionRows();
	if (tableRows.length <= 0) {
		ElMessage.warning('请先选择要编辑的数据');
		return;
	}
	batchEditDialogRef.value?.openDialog({ products: tableRows }, true);
};

//批量删除
const batchDelete = async () => {
	// if (deleteIds.value.length <= 0) {
	//     ElMessage.warning('请先选择要删除的数据');
	//     return;
	// }
	const tableRows = tableDrugsRef.value.getSelectionRows();
	if (tableRows.length <= 0) {
		ElMessage.warning('请先选择要删除的数据');
		return;
	}
	ElMessageBox.confirm(`确定要删除吗?共` + deleteIds.value.length + `条数据`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(ProductDrugsApi)
				.apiProductDrugsDeleteByIdsDelete({ ids: deleteIds.value })
				.then((_) => {
					nextTick(() => {
						tableDrugsRef?.value?.pageReset();
					});
					ElMessage.success('删除成功');
				})
				.catch((_) => {
					ElMessage.error('删除失败');
				});
		})
		.catch(() => {});
};

// 打开新增页面
const openAddProductDrugs = (data: any) => {
	editProductDrugsTitle.value = '添加药品';
	editDialogRef.value?.openDialog(
		{
			categoryName: data.categoryName,
			canOrder: true,
			categoryArr: data.categoryId == -1 ? [] : [data.categoryId],
			canSale: true,
			isDiscount: true,
			costPrice: 0,
			salePrice: 0,
			memberPrice: 0,
			inSpecific: 1,
		},
		usingMethodData.value,
		dosingWayData.value
	);
};

// 打开编辑页面
const openEditProductDrugs = async (row: any) => {
	editProductDrugsTitle.value = '编辑药品';
	row.categoryArr = row.categoryId == -1 ? [] : [row.categoryId];
	editDialogRef.value.openDialog({ ...row }, usingMethodData.value, dosingWayData.value);
};

// 删除
const delProductDrugs = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(ProductDrugsApi).apiProductDrugsDeleteDelete(row);
			await nextTick(() => {
				tableDrugsRef?.value?.pageReset();
			});
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

</script>
