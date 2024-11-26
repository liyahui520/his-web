<template>
	<div class="memberLevel-container">
		<el-dialog v-model="isShowDialog" width="50%" draggable="">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
            <el-input style="height: 500px;"
                v-model="$props.errorMessage" 
                :autosize="{ minRows: 22, maxRows: 22 }"
                type="textarea" readonly
            />
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

const getEditparentidData = ref<any>([]);
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
    errorMessage:{
        type: String,
        default:''
    }
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
 

// 打开弹窗
const openDialog = (row: any) => { 
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
	isShowDialog.value = false;
};

// 页面加载时
onMounted(async () => {
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
