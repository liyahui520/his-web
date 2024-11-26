<template>
	<div class="dialog-product">
		<el-dialog v-model="isShowDialog" draggable :close-on-click-modal="false" :width="'calc(180vh)'" :style="'min-width:calc(100vh);' + 'height:calc(95vh+5px)'" :destroy-on-close="true">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span> 选择产品 </span>
				</div>
			</template>

			<el-row :gutter="8">
				<el-col :span="6">
					<CTree @handleNodeClick="handleNodeClick" />
				</el-col>
				<el-col :span="18">
					<el-card  >
						<TableSearch :search="tb.tableData.search" :param="tb.tableData.param" @search="onSearch" />
					</el-card>
					<el-card shadow="always" style="margin-top: 8px;" :style="'width: 100%;'">
						<Table  style="width: 100%;height: calc(100vh - 270px);" ref="tableRef" v-bind="tb.tableData" :getData="getData" border v-loading="tableLoading" @selectionChange="selectionChange" />
					</el-card>
				</el-col>
			</el-row>
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="cancel">取 消</el-button>
					<el-button type="primary" size="default" @click="onproductSubmit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="dialog-product">
import { defineAsyncComponent, reactive, ref ,nextTick} from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { InStorageApi } from '/@/api-services/api';
import { useUserInfo } from '/@/stores/userInfo';

const stores = useUserInfo();
const CTree = defineAsyncComponent(() => import('/@/components/tree/index.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/table/search.vue'));
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const isShowDialog = ref(false);
const tableLoading = ref(false);
const selectTables = ref([]);
const tableRef = ref();
const unitObject = ref<any>({});
const emit = defineEmits(['submit']);
const tb = reactive<TableDemoState>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'serialNumber',
				width: 150,
				label: '编码',
				headerAlign: 'center',
				align: 'left',
				sortable: 'custom',
				isCheck: true,
				hideCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'categoryName',
				width: 200,
				label: '目录',
				headerAlign: 'center',
				align: 'left',
				sortable: 'custom',
				isCheck: true,
				hideCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'name',
				label: '产品名称',
				headerAlign: 'center',
				toolTip: true,
				align: 'left',
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'inUnitName',
				width: 80,
				label: '单位',
				align: 'center',
				isCheck: true,
				sortable: 'custom',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'costPrice',
				width: 150,
				label: '成本价(元)',
				align: 'center',
				sortable: 'custom',
				type: 'price',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'count',
				width: 150,
				label: '库存',
				align: 'center',
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
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
			exportFileName: '采购单', //导出报表的文件名，不填写取应用名称
			isDisabled: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [
			{ label: '产品名称', prop: 'productName', placeholder: '搜索产品名称', required: false, type: 'input' },
			{ label: '产品编码', prop: 'itemCode', placeholder: '搜索产品编码', required: false, type: 'input' },
		],
		param: { itemCode: '', productName: ''},
		defaultSort: {
			prop: 'id',
			order: 'ascending',
		},
	},
});

const loadUnitData = () => {
	let productUnits = stores.productUnits;
	productUnits.forEach((item: any) => {
		unitObject.value[item.id] = item.name;
	});
};
const getData = async (par) => {
	console.log("最终去请求数据",par)
	const params=Object.assign({}, tb.tableData.param, par);
	let res = (await getAPI(InStorageApi).apiInStorageProductPagePost(params)).data;
	if (res.result.items) {
		res.result.items.forEach((item) => {
			item.inUnitName = unitObject.value[item.inUnitId];
			item.outUnitName = unitObject.value[item.outUnitId];
		});
	}
	return res;
};

// 搜索点击时表单回调
const onSearch = async (data: EmptyObjectType) => {
	tb.tableData.param.categoryId = -1;
	console.log("搜索框")
	console.log("搜索框data",data)
	console.log("搜索框tb.tableData.param",tb.tableData.param)
	const params=Object.assign({}, tb.tableData.param, { ...data });
	tb.tableData.param = params;
	console.log("去请求数据",tb.tableData.param)
	tableRef.value?.handleList();
};

/**
 * 点击确认
 */
const onproductSubmit = async () => {
	emit('submit', selectTables.value);
	isShowDialog.value = false;
};

// 搜索点击时表单回调
const getDataTable = async (data: EmptyObjectType) => {
	console.log("这个啥玩意？",data)
	tb.tableData.param = Object.assign({}, tb.tableData.param, data );
	console.log("去请求数据",tb.tableData.param)
	tableRef.value?.handleList();
};

const selectionChange = async (list: any) => {
	selectTables.value = list;
};

/**
 * 点击树节点
 * @param row
 */
const handleNodeClick = async (row, code) => {
	console.log("21321",row, code)
	if (row) {
		tb.tableData.param.categoryId = row.id;
	}
	tb.tableData.param.categoryType = code;
	await getDataTable(tb.tableData.param);
};

// 打开弹窗
const openDialog = () => {
	isShowDialog.value = true;
	loadUnitData();
};

// 关闭弹窗
const closeDialog = () => {
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};

// 导出对象
defineExpose({ openDialog });
</script>

<style scoped></style>
