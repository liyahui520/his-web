<template>
	<div class="reservation-add-container">
		<el-dialog v-model="isShowDialog" :width="900" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-card shadow="always" style="margin-top: 8px">
				<el-breadcrumb separator="|" style="line-height: 2">
					<el-breadcrumb-item>{{ pcustomer.name }}</el-breadcrumb-item>
					<el-breadcrumb-item>
						<el-tag class="mx-1" type="danger" effect="light">{{ pcustomer.cardNumber ?? '-' }}</el-tag>
					</el-breadcrumb-item>
					<el-breadcrumb-item>{{ pcustomer.sexText ?? '-' }}</el-breadcrumb-item>
					<el-breadcrumb-item>
						<el-tag class="mx-1" type="success" effect="light">{{ pcustomer.levelText ?? '-' }}</el-tag>
					</el-breadcrumb-item>
					<el-breadcrumb-item>{{ pcustomer.cellPhone ?? '-' }}</el-breadcrumb-item>
					<el-breadcrumb-item>{{ pcustomer.sourceText ?? '-' }}</el-breadcrumb-item>
					<el-breadcrumb-item>{{}}</el-breadcrumb-item>
				</el-breadcrumb>
				<el-breadcrumb separator="|" style="margin: 5px 0px; line-height: 2">
					<el-breadcrumb-item>{{ props.pet.petName ?? '-' }}</el-breadcrumb-item>
					<el-breadcrumb-item>
						<el-tag type="warning">{{ props.pet.petRecordNumber ?? '-' }}</el-tag>
					</el-breadcrumb-item>
					<el-breadcrumb-item>{{ props.pet.petKindName ?? '-' }}</el-breadcrumb-item>
					<el-breadcrumb-item>{{ props.pet.petGenderText ?? '-' }}</el-breadcrumb-item>
					<el-breadcrumb-item>{{ props.pet.petVarietieName ?? '-' }}</el-breadcrumb-item>
					<el-breadcrumb-item>{{ props.pet.petColorText ?? '-' }}</el-breadcrumb-item>
					<el-breadcrumb-item>{{ scale2Format(props.pet.petWeight) ?? '-' }}Kg</el-breadcrumb-item>
				</el-breadcrumb>
			</el-card>

			<el-form :model="ruleForm" ref="ruleFormRef" label-width="80px" :rules="rules">
				<el-card shadow="always" style="margin-top: 8px;height: 350px;">
					<el-row :gutter="35">
						<el-form-item v-show="false">
							<el-input v-model="ruleForm.id" />
						</el-form-item>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="预约类型" prop="type">
								<el-select clearable="" v-model="ruleForm.type" placeholder="请选择预约类型">
									<el-option v-for="(item, index) in ReservationTypeEnums" :key="item.value" :value="item.value" :label="item.describe">{{ item.describe }} </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="科室" prop="departmentId">
								<el-select clearable="" v-model="ruleForm.departmentId" placeholder="请选择科室">
									<el-option v-for="(item, index) in departments" :key="item.id" :value="item.id" :label="item.value">{{ item.value }} </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="预约医生" prop="doctorId">
								<el-select clearable="" v-model="ruleForm.doctorId" placeholder="请选择预约医生">
									<el-option v-for="(item, index) in getUsersData" :key="index" :value="item.id" :label="item.realName">{{ item.realName }} </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="预约时间" prop="reservationTime">
								<el-date-picker
									v-model="ruleForm.reservationTime"
									style="width: 100%"
									type="datetime"
									@change="reservationTimeChange"
									placeholder="预约时间"
									:default-time="defaultTime"
									:disabled-date="disabledDate"
									format="YYYY-MM-DD HH:mm:ss"
									value-format="YYYY-MM-DD HH:mm:ss"
								/>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
							<el-form-item label="预约内容" prop="email">
								<el-input v-model="ruleForm.content" type="textarea" :rows="2" placeholder="预约内容" clearable="" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="35">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="开启短信">
								<el-switch :disabled="!props.pcustomer?.cellPhone" v-model="ruleForm.isSendSMS" @change="isSendMessage" active-text="是" inactive-text="否" />
							</el-form-item>
						</el-col>
						<el-col v-if="ruleForm.isSendSMS == true" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="模板名称" prop="templateId">
								<el-select v-model="ruleForm.templateId" filterable @change="templateChange">
									<el-option v-for="item in templateData" :key="item.id" :label="item.templateName" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row v-if="ruleForm.isSendSMS == true" :gutter="35">
						<el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="24">
							<el-form-item label="短信内容">
								<el-input ref="contentRef" disabled type="textarea" v-model="ruleForm.smsContent" show-word-limit :rows="5" maxlength="500" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-card>
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

<script lang="ts" setup name="add">
import commonFunction from '/@/utils/commonFunction';
import { ref, onMounted } from 'vue';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { SysEnumApi, ReservationApi, SMSTemplateApi } from '/@/api-services';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';
import { getDictDataList as dl } from '/@/utils/dict-utils';
import other from '/@/utils/other';

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
	pcustomer: {} as any,
	pet: {} as any,
});
const templateData = ref<any>([]);
const ReservationTypeEnums = ref<any>([]);
const departments = ref<any>([]);
const { scale2Format } = commonFunction();
const address = ref<any>([]);
const getUsersData = ref<any>([]);
const stores = useUserInfo();
const { userList,sysOrgInfo } = storeToRefs(stores);
const defaultTime = new Date();
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const ruleForm = ref<any>({});
const smsTemplateItems = ref<any>([]);
const templateInfo = ref<any>({});
const smsTemplateContent = ref('');
//自行删除非必填规则
const rules = ref<FormRules>({
	type: [{ required: true, message: '请输入预约类型！', trigger: 'change' }],
	departmentId: [{ required: true, message: '请选择科室！', trigger: 'change' }],
	doctorId: [{ required: true, message: '请选择预约医生！', trigger: 'change' }],
	reservationTime: [{ required: true, message: '请选择预约时间！', trigger: 'change' }],
});
/**
 * 开启短信变更
 * @param data
 */
const isSendMessage = (data: any) => {
	if (data) {
		if (templateData.value.length > 0) {
			ruleForm.value.templateId = templateData.value[0].id;
			smsTemplateContent.value = templateData.value[0].content;
			replaceContent(templateData.value[0].content);
		}
	}
};
/**
 * 预约时间变更
 * @param value
 */
const reservationTimeChange = () => {
	replaceContent(smsTemplateContent.value);
};

/**
 * 替换模板
 * @param value
 */
const replaceContent = (value: any) => {
	let content = value;
	smsTemplateItems.value.forEach((item: any) => {
		if (item.label == '预约时间') item.value = ruleForm.value.reservationTime;
		content = content.replace(`{${item.label}}`, item.value ?? '');
	});
	ruleForm.value.smsContent = content;
};
/**
 * 模板变更
 * @param value
 */
const templateChange = (value: any) => {
	replaceContent(templateInfo.value[value]);
};
// 打开弹窗
const openDialog = async (row: any) => {
	smsTemplateItems.value.push({ label: '机构名称', value: sysOrgInfo.value.orgName  });
	smsTemplateItems.value.push({ label: '机构地址', value: `${sysOrgInfo.value.addressText}${sysOrgInfo.value.addressDetails}` });
	smsTemplateItems.value.push({ label: '机构联系方式', value: sysOrgInfo.value.contactPhone });
	smsTemplateItems.value.push({ label: '宠主姓名', value: props.pcustomer?.name });
	smsTemplateItems.value.push({ label: '宠物名称', value: props.pet?.petName });
	smsTemplateItems.value.push({ label: '预约时间', value: ruleForm.value.reservationTime });
	ReservationTypeEnums.value = await getEnums('ReservationTypeEnum');
	departments.value = await dl('medical_record_department_type');
	getUsersData.value = userList.value;
	ruleForm.value = other.deepClone(row);
	address.value = ruleForm.value.address ? JSON.parse(ruleForm.value.address) : [];
	isShowDialog.value = true;
};

/**
 * 加载短信模板
 */
const loadSMSTemplate = async () => {
	let result = await getAPI(SMSTemplateApi).apiSMSTemplateGetTemplateByTypePost({ type: 1 });
	templateData.value = result.data.result ?? [];
	templateData.value.forEach((item: any) => {
		templateInfo.value[item.id] = item.content;
	});
	if (templateData.value.length > 0) {
		if (ruleForm.value.templateId == 0 || ruleForm.value.templateId == '0' || ruleForm.value.templateId == undefined) {
			ruleForm.value.templateId = templateData.value[0].id;
			smsTemplateContent.value = templateData.value[0].content;
			replaceContent(templateData.value[0].content);
		}
	}
};

const disabledDate = (date: any) => {
	return new Date(date) <= new Date(new Date());
};

// 关闭弹窗
const closeDialog = () => {
	ruleFormRef.value?.resetFields();
	emit('reloadTable');
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	ruleFormRef.value?.resetFields();
	emit('reloadTable');
	isShowDialog.value = false;
};

// 提交
const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			let values = ruleForm.value;
			values.pcustomerId = props.pcustomer?.id;
			values.pcuName = props.pcustomer?.name;
			values.petId = props.pet.id;
			values.petName = props.pet.petName;
			values.cellPhone = props.pcustomer?.cellPhone;
			values.source = 0;
			if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
				await getAPI(ReservationApi).apiReservationIdEditPut(values);
			} else {
				await getAPI(ReservationApi).apiReservationAddPost(values);
			}
			closeDialog();
		}
	});
};

/**
 * 获取枚举值
 * @param val
 */
const getEnums = async (val: string) => {
	var r = await getAPI(SysEnumApi).apiSysEnumEnumDataListGet(val);
	return r.data?.result;
};

// 页面加载时
onMounted(async () => {
	await loadSMSTemplate();
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
