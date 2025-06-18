<template>
	<div class="instorage-container"  :class="isTagsViewCurrenFull?'tab-cus-full-Content':'tab-cus-Content'">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<TableSearch :search="tb.tableData.search" :modelValue="tb.tableData.param" @search="onSearch" />
		</el-card>
		<el-card shadow="never" class="full-table" style="overflow: auto; margin-top: 8px">
			<Table
				ref="tableRef"
				v-bind="tb.tableData"
				:getData="getData"
				:exportChangeData="exportChangeData" 
				@sortHeader="onSortHeader"
				@selectionChange="tableSelection"
				border
			>
				<template #command>
					<el-button type="primary" icon="ele-Plus" size="small" @click="openAddConfig" v-auth="'instorage:add'" round> 新增采购 </el-button>
					<el-button v-if="state.selectlist.length > 0" type="danger" icon="ele-Delete" @click="bacthDelete" v-auth="'instorage:delete'"> 批量删除 </el-button>
				</template>
				<template #amount="scope">
					<p>{{ verifyNumberComma(scope.row.amount.toFixed(2)) }}</p>
				</template>
				<template #differAmount="scope">
					<p>{{ verifyNumberComma(scope.row.differAmount.toFixed(2)) }}</p>
				</template>
				<template #statusName="scope">
					<el-tag class="ml-2" v-if="scope.row.status == 0" type="error">{{ scope.row.statusName }}</el-tag>
					<el-tag class="ml-2" v-if="scope.row.status == 1" type="info">{{ scope.row.statusName }}</el-tag>
					<el-tag class="ml-2" v-if="scope.row.status == 2" type="warning">{{ scope.row.statusName }}</el-tag>
					<el-tag class="ml-2" v-if="scope.row.status == 3" type="success">{{ scope.row.statusName }}</el-tag>
					<el-tag class="ml-2" v-if="scope.row.status == 4" type="danger">{{ scope.row.statusName }}</el-tag>
				</template>
				<template #action="scope">
					<el-button icon="ele-Reading" size="small" text type="primary" @click="details(scope.row)" v-if="scope.row.status > 1"> 详情 </el-button>
					<el-button icon="ele-Edit" size="small" text type="primary" @click="openEditConfig(scope.row)" v-auth="'instorage:edit'" v-if="scope.row.status == 0 || scope.row.status == 1">
						编辑
					</el-button>
					<el-button icon="ele-Edit" size="small" text type="success" @click="ArraignChangeDataxamine(scope.row)" v-auth="'instorage:in-storage-arraign'" v-if="scope.row.status == 1">
						提审
					</el-button>
					<el-button icon="ele-Edit" size="small" text type="success" @click="exportChangeDataxamine(scope.row)" v-auth="'instorage:in-storage-examine'" v-if="scope.row.status == 2"> 审核 </el-button>
					<!-- <el-button icon="ele-Edit" size="small" text type="warning" @click="openEditConfig(scope.row)" v-auth="'instorage:edit'" v-if="scope.row.status == 3"> 退货 </el-button> -->
					<el-button
						icon="ele-Delete"
						size="small"
						text
						type="danger"
						@click="delInStorage(scope.row)"
						v-auth="'instorage:delete'"
						v-if="scope.row.status == 0 || scope.row.status == 1 || scope.row.status == 2"
					>
						删除
					</el-button>
				</template>
			</Table>

			<AddInstorage ref="addInstorageRef" :title="state.editConfigTitle" @submit="updateData" />
		</el-card>
	</div>
</template>

<script lang="ts" setup name="instorage">
import { onMounted, reactive, ref, defineAsyncComponent, nextTick } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { auth } from '/@/utils/authFunction';
import { InStorageApi, SysEnumApi } from '/@/api-services';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import { formatDate } from '/@/utils/formatTime';
import { useUserInfo } from '/@/stores/userInfo';

const stores = useUserInfo();

import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes'; 
import { storeToRefs } from 'pinia';
import { EmptyObjectType, RefType } from '/@/types/global';
const storesTagsViewRoutes = useTagsViewRoutes(); 
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/table/search.vue'));
const AddInstorage = defineAsyncComponent(() => import('./component/addInstorage.vue'));
const addInstorageRef = ref();
const tableRef = ref<RefType>();

const state = reactive({
	editConfigTitle: '',
	selectlist: [] as EmptyObjectType[],
	groupList: [] as Array<String>,
});

const tb = reactive<TableDemoState>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'createTime',
				width: 170,
				label: '提交时间',
				headerAlign: 'center',
				sortable: 'custom',
				isCheck: true,
				hideCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'inOperatorName',
				width: 150,
				label: '提交人',
				headerAlign: 'center',
				sortable: 'custom',
				isCheck: true,
				hideCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'typeName',
				width: 110,
				label: '单据类型',
				headerAlign: 'center',
				toolTip: true,
				// sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'orderNo',
				width: 200,
				label: '单据编号',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'providerName',
				width: 150,
				label: '供应商名称',
				headerAlign: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'inCount',
				width: 100,
				label: '单量',
				align: 'center',
				isCheck: true,
				sortable: 'custom',
				showOverflowTooltip: true,
			},
			{
				prop: 'amount',
				width: 150,
				label: '采购金额(元)',
				align: 'left',
				sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'statusName',
				width: 150,
				label: '状态',
				align: 'center',
				// sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			// {
			// 	prop: 'differCount',
			// 	width: 120,
			// 	label: '差异数量',
			// 	align: 'center',
			// 	isCheck: true,
			// 	sortable: 'custom',
			// 	showOverflowTooltip: true,
			// },
			// {
			// 	prop: 'differAmount',
			// 	width: 150,
			// 	label: '差异金额(元)',
			// 	align: 'left',
			// 	sortable: 'custom',
			// 	isCheck: true,
			// 	showOverflowTooltip: true,
			// },
			{
				prop: 'examineDate',
				width: 170,
				label: '审核时间',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'examineName',
				width: 150,
				label: '审核人',
				align: 'center',
				sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			// {prop: 'statusName', width: 100, label: '状态', align: 'center', isCheck: true,showOverflowTooltip: true},
			{
				prop: 'remark',
				label: '备注',
				align: '',
				headerAlign: 'center',
				showOverflowTooltip: true,
				isCheck: true,
			},
			{
				prop: 'action',
				width: 220,
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
			showSelection: auth('sysConfig:batchDelete'), //是否显示表格多选
			pageSize: 20, // 每页条数
			hideExport: true, //是否隐藏导出按钮
			exportFileName: '采购单', //导出报表的文件名，不填写取应用名称
			hidePrint: true,
			isDisabled: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [
			{ label: '提交日期', prop: 'time', placeholder: '请选择提交日期', required: false, type: 'daterange' },
			{
				label: '单据类型',
				prop: 'type',
				placeholder: '请选择单据类型',
				required: false,
				type: 'select',
				options: [],
				optionkey: 'value',
				optionname: 'label',
			},
			{
				label: '供应商',
				prop: 'providerId',
				placeholder: '请选择供应商',
				required: false,
				type: 'select',
				options: [],
				optionkey: 'value',
				optionname: 'label',
			},
		],
		param: { time: [] },
		defaultSort: {
			prop: 'createTime',
			order: 'descending',
		},
	},
});
//获取所有供应商
const getProductProviders = async () => {
	const r = stores.productProviders;
	let result = r ?? [];
	result.forEach((itme: any) => {
		tb.tableData.search[2].options?.push({ value: itme.id, label: itme.name });
	});
};
//获取所有入库类型
const getOrderTypes = async () => {
	var r = await getAPI(SysEnumApi).apiSysEnumEnumDataListGet('OrderTypeEnum');
	let result = r.data?.result ?? [];
	result.forEach((itme: any) => {
		tb.tableData.search[1].options?.push({ value: itme.value, label: itme.describe });
	});
};
const getData = async (param: any) => {
	if (param.time) {
		param.startTime = param.time[0];
		param.endTime = param.time[1];
	}
	var r = await getAPI(InStorageApi).apiInStoragePagePost(param);
	return r.data;
};
const exportChangeData = (data: Array<EmptyObjectType>) => {
	data.forEach((item) => {
		item.sysFlag = item.sysFlag == 1 ? '是' : '否';
	});
	return data;
};
// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};
// 搜索点击时表单回调
const onSearch = (data: EmptyObjectType) => {
	tb.tableData.param = Object.assign({}, tb.tableData.param, { ...data });
	nextTick(() => {
		tableRef.value.pageReset();
	});
};

//提审
const ArraignChangeDataxamine = async (row: any) => {
	await getAPI(InStorageApi).apiInStorageIdInStorageArraignGet(row.id);
	nextTick(() => {
		tableRef.value.pageReset();
	});
};

const details = async (row: any) => {
	state.editConfigTitle = '入库单详情';
	let r = await getAPI(InStorageApi).apiInStorageIdGetSingInStorageGet(row.id);
	addInstorageRef.value?.openDialog(true, r.data?.result, true, true);
};

//审核任务
const exportChangeDataxamine = async (row: any) => {
	state.editConfigTitle = '审核入库单';
	let r = await getAPI(InStorageApi).apiInStorageIdGetSingInStorageGet(row.id);
	addInstorageRef.value?.openDialog(true, r.data?.result, true);
};

//删除单据
const delInStorage = async (row: any) => {
	ElMessageBox.confirm(`确定删除【${row.orderNo}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(InStorageApi).apiInStorageIdDeleteDelete(row.id);
			await nextTick(async () => {
				await tableRef.value.pageReset();
			});
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

//表格多选事件
const tableSelection = (data: EmptyObjectType[]) => {
	state.selectlist = data;
};

onMounted(async () => {
	await getOrderTypes();
	await getProductProviders();
});

// 更新数据
const updateData = () => {
	tableRef.value.handleList();
};

// 打开新增页面
const openAddConfig = () => {
	state.editConfigTitle = '新增入库单';
	addInstorageRef.value?.openDialog(false, { amount: 0, inCount: 0, inStorageDetails: [], orderNo: 'R' + formatDate(new Date(), 'YYYYmmddHHMMSS') });
};

// 打开编辑页面
const openEditConfig = async (row: any) => {
	state.editConfigTitle = '编辑入库单';
	let r = await getAPI(InStorageApi).apiInStorageIdGetSingInStorageGet(row.id);
	addInstorageRef.value?.openDialog(true, r.data?.result);
};

//批量删除
const bacthDelete = () => {
	if (state.selectlist.length == 0) return false;
	ElMessageBox.confirm(`确定批量删除【${state.selectlist[0].name}】等${state.selectlist.length}个配置?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			const ids = state.selectlist.map((item) => {
				return item.id;
			});
			// var res = await getAPI(SysConfigApi).apiSysConfigBatchDeletePost(ids);
			tableRef.value.pageReset();
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};
</script>

<style scoped></style>
