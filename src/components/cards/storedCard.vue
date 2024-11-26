<template>
  <div class="storedCard-container">
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
        <el-descriptions-item width="12%" label="卡号">{{ cardInfo.cardNumber }}</el-descriptions-item>
        <el-descriptions-item width="12%" label="储值卡余额">{{ verifyNumberComma(cardInfo.totalAmount?.toFixed(2)) || '0.00'
          }}</el-descriptions-item>
        <el-descriptions-item width="12%" label="总充值金额">{{ verifyNumberComma(cardInfo.totalRechargeAmount?.toFixed(2))
          ||
          '0.00' }}</el-descriptions-item>
        <el-descriptions-item width="12%" label="总消费金额">{{ verifyNumberComma(cardInfo.totalPayAmount?.toFixed(2)) ||
          '0.00'
          }}</el-descriptions-item>
        <el-descriptions-item width="12%" label="有效期">{{ cardInfo.endTime }}</el-descriptions-item>
        <el-descriptions-item width="12%" label="最近消费时间">{{ cardInfo.lastTime }}</el-descriptions-item>
        <el-descriptions-item width="12%" label="状态">
          <el-tag type="success" v-if="cardInfo.status == 0">{{ cardInfo.statusText }}</el-tag>
          <el-tag type="danger" v-else-if="cardInfo.status == 1">{{ cardInfo.statusText }}</el-tag>
          <el-tag type="warning" v-else-if="cardInfo.status == 2">{{ cardInfo.statusText }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-divider border-style="dashed" content-position="center" style="margin: 10px 0px">
      </el-divider>
      <Table ref="tableRef" v-bind="tb.tableData" style="height: 550px" :getData="loadCardDetails" border
        :row-class-name="tableRowClassName">
        <template v-slot:command>
          <el-row>
            <el-button type="primary" style="margin-left: 10px" plain size="small" @click="openRechargeCardRef"
              v-auth="'customer:card:rancharge'">
              充值
            </el-button>
            <el-button type="danger" plain size="small" :disabled="cardInfo.totalAmount <= 0"
              @click="openReturnAmountRef" v-auth="'customer:card:return'">退款</el-button>
          </el-row>
        </template>
        <template v-slot:columncommand>
          <el-table-column label="支付方式" align="center">
            <el-table-column width="80" prop="pcuAccountPayMethods" :label="item.value" :show-overflow-tooltip="true"
              min-width="50" v-for="item in getPriceModth" :key="item.id">
              <template #default="scope">
                <span>{{ scope.row.rechargeDetails.filter(s => s.rechargeType
                  == item.code)[0]?.totalAmount?.toFixed(2).toString() || '0.00' }}</span>
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
    <RechargeCard ref="rechargeCardRef" :pcustomer="props.pcustomer" :cardInfo="cardInfo" @reloadTable="reloadData">
    </RechargeCard>
    <ReturnAmount ref="returnAmountRef" :pcustomer="props.pcustomer" :cardInfo="cardInfo" @reloadTable="reloadData">
    </ReturnAmount>
  </div>
</template>
<script setup name="storedCard-container" lang="ts">
import { ref, defineAsyncComponent, reactive, nextTick } from "vue";
import { getAPI } from "/@/utils/axios-utils";
import { MemberCardApi } from "/@/api-services";
import { getDictDataItem as di, getDictDataList as dl } from '/@/utils/dict-utils';
import { verifyNumberComma } from "/@/utils/toolsValidate";
import RechargeCard from './rechargeCard.vue'
import ReturnAmount from './returnAmount.vue'
import { ElMessage } from "element-plus";

const PcuDetails = defineAsyncComponent(() => import('/@/components/pcus/pcuDetails.vue'));
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));


//父级传递来的参数
var props = defineProps({
  title: {
    type: String,
    default: "会员卡明细",
  },
  pcustomer: {} as any,
  cardId: {
    type: String,
    default: '0'
  }
});
const getPriceModth = ref<any>([]);
const isShowDialog = ref(false);
const tableRef = ref();
const cardInfo = ref<any>({});
const rechargeCardRef = ref();
const returnAmountRef = ref();
const tb = reactive<TableDemoState>({
  tableData: {
    // 表头内容（必传，注意格式）
    columns: [

      {
        prop: 'orderNo',
        label: '交易号',
        minWidth: '150',
        headerAlign: 'center',
        toolTip: true,
        sortable: 'custom',
        isCheck: true,
        fixed: 'left',
        'show-overflow-tooltip': true,
      }, {
        prop: 'createTime',
        label: '发生时间',
        headerAlign: 'center',
        minWidth: '140',
        toolTip: true,
        sortable: 'custom',
        isCheck: true,
        fixed: 'left',
        'show-overflow-tooltip': true,
      },
      {
        prop: 'occurAmount',
        label: '发生金额',
        headerAlign: 'center',
        minWidth: '100',
        toolTip: true,
        sortable: 'custom',
        isCheck: true,
        type: 'price',
        'show-overflow-tooltip': true,
      },
      {
        prop: 'occurOriAmount',
        label: '本金',
        headerAlign: 'center',
        minWidth: '100',
        toolTip: true,
        sortable: 'custom',
        isCheck: true,
        type: 'price',
        'show-overflow-tooltip': true,
      },
      {
        prop: 'occurGiveAmount',
        label: '赠送金额',
        headerAlign: 'center',
        minWidth: '100',
        toolTip: true,
        sortable: 'custom',
        isCheck: true,
        type: 'price',
        'show-overflow-tooltip': true,
      },
      {
        prop: 'totalAmount',
        label: '当前余额',
        headerAlign: 'center',
        minWidth: '100',
        toolTip: true,
        sortable: 'custom',
        isCheck: true,
        type: 'price',
        fixed: 'right',
        'show-overflow-tooltip': true,
      }, {
        prop: 'consumptionTypeText',
        minWidth: '60',
        label: '状态',
        headerAlign: 'center',
        toolTip: true,
        sortable: 'custom',
        isCheck: true,
        fixed: 'right',
        'show-overflow-tooltip': true,
      }, {
        prop: 'nickName',
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
      exportFileName: '会员卡明细信息', //导出报表的文件名，不填写取应用名称
      hideLoad: false,
      hidePrint: true,
      showPagination: false
    },
    // 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
    search: [],
    param: { cardId: 0 },
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
  getPriceModth.value = await dl('code_card_recharge_type');
  isShowDialog.value = true;
  await loadCardInfo();
};

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: any
  rowIndex: number
}) => {
  if (row.consumptionType == 1 || row.consumptionType == 2) {
    return 'table-class-text-red'
  }
  return ''
}

const openReturnAmountRef = async () => {

  if (cardInfo.value.totalAmount <= 0) {
    ElMessage.warning('暂无可退金额！');
    return;
  }


  returnAmountRef.value.openDialog();
};

const openRechargeCardRef = async () => {
  rechargeCardRef.value.openDialog();
};

const reloadData = async () => {

  await nextTick(async () => {
    await loadCardInfo();
    tableRef.value.pageReset();
  });
  emit("reloadTable");
}

/**
 * Table 查询
 * @param par
 */
const loadCardDetails = async (par: any) => {
  let cardInfo = await getAPI(MemberCardApi).apiMemberCardPagePost(props.cardId, par);
  return cardInfo.data;
}
/**
 * 获取会员卡信息
 */
const loadCardInfo = async () => {
  let card = await getAPI(MemberCardApi).apiGetMembercardByCustomerIdGet(props.pcustomer.id);

  cardInfo.value = card.data?.result ?? {};
  if (!cardInfo.value.isCustomer) {
    cardInfo.value.endTime = '永久有效'
  }
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
.storedCard-container {
  :deep(.table-class-text-red) {
    color: #F56C6C !important;
  }
}
</style>