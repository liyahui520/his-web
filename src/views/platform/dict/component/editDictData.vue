<template>
	<div class="sys-dictData-container">
		<el-dialog v-model="state.isShowDialog" draggable :close-on-click-modal="false" width="700px">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span> {{ props.title }} </span>
				</div>
			</template>
			<el-form :model="state.ruleForm" ref="ruleFormRef" label-width="auto">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="字典值" prop="value" :rules="[{ required: true, message: '字典值不能为空', trigger: 'blur' }]">
							<el-input v-model="state.ruleForm.value" placeholder="字典值" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="编码" prop="code" :rules="[{ required: true, message: '编码不能为空', trigger: 'blur' }]">
							<el-input v-model="state.ruleForm.code" placeholder="编码" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="名称" prop="name">
							<el-input v-model="state.ruleForm.name" placeholder="名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="标签类型">
							<el-radio-group v-model="state.ruleForm.tagType">
								<el-radio value="primary"><el-tag type="primary">主题色</el-tag></el-radio>
								<el-radio value="success"><el-tag type="success">success</el-tag></el-radio>
								<el-radio value="info"><el-tag type="info">info</el-tag></el-radio>
								<el-radio value="warning"><el-tag type="warning">warning</el-tag></el-radio>
								<el-radio value="danger"><el-tag type="danger" style="font:">danger</el-tag></el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="样式(Style)" prop="styleSetting">
							<el-input v-model="state.ruleForm.styleSetting" placeholder="样式(Style)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="样式(Class)" prop="classSetting">
							<el-input v-model="state.ruleForm.classSetting" placeholder="样式(Class)" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="状态">
							<el-radio-group v-model="state.ruleForm.status">
								<el-radio :value="1">启用</el-radio>
								<el-radio :value="2">禁用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序">
							<el-input-number v-model="state.ruleForm.orderNo" placeholder="排序" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="备注">
							<el-input v-model="state.ruleForm.remark" placeholder="请输入备注内容" clearable type="textarea" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="拓展数据">
							<el-input v-model="state.ruleForm.extData" placeholder="请输入拓展数据" clearable type="textarea" rows="6" />
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

<script lang="ts" setup name="sysEditDictData">
import { reactive, ref } from 'vue';

import { getAPI } from '/@/utils/axios-utils';
import { SysDictDataApi } from '/@/api-services/api';
import { UpdateDictDataInput } from '/@/api-services/models';
import other from '/@/utils/other';

const props = defineProps({
	title: String,
	dictTypeId: Number,
});
const emits = defineEmits(['handleQuery', 'handleUpdate']);
const ruleFormRef = ref();
const state = reactive({
	isShowDialog: false,
	ruleForm: {} as UpdateDictDataInput,
});

// 打开弹窗
const openDialog = (row: any) => {
	state.ruleForm = other.deepClone(row) as any;
	if (JSON.stringify(row) == '{}') {
		state.ruleForm.dictTypeId = props.dictTypeId;
	}
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
			await getAPI(SysDictDataApi).apiSysDictDataUpdatePost(state.ruleForm);
		} else {
			await getAPI(SysDictDataApi).apiSysDictDataAddPost(state.ruleForm);
		}
		emits('handleUpdate');
		closeDialog();
	});
};

// 导出对象
defineExpose({ openDialog });
</script>
