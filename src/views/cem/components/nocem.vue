<template>
    <div class="no-cem-container" style="height: 100%;width: 100%;"> 
        <el-card :body-style="{ padding: '5px',border:'0px' }" shadow="never" style="height: 100%;width: 100%;">
        </el-card>

    </div>
</template>
<script lang="ts" setup name="nocem">
import {onMounted, onUnmounted, reactive, ref, defineAsyncComponent, nextTick, watch} from "vue"; 
import {getAPI} from '/@/utils/axios-utils';
import {auth} from '/@/utils/authFunction';
import {CEMRecordApi, CEMRecordApiFp, SysEnumApi} from "/@/api-services";
import {useUserInfo} from "/@/stores/userInfo";
import {storeToRefs} from "pinia"; 
 
const load = ref(false);


onMounted(async () => {
});

</script>

<style scoped lang="scss"> 
</style>