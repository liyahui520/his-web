<template>
	<div class="sys-print-container">
		<div class="printDialog">
			<el-dialog v-model="state.isShowDialog" draggable :close-on-click-modal="false" fullscreen>
				<template #header>
					<div style="color: #fff">
						<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
						<span> {{ props.title }} </span>
					</div>
				</template>
				<div style="margin: -16px 0px 0px 0px">
					<HiprintDesign ref="hiprintDesignRef" />
				</div>
				<template #footer>
					<span class="dialog-footer" style="margin-top: 10px">
						<el-button @click="cancel">取 消</el-button>
						<el-button type="primary" @click="submit">保存模板</el-button>
					</span>
				</template>
			</el-dialog>
		</div>

		<el-dialog v-model="state.showDialog2" draggable :close-on-click-modal="false" width="800px">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="state.ruleForm" ref="ruleFormRef" label-width="auto">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="模板名称" prop="name" :rules="[{ required: true, message: '模板名称不能为空', trigger: 'blur' }]">
							<el-input v-model="state.ruleForm.name" placeholder="模板名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序">
							<el-input-number v-model="state.ruleForm.orderNo" placeholder="排序" class="w100" />
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
						<el-form-item label="模板类型">
							<el-select v-model="state.ruleForm.printTempType"   class="w100">
								<el-option v-for="item in PrintTempTypeEnum" :key="item.value"
									:label="item.describe" :value="item.value"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="打印类型">
							<el-radio-group v-model="state.ruleForm.printType">
								<el-radio :value="1">浏览器打印</el-radio>
								<el-radio :value="2">客户端打印</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="客户端服务地址">
							<el-input v-model="state.ruleForm.clientServiceAddress" placeholder="客户端服务地址" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="打印参数">
							<el-input v-model="state.ruleForm.printParam" placeholder="请输入打印参数" clearable type="textarea" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="备注">
							<el-input v-model="state.ruleForm.remark" placeholder="请输入备注内容" clearable type="textarea" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="templateCancel">取 消</el-button>
					<el-button type="primary" @click="templateSubmit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="sysEditPrint">
import { onMounted, reactive, ref, nextTick } from 'vue';
import HiprintDesign from '/@/views/platform/print/component/hiprint/index.vue';
import { getAPI } from '/@/utils/axios-utils';
import { SysPrintApi,SysEnumApi } from '/@/api-services/api';
import { UpdatePrintInput } from '/@/api-services/models';
import other from '/@/utils/other';

const hiprintDesignRef = ref<InstanceType<typeof HiprintDesign>>();

const props = defineProps({
	title: String,
});
const emits = defineEmits(['handleQuery']);
const ruleFormRef = ref();
const PrintTempTypeEnum = ref<any>([]);
const state = reactive({
	isShowDialog: false,
	ruleForm: {} as UpdatePrintInput,
	showDialog2: false,
});

onMounted(async () => {});

// 打开弹窗
const openDialog = async(row: any) => {
	state.ruleForm = other.deepClone(row) as any;
	state.isShowDialog = true;
	ruleFormRef.value?.resetFields();
	var r = await getAPI(SysEnumApi).apiSysEnumEnumDataListGet('PrintTempType');
        let result=r.data?.result ?? [];
		PrintTempTypeEnum.value=result;
	nextTick(() => {
		loadTemplate();
	});
};

// 加载模板
const loadTemplate = () => {
	hiprintDesignRef.value?.hiprintTemplate.clear();
	if (JSON.stringify(state.ruleForm) !== '{}') {
		hiprintDesignRef.value?.hiprintTemplate.update(JSON.parse(state.ruleForm.template));
		hiprintDesignRef.value?.initPaper();
	}
};

// 取消
const cancel = () => {
	state.isShowDialog = false;
};

// 提交
const submit = async () => {
	state.showDialog2 = true;
	if (state.ruleForm.orderNo == undefined) state.ruleForm.orderNo = 100;
	if (state.ruleForm.status == undefined) state.ruleForm.status = 1;
	if (state.ruleForm.printType == undefined) state.ruleForm.printType = 1;
};

// 模板设置取消
const templateCancel = () => {
	state.showDialog2 = false;
};

// 模板设置提交
const templateSubmit = async () => {
	state.ruleForm.template = JSON.stringify(hiprintDesignRef.value?.hiprintTemplate.getJson());
	if (state.ruleForm.id != undefined && state.ruleForm.id > 0) {
		await getAPI(SysPrintApi).apiSysPrintUpdatePost(state.ruleForm);
	} else {
		await getAPI(SysPrintApi).apiSysPrintAddPost(state.ruleForm);
	}
	cancel();
	templateCancel();
	emits('handleQuery');
};

// 导出对象
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.printDialog {
	:deep(.el-dialog) {
		.el-dialog__header {
			display: none !important;
		}
		.el-dialog__body {
			max-height: calc(100vh - 80px) !important;
		}
	}
}
</style>
