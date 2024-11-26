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
};

const emits = defineEmits(['uploadCropperImg']);
// 定义变量内容
const state = reactive({
	isShowDialog: false,
	cropperImg: '',
	cropperImgBase64: '',
	cropper: '' as RefType,
});

// 打开弹窗
const openDialog = (t, content) => {
	ruleForm.value={ name: '', content: '' }
	type.value = t;
	ruleForm.value.content = content;
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
	// ruleFormRef.value.va
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			await getAPI(CemTemplateApi)
				.apiCemTemplateTypeAddPost(type.value, ruleForm.value)
				.then((_) => {
					ElMessage({
						message: `保存成功`,
						type: 'error',
					});
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
