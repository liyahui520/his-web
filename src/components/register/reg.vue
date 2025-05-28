<template>
	<div class="register-reg-container">
		<el-dialog v-model="isShowDialog" :width="700" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>

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
				<el-breadcrumb-item>{{ props.pet.petKindText ?? '-' }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ props.pet.petGenderText ?? '-' }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ props.pet.petVarietieText ?? '-' }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ props.pet.petColorText ?? '-' }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ scale2Format(props.pet.petWeight) ?? '-' }}Kg</el-breadcrumb-item>
			</el-breadcrumb>
			<el-divider border-style="dashed" content-position="center" style="margin: 10px 0px"> </el-divider>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
				<el-row :gutter="35">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="病历分类" prop="regType">
							<el-select clearable="" v-model="ruleForm.regType" placeholder="请选择病历分类">
								<el-option v-for="(item, index) in regTypes" :key="item.value" :value="item.value" :label="item.describe">{{ item.describe }} </el-option>
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
						<el-form-item label="挂号项目" prop="itemId">
							<el-select placeholder="请选择挂号项目" v-model="ruleForm.itemId">
								<el-option v-for="item in getRegisters" :key="item.id" :label="item.name" :value="item.id">
									<span style="float: left">{{ item.name }}</span>
									<span style="float: right; color: var(--el-text-color-secondary); font-weight: bold; font-size: 14px">￥{{ scale2Format(item.salePrice) }}</span>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="挂号诊室" prop="roomId">
							<el-select placeholder="请选择挂号诊室" v-model="ruleForm.roomId">
								<el-option v-for="(item, index) in roomsList" :key="index" :value="item.id" :label="item.name">{{ item.name }} </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="备注" prop="content">
							<el-input v-model="ruleForm.content" type="textarea" :rows="2" placeholder="" clearable="" />
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

<script lang="ts" setup name="reg">
import commonFunction from '/@/utils/commonFunction';
import { ref, onMounted } from 'vue';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { SysEnumApi, ProductRegistersApi, RegistersApi, CallNumberApi } from '/@/api-services';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';

const { scale2Format } = commonFunction();

const regTypes = ref<any>([]);
const getUsersData = ref<any>([]);
const stores = useUserInfo();
const { userList } = storeToRefs(stores);
const getRegisters = ref<any>([]);
const roomsList = ref<any>([]);
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '挂号',
	},
	pcustomer: {} as any,
	pet: {} as any,
});

const ruleFormRef = ref();
const isShowDialog = ref(false);
const ruleForm = ref<any>({});
//自行删除非必填规则
const rules = ref<FormRules>({
	regType: [{ required: true, message: '请选择病历分类！', trigger: 'change' }],
	doctorId: [{ required: true, message: '请选择预约医生！', trigger: 'change' }],
	itemId: [{ required: true, message: '请选择挂号项目！', trigger: 'change' }],
	roomId: [{ required: true, message: '请选择挂号诊室！', trigger: 'change' }],
});

// 打开弹窗
const openDialog = async () => {
	await loadRooms();
	regTypes.value = await getEnums('RegType');
	getUsersData.value = userList.value;
	getRegisters.value = await getRegisterProducts();
	ruleForm.value = { regType: regTypes.value[0].value, doctorId: userList.value[0].id, itemId: getRegisters.value[0].id };
	isShowDialog.value = true;

	ruleForm.value.regType = regTypes.value[0].value;
	ruleForm.value.doctorId = getUsersData.value[0].id;
	if (getRegisters.value && getRegisters.value.length > 0) ruleForm.value.itemId = getRegisters.value[0].id;
	if (roomsList.value && roomsList.value.length > 0) ruleForm.value.roomId = roomsList.value[0].id;
};
/**
 * 加载可选诊室
 */
const loadRooms = async () => {
	var r = await getAPI(CallNumberApi).apiCallNumberGetCallRoomUseListGet();
	roomsList.value = r.data.result ?? [];
};

/**
 * 关闭弹窗
 */
const closeDialog = () => {
	ruleFormRef.value?.resetFields();
	isShowDialog.value = false;
};

/**
 * 取消
 */
const cancel = () => {
	ruleFormRef.value?.resetFields();
	isShowDialog.value = false;
};

// 提交
const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			let values = ruleForm.value;
			values.customerId = props.pcustomer?.id;
			values.customerName = props.pcustomer?.name;
			values.petId = props.pet.id;
			values.petName = props.pet.petName;
			values.status = 0;
			if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
				await getAPI(RegistersApi).apiRegistersIdEditPut(ruleForm.value.id, values);
			} else {
				await getAPI(RegistersApi).apiRegistersAddPost(values);
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

const getRegisterProducts = async () => {
	var r = await getAPI(ProductRegistersApi).apiProductRegistersGetSelectListPost();
	return r.data?.result;
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
