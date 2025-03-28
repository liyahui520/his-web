<template>
	<div class="pcustomer-container">
		<el-dialog v-model="isShowDialog" :width="900" style="min-width: 1200px" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
				<el-row :gutter="35">
					<el-col :span="8">
						<el-form-item v-show="false">
							<el-input v-model="ruleForm.id" />
						</el-form-item>
						<el-form-item label="会员名称" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入会员名称"/>
						</el-form-item>
						<el-form-item label="手机号" prop="cellPhone">
							<el-input v-model="ruleForm.cellPhone" maxlength="11" placeholder="请输入手机号" />
						</el-form-item>
						<el-form-item label="会员级别" prop="level">
							<el-select filterable v-model="ruleForm.level" placeholder="请选择会员级别">
								<el-option v-for="(item, index) in getEditlevelData" :key="item.id" :value="item.id" :label="item.name">{{ item.name }} </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="客户来源" prop="sourceId">
							<el-select filterable v-model="ruleForm.sourceId" placeholder="请选择客户来源">
								<el-option v-for="(item, index) in getEditsourceidData" :key="index" :value="item.value" :label="item.label">{{ item.label }} </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-select  v-model="ruleForm.sex" placeholder="请选择性别">
								<el-option v-for="(item, index) in getEditsexData" :key="index" :value="item.value" :label="item.label">{{ item.label }} </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="会员生日" prop="birthdate">
							<el-date-picker v-model="ruleForm.birthdate" type="date" placeholder="会员生日" style="width: 240px;"/>
						</el-form-item>
						<el-form-item label="电话" prop="phone">
							<el-input v-model="ruleForm.phone" placeholder="请输入电话" />
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
						</el-form-item>
						<el-form-item label="地址" prop="address">
							<el-cascader style="width: 100%" :collapse-tags="true" :collapse-tags-tooltip="true" v-model="address" :options="options" :props="customProps"></el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" prop="email">
							<el-input v-model="ruleForm.addressDetails" type="textarea" :rows="2" placeholder="详细地址" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<!-- <el-form-item label="病历号码 " prop="petRecordNumber">
							<el-input type="text" v-model="ruleForm.petRecordNumber" placeholder="请输入病历号码 ">
								<template #append>
									<el-button>设置</el-button>
								</template>
							</el-input>
						</el-form-item>  -->
						<el-form-item label="宠物名称" prop="pet.petName">
							<el-input v-model="ruleForm.pet.petName" placeholder="请输入宠物名称"  />
						</el-form-item>
						<el-form-item label="宠物生日" prop="pet.petBirthDate">
							<el-date-picker v-model="ruleForm.pet.petBirthDate" type="date" placeholder="请选择宠物生日"  style="width: 240px;"/>
						</el-form-item>
						<el-form-item label="宠物性别" prop="pet.petGender">
							<el-select  v-model="ruleForm.pet.petGender" placeholder="请选择性别">
								<el-option v-for="(item, index) in getEditpetGenderData" :key="index" :value="item.value" :label="item.label">{{ item.label }} </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="宠物种类" prop="pet.petKind">
							<el-select filterable v-model="ruleForm.pet.petKind" placeholder="请选择宠物种类" @change="KindChange">
								<el-option v-for="(item, index) in getEditpetKindData" :key="index" :value="item.id" :label="item.name">{{ item.name }} </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="宠物品种" prop="pet.petVarietie">
							<el-select filterable v-model="ruleForm.pet.petVarietie" placeholder="请选择宠物品种">
								<el-option v-for="(item, index) in getEditpetVarietieData" :key="index" :value="item.id" :label="item.name">{{ item.name }} </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="宠物血型" prop="pet.petBlood">
							<el-select  v-model="ruleForm.pet.petBlood" placeholder="请选择宠物血型">
								<el-option v-for="(item, index) in getEditpetBloodData" :key="index" :value="item.value" :label="item.label">{{ item.label }} </el-option>
							</el-select>
						</el-form-item>
						<el-form-item  label="宠物颜色" prop="pet.petColor">
							<el-select filterable v-model="ruleForm.pet.petColor" placeholder="请选择宠物颜色">
								<el-option v-for="(item, index) in getEditpetColorData" :key="index" :value="item.value" :label="item.label">{{ item.label }} </el-option>
							</el-select>
						</el-form-item>
						
						<el-form-item label="宠物体重" prop="pet.petWeight">
							<el-input-number v-model="ruleForm.pet.petWeight" placeholder="宠物体重" :precision="2" :step="0.1" :min="0.01" > </el-input-number>
							<span style="margin-left: 30px;">单位：Kg</span>
						</el-form-item>
						<el-form-item label="宠物状态" prop="pet.petStatus">
							<el-select  v-model="ruleForm.pet.petStatus" placeholder="请选择宠物状态">
								<el-option v-for="(item, index) in getEditpetStatusData" :key="item.value" :value="item.value" :label="item.label">{{ item.label }} </el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="宠物备注 " prop="pet.petRemark">
							<el-input v-model="ruleForm.pet.petRemark" placeholder="请输入宠物备注 " type="textarea" clearable />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="犬证号码 " prop="pet.petIdentityNumber">
							<el-input v-model="ruleForm.pet.petIdentityNumber" placeholder="请输入犬证号码 " clearable />
						</el-form-item>
						<el-form-item label="宠物芯片 " prop="pet.petChip">
							<el-input v-model="ruleForm.pet.petChip" placeholder="请输入宠物芯片 " clearable />
						</el-form-item>
						<el-form-item label="已接种疫苗" prop="pet.petIsVaccinated">
							<!--                            <el-switch v-model="ruleForm.petIsVaccinated" active-text="是" inactive-text="否"/>-->
							<el-radio-group v-model="ruleForm.pet.petIsVaccinated">
								<el-radio :value="-1">未知</el-radio>
								<el-radio :value="1">是</el-radio>
								<el-radio :value="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="已驱虫" prop="pet.petIsDeworming">
							<!--                            <el-switch v-model="ruleForm.petIsDeworming" active-text="是" inactive-text="否"/>-->
							<el-radio-group v-model="ruleForm.pet.petIsDeworming">
								<el-radio :value="-1">未知</el-radio>
								<el-radio :value="1">是</el-radio>
								<el-radio :value="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="是否绝育" prop="pet.petIsSterilization">
							<!--                            <el-switch v-model="ruleForm.petIsSterilization" active-text="是" inactive-text="否"/>-->
							<el-radio-group v-model="ruleForm.pet.petIsSterilization">
								<el-radio :value="-1">未知</el-radio>
								<el-radio :value="1">是</el-radio>
								<el-radio :value="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="宠物照片 " prop="pet.petImageUrl">
							<el-upload list-type="picture-card" :limit="1" :show-file-list="false" :http-request="uploadPetImageUrlHandle">
								<img v-if="ruleForm.pet.petImageUrl" :src="ruleForm.pet.petImageUrl" style="width: 100%; height: 100%; object-fit: contain" />
								<el-icon v-else>
									<Plus />
								</el-icon>
							</el-upload>
						</el-form-item>
						<el-form-item label="药物过敏 " prop="pet.petDrugAllergy">
							<el-input v-model="ruleForm.pet.petDrugAllergy" placeholder="请输入药物过敏 " type="textarea" clearable />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel" size="default">取 消</el-button>
					<el-button type="primary" @click="submit" size="default">保 存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="editDialog">
import { ref, onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { PcustomerApi, MemberLevelApi } from '/@/api-services';
import { SysPetConfigApi, SysFileApi } from '/@/api-services/api';
import other from '/@/utils/other';
import { UploadRequestOptions } from 'element-plus';
import { useUserInfo } from '/@/stores/userInfo';
import { getDictDataList } from '/@/utils/dict-utils';

const stores = useUserInfo();
const getEditlevelData = ref<any>([]);
const getEditsourceidData = ref<any>([]);
const getEditsexData = ref<any>([]);
const getEditpetGenderData = ref<any>([]);
const getEditpetKindData = ref<any>([]);
const getEditpetVarietieData = ref<any>([]);
const getEditpetBloodData = ref<any>([]);
const getEditpetColorData = ref<any>([]);
const getEditpetStatusData = ref<any>([]);
const address = ref<any>([]);
const petFormRef = ref();
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
const ruleForm = ref<any>({
	pet: {
		petName: '',
		petGender: '-1',
		petKind: '',
		petVarietie: null,
		petBlood: '',
		petColor: '',
		petBirthDate: null,
		petWeight: 1.0,
		petIdentityNumber: '',
		petChip: '',
		petIsVaccinated: -1,
		petIsDeworming: -1,
		petIsSterilization: -1,
		petDrugAllergy: '',
		petRemark: '',
	},
});
let petEntity = {
	name: '',
	level: '',
	sourceId: '',
	cellPhone: '',
	sex: '-1',
	birthdate: '',
	phone: '',
	email: '',
	address: '[]',
	addressDetails: '',
	pet: {
		petName: '',
		petGender: '',
		petKind: '',
		petVarietie: null,
		petBlood: '',
		petColor: '',
		petBirthDate: null,
		petWeight: 1.0,
		petIdentityNumber: '',
		petChip: '',
		petIsVaccinated: -1,
		petIsDeworming: -1,
		petIsSterilization: -1,
		petDrugAllergy: '',
		petRemark: '',
		petStatus:'1',
	},
};
const options = ref<any>([]);
const customProps = {
	multiple: false, // 启用多选
	emitPath: false, // 只返回该节点的值
	value: 'id', // 自定义当前数组的键名 - value
	label: 'name', // 自定义当前数组的键名 - label
	children: 'children', // 自定义当前数组的键名 - children
	expandTrigger: 'click', // 次级菜单的展开方式 - click/hover
};
console.log(" stores.sysRegions", stores.sysRegions)
const loadRegion = async () => {
	options.value = stores.sysRegions;
};

//自行删除非必填规则
const rules = ref<FormRules>({
	name: [{ required: true, message: '请输入会员名称！', trigger: 'blur' }],
	level: [{ required: true, message: '请选择会员级别！', trigger: 'change' }],
	sourceId: [{ required: true, message: '请选择客户来源！', trigger: 'change' }],
	sex: [{ required: true, message: '请选择性别！', trigger: 'change' }],
	cellPhone: [{ required: true, message: '请输入手机号！', trigger: 'blur' },{ min: 11, max: 11, message: '手机号不能超过11位', trigger: 'blur' }
	// ,{ type: 'number', message: '输入内容不是有效的号码', trigger: 'blur' }
],
	'pet.petName': [{ required: true, message: '请输入宠物名称！', trigger: 'blur' }],
	'pet.petKind': [{ required: true, message: '请选择宠物种类！', trigger: 'change' }],
	// 'pet.petVarietie': [{ required: true, message: '请选择宠物品种！', trigger: 'change' }],
	'pet.petBirthDate': [{ required: true, message: '请选择宠物生日！', trigger: 'change' }],
});

// 打开弹窗
const openDialog = async (row: any) => {
	getEditpetGenderData.value = getDictDataList('code_pet_sex');
	getEditpetBloodData.value = getDictDataList('code_pet_blood');
	getEditpetStatusData.value = getDictDataList('code_pet_status');
	getEditpetColorData.value = getDictDataList('code_pet_color');
	await loadRegion();
	ruleForm.value = other.deepClone(petEntity);
	
	getEditsourceidData.value = getDictDataList('code_customer_source');

	// 客户来源默认设置门店登记
	var defaultCustomerSource = getEditsourceidData.value.filter((x: any) => x.label == "门店登记");
	if (defaultCustomerSource.length > 0) {
		ruleForm.value.sourceId = defaultCustomerSource[0].value;
	}

	getEditsexData.value = getDictDataList('code_sex');
	address.value = ruleForm.value.address ? JSON.parse(ruleForm.value.address) : [];
	isShowDialog.value = true;
};

// 关闭弹窗
const closeDialog = (row:any) => {
	ruleFormRef.value?.resetFields();
	emit('reloadTable', row);
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	ruleFormRef.value?.resetFields();
	isShowDialog.value = false;
};

const uploadPetImageUrlHandle = async (options: UploadRequestOptions) => {
	const res = await getAPI(SysFileApi).apiSysFileUploadFilePostForm(options.file);
	ruleForm.value.pet.petImageUrl = res.data.result?.url;
	ruleForm.value.pet.petImageId = res.data.result?.id;
};

/**
 * 获取宠物种类
 */
const getSysPetKind = async () => {
	const res = await getAPI(SysPetConfigApi).apiSysPetKindGet();
	return res.data.result ?? [];
};

/**
 * 种类值变更事件
 * @param kindId
 * @constructor
 */
const KindChange = async (kindId:any) => {
	if (!kindId) return;
	const res = await getAPI(SysPetConfigApi).apiSysPetVarietieGetByKindId(kindId);
	getEditpetVarietieData.value = res.data.result ?? [];
	ruleForm.value.pet.petVarietie = null;
};

// 提交
const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			let values = ruleForm.value;
			values.address = JSON.stringify(address.value);
			let dot = {} as any;
			let r = await getAPI(PcustomerApi).apiPcustomerAddPcuPetPost(values);
				dot = r.data?.result;
			// if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
			// 	let r = await getAPI(PcustomerApi).apiPcustomerEditPut(values); // updatePcustomer(values);
			// 	dot = r.data?.result;
			// } else {
			// 	let r = await getAPI(PcustomerApi).apiPcustomerAddPcuPetPost(values);
			// 	dot = r.data?.result;
			// }
			closeDialog(dot);
		}
	});
};



// 页面加载时
onMounted(async () => {
	await getAPI(MemberLevelApi)
		.apiMemberLevelListPost({})
		.then((res) => {
			getEditlevelData.value = res.data?.result ?? [];
			res.data?.result.forEach((element:any) => {
				if(element.isDefault){
					ruleForm.value.level = element.id;
				}
			});
		});
	getEditpetKindData.value = await getSysPetKind();
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
