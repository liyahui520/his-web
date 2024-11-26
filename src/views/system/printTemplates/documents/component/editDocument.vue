<template>
    <div class="documentTemplate-container">
        <el-dialog v-model="isShowDialog" :title="props.title" :width="'80%'" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit />
                    </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
            <el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
                <el-row :gutter="35">
                    <el-form-item v-show="false">
                        <el-input v-model="ruleForm.id" />
                    </el-form-item>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                        <el-form-item label="文书名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入文书名称" clearable="" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" class="mb20">
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注"
                                maxlength="200"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                        <el-form-item label="模板内容">
                            <el-check-tag v-for="item in items" checked style="margin-right: 8px;margin-top: 8px;" @change="(status:boolean)=>{onChange(item)}" :key="item.label">{{ item.label }}</el-check-tag>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                        <el-form-item label="文书内容" prop="template">
                            <Editor ref="editorRef" :insert-node="insertNode" v-model:get-html="ruleForm.template" :height="'500px'" />
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
import Editor from '/@/components/editor/index.vue';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { DocumentTemplateApi } from '/@/api-services/api';
import other from '/@/utils/other';
//父级传递来的参数
var props = defineProps({
    title: {
        type: String,
        default: '',
    },
});
const insertNode=ref('');
const onChange = (item: any) => {
  insertNode.value=`<cus>${item.label}</cus>`;
}
const items = ref<any>([
  { label: '机构名称' },
  { label: '机构地址' },
  { label: '机构联系方式' },
  { label: '宠主姓名' },
  { label: '宠主联系方式' },
  { label: '宠主会员编号' },
  { label: '宠主会员级别' },
  { label: '宠主备注' },
  { label: '宠物名称' },
  { label: '宠物种类' },
  { label: '宠物品种' },
  { label: '宠物病例编号' },
  { label: '宠物性别' },
  { label: '宠物年龄' },
  { label: '宠物颜色' },
  { label: '宠物体重' }
])
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const editorRef = ref();
const isShowDialog = ref(false);
const ruleForm = ref<any>({});
//自行删除非必填规则
const rules = ref<FormRules>({
    name: [{ required: true, message: '请输入文书名称！', trigger: 'blur' }],
    template: [{ required: true, message: '请输入文书内容！', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (row: any) => {
    ruleForm.value = other.deepClone(row);
    isShowDialog.value = true;
    ruleFormRef.value?.resetFields();
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
                await getAPI(DocumentTemplateApi).apiDocumentTemplateEditPost(values);
            } else {
                await getAPI(DocumentTemplateApi).apiDocumentTemplateAddPost(values);
            }
            closeDialog();
        }
    });
};

// 页面加载时
onMounted(async () => {

});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
