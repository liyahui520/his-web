<template>
	<div class="productBrands-container">
		<el-dialog v-model="isShowDialog" :title="props.title" width="40%" draggable :close-on-click-modal="false">
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
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="类型" prop="type">
							<el-select v-model="ruleForm.type" style="width: 70%" @change="handleChangeType">
								<el-option v-for="(item, index) in sysSMSTemplateEnum" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="模板名称" prop="templateName">
							<el-input v-model="ruleForm.templateName" style="width: 70%" placeholder="请输入模板名称" clearable="" maxlength="200" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="启用" prop="isEnable">
							<el-switch v-model="ruleForm.isEnable" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="可选">
							<el-check-tag
								v-for="item in items"
								checked
								style="margin-right: 8px; margin-top: 8px"
								@change="
									(status: boolean) => {
										onChange(item);
									}
								"
								:key="item.label"
								>{{ item.label }}</el-check-tag
							>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="mb20">
						<el-form-item label="内容" prop="content">
							<el-input
								ref="contentRef"
								type="textarea"
								@blur="blurEvent"
								:autofocus="true"
								v-model="ruleForm.content"
								show-word-limit
								placeholder="请输入内容"
								:rows="5"
								clearable=""
								maxlength="500"
							/>
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

import { getAPI } from '/@/utils/axios-utils';
import { SMSTemplateApi } from '/@/api-services/api';
import other from '/@/utils/other';

const blurIndex = ref<any>(0);
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
const contentRef = ref();
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const ruleForm = ref<any>({ content: '' });
const sysSMSTemplateEnum = ref<any>([
	{ id: 0, name: '疫苗短信' },
	{ id: 1, name: '预约短信' },
	{ id: 2, name: '推广短信' },
	// { id: 3, name: '系统短信' },
]);

const onChange = (item: any) => {
	let index = blurIndex.value;
	let str = ruleForm.value.content ?? '';
	ruleForm.value.content = str.slice(0, index) + '{' + item.label + '}' + str.slice(index);
	blurIndex.value = index + item.label.length + 2;
};
const items = ref<any>([{ label: '机构名称' }, { label: '机构地址' }, { label: '机构联系方式' }, { label: '宠主姓名' }, { label: '宠物名称' }, { label: '接种时间' }]);

const handleChangeType = (data: any) => {
	if (data == 0) {
		items.value = [{ label: '机构名称' }, { label: '机构地址' }, { label: '机构联系方式' }, { label: '宠主姓名' }, { label: '宠物名称' }, { label: '接种时间' }];
	} else if (data == 1) {
		items.value = [{ label: '机构名称' }, { label: '机构地址' }, { label: '机构联系方式' }, { label: '宠主姓名' }, { label: '宠物名称' }, { label: '预约时间' }];
	} else if (data == 2) {
		items.value = [{ label: '机构名称' }, { label: '机构地址' }, { label: '机构联系方式' }];
	} else if (data == 3) {
		items.value = [
			{ label: '机构名称' },
			{ label: '机构地址' },
			{ label: '机构联系方式' },
			{ label: '宠主姓名' },
			{ label: '会员卡编号' },
			{ label: '消费时间' },
			{ label: '退款时间' },
			{ label: '消费金额' },
			{ label: '退款金额' },
			{ label: '消费次数' },
			{ label: '退款次数' },
			{ label: '会员卡余额' },
			{ label: '次卡余次' },
		];
	}
};

//自行删除非必填规则
const rules = ref<FormRules>({
	type: [{ required: true, message: '请选择类型！', trigger: 'blur' }],
	templateName: [{ required: true, message: '请输入模板名称！', trigger: 'blur' }],
	content: [{ required: true, message: '请输入模板内容！', trigger: 'blur' }],
});

const blurEvent = (e: any) => {
	blurIndex.value = e.srcElement.selectionStart;
};

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
				await getAPI(SMSTemplateApi).apiSMSTemplateEditPost(values);
			} else {
				await getAPI(SMSTemplateApi).apiSMSTemplateAddPost(values);
			}
			closeDialog();
		}
	});
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
