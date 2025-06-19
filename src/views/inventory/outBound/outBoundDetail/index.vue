<template>
    <div class="productUnits-container" :class="isTagsViewCurrenFull?'tab-cus-full-Content':'tab-cus-Content'">
        <el-card shadow="never" :body-style="{ paddingBottom: '0' }">
            <el-form :model="queryParams" ref="queryForm" :inline="true">
                <el-form-item label="产品名称">
                    <el-input v-model="queryParams.productName" clearable placeholder="请输入产品名称" />
                </el-form-item>
                <el-form-item label="单号">
                    <el-input v-model="queryParams.serialNumber" clearable placeholder="请输入单号" />
                </el-form-item>
                <el-form-item label="出库类型">
                    <el-select v-model="queryParams.outType" filterable clearable  placeholder="请选择出库类型">
                        <el-option v-for="item in orderTypes" :key="item.value" :label="item.describe" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出库时间">
                    <el-date-picker v-model="dates" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                        start-placeholder="开始日期" end-placeholder="结束日期" />
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'inventory:outstoreitem'">
                            查询
                        </el-button>
                        <el-button icon="ele-Refresh"
                            @click="() => (queryParams = { productName: '', serialNumber: '', startTime: null, endTime: null, outType: null })">
                            重置</el-button>
                    </el-button-group>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button-group>
                        <el-button type="primary" icon="ele-FolderOpened" @click="handleExport" v-auth="'instore:export'"> 导出 </el-button>
                    </el-button-group>
                </el-form-item> -->
            </el-form>
        </el-card>
        <el-card  shadow="never"  class="full-table" style="overflow: auto;margin-top: 8px">
            <el-table :data="tableData"  v-loading="loading" tooltip-effect="light" row-key="id"  border>
                <el-table-column type="index" label="序号" width="55" align="center" fixed="" />
                <el-table-column prop="productTypeText" label="产品类型" show-overflow-tooltip=""  width="100"  />
                <el-table-column prop="productName" label="产品名称" show-overflow-tooltip="" />
                <el-table-column prop="unitName" label="单位" show-overflow-tooltip="" />
                <el-table-column prop="relevanceNumber" label="关联单号" show-overflow-tooltip="" />
                <el-table-column prop="count" label="出库数" show-overflow-tooltip="" minWidth="80" />
                <el-table-column prop="salePrice" label="销售价格" show-overflow-tooltip="" minWidth="80"  >
                    <template #default="scope">
                    <span>{{ verifyNumberComma(scope.row.salePrice.toFixed(2)) || '0.00' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="actlyPrice" label="付款金额" show-overflow-tooltip="" minWidth="80"  >
                    <template #default="scope">
                    <span>{{ verifyNumberComma(scope.row.actlyPrice.toFixed(2)) || '0.00' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="totalAmount" label="总金额" show-overflow-tooltip="" minWidth="80"  >
                    <template #default="scope">
                    <span>{{ verifyNumberComma(scope.row.totalAmount.toFixed(2)) || '0.00' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="costPrice" label="成本价格" show-overflow-tooltip="" minWidth="80"  >
                    <template #default="scope">
                    <span>{{ verifyNumberComma(scope.row.costPrice.toFixed(2)) || '0.00' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="outTypeText" label="出库类型" show-overflow-tooltip=""  width="100"  />
                <el-table-column prop="createTime" label="出库时间" show-overflow-tooltip="">
                    <template #default="scope">
                        <span>{{ formatDate(new Date(scope.row.createTime), 'YYYY-mm-dd HH:MM:SS') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" show-overflow-tooltip="" />

            </el-table>
            <el-pagination v-model:currentPage="tableParams.page" v-model:page-size="tableParams.pageSize"
                :total="tableParams.total" :page-sizes="[10, 20, 50, 100]" background=""
                @size-change="handleSizeChange" @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper" />
        </el-card>
    </div>
</template>

<script lang="ts" setup name="OutStorageManage">
import { ref } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { SysEnumApi,InOrOutDetailApi } from '/@/api-services/api';
import { addWeeksToDateReturnDate, formatDate } from "/@/utils/formatTime";
import { downloadByData, getFileName } from '/@/utils/download';
import { verifyNumberComma } from '/@/utils/toolsValidate';

import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes'; 
import { storeToRefs } from 'pinia';
const storesTagsViewRoutes = useTagsViewRoutes(); 
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({ productName: '', serialNumber: '', startTime: null, endTime: null, outType: null });
const orderTypes = ref<any>([]);
const tableParams = ref({
    page: 1,
    pageSize: 50,
    total: 0 as any,
});

//获取所有入库类型
const getOrderTypes = async () => {
    var r = await getAPI(SysEnumApi).apiSysEnumEnumDataListGet('OutOrderTypeEnum');
    
    orderTypes.value = r.data?.result ?? [];
}

//日期范围值
const dates = ref<any>([
    //addWeeksToDateReturnDate(new Date(), -1),
    //addWeeksToDateReturnDate(new Date(), 0)
])

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
    let res = await getAPI(InOrOutDetailApi).apiInOrOutDetailExportOutStockItemsPost(queryParams.value, { responseType: 'blob' });

    let fileName = getFileName(res.headers);
    downloadByData(res.data as any, fileName);
    loading.value = false;
}

// 查询操作
const handleQuery = async () => {
    loading.value = true;
    if (dates.value != null) {
        queryParams.value.startTime = dates.value[0];
        queryParams.value.endTime = dates.value[1];
    }
    else {
        queryParams.value.startTime = null;
        queryParams.value.endTime = null;
    }
    let res = await getAPI(InOrOutDetailApi).apiInOrOutDetailGetOutStockItemsPagePost(Object.assign(queryParams.value, tableParams.value));
    tableData.value = res.data.result?.items ?? [];
    tableParams.value.total = res.data.result?.total;
    loading.value = false;
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

getOrderTypes();
handleQuery();
</script> 