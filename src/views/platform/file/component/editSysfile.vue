<template>
	<div class="sys-file-container">
		<el-dialog v-model="state.isShowDialog" draggable overflow destroy-on-close width="500px">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span> {{ props.title }} </span>
				</div>
			</template>
			<el-form :model="state.ruleForm" ref="ruleFormRef" label-width="auto">
				<el-row>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="文件名称" prop="fileName" :rules="[{ required: true, message: '文件名称不能为空', trigger: 'blur' }]">
							<el-input v-model="state.ruleForm.fileName" placeholder="文件名称" clearable />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="文件类型" prop="fileType">
							<el-select v-model="state.ruleForm.fileType" placeholder="请选择文件类型" style="margin-bottom: 10px">
								<el-option label="相关文件" value="相关文件" />
								<el-option label="归档文件" value="归档文件" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否公开">
							<el-radio-group v-model="state.ruleForm.isPublic">
								<el-radio :value="false">否</el-radio>
								<el-radio :value="true">是</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取 消</el-button>
					<el-button type="primary" @click="submit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="sysEditFile">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

import { getAPI } from '/@/utils/axios-utils';
import { SysFileApi } from '/@/api-services/api';
import { FileInput } from '/@/api-services/models';
import other from '/@/utils/other';

const props = defineProps({
	title: String,
	sysFileId: Number,
});
const emits = defineEmits(['handleQuery']);
const ruleFormRef = ref();
const state = reactive({
	isShowDialog: false,
	ruleForm: {} as FileInput,
});

// 打开弹窗
const openDialog = (row: any) => {
	state.ruleForm = other.deepClone(row) as any;
	state.isShowDialog = true;
	ruleFormRef.value?.resetFields();
};

// 关闭弹窗
const closeDialog = () => {
	emits('handleQuery');
	state.isShowDialog = false;
};

// 取消
const cancel = () => {
	state.isShowDialog = false;
};

// 提交
const submit = () => {
	ruleFormRef.value.validate(async (valid: boolean) => {
		if (!valid) return;
		if (state.ruleForm.id != undefined && state.ruleForm.id > 0) {
			await getAPI(SysFileApi)
				.apiSysFileUpdatePost(state.ruleForm)
				.then((rsp: any) => {
					if (rsp.data.code == 200) {
						ElMessage.success('修改文件信息成功！');
					} else {
						ElMessage.error('修改文件信息失败：' + rsp.data.message);
					}
				});
		}
		closeDialog();
	});
};

// 导出对象
defineExpose({ openDialog });
</script>
