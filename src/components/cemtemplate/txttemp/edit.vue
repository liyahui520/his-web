<template>
	<div>
		<el-dialog v-model="state.isShowDialog" width="460px" draggable :close-on-click-modal="false" destroy-on-close>
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" status-icon>
				<el-form-item label="模板名称" prop="name">
					<el-input v-model="ruleForm.name" />
				</el-form-item>
                <el-form-item label="内容" prop="content">
					<el-input v-model="ruleForm.content" :rows="6" type="textarea"/>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">取 消</el-button>
					<el-button type="primary" @click="onSubmit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="txttemp">
import { reactive, nextTick, ref, defineAsyncComponent } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { ElMessage } from 'element-plus';
import { CemTemplateApi } from '/@/api-services/api';
const props = defineProps({
	title: {
		type: String,
		default: () => '',
	},
});

const ruleFormRef = ref();
const type = ref(0);
const ruleForm = ref({ name: '', content: '' });

const rules = {
	name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
	content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
};

const emits = defineEmits(['reload']);
// 定义变量内容
const state = reactive({
	isShowDialog: false,
	cropperImg: '',
	cropperImgBase64: '',
	cropper: '' as RefType,
});

// 打开弹窗
const openDialog = (content:any) => {
	ruleForm.value=JSON.parse(JSON.stringify(content)); 
	state.isShowDialog = true;
	nextTick(() => {});
};
// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};

//保存
const onSubmit = async () => { 
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			await getAPI(CemTemplateApi)
				.apiCemTemplateTypeIdEditPut(ruleForm.value.type,ruleForm.value.id, ruleForm.value)
				.then((_) => {
					ElMessage.success("保存成功");
                    emits("reload");
					closeDialog();
				});
		} else {
			ElMessage({
				message: `表单有${Object.keys(fields).length}处验证失败，请修改后再提交`,
				type: 'error',
			});
		}
	});
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style scoped lang="scss"></style>
