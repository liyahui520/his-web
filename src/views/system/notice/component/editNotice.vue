<template>
	<div class="sys-notice-container">
		<el-dialog v-model="state.isShowDialog" draggable :close-on-click-modal="false" width="900px">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span> {{ props.title }} </span>
				</div>
			</template>
			<el-form :model="state.ruleForm" ref="ruleFormRef" label-width="auto">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="标题" prop="title" :rules="[{ required: true, message: '标题不能为空', trigger: 'blur' }]">
							<el-input v-model="state.ruleForm.title" placeholder="标题" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="类型" prop="type" :rules="[{ required: true, message: '类型不能为空', trigger: 'blur' }]">
							<el-select v-model="state.ruleForm.type" placeholder="类型" filterable allow-create default-first-option style="width: 100%">
								<el-option label="通知" :value="1" />
								<el-option label="公告" :value="2" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="内容" prop="content" :rules="[{ required: true, message: '内容不能为空', trigger: 'blur' }]">
							<Editor v-model:get-html="state.ruleForm.content" />
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

<script lang="ts" setup name="sysNoticeEdit">
import { reactive, ref } from 'vue';
import Editor from '/@/components/editor/index.vue';

import { getAPI } from '/@/utils/axios-utils';
import { SysNoticeApi } from '/@/api-services/api';
import { UpdateNoticeInput } from '/@/api-services/models';
import other from '/@/utils/other';

const props = defineProps({
	title: String,
});
const emits = defineEmits(['handleQuery']);
const ruleFormRef = ref();
const state = reactive({
	isShowDialog: false,
	ruleForm: {} as UpdateNoticeInput,
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
			await getAPI(SysNoticeApi).apiSysNoticeUpdatePost(state.ruleForm);
		} else {
			await getAPI(SysNoticeApi).apiSysNoticeAddPost(state.ruleForm);
		}
		closeDialog();
	});
};

// 导出对象
defineExpose({ openDialog });
</script>
