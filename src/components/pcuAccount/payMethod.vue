<template>
        <el-form-item
                v-for="(domain, index) in dynamicValidateForm"
                :key="domain.typeId"
                :label="domain.typeName"
                :prop="'pcuAccountPayMethods.' + index + '.price'"
        >
            <el-input
                    v-model="domain.price"
                    :formatter="(value) =>  {let v= verifyNumberCommaNo(value?.toString() || '0.00'); return v;}"

            >
                <template #prepend>
                    ￥
                </template>
            </el-input>
        </el-form-item>

</template>

<script lang="ts" setup name="rechargeAccount">
    import {defineAsyncComponent, nextTick, onMounted, reactive, ref} from "vue";
    import {FormInstance} from "element-plus";
    import {
        Iphone,
        Location,
        OfficeBuilding,
        Tickets,
        User,

    } from '@element-plus/icons-vue'
    import {getAPI} from "/@/utils/axios-utils";
    import {PcuAccountApi, PcustomerApi} from "/@/api-services";
    import {
        verifyNumberComma,
        verifyNumberCnUppercase,
        verifyTextColor,
        verifyNumberIntegerAndFloat,
        addAllSpace,
        verifyNumberCommaNo
    } from '/@/utils/toolsValidate';
    var props = defineProps({
        dynamicValidateForm: {
            type: Object,
            default: [],
        },
    });


    defineExpose();
</script>

<style scoped>

</style>