<template>
	<div class="specialSettings-container">
		<el-dialog v-model="isShowDialog" :title="props.title" :width="500" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
				<el-row :gutter="12">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="机构名称">
							{{ ruleForm.orgName }}
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="权益名称">
							{{ ruleForm.name }}
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="是否开启">
							<el-switch v-model="ruleForm.isOpen" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col>
					<el-col v-if="ruleForm.isOpen == 1" :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="到期日期" prop="expirationTime">
							<el-date-picker v-model="ruleForm.expirationTime" type="date" placeholder="请选择到期日期" :disabled-date="disabledDate" />
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
import { SysSpecialSettingApi } from '/@/api-services/api';
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
//自行删除非必填规则
const rules = ref<FormRules>({
	expirationTime: [{ required: true, message: '请选择到期日期！', trigger: 'change' }],
});

// 打开弹窗
const openDialog = (row: any) => {
	ruleForm.value = other.deepClone(row);
	isShowDialog.value = true;
};
const disabledDate = (time: Date) => {
  return time.getTime() <= Date.now()
}
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
				await getAPI(SysSpecialSettingApi).apiSysSpecialSettingUpdateSpecialSettingInfoPost(values);
			}

			closeDialog();
		}
	});
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
