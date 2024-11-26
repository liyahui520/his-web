<template>
	<div class="import-container">
		<el-dialog v-model="isShowDialog" :fullscreen="true" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-card shadow="never" style="height: calc(100vh - 125px)" :body-style="{ padding: 0 }">
				<Table ref="tableRef" v-if="PropVirtTableS.tables" :PropVirtTableS="PropVirtTableS"> </Table>
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-text class="mx-1" type="primary" style="margin-right: 10px;">待导入总条数：{{PropVirtTableS.tables.length}}条</el-text>
					<el-button @click="cancel" size="default">取 消</el-button>
					<el-button type="primary" @click="submit" size="default">数据上传</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="tsx" setup name="editDialog">
import { defineAsyncComponent, nextTick, onMounted, reactive, ref, h } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { getDictDataList as dl } from '/@/utils/dict-utils';
import { getAPI } from '/@/utils/axios-utils';
import { ImportPcuPetApi } from '/@/api-services';
import { ElButton, ElTag, ElInput, ElSelect, ElOption } from 'element-plus';
import type { Column } from 'element-plus';

const Table = defineAsyncComponent(() => import('/@/components/table/tableV2.vue'));
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

//定义数据结构
let PropVirtTableS = reactive({
	tables: [],
	TableHeigth: '700',
	isLoading: true,
	//自己定义的列表头显示数据 注意：application_module KEY值需要跟显示数据的KEY对应，否则此列数据显示不出来.
	keyS: {
		cardNumber: {
			title: '会员编号',
			width: 150,
			// type: 'input',
		},
		name: {
			title: '会员名称',
			width: 150,
			// type: 'input',
		},
		sexText: {
			title: '性别',
			width: 100,
			// type: 'select',
			// multiple: false,
			// value: 'label',
			// key: 'value',
			// children: [
			// 	{ label: '女', value: '1' },
			// 	{ label: '男', value: '0' },
			// 	{ label: '未知', value: '-1' },
			// ],
		},
		cellPhone: {
			title: '联系电话',
			width: 120,
			// type: 'input',
		},
		levelText: {
			title: '会员级别',
			width: 120,
			// type: 'select',
			// multiple: false,
			// value: 'label',
			// key: 'value',
			// children: [
			// 	{ label: '女', value: '1' },
			// 	{ label: '男', value: '0' },
			// 	{ label: '未知', value: '-1' },
			// ],
		},
		birthdate: {
			title: '会员生日',
			width: 150,
			// type: 'date',
		},
		sourceText: {
			title: '客户来源',
			width: 120,
			// type: 'select',
			// multiple: false,
			// value: 'label',
			// key: 'value',
			// children: [
			// 	{ label: '女', value: '1' },
			// 	{ label: '男', value: '0' },
			// 	{ label: '未知', value: '-1' },
			// ],
		},
		petRecordNumber: {
			title: '病历号码',
			width: 100,
			// type: 'input',
		},
		petName: {
			title: '宠物名称',
			width: 150,
			// type: 'input',
		},
		petGenderText: {
			title: '宠物性别',
			width: 100,
			// type: 'select',
			// multiple: false,
			// value: 'label',
			// key: 'value',
			// children: [
			// 	{ label: '女', value: '1' },
			// 	{ label: '男', value: '0' },
			// 	{ label: '未知', value: '-1' },
			// ],
		},
		petBirthDate: {
			title: '宠物生日',
			width: 150,
			// type: 'date',
		},
		petKindText: {
			title: '宠物种类',
			width: 100,
			// type: 'select',
			// multiple: false,
			// value: 'label',
			// key: 'value',
			// children: [
			// 	{ label: '女', value: '1' },
			// 	{ label: '男', value: '0' },
			// 	{ label: '未知', value: '-1' },
			// ],
		},
		petVarietieText: {
			title: '宠物品种',
			width: 120,
			// type: 'select',
			// multiple: false,
			// value: 'label',
			// key: 'value',
			// children: [
			// 	{ label: '女', value: '1' },
			// 	{ label: '男', value: '0' },
			// 	{ label: '未知', value: '-1' },
			// ],
		},
		petColorText: {
			title: '宠物颜色',
			width: 100,
			// type: 'select',
			// multiple: false,
			// value: 'label',
			// key: 'value',
			// children: [
			// 	{ label: '女', value: '1' },
			// 	{ label: '男', value: '0' },
			// 	{ label: '未知', value: '-1' },
			// ],
		},
		petWeight: {
			title: '宠物体重（Kg）',
			width: 120,
			// type: 'inputnumber',
		},
		petRemark: {
			title: '备注',
			width: 200,
			// type: 'input',
		},
		// operate: {
		// 	title: '操作',
		// 	width: 100,
		// 	fixed:'right',
		// 	children: [
		// 		{
		// 			title: '删除',
		// 			isshow: `buts.includes('system-users-delete')`,
		// 			type: 'delete',
		// 		},
		// 	],
		// },
	},
});

const selectedValue = ref(null);
const options = ref([
	{ value: '0', label: '未知' },
	{ value: '1', label: '男' },
	{ value: '2', label: '女' },
]);

const isShowDialog = ref(false);

// 打开弹窗
const openDialog = async (row: any) => {
	PropVirtTableS.tables = row;
	isShowDialog.value = true;
	PropVirtTableS.isLoading = false;
};

// 关闭弹窗
const closeDialog = (row) => {
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};

// 提交
const submit = async () => {
	if(PropVirtTableS.tables.length>0)
	{
		await getAPI(ImportPcuPetApi).apiImportPcuPetUploadServePcuPost(PropVirtTableS.tables);
		ElMessage.success("导入成功");
	}else{
		ElMessage.warning("未识别到有效数据");
	}
};

const getDictDataDropdownList = async (val: any) => {
	return await dl(val);
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style lang="scss" scoped>
// .el-dialog.is-fullscreen {
// 	//overflow: hidden !important;
// }
// :deep(.el-dialog__body) {
// 	// height: calc(100vh - 85px) !important;
// } 
	:deep(.el-dialog__footer) {
		padding-top: 0 !important;
		text-align: center !important;
	} 
</style>
