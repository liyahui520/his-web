<template>
	<div class="in-hospitals-add-hospital">
		<el-dialog v-model="isShowDialog" :title="props.title" width="70%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
				<el-row :gutter="8">
					<el-col :span="8">
						<el-card shadow="never" style="height: 550px;border: 1px solid var(--el-border-color-lighter);">
							<el-row :gutter="35">
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-text type="danger">
										1、如有正在诊疗中的病历，提交后则此病历会修改为住院病历。<br />
										2、如无正在诊疗中的病历，提交后则新增一条住院病历。<br />
									</el-text>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="会员名称" prop="customerName">
										<el-text style="margin-right: 10px;">{{ ruleForm.customerName }} </el-text>
										<el-button v-if="!ruleForm.customerName" :icon="Search" @click="searchPetDialog"  circle />
										<el-button v-else :icon="Switch" @click="searchPetDialog"  circle />

										<!-- <el-input disabled v-model="ruleForm.customerName" style="max-width: 600px" placeholder="请选择用户" class="input-with-select">
											<template #append>
												<el-button :icon="Search" @click="searchPetDialog" />
											</template>
										</el-input> -->
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="联系方式"> {{ ruleForm.cellPhone }} </el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="宠物名称">{{ ruleForm.petName }}</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="品种">{{ ruleForm.petKindText }}</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="种类">{{ ruleForm.petVarietieText }}</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="开始时间" prop="startTime">
										<el-date-picker v-model="ruleForm.startTime" type="date" placeholder="请选择开始住院时间" />
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="负责人" prop="headId">
										<el-select v-model="ruleForm.headId" @change="headChange">
											<el-option v-for="item in doctorUserData" :key="item.id" :label="item.realName" :value="item.id" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="入院描述">
										<el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入入院描述" maxlength="200"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-card>
					</el-col>
					<el-col :span="16">
						<el-card shadow="never" style="height: 550px;border: 1px solid var(--el-border-color-lighter);">
							<el-text type="danger">注：只能选择一个笼位。</el-text>
							<el-table ref="tableDataRef" :data="tableData" v-loading="loading" style="height: 490px" tooltip-effect="light" row-key="id" border empty-text="暂无空余笼位">
								<el-table-column type="selection" align="center" width="55" />
								<el-table-column label="名称" prop="name" width="150" show-overflow-tooltip="" />
								<el-table-column label="位置" prop="location" width="120" show-overflow-tooltip="" />
								<el-table-column label="大小" prop="size" width="120" show-overflow-tooltip="" />
								<el-table-column label="销售价格" align="left" show-overflow-tooltip="">
									<template #default="scope">
										<div v-if="scope.row.inHospitalCostType == 0">{{ verifyNumberComma(scope.row?.salePrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
										<div v-if="scope.row.inHospitalCostType == 1">{{ verifyNumberComma(scope.row?.monthSalePrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
									</template>
								</el-table-column>
								<el-table-column label="会员价格" align="left" show-overflow-tooltip="">
									<template #default="scope">
										<div v-if="scope.row.inHospitalCostType == 0">{{ verifyNumberComma(scope.row?.memberPrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
										<div v-if="scope.row.inHospitalCostType == 1">{{ verifyNumberComma(scope.row?.monthMemberPrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
									</template>
								</el-table-column>
								<el-table-column label="状态" align="center" width="100">
									<template #default="scope">
										<el-tag type="success" v-if="scope.row.isEnable">启用</el-tag>
										<el-tag type="info" v-else>禁用</el-tag>
									</template>
								</el-table-column>
							</el-table>
						</el-card>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		<searchPet ref="searchPetRef" @reloadTable="selectPet" />
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi } from '/@/api-services/api';
import { Search,Switch } from '@element-plus/icons-vue';
import searchPet from '../component/searchPet.vue';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';
import { formatDate } from '/@/utils/formatTime';
import other from '/@/utils/other';

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '添加住院',
	},
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const searchPetRef = ref();
const loading = ref<any>(false);
const tableData = ref<any>([]);
const tableDataRef = ref<any>([]);
const isShowDialog = ref(false);
const ruleForm = ref<any>({});
const doctorUserData = ref<any>([]);
const doctorUserObject = ref<any>({});
const stores = useUserInfo();
const { userList } = storeToRefs(stores);
//自行删除非必填规则
const rules = ref<FormRules>({
	customerName: [{ required: true, message: '请选择用户！', trigger: 'blur' }],
	headId: [{ required: true, message: '请选择负责人！', trigger: 'change' }],
	startTime: [{ required: true, message: '请选择开始住院时间！', trigger: 'change' }],
});
// 打开弹窗
const openDialog = async (row: any) => {
	ruleForm.value =  other.deepClone(row);
	getUserList();
	ruleForm.value.headId= userList.value[0].id;
	ruleForm.value.headName = doctorUserObject.value[ruleForm.value.headId];
	ruleForm.value.startTime = formatDate(new Date(), 'YYYY-mm-dd');
	isShowDialog.value = true;
	await loadRoomsData();
};
/**
 * 变更
 * @param data
 */
const headChange = (value: any) => {
	ruleForm.value.headName = doctorUserObject.value[value];
};
/**
 * 获取负责人列表
 */
const getUserList = () => {
	doctorUserData.value = userList.value;
	doctorUserData.value.map((item: any) => {
		doctorUserObject.value[item.id] = item.realName;
	});
};
/**
 * 选择宠物回调
 * @param row 选中的宠物数据
 */
const selectPet = (rowData: any) => {
	ruleForm.value.customerName = rowData.customerName;
	ruleForm.value.cellPhone = rowData.cellPhone;
	ruleForm.value.customerId = rowData.id;
	ruleForm.value.petName = rowData.petName;
	ruleForm.value.petId = rowData.petId;
	ruleForm.value.petKindText = rowData.petKindText;
	ruleForm.value.petVarietieText = rowData.petVarietieText;
};

/**
 * 加载笼位数据
 */
const loadRoomsData = async () => {
	loading.value = true;
	tableData.value = [];
	await getAPI(InHospitalApi)
		.apiInHospitalGetRoomsListPost({ inHospitalType: ruleForm.value.inHospitalType })
		.then((res) => {
			let result = res.data.result ?? [];
			result.forEach((item: any) => {
				if (item.isEnable && !item.isOccupy) tableData.value.push(item);
			});
			loading.value = false;
		});
	loading.value = false;
};
/**
 * 搜索宠物
 */
const searchPetDialog = () => {
	searchPetRef.value.openDialog();
};
// 关闭弹窗
const closeDialog = () => {
	emit('reloadTable');
	isShowDialog.value = false;
};

// 提交
const submit = async () => {
	console.log('ruleForm.value', ruleForm.value);
	if (ruleForm.value.petName == '' || ruleForm.value.petName == null) {
		ElMessage.warning('请重新选择宠物');
		return;
	}
	let selectionRows = tableDataRef.value.getSelectionRows();
	if (selectionRows.length > 1) {
		ElMessage.warning('只能选择一个笼位');
		return;
	}
	if (selectionRows.length != 1) {
		ElMessage.warning('请选择一个笼位');
		return;
	}
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			ruleForm.value.roomId = selectionRows[0].id;
			ruleForm.value.roomName = selectionRows[0].name;
			ruleForm.value.roomVer = selectionRows[0].ver;
			let values = ruleForm.value;
			await getAPI(InHospitalApi)
				.apiInHospitalAddInHospitalsPost(values)
				.then(() => {
					ElMessage.success('住院成功');
					closeDialog();
				});
		}
	});
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style scope lang="scss">
.in-hospitals-add-hospital {
	.input-with-select .el-input-group__prepend {
		background-color: var(--el-fill-color-blank);
	}
}
</style>
