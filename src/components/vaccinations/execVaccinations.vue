<template>
	<div class="delay-vaccinations-container">
		<el-dialog v-model="isShowDialog" :title="props.title" :width="700" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px">
				<el-row :gutter="35">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
						<el-input v-model="ruleForm.grouping" />
					</el-form-item>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="预接种时间">
							<span>{{formatDate(new Date(ruleForm.expectVaccinations), 'YYYY-mm-dd') }}</span>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="执行日期">
							<el-date-picker v-model="ruleForm.execTime" :clearable="false" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="调整所有时间">
							<el-switch v-model="ruleForm.isAllDelay" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel" size="default">取 消</el-button>
					<el-button type="primary" :disabled="submitLoading" @click="submit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { formatDate } from '/@/utils/formatTime';
import { getAPI } from '/@/utils/axios-utils';
import { VaccinationApi } from '/@/api-services/api';
import other from '/@/utils/other';
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const ruleForm = ref<any>({});
const submitLoading = ref(false);
// 打开弹窗
const openDialog = (row: any) => {
	ruleForm.value = other.deepClone(row);
	ruleForm.value.execTime = formatDate(new Date(), 'YYYY-mm-dd');
	isShowDialog.value = true;
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
			submitLoading.value = true;
			let values = ruleForm.value;
			await getAPI(VaccinationApi)
				.apiVaccinationVaccinationExecPost(values)
				.catch((err: any) => {
					submitLoading.value = false;
				});
			submitLoading.value = false;
			closeDialog();
		}
	});
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
