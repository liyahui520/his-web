<template>
    <div class="productUnits-container">
        <el-dialog v-model="isShowDialog" :title="props.title" width="50%" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
            <el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="80px" :rules="rules">
                <el-row :gutter="35">
                    <el-form-item v-show="false">
                        <el-input v-model="ruleForm.id" />
                    </el-form-item>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入名称" clearable="" style="width: 70%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="卡号" prop="cardNumber">
                            <el-input v-model="ruleForm.cardNumber" placeholder="请输入卡号" clearable=""
                                style="width: 70%;" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="到期时间" prop="endTime">
                            <el-date-picker v-model="ruleForm.endTime" type="date" placeholder="请选择到期时间"
                                @change="handleEndTimeChange" style="width: 70%;" />
                        </el-form-item>
                    </el-col>
                    <el-col v-if="(ruleForm.id != undefined)" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="状态" prop="status">
                            <el-radio-group v-model="ruleForm.status" @change="handleStatusChange">
                                <el-radio-button v-for="(item, index) in options" :label="item.label"
                                    :value="item.value" :key="index" />
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="次数" prop="principalCount">
                            <el-input-number v-model="ruleForm.principalCount" :precision="0" :step="1" :max="99"
                                :min="0" style="width: 70%;"
                                @change="(currentValue: any, oldValue: any) => { if (!currentValue) ruleForm.principalCount = 1; else ruleForm.totalCount = currentValue + ruleForm.giftCount; }" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="赠送次数" prop="giftCount">
                            <el-input-number v-model="ruleForm.giftCount" :precision="0" :step="1" :max="99" :min="0"
                                style="width: 70%;"
                                @change="(currentValue: any, oldValue: any) => { if (!currentValue) ruleForm.giftCount = 0; else ruleForm.totalCount = ruleForm.principalCount + currentValue; }" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="销售价格" prop="salePrice">
                            <el-input-number v-model="ruleForm.salePrice" :precision="2" :step="0.1" :max="999999999"
                                :min="0" style="width: 70%;"
                                @change="(currentValue: any, oldValue: any) => { if (!currentValue) ruleForm.salePrice = 0.00; }"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="会员价格" prop="memberPrice">
                            <el-input-number v-model="ruleForm.memberPrice" :precision="2" :step="0.1" :max="999999999"
                                :min="0" style="width: 70%;"
                                @change="(currentValue: any, oldValue: any) => { if (!currentValue) ruleForm.memberPrice = 0.00; }"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="mb20">
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注" maxlength="200"
                                style="width: 80%;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider content-position="left" style="width:98%; margin: 15px">
                    <el-button type="primary" :icon="Plus" @click="addSecondaryCardItems" plain
                        size="small">添加项目</el-button>
                </el-divider>


                <el-row>
                    <el-col :span="24" class="mb20">
                        <div style="margin-bottom: 10px;margin-left: 50px;">
                            <el-text type="danger">注：优先级越高，代表优先扣减该项目；当优先级相等时则按照名称默认排序扣减。</el-text>
                        </div>
                        <el-table :data="ruleForm.secondaryCardItems" style="width: 100%" height="450">
                            <el-table-column label="项目名称" prop="productName" />
                            <el-table-column label="项目类型" prop="productTypeText" width="80" />
                            <el-table-column label="单位" prop="outUnitName" width="100" />
                            <el-table-column label="销售价格" prop="salePrice" width="100">
                                <template #default="scope">
                                    <el-text>{{ twoFloorNum(scope.row.salePrice) }}</el-text>
                                </template>
                            </el-table-column>
                            <el-table-column label="会员价格" prop="memberPrice" width="100">
                                <template #default="scope">
                                    <el-text>{{ twoFloorNum(scope.row.salePrice) }}</el-text>
                                </template>
                            </el-table-column>

                            <el-table-column label="优先级" width="150">
                                <template #default="scope">
                                    <el-form-item label-width="0" :key="`orderIndex${scope.$index}`"
                                        :prop="'secondaryCardItems.' + scope.$index + '.orderIndex'"
                                        :rules="rules.orderIndex" :inline-message="true" style="margin-bottom: 0px;">
                                        <el-input-number :ref="`orderIndex${scope.$index}`"
                                            v-model="scope.row.orderIndex" :precision="0" :step="1" :max="999999"
                                            :min="0" controls-position="right"></el-input-number>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="80" align="center" fixed="right">
                                <template #default="scope">
                                    <el-button icon="ele-Delete" size="small" text="" type="danger"
                                        @click="deleteSecondaryCardItems(scope.$index)"> 移除 </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel" size="default">取 消</el-button>
                    <el-button type="primary" @click="submit" size="default">确 定</el-button>
                </span>
            </template>

        </el-dialog>
        <Products ref="productRef" :title="productRefTitle" @reloadTable="handleSelectProduct" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { SecondaryCardsApi } from '/@/api-services/api';
import { MemberCardStatusEnum } from '/@/api-services/models/card-manage';
import { Delete, Plus } from '@element-plus/icons-vue'
import { addDaysToDate, addYearsToDate } from "/@/utils/formatTime";
import commonFunction from '/@/utils/commonFunction';
import { ProductTypeEnums } from "/@/api-services";
import other from '/@/utils/other';


const Products = defineAsyncComponent(() => import('/@/components/products/selectProducts.vue'));
const options = ref<any>([
    { label: '启用', value: MemberCardStatusEnum.NUMBER_0, type: "primary" },
    { label: '停用', value: MemberCardStatusEnum.NUMBER_1, type: "danger" },
    { label: '已到期', value: MemberCardStatusEnum.NUMBER_2, type: "info" },
])
const { twoFloorNum } = commonFunction();
//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: '',
    },
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const productRef = ref();
const isShowDialog = ref(false);
const ruleForm = ref<any>({});
//自行删除非必填规则
const rules = ref<FormRules>({
    name: [{ required: true, message: '请输入名称！', trigger: 'blur' }],
    cardNumber: [{ required: true, message: '请输入卡号！', trigger: 'blur' }],
    endTime: [{ required: true, message: '请选择到期时间！', trigger: 'blur' }],
});
const productRefTitle = ref('选择项目');


/**
 * 处理选中产品信息
 * @param data 
 */
const handleSelectProduct = (data: any) => {
    data.forEach((item: any) => {
        if (ruleForm.value.secondaryCardItems.findIndex((i: any) => i.productId == item.productId) == -1) {
            ruleForm.value.secondaryCardItems.push(item)
        }
    })
}
/**
 * 移除次卡包含项目
 */
const deleteSecondaryCardItems = (index: number) => {
    ruleForm.value.secondaryCardItems.splice(index, 1);
}
/**
 * 添加次卡包含项目
 */
const addSecondaryCardItems = () => {
    productRef.value.openDialog([], ProductTypeEnums.NUMBER_10001);
}
// 打开弹窗
const openDialog = (row: any) => {
    ruleForm.value = other.deepClone(row);
    isShowDialog.value = true;
    //需要处理一下到期时间
};
/**
 * @description 处理时间选择器改变事件
 */
const handleEndTimeChange = (data: any) => {
    const selectDate = new Date(data).toLocaleDateString();
    const currentDate = new Date().toLocaleDateString();
    if (selectDate < currentDate) {
        ruleForm.value.status = MemberCardStatusEnum.NUMBER_2;
    }
}
/**
 * @description 处理状态改变事件
 */
const handleStatusChange = (data: any) => {
    if (ruleForm.value.status == MemberCardStatusEnum.NUMBER_2) {
        ruleForm.value.endTime = addDaysToDate(new Date(), -1);
    }
    else {
        const selectDate = new Date(ruleForm.value.endTime).toLocaleDateString();
        const currentDate = new Date().toLocaleDateString();
        if (ruleForm.value.status == MemberCardStatusEnum.NUMBER_0 && selectDate < currentDate) {
            ruleForm.value.endTime = addYearsToDate(new Date(), 1);
        }
    }
}
// 关闭弹窗
const closeDialog = () => {
    emit('reloadTable');
    isShowDialog.value = false;
};

// 取消
const cancel = () => {
    isShowDialog.value = false;
};

// 提交
const submit = async () => {
    ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
        if (isValid) {
            let values = ruleForm.value;
            if (values.secondaryCardItems.length == 0) {
                ElMessage.error('请选择次卡包含项目！');
                return;
            }
            if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
                await getAPI(SecondaryCardsApi).apiSecondaryCardsEditPost(values)
            } else {
                await getAPI(SecondaryCardsApi).apiSecondaryCardsAddPost(values)
            }
            closeDialog();
        }
    });
};

// 页面加载时
onMounted(async () => { });

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
