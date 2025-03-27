<template>
    <div class="rechargeCard-container">
        <el-dialog v-model="isShowDialog" width="50%" draggable :close-on-click-modal="false" destroy-on-close>
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
                        <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>

            <el-descriptions title="基本信息" :column="4" :border="true">
                <el-descriptions-item label="会员名称">{{ props.pcustomer.name }}</el-descriptions-item>
                <el-descriptions-item label="押金总金额">{{ props.depositTotalAmount }}</el-descriptions-item>
            </el-descriptions>
            <el-divider border-style="dashed" content-position="center" style="margin: 10px 0px">
            </el-divider>
            <el-form ref="ruleFormRef" :model="ruleForm" :inline="true" status-icon>
                <el-row>
                    <el-col :span="24">
                        <el-form-item prop="typeId" style="display: flex;">
                            <div width="30px"></div>
                            <span style="margin-left: 10px;width: 92px;">押金类型</span>
                            <el-select v-model="ruleForm.typeId" placeholder="请选择押金类型" size="default"
                                style="width: 240px;" @change="handleDepositChange">
                                <el-option v-for="item in canDepositTypes" :key="item.id" :label="item.name"
                                    :value="item.id" />
                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col style="display: flex;" :span="12" v-for="(item, index) in ruleForm.payMethods" :key="index">
                        <el-form-item :prop="'methodId' + item.methodId">
                            <div style="display: flex; flex-direction: row;justify-content: center;">
                                <img :src="getPriceModthObject[item.methodId!].url" width="30px" height="30px" />
                                <span style="margin-left: 10px;width: 50px;">{{
                                    getPriceModthObject[item.methodId!].name
                                    }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item :prop="'amount' + item.amount" style="width: 50%;">
                            <el-input-number style="width: 100%;" v-model="item.amount" :precision="2" :step="100"
                                :min="0" :max="9999999"
                                @change="(currentValue: any, oldValue: any) => { if (!currentValue) item.amount = 0; }" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item prop="reamrk" style="display: flex;">
                            <div width="30px"></div>
                            <span style="margin-left: 10px;width: 92px;">备注</span>
                            <el-input style="width: 80%;" type="textarea" v-model="ruleForm.remark" placeholder="请输入备注"
                                clearable="" maxlength="100" />
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>

            <el-divider border-style="dashed" content-position="center" style="margin: 10px 0px">
            </el-divider>
            <el-descriptions style="margin-top: 30px;" :column="2" :border="false" size="large" align="center">
                <el-descriptions-item label="可退金额"><el-text tag="b">{{ depositInfo.amount
                        }}</el-text></el-descriptions-item>
                <el-descriptions-item label="总退金款"><el-text tag="b" type="danger">- {{ computedTotalAmout
                        }}</el-text></el-descriptions-item>
            </el-descriptions>

            <template #footer>
                <span class="dialog-footer">
                    <el-button size="default" @click="cancel">取 消</el-button>
                    <el-button :disabled="computedTotalAmout <= 0" type="primary" size="default"
                        @click="submitForm"><el-icon>
                            <Wallet />
                        </el-icon>退 款</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup name="rechargeCard-container" lang="ts">
import { ref, defineAsyncComponent, reactive, computed } from "vue";
import { getAPI } from "/@/utils/axios-utils";
import { MemberDepositApi } from "/@/api-services";
import { ReturnDepositInput } from "/@/api-services/models/deposit-manage/return-deposit-input";
import { ElMessage } from "element-plus";
import { Wallet } from '@element-plus/icons-vue'
import { getDictDataList } from '/@/utils/dict-utils';

//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: "押金退款",
    },
    pcustomer: {} as any,
    depositTotalAmount: 0 as any,
    typeId: "-1" as any,
    depositTypes: {
        type: Array,
        default: []
    }
});
const getPriceModth = ref<any>([]);
const getPriceModthObject = ref<any>({});
const isShowDialog = ref(false);
const ruleFormRef = ref();
const depositInfo = ref<any>({});
const depositList = ref<any>({});
const canDepositTypes = ref<any>([]);
const ruleForm = ref<ReturnDepositInput>({
    id: "0",
    customerId: "0",
    typeId: 0,
    changeAmount: 0,
    remark: '',
    payMethods: [] as any,
})

//父级传递来的函数，用于回调
const emit = defineEmits(["reloadTable"]);
// 打开弹窗
const openDialog = async () => {
    getPriceModth.value = getDictDataList('code_card_recharge_type');
    canDepositTypes.value = props.depositTypes.filter((m: any) => m.totalAmount > 0);
    ruleForm.value.typeId = props.typeId == "-1" ? canDepositTypes.value[0].id : props.typeId;
    let res = await getAPI(MemberDepositApi).apiGetMemberDepositListGet(props.pcustomer.id);
    depositList.value = res.data?.result ?? [];
    isShowDialog.value = true;
    ruleForm.value.remark='';
    ruleForm.value.customerId = props.pcustomer.id;

    handleDepositChange();
};
/**
 * 处理押金类型变动时事件
 */
const handleDepositChange = () => {
    ruleForm.value.payMethods = [];
    getPriceModthObject.value = {};
    getPriceModth.value.forEach((item: any) => {
        ruleForm.value.payMethods?.push({ methodId: item.id, methodName: item.label, amount: 0 });
        getPriceModthObject.value[item.id] = { name: item.label, url: `src/assets/pay-type/${item.value}.png` }
    });
    depositInfo.value = depositList.value.find((item: any) => item.typeId == ruleForm.value.typeId);
    ruleForm.value.id=depositInfo.value.id;
}

const computedTotalAmout = computed(() => {
    let totalAmountValue = ruleForm.value.payMethods?.reduce((pre: any, cur: any) => {
        return pre + cur.amount;
    }, 0);
    return totalAmountValue;
})

// 提交
const submitForm = async () => {
    if (computedTotalAmout.value > depositInfo.value.amount) {
        ElMessage.error('总退款金额不能大于原押金余额，请修改后重试！');
        return;
    }
    else if (computedTotalAmout.value < 0) return;
    ruleForm.value.changeAmount=computedTotalAmout.value;
    await getAPI(MemberDepositApi).apiMemberDepositReturnDepositPost(ruleForm.value).then((res) => {
        ElMessage.success('退款成功');
        closeDialog();
    }).catch((err) => {
        ElMessage.error(err.data.message);
        closeDialog();
    });
};


// 关闭弹窗
const closeDialog = () => {
    ruleFormRef.value?.resetFields();
    emit("reloadTable");
    isShowDialog.value = false;
};

// 取消
const cancel = () => {
    ruleFormRef.value?.resetFields();
    isShowDialog.value = false;
};


//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style scoped lang="scss"></style>