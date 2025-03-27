<template>
    <div class="secondary-card-view-container">
        <el-dialog v-model="isShowDialog" width="50%" draggable :close-on-click-modal="false" destroy-on-close>
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
            <el-descriptions title="" :column="5" :border="true">
                <el-descriptions-item width="12%" label="剩余总次数">{{ secondaryCardInfo.totalCount || 0
                    }}</el-descriptions-item>
                <el-descriptions-item width="12%" label="赠送总次数">{{ secondaryCardInfo.giftCount || 0
                    }}</el-descriptions-item>
                <el-descriptions-item width="12%" label="共使用">{{ secondaryCardInfo.useCount || 0
                    }}</el-descriptions-item>
                <el-descriptions-item width="12%" label="最近一次使用时间">{{ secondaryCardInfo.lastUseTime
                    }}</el-descriptions-item>
                <!-- <el-descriptions-item width="12%" label="购买">
                    <el-button circle @click="saleSecondaryCard">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-button>
                </el-descriptions-item> -->
            </el-descriptions>
            <el-divider border-style="dashed" content-position="center" style="margin: 10px 0px">
            </el-divider>
            <Table ref="tableRef" v-bind="tb.tableData" style="height: 550px" :getData="loadSecondaryCardDetails" border
                :row-class-name="tableRowClassName">
                <template v-slot:command>
                    <div style="display: flex;">
                        <div>
                            <el-select v-model="cardId" placeholder="请选择次卡" size="small" style="width: 200px;"
                                @change="secondaryCardChange">
                                <el-option v-for="item in secondaryCardTypes" :key="item.id"
                                    :label="item.cardName + '（ ' + item.canCount + ' ）'" :value="item.id" />
                            </el-select>
                        </div>
                        <div>
                            <el-button type="primary" @click="saleSecondaryCard" style="margin-left: 50px;">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                                新增次卡
                            </el-button>
                        </div>
                    </div>
                    <el-row :gutter="20">
                        <el-col :span="8">

                        </el-col>
                        <el-col :span="8">
                            
                        </el-col>
                        <el-col :span="8"></el-col>
                    </el-row>
                </template>

            </Table>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="default" @click="cancel">取 消</el-button>
                    <el-button type="primary" size="default" @click="closeDialog">关闭</el-button>
                </span>
            </template>
            <SecondaryCards ref="secondaryCardsRef" :title="'购买次卡'" :pcustomer="props.pcustomer" :petInfo="petInfo" />
        </el-dialog>
    </div>
</template>
<script setup name="secondary-card-view-container" lang="ts">
import { ref, defineAsyncComponent, reactive, nextTick } from "vue";
import { getAPI } from "/@/utils/axios-utils";
import { PcustomerApi } from "/@/api-services";
import { Plus } from '@element-plus/icons-vue';
import { getDictDataList } from '/@/utils/dict-utils';

const PcuDetails = defineAsyncComponent(() => import('/@/components/pcus/pcuDetails.vue'));
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const SecondaryCards = defineAsyncComponent(() => import('/@/components/sales/secondaryCards.vue'));

//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: "次卡消费明细",
    },
    pcustomer: {} as any
});
const secondaryCardsRef = ref();
const getPriceModth = ref<any>([]);
const isShowDialog = ref(false);
const tableRef = ref();
//押金信息
const secondaryCardInfo = ref<any>({});
const secondaryCardTypes = ref<any>([]);
const cardId = ref<any>();
const petInfo = ref<any>({});
const tb = reactive<TableDemoState>({
    tableData: {
        // 表头内容（必传，注意格式）
        columns: [
            {
                prop: 'cardName',
                label: '次卡名称',
                minWidth: '80',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                fixed: 'left',
                'show-overflow-tooltip': true,
            },
            {
                prop: 'serialNumber',
                label: '关联单号',
                width: '150',
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
                width: '150',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                fixed: 'left',
                'show-overflow-tooltip': true,
            },
            {
                prop: 'totalCount',
                label: '交易次数',
                headerAlign: 'center',
                width: '90',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
            },
            {
                prop: 'currentCount',
                label: '当前余次',
                headerAlign: 'center',
                width: '90',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                fixed: 'right',
                'show-overflow-tooltip': true,
            }, {
                prop: 'typeText',
                width: '100',
                label: '交易类型',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                fixed: 'right',
                'show-overflow-tooltip': true,
            }, {
                prop: 'createUserName',
                width: '80',
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
const openDialog = async (petData: any) => {
    getPriceModth.value =getDictDataList('code_card_recharge_type');
    isShowDialog.value = true;
    petInfo.value = petData;
    await loadSecondaryCardInfo();
    await loadSecondaryCardTypes();
};

const saleSecondaryCard = () => {
    secondaryCardsRef.value.openDialog()
}


const tableRowClassName = ({ row, rowIndex }: { row: any, rowIndex: number }) => {
    if (row.changeType != 0) {
        return 'table-class-text-red'
    }
    return ''
}

const secondaryCardChange = async () => {
    await nextTick(async () => {
        tableRef.value.pageReset();
    });
}


const loadSecondaryCardInfo = async () => {
    let res = await getAPI(PcustomerApi).apiPcustomerCustomerIdGetCustomerSecondaryCardsSummaryGet(props.pcustomer.id);
    secondaryCardInfo.value = res.data?.result ?? {};
}


/**
 * 加载会员次卡
 */
const loadSecondaryCardTypes = async () => {
    secondaryCardTypes.value = [];
    let res = await getAPI(PcustomerApi).apiPcustomerCustomerIdGetCustomerSecondaryCardsGet(props.pcustomer.id);
    secondaryCardTypes.value = res.data?.result ?? [];
    let totalCountValue = secondaryCardTypes.value?.reduce((pre: any, cur: any) => {
        return pre + cur.canCount;
    }, 0);
    secondaryCardTypes.value.unshift({
        "id": "-1",
        "cardName": "全部",
        "code": "-1",
        "canCount": totalCountValue
    });
    cardId.value = "-1";
}



/**
 * Table 查询
 * @param par
 */
const loadSecondaryCardDetails = async (par: any) => {
    par.customerId = props.pcustomer.id;
    par.cardId = cardId.value;
    let secondaryCard = await getAPI(PcustomerApi).apiPcustomerGetCustomerSecondaryCardPagePost(par);

    return secondaryCard.data;
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
.secondary-card-view-container {
    :deep(.el-table__body) {
        .table-class-text-red {
            color: #F56C6C !important;
        }
    }
}
</style>