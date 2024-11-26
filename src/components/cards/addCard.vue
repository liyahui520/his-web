<template>
  <div class="register-reg-container">
    <el-dialog v-model="isShowDialog" width="700" draggable :close-on-click-modal="false" destroy-on-close>
      <template #header>
        <div style="color: #fff">
          <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
            <ele-Edit />
          </el-icon>
          <span>{{ props.title }}</span>
        </div>
      </template>

      <PcuDetails :pcustomer="props.pcustomer" :pet="props.pet" />
      <el-divider border-style="dashed" content-position="center" style="margin: 10px 0px">
      </el-divider>
      <el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px">
        <el-form-item label="储值卡号" prop="regType">
          <el-input v-model="ruleForm.cardNumber" placeholder="请输入储值卡号">
            <template #append>
              <el-button type="primary" @click="regisNumber">生成</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="会员卡密码" prop="doctorId">
          <el-input v-model="ruleForm.cardPassword" type="password" placeholder="会员卡密码" />
        </el-form-item>
        <el-form-item label="">
          <el-radio-group v-model="ruleForm.isCustomer">
            <el-radio :value="false">永久有效</el-radio>
            <el-radio :value="true">自定义有效期</el-radio>
          </el-radio-group>
          <span v-show="ruleForm.isCustomer">
            <el-date-picker style="margin-left: 20px" v-model="ruleForm.endTime" type="date" placeholder=""
              :disabled-date="disabledDate" />
          </span>
        </el-form-item>
        <el-form-item label="状  态" prop="doctorId">
          <el-radio-group v-model="ruleForm.status">
            <el-radio v-for="(item, index) in memberCardStatus" :label="item.value" :key="index">{{ item.describe }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel" size="default">取 消</el-button>
          <el-button type="primary" :loading="submitLoading" size="default" @click="addCard">开通</el-button>
        </span>
      </template>
    </el-dialog>
    <StoredCard ref="storedCardRef" />
  </div>
</template>

<script lang="ts" setup name="addCard">
import { ref, defineAsyncComponent } from "vue";
import { getAPI } from "/@/utils/axios-utils";
import { SysEnumApi, MemberCardApi } from "/@/api-services";
import other from '/@/utils/other';

const PcuDetails = defineAsyncComponent(() => import('/@/components/pcus/pcuDetails.vue'));
const StoredCard = defineAsyncComponent(() => import('/@/components/cards/storedCard.vue'));
//父级传递来的函数，用于回调
const emit = defineEmits(["reloadTable"]);

const isShowDialog = ref(false);
const memberCardStatus = ref<any>([]);
const submitLoading = ref(false);
const storedCardRef = ref();
const ruleForm = ref({
  cardNumber: 'V' + Date.now(),
  cardPassword: '123456',
  isCustomer: false,
  endTime: new Date(),
  status: 0,
  customerId: 0
})

//父级传递来的参数
var props = defineProps({
  title: {
    type: String,
    default: "会员卡",
  },
  pcustomer: {} as any,
  pet: {} as any
});
//重新生成卡号
const regisNumber = async () => {
  ruleForm.value.cardNumber = 'V' + Date.now();
}

//禁用之前日期可选
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now()
}

//新开卡
const addCard = async () => {
  submitLoading.value = true;
  let json = other.deepClone(ruleForm.value) as any;
  json.customerId = props.pcustomer.id;
  await getAPI(MemberCardApi).apiMemberCardAddMembercardPost(json).then(() => {

    closeDialog();
  });
  submitLoading.value = false;
}

// 打开弹窗
const openDialog = async () => {

  let lev = await getAPI(SysEnumApi).apiSysEnumEnumDataListGet('MemberCardStatusEnum');
  memberCardStatus.value = lev.data?.result ?? [];
  isShowDialog.value = true;
};

// 关闭弹窗
const closeDialog = () => {
  // ruleFormRef.value?.resetFields();
  emit("reloadTable");
  isShowDialog.value = false;
};

// 取消
const cancel = () => {
  // ruleFormRef.value?.resetFields();
  emit("reloadTable");
  isShowDialog.value = false;
};


//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style scoped></style>