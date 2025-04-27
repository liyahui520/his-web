<template>
    <div class="deposits-view-container">
        <el-dialog v-model="isShowDialog" width="70%" draggable :close-on-click-modal="false" destroy-on-close>
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
                        <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
            <PcuDetails :pcustomer="props.pcustomer" />
            <el-divider border-style="dashed" content-position="center" style="margin: 10px 0px">
            </el-divider>
            <el-descriptions title="" :column="4" :border="true">
                <el-descriptions-item width="12%" label="押金总余额">{{ verifyNumberComma(depositInfo.totalAmount?.toFixed(2)) || '0.00'  }}</el-descriptions-item>
                <el-descriptions-item width="12%" label="总充值金额">{{ verifyNumberComma(depositInfo.totalRechargeAmount?.toFixed(2)) || '0.00' }}</el-descriptions-item>
                <el-descriptions-item width="12%" label="总消费金额"><el-text type="danger">{{ verifyNumberComma(depositInfo.totalPayAmount?.toFixed(2)) || '0.00' }}</el-text></el-descriptions-item>
            </el-descriptions>
            <el-divider border-style="dashed" content-position="center" style="margin: 10px 0px">
            </el-divider>
            <Table ref="tableRef" v-bind="tb.tableData" style="height: 550px" :getData="loadDepositDetails" border
                :row-class-name="tableRowClassName">
                <template v-slot:command>
                    <el-row>
                        <el-select v-model="typeId" placeholder="请选择押金类型"  style="width: 240px;"
                            @change="depositTypeChange">
                            <el-option v-for="item in depositTypes" :key="item.id"
                                :label="item.name + '（ ' + item.totalAmount + ' ）'" :value="item.id" />
                        </el-select>
                        <el-button type="primary" style="margin-left: 10px" plain 
                            @click="openRechargeAmountRef"  v-auth="'customer:deposit:rancharge'"> 充值 </el-button>
                        <el-button type="danger" plain  @click="openReturnAmountRef"  v-auth="'customer:deposit:return'">退款</el-button>
                    </el-row>
                </template>
                <template v-slot:columncommand>
                    <el-table-column label="支付方式" align="center">
                        <el-table-column width="90" prop="pcuAccountPayMethods" :label="item.label"
                            :show-overflow-tooltip="true" min-width="50" v-for="item in getPriceModth" :key="item.id">
                            <template #default="scope">
                                <span>{{ scope.row.memberDepositDetailPays.filter(s => s.methodId ==
                                    item.id)[0]?.amount?.toFixed(2).toString() || '0.00' }}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </template>

            </Table>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="default" @click="cancel">取 消</el-button>
                    <el-button type="primary" size="default" @click="closeDialog">关闭</el-button>
                </span>
            </template>
        </el-dialog>
        <RechargeAmount ref="rechargeAmountRef" :title="'押金充值'" :pcustomer="props.pcustomer"
            :depositTotalAmount="depositTotalAmount" :typeId="typeId" :depositTypes="depositTypesProps"
            @reloadTable="reloadData">
        </RechargeAmount>
        <ReturnAmount ref="returnAmountRef" :title="'押金退款'" :pcustomer="props.pcustomer"
            :depositTotalAmount="depositTotalAmount" :typeId="typeId" :depositTypes="depositTypesProps"
            @reloadTable="reloadData">
        </ReturnAmount>

    </div>
</template>
<script setup name="deposits-view-container" lang="ts">
import { ref, defineAsyncComponent, reactive, nextTick } from "vue";
import { getAPI } from "/@/utils/axios-utils";
import { MemberDepositApi } from "/@/api-services";
import { ElMessage } from "element-plus";
import { verifyNumberComma } from '/@/utils/toolsValidate';
import RechargeAmount from './rechargeAmount.vue'
import ReturnAmount from './returnAmount.vue'
import { getDictDataList } from '/@/utils/dict-utils';

const PcuDetails = defineAsyncComponent(() => import('/@/components/pcus/pcuDetails.vue'));
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));

//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: "押金明细",
    },
    pcustomer: {} as any,
    depositId: {
        type: String,
        default: '0'
    }
});
const getPriceModth = ref<any>([]);
const isShowDialog = ref(false);
const tableRef = ref();
const rechargeAmountRef = ref();
const returnAmountRef = ref();
//押金信息
const depositInfo = ref<any>({});
const depositTypes = ref<any>([]);
const depositTypesProps = ref<any>([]);
const typeId = ref<any>();
const depositTotalAmount = ref(0);
const tb = reactive<TableDemoState>({
    tableData: {
        // 表头内容（必传，注意格式）
        columns: [
            {
                prop: 'typeName',
                label: '押金类型',
                minWidth: '80',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                fixed: 'left',
                'show-overflow-tooltip': true,
            },
            {
                prop: 'orderNo',
                label: '交易号',
                minWidth: '130',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                fixed: 'left',
                'show-overflow-tooltip': true,
            }, {
                prop: 'createTime',
                label: '交易时间',
                headerAlign: 'center',
                minWidth: '130',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                fixed: 'left',
                'show-overflow-tooltip': true,
            },
            {
                prop: 'changeAmount',
                label: '交易金额',
                headerAlign: 'center',
                minWidth: '90',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                type: 'price',
                'show-overflow-tooltip': true,
            },
            {
                prop: 'currentAmount',
                label: '当前余额',
                headerAlign: 'center',
                minWidth: '90',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                type: 'price',
                fixed: 'right',
                'show-overflow-tooltip': true,
            }, {
                prop: 'changeTypeText',
                minWidth: '80',
                label: '交易类型',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                fixed: 'right',
                'show-overflow-tooltip': true,
            }, {
                prop: 'createUserName',
                minWidth: '80',
                label: '操作人',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                fixed: 'right',
                'show-overflow-tooltip': true,
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
            hideExport: true, //是否隐藏导出按钮
            exportFileName: '押金明细', //导出报表的文件名，不填写取应用名称
            hideLoad: false,
            hidePrint: true,
            showPagination: false
        },
        // 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
        search: [],
        param: { customerId: 0 },
        defaultSort: {
            prop: 'createTime',
            order: 'descending',
        },
    },
});

//父级传递来的函数，用于回调
const emit = defineEmits(["reloadTable"]);
// 打开弹窗
const openDialog = async () => {
    getPriceModth.value = getDictDataList('code_card_recharge_type');
    isShowDialog.value = true;
    await loadDepositInfo();
    await loadDepositTypes();
};

const tableRowClassName = ({ row, rowIndex }: { row: any, rowIndex: number }) => {
    if (row.changeType == 2) {
        return 'table-class-text-red'
    }
    return ''
}

const depositTypeChange = async () => {
    await nextTick(async () => {
        tableRef.value.pageReset();
    });
}


const loadDepositInfo = async () => {
    let res = await getAPI(MemberDepositApi).apiGetMemberDepositInfoGet(props.pcustomer.id);
    depositInfo.value = res.data?.result ?? {};
}


/**
 * 押金退款
 */
const openReturnAmountRef = async () => {
    var hasBiggerAmount = depositTypesProps.value.some((item: any) => item.totalAmount > 0);
    if (!hasBiggerAmount) {
        ElMessage.warning("没有可退押金!");
        return;
    }
    if (typeId.value != '-1') {
        var info = depositTypesProps.value.find((item: any) => item.id === typeId.value);
        if (info.totalAmount <= 0) {
            ElMessage.warning("没有可退押金!");
            return;
        }
    }
    returnAmountRef.value.openDialog();
};


/**
 * 押金充值
 */
const openRechargeAmountRef = async () => {
    rechargeAmountRef.value.openDialog();
};

/**
 * 刷新表格数据
 */
const reloadData = async () => {
    await nextTick(async () => {
        await loadDepositInfo();
        await loadDepositTypes();
        tableRef.value.pageReset();
    });
    emit("reloadTable");
}

/**
 * 加载押金类型
 */
const loadDepositTypes = async () => {
    depositTypes.value = [];
    let res = await getAPI(MemberDepositApi).apiMemberDepositGetDepositTypesGet(props.pcustomer.id);
    depositTypes.value = res.data?.result ?? [];
    depositTypesProps.value = depositTypes.value.filter((item:any) => item.id !== "-1");
    let totalAmountValue = depositTypes.value?.reduce((pre: any, cur: any) => {
        return pre + cur.totalAmount;
    }, 0);
    depositTotalAmount.value = totalAmountValue;
    depositTypes.value.unshift({
        "id": "-1",
        "name": "全部",
        "code": "-1",
        "totalAmount": totalAmountValue
    });
    typeId.value = "-1";
}



/**
 * Table 查询
 * @param par
 */
const loadDepositDetails = async (par: any) => {
    par.customerId = props.pcustomer.id;
    par.typeId = typeId.value;
    let deposit = await getAPI(MemberDepositApi).apiMemberDepositGetMemberDepositPagePost(par);

    return deposit.data;
}
// 关闭弹窗
const closeDialog = () => {
    emit("reloadTable");
    isShowDialog.value = false;
};

// 取消
const cancel = () => {
    emit("reloadTable");
    isShowDialog.value = false;
};


//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style scoped lang="scss">
.deposits-view-container {
    :deep(.table-class-text-red) {
    color: #F56C6C !important;
  }
}
</style>