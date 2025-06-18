<template> 
    <div class="printTemp-container">
        <el-tabs v-model="activeName" type="border-card" style="height: 100%; border-radius: 5px; overflow: hidden; border: 0">
            <el-tab-pane label="文书管理" name="documents">
                <Documents />
            </el-tab-pane>
            <el-tab-pane label="打印模板" name="prescriptionNotes">
                <PrescriptionNotes />
            </el-tab-pane>
            <el-tab-pane label="短信模板" name="smsTemplates">
                <SmsTemplates />
            </el-tab-pane>
        </el-tabs>
    </div> 
</template>

<script lang="ts" setup name="printTemp">
import { ref, defineAsyncComponent } from 'vue';

const Documents = defineAsyncComponent(() => import('./documents/index.vue'));
const PrescriptionNotes = defineAsyncComponent(() => import('/@/views/system/printTemplates/prescriptionNotes/index.vue'));
const SmsTemplates = defineAsyncComponent(() => import('/@/views/system/printTemplates/smsTemplates/index.vue')); 

const activeName = ref('documents');
</script>
<style lang="scss" scoped>
.printTemp-container {
:deep(.el-tabs--border-card > .el-tabs__header) {
    background-color: var(--next-bg-menuBarActiveColor) !important;
    padding: 0 !important;
}
:deep(.el-tabs) {
    .el-tabs__content {
        background-color: var(--next-bg-main-color) !important;
        padding: 0px !important;
        overflow: auto;
    }
}
}
</style>
