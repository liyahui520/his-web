<template>
	<div class="inHospital-Nures-edit">
		<el-dialog v-model="isShowDialog" :title="props.title" width="700" draggable :close-on-click-modal="false">
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
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="护理名称" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入护理名称" clearable="" />
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="护理类型" prop="inHospitalType">
							<el-radio-group v-model="ruleForm.inHospitalType" :disabled="ruleForm.id > 0">
								<el-radio border :value="0">住院</el-radio>
								<el-radio border :value="1">寄养</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="收费类型" prop="inHospitalCostType">
							<el-radio-group v-model="ruleForm.inHospitalCostType" :disabled="ruleForm.id > 0">
								<el-radio border :value="0">天</el-radio>
								<el-radio border :value="1">月</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20" v-if="ruleForm.inHospitalCostType == 0">
						<el-form-item label="销售价格" prop="salePrice">
							<el-input-number v-model="ruleForm.salePrice" :precision="2" :step="1" :max="999999999" :min="0"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20" v-if="ruleForm.inHospitalCostType == 0">
						<el-form-item label="会员价格" prop="memberPrice">
							<el-input-number v-model="ruleForm.memberPrice" :precision="2" :step="1" :max="999999999" :min="0"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20" v-if="ruleForm.inHospitalCostType == 1">
						<el-form-item label="销售价格" prop="monthSalePrice">
							<el-input-number v-model="ruleForm.monthSalePrice" :precision="2" :step="1" :max="999999999" :min="0"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20" v-if="ruleForm.inHospitalCostType == 1">
						<el-form-item label="会员价格" prop="monthMemberPrice">
							<el-input-number v-model="ruleForm.monthMemberPrice" :precision="2" :step="1" :max="999999999" :min="0"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="mb20">
						<el-form-item label="备注" prop="remark">
							<el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注" maxlength="200"></el-input>
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
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi } from '/@/api-services/api';
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
const ruleForm = ref<any>();
//自行删除非必填规则
const rules = ref<FormRules>({
	name: [{ required: true, message: '请输入护理名称！', trigger: 'blur' }],
	inHospitalType: [{ required: true, message: '请选择护理类型！', trigger: 'blur' }],
	inHospitalCostType: [{ required: true, message: '请选择收费类型！', trigger: 'blur' }],
	salePrice: [{ required: true, message: '请输入销售价格！', trigger: 'blur' }],
	memberPrice: [{ required: true, message: '请输入会员价格！', trigger: 'blur' }],
	monthSalePrice: [{ required: true, message: '请输入销售价格！', trigger: 'blur' }],
	monthMemberPrice: [{ required: true, message: '请输入会员价格！', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (row: any) => {
	ruleForm.value = other.deepClone(row);
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
			let values = ruleForm.value;
			if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
				await getAPI(InHospitalApi).apiInHospitalEditNursePost(values);
			} else {
				await getAPI(InHospitalApi).apiInHospitalAddNursePost(values);
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
