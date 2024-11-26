<template>
    <div class="product-inspections-details-container">
        <el-dialog v-model="isShowDialog" :title="props.title" :width="900" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
            <el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="110px" :rules="rules">
                <el-divider content-position="left" style="padding: 0;margin: 15px">基本信息</el-divider>
                <el-row :gutter="35">
                    <el-form-item v-show="false">
                        <el-input v-model="ruleForm.id" />
                    </el-form-item>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="检查类目" prop="name">
                            <el-select style="width: 100%;" v-model="ruleForm.productInspectionId" filterable
                                placeholder="请选择检查类目">
                                <el-option v-for="item in inspectionsData" :key="item.id" :label="item.label"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="项目名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入项目名称" clearable="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="中文名称">
                            <el-input v-model="ruleForm.chName" placeholder="请输入中文名称" clearable="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="单位" prop="unit">
                            <el-input v-model="ruleForm.unit" placeholder="请输入项目单位" clearable="" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider content-position="left" style="padding: 0;margin: 15px">犬检查信息</el-divider>
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最大值(幼年)" prop="youngDogMax">
                            <el-input-number v-model="ruleForm.youngDogMax" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最小值(幼年)" prop="youngDogMin">
                            <el-input-number v-model="ruleForm.youngDogMin" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最大值(成年)" prop="dogMax">
                            <el-input-number v-model="ruleForm.dogMax" :precision="2" :step="0.1" :max="999999999"
                                :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最小值(成年)" prop="dogMin">
                            <el-input-number v-model="ruleForm.dogMin" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最大值(老年)" prop="oldDogMax">
                            <el-input-number v-model="ruleForm.oldDogMax" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最小值(老年)" prop="oldDogMin">
                            <el-input-number v-model="ruleForm.oldDogMin" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider content-position="left" style="padding: 0;margin: 15px">猫检查信息</el-divider>
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最大值(幼年)" prop="youngCatMax">
                            <el-input-number v-model="ruleForm.youngCatMax" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最小值(幼年)" prop="youngCatMin">
                            <el-input-number v-model="ruleForm.youngCatMin" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最大值(成年)" prop="catMax">
                            <el-input-number v-model="ruleForm.catMax" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最小值(成年)" prop="catMin">
                            <el-input-number v-model="ruleForm.catMin" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最大值(老年)" prop="oldCatMax">
                            <el-input-number v-model="ruleForm.oldCatMax" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最小值(老年)" prop="oldCatMin">
                            <el-input-number v-model="ruleForm.oldCatMin" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider content-position="left" style="padding: 0;margin: 15px">其他检查信息</el-divider>
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最大值(幼年)" prop="youngOtherMax">
                            <el-input-number v-model="ruleForm.youngOtherMax" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最小值(幼年)" prop="youngOtherMin">
                            <el-input-number v-model="ruleForm.youngOtherMin" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最大值(成年)" prop="otherMax">
                            <el-input-number v-model="ruleForm.otherMax" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最小值(成年)" prop="otherMin">
                            <el-input-number v-model="ruleForm.otherMin" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最大值(老年)" prop="oldOtherMax">
                            <el-input-number v-model="ruleForm.oldOtherMax" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="最小值(老年)" prop="oldOtherMin">
                            <el-input-number v-model="ruleForm.oldOtherMin" :precision="2" :step="0.1" :max="999999999"
                                :min="-999999999"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="mb20">
                        <el-form-item label="临床意义" prop="remark">
                            <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入临床意义"
                                maxlength="200"></el-input>
                        </el-form-item>
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
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { ProductInspectionDetailApi } from '/@/api-services/api';
import other from '/@/utils/other';
//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: '',
    },
    inspectionsData: {
        type: Array,
        default: [] as any
    }
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const ruleForm = ref<any>({});

//#region 自定义验证最大最小值

const validateYoungDogMin = (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入犬(幼年)最小值！'))
    } else {
        if (value >= ruleForm.value.youngDogMax) {
            callback(new Error('犬(幼年)最小值不能大于等于犬(幼年)最大值'))
        }
        callback()
    }
}
const validateDogMin = (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入犬(成年)最小值！'))
    } else {
        if (value >= ruleForm.value.dogMax) {
            callback(new Error('犬(成年)最小值不能大于等于犬(成年)最大值'))
        }
        callback()
    }
}
const validateOldDogMin = (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入犬(老年)最小值！'))
    } else {
        if (value >= ruleForm.value.dogMax) {
            callback(new Error('犬(老年)最小值不能大于等于犬(老年)最大值'))
        }
        callback()
    }
}


const validateYoungCatMin = (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入猫(幼年)最小值！'))
    } else {
        if (value >= ruleForm.value.youngCatMax) {
            callback(new Error('猫(幼年)最小值不能大于等于猫(幼年)最大值'))
        }
        callback()
    }
}
const validateCatMin = (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入猫(成年)最小值！'))
    } else {
        if (value >= ruleForm.value.dogMax) {
            callback(new Error('猫(成年)最小值不能大于等于猫(成年)最大值'))
        }
        callback()
    }
}
const validateOldCatMin = (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入猫(老年)最小值！'))
    } else {
        if (value >= ruleForm.value.oldCatMax) {
            callback(new Error('猫(老年)最小值不能大于等于猫(老年)最大值'))
        }
        callback()
    }
}


const validateYoungOtherMin = (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入其他(幼年)最小值！'))
    } else {
        if (value >= ruleForm.value.youngOtherMax) {
            callback(new Error('其他(幼年)最小值不能大于等于其他(幼年)最大值'))
        }
        callback()
    }
}
const validateOtherMin = (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入其他(成年)最小值！'))
    } else {
        if (value >= ruleForm.value.otherMax) {
            callback(new Error('其他(成年)最小值不能大于等于其他(成年)最大值'))
        }
        callback()
    }
}
const validateOldOtherMin = (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入其他(老年)最小值！'))
    } else {
        if (value >= ruleForm.value.oldOtherMax) {
            callback(new Error('其他(老年)最小值不能大于等于其他(老年)最大值'))
        }
        callback()
    }
}

//#endregion

//自行删除非必填规则
const rules = ref<FormRules>({
    productInspectionId: [{ required: true, message: '请输入检查类目！', trigger: 'change' }],
    name: [{ required: true, message: '请输入项目名称！', trigger: 'blur' }],
    unit: [{ required: true, message: '请输入项目单位！', trigger: 'blur' }],
    youngDogMax: [{ required: true, message: '请输入犬(幼年)最大值！', trigger: 'blur' }],
    youngDogMin: [{ validator: validateYoungDogMin, trigger: 'blur' }],
    dogMax: [{ required: true, message: '请输入犬(成年)最大值！', trigger: 'blur' }],
    dogMin: [{ validator: validateDogMin,trigger: 'blur' }],
    oldDogMax: [{ required: true, message: '请输入犬(老年)最大值！', trigger: 'blur' }],
    oldDogMin: [{ validator: validateOldDogMin, trigger: 'blur' }],
    youngCatMax: [{ required: true, message: '请输入猫(幼年)最大值！', trigger: 'blur' }],
    youngCatMin: [{ validator: validateYoungCatMin, trigger: 'blur' }],
    catMax: [{ required: true, message: '请输入猫(成年)最大值！', trigger: 'blur' }],
    catMin: [{ validator: validateCatMin, trigger: 'blur' }],
    oldCatMax: [{ required: true, message: '请输入猫(老年)最大值！', trigger: 'blur' }],
    oldCatMin: [{ validator: validateOldCatMin, trigger: 'blur' }],
    youngOtherMax: [{ required: true, message: '请输入其他(幼年)最大值！', trigger: 'blur' }],
    youngOtherMin: [{ validator: validateYoungOtherMin, trigger: 'blur' }],
    otherMax: [{ required: true, message: '请输入其他(老年)最大值！', trigger: 'blur' }],
    otherMin: [{ validator: validateOtherMin, trigger: 'blur' }],
    oldOtherMax: [{ required: true, message: '请输入其他(老年)最大值！', trigger: 'blur' }],
    oldOtherMin: [{ validator: validateOldOtherMin, trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (row: any) => {
    ruleForm.value = other.deepClone(row);
    isShowDialog.value = true;
};

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
            if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
                await getAPI(ProductInspectionDetailApi).apiProductInspectionDetailEditPut(values);
            } else {
                await getAPI(ProductInspectionDetailApi).apiProductInspectionDetailAddPost(values);
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
