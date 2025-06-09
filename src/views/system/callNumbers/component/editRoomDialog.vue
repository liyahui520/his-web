<template>
	<div class="systemCallNumberEditRooms-container">
		<el-dialog v-model="isShowDialog" :title="props.title" :width="500" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
				<el-row :gutter="12">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="诊室编码" prop="code">
							<el-select v-model="ruleForm.code" placeholder="请选择诊室编码" style="width: 100%" >
								<el-option v-for="item in codeDataList" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="诊室名称" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入诊室名称" clearable="" maxlength="6" show-word-limit />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="排序" prop="sortIndex">
							<el-input-number
								v-model="ruleForm.sortIndex"
								placeholder="请输入排序"
								@change="
									(val: any) => {
										if (!val) ruleForm.value.sortIndex = 0;
									}
								"
							/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="状态" prop="status">
							<el-switch v-model="ruleForm.status" :active-value="0" :inactive-value="1" active-text="启用" inactive-text="禁用" />
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
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { CallNumberApi } from '/@/api-services/api';
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
	code: [{ required: true, message: '请选择诊室编码！', trigger: 'change' }],
	name: [{ required: true, message: '请输入诊室名称！', trigger: 'blur' }],
	sortIndex: [{ required: true, message: '请输入排序！', trigger: 'blur' }],
});
//A-Z 大写 补全codeDataList 数组
const codeDataList = ref<any>([]);

/**
 * 编码
 */
const loadCodeDataList = (allCode: any) => {
	// 使用循环填充 A-Z
	for (let i = 65; i <= 90; i++) {
		//判断allcode中是否包含 当前字符
		if (!allCode.includes(String.fromCharCode(i))) codeDataList.value.push(String.fromCharCode(i));
	}
};

// 打开弹窗
const openDialog = (row: any, allCode: any) => {
	codeDataList.value=[];
	loadCodeDataList(allCode);
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
				await getAPI(CallNumberApi).apiCallNumberEditCallRoomPost(values);
			} else {
				await getAPI(CallNumberApi).apiCallNumberAddCallRoomPost(values);
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
