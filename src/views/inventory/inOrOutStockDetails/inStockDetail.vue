<template>
    <div class="productUnits-container" :class="isTagsViewCurrenFull?'tab-cus-full-Content':'tab-cus-Content'">
        <el-card shadow="never" :body-style="{ paddingBottom: '0' }">
            <TableSearch :search="tb.tableData.search" :modelValue="tb.tableData.param" @search="onSearch" />
        </el-card>
        <el-card shadow="never" class="full-table" style="overflow: auto;margin-top: 8px">
            <Table ref="tableRef" v-bind="tb.tableData" :getData="handleQuery"
                @sortHeader="onSortHeader" border>
                
                <template #amount="scope">
                    <p>{{ verifyNumberComma(scope.row.amount.toFixed(2)) }}</p>
                </template>
                <template #singPrice="scope">
                    <p>{{ verifyNumberComma(scope.row.singPrice.toFixed(2)) }}</p>
                </template>
                <template #inPrice="scope">
                    <p>{{ verifyNumberComma(scope.row.inPrice.toFixed(2)) }}</p>
                </template>

            </Table>
        </el-card>

    </div>
</template>

<script lang="ts" setup name="InStorageManage">
import { ref, defineAsyncComponent, reactive, nextTick } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import { getAPI } from '/@/utils/axios-utils';
import { SysEnumApi, InOrOutDetailApi } from '/@/api-services/api';
import { addWeeksToDateReturnDate } from "/@/utils/formatTime";
import { verifyNumberComma } from '/@/utils/toolsValidate';

import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes'; 
import { storeToRefs } from 'pinia';
const storesTagsViewRoutes = useTagsViewRoutes(); 
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/table/search.vue'));

const tableRef = ref();

const tb = reactive<TableDemoState>({
    tableData: {
        // 表头内容（必传，注意格式）
        columns: [
            {
                prop: 'productTypeText',
                minWidth: 100,
                label: '产品类型',
                headerAlign: 'center',
                sortable: 'custom',
                isCheck: true,
                hideCheck: true, showOverflowTooltip: true
            },
            {
                prop: 'productName',
                minWidth: 200,
                label: '产品名称',
                headerAlign: 'center',
                sortable: 'custom',
                isCheck: true,
                hideCheck: true, showOverflowTooltip: true
            },
            {
                prop: 'unitName',
                minWidth: 100,
                label: '单位',
                headerAlign: 'center',
                toolTip: true,
                // sortable: 'custom',
                isCheck: true, showOverflowTooltip: true
            },
            {
                prop: 'relevanceNumber',
                minWidth: 150,
                label: '关联单号',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true, showOverflowTooltip: true
            },
            {
                prop: 'procureCount',
                minWidth: 80,
                label: '采购数',
                headerAlign: 'center',
                sortable: 'custom',
                isCheck: true,
                showOverflowTooltip: true
            },
            {
                prop: 'giveCount',
                minWidth: 80,
                label: '赠品数',
                align: 'center',
                isCheck: true,
                sortable: 'custom',
                showOverflowTooltip: true
            },
            {
                prop: 'amount',
                minWidth: 120,
                label: '采购金额(元)',
                align: 'center',
                sortable: 'custom',
                isCheck: true,
                showOverflowTooltip: true
            },
            {
                prop: 'singPrice',
                minWidth: 120,
                label: '入库单价',
                align: 'center',
                sortable: 'custom',
                isCheck: true,
                showOverflowTooltip: true
            },
            {
                prop: 'inPrice',
                minWidth: 120,
                label: '采购单价',
                align: 'center',
                isCheck: true,
                sortable: 'custom', showOverflowTooltip: true
            },
            {
                prop: 'typeText',
                minWidth: 100,
                label: '入库类型',
                align: 'center',
                // sortable: 'custom',
                isCheck: true, showOverflowTooltip: true
            },
            {
                prop: 'createTime',
                minWidth: 170,
                label: '入库时间',
                align: 'center',
                isCheck: true,
                sortable: 'custom',
                showOverflowTooltip: true
            },
        ],
        // 配置项（必传）
        config: {
            isStripe: true, // 是否显示表格斑马纹
            isBorder: false, // 是否显示表格边框
            isSerialNo: true, // 是否显示表格序号
            isSelection: true, // 是否勾选表格多选
            showSelection: auth('sysConfig:batchDelete'), //是否显示表格多选
            pageSize: 20, // 每页条数
            hideExport: false, //是否隐藏导出按钮
            exportFileName: '入库明细', //导出报表的文件名，不填写取应用名称
            hidePrint: true,
            isDisabled: false,
        },
        // 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
        search: [
            { label: '产品名称', prop: 'productName', placeholder: '请输入产品名称', required: false, type: 'input', optionname: '', optionkey: '' },
            { label: '单号', prop: 'serialNumber', placeholder: '请输入单号', required: false, type: 'input', optionname: '', optionkey: ''  },
            { label: '入库日期', prop: 'time', placeholder: '请选择入库日期', required: false, type: 'daterange', optionname: '', optionkey: ''  },
            {
                label: '单据类型',
                prop: 'inType',
                placeholder: '请选择单据类型',
                required: false,
                type: 'select',
                options: [],
                optionkey: 'value',
                optionname: 'label'
            }
        ],
        param: { time: [] },
        defaultSort: {
            prop: 'createTime',
            order: 'descending',
        },
    },
});
tb.tableData.param.time= [addWeeksToDateReturnDate(new Date(), -1), addWeeksToDateReturnDate(new Date(), 0)] ;
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
//获取所有入库类型
const getOrderTypes = async () => {
    var r = await getAPI(SysEnumApi).apiSysEnumEnumDataListGet('OrderTypeEnum');
    let result = r.data?.result ?? [];
	result.forEach((itme: any) => {
		tb.tableData.search[3].options?.push({ value: itme.value, label: itme.describe });
	});
}


// 查询操作
const handleQuery = async (param: any) => {

    if (param.time) {
        param.startTime = param.time[0];
        param.endTime = param.time[1];
    }
    let res = await getAPI(InOrOutDetailApi).apiInOrOutDetailGetInStockItemsPagePost(param);
    return res.data;
};


getOrderTypes(); 
</script>