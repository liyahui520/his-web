<template>
	<div class="product-vaccination-container">
		<el-dialog v-model="isShowDialog" width="80%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>驱虫疫苗</span>
				</div>
			</template>
			<div>
				<el-button icon="ele-Plus" type="success" @click="remoteSerchProduct" size="small">选择项目</el-button>
			</div>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="80px" :scroll-to-error="true" :rules="rules">
				<el-card class="full-table" shadow="always" style="height: 500px; margin-top: 8px">
					<el-table ref="selectionProductRef" :data="ruleForm.vaccinationInfos" style="width: 100%" tooltip-effect="light" row-key="targetProductId" border>
						<el-table-column label="项目类型" fixed="" width="70" align="left">
							<template #default="scope">
								<span>{{ productTypeNameObject[scope.row.productType] }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="productName" label="项目名称" align="left" show-overflow-tooltip="" />
						<el-table-column prop="outUnitName" label="单位" width="60" />
						<el-table-column prop="salePrice" label="销售价格" width="80">
							<template #default="scope">
								<el-text>{{ verifyNumberComma(scope.row.salePrice.toFixed(2)) || '0.00' }}</el-text>
							</template>
						</el-table-column>
						<el-table-column prop="totalAmount" label="总金额" width="80" show-overflow-tooltip="">
							<template #default="scope">
								<el-text>{{ verifyNumberComma(scope.row.totalAmount.toFixed(2)) || '0.00' }}</el-text>
							</template>
						</el-table-column>
						<el-table-column prop="specific" label="规格" width="100" show-overflow-tooltip="" />
						<el-table-column label="寄存" width="60">
							<template #default="scope">
								<el-checkbox v-model="scope.row.isDeposit"></el-checkbox>
							</template>
						</el-table-column>
						<el-table-column label="使用方式" width="150">
							<template #default="scope">
								<el-select v-model="scope.row.dosingWay" filterable clearable placeholder="使用方式" style="width: 100%">
									<el-option v-for="item in dosingWayData" :key="item.id" :label="item.value" :value="item.id"></el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="预计接种" width="140">
							<template #default="scope">
								<el-date-picker
									v-model="scope.row.expectVaccinations"
									:clearable="false"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									type="datetime"
									style="width: 100%"
									@change="expectVaccinationsChange(scope.row, scope.$index)"
								/>
							</template>
						</el-table-column>
						<el-table-column label="接种间隔" width="85">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`interval${scope.$index}`"
									:prop="'vaccinationInfos.' + scope.$index + '.interval'"
									:rules="{
										required: true,
										message: '请输入接种间隔！',
										trigger: 'blur',
									}"
									:inline-message="true"
									style="margin-bottom: 0px"
								>
									<el-input-number v-model="scope.row.interval" :min="0" :max="9999999" controls-position="right" @change="intervalChange(scope.row, scope.$index)" style="width: 100%" />
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column label="间隔单位" width="85">
							<template #default="scope">
								<el-select v-model="scope.row.intervalUnit" filterable style="width: 100%" @change="intervalUnitChange(scope.row, scope.$index)">
									<el-option v-for="item in intervalUnitData" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="单次用量" width="85">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`useDose${scope.$index}`"
									:prop="'vaccinationInfos.' + scope.$index + '.useDose'"
									:rules="{
										required: true,
										message: '请输入单次用量！',
										trigger: 'blur',
									}"
									:inline-message="true"
									style="margin-bottom: 0px"
								>
									<el-input-number v-model="scope.row.useDose" :min="0.01" :precision="2" :max="9999999.99" controls-position="right" style="width: 100%"></el-input-number>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column label="总个数" width="85">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`count${scope.$index}`"
									:prop="'vaccinationInfos.' + scope.$index + '.count'"
									:rules="{
										required: true,
										message: '请输入总个数！',
										trigger: 'blur',
									}"
									:inline-message="true"
									style="margin-bottom: 0px"
								>
									<el-input-number v-model="scope.row.count" :min="1" :max="9999999" controls-position="right" @change="countChange(scope.row)" style="width: 100%" />
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column label="备注" width="150">
							<template #default="scope">
								<el-input v-model="scope.row.remark" style="width: 100%" />
							</template>
						</el-table-column>
						<el-table-column label="操作" width="60" align="center" fixed="right">
							<template #default="scope">
								<el-button v-if="scope.row.id == 0" icon="ele-Delete" size="small" text="" type="danger" @click="deleteVaccination(scope.$index)"></el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
				<el-card shadow="always" style="height: 200px; margin-top: 8px">
					<el-row :gutter="35">
						<el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
							<el-form-item label="开启短信">
								<el-switch :disabled="!ruleForm.customerInfo?.cellPhone" v-model="ruleForm.isSendSMS" active-text="是" inactive-text="否" />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
							<el-form-item label="操作人" prop="operateId">
								<el-select v-model="ruleForm.operateId" filterable clearable>
									<el-option v-for="item in sysUserData" :key="item.id" :label="item.realName" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col v-if="ruleForm.isSendSMS == true" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
							<el-form-item label="模板名称" prop="templateId">
								<el-select v-model="ruleForm.templateId" filterable @change="templateChange">
									<el-option v-for="item in templateData" :key="item.id" :label="item.templateName" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row v-if="ruleForm.isSendSMS == true" :gutter="35" style="margin-top: 8px">
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
					<el-button type="primary" :loading="submitLoading" @click="submit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		<Products ref="productRef" :title="'选择驱虫/疫苗'" @reloadTable="checkProductQuery" />
	</div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue';
import { addDaysToDate, addWeeksToDate, addMonthsToDate, addYearsToDate } from '/@/utils/formatTime';
import { getAPI } from '/@/utils/axios-utils';
import { SMSTemplateApi } from '/@/api-services/api';
import { VaccinationApi } from '/@/api-services/api';
import { getDictDataList } from '/@/api/system/admin';
import commonFunction from '/@/utils/commonFunction';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';
import { formatDate } from '/@/utils/formatTime';
import Decimal from 'decimal.js';
import { ProductTypeEnums } from '/@/api-services';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import type { FormRules } from 'element-plus';

const Products = defineAsyncComponent(() => import('/@/components/products/selectProducts.vue'));
const templateData = ref<any>([]);
const productRef = ref();
const templateInfo = ref<any>({});
const isShowDialog = ref(false);
const submitLoading = ref(false);
const selectionProductRef = ref();
const dosingWayData = ref<any>([]);
const ruleForm = ref<any>({ vaccinationInfos: [], smsContent: '' });
const ruleFormRef = ref<any>();
const { generateGUID } = commonFunction();
const stores = useUserInfo();
const { userInfos, userList, sysOrgInfo } = storeToRefs(stores);
const sysUserData = ref<any>([]);
const isHasData = ref(false);
const isEdit = ref<any>(false);
const smsTemplateContent = ref('');
const productTypeNameObject = ref<any>({
	50001: '驱虫',
	60001: '疫苗',
});
const intervalUnitData = ref<any>([
	{ id: 'Day', name: '天' },
	{ id: 'Week', name: '周' },
	{ id: 'Month', name: '月' },
	{ id: 'Year', name: '年' },
]);

const smsTemplateItems = ref<any>([]);

const intervalUnitFunction = {
	Year: (startTime: Date, interval: number) => {
		return addYearsToDate(startTime, interval);
	},
	Month: (startTime: Date, interval: number) => {
		return addMonthsToDate(startTime, interval);
	},
	Week: (startTime: Date, interval: number) => {
		return addWeeksToDate(startTime, interval);
	},
	Day: (startTime: Date, interval: number) => {
		console.log("应该是进来这里的",startTime,interval)
		return addDaysToDate(startTime, interval);
	},
};
//删除驱虫疫苗
const deleteVaccination = (index: number) => {
	ruleForm.value.vaccinationInfos.splice(index, 1);
};
/**
 * 远程搜索驱虫或者疫苗数据
 */
const remoteSerchProduct = () => {
	productRef.value.openDialog(
		[
			{ label: '驱虫', value: ProductTypeEnums.NUMBER_50001 },
			{ label: '疫苗', value: ProductTypeEnums.NUMBER_60001 },
		],
		ProductTypeEnums.NUMBER_50001
	);
};
//自行删除非必填规则
const rules = ref<FormRules>({
	operateId: [{ required: true, message: '请选择操作人！', trigger: 'change' }],
	templateId: [{ required: true, message: '请选择模板！', trigger: 'change' }],
});
/**
 * 处理日期变化值
 * @param row
 * @param index
 */
const handleRowChange = (row: any, index) => {
	//判断集合中grouping一样的情况下此后的expectVaccinations都会推迟指定日期
	for (let i = index + 1; i < ruleForm.value.vaccinationInfos.length; i++) {
		let info = ruleForm.value.vaccinationInfos[i];
		if (row.grouping == info.grouping) {
			ruleForm.value.vaccinationInfos[i].expectVaccinations = intervalUnitFunction[info.intervalUnit](new Date(row.expectVaccinations), info.interval);
		} else break;
	}
};
/**
 * 预计接种时间变更事件
 */
const expectVaccinationsChange = (row: any, index) => {
	handleRowChange(row, index);
};
/**
 * 间隔改变事件
 * @param row
 * @param index
 */
const intervalChange = (row: any, index) => {
	let startTime = new Date();
	if (index > 0) {
		if (row.grouping == ruleForm.value.vaccinationInfos[index - 1].grouping) {
			startTime = new Date(ruleForm.value.vaccinationInfos[index - 1].expectVaccinations);
		}
	}
	row.expectVaccinations = intervalUnitFunction[row.intervalUnit](startTime, row.interval);
	handleRowChange(row, index);
};
/**
 * 间隔单位改变事件
 * @param row
 * @param index
 */
const intervalUnitChange = (row: any, index) => {
	let startTime = new Date();
	if (index > 0) {
		if (row.grouping == ruleForm.value.vaccinationInfos[index - 1].grouping) {
			startTime = new Date(ruleForm.value.vaccinationInfos[index - 1].expectVaccinations);
		}
	}
	row.expectVaccinations = intervalUnitFunction[row.intervalUnit](startTime, row.interval);
	handleRowChange(row, index);
};

/**
 * 总个数改变事件
 * @param row
 */
const countChange = (row: any) => {
	if (row.count) {
		row.totalAmount = new Decimal(row.salePrice).mul(new Decimal(row.count));
	} else row.totalAmount = 0;
};

/**
 * 获取所有用户
 */
const loadUsers = () => {
	sysUserData.value = userList.value;
	ruleForm.value.operateId = userInfos.value.id;
	ruleForm.value.operateName = userInfos.value.realName;
};

const checkProductQuery = (data: any) => {
	data.forEach((item: any) => {
		checkProductChange(item);
	});
};
const checkProductChange = (value: any) => {
	let startTime = new Date();
	let grouping = generateGUID();
	for (let i = 0; i < value.times; i++) {
		let expectVaccinations = '';
		let interval = i * value.interval;
		interval = interval == 0 ? 1 : interval;
		expectVaccinations = intervalUnitFunction[value.intervalUnit](startTime, interval);
		ruleForm.value.vaccinationInfos.push({
			id: 0,
			customerId: ruleForm.value.customerInfo.id,
			customerName: ruleForm.value.customerInfo.name,
			petId: ruleForm.value.petInfo.id,
			petName: ruleForm.value.petInfo.petName,
			expectVaccinations: expectVaccinations,
			productId: value.productId,
			productName: value.productName,
			productType: value.productType,
			outUnitId: value.outUnitId,
			outUnitName: value.outUnitName,
			specific: value.specific,
			useDose: 1,
			count: 1,
			salePrice: value.salePrice,
			memberPrice: value.memberPrice,
			dosingWay: null,
			isDeposit: true,
			recordId: ruleForm.value.recordId,
			interval: i == 0 ? 1 : value.interval,
			intervalUnit: value.intervalUnit,
			remark: '',
			totalAmount: value.salePrice * 1,
			content: '',
			grouping: grouping,
		});
	}
};

const replaceContent = (value: any) => {
	let content = value;
	smsTemplateItems.value.forEach((item: any) => {
		content = content.replace(`{${item.label}}`, item.value);
	});
	ruleForm.value.smsContent = content;
};

const templateChange = (value: any) => {
	replaceContent(templateInfo.value[value]);
};
/**
 * 加载短信模板
 */
const loadSMSTemplate = async () => {
	let result = await getAPI(SMSTemplateApi).apiSMSTemplateGetTemplateByTypePost({ type: 0 });
	templateData.value = result.data.result ?? [];
	templateData.value.forEach((item: any) => {
		templateInfo.value[item.id] = item.content;
	});
	if (templateData.value.length > 0) {
		if (ruleForm.value.templateId == 0 || ruleForm.value.templateId == '0' || ruleForm.value.templateId == undefined) ruleForm.value.templateId = templateData.value[0].id;
		smsTemplateContent.value = templateData.value[0].content;
		replaceContent(templateData.value[0].content);
	}
};

// 打开弹窗
const openDialog = async (info: any) => {
	ruleForm.value = info;
	smsTemplateItems.value.push({ label: '机构名称', value: sysOrgInfo.value.orgName });
	smsTemplateItems.value.push({ label: '机构地址', value: `${sysOrgInfo.value.addressText}${sysOrgInfo.value.addressDetails}` });
	smsTemplateItems.value.push({ label: '机构联系方式', value: sysOrgInfo.value.contactPhone ?? '' });
	smsTemplateItems.value.push({ label: '宠主姓名', value: ruleForm.value.customerInfo?.name });
	smsTemplateItems.value.push({ label: '宠物名称', value: ruleForm.value.petInfo?.petName });
	isShowDialog.value = true;
	submitLoading.value = false;
	ruleForm.value.smsContent = '';
	isHasData.value = ruleForm.value.vaccinationInfos.length > 0;
	ruleForm.value.isSendSMS = isHasData.value && ruleForm.value.customerInfo.cellPhone != null && ruleForm.value.customerInfo.cellPhone != undefined && ruleForm.value.customerInfo.cellPhone != '';
	isEdit.value = ruleForm.value.isEditType;
	if (!ruleForm.value.isEditType) {
		smsTemplateItems.value.push({ label: '接种时间', value: formatDate(new Date(), 'YYYY-mm-dd') });
	} else {
		smsTemplateItems.value.push({ label: '接种时间', value: formatDate(new Date(ruleForm.value.vaccinationInfos[0].expectVaccinations), 'YYYY-mm-dd') });
	}
	await loadBaseData();
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};

const getReplaceContent = (value: any) => {
	let content = smsTemplateContent.value;
	smsTemplateItems.value.forEach((item: any) => {
		if (item.label == '接种时间') content = content.replace(`{${item.label}}`, formatDate(new Date(value), 'YYYY-mm-dd'));
		else content = content.replace(`{${item.label}}`, item.value);
	});
	return content;
};
// 提交
const submit = async () => {
	if (ruleForm.value.vaccinationInfos.length == 0) isShowDialog.value = false;
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			submitLoading.value = true;
			ruleForm.value.cellPhone = ruleForm.value.customerInfo.cellPhone;
			let values = ruleForm.value;
			values.vaccinationInfos.forEach((item: any) => {
				item.content = getReplaceContent(item.expectVaccinations);
			});
			if (!isEdit.value)
				await getAPI(VaccinationApi)
					.apiVaccinationAddVaccinationPost(values)
					.catch((res) => {
						submitLoading.value = false;
					});
			else
				await getAPI(VaccinationApi)
					.apiVaccinationEditVaccinationPost(values)
					.catch((res) => {
						submitLoading.value = false;
					});
			if (submitLoading.value) isShowDialog.value = false;
		}
	});
};

const getDictDataDropdownList = async (val: any) => {
	let list = await getDictDataList(val);
	return list.data.result ?? [];
};
//加载使用方式
const loadDosingWayData = async () => {
	var res = await getDictDataDropdownList('code_dosing_way');
	dosingWayData.value = res ?? [];
};
//加载基础数据
const loadBaseData = async () => {
	loadUsers();
	await loadDosingWayData();
	await loadSMSTemplate();
};
//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.product-vaccination-container {
	:deep(.el-input-number.is-controls-right .el-input__wrapper) {
		padding-right: 15px;
	}

	:deep(.el-input-number.is-controls-right .el-input-number__decrease) {
		display: none;
	}

	:deep(.el-input-number.is-controls-right .el-input-number__increase) {
		display: none;
	}
}
</style>
