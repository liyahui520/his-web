<template>
  <el-container class="treatment-container">
    <el-aside class="sidebar" :width="sidebarWidth">
      <div class="sidebar-main" :style="{width:sidebarWidth}">
        <el-card :body-style="{ padding: '5px',border:'0px' }" shadow="never">
          <!-- 侧边栏内容 -->
          <SidebarPet @select-item="selectItem"/>
        </el-card>
        <el-button @click="toggleSidebar(isSidebarVisible)" :icon="isSidebarVisible?DArrowLeft:DArrowRight"
                   class="side-left"></el-button>
      </div>
    </el-aside>
    <el-container style="margin-left: 3px">
      <el-header v-show="rowData?.id>0" style="height: 80px;padding: 0px;margin: 3px;min-width: 1100px"
                 v-loading="pcuload">
        <SeptIndex :data="rowData" ref="septIndexRef"/>
      </el-header>
      <el-main style="padding: 0px;margin:3px;min-width: 1100px">
        <TreatMentInformation v-show="rowData?.id>0" ref="TreatMentInformationRef" :data="rowData"/>
        <TreatHelp v-show="rowData?.id<=0"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup name="treatment">
import {onMounted, ref, defineAsyncComponent, nextTick} from "vue";
import { DArrowLeft, DArrowRight} from '@element-plus/icons-vue'
import {useUserInfo} from "/@/stores/userInfo";
import {storeToRefs} from "pinia";
// 引入组件
const TreatMentInformation = defineAsyncComponent(() => import('./component/treatmentinformation.vue'));
const SidebarPet = defineAsyncComponent(() => import('./component/sidebarpet.vue'));
const SeptIndex = defineAsyncComponent(() => import('./component/septindex.vue'));
const TreatHelp = defineAsyncComponent(() => import('./component/treats/treatHelp.vue'));

const isSidebarVisible = ref(true);
const pcuload = ref(false);
const sidebarWidth = ref('280px');
const rowData = ref<any>({id: -1});
const TreatMentInformationRef = ref();
const septIndexRef = ref();

const stores1 = useUserInfo();
const {userInfos} = storeToRefs(stores1);
const toggleSidebar = (v) => {
  nextTick(() => {
    isSidebarVisible.value = !v;
    sidebarWidth.value = !v ? '280px' : '5px';
  })
}

const selectItem = async (row:any) => {
  pcuload.value = true;
  console.log(row)
  await nextTick(async () => {
    rowData.value = Object.assign({}, row, {ramdex: Date.now()});
    if (rowData.value?.cemRecord?.status === 2)
      await septIndexRef.value.TagVisitDoctor(false);
    else
      await septIndexRef.value.TagVisitDoctor(rowData.value?.cemRecord?.visitDoctorId === userInfos.value.id);
  });
  pcuload.value = false;
}


onMounted(async () => {
});

</script>
<style scoped>
.treatment-container {
  display: flex;
  min-width: 800px;
  height: 100%;

  .side-left {
    transition: width 0.5s;
    cursor: pointer;
    width: 16px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: absolute;
    top: 0%;
    margin-right: -36px;
    right: 25px; 
    color:var(--el-color-white);
    background-color: var(--el-color-white);
    padding: 4px 10px;
    border-radius: 0px 15px 15px 0px;
    border: 1px solid var(--el-color-primary);
    border-left: 0px;
    z-index: 999999;
  }

  .side-left-close {
    transition: width 0.5s;
    cursor: pointer;
    width: 16px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: absolute;
    top: 50%;
    margin-left: -2px;
    right: -20px;
    color: #0f9bfc;
    background-color: var(--el-color-white);
  }
}

.sidebar {
  transition: width 0.5s;
  margin-right: 13px;
  margin-left: -15px; 
}

.sidebar-main {
  position: absolute;
  transition: width 0.5s;
}

.main {
  flex: 1;
}
</style>
