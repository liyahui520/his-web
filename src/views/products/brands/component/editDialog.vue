<template>
	<div class="productBrands-container">
		<el-dialog v-model="isShowDialog" :title="props.title" :width="700" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
				<el-row :gutter="35">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="名称" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入名称" clearable="" maxlength="100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="联系人" prop="contacter">
							<el-input v-model="ruleForm.contacter" placeholder="请输入联系人" clearable="" maxlength="50" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="联系人电话" prop="telephone">
							<el-input v-model="ruleForm.telephone" placeholder="请输入联系人电话" clearable="" maxlength="20" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="联系地址" prop="address">
							<el-input v-model="ruleForm.address" placeholder="请输入联系地址" clearable="" maxlength="100" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="mb20">
						<el-form-item label="备注" prop="reamrk">
							<el-input type="textarea" v-model="ruleForm.reamrk" placeholder="请输入备注" clearable="" maxlength="100" />
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
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';

import {useUserInfo} from '/@/stores/userInfo';
import { getAPI } from '/@/utils/axios-utils';
import { ProductBrandsApi } from '/@/api-services/api';
import other from '/@/utils/other';
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
//自行删除非必填规则
const rules = ref<FormRules>({
	name: [{ required: true, message: '请输入名称！', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (row: any) => {
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
				await getAPI(ProductBrandsApi).apiProductBrandsEditPut(values);
			} else {
				await getAPI(ProductBrandsApi).apiProductBrandsAddPost(values);
			}
			await useUserInfo().reloadProductBrandList();
			closeDialog();
		}
	});
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
