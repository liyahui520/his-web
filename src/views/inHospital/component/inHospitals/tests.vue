<template>
	<div class="inHospital-Tests">
		<el-dialog v-model="isShowDialog" title="住院化验" width="80%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>住院化验</span>
				</div>
			</template>

			<el-card shadow="never" style="height: 650px"  :body-style="{padding:0}">
				<Table
					ref="tableRef"
					v-bind="tb.tableData"
					:getData="getData"
					highlight-current-row
					@sortHeader="onSortHeader"
					row-key="id"
					:span-method="arraySpanMethod"
					:tree-props="{ children: 'cemRecordTestItem' }"
					style="height: 650px"
				>
					<template v-slot:command>
						<el-button type="primary" :icon="DocumentAdd" plain @click="onInspection">开具检查 </el-button>
					</template>
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
							<el-breadcrumb-item>开单时间：{{ scope.row.createTime }}</el-breadcrumb-item>
							<el-breadcrumb-item>总项：{{ scope.row.count }}</el-breadcrumb-item>
							<el-breadcrumb-item> 总金额：{{ verifyNumberComma(scope.row?.amountPrice?.toFixed(2).toString() || '0.00') }} </el-breadcrumb-item>
							<el-breadcrumb-item></el-breadcrumb-item>
						</el-breadcrumb>
						<span v-else>
							{{ scope.row.itemName }}
						</span>
					</template>
					<template #action="scope">
						<el-button :icon="View" size="small" v-if="!scope.row.doctorId" text="" type="primary" @click="viewer(scope.row)"> 预览 </el-button>
						<el-button :icon="Printer" size="small" v-if="!scope.row.doctorId" text="" type="primary"> 打印 </el-button>
					</template>
				</Table>
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submit" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
		<ProductDrag ref="productDragRef" :title="'住院化验'" :data="data" :treatData="treatData" @reloadTable="reloadTable" />
		<PrintView ref="printViewRef" />
	</div>
</template>

<script lang="ts" setup name="inHospitalHospitalTests">
import { ref, onMounted, defineAsyncComponent, reactive, nextTick } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { CEMRecordApi, PrintAndPreviewApi, RegistersApi } from '/@/api-services';
import { Printer, DocumentAdd, View } from '@element-plus/icons-vue';
import { verifyNumberComma } from '/@/utils/toolsValidate';

const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const ProductDrag = defineAsyncComponent(() => import('/@/components/treatment/productDrag.vue'));
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
			hideExport: true, //是否隐藏导出按钮
			exportFileName: '化验', //导出报表的文件名，不填写取应用名称
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
/**
 * 添加处方
 */
const onInspection = () => {
	productDragRef.value?.openDialog();
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
const viewer = async (row: any) => {
	var res = await getAPI(PrintAndPreviewApi).apiPrintAndPreviewGetTestReportPreviewPrintPost({
		testItemId: row.id,
		recordId: row.recordId,
		regId: row.regId,
	});
	var data = res.data?.result;
	var json = JSON.parse(data?.template ?? '');
	var templte = {
		panels: [
			{
				index: 0,
				name: 1,
				height: 296.6,
				width: 210,
				paperHeader: 163.5,
				paperFooter: 679.5,
				printElements: [
					{
						options: {
							left: 226.5,
							top: 12,
							height: 17,
							width: 120,
							field: 'title',
							testData: '检验报告单',
							fontSize: 12,
							fontWeight: 'bold',
							textAlign: 'center',
							hideTitle: true,
							textContentVerticalAlign: 'middle',
							title: '单据表头',
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '单据表头', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 39,
							height: 9.75,
							width: 200,
							testData: '长文本分页/不分页测试',
							title: '宠主信息栏',
							right: 215,
							bottom: 48.75,
							vCenter: 115,
							hCenter: 43.875,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							fontSize: 10.5,
							fontWeight: 'bold',
							color: '#27a6f5',
							qrCodeLevel: 0,
						},
						printElementType: { title: '文本', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 52.5,
							height: 9,
							width: 567,
							right: 582,
							bottom: 60.75,
							vCenter: 298.5,
							hCenter: 56.25,
							coordinateSync: false,
							widthHeightSync: false,
							borderWidth: '3',
							borderStyle: 'solid',
							borderColor: '#27a6f5',
						},
						printElementType: { title: '横线', type: 'hline' },
					},
					{
						options: {
							left: 15,
							top: 60,
							height: 16,
							width: 120,
							field: 'customerName',
							testData: '张三',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '宠主姓名',
							right: 135,
							bottom: 73,
							vCenter: 75,
							hCenter: 65,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
							axis: 'h',
						},
						printElementType: { title: '宠主姓名', type: 'text' },
					},
					{
						options: {
							left: 382.5,
							top: 60,
							height: 16,
							width: 120,
							field: 'cellPhone',
							testData: '18888888888',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '宠主电话',
							right: 502.5,
							bottom: 74.5,
							vCenter: 442.5,
							hCenter: 66.5,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '宠主电话', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 84,
							height: 9.75,
							width: 200,
							testData: '长文本分页/不分页测试',
							title: '宠物信息栏',
							right: 217.25,
							bottom: 93.75,
							vCenter: 117.25,
							hCenter: 88.875,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							fontSize: 10.5,
							fontWeight: 'bold',
							color: '#27a6f5',
							qrCodeLevel: 0,
						},
						printElementType: { title: '文本', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 97.5,
							height: 9,
							width: 567,
							right: 580.5,
							bottom: 106.5,
							vCenter: 297,
							hCenter: 102,
							coordinateSync: false,
							widthHeightSync: false,
							borderWidth: '3',
							borderStyle: 'solid',
							borderColor: '#27a6f5',
						},
						printElementType: { title: '横线', type: 'hline' },
					},
					{
						options: {
							left: 459,
							top: 108,
							height: 16,
							width: 120,
							field: 'petColor',
							testData: '红色',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '宠物颜色',
							right: 132.75,
							bottom: 178.75,
							vCenter: 72.75,
							hCenter: 170.75,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '宠物颜色', type: 'text' },
					},
					{
						options: {
							left: 156,
							top: 109.5,
							height: 16,
							width: 120,
							field: 'petZL',
							testData: '猫',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '宠物种类',
							right: 285.75,
							bottom: 125.5,
							vCenter: 225.75,
							hCenter: 117.5,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '宠物种类', type: 'text' },
					},
					{
						options: {
							left: 307.5,
							top: 109.5,
							height: 16,
							width: 120,
							field: 'sex',
							testData: '男',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '宠主性别',
							right: 444.75,
							bottom: 125.5,
							vCenter: 384.75,
							hCenter: 117.5,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '宠主性别', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 109.5,
							height: 16,
							width: 120,
							field: 'petOrder',
							testData: 'B00000001',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '病历号',
							right: 136.5,
							bottom: 126.25,
							vCenter: 76.5,
							hCenter: 118.25,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '病历号', type: 'text' },
					},
					{
						options: {
							left: 156,
							top: 136.5,
							height: 16,
							width: 120,
							field: 'petPZ',
							testData: '短尾猫',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '宠物种类',
							right: 285,
							bottom: 152.5,
							vCenter: 225,
							hCenter: 144.5,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '宠物种类', type: 'text' },
					},
					{
						options: {
							left: 307.5,
							top: 136.5,
							height: 16,
							width: 120,
							field: 'petWeight',
							testData: '2.6Kg',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '宠物体重',
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '宠物体重', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 136.5,
							height: 16,
							width: 120,
							field: 'petName',
							testData: '木子',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '宠物名称',
							right: 134.25,
							bottom: 151.75,
							vCenter: 74.25,
							hCenter: 143.75,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '宠物名称', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 171,
							height: 36,
							width: 565.5,
							field: 'testItems',
							fields: [
								{ text: '项目名称', field: 'name' },
								{
									text: '单位',
									field: 'unitName',
								},
								{ text: '检测结果', field: 'resultValue' },
								{ text: '参考范围', field: 'singPrice' },
							],
							coordinateSync: false,
							widthHeightSync: false,
							tableBorder: 'noBorder',
							tableHeaderBorder: 'noBorder',
							tableHeaderCellBorder: 'noBorder',
							tableHeaderBackground: '#c3dffa',
							tableBodyRowBorder: 'noBorder',
							tableBodyCellBorder: 'noBorder',
							tableFooterBorder: 'noBorder',
							tableFooterCellBorder: 'noBorder',
							right: 583.5,
							bottom: 207,
							vCenter: 300.75,
							hCenter: 189,
							columns: [
								[
									{
										width: 219.00684,
										title: '项目名称',
										field: 'name',
										checked: true,
										columnId: 'name',
										fixed: false,
										rowspan: 1,
										colspan: 1,
										align: 'left',
										stylerHeader: "function(o){\nreturn {'background-color':'#c3dffa','print-color-adjust':'exact'};\n}",
										tableQRCodeLevel: 0,
										tableSummaryTitle: true,
										tableSummary: '',
									},
									{
										width: 91.51255159090906,
										title: '单位',
										field: 'unit',
										checked: true,
										columnId: 'unit',
										fixed: false,
										rowspan: 1,
										colspan: 1,
										align: 'left',
										stylerHeader: "function(o){\nreturn {'background-color':'#c3dffa','print-color-adjust':'exact'};\n}",
										tableQRCodeLevel: 0,
										tableSummaryTitle: true,
										tableSummary: '',
									},
									{
										width: 88.43109068181815,
										title: '检测结果',
										field: 'resultValue',
										checked: true,
										columnId: 'resultValue',
										fixed: false,
										rowspan: 1,
										colspan: 1,
										align: 'left',
										stylerHeader: "function(o){\nreturn {'background-color':'#c3dffa','print-color-adjust':'exact'};\n}",
										tableQRCodeLevel: 0,
										tableSummaryTitle: true,
										tableSummary: '',
									},
									{
										width: 166.5495177272728,
										title: '参考范围',
										field: 'singPrice',
										checked: true,
										columnId: 'singPrice',
										fixed: false,
										rowspan: 1,
										colspan: 1,
										align: 'left',
										renderFormatter:
											"function (value, row, index, options) {\n\t\t\t\t\t\t\t\t\t\tvar resultHtml = '<div ><div style=\"height:20px;border: solid 1px #ccc;display: flex;flex-wrap: wrap;position: relative;box-sizing: border-box;\"><div style=\"max-width: 33.33%;flex: 0 0 33.33%;\">';\n\t\t\t\t\t\t\t\t\t\tif (row.resultValue < row.minValue) {\n\t\t\t\t\t\t\t\t\t\t\tvar shiftingProportion = (row.minValue - row.resultValue) / (row.maxValue - row.minValue);\n\t\t\t\t\t\t\t\t\t\t\tvar result = shiftingProportion > 1 ? 0 : (1 - shiftingProportion) >= 0.95 ? 95 : (1 - shiftingProportion) * 100;\n\t\t\t\t\t\t\t\t\t\t\tresultHtml = resultHtml + '<div style=\"width: 10%;background-color: #909399;height: 100%;margin-left: ' + result + '%;\" ></div>';\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\tresultHtml = resultHtml + '</div><div style=\"max-width: 33.33%;flex: 0 0 33.33%;border-left: solid 2px #ccc;border-right: solid 2px #ccc;\" >';\n\t\t\t\t\t\t\t\t\t\tif (row.resultValue >= row.minValue && row.resultValue <= row.maxValue) {\n\t\t\t\t\t\t\t\t\t\t\tvar shiftingProportion = row.resultValue / (row.maxValue - row.minValue) * 100\n\t\t\t\t\t\t\t\t\t\t\tresultHtml = resultHtml + '<div style=\"width: 10%;background-color: #67C23A;height: 100%;margin-left: ' + shiftingProportion + '%;\" ></div>';\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\tresultHtml = resultHtml + '</div><div style=\"max-width: 33.33%;flex: 0 0 33.33%;\">';\n\t\t\t\t\t\t\t\t\t\tif (row.resultValue > row.maxValue) {\n\t\t\t\t\t\t\t\t\t\t\tconst shiftingProportion = (row.resultValue - row.maxValue) / (row.maxValue - row.minValue);\n\t\t\t\t\t\t\t\t\t\t\tvar result = shiftingProportion > 1 ? 95 : shiftingProportion * 100;\n\t\t\t\t\t\t\t\t\t\t\tresultHtml = resultHtml + '<div style=\"width: 10%;background-color: #F56C6C;height: 100%;margin-left: ' + result + '%;\" >';\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\tresultHtml = resultHtml + '</div></div></div></div>';\n\t\t\t\t\t\t\t\t\t\treturn resultHtml;\n\t\t\t\t\t\t\t\t\t}",
										styler2: "function(o){\nreturn {'print-color-adjust':'exact'};\n}",
										stylerHeader: "function(o){\nreturn {'background-color':'#c3dffa','print-color-adjust':'exact'};\n}",
										tableQRCodeLevel: 0,
										tableSummaryTitle: true,
										tableSummary: '',
									},
								],
							],
						},
						printElementType: {
							title: '化验结果',
							type: 'table',
							editable: true,
							columnDisplayEditable: true,
							columnDisplayIndexEditable: true,
							columnTitleEditable: true,
							columnResizable: true,
							columnAlignEditable: true,
							isEnableEditField: true,
							isEnableContextMenu: true,
							isEnableInsertRow: true,
							isEnableDeleteRow: true,
							isEnableInsertColumn: true,
							isEnableDeleteColumn: true,
							isEnableMergeCell: true,
						},
					},
					{
						options: {
							left: 15,
							top: 685.5,
							height: 9.75,
							width: 200,
							testData: '长文本分页/不分页测试',
							title: '医生信息栏',
							right: 212,
							bottom: 694.5,
							vCenter: 112,
							hCenter: 689.625,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							fontSize: 10.5,
							fontWeight: 'bold',
							color: '#27a6f5',
							qrCodeLevel: 0,
						},
						printElementType: { title: '文本', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 696,
							height: 9,
							width: 567,
							right: 580.5,
							bottom: 705.75,
							vCenter: 297,
							hCenter: 701.25,
							coordinateSync: false,
							widthHeightSync: false,
							borderWidth: '3',
							borderStyle: 'solid',
							borderColor: '#27a6f5',
						},
						printElementType: { title: '横线', type: 'hline' },
					},
					{
						options: {
							left: 15,
							top: 705,
							height: 16,
							width: 120,
							field: 'doctorName',
							testData: '李医生',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '检验医生',
							right: 136.5,
							bottom: 721.75,
							vCenter: 76.5,
							hCenter: 713.75,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '检验医生', type: 'text' },
					},
					{
						options: {
							left: 484.5,
							top: 705,
							height: 80,
							width: 80,
							field: 'orgImg',
							fit: '',
							coordinateSync: false,
							widthHeightSync: false,
							right: 563.75,
							bottom: 785,
							vCenter: 523.75,
							hCenter: 745,
						},
						printElementType: { title: 'Logo', type: 'image' },
					},
					{
						options: {
							left: 223.5,
							top: 705,
							height: 16,
							width: 120,
							field: 'doctorPhone',
							testData: '17777777777',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '医生电话',
							right: 345,
							bottom: 766,
							vCenter: 285,
							hCenter: 758,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '医生电话', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 730.5,
							height: 16,
							width: 120,
							field: 'orgName',
							testData: '测试医院',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '医院名称',
							right: 135.75,
							bottom: 787,
							vCenter: 75.75,
							hCenter: 779,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '医院名称', type: 'text' },
					},
					{
						options: {
							left: 223.5,
							top: 730.5,
							height: 16,
							width: 120,
							field: 'orgPhone',
							testData: '021-25639281',
							fontSize: 9,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '医院电话',
							right: 538.5,
							bottom: 763.75,
							vCenter: 478.5,
							hCenter: 755.75,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '医院电话', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 754.5,
							height: 16,
							width: 331.5,
							field: 'orgAddress',
							testData: '上海市嘉定区',
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							textContentVerticalAlign: 'middle',
							title: '医院地址',
							right: 137.25,
							bottom: 770.5,
							vCenter: 77.25,
							hCenter: 762.5,
						},
						printElementType: { title: '医院地址', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 775.5,
							height: 16,
							width: 199.5,
							field: 'createTime',
							testData: '2023-07-20',
							fontSize: 8.25,
							fontWeight: '500',
							textContentVerticalAlign: 'middle',
							title: '业务日期',
							right: 134.25,
							bottom: 791.5,
							vCenter: 74.25,
							hCenter: 783.5,
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							qrCodeLevel: 0,
						},
						printElementType: { title: '业务日期', type: 'text' },
					},
					{
						options: {
							left: 15,
							top: 798,
							height: 14,
							width: 200,
							testData: '长文本分页/不分页测试',
							title: '*本结果只对样本的本次检测负责！',
							coordinateSync: false,
							widthHeightSync: false,
							fontFamily: 'Microsoft YaHei',
							fontSize: 8.25,
							fontWeight: '400',
							textContentVerticalAlign: 'middle',
							qrCodeLevel: 0,
							right: 214.25,
							bottom: 811.25,
							vCenter: 114.25,
							hCenter: 804.25,
						},
						printElementType: { title: '文本', type: 'text' },
					},
				],
				paperNumberLeft: 565,
				paperNumberTop: 819,
				paperNumberContinue: true,
				watermarkOptions: {
					content: '',
					fillStyle: 'rgba(235, 235, 235, 1)',
					fontSize: '14px',
					rotate: 25,
					width: 200,
					height: 200,
					timestamp: true,
					format: 'YYYY-MM-DD HH:mm',
				},
			},
		],
	};
	printViewRef.value.showDialog(templte, data, templte.panels[0].width);
};
// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};
const getData = async (param: any) => {
	param = recordInfo.value;
	var r = await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdGetTestsGet(param.regId, param.recordId);
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
 * 加载化验信息
 * @param row 当前行数据
 */
const loadRegist = async (id: any) => {
	await getAPI(RegistersApi)
		.apiRegistersGetIdGet(id)
		.then((res: any) => {
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
.inHospital-Tests {
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
}
</style>
