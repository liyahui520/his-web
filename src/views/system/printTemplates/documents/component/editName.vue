<template>
	<div class="documentTemplate-container">
		<el-dialog v-model="isShowDialog" :title="props.title" :width="'20%'" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
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
import { DocumentTemplateApi } from '/@/api-services/api';
import other from '/@/utils/other';
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
const ruleForm = ref<any>({ name: '', id: 0 });
const ruleFormRef = ref();
const isShowDialog = ref(false);

const emit = defineEmits(['reload']);

//自行删除非必填规则
const rules = ref<FormRules>({
	name: [{ required: true, message: '请输入文书名称！', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (row: any) => {
	ruleForm.value = other.deepClone(row);
	isShowDialog.value = true;
	ruleFormRef.value?.resetFields();
};

// 关闭弹窗
const closeDialog = () => {
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
			if (ruleForm.value.id > 0) {
				await getAPI(DocumentTemplateApi)
					.apiDocumentTemplateIdRenameNamePut(ruleForm.value.id, ruleForm.value.name)
					.then((_) => {
						emit('reload', ruleForm.value);
					});
			} else
				await getAPI(DocumentTemplateApi)
					.apiDocumentTemplateAddPost(ruleForm.value)
					.then((_) => {
						let row = (_.data as any)?.result ?? null;
						emit('reload', row);
					});
			closeDialog();
		}
	});
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
