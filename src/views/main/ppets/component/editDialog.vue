<template>
	<div class="ppets-container">
		<el-dialog v-model="isShowDialog" :width="760" draggable="">
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
					<!--                    <el-form-item v-show="false">-->
					<!--                        <el-input v-model="ruleForm.id"/>-->
					<!--                    </el-form-item>-->

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="病历号码 " prop="petRecordNumber">
							<el-input type="text" v-model="ruleForm.petRecordNumber" placeholder="请输入病历号码 ">
								<template #append>
									<el-button>设置</el-button>
								</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="宠物名称" prop="petName">
							<el-input v-model="ruleForm.petName" placeholder="请输入宠物名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="性别" prop="petGender">
							<el-select clearable v-model="ruleForm.petGender" placeholder="请选择性别">
								<el-option v-for="(item, index) in getEditpetGenderData" :key="index" :value="item.code" :label="item.value">{{ item.value }} </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="宠物种类" prop="petKind">
							<el-select clearable v-model="ruleForm.petKind" placeholder="请选择宠物种类" @change="KindChange">
								<el-option v-for="(item, index) in getEditpetKindData" :key="index" :value="item.id" :label="item.name">{{ item.name }} </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="宠物品种" prop="petVarietie">
							<el-select clearable v-model="ruleForm.petVarietie" placeholder="请选择宠物品种">
								<el-option v-for="(item, index) in getEditpetVarietieData" :key="index" :value="item.id" :label="item.name">{{ item.name }} </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="宠物血型" prop="petBlood">
							<el-select clearable v-model="ruleForm.petBlood" placeholder="请选择宠物血型">
								<el-option v-for="(item, index) in getEditpetBloodData" :key="index" :value="item.code" :label="item.value">{{ item.value }} </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="宠物颜色" prop="petColor">
							<el-select clearable v-model="ruleForm.petColor" placeholder="请选择宠物颜色">
								<el-option v-for="(item, index) in getEditpetColorData" :key="index" :value="item.code" :label="item.value">{{ item.value }} </el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="生日" prop="petBirthDate">
							<el-date-picker v-model="ruleForm.petBirthDate" type="date" placeholder="请选择宠物生日" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="宠物体重" prop="petWeight">
							<el-input-number v-model="ruleForm.petWeight" placeholder="请输入宠物体重" :precision="2" :step="0.1" :min="0.01" clearable> </el-input-number>
							<span><el-tag type="success">Kg</el-tag></span>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="宠物状态" prop="petStatus">
							<el-select clearable v-model="ruleForm.petStatus" placeholder="请选择宠物状态">
								<el-option v-for="(item, index) in getEditpetStatusData" :key="item.code" :value="item.code" :label="item.value">{{ item.value }} </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-divider border-style="dashed" content-position="center">
						<div style="color: #b1b3b8">拓展信息</div>
					</el-divider>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="犬证号码 " prop="petIdentityNumber">
							<el-input v-model="ruleForm.petIdentityNumber" placeholder="请输入犬证号码 " clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="宠物芯片 " prop="petChip">
							<el-input v-model="ruleForm.petChip" placeholder="请输入宠物芯片 " clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="已接种疫苗" prop="petIsVaccinated">
							<!--                            <el-switch v-model="ruleForm.petIsVaccinated" active-text="是" inactive-text="否"/>-->
							<el-radio-group v-model="ruleForm.petIsVaccinated">
								<el-radio :value="-1">未知</el-radio>
								<el-radio :value="1">是</el-radio>
								<el-radio :value="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="已驱虫" prop="petIsDeworming">
							<!--                            <el-switch v-model="ruleForm.petIsDeworming" active-text="是" inactive-text="否"/>-->
							<el-radio-group v-model="ruleForm.petIsDeworming">
								<el-radio :value="-1">未知</el-radio>
								<el-radio :value="1">是</el-radio>
								<el-radio :value="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否绝育" prop="petIsSterilization">
							<!--                            <el-switch v-model="ruleForm.petIsSterilization" active-text="是" inactive-text="否"/>-->
							<el-radio-group v-model="ruleForm.petIsSterilization">
								<el-radio :value="-1">未知</el-radio>
								<el-radio :value="1">是</el-radio>
								<el-radio :value="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="宠物照片 " prop="petImageUrl">
							<el-upload list-type="picture-card" :limit="1" :show-file-list="false" :http-request="uploadPetImageUrlHandle">
								<img v-if="ruleForm.petImageUrl" :src="ruleForm.petImageUrl" style="width: 100%; height: 100%; object-fit: contain" />
								<el-icon v-else>
									<Plus />
								</el-icon>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="药物过敏 " prop="petDrugAllergy">
							<el-input v-model="ruleForm.petDrugAllergy" placeholder="请输入药物过敏 " type="textarea" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="宠物备注 " prop="petRemark">
							<el-input v-model="ruleForm.petRemark" placeholder="请输入宠物备注 " type="textarea" clearable />
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
import { ref, onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { Plus, Watch } from '@element-plus/icons-vue';
import { UploadRequestOptions } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { SysPetConfigApi, PPetsApi, SysFileApi,SysDictDataApi } from '/@/api-services/api';
import { AddPPetsInput, PPets, UpdatePPetsInput } from '/@/api-services';
import other from '/@/utils/other';

const getEditpetGenderData = ref<any>([]);
const getEditpetKindData = ref<any>([]);
const getEditpetVarietieData = ref<any>([]);
const getEditpetBloodData = ref<any>([]);
const getEditpetColorData = ref<any>([]);
const getEditpetStatusData = ref<any>([]);
const getSysPetKindData = ref<any>([]);
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
const ruleForm = ref<any>({});
//自行添加其他规则
const rules = ref<FormRules>({
	petName: [{ required: true, message: '请输入宠物名称！', trigger: 'blur' }],
	petKind: [{ required: true, message: '请选择宠物种类！', trigger: 'change' }],
	petVarietie: [{ required: true, message: '请选择宠物品种！', trigger: 'change' }],
	petBirthDate: [{ required: true, message: '请选择宠物生日！', trigger: 'change' }],
});

// 打开弹窗

const openDialog = async (row: PPets) => {
	getEditpetGenderData.value = await getAPI(SysDictDataApi).apiSysDictDataDataListCodeGet('code_pet_sex');

	getEditpetKindData.value = await getSysPetKind();
	getEditpetBloodData.value = await getAPI(SysDictDataApi).apiSysDictDataDataListCodeGet('code_pet_blood');
	getEditpetStatusData.value = await getAPI(SysDictDataApi).apiSysDictDataDataListCodeGet('code_pet_status');
	getEditpetColorData.value = await getAPI(SysDictDataApi).apiSysDictDataDataListCodeGet('code_pet_color');
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
				await getAPI(PPetsApi).apiPPetsIdEditPut(ruleForm.value.id, values as UpdatePPetsInput);
			} else {
				// await addPpets(values);
				await getAPI(PPetsApi).apiPPetsAddPost(values as AddPPetsInput);
			}
			closeDialog();
		} 
	});
};

const uploadPetImageUrlHandle = async (options: UploadRequestOptions) => {
	const res = await getAPI(SysFileApi).apiSysFileUploadFilePostForm(options.file);
	ruleForm.value.petImageUrl = res.data.result?.url;
	ruleForm.value.petImageId = res.data.result?.id;
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
const KindChange = async (kindId) => {
	if (!kindId) return;
	const res = await getAPI(SysPetConfigApi).apiSysPetVarietieGetByKindId(kindId);
	getEditpetVarietieData.value = res.data.result ?? [];
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog, KindChange });
</script>
