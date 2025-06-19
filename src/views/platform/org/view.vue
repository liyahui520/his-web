<template>
	<div class="sys-org-container">
		<el-row :gutter="8">
			<el-col :md="24" :sm="24">
				<el-card shadow="hover" header="机构信息">
					<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
						<el-row :gutter="12">
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="系统编码">
									{{ ruleForm.tenantId }}
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="门店编码">
									{{ ruleForm.orgId }}
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="到期时间">
									<el-text type="success" v-if="new Date(addMonthsToDate(new Date(), 1)) <= new Date(ruleForm.expireTime)">
										{{ formatDate(new Date(ruleForm.expireTime), 'YYYY-mm-dd') }}
									</el-text>
									<el-text type="danger" tag="b" v-else>
										{{ formatDate(new Date(ruleForm.expireTime), 'YYYY-mm-dd') }}
										<el-tag type="warning">您的系统将于{{ calculateDaysBetweenDates(new Date(), new Date(ruleForm.expireTime)) }}天后到期，请及时续费以免影响正常使用</el-tag>
									</el-text>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="短信签名">
									{{ ruleForm.shortMessageSign }}
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="机构名称" prop="orgName">
									<el-input v-model="ruleForm.orgName" :disabled="!isEdit" clearable="" />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="Logo" prop="logo">
									<el-upload list-type="picture-card" :disabled="!isEdit" :show-file-list="false" :autoUpload="false" :onChange="uploadPetImageUrlHandle">
										<img v-if="ruleForm.logo" :src="ruleForm.logo" style="width: 100%; height: 100%; object-fit: contain" />
										<el-icon v-else>
											<Plus />
										</el-icon>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="联系人" prop="contact">
									<el-input v-model="ruleForm.contact" :disabled="!isEdit" clearable="" />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="联系方式" prop="contactPhone">
									<el-input v-model="ruleForm.contactPhone" :disabled="!isEdit" clearable="" />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="营业执照编号" prop="licenseNo">
									<el-input v-model="ruleForm.licenseNo" :disabled="!isEdit" clearable="" />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="地址" prop="address">
									<el-cascader
										v-model="ruleForm.address"
										style="width: 100%"
										ref="cascaderRef"
										placeholder="请选择医院地址"
										:options="options"
										:props="customProps"
										@change="handleAddressChange"
										filterable
										:disabled="!isEdit"
									/>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item label="地址详情" prop="addressDetails">
									<el-input v-model="ruleForm.addressDetails" :disabled="!isEdit" clearable="" />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
								<el-form-item>
									<el-button
										icon="ele-Close"
										v-if="isEdit"
										type="warning"
										@click="
											() => {
												isEdit = false;
											}
										"
									>
										取消编辑
									</el-button>
									<el-button icon="ele-Select" v-if="isEdit" type="success" @click="submit"> 保存 </el-button>
									<el-button
										icon="ele-Edit"
										v-if="!isEdit"
										type="primary"
										@click="
											() => {
												isEdit = true;
											}
										"
									>
										编辑
									</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup name="sysServer">
import { ref, onMounted } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { ElMessage } from 'element-plus';
import { SysOrgExtApi, SysFileApi } from '/@/api-services';
import type { FormRules } from 'element-plus';
import { UploadRequestOptions } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useUserInfo } from '/@/stores/userInfo';
import { formatDate, addMonthsToDate, calculateDaysBetweenDates } from '/@/utils/formatTime';

const stores = useUserInfo();
const cascaderRef = ref();
const ruleFormRef = ref();
const ruleForm = ref<any>({});
const loading = ref(false);
const options = ref<any>([]);
const isEdit = ref(false);
const customProps = {
	multiple: false, // 启用多选
	emitPath: false, // 只返回该节点的值
	value: 'id', // 自定义当前数组的键名 - value
	label: 'name', // 自定义当前数组的键名 - label
	children: 'children', // 自定义当前数组的键名 - children
	expandTrigger: 'click', // 次级菜单的展开方式 - click/hover
};
const loadRegion = async () => {
	options.value = stores.sysRegions;
};
/**
 * 处理地址变更
 * @param value
 */
const handleAddressChange = (value: any) => {
	ruleForm.value.addressText = cascaderRef.value.getCheckedNodes()[0].pathLabels.join('');
};
/**
 * 验证机构地址
 * @param rule
 * @param value
 * @param callback
 */

const validateAddress = (rule: any, value: any, callback: any) => {
	if (!value) {
		return callback(new Error('请选择机构地址！'));
	}
	callback();
};

//自行删除非必填规则
const rules = ref<FormRules>({
	orgName: [{ required: true, message: '请输入机构名称！', trigger: 'blur' }],
	logo: [{ required: true, message: '请上传医院Logo！', trigger: 'change' }],
	addressDetails: [{ required: true, message: '请输入地址详情！', trigger: 'blur' }],
	contact: [{ required: true, message: '请输入联系人！', trigger: 'blur' }],
	contactPhone: [{ required: true, message: '请输入联系方式！', trigger: 'blur' }],
	address: [{ validator: validateAddress, trigger: 'change' }],
});

const uploadPetImageUrlHandle = async (file: any) => {
	const res = await getAPI(SysFileApi).apiSysFileUploadFilePostForm(file.raw);
	ruleForm.value.logo = res.data.result?.url;
	ruleForm.value.logoId = res.data.result?.id;
};

// 提交
const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			loading.value = true;
			let values = ruleForm.value;
			await getAPI(SysOrgExtApi).apiSysOrgExtEditSysOrgInfoPost(values);
			ElMessage.success('保存成功');
			isEdit.value = false;
			await useUserInfo().reloadSysOrgExts();
			loading.value = false;
		}
	});
};
/**
 * 获取机构扩展信息
 */
const loadOrgExt = async () => {
	await getAPI(SysOrgExtApi)
		.apiSysOrgExtGetSysOrgInfoGet()
		.then((res) => {
			ruleForm.value = res.data?.result ?? {};
		});
};

onMounted(async () => {
	await loadOrgExt();
	await loadRegion();
});
</script>

<style lang="scss" scoped>
.sys-org-container {
}
</style>
