<template>
	<div class="laboratorys-noreport">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
			<el-form ref="queryForm" :inline="true" label-width="70px">
				<el-form-item label="开具日期">
					<el-date-picker :shortcuts="shortcuts" v-model="dateValue" type="daterange" value-format="YYYY-MM-DD" :clearable="false" range-separator="至" />
				</el-form-item>

				<el-form-item label="类型">
					<el-radio-group v-model="checkType">
						<el-radio border :value="-1">全部</el-radio>
						<el-radio border :value="ProductTypeEnums.NUMBER_90001">超声检查</el-radio>
						<el-radio border :value="ProductTypeEnums.NUMBER_100001">摄影检查</el-radio>
						<el-radio border :value="ProductTypeEnums.NUMBER_130001">显微镜</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="full-table" shadow="hover" style="margin-top: 8px">
			<Table ref="tableRef" v-bind="tb.tableData" :getData="getData" border @sortHeader="onSortHeader">
				<template #payStatus="scope">
					<el-tag :type="payStatusObject[scope.row.payStatus].type">{{ payStatusObject[scope.row.payStatus].name }}</el-tag>
				</template>
				<template #action="scope">
					<el-button icon="ele-Edit" size="small" text="" type="success" @click="openEditReportResult(scope.row)"> 填写结果 </el-button>
				</template>
			</Table>
			<editXray ref="editXrayRef" :title="'编辑摄影检查影像报告'" @reloadTable="handleQuery" />
			<editBscan ref="editBscanRef" :title="'编辑超声检查影像报告'" @reloadTable="handleQuery" />
			<editMicro ref="editMicroRef" :title="'编辑显微镜影像报告'" @reloadTable="handleQuery" />
			<PrintView ref="printViewRef" />
		</el-card>
	</div>
</template>

<script lang="ts" setup name="laboratoriesReportImage">
import { ref, onMounted, reactive, defineAsyncComponent, nextTick } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { LaboratoryApi, PrintAndPreviewApi } from '/@/api-services/api';
import { addDaysToDate } from '/@/utils/formatTime';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';
import editXray from './component/editXray.vue';
import editBscan from './component/editBscan.vue';
import editMicro from './component/editMicro.vue';
import other from '/@/utils/other';
import { RefType } from '/@/types/global';

const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const PrintView = defineAsyncComponent(() => import('/@/components/print/index.vue'));
const tableRef = ref<RefType>();
const payStatusObject = ref<any>({
	0: { name: '未支付', type: 'info' },
	1: { name: '已支付', type: 'success' },
	2: { name: '已删除', type: 'danger' },
});

const printViewRef = ref();
const editXrayRef = ref();
const editBscanRef = ref();
const editMicroRef = ref();
const checkType = ref<any>(-1);
const getData = async (par: any) => {
	const params = { startDate: dateValue.value[0], endDate: dateValue.value[1], type: checkType.value };
	let res = await getAPI(LaboratoryApi).apiLaboratoryGetReportImagePagePost(Object.assign(params, par));
	return res.data;
};

const tb = reactive<TableDemoState>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'customerName',
				width: '150',
				label: '客户名称',
				headerAlign: 'left',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'petName',
				width: '150',
				label: '宠物名称',
				headerAlign: 'left',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'petKindText',
				width: '100',
				label: '宠物种类',
				headerAlign: 'left',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'typeText',
				width: '100',
				label: '类型',
				headerAlign: 'left',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'itemName',
				label: '报告单',
				headerAlign: 'left',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'billingTime',
				width: '220',
				label: '开具日期',
				headerAlign: 'left',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'doctorName',
				label: '医生',
				width: '120',
				headerAlign: 'left',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'payStatus',
				label: '状态',
				width: '100',
				headerAlign: 'left',
				toolTip: true,
				isCheck: true,
				sortable: 'custom',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'inspectTime',
				width: '220',
				label: '报告日期',
				headerAlign: 'left',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'action',
				width: 100,
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
			showSelection: false, //是否显示表格多选
			pageSize: 20, // 每页条数
			hidePrint: true,
			isDisabled: true, // 是否禁用表格
			hideExport: true, //是否隐藏导出按钮
			exportFileName: '未出报告', //导出报表的文件名，不填写取应用名称
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [
			// { label: '创建时间', prop: 'time', placeholder: '请选择', required: false, type: 'date' },
		],
		param: {},
		defaultSort: {
			prop: 'billingTime',
			order: 'descending',
		},
	},
});
// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};
/**
 * 日期快捷选项
 */
const shortcuts = [
	{
		text: '近一周',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			return [start, end];
		},
	},
	{
		text: '近两周',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
			return [start, end];
		},
	},
	{
		text: '近一个月',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			return [start, end];
		},
	},
];

const dateValue = ref<any>([addDaysToDate(new Date(), -6), addDaysToDate(new Date(), 1)]);
/**
 * 打开编辑
 * @param row
 */
const openEditReportResult = (row: any) => {
	let rowInfo = other.deepClone(row);
	if (rowInfo.type == ProductTypeEnums.NUMBER_90001) {
		editBscanRef.value.openDialog(rowInfo);
	} else if (rowInfo.type == ProductTypeEnums.NUMBER_100001) {
		editXrayRef.value.openDialog(rowInfo);
	} else if (rowInfo.type == ProductTypeEnums.NUMBER_130001) {
		editMicroRef.value.openDialog(rowInfo);
	}
};

const handleQuery = async () => {
	await nextTick(() => {
		tableRef?.value?.pageReset();
	});
};
onMounted(async () => {
	await handleQuery();
});
</script>

<style></style>
