<template>
  <div class="replace">
    <el-dialog v-model="isShowDialog" width="800px" draggable :close-on-click-modal="false"
            >
      <template #header>
        <div style="color: #fff">
          <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
            <Edit/>
          </el-icon>
          <span>{{ props.title }}</span>
        </div>
      </template>
      <el-descriptions
          class="margin-top"
          title=""
          :column="3"
          border
      >
        <el-descriptions-item label="用户名">{{recordData.customerName}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{recordData.customerPhone}}</el-descriptions-item>
        <el-descriptions-item label="宠物名称">{{recordData.petName}}</el-descriptions-item>
        <el-descriptions-item label="病例类型">
          <el-tag size="small">{{recordData.regTypeText}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="挂号时间"
        >{{recordData.createTime}}
        </el-descriptions-item>
      </el-descriptions>
      <el-form-item label="责任医师：" style="margin-top: 20px">
        <el-col :span="11">
          <el-input v-model="recordData.visitDoctorName" placeholder="" disabled/>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <el-icon size="24" style="line-height: inherit;font-weight: bold"><Right /></el-icon>
        </el-col>
        <el-col :span="11">
           <el-select v-model="newVisitDoctor" placeholder="请选择责任医生" value-key="id">
             <el-option v-for="(item, index) in  getUsersData" :value="item"
                        :label="item.realName">{{ item.realName }}
             </el-option>
           </el-select>
        </el-col>
      </el-form-item>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" @click="saveSubmit">
          保存
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="replace">
import { ref} from 'vue';
import { Right,Edit} from '@element-plus/icons-vue'
import {getAPI} from '/@/utils/axios-utils';
import {CEMRecordApi} from "/@/api-services";
import {storeToRefs} from "pinia";
const isShowDialog = ref(false);
const recordData=ref({});
import { useUserInfo } from '/@/stores/userInfo';
import other from '/@/utils/other';
const stores = useUserInfo();
const { userList } = storeToRefs(stores);
const getUsersData = ref<any>([]);
const newVisitDoctor= ref<any>({});
const load = ref(false);

const emit = defineEmits(["reloadTable"]);
//父级传递来的参数
var props = defineProps({
  title: {
    type: String,
    default: "修改责任医生",
  }
});
// 打开弹窗
const openDialog = async (recordId:number) => {
  isShowDialog.value = true;
  load.value = true;
  getUsersData.value = userList.value;
  newVisitDoctor.value={};
  let r=await getAPI(CEMRecordApi).apiCEMRecordIdGetRecordByIdGet(recordId);
  recordData.value = r.data?.result ??[];
  load.value = false;
};
// 关闭弹窗
const closeDialog = () => {
  isShowDialog.value = false;
};

const saveSubmit = async ()=>{
  let json = other.deepClone(recordData.value);
  json.visitDoctorName = newVisitDoctor.value.realName;
  json.visitDoctorId = newVisitDoctor.value.id;
  await getAPI(CEMRecordApi).apiCEMRecordIdEditDoctorPut(json.id,json);
  emit("reloadTable");
  isShowDialog.value = false;
}

// 取消
const cancel = () => {
  isShowDialog.value = false;
};

//将属性或者函数暴露给父组件
defineExpose({openDialog});

</script>
<style scoped lang="scss">

</style>