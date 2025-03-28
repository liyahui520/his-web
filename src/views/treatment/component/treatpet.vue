<template>
  <div class="treatpet-container">
    <el-card :class="checkId==props.data?.id?'box-card check-card select-chenck':'box-card check-card'" shadow="hover" :style="checkId==props.data?.id?{}:{border:'var(--el-border-color-light) 1px solid'}"
             style="width:260px;height: 100px;border-radius: 15px;" :body-style="{ padding: '0px' }">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-tag type="warning"  style="margin-left: 4px">
            {{ props.data?.pPetsInfo?.petRecordNumber ?? '----------' }}
          </el-tag>
          <el-tag type="success"  style="margin-left: 5px">{{ props.data?.regTypeText }}</el-tag>
          <el-tag type="danger"  style="margin-left: 5px" title="住院病历" v-if="props.data?.cemRecord?.isHospital">院</el-tag> 
        </el-col>
        <el-col :span="24" style="padding-left: 10px">
          <div style="float: left;text-align: center">
            <div style="text-align: center">
              <el-avatar v-if="props.data?.pPetsInfo?.petImageUrl != void 0 && props.data?.pPetsInfo?.petImageUrl != null && props.data?.pPetsInfo?.petImageUrl != '' && props.data?.pPetsInfo?.petImageUrl != 'null' && props.data?.pPetsInfo?.petImageUrl != 'undefined'" :src="props.data?.pPetsInfo?.petImageUrl" :size="50">
                <img :src="props.data?.pPetsInfo?.petImageUrl"/>
              </el-avatar>
              <el-avatar v-else :src="'src/assets/in-hospitals/animal.png'" :size="50">
              </el-avatar>
              

            </div>
            <span><el-text style="max-width: 60px;font-size: 12px;line-height: 20px;color: #8d8d91;overflow: inherit"
                           truncated :title="props.data?.createTime">
                            {{ dateEntityFormatYMD(props.data?.createTime) }}</el-text></span>
          </div>
          <div style="float: left;margin-left: 2px;margin-top: 5px;width: 185px">
            <div>
              <el-space spacer="" size="small" wrap style="font-size: 8px">
                <el-text style="font-weight: bold;font-size: 14px">
                  {{ props.data?.pPetsInfo?.petName }}-{{ props.data?.pPetsInfo?.petKindText }}
                </el-text>
              </el-space>
            </div>
            <div style="margin-top: 5px;">

              <el-space spacer="|" size="small" wrap style="font-size: 8px">
                <el-text style="width: 35px">{{ props.data?.pPetsInfo?.petGenderText }}</el-text>
                <el-text style="width: 35px" truncated :title="props.data?.pPetsInfo?.petColorText">
                  {{ props.data?.pPetsInfo?.petColorText }}
                </el-text>
                <el-text style="width: 60px" truncated :title="props.data?.pPetsInfo?.petWeight+'Kg'">
                  {{ props.data?.pPetsInfo?.petWeight }}Kg
                </el-text>
              </el-space>
            </div>
            <div style="margin-top: 8px;font-size: 12px;float: right;width: 100%;text-align: center">
              <el-link type="primary" style="max-width: 100px;line-height: 16px;overflow: inherit;margin-left: 5px"
                       truncated v-if="props.data?.status==0" :title="'挂号医生：'+props.data?.doctorName">
                <span style="font-size: 12px">{{ props.data?.doctorName }}</span>
              </el-link>
              <el-link type="primary"
                       style="max-width: 100px;line-height: 16px;overflow: inherit;margin-left: 5px;text-align: center"
                       @click.stop align="center"
                       truncated v-if="props.data?.status==1"
                       :title="'就诊医生：'+props.data?.cemRecord?.visitDoctorName" @click="doctorReplace">
                <span style="font-size: 12px">{{ props.data?.cemRecord?.visitDoctorName }}</span>
              </el-link>
              <el-link type="primary"
                       style="max-width: 100px;line-height: 16px;overflow: inherit;margin-left: 5px;text-align: center"
                       @click.stop align="center"
                       truncated v-if="props.data?.status==2" :title="'责任医生：'+props.data?.doctorName">
                <span style="font-size: 12px">{{ props.data?.doctorName }}</span>
              </el-link>
              <el-button link type="primary" size="small" style="float:right;" v-on:click="start"
                         v-if="props.data?.status==0">开始诊疗
              </el-button>
              <!--                            <el-divider direction="vertical"/>-->
              <el-button link type="danger" size="small" style="float:right;" @click.stop @click="closeRecord"
                         v-if="props.data?.status==1">结束诊疗
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="source"><span
          :class="props.data?.status==0?'link peding':'link scuess'">{{ props.data?.statusText }}</span></div>
    </el-card>
    <DoctorReplace @click.stop ref="doctorReplaceRef" @reloadTable="reload"/>
  </div>
</template>

<script lang="ts" setup name="treatpet">
import {onMounted, onUnmounted, reactive, ref, defineAsyncComponent, nextTick} from "vue";
import {ElMessageBox, ElMessage} from "element-plus";
import {getAPI} from '/@/utils/axios-utils';
import {auth} from '/@/utils/authFunction';
import {CEMRecordApi, RegistersApi} from "/@/api-services";
import {
  verifyNumberComma, verifyNumberCnUppercase, verifyTextColor
} from '/@/utils/toolsValidate';
import {formatDate} from "/@/utils/formatTime";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Printer,
  View,
  CircleCheck,
  SwitchButton,
  Right, Back, Switch
} from '@element-plus/icons-vue'
import commonFunction from "/@/utils/commonFunction";
import {RegistersStatusEnum} from "/@/api-services/models/register-manage";

const {dateEntityFormatYMD, scale2Format} = commonFunction();
const emit = defineEmits(["reload"]);

// 引入组件
//更换责任医生
const DoctorReplace = defineAsyncComponent(() => import('/@/components/doctor/replace.vue'));

const doctorReplaceRef = ref();


//父级传递来的参数
var props = defineProps({
  linktitle: {
    type: String,
    default: "诊疗中",
  },
  data: {
    type: Object,
    default: () => {
    }
  },
  checkId: {
    type: String,
    default: null
  }
});

const start = async () => {
  let param = Object.assign({}, props.data, {status: RegistersStatusEnum.InTreat})
  await getAPI(RegistersApi).apiRegistersIdStartTrantPut(props.data.id);
  // props.checkId = props.data.id;
  emit("reload", props.data)
}

const reload = async () => {
  emit("reload", props.data);
}

//结束诊疗
const closeRecord = async () => {
  await getAPI(CEMRecordApi).apiCEMRecordIdEndPut(props.data.recordId);
  emit("reload", props.data)
}

const doctorReplace = async (e) => {
  doctorReplaceRef.value.openDialog(props.data.recordId);
  e.stopPropagation();
}

onMounted(async () => {
});

</script>

<style scoped lang="scss">
.treatpet-container {
  margin-bottom: 5px;
  :deep(.el-avatar){
    background-color: white !important;
  }
  .source {
    //position: fixed;
    top: 0px;
    right: 0px;
    width: 20px;
    height: 20px;
    z-index: 999;

    .link {
      position: relative;
      right: -200px;
      top: -95px;
      display: block;
      width: 23px;
      padding: 20px 5px;
      text-align: center;
      color: rgb(255, 255, 255);
      font-size: 12px;
      //background: rgb(101, 24, 255);
      text-decoration: none;
      text-shadow: rgba(0, 0, 0, 0.15) 0px -1px 0px;
      transform-origin: 0% 0%;
      transform: rotate(-45deg);
      cursor: pointer;
    }

    .scuess {
      background: #2d8cf0;
    }

    .peding {
      background: #67c23a;
    }
  }

  .box-card:active, .box-card:hover {
    border: #b88230 1px solid;
  }

  .check-card {
    border: var(--next-bg-main-color) 1px solid;
  }

  .select-chenck {
    border: #2d8cf0 1px solid;
  }
}
</style>
