
<template>
  <el-breadcrumb separator="|" style="line-height:2">
    <el-breadcrumb-item>{{ pcustomer.name }}</el-breadcrumb-item>
    <el-breadcrumb-item>
      <el-tag class="mx-1" type="danger" effect="light">{{ pcustomer.cardNumber ?? '-' }}</el-tag>
    </el-breadcrumb-item>
    <el-breadcrumb-item>{{ pcustomer.sexText ?? '-' }}</el-breadcrumb-item>
    <el-breadcrumb-item>
      <el-tag class="mx-1" type="success" effect="light">{{ pcustomer.levelText ?? '-' }}</el-tag>
    </el-breadcrumb-item>
    <el-breadcrumb-item>{{ pcustomer.cellPhone ?? '-' }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ pcustomer.sourceText ?? '-' }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup >
import commonFunction from "/@/utils/commonFunction";
import {ref, onMounted} from "vue";
import {ElMessage} from "element-plus";
import type {FormRules} from "element-plus";
//父级传递来的参数
var props = defineProps({
  pcustomer: {} as any
});
</script>
<style scoped lang="scss">

</style>