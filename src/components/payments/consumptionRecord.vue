<template>
	<div class="consumption-record-container">
		<el-dialog v-model="isShowDialog" width="80%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-card shadow="always" :body-style="{ paddingBottom: '0' }">
				<el-form :model="queryParams" ref="queryForm" :inline="true">
					<el-form-item label="付款时间">
						<el-date-picker v-model="dates" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD" start-placeholder="开始日期" end-placeholder="结束日期" />
					</el-form-item>

					<el-form-item>
						<el-button-group><el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button> </el-button-group>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="full-table" shadow="always" style="margin-top: 8px">
				<el-table
					ref="paymentTableRef"
					stripe
					:expand-row-keys="expandedRowIds"
					:data="tableData"
					style="width: 100%"
					height="600"
					v-loading="loading"
					tooltip-effect="light"
					row-key="id"
					size="small"
					@expand-change="loadPaymentDetails"
				>
					<el-table-column type="expand" width="55" fixed="left">
						<template #default="props">
							<el-table :data="props.row.details" style="padding-left: 55px" stripe border v-loading="props.row.loadingChild" size="small">
								<el-table-column label="宠物名称" prop="petName" width="100" fixed="left" />
								<el-table-column label="费用类型" prop="costTypeText" width="100" />
								<el-table-column label="项目名称" prop="productName" width="250" show-overflow-tooltip="" />
								<el-table-column label="数量" prop="count" width="80" />
								<el-table-column label="单价" prop="settlementPrice" width="100" />
								<el-table-column label="付款金额" prop="actualPrice" width="100" />
								<el-table-column label="单位" prop="outUnitName" width="100" />
								<el-table-column label="销售员" prop="saleName" width="100" />
								<el-table-column label="状态" prop="statusText" width="90">
									<template #default="scope">
										<el-tag :type="paymentStatusType[scope.row.status]"> {{ scope.row.statusText }} </el-tag>
									</template>
								</el-table-column>
								<el-table-column label="已退数量" prop="returnCount" width="80" />
								<el-table-column label="下单时间" prop="placeOrderTime" width="150" />
							</el-table>
						</template>
					</el-table-column>
					<el-table-column prop="serialNumber" label="订单编号" width="150" fixed="left" show-overflow-tooltip="" />
					<el-table-column prop="actlyAmount" label="付款金额" width="100" fixed="left" show-overflow-tooltip="">
						<template #default="scope">
							<el-text>{{ verifyNumberComma(scope.row.actlyAmount.toFixed(2)) || '0.00' }}</el-text>
						</template>
					</el-table-column>
					<el-table-column prop="downIntegerAmount" label="抹零" width="60" fixed="left" show-overflow-tooltip="">
						<template #default="scope">
							<el-text>{{ verifyNumberComma(scope.row.downIntegerAmount.toFixed(2)) || '0.00' }}</el-text>
						</template>
					</el-table-column>
					<el-table-column prop="createTime" label="付款时间" width="150" fixed="left" show-overflow-tooltip="">
						<template #default="scope">
							<span>{{ formatDate(new Date(scope.row.createTime), 'YYYY-mm-dd HH:MM:SS') }}</span>
						</template>
					</el-table-column>
					<el-table-column label="支付方式" align="center">
						<el-table-column v-for="(method, index) in paymentMethods" :key="method.id" :label="method.value">
							<template #default="scope">
								<el-text>{{ verifyNumberComma(scope.row.paymentMethodObject[method.id + ''] ?? '0.00') }}</el-text>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column prop="cashierName" label="收银员" width="100" show-overflow-tooltip="" fixed="right" />
					<el-table-column label="状态" width="90" fixed="right">
						<template #default="scope">
							<el-tag :type="paymentStatusType[scope.row.status]"> {{ scope.row.statusText }} </el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="60" align="center" fixed="right">
						<template #default="scope">
							<el-button icon="ele-Printer" size="small" text="" @click="printBillA4(scope.row)" type="primary"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					v-model:currentPage="tableParams.page"
					v-model:page-size="tableParams.pageSize"
					:total="tableParams.total"
					:page-sizes="[10, 20, 50, 100]"
					background=""
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					layout="total, sizes, prev, pager, next, jumper"
				/>
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" size="default" @click="closeDialog">关闭</el-button>
				</span>
			</template>

			<PrintView ref="printViewRef" />
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue';

import { getAPI } from '/@/utils/axios-utils';
import { ConsumptionApi } from '/@/api-services/api';
import { addMonthsToDate, formatDate } from '/@/utils/formatTime';
import { getDictDataList } from '/@/utils/dict-utils';
import { ElMessage } from 'element-plus';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import Decimal from 'decimal.js';

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '消费记录',
	},
});
const isShowDialog = ref(false);
const loading = ref(false);
const queryParams = ref<any>({ customerId: 0, petId: 0, startTime: null, endTime: null });
const paymentMethods = ref<any>([]);
const expandedRowIds = ref<any>([]);
const PrintView = defineAsyncComponent(() => import('/@/components/print/index.vue'));
const printViewRef = ref();
const tableData = ref<any>([]);
const paymentStatusType = ref<any>({
	0: 'success',
	1: 'warning',
	2: 'danger',
});
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0,
});

//日期范围值
const dates = ref<any>([addMonthsToDate(new Date(), -1), addMonthsToDate(new Date(), 0)]);
// 打开弹窗
const openDialog = async (data: any) => {
	isShowDialog.value = true;
	queryParams.value.customerId = data.customerId;
	queryParams.value.petId = data.petId;
	await handleQuery();
	paymentMethods.value = await getDictDataList('payment_type');
};
// 关闭弹窗
const closeDialog = (data: any) => {
	isShowDialog.value = false;
};
/**
 * 打印账单
 * @param row
 */
const printBillA4 = async (row: any) => {
	const result = await getAPI(ConsumptionApi).apiConsumptionPrintBillA4Post({ id: row.id, customerId: queryParams.value.customerId, noteType: 0 });
	const info = result.data.result ?? {};
	if (info.template) {
		var dataInfo = { ...info, title: '消费清单' };
		printViewRef.value.showDialog(JSON.parse(info.template), dataInfo, 210);
	} else {
		ElMessage.error('请先设置打印模板');
		return;
	}
};

const handleQuery = async () => {
	loading.value = true;
	expandedRowIds.value = [];
	if (dates.value != null) {
		queryParams.value.startTime = dates.value[0];
		queryParams.value.endTime = dates.value[1];
	} else {
		queryParams.value.startTime = null;
		queryParams.value.endTime = null;
	}
	var res = await getAPI(ConsumptionApi).apiConsumptionGetPaymentCustomerPagePost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableData.value.forEach((item: any) => {
		item.paymentMethodObject = {};
		item.payMethods.forEach((method: any) => {
			if (method.inOrOut == 0) {
				let nowAmount = new Decimal(method.amount);
				item.paymentMethodObject[method.typeId + ''] = nowAmount.toNumber().toFixed(2);
			}
		});
	});
	tableParams.value.total = res.data.result?.total ?? 0;
	loading.value = false;
};

const loadPaymentDetails = async (row: any, expandedRows: any) => {
	if (expandedRows.some((item: any) => item.id == row.id) && row.details == undefined) {
		row.loadingChild = true;
		let details = await getAPI(ConsumptionApi).apiConsumptionGetPaymentDetailsPost({ paymentId: row.id, customerId: queryParams.value.customerId });
		row.details = details.data.result ?? [];
		row.loadingChild = false;
	}
};

// 改变页面容量
const handleSizeChange = (val: number) => {
	tableParams.value.pageSize = val;
	handleQuery();
};

// 改变页码序号
const handleCurrentChange = (val: number) => {
	tableParams.value.page = val;
	handleQuery();
};

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style scoped lang="scss"></style>
