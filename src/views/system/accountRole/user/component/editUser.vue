<template>
	<div class="sys-user-container-edit">
		<el-dialog v-model="state.isShowDialog" draggable :close-on-click-modal="false" width="700px">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-tabs v-loading="state.loading" v-model="state.selectedTabName">
				<el-tab-pane label="基础信息" style="height: 450px; overflow-y: auto; overflow-x: hidden;background-color: #ffffff;" >
					<el-form :model="state.ruleForm" ref="ruleFormRef" label-width="auto">
						<el-row :gutter="35">
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="登录账号" prop="account" :rules="[{ required: true, message: '登录账号不能为空', trigger: 'blur' }]">
									<el-input v-model="state.ruleForm.account" placeholder="登录账号" clearable />
								</el-form-item>
							</el-col>
							<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item
									label="密码"
									prop="password"
									:rules="[{ required: state.ruleForm.id == undefined || (state.ruleForm.id != undefined && state.ruleForm.editPassword), message: '密码不能为空', trigger: 'blur' }]"
								>
									<el-input v-model="state.ruleForm.password" type="password" :disabled="!state.ruleForm.editPassword" show-password placeholder="密码" clearable>
										<template v-if="state.ruleForm.id != undefined" #append>
											<el-button :icon="Edit" @click="handlePassword" />
										</template>
									</el-input>
								</el-form-item>
							</el-col> -->
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="昵称">
									<el-input v-model="state.ruleForm.nickName" placeholder="昵称" clearable />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="真实姓名" prop="realName" :rules="[{ required: true, message: '真实姓名不能为空', trigger: 'blur' }]">
									<el-input v-model="state.ruleForm.realName" placeholder="真实姓名" clearable />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="性别">
									<el-radio-group v-model="state.ruleForm.sex">
										<el-radio :value="1">男</el-radio>
										<el-radio :value="2">女</el-radio>
										<el-radio :value="3">其他</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="角色集合" prop="roleIdList" :rules="[{ required: true, message: '角色集合不能为空', trigger: 'blur' }]">
									<el-select
										:disabled="state.ruleForm.isSystem"
										v-model="state.ruleForm.roleIdList"
										multiple
										value-key="id"
										clearable
										placeholder="角色集合"
										collapse-tags
										collapse-tags-tooltip
										class="w100"
										filterable
									>
										<el-option v-for="item in state.roleData" :key="item.id" :label="item.name" :value="item.id" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="手机号码">
									<el-input v-model="state.ruleForm.phone" placeholder="手机号码" clearable />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="邮箱">
									<el-input v-model="state.ruleForm.email" placeholder="邮箱" clearable />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="执业兽医证号">
									<el-input v-model="state.ruleForm.idCardNum" placeholder="执业兽医证号" clearable />
								</el-form-item>
							</el-col>
							<el-divider border-style="dashed" content-position="center">
								<div style="color: #b1b3b8">机构组织</div>
							</el-divider>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="所属机构" prop="orgId" :rules="[{ required: true, message: '所属机构不能为空', trigger: 'blur' }]">
									<el-cascader
										:options="props.orgData"
										:props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'name', expandTrigger: 'hover' }"
										placeholder="所属机构"
										clearable
										class="w100"
										v-model="state.ruleForm.orgId"
										disabled
									>
										<template #default="{ node, data }">
											<span>{{ data.name }}</span>
											<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
										</template>
									</el-cascader>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="职位" prop="posId" :rules="[{ required: true, message: '职位名称不能为空', trigger: 'blur' }]">
									<el-select v-model="state.ruleForm.posId" placeholder="职位" class="w100">
										<el-option v-for="d in state.posData" :key="d.id" :label="d.name" :value="d.id" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="工号">
									<el-input v-model="state.ruleForm.jobNum" placeholder="工号" clearable />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="入职日期">
									<el-date-picker v-model="state.ruleForm.joinDate" type="date" placeholder="入职日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" class="w100" />
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取 消</el-button>
					<el-button type="primary" @click="submit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="sysEditUser">
import { onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';

import { Edit } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import { SysPosApi, SysRoleApi, SysUserApi } from '/@/api-services/api';
import { RoleOutput, SysOrg, SysPos, UpdateUserInput } from '/@/api-services/models';
import other from '/@/utils/other';

const props = defineProps({
	title: String,
	orgData: Array<SysOrg>,
});
const emits = defineEmits(['handleQuery']);
const ruleFormRef = ref();
const storesUserInfo = useUserInfo();
const { userInfos } = storeToRefs(storesUserInfo);
// const selectCharge=ref<any>([]);
// const chargeData=ref<any>([]);

const state = reactive({
	loading: false,
	isShowDialog: false,
	selectedTabName: '0', // 选中的 tab 页
	ruleForm: {} as UpdateUserInput,
	posData: [] as Array<SysPos>, // 职位数据
	roleData: [] as Array<RoleOutput>, // 角色数据
});
const handlePassword = () => {
	state.ruleForm.editPassword = !state.ruleForm.editPassword;
	if (!state.ruleForm.editPassword) {
		state.ruleForm.password = '';
	}
};
onMounted(async () => {
	state.loading = true;
	var res = await getAPI(SysPosApi).apiSysPosListGet();
	state.posData = res.data.result ?? [];
	var res1 = await getAPI(SysRoleApi).apiSysRoleListGet();
	state.roleData = res1.data.result ?? [];
	state.loading = false;
});

// 打开弹窗
const openDialog = async (row: any) => {
	ruleFormRef.value?.resetFields(); //重置需要放在列表赋值之前
	state.selectedTabName = '0'; // 重置为第一个 tab 页
	state.ruleForm = other.deepClone(row) as any;
	if (row.id != undefined) {
		var resRole = await getAPI(SysUserApi).apiSysUserOwnRoleListUserIdGet(row.id);
		state.ruleForm.roleIdList = resRole.data.result;
		var resExtOrg = await getAPI(SysUserApi).apiSysUserOwnExtOrgListUserIdGet(row.id);
		state.ruleForm.extOrgIdList = resExtOrg.data.result;
		var resCharge = await getAPI(SysUserApi).apiSysUserOwnChargesListUserIdGet(row.id);
		state.ruleForm.productIdList = resCharge.data.result;
		state.isShowDialog = true;
		state.ruleForm.editPassword = false;
	} else {
		state.ruleForm.accountType = 777;
		state.ruleForm.orgId = userInfos.value.orgId;
		state.ruleForm.editPassword = true;
	} // 默认普通账号类型
	state.isShowDialog = true;
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
			await getAPI(SysUserApi).apiSysUserUpdatePost(Object.assign({}, state.ruleForm, { editPassword: state.ruleForm.editPassword, password: state.ruleForm.password }));
		} else {
			await getAPI(SysUserApi).apiSysUserAddPost(Object.assign({}, state.ruleForm, { password: state.ruleForm.password }));
		}
		closeDialog();
	});
};

// 导出对象
defineExpose({ openDialog });
</script>
<style lang="scss" scoped>
.sys-user-container-edit {
	:deep(.el-tabs__content) {
		background-color: #ffffff !important;
	}
	// :deep(.el-input-group__append, .el-input-group__prepend) {
	// 	background-color: #ffffff !important;
	// }
}
</style>
