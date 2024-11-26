<template>
	<div class="inHospital-Prescriptions">
		<el-dialog v-model="isShowDialog" title="住院处方" width="80%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>住院处方</span>
				</div>
			</template>

			<el-card shadow="never" style="height: 650px;" :body-style="{padding:0}">
				<Table
					ref="tableRef"
					v-bind="tb.tableData"
					:getData="getData"
					highlight-current-row
					@sortHeader="onSortHeader"
					row-key="id"
					:span-method="arraySpanMethod"
					:tree-props="{ children: 'cemRecordPrescriptionItems' }"
					style="height: 650px"
				>
					<template v-slot:command>
						<el-button type="primary" :icon="DocumentAdd" plain @click="onInspection"> 添加处方 </el-button>
					</template>
					<template #salePrice="scope">
						{{ verifyNumberComma(scope.row?.salePrice?.toFixed(2).toString() || '0.00') }}
					</template>
					<template #amountPrice="scope">
						{{ verifyNumberComma(scope.row?.amountPrice?.toFixed(2).toString() || '0.00') }}
					</template>
					<template #itemName="scope">
						<el-breadcrumb separator="|" v-if="!scope.row.doctorId">
							<el-breadcrumb-item>开单时间：{{ scope.row.createTime }}</el-breadcrumb-item>
							<el-breadcrumb-item>总项：{{ scope.row.count }}</el-breadcrumb-item>
							<el-breadcrumb-item> 总金额：{{ verifyNumberComma(scope.row?.amountPrice?.toFixed(2).toString() || '0.00') }} </el-breadcrumb-item>
							<el-breadcrumb-item></el-breadcrumb-item>
						</el-breadcrumb>
						<span v-else>
							<el-tooltip class="box-item" effect="dark" :content="scope.row.itemName" placement="top">
								<span>{{ scope.row.itemName }}</span>
							</el-tooltip>
						</span>
					</template>
					<template #action="scope">
						<el-button :icon="View" size="small" v-if="!scope.row.child" text="" type="primary" @click="viewer(scope.row)"> 预览 </el-button>
						<el-button :icon="Printer" size="small" v-if="!scope.row.child" text="" type="primary"> 打印 </el-button>
					</template>
					<template #empty> </template>
				</Table>
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submit" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>

		<ProductDrag ref="productDragRef" :title="'开具处方'" :data="data" :treatData="treatData" @reloadTable="reloadTable" />
		<PrintView ref="printViewRef" />
	</div>
</template>

<script lang="ts" setup name="inHospitalHospitalPrescriptions">
import { ref, onMounted, defineAsyncComponent, reactive, nextTick } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { CEMRecordApi, PrintAndPreviewApi, RegistersApi } from '/@/api-services';
import { Printer, DocumentAdd, View } from '@element-plus/icons-vue';
import { verifyNumberComma } from '/@/utils/toolsValidate';

const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const ProductDrag = defineAsyncComponent(() => import('/@/components/treatment/productDrugDrag.vue'));
const PrintView = defineAsyncComponent(() => import('/@/components/print/index.vue'));
const tableRef = ref();
const productDragRef = ref();
const printViewRef = ref();
const isShowDialog = ref(false);
const data = ref<any>();
const treatData = ref<any>();
const recordInfo = ref<any>({ regId: '0', recordId: '0' });
const tb = reactive<TableDemoState>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'itemName',
				minWidth: 180,
				label: '项目名称',
				headerAlign: 'center',
				isCheck: true,
				hideCheck: true,
				fixed: 'left',
			},
			{
				prop: 'typeText',
				label: '项目类型',
				minWidth: 70,
				headerAlign: 'center',
				isCheck: true,
				hideCheck: true,
				fixed: 'left',
			},
			{
				prop: 'orderName',
				label: '分组',
				minWidth: 60,
				headerAlign: 'center',
				isCheck: true,
				hideCheck: true,
			},
			{
				prop: 'createTime',
				label: '开具时间',
				minWidth: 120,
				headerAlign: 'center',
				isCheck: true,
				hideCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'doctorName',
				label: '处方医生',
				minWidth: 80,
				headerAlign: 'center',
				toolTip: true,
				// sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'useDose',
				minWidth: 65,
				label: '单次用量',
				headerAlign: 'center',
				toolTip: true,
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'unitName',
				minWidth: 40,
				label: '单位',
				headerAlign: 'center',
				toolTip: true,
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'useMethods',
				minWidth: 40,
				label: '次/天',
				headerAlign: 'center',
				toolTip: true,
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'dayNum',
				minWidth: 40,
				label: '天数',
				headerAlign: 'center',
				toolTip: true,
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'count',
				minWidth: 40,
				label: '数量',
				headerAlign: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'salePrice',
				minWidth: 80,
				label: '单价',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'amountPrice',
				minWidth: 80,
				label: '合计(元)',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'payStatusText',
				minWidth: 70,
				label: '订单状态',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'action',
				minWidth: 160,
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
			isStripe: false, // 是否显示表格斑马纹
			isBorder: true, // 是否显示表格边框
			isSerialNo: false, // 是否显示表格序号
			isSelection: false, // 是否勾选表格多选
			showSelection: false, //是否显示表格多选
			pageSize: 99999, // 每页条数
			hideExport: true, //是否隐藏导出按钮
			exportFileName: '处方', //导出报表的文件名，不填写取应用名称
			hidePrint: true,
			hidePagination: true,
			isDisabled: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [],
		param: { regId: '0', recordId: '0' },
		defaultSort: {
			prop: 'createTime',
			order: 'descending',
		},
	},
});
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
	if (row.cemRecordPrescriptionItems && row.cemRecordPrescriptionItems.length > 0) {
		if (columnIndex === 0) {
			return [1, 13];
		} else if (columnIndex != 13) {
			return [0, 0];
		} else {
			return [1, 1];
		}
	}
};
/**
 * 添加处方
 */
const onInspection = () => {
	productDragRef.value?.openDialog({
		cemRecordPrescriptionItems: [],
		recordId: recordInfo.value.recordId,
		regId: recordInfo.value.regId,
		// 金额
		amountPrice: 0,
		// 数量
		count: 0,
	});
};
/**
 * 开具处方回调
 */
const reloadTable = async () => {
	await nextTick(() => {
		tableRef.value.pageReset();
	});
};

//预览报告
const viewer = async (row) => {
	var r = await getAPI(PrintAndPreviewApi).apiPrintAndPreviewGetPrescriptionPreviewPrintPost({
		prescriptionId: row.id,
		recordId: row.recordId,
		regId: row.regId,
	});
	var data = r.data?.result;
	var json = JSON.parse(data?.template ?? '');
	printViewRef.value.showDialog(json, data?.binData, json?.panels[0].width);
};
// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};
const getData = async (param: any) => {
	param = recordInfo.value;
	var r = await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdGetPrescriptionsGet(param.regId, param.recordId);
	return r.data;
};
/**
 * 打开页面
 * @param row 当前行数据
 */
const openDialog = async (row: any) => {
	isShowDialog.value = true;
	recordInfo.value.recordId = row.recordId;
	recordInfo.value.regId = row.regId;
	await loadRegist(recordInfo.value.regId);
	await getData({});
};

/**
 * 加载挂号信息
 * @param row 当前行数据
 */
const loadRegist = async (id: any) => {
	await getAPI(RegistersApi)
		.apiRegistersGetIdGet(id)
		.then((res: any) => {
			console.log('res：：：', res);
			data.value = res.data?.result;
			treatData.value = data.value?.cemRecord;
		});
};

const submit = async () => {
	isShowDialog.value = false;
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.inHospital-Prescriptions {
	:deep(.el-table__expand-icon) {
		float: left !important;
	}

	.el-breadcrumb {
		float: left !important;
		font-weight: bold;
	}
}
</style>
