<template>
	<div class="pcustomer-container">
		<el-dialog v-model="isShowDialog" :width="700" draggable :close-on-click-modal="false">
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
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="会员名称" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入会员名称" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="会员级别" prop="level">
							<el-select clearable="" v-model="ruleForm.level" placeholder="请选择会员级别">
								<el-option v-for="(item, index) in getEditlevelData" :key="index" :value="item.id" :label="item.name">{{ item.name }} </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号" prop="cellPhone">
							<el-input v-model="ruleForm.cellPhone" maxlength="11" placeholder="请输入手机号" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="客户来源" prop="sourceId">
							<el-select clearable="" v-model="ruleForm.sourceId" placeholder="请选择客户来源">
								<el-option v-for="(item, index) in getEditsourceidData" :key="index" :value="item.value" :label="item.label">{{ item.label }} </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				
					<!--					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->
					<!--						<el-form-item label="是否散客" prop="isscattered">-->
					<!--							<el-input v-model="ruleForm.isscattered" placeholder="请输入是否散客" clearable="" />-->
					<!--							-->
					<!--						</el-form-item>-->
					<!--						-->
					<!--					</el-col>-->

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="性别" prop="sex">
							<el-select clearable="" v-model="ruleForm.sex" placeholder="请选择性别">
								<el-option v-for="(item, index) in getEditsexData" :key="index" :value="item.value" :label="item.label">{{ item.label }} </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="会员生日" prop="birthdate">
							<el-date-picker v-model="ruleForm.birthdate" type="date" placeholder="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="电话" prop="phone">
							<el-input v-model="ruleForm.phone" placeholder="" clearable="" />
						</el-form-item>
					</el-col>
					<!--					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->
					<!--						<el-form-item label="会员编号" prop="cardNumber">-->
					<!--							<el-input v-model="ruleForm.cardNumber" placeholder="请输入会员编号" clearable="" />-->
					<!--							-->
					<!--						</el-form-item>-->
					<!--						-->
					<!--					</el-col>-->
					<!--					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->
					<!--						<el-form-item label="年龄" prop="age">-->
					<!--							<el-input-number v-model="ruleForm.age" placeholder="请输入年龄" clearable="" />-->
					<!--							-->
					<!--						</el-form-item>-->
					<!--						-->
					<!--					</el-col>-->
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="ruleForm.email" placeholder="" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="地址" prop="address">
							<!--							<el-input v-model="ruleForm.address" placeholder="请输入地址" clearable="" />-->
							<el-cascader style="width: 100%" v-model="address" :options="options" :props="customProps"></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="详细地址" prop="addressDetails">
							<el-input v-model="ruleForm.addressDetails" type="textarea" :rows="2" placeholder="" clearable="" />
						</el-form-item>
					</el-col>

					<!--					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->
					<!--						<el-form-item label="租户Id" prop="tenantId">-->
					<!--							<el-input v-model="ruleForm.tenantId" placeholder="请输入租户Id" clearable="" />-->
					<!--							-->
					<!--						</el-form-item>-->
					<!--						-->
					<!--					</el-col>-->
					<!--					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">-->
					<!--						<el-form-item label="创建者部门Id" prop="createorgid">-->
					<!--							<el-input v-model="ruleForm.createorgid" placeholder="请输入创建者部门Id" clearable="" />-->
					<!--							-->
					<!--						</el-form-item>-->
					<!--						-->
					<!--					</el-col>-->
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

<script lang="ts" setup name="editDialog">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { getDictDataList as dl } from '/@/utils/dict-utils';
import { getAPI } from '/@/utils/axios-utils';
import { PcustomerApi, MemberLevelApi } from '/@/api-services';
import { useUserInfo } from '/@/stores/userInfo';
import other from '/@/utils/other';

const stores = useUserInfo();
const getEditlevelData = ref<any>([]);
const getEditsourceidData = ref<any>([]);
const getEditsexData = ref<any>([]);
const address = ref<any>([]);
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

const options = ref<any>([]);
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

//自行删除非必填规则
const rules = ref<FormRules>({
	name: [{ required: true, message: '请输入会员名称！', trigger: 'blur' }],
	level: [{ required: true, message: '请选择会员级别！', trigger: 'change' }],
	sourceId: [{ required: true, message: '请选择客户来源！', trigger: 'change' }],
	sex: [{ required: true, message: '请选择性别！', trigger: 'change' }],
	cellPhone: [{ required: true, message: '请输入手机号！', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = async (row: any) => {
	await loadRegion();
	ruleForm.value = other.deepClone(row);
	await getAPI(MemberLevelApi)
		.apiMemberLevelListPost({})
		.then((res) => {
			getEditlevelData.value = res.data?.result ?? [];

			// 会员等级默认设置普通会员
			var defaultLevel = getEditlevelData.value.filter((x:any) => x.name == "普通会员");
			if (defaultLevel.length > 0) {
				ruleForm.value.level = defaultLevel[0].id;
			}
		});
	getEditsourceidData.value = await getDictDataDropdownList('code_customer_source');

	// 客户来源默认设置门店登记
	var defaultCustomerSource = getEditsourceidData.value.filter((x: any) => x.label == "门店登记");
	if (defaultCustomerSource.length > 0) {
		ruleForm.value.sourceId = defaultCustomerSource[0].value;
	}

	getEditsexData.value = await getDictDataDropdownList('code_sex');
	address.value = ruleForm.value.address ? JSON.parse(ruleForm.value.address) : [];
	isShowDialog.value = true;
};

// 关闭弹窗
const closeDialog = (row) => {
	ruleFormRef.value?.resetFields(); 
	emit('reloadTable', row.customerId);
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	ruleFormRef.value?.resetFields();
	isShowDialog.value = false;
};

// 提交
const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			let values = ruleForm.value;
			values.address = JSON.stringify(address.value);
			let dot = {};
			if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
				let r = await getAPI(PcustomerApi).apiPcustomerEditPut(values); // updatePcustomer(values);
				dot = r.data?.result;
			} else {
				let r = await getAPI(PcustomerApi).apiPcustomerAddPost(values);
				dot = r.data?.result;
			}
			closeDialog(values);
		}
	});
};

const getDictDataDropdownList = async (val: any) => {
	return await dl(val);
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
