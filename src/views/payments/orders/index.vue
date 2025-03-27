<template>
    <div class="order-manage-container">
        <el-card shadow="never" :body-style="{ paddingBottom: '0', border: '0px' }">
            <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="70px">
                <el-form-item label="订单编号">
                    <el-input v-model="queryParams.serialNumber" clearable />
                </el-form-item>
                <el-form-item label="客户名称">
                    <el-input v-model="queryParams.customerName" clearable />
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="queryParams.cellPhone" clearable />
                </el-form-item>
                <el-form-item label="付款时间">
                    <el-date-picker v-model="dates" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                        :shortcuts="shortcuts" start-placeholder="开始日期" end-placeholder="结束日期" />
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-button type="primary" icon="ele-Search" @click="loadOrders"
                            v-auth="'order:consumption:query'">
                            查询 </el-button>
                        <el-button icon="ele-Refresh"
                            @click="() => { queryParams = { serialNumber:'',customerName: '', cellPhone: '', startTime: null, endTime: null }; }">
                            重置
                        </el-button>
                    </el-button-group>
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-button type="primary" icon="ele-FolderOpened" @click="handleExport"
                            v-auth="'order:consumption:export'"> 导出 </el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="full-table" shadow="never" style="margin-top: 8px;">
            <el-table ref="paymentTableRef" stripe :expand-row-keys="expandedRowIds" :data="tableData"
                style="width: 100%;" v-loading="loading" tooltip-effect="light" row-key="id" size="small"
                @expand-change="loadPaymentDetails">
                <el-table-column type="expand" width="55" fixed="left">
                    <template #default="props">
                        <el-table :data="props.row.details" style="padding-left: 55px;" stripe
                            v-loading="props.row.loadingChild" border max-height="500" width="100">
                            <el-table-column label="宠物名称" prop="petName" width="100" fixed="left"
                                show-overflow-tooltip="">
                                <template #default="scope">
                                    <el-text>{{ scope.row.petName }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="费用类型" prop="costTypeText" width="100" show-overflow-tooltip="">
                                <template #default="scope">
                                    <el-text>{{ scope.row.costTypeText }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="项目名称" prop="productName" width="250" show-overflow-tooltip="">
                                <template #default="scope">
									<el-tag type="success" v-if="scope.row.isMeal">[套]</el-tag>
									<el-tag type="warning" v-else-if="scope.row.isPackage">[包]</el-tag>
                                    <el-text>{{ scope.row.productName }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="数量" prop="count" width="80" show-overflow-tooltip="">
                                <template #default="scope">
                                    <el-text>{{ scope.row.count }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="单价" prop="settlementPrice" width="100" show-overflow-tooltip="">
                                <template #default="scope">
                                    <el-text>{{ verifyNumberComma(scope.row.settlementPrice.toFixed(2)) || '0.00'
                                        }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="付款金额" prop="actualPrice" width="150" show-overflow-tooltip="">
                                <template #default="scope">
                                    <el-text>{{ verifyNumberComma(scope.row.actualPrice.toFixed(2)) || '0.00' }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位" prop="outUnitName" width="100" show-overflow-tooltip="">
                                <template #default="scope">
                                    <el-text>{{ scope.row.outUnitName }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="销售员" prop="saleName" width="100" show-overflow-tooltip="">
                                <template #default="scope">
                                    <el-text>{{ scope.row.saleName }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态" prop="statusText" width="90" align="center" show-overflow-tooltip="">
                                <template #default="scope">
                                    <el-tag :type="paymentStatusType[scope.row.status]"> {{ scope.row.statusText }}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="已退数量" prop="returnCount" width="80">
                                <template #default="scope">
                                    <el-text>{{ scope.row.returnCount }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="下单时间" prop="placeOrderTime" width="150">
                                <template #default="scope">
                                    <el-text>{{ scope.row.placeOrderTime }}</el-text>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column prop="serialNumber" label="订单编号" width="150" fixed="left" show-overflow-tooltip="">
                    <template #default="scope">
                        <el-text>{{ scope.row.serialNumber }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column prop="customerName" label="会员名称" minWidth="100" fixed="left" show-overflow-tooltip="">
                    <template #default="scope">
                        <el-text>{{ scope.row.customerName }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column prop="cellPhone" label="手机号码" minWidth="100" fixed="left" show-overflow-tooltip="">
                    <template #default="scope">
                        <el-text>{{ scope.row.cellPhone }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column prop="actlyAmount" label="付款金额" minWidth="100" fixed="left" show-overflow-tooltip="">
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
                        <el-text>{{ formatDate(new Date(scope.row.createTime), 'YYYY-mm-dd HH:MM:SS') }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column label="支付方式" align="center">
                    <el-table-column v-for="(method, index) in paymentMethods" :key="method.id" :label="method.label"
                        show-overflow-tooltip="">
                        <template #default="scope">
                            <el-text>{{ verifyNumberComma(scope.row.paymentMethodObjectNew[method.id + ''] ?? '0.00')
                                }}</el-text>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="cashierName" label="收银员" minWidth="90" show-overflow-tooltip="" fixed="right">
                    <template #default="scope">
                        <el-text>{{ scope.row.cashierName }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="90" fixed="right" align="center">
                    <template #default="scope">
                        <el-tag :type="paymentStatusType[scope.row.status]"> {{ scope.row.statusText }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center" fixed="right">
                    <template #default="scope">
                        <el-tooltip effect="light" v-if="scope.row.status != 2" content="打印小票" placement="top">
                            <el-button icon="ele-Printer" size="small" text="" @click="printBillNote(scope.row)"
                                type="primary">小票</el-button>
                        </el-tooltip>
                        <el-tooltip effect="light" v-if="scope.row.status != 2" content="打印账单" placement="top">
                            <el-button icon="ele-Printer" size="small" text="" @click="printBillA4(scope.row)"
                                type="primary">账单</el-button>
                        </el-tooltip>
                        <el-tooltip effect="light" v-if="scope.row.status != 2" content="退单" placement="top">
                            <el-button icon="ele-DArrowLeft" @click="handleReturn(scope.row)" size="small" text=""
                                type="primary">退单</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:currentPage="tableParams.page" v-model:page-size="tableParams.pageSize"
                :total="tableParams.total" :page-sizes="[10, 20, 50, 100]" background=""
                @size-change="handleSizeChange" @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper" />


            <ReturnPayment ref="returnPaymentRef" @reloadTable="loadOrders" />

            <PrintView ref="printViewRef" />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { ConsumptionApi } from '/@/api-services/api';
import { addDaysToDate, formatDate } from "/@/utils/formatTime";
import { downloadByData, getFileName } from '/@/utils/download';
import ReturnPayment from '/@/views/payments/orders/components/returnPayment.vue';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import other from '/@/utils/other';
import Decimal from 'decimal.js';
import { getDictDataList } from '/@/utils/dict-utils';

const PrintView = defineAsyncComponent(() => import('/@/components/print/index.vue'));
const paymentTableRef = ref();
const returnPaymentRef = ref();
const expandedRowIds = ref<any>([]);
const queryParams = ref<any>({ customerName: '', cellPhone: '', startTime: null, endTime: null,serialNumber:'' });
const loading = ref(false);
const tableData = ref<any>([]);
const printViewRef = ref();
const tableParams = ref({
    page: 1,
    pageSize: 20,
    total: 0 as any,
});
const paymentStatusType = ref<any>({
    0: 'success',
    1: 'warning',
    2: 'danger',
})
const paymentMethods = ref<any>([]);

const shortcuts = [
    {
        text: '近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '近两周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 14)
            return [start, end]
        },
    },
    {
        text: '近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
]
//日期范围值
const dates = ref<any>([
    addDaysToDate(new Date(), -6),
    addDaysToDate(new Date(), 1)
])

const printBillNote = async (row: any) => {
    const result = await getAPI(ConsumptionApi).apiConsumptionPrintBillNotePost({ id: row.id, customerId: row.customerId, noteType: 0 });
    const info = result.data.result ?? {};
    if (info.template) {
        var dataInfo = { ...info, title: '消费清单' };
        printViewRef.value.showDialog(JSON.parse(info.template), dataInfo,true, 80);
    }
    else {
        ElMessage.error('请先设置打印模板');
        return;
    }
}
const printBillA4 = async (row: any) => {
    const result = await getAPI(ConsumptionApi).apiConsumptionPrintBillA4Post({ id: row.id, customerId: row.customerId, noteType: 0 });
    const info = result.data.result ?? {};
    if (info.template) {
        var dataInfo = { ...info, title: '消费清单' };
        printViewRef.value.showDialog(JSON.parse(info.template), dataInfo, 210);
    }
    else {
        ElMessage.error('请先设置打印模板');
        return;
    }
}
/**
 * 操作退款
 * @param row 
 */
const handleReturn = async (row: any) => {
    let rowInfo = other.deepClone(row);
    returnPaymentRef.value.openDialog({ data: rowInfo, paymentStatusType: paymentStatusType.value, paymentMethods: paymentMethods.value })

}
/**
 * 加载明细
 * @param row 
 * @param expandedRows 
 */
const loadPaymentDetails = async (row: any, expandedRows: any) => {
    if (expandedRows.some((item: any) => item.id == row.id) && row.details == undefined) {
        row.loadingChild = true;
        let details = await getAPI(ConsumptionApi).apiConsumptionGetPaymentDetailsPost({ paymentId: row.id, customerId: row.customerId });
        row.details = details.data.result ?? [];
        row.loadingChild = false;
    }

}
/**
 * 操作导出
 */
const handleExport = async () => {
    loading.value = true;
    if (dates.value != null) {
        queryParams.value.startTime = dates.value[0];
        queryParams.value.endTime = dates.value[1];
    }
    else {
        queryParams.value.startTime = null;
        queryParams.value.endTime = null;
    }
    let res = await getAPI(ConsumptionApi).apiConsumptionExportPaymentsPost(queryParams.value, { responseType: 'blob' });
    let fileName = getFileName(res.headers);
    downloadByData(res.data as any, fileName);
    loading.value = false;
}
/**
 * 加载订单列表
 */
const loadOrders = async () => {
    loading.value = true;
    expandedRowIds.value = [];
    if (dates.value != null) {
        queryParams.value.startTime = dates.value[0];
        queryParams.value.endTime = dates.value[1];
    }
    else {
        queryParams.value.startTime = null;
        queryParams.value.endTime = null;
    }
    let res = await getAPI(ConsumptionApi).apiConsumptionGetPaymentPagePost(Object.assign(queryParams.value, tableParams.value));
    tableData.value = res.data.result?.items ?? [];
    tableData.value.forEach((item: any) => {
        item.paymentMethodObject = {};
        item.paymentMethodObjectNew = {};
        item.payMethods.forEach((method: any) => {
            if (item.paymentMethodObject.hasOwnProperty(method.typeId + '')) {
                let sourceAmount = new Decimal(item.paymentMethodObject[method.typeId + '']);
                let nowAmount = new Decimal(method.amount);
                item.paymentMethodObject[method.typeId + ''] = sourceAmount.sub(nowAmount).toNumber().toFixed(2);
            }
            else {
                let nowAmount = new Decimal(method.amount);
                item.paymentMethodObjectNew[method.typeId + ''] = method.amount.toFixed(2);
                item.paymentMethodObject[method.typeId + ''] = nowAmount.toNumber().toFixed(2);
            }
        })
    })

    tableParams.value.total = res.data.result?.total;
    loading.value = false;
}
/**
 * 加载支付方式
 */
const loadPaymentMethods = async () => {
    let memoryData = getDictDataList('payment_type');
    if (memoryData.length == 0) {
        ElMessage.error('请先维护支付方式');
        return;
    }
    paymentMethods.value = memoryData;
}

/**
 * 改变页面容量
 * @param val 
 */
const handleSizeChange = (val: number) => {
    tableParams.value.pageSize = val;
    loadOrders();
};

/**
 * 改变页码序号
 * @param val 
 */
const handleCurrentChange = (val: number) => {
    tableParams.value.page = val;
    loadOrders();
};

// 页面加载时
onMounted(async () => {
    await loadPaymentMethods();
    await loadOrders();
});

</script>
<style scoped lang="scss">
.order-manage-container {
    :deep(.el-table .el-table__body-wrapper .el-table__expanded-cell .el-table) {
        width: 100%;
    }
    :deep(.el-table thead.is-group th.el-table__cell){
        background-color: var(--el-table-header-bg-color) !important;
    }
    // .fixed-inner-table {
    //     position: absolute;
    //     width: 100%;
    // }
}
</style>