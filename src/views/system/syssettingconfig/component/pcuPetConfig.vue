<template>
	<div class="pcuPetConfig-container">
		<el-card shadow="never" style="overflow: auto">
			<template #header>会员参数 </template>
			<span>
				<el-row :gutter="20" style="align-items: center">
					<el-divider direction="vertical" style="font-weight: 800; border: 2px solid var(--el-color-primary)" />
					<el-text class="w-150px mb-2" truncated>会员编号设置 </el-text>
				</el-row>
				<el-text class="w-150px mb-2" style="margin-left: 20px; font-size: 12px; color: #666666; line-height: 30px" truncated
					>创建会员时自动生成会员编码，可以手动自定义前缀和起始编号以便方便后续使用。
				</el-text>
				<el-row :gutter="20" style="padding: 0px 40px 0px">
					<el-form :inline="true" class="demo-form-inline" ref="serNumberFromRef" :model="serNumberFrom" :rules="serNumberFromRules">
						<el-form-item label="前缀" prop="prefix">
							<el-input v-model="serNumberFrom.prefix" :max="2" placeholder="请输入前缀" :disabled="!isPcuPetSerNumber" />
						</el-form-item>
						<el-form-item label="编码规则" prop="type">
							<el-select filterable v-model="serNumberFrom.type" placeholder="请选择宠物种类" :disabled="!isPcuPetSerNumber">
								<el-option v-for="(item, index) in serNumberTypes" :key="index" :value="item.value" :label="item.name">{{ item.name }} </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="起始编号" prop="startNumber">
							<el-input v-model="serNumberFrom.startNumber" placeholder="请输入起始编号" :disabled="!isPcuPetSerNumber" />
						</el-form-item>
						<el-form-item>
							<el-button type="info" v-if="!isPcuPetSerNumber" @click="editSerNumberConfig">{{ '编辑' }}</el-button>
							<el-button type="info" v-if="isPcuPetSerNumber" @click="cancelSerNumberConfig">{{ '取消编辑' }}</el-button>
							<el-button type="primary" v-if="isPcuPetSerNumber" @click="saveSerNumberConfig">保 存</el-button>
						</el-form-item>
					</el-form></el-row
				>
				<el-row :gutter="20" style="padding: 0px 40px 0px">
					<el-text class="w-150px mb-2" truncated>
						示例：【{{ serNumberFrom.prefix
						}}{{
							serNumberFrom.type == 'year'
								? formatDate(new Date(), 'YYYY')
								: serNumberFrom.type == 'month'
									? formatDate(new Date(), 'mm')
									: serNumberFrom.type == 'day'
										? formatDate(new Date(), 'dd')
										: serNumberFrom.type == 'yearmonth'
											? formatDate(new Date(), 'YYYYmm')
											: serNumberFrom.type == 'yearmonthday'
												? formatDate(new Date(), 'YYYYmmdd')
												: serNumberFrom.type == 'monthday'
													? formatDate(new Date(), 'mmdd')
													: formatDate(new Date(), 'mm')
						}}{{ serNumberFrom.startNumber }}】</el-text
					>
				</el-row>
			</span>
			<div style="margin-top: 15px">
				<el-row :gutter="20" style="align-items: center">
					<el-divider direction="vertical" style="font-weight: 800; border: 2px solid var(--el-color-primary)" />
					<el-text class="w-150px mb-2" truncated>会员级别设置 </el-text>
				</el-row>
				<el-text class="w-150px mb-2" style="margin-left: 20px; font-size: 12px; color: #666666; line-height: 25px" truncated
					>系统默认会员级别，可以自定义自有会员级别。并且设置默认登记客户时默认会员级别名称。<br />[启用]：登记客户时可以选中，反之不会显示。<br />[启用会员价]：结算时按产品设置的会员价进行结算账单。
				</el-text>
				<el-row :gutter="20" style="padding: 0px 40px 0px">
					<el-form class="demo-form-inline" ref="levelFromRef" :model="getLevelData" label-width="auto" label-suffix=":" style="width: 610px">
						<el-form-item :label="item.plateName" v-for="(item, index) in getLevelData" :key="item.id" :prop="`${index}.name`" :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]">
							<el-input v-model="item.name" placeholder="请输入会员级别" style="width: 250px" :disabled="!isPcuLevel" />
							<el-checkbox v-model="item.isEnabled" label="启用" style="margin-left: 20px" :disabled="!isPcuLevel" />
							<el-checkbox v-model="item.enabledDiscount" label="启用会员价" :disabled="!isPcuLevel" />
							<!-- <el-text class="w-150px mb-2" truncated v-if="item.isDefault" style="margin-left: 20px; background-color: beige">默认 </el-text> -->
							<el-tag v-if="item.isDefault" type="warning" style="margin-left: 10px;" effect="light" round>默认</el-tag>
						</el-form-item>
					</el-form>
					<div style="align-content: flex-end">
						<el-button
							type="info"
							v-if="!isPcuLevel"
							@click="
								() => {
									isPcuLevel = !isPcuLevel;
								}
							"
							>{{ '编辑' }}</el-button
						>
						<el-button type="info" v-if="isPcuLevel" @click="cancelPcuLevel">{{ '取消编辑' }}</el-button>
						<el-button type="primary" v-if="isPcuLevel" @click="saveLevel">保 存</el-button>
					</div>
				</el-row>
			</div>
		</el-card>
		<el-card shadow="never" style="overflow: auto; margin-top: 16px">
			<template #header>宠物参数 </template>
			<span>
				<el-row :gutter="20" style="align-items: center">
					<el-divider direction="vertical" style="font-weight: 800; border: 2px solid var(--el-color-primary)" />
					<el-text class="w-150px mb-2" truncated>病例编号设置 </el-text>
				</el-row>
				<el-text class="w-150px mb-2" style="margin-left: 20px; font-size: 12px; color: #666666; line-height: 30px" truncated
					>创建宠物时自动生成病例编码，可以手动自定义前缀和起始编号以便方便后续使用。
				</el-text>
				<el-row :gutter="20" style="padding: 0px 40px 0px">
					<el-form :inline="true" ref="recordSerNumberFromRef" :model="recordSerNumberFrom" :rules="recordSerNumberFromRules">
						<el-form-item label="前缀" prop="prefix">
							<el-input v-model="recordSerNumberFrom.prefix" :max="2" placeholder="请输入前缀" :disabled="!isRecordSerNumber" />
						</el-form-item>
						<el-form-item label="编码规则" prop="type">
							<el-select filterable v-model="recordSerNumberFrom.type" placeholder="请选择" :disabled="!isRecordSerNumber">
								<el-option v-for="(item, index) in serNumberTypes" :key="index" :value="item.value" :label="item.label">{{ item.label }} </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="起始编号" prop="startNumber">
							<el-input v-model="recordSerNumberFrom.startNumber" placeholder="请输入起始编号" :disabled="!isRecordSerNumber" />
						</el-form-item>
						<el-form-item>
							<el-button type="info" v-if="!isRecordSerNumber" @click="editRecordSerNumberConfig">{{ '修改' }}</el-button>
							<el-button type="info" v-if="isRecordSerNumber" @click="cancelRecordSerNumberConfig">{{ '取消修改' }}</el-button>
							<el-button type="primary" v-if="isRecordSerNumber" @click="saveRecordSerNumberConfig">保存修改</el-button>
						</el-form-item>
					</el-form></el-row
				>
				<el-row :gutter="20" style="padding: 0px 40px 0px">
					<el-text class="w-150px mb-2" truncated>
						示例：【{{ recordSerNumberFrom.prefix
						}}{{
							recordSerNumberFrom.type == 'year'
								? formatDate(new Date(), 'YYYY')
								: recordSerNumberFrom.type == 'month'
									? formatDate(new Date(), 'mm')
									: recordSerNumberFrom.type == 'day'
										? formatDate(new Date(), 'dd')
										: recordSerNumberFrom.type == 'yearmonth'
											? formatDate(new Date(), 'YYYYmm')
											: recordSerNumberFrom.type == 'yearmonthday'
												? formatDate(new Date(), 'YYYYmmdd')
												: recordSerNumberFrom.type == 'monthday'
													? formatDate(new Date(), 'mmdd')
													: formatDate(new Date(), 'mm')
						}}{{ recordSerNumberFrom.startNumber }}】</el-text
					>
				</el-row>
			</span>
		</el-card>
		<!-- <el-card shadow="never" style="overflow: auto; margin-top: 16px">
			<template #header>会员编号</template>
			<el-table :data="tableData" v-loading="loading" border tooltip-effect="light" row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="参数名称" align="left" width="300" show-overflow-tooltip="" />
				<el-table-column prop="description" label="描述" align="left" show-overflow-tooltip="" />
				<el-table-column label="设置" align="center" width="300">
					<template #default="scope">
						<el-switch v-model="scope.row.value" size="default" :loading="scope.row.loading" @change="editSysOrgConfig(scope.row)" inline-prompt :active-icon="Check" :inactive-icon="Close" />
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-card shadow="never" style="overflow: auto; margin-top: 16px">
			<template #header>会员编号</template>
			<el-table :data="tableData" v-loading="loading" border tooltip-effect="light" row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="参数名称" align="left" width="300" show-overflow-tooltip="" />
				<el-table-column prop="description" label="描述" align="left" show-overflow-tooltip="" />
				<el-table-column label="设置" align="center" width="300">
					<template #default="scope">
						<el-switch v-model="scope.row.value" size="default" :loading="scope.row.loading" @change="editSysOrgConfig(scope.row)" inline-prompt :active-icon="Check" :inactive-icon="Close" />
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-card shadow="never" style="overflow: auto; margin-top: 16px">
			<template #header>会员编号</template>
			<el-table :data="tableData" v-loading="loading" border tooltip-effect="light" row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="参数名称" align="left" width="300" show-overflow-tooltip="" />
				<el-table-column prop="description" label="描述" align="left" show-overflow-tooltip="" />
				<el-table-column label="设置" align="center" width="300">
					<template #default="scope">
						<el-switch v-model="scope.row.value" size="default" :loading="scope.row.loading" @change="editSysOrgConfig(scope.row)" inline-prompt :active-icon="Check" :inactive-icon="Close" />
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-card shadow="never" style="overflow: auto; margin-top: 16px">
			<template #header>会员编号</template>
			<el-table :data="tableData" v-loading="loading" border tooltip-effect="light" row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="参数名称" align="left" width="300" show-overflow-tooltip="" />
				<el-table-column prop="description" label="描述" align="left" show-overflow-tooltip="" />
				<el-table-column label="设置" align="center" width="300">
					<template #default="scope">
						<el-switch v-model="scope.row.value" size="default" :loading="scope.row.loading" @change="editSysOrgConfig(scope.row)" inline-prompt :active-icon="Check" :inactive-icon="Close" />
					</template>
				</el-table-column>
			</el-table>
		</el-card> -->
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import { getAPI } from '/@/utils/axios-utils';
import { clone, isObjectValueEqual } from '/@/utils/arrayOperation';
import { PcuPetConfigApi, MemberLevelApi } from '/@/api-services/api';
import { formatDate } from '/@/utils/formatTime';
import { getDictDataList } from '/@/utils/dict-utils';

const oldPcuSerNumberConfig = ref();
const getLevelData = ref<any>([]);
//会员编号
const serNumberFrom = ref<any>({ prefix: 'C', type: 'yearmonthday', startNumber: '00001' });
const serNumberFromRef = ref();
//编码规则
const serNumberTypes = ref<any>([]);
const isPcuPetSerNumber = ref(false);

//会员级别
const levelFrom = ref();
const levelFromRef = ref();
const isPcuLevel = ref(false);
const oldGetLevelData = ref([]);

//宠物病例编号
const recordSerNumberFrom = ref<any>({ prefix: 'C', type: 'yearmonthday', startNumber: '00001' });
const recordSerNumberFromRef = ref();
//编码规则
const recordSerNumberTypes = ref([]);
const isRecordSerNumber = ref(false);
const oldRecordSerNumberConfig = ref();
const validatePinyin = (rule:any, value:any, callback:any) => {
	const reg = /^[a-zA-Z]+$/;
	if (!reg.test(value)) {
		callback(new Error('只能输入字母，即由字母a-z、A-Z组成的字符串'));
	} else {
		callback();
	}
};
const serNumberFromRules = ref({
	prefix: [
		{ required: true, message: '请输入前缀只支持字母', trigger: 'blur' },
		{ validator: validatePinyin, trigger: 'blur' },
	],
	startNumber: [{ required: true, message: '请输入其实编号', trigger: 'blur' }],
});

const recordSerNumberFromRules = ref();

/**
 * 获取用户编码
 */
const getPcuSerNumberConfig = async () => {
	var r = await getAPI(PcuPetConfigApi).apiPcuPetConfigGetPcuConfigGet();
	oldPcuSerNumberConfig.value = r.data?.result ?? {};
	serNumberFrom.value = clone(oldPcuSerNumberConfig.value);
};

/**
 * 取消修改
 */
const cancelSerNumberConfig = async () => {
	serNumberFrom.value = clone(oldPcuSerNumberConfig.value);
	isPcuPetSerNumber.value = false;
	await serNumberFromRef.value.resetFields();
};

/**
 * 修改
 */
const editSerNumberConfig = async () => {
	isPcuPetSerNumber.value = true;
};

/**
 * 保存修改
 */
const saveSerNumberConfig = async () => {
	await serNumberFromRef.value.validate(async (valid:any, fields:any) => {
		if (!valid) {
			ElMessage({
				message: `表单有${Object.keys(fields).length}处验证失败，请修改后再提交`,
				type: 'error',
			});
			return;
		}
		if (isObjectValueEqual(oldPcuSerNumberConfig.value, serNumberFrom.value)) {
			ElMessage.success('保存成功');
		} else {
			let r = await getAPI(PcuPetConfigApi).apiPcuPetConfigSavePcuConfigPost(serNumberFrom.value);
			if (r.data?.result) {
				ElMessage.success('保存成功');
			} else {
				ElMessage.error('网络异常请稍后再试');
			}
		}
		await getPcuSerNumberConfig();
		isPcuPetSerNumber.value = false;
	});
};

/**
 * 获取会员级别
 */
const getLevels = async () => {
	await getAPI(MemberLevelApi)
		.apiMemberLevelListPost({})
		.then((res) => {
			oldGetLevelData.value = res.data?.result ?? [];
			getLevelData.value = clone(oldGetLevelData.value);
		});
};

/**
 * 取消修改
 */
const cancelPcuLevel = async () => {
	getLevelData.value = clone(oldGetLevelData.value);
	isPcuLevel.value = false;
	await levelFromRef.value.resetFields();
};
/**
 * 保存会员级别修改
 */
const saveLevel = async () => {
	await levelFromRef.value.validate(async (valid:any, fields:any) => {
		if (!valid) {
			ElMessage({
				message: `表单有${Object.keys(fields).length}处验证失败，请修改后再提交`,
				type: 'error',
			});
			return;
		}
		if (isObjectValueEqual(oldGetLevelData.value, getLevelData.value)) {
			ElMessage.success('保存成功');
		} else {
			let r = await getAPI(MemberLevelApi).apiMemberLevelEditAllPost(getLevelData.value);
			if (r.data?.result) {
				ElMessage.success('保存成功');
			} else {
				ElMessage.error('网络异常请稍后再试');
			}
		}
		await getLevels();
		isPcuLevel.value = false;
	});
};

//宠物编码

/**
 * 获取用户编码
 */
const getRecordSerNumberConfig = async () => {
	var r = await getAPI(PcuPetConfigApi).apiPcuPetConfigGetPetRecordConfigGet();
	oldRecordSerNumberConfig.value = r.data?.result ?? {};
	recordSerNumberFrom.value = clone(oldRecordSerNumberConfig.value);
};

/**
 * 取消修改
 */
const cancelRecordSerNumberConfig = async () => {
	recordSerNumberFrom.value = clone(oldRecordSerNumberConfig.value);
	isRecordSerNumber.value = false;
	await recordSerNumberFromRef.value.resetFields();
};

/**
 * 修改
 */
const editRecordSerNumberConfig = async () => {
	isRecordSerNumber.value = true;
};

/**
 * 保存修改
 */
const saveRecordSerNumberConfig = async () => {
	await recordSerNumberFromRef.value.validate(async (valid:any, fields:any) => {
		if (!valid) {
			ElMessage({
				message: `表单有${Object.keys(fields).length}处验证失败，请修改后再提交`,
				type: 'error',
			});
			return;
		}
		if (isObjectValueEqual(oldRecordSerNumberConfig.value, recordSerNumberFrom.value)) {
			ElMessage.success('保存成功');
		} else {
			let r = await getAPI(PcuPetConfigApi).apiPcuPetConfigSavePetRecordConfigPost(recordSerNumberFrom.value);
			if (r.data?.result) {
				ElMessage.success('保存成功');
			} else {
				ElMessage.error('网络异常请稍后再试');
			}
		}
		await getRecordSerNumberConfig();
		isRecordSerNumber.value = false;
	});
};

// 页面加载时
onMounted(async () => {
	serNumberTypes.value = getDictDataList('PcuNumberType');
	await getPcuSerNumberConfig();
	await getLevels();
	await getRecordSerNumberConfig();
});
</script>
<style lang="scss" scoped>
.pcuPetConfig-container {
	.clearfix {
		display: flex;
		justify-content: space-between;
	}
}
</style>
