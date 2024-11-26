<template>
	<div class="memberLevel-container">
		<el-dialog v-model="isShowDialog" :width="700" draggable="">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="ruleForm" ref="ruleFormRef" label-width="120px" :rules="rules">
				<el-row :gutter="35">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="会员级别名称" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入会员级别名称" clearable="" />
						</el-form-item>
					</el-col>
					<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="父级id" prop="parentid">
							<el-select clearable="" v-model="ruleForm.parentid" placeholder="请选择父级id">
								<el-option v-for="(item, index) in getEditparentidData" :key="index" :value="item.value" :label="item.label">{{ item.label }}</el-option>
							</el-select>
						</el-form-item>
					</el-col> -->
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="启用会员价" prop="enableddiscount">
							<el-switch v-model="ruleForm.enableddiscount" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="状态" prop="isEnabled">
							<el-switch v-model="ruleForm.isEnabled" active-text="启用" inactive-text="禁用" />
						</el-form-item>
					</el-col>
					<!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="会员级别整体折扣" prop="discount">
							<el-input v-model="ruleForm.discount" placeholder="请输入会员级别整体折扣" clearable="" />
						</el-form-item>
					</el-col> -->
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="排序列" prop="sortindex">
							<el-input-number v-model="ruleForm.sortindex" placeholder="请输入排序列" clearable="" />
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
import {getAPI} from "/@/utils/axios-utils";
import {MemberLevelApi} from "/@/api-services";
import other from '/@/utils/other';

const getEditparentidData = ref<any>([]);
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
const ruleForm = ref<any>({ parentid: 0, discount: 0, sortindex: 100, enableddiscount: true });
//自行删除非必填规则
const rules = ref<FormRules>({
	name: [{ required: true, message: '请输入会员级别名称！', trigger: 'blur' }],
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
				await getAPI(MemberLevelApi).apiMemberLevelEditPut(values);
			} else {
				
				await getAPI(MemberLevelApi).apiMemberLevelAddPost(values);
			}
			closeDialog();
		} 
	});
};

// 页面加载时
onMounted(async () => {
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
