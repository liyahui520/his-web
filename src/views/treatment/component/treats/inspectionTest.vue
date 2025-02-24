<template>
	<div class="inspectionTest">
		<!--        <el-card shadow="hover" :body-style="{ paddingBottom: '0' }">-->
		<!--            <TableSearch :search="tb.tableData.search" :param="tb.tableData.param" @search="onSearch"/>-->
		<!--        </el-card>-->
		<el-card class="full-table" shadow="never" style="margin-top: 0px; border: 0px" :body-style="{ padding: '0px' }">
			<div slot="header" class="clearfix" style="background-color: var(--el-color-primary-light-8); height: 30px; border-radius: 3px 3px 0 0" v-show="$props.isNew">
				<p style="line-height: 30px; font-size: 14px; font-weight: 500; margin-left: 10px; float: left">检查化验</p>
			</div>

			<!--            <el-tabs :tab-position="'left'"  type="border-card" class="demo-tabs" style="height: 90%;width: 80%" >-->
			<!--                <el-tab-pane label="检查化验">User</el-tab-pane>-->
			<!--                <el-tab-pane label="试纸检查">Config</el-tab-pane>-->
			<!--                <el-tab-pane label="超声检查">Role</el-tab-pane>-->
			<!--                <el-tab-pane label="摄影检查">Task</el-tab-pane>-->
			<!--                <el-tab-pane label="显微镜">Task</el-tab-pane>-->
			<!--                <el-tab-pane label="化验费用">Task</el-tab-pane>-->
			<!--            </el-tabs>-->
			<div style="padding: 10px">
				<Table
					ref="tableRef"
					v-bind="tb.tableData"
					:getData="getData"
					highlight-current-row
					@sortHeader="onSortHeader"
					row-key="id"
					:span-method="arraySpanMethod"
					:tree-props="{ children: 'cemRecordTestItem' }"
				>
					<template v-slot:command>
						<el-button type="primary" v-if="!props.disabled" :icon="DocumentAdd" plain @click="onInspection">开具检查 </el-button>
					</template>
					<!--          <template #expandTable="props">-->
					<!--            <el-table :data="props.row.cemRecordTestItem" :show-header="false" default-expand-all border>-->
					<!--              <el-table-column type="index" label="序号" align="center" fixed="left" />-->
					<!--              <el-table-column v-for="item in tb.tableData.columns"  v-bind="item">-->
					<!--              </el-table-column>-->
					<!--            </el-table>-->
					<!--          </template>-->
					<template #salePrice="scope">
						{{ verifyNumberComma(scope.row?.salePrice?.toFixed(2).toString() || '0.00') }}
					</template>
					<template #amountPrice="scope">
						{{ verifyNumberComma(scope.row?.amountPrice?.toFixed(2).toString() || '0.00') }}
					</template>
					<template #isReport="scope">
						<el-tag class="ml-2" type="warning" v-if="!scope.row.isReport">未出报告</el-tag>
						<el-tag class="ml-2" type="success" v-else>已出报告</el-tag>
					</template>
					<template #itemName="scope">
						<el-breadcrumb separator="|" v-if="!scope.row.doctorId">
							<el-breadcrumb-item><el-tag v-if="scope.row.isHospital" type="danger">院</el-tag>开单时间：{{ scope.row.createTime }}</el-breadcrumb-item>
							<el-breadcrumb-item>总项：{{ scope.row.count }}</el-breadcrumb-item>
							<el-breadcrumb-item> 总金额：{{ verifyNumberComma(scope.row?.amountPrice?.toFixed(2).toString() || '0.00') }} </el-breadcrumb-item>
							<el-breadcrumb-item></el-breadcrumb-item>
						</el-breadcrumb>
						<span v-else>
							{{ scope.row.itemName }}
						</span>
					</template>
					<template #action="scope">
						<el-button icon="ele-Edit" size="small" v-if="!scope.row.doctorId" text="" type="primary" v-show="!$props.disabled" @click="edit(scope)"> 编辑 </el-button>
						<el-button :icon="View" size="small" v-if="!scope.row.doctorId" text="" type="primary" @click="vieweTest(scope.row)"> 预览 </el-button>
						<el-button :icon="Printer" size="small" v-if="!scope.row.doctorId" text="" type="primary"> 打印 </el-button>
						<el-button icon="ele-Delete" size="small" v-if="!scope.row.doctorId" text="" type="danger" v-show="!$props.disabled" @click="deleteTest(scope.row.id)"> 删除 </el-button>
						<el-button icon="ele-Delete" size="small" v-if="scope.row.doctorId" text="" type="danger" v-show="!$props.disabled" @click="deleteTestItem(scope.row.recordTestId, scope.row.id)">
							删除
						</el-button>
						<el-button :icon="View" size="small" v-if="scope.row.isReport" text="" type="primary" @click="viewer(scope.row)"> 预览报告 </el-button>
					</template>
				</Table>
				<el-form label-width="120px" style="margin-top: 10px" label-suffix="：" :class="{ 'overlay-disabled': $props.disabled }">
					<el-form-item label="结果描述">
						<el-input v-model="props.treatData.cemRecordRemark" :aria-readonly="!$props.isNew" type="textarea" :autosize="{ minRows: 2, maxRows: 8 }" @focus="focus" @blur="signalSave" />
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<ProductDrag ref="productDragRef" :title="productDragTitle" :data="data" :treatData="treatData" @reloadTable="reloadTable" />
		<PrintView ref="printViewRef" />
	</div>
</template>

<script lang="ts" setup name="inspectionTest">
import { defineAsyncComponent, onMounted, ref, nextTick, reactive, inject } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { ElMessage, ElTable } from 'element-plus';
import { InStorageApi, CEMRecordApi, PrintAndPreviewApi } from '/@/api-services';
import { Delete, Edit, Search, View, Printer, DocumentAdd } from '@element-plus/icons-vue';
import { verifyNumberComma, verifyNumberCnUppercase } from '/@/utils/toolsValidate';
import { ProductTypeEnums } from '/@/api-services';

import { signalR } from '/@/views/cem/signalRCem';

const PrintView = defineAsyncComponent(() => import('/@/components/print/index.vue'));
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const ProductDrag = defineAsyncComponent(() => import('/@/components/treatment/productDrag.vue'));
// const TableSearch = defineAsyncComponent(() => import('/@/components/table/search.vue'));

const tableRef = ref();
const printViewRef = ref();
const productDragRef = ref();
const productDragTitle = ref('检验项目开具');

var props = defineProps({
	treatData: {
		type: Object,
		default: () => {},
	},
	data: {
		type: Object,
		default: () => {},
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	isNew: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits(['save', 'saveStatus']);
const focus = async () => {
	emit('saveStatus', false);
};

const signalSave = async (val) => {
	await signalR
		.send('SaveRemark', props.treatData.cemRecordRemark)
		.then(() => {
			emit('saveStatus', true);
		})
		.catch(function (err: any) {
			console.log(err);
		});
};

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
			},
			{
				prop: 'typeText',
				label: '项目类型',
				minWidth: 80,
				headerAlign: 'center',
				isCheck: true,
				hideCheck: true,
			},
			{
				prop: 'createTime',
				label: '开具时间',
				minWidth: 140,
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
				prop: 'inspectTime',
				minWidth: 140,
				label: '检查时间',
				headerAlign: 'center',
				toolTip: true,
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'count',
				minWidth: 60,
				label: '数量',
				headerAlign: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'salePrice',
				minWidth: 90,
				label: '单价',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'amountPrice',
				minWidth: 90,
				label: '合计(元)',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'inspectDoctorName',
				minWidth: 90,
				label: '检查医生',
				align: 'center',
				// sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'isReport',
				minWidth: 80,
				label: '报告',
				align: 'center',
				// sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'assistantName',
				minWidth: 90,
				label: '助理',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'payStatusText',
				minWidth: 90,
				label: '订单状态',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'action',
				minWidth: 280,
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
			hideExport: false, //是否隐藏导出按钮
			exportFileName: '检查化验', //导出报表的文件名，不填写取应用名称
			hidePrint: true,
			hidePagination: true,
			hideExport: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [],
		param: {},
		defaultSort: {
			prop: 'createTime',
			order: 'descending',
		},
	},
});

const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
	if (!row.doctorId) {
		if (columnIndex === 0) {
			return [1, 12];
		} else if (columnIndex != 12) {
			return [0, 0];
		} else {
			return [1, 1];
		}
	}
};
//删除总项
const deleteTest = async (testId) => {
	await getAPI(CEMRecordApi)
		.apiCEMRecordTestIdDeleteTestsDelete(testId)
		.then((_) => {
			ElMessage.success('删除成功');
			nextTick(() => {
				tableRef.value.pageReset();
			});
		})
		.catch((e) => {
			ElMessage.error(e.message);
		});
};

//删除单项
const deleteTestItem = async (testId, testItemId) => {
	await getAPI(CEMRecordApi)
		.apiCEMRecordTestIdTestItemIdDeleteTestsItemDelete(testId, testItemId)
		.then((_) => {
			ElMessage.success('删除成功');
			nextTick(() => {
				tableRef.value.pageReset();
			});
		})
		.catch((e) => {
			ElMessage.error(e.message);
		});
};

const getData = async (param: any) => {
	if (!param.regId) return [];
	var r = await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdGetTestsGet(param.regId, param.id);
	return r.data;
};

//开具检验
const onInspection = async () => {
	productDragRef.value?.openDialog();
};
/**
 * 预览化验项目
 * @param row 
 */
const vieweTest=async (row)=>{
	await getAPI(PrintAndPreviewApi)
			.apiPrintAndPreviewGetTestPreviewPrintPost({
				testId: row.id,
				recordId: row.recordId,
				regId: row.regId,
			})
			.then((res) => {
				var data = res.data?.result;
				var json = JSON.parse(data?.template ?? '{}');
				printViewRef.value.showDialog(json, data?.binData,true, json?.panels[0].width);
			});
}

/**
 * 预览检查报告
 * @param row 
 */
const viewer = async (row) => {
	if (row.type == ProductTypeEnums.NUMBER_90001) {
		await getAPI(PrintAndPreviewApi)
			.apiPrintAndPreviewGetBscanPreviewPrintPost({
				testItemId: row.id,
				recordId: row.recordId,
				regId: row.regId,
			})
			.then((res) => {
				var data = res.data?.result;
				var json = JSON.parse(data?.template ?? '{}');
				printViewRef.value.showDialog(json, data?.binData,true, json?.panels[0].width);
			});
		
	} else if (row.type == ProductTypeEnums.NUMBER_100001) {
		await getAPI(PrintAndPreviewApi)
			.apiPrintAndPreviewGetXrayPreviewPrintPost({
				testItemId: row.id,
				recordId: row.recordId,
				regId: row.regId,
			})
			.then((res) => {
				var data = res.data?.result;
				var json = JSON.parse(data?.template ?? '{}');
				printViewRef.value.showDialog(json, data?.binData,true, json?.panels[0].width);
			});
	} else if (row.type == ProductTypeEnums.NUMBER_130001) {
		await getAPI(PrintAndPreviewApi)
			.apiPrintAndPreviewGetMicroPreviewPrintPost({
				testItemId: row.id,
				recordId: row.recordId,
				regId: row.regId,
			})
			.then((res) => {
				var data = res.data?.result;
				var json = JSON.parse(data?.template ?? '{}');
				printViewRef.value.showDialog(json, data?.binData,true, json?.panels[0].width);
			});
	} else if (row.type == ProductTypeEnums.NUMBER_110001) {
		await getAPI(PrintAndPreviewApi)
			.apiPrintAndPreviewGetTestReportPreviewPrintPost({
				testItemId: row.id,
				recordId: row.recordId,
				regId: row.regId,
			})
			.then((res) => {
				var data = res.data?.result;
				var json = JSON.parse(data?.template ?? '{}');
				printViewRef.value.showDialog(json, data?.binData,true, json?.panels[0].width);
			});
	} else if (row.type == ProductTypeEnums.NUMBER_150001) {
		await getAPI(PrintAndPreviewApi)
			.apiPrintAndPreviewGetPaperReportPreviewPrintPost({
				testItemId: row.id,
				recordId: row.recordId,
				regId: row.regId,
			})
			.then((res) => {
				var data = res.data?.result;
				var json = JSON.parse(data?.template ?? '{}');
				printViewRef.value.showDialog(json, data?.binData,true, json?.panels[0].width);
			});
	}
};

//编辑
const edit = async (row) => {
	console.log('row:::', row);
	productDragRef.value?.openDialog(row.row);
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

const reloadTable = async () => {
	await nextTick(() => {
		tableRef.value.pageReset();
	});
};

defineExpose({ onSearch });
onMounted(async () => {
	// tb.tableData.param=Object.assign({},{...props.treatData});
});
</script>
<style lang="scss" scoped>
.inspectionTest {
	:deep(.el-table__expand-icon) {
		float: left !important;
	}

	.el-breadcrumb {
		float: left !important;
		font-weight: bold !important;
	}

	:deep(.el-table__placeholder) {
		float: left !important;
	}
	.overlay-disabled {
		pointer-events: none;
	}
}
</style>
