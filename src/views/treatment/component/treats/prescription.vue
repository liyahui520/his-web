<template>
	<div class="prescription">
		<el-card class="full-table" shadow="never" style="margin-top: 0px; border: 0px" :body-style="{ padding: '0px' }">
			<div slot="header" class="clearfix" style="background-color: var(--el-color-primary-light-8); height: 30px; border-radius: 3px 3px 0 0" v-show="$props.isNew">
				<p style="line-height: 30px; font-size: 14px; font-weight: 500; margin-left: 10px; float: left">处方信息</p>
			</div>
			<div style="padding: 10px">
				<Table
					ref="tableRef"
					v-bind="tb.tableData"
					:getData="getData"
					highlight-current-row
					@sortHeader="onSortHeader"
					row-key="id"
					:span-method="arraySpanMethod"
					:tree-props="{ children: 'cemRecordPrescriptionItems' }"
				>
					<template v-slot:command>
						<el-button type="primary" :icon="DocumentAdd" v-if="!props.disabled" plain @click="onInspection">处方 </el-button>
						<!--          <el-button type="primary" :icon="DocumentAdd" v-if="!props.disabled" plain @click="onInspection">驱虫疫苗-->
						<!--          </el-button>-->
					</template>
					<template #salePrice="scope">
						{{ verifyNumberComma(scope.row?.salePrice?.toFixed(2).toString() || '0.00') }}
					</template>
					<template #amountPrice="scope">
						{{ verifyNumberComma(scope.row?.amountPrice?.toFixed(2).toString() || '0.00') }}
					</template>
					<template #itemName="scope">
						<el-breadcrumb separator="|" v-if="!scope.row.doctorId">
							<el-breadcrumb-item style="height:24px"><el-tag v-if="scope.row.isHospital" type="danger">院</el-tag>开单时间：{{ scope.row.createTime }}</el-breadcrumb-item>
							<el-breadcrumb-item style="height:24px">总项：{{ scope.row.count }}</el-breadcrumb-item>
							<el-breadcrumb-item style="height:24px"> 总金额：{{ verifyNumberComma(scope.row?.amountPrice?.toFixed(2).toString() || '0.00') }} </el-breadcrumb-item>
							<el-breadcrumb-item style="height:24px"></el-breadcrumb-item>
						</el-breadcrumb>
						<span v-else>
							<el-tooltip class="box-item" effect="dark" :content="scope.row.itemName" placement="top">
								<span><el-tag type="success" v-if="scope.row.isMeal">[套]</el-tag> <el-tag type="warning" v-else-if="scope.row.isPack">[包]</el-tag>{{ scope.row.itemName }}</span>
							</el-tooltip>
						</span>
					</template>
					<template #action="scope">
						<el-button icon="ele-Edit" size="small" v-if="!scope.row.child" text="" type="primary" v-show="!$props.disabled" @click="edit(scope)"> 编辑 </el-button>
						<el-button :icon="View" size="small" v-if="!scope.row.child" text="" type="primary" @click="viewer(scope.row)"> 预览 </el-button>
						<el-button :icon="Printer" size="small" v-if="!scope.row.child" text="" type="primary"> 打印 </el-button>
						<el-popconfirm
							width="220"
							confirm-button-text="删除"
							cancel-button-text="取消"
							confirm-button-type="danger"
							:icon="QuestionFilled"
							@confirm="deletePrescription(scope.row)"
							icon-color="#626AEF"
							:title="'确定删除当前项?'"
							v-if="!scope.row.child"
						>
							<template #reference>
								<el-button icon="ele-Delete" size="small" v-if="!scope.row.child" text="" type="danger" v-show="!$props.disabled"> 删除 </el-button>
							</template>
						</el-popconfirm>
						<el-popconfirm
							width="220"
							confirm-button-text="删除"
							cancel-button-text="取消"
							confirm-button-type="danger"
							:icon="QuestionFilled"
							@confirm="deletePrescriptionItem(scope.row)"
							icon-color="#626AEF"
							:title="'确定删除【' + scope.row.itemName + '】项?'"
							v-if="scope.row.child"
						>
							<template #reference>
								<el-button icon="ele-Delete" size="small" v-if="scope.row.child" text="" type="danger" v-show="!$props.disabled"> 删除 </el-button>
							</template>
						</el-popconfirm>
					</template>
					<template #empty> </template>
				</Table>

				<el-form label-width="120px" style="margin-top: 10px" label-suffix="：" :class="{ 'overlay-disabled': $props.disabled }">
					<el-form-item label="治疗计划">
						<el-input v-model="props.treatData.cemRecordPrescriptionRemark" type="textarea" :autosize="{ minRows: 2, maxRows: 8 }" @focus="focus" @blur="signalSave" />
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<prescriptionDrug ref="prescriptionDrugRef" :title="'处方项目开具'" :data="data" :treatData="treatData" @reloadTable="reloadTable" />
		<PrintView ref="printViewRef" />
	</div>
</template>

<script lang="ts" setup name="prescription">
import { defineAsyncComponent, onMounted, ref, nextTick, reactive } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { ElMessage } from 'element-plus';
import { CEMRecordApi, PrintAndPreviewApi } from '/@/api-services';
import { View, Printer, DocumentAdd, QuestionFilled } from '@element-plus/icons-vue';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import { signalR } from '/@/views/cem/signalRCem';
const PrintView = defineAsyncComponent(() => import('/@/components/print/index.vue'));
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const prescriptionDrug = defineAsyncComponent(() => import('/@/components/treatment/prescriptionDrug.vue'));
const tableRef = ref();
const printViewRef = ref();
const prescriptionDrugRef = ref();

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

const signalSave = async (val: any) => {
	await signalR
		.send('SavePrescriptionRemark', props.treatData.cemRecordPrescriptionRemark)
		.then(() => {
			emit('saveStatus', true);
		})
		.catch(function (err: any) {
			console.log(err);
		});
};

const tb = reactive<TableDemoState>({
	isDisabled: false,
	isHidden: false,
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
			hideExport: false, //是否隐藏导出按钮
			exportFileName: '处方', //导出报表的文件名，不填写取应用名称
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
//删除总项
const deletePrescription = async (row: any) => {
	await getAPI(CEMRecordApi)
		.apiCEMRecordRegIdRecordIdIdDeletePrescriptionDelete(row.regId, row.recordId, row.id)
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
const deletePrescriptionItem = async (row: any) => {
	await getAPI(CEMRecordApi)
		.apiCEMRecordRegIdRecordIdIdDeletePrescriptionItemDelete(row.regId, row.recordId, row.id)
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
	var r = await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdGetPrescriptionsGet(param.regId, param.id);
	return r.data;
};

//开具检验
const onInspection = async () => {
	// productDragRef.value?.openDialog({
	// 	cemRecordPrescriptionItems: [],
	// 	recordId: props.treatData?.id,
	// 	regId: props.treatData?.regId,
	// 	// 金额
	// 	amountPrice: 0,
	// 	// 数量
	// 	count: 0,
	// });
	prescriptionDrugRef.value?.openDialog({
		cemRecordPrescriptionItems: [],
		recordId: props.treatData?.id,
		regId: props.treatData?.regId,
		// 金额
		amountPrice: 0,
		// 数量
		count: 0,
	});
};

//预览报告
const viewer = async (row: any) => {
	var r = await getAPI(PrintAndPreviewApi).apiPrintAndPreviewGetPrescriptionPreviewPrintPost({
		prescriptionId: row.id,
		recordId: row.recordId,
		regId: row.regId,
	});
	var data = r.data?.result;
	var json = JSON.parse(data?.template as any);
	printViewRef.value.showDialog(json, data?.binData, true, json?.panels[0].width);
};

//编辑
const edit = async (row: any) => {
	// productDragRef.value?.openDialog(row.row);
	prescriptionDrugRef.value?.openDialog(row.row);
};

// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};
// 搜索点击时表单回调
const onSearch = (data: any) => {
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
.prescription {
	:deep(.el-table__expand-icon) {
		float: left !important;
	}

	.el-breadcrumb {
		float: left !important;
		font-weight: bold;
	}

	:deep(.el-table__placeholder) {
		float: left !important;
	}
	.overlay-disabled {
		pointer-events: none;
	}
}
</style>
