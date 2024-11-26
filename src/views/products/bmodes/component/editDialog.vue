<template>
    <div class="product-bModes-container">
        <el-dialog v-model="isShowDialog" :title="props.title" width="50%" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
                        <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
            <el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="所属目录" prop="categoryArr">
                            <el-cascader ref="categoryRef" separator=">" v-model="ruleForm.categoryArr" :props="carcerProp"
                                :options="props.productCategorysData" filterable clearable style="width: 100%;">
                                <template #default="{ node, data }">
                                    <span>{{ data.label }}</span>
                                    <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                                </template>
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="编码">
                            <el-input v-model="ruleForm.serialNumber" placeholder="请输入编码" clearable="" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="35">
                    <el-form-item v-show="false">
                        <el-input v-model="ruleForm.id" />
                    </el-form-item>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入名称" clearable="" @change="pinyin" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="条形码" prop="barCode">
                            <el-input v-model="ruleForm.barCode" placeholder="请输入条形码" clearable="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="缩写" prop="nameLetter">
                            <el-input v-model="ruleForm.nameLetter" placeholder="请输入缩写" clearable="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="英文名称" prop="englishName">
                            <el-input v-model="ruleForm.englishName" placeholder="请输入英文名称" clearable="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="通用名称" prop="commonName">
                            <el-input v-model="ruleForm.commonName" placeholder="请输入通用名称" clearable="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="单位" prop="outUnitId">
                            <el-select v-model="ruleForm.outUnitId" filterable placeholder="请选择单位" style="width: 100%;">
                                <el-option v-for="item in unitData" :key="item.id" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="销售价格" prop="salePrice">
                            <el-input-number v-model="ruleForm.salePrice" :precision="2" :step="1" :max="999999999"
                                :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="会员价格" prop="memberPrice">
                            <el-input-number v-model="ruleForm.memberPrice" :precision="2" :step="1" :max="999999999"
                                :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="参与打折" prop="isDiscount">
                            <el-switch v-model="ruleForm.isDiscount" active-text="是" inactive-text="否" />
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="可销" prop="canSale">
                            <el-switch v-model="ruleForm.canSale" active-text="是" inactive-text="否" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="mb20">
                        <el-form-item label="注意事项" prop="notice">
                            <el-input type="textarea" v-model="ruleForm.notice" placeholder="请输入注意事项"
                                maxlength="200"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="mb20">
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注"
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
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { ProductBModeApi } from '/@/api-services/api';
import p from 'js-pinyin'
import { useUserInfo } from '/@/stores/userInfo';
import other from '/@/utils/other';

const stores = useUserInfo();

//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: '',
    },
    productCategorysData: {
        type: Array,
        default: [] as any
    }
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const ruleForm = ref<any>({});
const unitData = ref<any>([]);
const carcerProp = ref<any>({ checkStrictly: true, value: 'id' })
//自行删除非必填规则
const rules = ref<FormRules>({
    categoryArr: [{ required: true, message: '请选择目录！', trigger: 'change' }],
    name: [{ required: true, message: '请输入名称！', trigger: 'blur' }],
    salePrice: [{ required: true, message: '请输入销售价格！', trigger: 'blur' }],
    memberPrice: [{ required: true, message: '请输入会员价格！', trigger: 'blur' }],
    outUnitId: [{ required: true, message: '请选择单位！', trigger: 'blur' }],
});

const resetForm = (formEl: any) => {
    if (!formEl) return
    formEl.value.resetFields();
}

//转换拼音
const pinyin = async () => {
    ruleForm.value.englishName = p.getFullChars(ruleForm.value.name);
    ruleForm.value.nameLetter = p.getCamelChars(ruleForm.value.name);
}

const loadUnitData = async () => {
    var res = stores.productUnits;
    unitData.value = res ?? [];
};
// 打开弹窗
const openDialog = (row: any) => {
    ruleForm.value = other.deepClone(row);
    isShowDialog.value = true;
    ruleForm.value.categoryArr= findParentIds(props.productCategorysData,ruleForm.value.categoryId,[]);
};
const findParentIds=(tree:any, targetId:any, parentIds = <any>[])=> {
  for (const node of tree) {
    if (node.id === targetId) {
      parentIds.push(node.id);
      return parentIds;
    }
    if (node.children && node.children.length > 0) {
      const result = findParentIds(node.children, targetId, parentIds.concat(node.id));
      if (result) {
        return result;
      }
    }
  }
  return null;
}
// 关闭弹窗
const closeDialog = () => {
    emit('reloadTable');
    resetForm(ruleFormRef);
    isShowDialog.value = false;
};

// 取消
const cancel = () => {
    resetForm(ruleFormRef);
    isShowDialog.value = false;
};

// 提交
const submit = async () => {
    ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
        if (isValid) {
            let values = ruleForm.value;
            values.categoryId = ruleForm.value.categoryArr[ruleForm.value.categoryArr.length - 1];
            if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
                await getAPI(ProductBModeApi).apiProductBModeEditPost(values);
            } else {
                await getAPI(ProductBModeApi).apiProductBModeAddPost(values);
            }
            closeDialog();
        }
    });
};

// 页面加载时
onMounted(async () => {

    await loadUnitData();
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.product-bModes-container {
}
</style>
