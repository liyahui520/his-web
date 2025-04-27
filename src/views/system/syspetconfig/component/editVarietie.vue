<template>
	<div class="sys-varietie-container">
		<el-dialog v-model="state.isShowDialog" draggable width="600px">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span> {{ props.title }} </span>
				</div>
			</template>
			<el-form :model="state.ruleForm" ref="ruleFormRef" size="default" label-width="80px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="品种名称" prop="name" :rules="[{ required: true, message: '品种名称不能为空', trigger: 'blur' }]">
							<el-input v-model="state.ruleForm.name" @change="pinyin" placeholder="字典值" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="品种拼音" prop="englishName">
							<el-input v-model="state.ruleForm.englishName" placeholder="编码" clearable disabled />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序">
							<el-input-number v-model="state.ruleForm.order" placeholder="排序" class="w100" />
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

<script lang="ts" setup name="sysEditVarietie">
import { reactive, ref } from 'vue';
import p from 'js-pinyin';
import { getAPI } from '/@/utils/axios-utils';
import { SysPcuPetConfigApi } from '/@/api-services/api';
import { EditSysPetVarietieInput } from '/@/api-services/models/pets/varietie/edit-pet-varietie-input';
import other from '/@/utils/other';

const emits = defineEmits(['submitRefreshDictData']);
const props = defineProps({
	title: String,
	kindId: String,
});

const ruleFormRef = ref();
const state = reactive({
	isShowDialog: false,
	ruleForm: {} as EditSysPetVarietieInput,
});

// 打开弹窗
const openDialog = (row: any) => {
	state.ruleForm = other.deepClone(row) as any;
	if (JSON.stringify(row) == '{}') {
		state.ruleForm.kindId = <number>props.kindId;
	}
	state.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	emits('submitRefreshDictData');
	state.isShowDialog = false;
};

// 取消
const cancel = () => {
	state.isShowDialog = false;
};
//转换拼音
const pinyin = async () => {
	state.ruleForm.englishName = p.getFullChars(state.ruleForm.name);
};
// 提交
const submit = () => {
	ruleFormRef.value.validate(async (valid: boolean) => {
		if (!valid) return;
		if (state.ruleForm.id != undefined && state.ruleForm.id > 0) {
			await getAPI(SysPcuPetConfigApi).apiSysPcuPetConfigIdEditVarietiePut(state.ruleForm.id, state.ruleForm);
		} else {
			await getAPI(SysPcuPetConfigApi).apiSysPcuPetConfigAddVarietiePost(state.ruleForm);
		}
		closeDialog();
	});
};

// 导出对象
defineExpose({ openDialog });
</script>
