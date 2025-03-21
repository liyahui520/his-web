<template>
    <div class="deposits-view-container">
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
                                style="width: 240px;">
                                <el-option v-for="item in props.depositTypes" :key="item.id" :label="item.name"
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
            <el-descriptions style="margin-top: 30px;" :column="2" :border="false" size="large">
                <el-descriptions-item width="12%" label="总充值金额"><el-text tag="b">{{ computedTotalAmout
                        }}</el-text></el-descriptions-item>
            </el-descriptions>

            <template #footer>
                <span class="dialog-footer">
                    <el-button size="default" @click="cancel">取 消</el-button>
                    <el-button :disabled="computedTotalAmout <= 0" type="primary" size="default"
                        @click="submitForm"><el-icon>
                            <Wallet />
                        </el-icon>充 值</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup name="deposits-view-container" lang="ts">
import { ref, computed } from "vue";
import { getAPI } from "/@/utils/axios-utils";
import { MemberDepositApi } from "/@/api-services";
import { RechargeDepositInput } from "/@/api-services/models/deposit-manage/recharge-deposit-input";
import { ElMessage } from "element-plus";
import { Wallet } from '@element-plus/icons-vue'
import { MemberDepositTypeEnum } from "/@/api-services/models/deposit-manage/member-deposit-type-enum";
import { useUserInfo } from '/@/stores/userInfo';

const stores = useUserInfo();
const dictList = stores.dictList;
//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: "押金充值",
    },
    pcustomer: {} as any,
    depositTotalAmount: 0 as any,
    typeId: "-1" as any,
    depositTypes: {
        type: Array,
        default: [] as any
    }
});
const getPriceModth = ref<any>([]);
const getPriceModthObject = ref<any>({});
const isShowDialog = ref(false);
const ruleFormRef = ref();
const ruleForm = ref<RechargeDepositInput>({
    customerId: "0",
    typeId: MemberDepositTypeEnum.NUMBER_0,
    changeAmount: 0,
    remark: '',
    payMethods: [] as any,
})

//父级传递来的函数，用于回调
const emit = defineEmits(["reloadTable"]);
// 打开弹窗
const openDialog = async () => {
    getPriceModth.value = dictList['code_card_recharge_type'];
    console.log("getPriceModth.value",getPriceModth.value)
    isShowDialog.value = true;
    ruleForm.value.remark = '';
    ruleForm.value.customerId = props.pcustomer.id
    ruleForm.value.typeId = props.typeId == "-1" ? props.depositTypes[0].id : props.typeId;
    ruleForm.value.payMethods = [];
    getPriceModthObject.value = {};
    getPriceModth.value.forEach((item: any) => {
        ruleForm.value.payMethods?.push({ methodId: item.id, methodName: item.label, amount: 0 });
        getPriceModthObject.value[item.id] = { name: item.label, url: `src/assets/pay-type/${item.value}.png` }
    });
    
    console.log("getPriceModthObject.value",getPriceModthObject.value)
};

const computedTotalAmout = computed(() => {
    let totalAmountValue = ruleForm.value.payMethods?.reduce((pre: any, cur: any) => {
        return pre + cur.amount;
    }, 0);
    return totalAmountValue;
})

// 提交
const submitForm = async () => {
    if (computedTotalAmout.value <= 0) return;
    await getAPI(MemberDepositApi).apiMemberDepositRechargeDepositPost(ruleForm.value).then((res) => {
        ElMessage.success('充值成功');
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