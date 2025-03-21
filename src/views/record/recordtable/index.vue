<template>
	<div class="record-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<Search :search="tb.tableData.search" :modelValue="tb.tableData.param" @search="onSearch" />
		</el-card>
		<el-card class="full-table" shadow="never" style="margin-top: 16px">
			<Table ref="tableRef" v-bind="tb.tableData" :getData="getData" border>
				<template #sexText="scope">
					<el-tag :type="di('code_sex', scope.row.sex)?.tagType"> {{ di('code_sex', scope.row.sex)?.value }} </el-tag>
				</template>
				<template #action="scope">
					<el-space :spacer="spacer">
						<!-- <el-button size="small" text="" type="primary"
                                   @click="openDetail(scope.row)" > 查看病例
                        </el-button>  -->
						<el-button size="small" text="" type="primary" @click="printViewer(scope.row)"> 预览 </el-button>
						<el-button size="small" text="" type="primary" @click="printRecord(scope.row)"> 打印 </el-button>
					</el-space>
				</template>
			</Table>
		</el-card>
		<PrintView ref="printViewRef" :title="'预览'" />
	</div>
</template>

<script lang="ts" setup name="record">
import { defineAsyncComponent, nextTick, onMounted, reactive, ref, h } from 'vue';
import { ElDivider } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { CEMRecordApi } from '/@/api-services/api';
import { PrintAndPreviewApi,SysDictDataApi } from '/@/api-services';
import { getDictDataItem as di } from '/@/utils/dict-utils';
import { formatDate } from '/@/utils/formatTime';
import { useUserInfo } from '/@/stores/userInfo';

const stores = useUserInfo();
const dictList = stores.dictList;
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const Search = defineAsyncComponent(() => import('/@/components/table/search.vue'));
const PrintView = defineAsyncComponent(() => import('/@/components/print/index.vue'));
const printViewRef = ref();
const getRegistersStatusEnumData = ref<any>([]);
const loading = ref(false);
const tableData = ref<any>([]);
const tableRef = ref();
const spacer = h(ElDivider, { direction: 'vertical' });

const queryParams = ref<any>({});
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0,
});

const tb = reactive<TableDemoState>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'orderNo',
				minWidth: '150',
				label: '病例编号',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'customerName',
				minWidth: '120',
				label: '会员名称',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'customerPhone',
				minWidth: '160',
				label: '手机号',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'petName',
				minWidth: '80',
				label: '宠物名称',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'regTypeText',
				minWidth: '120',
				label: '病例类型',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'statusText',
				minWidth: '100',
				label: '诊疗状态',
				headerAlign: 'center',
				align: 'center',
				Align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'visitDoctorName',
				minWidth: '100',
				label: '责任医生',
				headerAlign: 'center',
				align: 'center',
				Align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'createTime',
				minWidth: '180',
				label: '创建时间',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			// {
			//   prop: 'createTime',
			//   minWidth: '120',
			//   label: '累计消费',
			//   headerAlign: 'center',
			//   toolTip: true,
			//   sortable: 'custom',
			//   isCheck: true,
			//   type: 'price',
			//   'show-overflow-tooltip': true,
			// },

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
			isBorder: true, // 是否显示表格边框
			isSerialNo: true, // 是否显示表格序号
			isSelection: false, // 是否勾选表格多选
			showSelection: false, //是否显示表格多选
			pageSize: 20, // 每页条数
			hideExport: false, //是否隐藏导出按钮
			exportFileName: '用户信息', //导出报表的文件名，不填写取应用名称
			hideLoad: false,
			hidePrint: true,
			hideTool: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [
			{ label: '', prop: 'params', placeholder: '请输入手机号/用户名/宠物名称', required: false, type: 'input' },
			{
				label: '诊疗状态',
				prop: 'status',
				placeholder: '请选择诊疗状态',
				required: false,
				type: 'select',
				options: getRegistersStatusEnumData,
				optionkey: 'value',
				optionname: 'name',
			},
			{ label: '创建时间', prop: 'time', placeholder: '请选择日期', required: false, type: 'daterange' },
		],
		param: { params: '', time: [formatDate(new Date(), 'YYYY-mm-dd') + ' 00:00:00', formatDate(new Date(), 'YYYY-mm-dd') + ' 23:59:59'] },
		defaultSort: {
			prop: 'createTime',
			order: 'ascending',
		},
	},
});

const getData = async (par: any) => {
	if (par.time) {
		par.startTime = par.time[0];
		par.endTime = par.time[1];
	}
	var res = await getAPI(CEMRecordApi).apiCEMRecordGetCemRecordsPagePost(par);
	return res.data;
};

// 搜索点击时表单回调
const onSearch = (data: EmptyObjectType) => {
	tb.tableData.param = Object.assign({}, tb.tableData.param, { ...data });
	nextTick(() => {
		tableRef.value.pageReset();
	});
};

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(CEMRecordApi).apiCEMRecordGetCemRecordsPagePost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	loading.value = false;
	getRegistersStatusEnumData.value = dictList['RegistersStatusEnum'];
};

//打印
const printRecord = async (row:any) => {
	var r = await getAPI(PrintAndPreviewApi).apiPrintAndPreviewRecordIdGetRecordPreviewPrintPost(row.id, {
		hasZhuSu: true,
		hasPhysical: true,
		hasPrescriptions: true,
		hasTests: false,
		hasDiagnoses: true,
		hasAdvice: true,
		hasFollow: true,
	});
	var data = r.data?.result;
	var json = JSON.parse(data?.template ?? '{}');
	printViewRef.value.print2(json, data?.binData, json?.panels[0].width);
};

//预览
const printViewer = async (row:any) => {
	var r = await getAPI(PrintAndPreviewApi).apiPrintAndPreviewRecordIdGetRecordPreviewPrintPost(row.id, {
		hasZhuSu: true,
		hasPhysical: true,
		hasPrescriptions: true,
		hasTests: false,
		hasDiagnoses: true,
		hasAdvice: true,
		hasFollow: true,
	});
	var data = r.data?.result;
	var json = JSON.parse(data?.template ?? '{}');
	printViewRef.value.showDialog(json, data?.binData, true,json?.panels[0].width);
};

onMounted(async () => {
	await handleQuery();
});
</script>
