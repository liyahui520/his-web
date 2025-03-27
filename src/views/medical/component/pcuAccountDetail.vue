<template>
	<div class="pcuAccountDetail">
		<el-dialog v-model="isShowDialog" width="70%" draggable :close-on-click-modal="false" destroy-on-close>
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			PcuDetails
			<el-descriptions class="margin-top" title="" :column="4" size="default">
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">会员名称</div>
					</template>
					{{ sing?.name || '-' }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">性别</div>
					</template>
					{{ sing?.sexText || '-' }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">会员级别</div>
					</template>
					{{ sing?.levelText || '-' }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">手机号</div>
					</template>
					{{ sing?.cellPhone || '-' }}
				</el-descriptions-item>
			</el-descriptions>
			<el-divider border-style="dashed" />
			<Table ref="tableRef" v-bind="tb.tableData" style="height: 550px" :getData="getData" border @sortHeader="onSortHeader" :row-class-name="tableRowClassName">
				<template v-slot:command>
					<el-row>
						<el-text tag="b"> 账户余额：{{ verifyNumberComma(sing?.amountPrice?.toFixed(2).toString() || '0.00') }} </el-text>
						<el-button type="primary" style="margin-left: 10px" plain size="small" @click="rechargeAccount"> 充值 </el-button>
						<el-button type="danger" plain size="small" @click="refund">退款</el-button>
					</el-row>
				</template>
				<template v-slot:columncommand>
					<el-table-column label="支付方式">
						<el-table-column prop="pcuAccountPayMethods" :label="item.value" :show-overflow-tooltip="true" min-width="50" v-for="(item,index) in getPriceModth" :key="index">
							<template #default="scope">
								{{
									scope.row.tradeType == 1 || scope.row.tradeType == 2
										? verifyNumberComma(
												scope.row.pcuAccountPayMethods
													.filter((s) => s.typeId == item.id)[0]
													?.price?.toFixed(2)
													.toString() || '0.00',
												true
											)
										: verifyNumberComma(
												scope.row.pcuAccountPayMethods
													.filter((s) => s.typeId == item.id)[0]
													?.price?.toFixed(2)
													.toString() || '0.00'
											)
								}}
							</template>
						</el-table-column>
					</el-table-column>
				</template>

				<template #occurPrice="scope">
					{{
						scope.row.tradeType == 1 || scope.row.tradeType == 2
							? verifyNumberComma(scope.row.occurPrice?.toFixed(2).toString() || '0.00', true)
							: verifyNumberComma(scope.row.occurPrice?.toFixed(2).toString() || '0.00')
					}}
				</template>
				<template #principalPrice="scope">
					{{
						scope.row.tradeType == 1 || scope.row.tradeType == 2
							? verifyNumberComma(scope.row.principalPrice?.toFixed(2).toString() || '0.00', true)
							: verifyNumberComma(scope.row.principalPrice?.toFixed(2).toString() || '0.00')
					}}
				</template>
				<template #givePrice="scope">
					{{
						scope.row.tradeType == 1 || scope.row.tradeType == 2
							? verifyNumberComma(scope.row.givePrice?.toFixed(2).toString() || '0.00', true)
							: verifyNumberComma(scope.row.givePrice?.toFixed(2).toString() || '0.00')
					}}
				</template>

				<template #action="scope">
					<el-button icon="ele-Printer" v-if="scope.row.tradeType != 1" size="small" text="" type="primary"> 打印 </el-button>
					<el-button icon="ele-Tickets" v-if="scope.row.tradeType == 1" size="small" text="" type="primary"> 详情 </el-button>
				</template>
			</Table>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel" size="default">关 闭</el-button>
				</span>
			</template>
			<RechargeAccount ref="rechargeAccountRef" :title="rechargeAccountRefTitle" @reloadTable="reload" />
			<RefundAccount ref="refundAccountRef" :title="refundAccountRefTitle" @reloadTable="reload" />
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="pcuAccountDetail">
import { defineAsyncComponent, nextTick, onMounted, reactive, ref } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { PcuAccountApi, PcustomerApi } from '/@/api-services';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import { getDictDataList } from '/@/utils/dict-utils';

const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const RechargeAccount = defineAsyncComponent(() => import('/@/components/pcuAccount/rechargeAccount.vue'));
const RefundAccount = defineAsyncComponent(() => import('/@/components/pcuAccount/refundAccount.vue'));
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const getPriceModth = ref<any>([]);
const isShowDialog = ref(false);
const tableRef = ref();
const sing = ref();
const rechargeAccountRef = ref();
const rechargeAccountRefTitle = ref('账户充值');
const refundAccountRefTitle = ref('账户退款');
const refundAccountRef = ref();
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});

const tb = reactive<TableDemoState>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'orderNo',
				label: '交易号',
				minWidth: '120',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'createTime',
				label: '发生时间',
				headerAlign: 'center',
				minWidth: '130',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'occurPrice',
				label: '发生金额',
				headerAlign: 'center',
				minWidth: '90',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				type: 'price',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'principalPrice',
				label: '本金',
				headerAlign: 'center',
				minWidth: '80',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				type: 'price',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'givePrice',
				label: '赠送金额',
				headerAlign: 'center',
				minWidth: '80',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				type: 'price',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'amountPrice',
				label: '当前余额',
				headerAlign: 'center',
				minWidth: '90',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				type: 'price',
				fixed: 'right',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'tradeTypeText',
				minWidth: '60',
				label: '状态',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'right',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'nickName',
				minWidth: '70',
				label: '操作人',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'right',
				'show-overflow-tooltip': true,
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
				width: 80,
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
			isSelection: false, // 是否勾选表格多选
			showSelection: true, //是否显示表格多选
			pageSize: 10, // 每页条数
			hideExport: false, //是否隐藏导出按钮
			exportFileName: '账户信息', //导出报表的文件名，不填写取应用名称
			hideLoad: false,
			hidePrint: true,
			showPagination: false,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [],
		param: { isDiscount: true, name: '', categoryId: -1, canOrder: true, canSale: true },
		defaultSort: {
			prop: 'createTime',
			order: 'descending',
		},
	},
});

const tableRowClassName = ({ row, rowIndex }: { row: any; rowIndex: number }) => {
	if (row.tradeType === 2) {
		return 'warning-row';
	}
	if (row.tradeType === 1) {
		return 'refund-row';
	}
	return '';
};

// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};
const getData = async (par: any) => {
	let res = await getAPI(PcuAccountApi).apiPcuAccountPagePost(par);
	let r = await getAPI(PcustomerApi).apiPcustomerIdGetDetailGet(par.customerId);
	sing.value = r.data?.result;
	return res.data;
};

const reload = async () => {
	await nextTick(() => {
		tableRef?.value?.pageReset();
	});
};

const Init = async (customerId: Number) => {
	tb.tableData.param.customerId = customerId;
	await nextTick(() => {
		tableRef?.value?.pageReset();
	});
};

// 关闭弹窗
const closeDialog = () => {
	emit('reloadTable');
	isShowDialog.value = false;
};
// 打开弹窗
const openDialog = async (customerId:any) => {
	getPriceModth.value = getDictDataList('funding_method');
	await Init(customerId);
	isShowDialog.value = true;
};
// 取消
const cancel = () => {
	// ruleFormRef.value.resetFields();
	// emit('reloadTable');
	isShowDialog.value = false;
};

//充值
const rechargeAccount = async () => {
	rechargeAccountRef.value?.openDialog(tb.tableData.param.customerId);
};

//退款
const refund = async () => {
	refundAccountRef.value?.openDialog(tb.tableData.param.customerId);
};

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss">
.pcuAccountDetail {
	.table-container {
		height: 500px;
	}

	.warning-row {
		color: red !important;
	}

	.refund-row {
		color: var(--el-color-warning) !important;
	}

	.consume-row {
		color: var(--el-color-primary) !important;
	}
}
</style>
