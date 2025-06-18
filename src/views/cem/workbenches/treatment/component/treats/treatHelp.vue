<template>
    <div class="treatHelp"  style="height: 100%">
        <el-card style="height: 100%"></el-card>
    </div>
</template>

<script lang="ts" setup name="treatHelp">
    import {defineAsyncComponent, nextTick, onMounted, reactive, ref} from "vue";
    import {getAPI} from '/@/utils/axios-utils';
    import {CEMRecordApi, PhysicalItemsApi} from "/@/api-services";
</script>

<style scoped>

</style>
