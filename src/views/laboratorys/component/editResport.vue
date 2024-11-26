<template>
	<div class="productBrands-container">
		<el-dialog v-model="isShowDialog" :title="props.title" width="75%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-card class="full-table" shadow="hover" style="margin-top: 8px">
				<template #header>
					<el-row justify="space-between">
						<el-col :span="22">
							<span>化验明细</span>
						</el-col>
						<el-col :span="2">
							<el-button icon="ele-Plus" size="small" type="primary" @click="addItem"> 新增 </el-button>
						</el-col>
					</el-row>
				</template>

				<el-form :model="ruleForm" ref="ruleFormRef" label-width="100px" size="default" :rules="rules">
					<el-table :data="ruleForm.cemRecordTestItemResults" style="height: 500px" v-loading="tableLoading" tooltip-effect="light" border>
						<el-table-column type="index" label="序号" width="55" align="center" />
						<el-table-column prop="name" label="项目" width="200">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`name${scope.$index}`"
									:prop="'cemRecordTestItemResults.' + scope.$index + '.name'"
									:rules="rules.name"
									:inline-message="true"
									style="margin-bottom: 0px"
								>
									<el-input v-model="scope.row.name" placeholder="请输入项目名称" clearable="" />
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="unit" label="单位" width="200">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`unit${scope.$index}`"
									:prop="'cemRecordTestItemResults.' + scope.$index + '.unit'"
									:rules="rules.unit"
									:inline-message="true"
									style="margin-bottom: 0px"
								>
									<el-input v-model="scope.row.unit" placeholder="请输入单位" clearable="" />
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column v-if="ruleForm.type == ProductTypeEnums.NUMBER_110001" prop="maxValue" label="最大值" width="200">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`maxValue${scope.$index}`"
									:prop="'cemRecordTestItemResults.' + scope.$index + '.maxValue'"
									:rules="rules.maxValue"
									:inline-message="true"
									style="margin-bottom: 0px"
								>
									<el-input v-model="scope.row.maxValue" placeholder="请输入最大值" clearable="" />
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column v-if="ruleForm.type == ProductTypeEnums.NUMBER_110001" prop="minValue" label="最小值" width="200">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`minValue${scope.$index}`"
									:prop="'cemRecordTestItemResults.' + scope.$index + '.minValue'"
									:rules="rules.minValue"
									:inline-message="true"
									style="margin-bottom: 0px"
								>
									<el-input v-model="scope.row.minValue" placeholder="请输入最小值" clearable="" />
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column label="结果值" width="200">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`resultValue${scope.$index}`"
									:prop="'cemRecordTestItemResults.' + scope.$index + '.resultValue'"
									:rules="rules.resultValue"
									:inline-message="true"
									style="margin-bottom: 0px"
								>
									<el-input v-model="scope.row.resultValue" placeholder="请输入结果值" clearable="" />
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column label="备注">
							<template #default="scope">
								<el-form-item label-width="0" :key="`remark${scope.$index}`" :prop="'cemRecordTestItemResults.' + scope.$index + '.remark'" :inline-message="true" style="margin-bottom: 0px">
									<el-input v-model="scope.row.remark" placeholder="请输入备注" clearable="" />
								</el-form-item>
							</template>
						</el-table-column>
					</el-table>
					<el-row style="margin-top: 10px">
						<el-col :span="8">
							<el-form-item label="报告时间" prop="inspectTime">
								<el-date-picker
									v-model="ruleForm.inspectTime"
									style="width: 100%"
									type="datetime"
									format="YYYY-MM-DD HH:mm:ss"
									value-format="YYYY-MM-DD HH:mm:ss"
									placeholder="报告时间"
									:disabled-date="disabledDate"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="检查医生" prop="inspectDoctorId">
								<el-select v-model="ruleForm.inspectDoctorId" @change="inspectDoctorChange" clearable>
									<el-option v-for="item in doctorUserData" :key="item.id" :label="item.realName" :value="item.id" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="助理">
								<el-select v-model="ruleForm.assistantId" clearable @change="assistantChange">
									<el-option v-for="item in assistantUserData" :key="item.id" :label="item.realName" :value="item.id" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px">
						<el-col :span="16">
							<el-form-item label="备注">
								<el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注" :rows="3" clearable="" maxlength="500" show-word-limit />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-card>
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
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';
import { getAPI } from '/@/utils/axios-utils';
import { LaboratoryApi } from '/@/api-services/api';
import { ProductTypeEnums } from '/@/api-services';
import other from '/@/utils/other';
import { addDaysToDate, formatDate } from '/@/utils/formatTime';

//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
const isShowDialog = ref(false);
const tableLoading = ref(false);
const ruleForm = ref<any>({});
const ruleFormRef = ref();
const editType = ref(false);
const stores = useUserInfo();
const { userList } = storeToRefs(stores);
const doctorUserData = ref<any>([]);
const assistantUserData = ref<any>([]);
const doctorUserObject = ref<any>({});
const assistantUserObject = ref<any>({});
// 打开弹窗
const openDialog = async (row: any) => {
	isShowDialog.value = true;
	ruleForm.value = other.deepClone(row);
	if (!ruleForm.value.inspectTime) {
		ruleForm.value.inspectTime = formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS');
	}
	if (!ruleForm.value.inspectDoctorId) {
		ruleForm.value.inspectDoctorId = null;
	}
	editType.value = ruleForm.value.isEdit;
	await getUserList();
	if (editType.value) {
		ruleForm.value = { ...ruleForm.value, inspectDoctorName: '', assistantName: '' };
	}
};
const disabledDate = (date: any) => {
	return new Date(date) <= new Date(addDaysToDate(new Date(), -1));
};
/**
 * 新增一行检查项目数据
 * @param value
 */
const addItem = () => {
	ruleForm.value.cemRecordTestItemResults.push({
		id: 0,
		testItemId: 0,
		name: '',
		chName: '',
		unit: '',
		remark: '',
		maxValue: '',
		minValue: '',
		resultValue: '',
	});
};

/**
 * 助理变更
 * @param value
 */
const assistantChange = (value: any) => {
	ruleForm.value.assistantName = assistantUserObject.value[value];
};
/**
 * 检查医生变更
 * @param value
 */
const inspectDoctorChange = (value: any) => {
	ruleForm.value.inspectDoctorName = doctorUserObject.value[value];
};

//自行删除非必填规则
const rules = ref<FormRules>({
	inspectDoctorId: [{ required: true, message: '请选择检查医生！', trigger: 'change' }],
	inspectTime: [{ required: true, message: '请选择报告时间！', trigger: 'change' }],
	name: [{ required: true, message: '请输入项目名称！', trigger: 'blur' }],
	unit: [{ required: true, message: '请输入单位！', trigger: 'blur' }],
	maxValue: [{ required: true, message: '请输入最大值！', trigger: 'blur' }],
	minValue: [{ required: true, message: '请输入最小值！', trigger: 'blur' }],
	resultValue: [{ required: true, message: '请输入结果值！', trigger: 'blur' }],
});
/**
 * 获取医生列表
 */
const getUserList = async () => {
	doctorUserData.value = userList.value;
	doctorUserData.value.map((item: any) => {
		doctorUserObject.value[item.id] = item.realName;
	});
	assistantUserData.value = userList.value;
	assistantUserData.value.map((item: any) => {
		assistantUserObject.value[item.id] = item.realName;
	});
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
	if (ruleForm.value.cemRecordTestItemResults.length <= 0) {
		ElMessage.warning('至少填写一条明细！');
		return;
	}
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			ruleForm.value.assistantName = assistantUserObject.value[ruleForm.value.assistantId];
			ruleForm.value.inspectDoctorName = doctorUserObject.value[ruleForm.value.inspectDoctorId];
			await getAPI(LaboratoryApi).apiLaboratoryEditReportTestResultPost(ruleForm.value);
			closeDialog();
		}
	});
};

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
