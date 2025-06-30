<template>
	<div  >
		<el-card shadow="never" :body-style="{ paddingBottom: '5px', padding: '0' }">
		<TableSearch :search="tb.tableData.search" :param="tb.tableData.param" @search="onSearch" />
	</el-card>
	<el-card class="full-table" shadow="never" style="margin-top: 0; padding: 0;height: calc(100vh - 300px)"  :body-style="{ padding: '0px 0px 10px 0px' }">
		<Table ref="tableRef" v-bind="tb.tableData" :getData="getData" @sortHeader="onSortHeader" border>
			<template #customerName="scope">
				<el-button type="primary" link @click="selectPcu(scope.row)">{{ scope.row.customerName }} </el-button>
			</template>
		</Table>
	</el-card>
	</div>
</template>

<script lang="ts" setup name="list">
import { defineAsyncComponent, onMounted, reactive, ref, nextTick } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { RegistersApi, CallNumberApi } from '/@/api-services';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';
// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/table/search.vue'));
const emit = defineEmits(['selectPcuReload']);
const tableRef = ref();
const stores = useUserInfo();
const { userList } = storeToRefs(stores);

const tb = reactive<TableDemoState>({
	isDisabled: false,
	isHidden: false,
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'customerName',
				label: '会员名称',
				minWidth: '120',
				headerAlign: 'center',
				sortable: 'custom',
				align: 'center',
				isCheck: true,
				fixed: 'left',
				hideCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'petName',
				minWidth: '100',
				label: '宠物名称',
				headerAlign: 'center',
				sortable: 'custom',
				align: 'center',
				isCheck: true,
				fixed: 'left',
				hideCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'cellPhone',
				label: '手机号',
				minWidth: '120',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'regTypeText',
				minWidth: 100,
				label: '病例类型',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				//sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'statusText',
				minWidth: 120,
				label: '诊疗状态',
				headerAlign: 'center',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'doctorName',
				minWidth: 120,
				label: '挂号医生',
				headerAlign: 'center',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'roomName',
				minWidth: 120,
				label: '诊室',
				headerAlign: 'center',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'callNumberText',
				minWidth: 120,
				label: '编号',
				headerAlign: 'center',
				align: 'center',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'createTime',
				label: '创建日期',
				minWidth: 140,
				align: 'center',
				isCheck: true,
				sortable: 'custom',
				showOverflowTooltip: true,
			},
			// {
			// 	prop: 'action',
			// 	width: 180,
			// 	label: '操作',
			// 	type: 'action',
			// 	align: 'center',
			// 	isCheck: true,
			// 	fixed: 'right',
			// 	hideCheck: true,
			// },
		],
		// 配置项（必传）
		config: {
			isStripe: true, // 是否显示表格斑马纹
			isBorder: false, // 是否显示表格边框
			isSerialNo: true, // 是否显示表格序号
			isSelection: true, // 是否勾选表格多选
			showSelection: false, //是否显示表格多选
			pageSize: 20, // 每页条数
			hideExport: false, //是否隐藏导出按钮
			exportFileName: '待诊疗', //导出报表的文件名，不填写取应用名称
			// hideLoad: false,
			hidePrint: true,
			hideTool: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [
			{ label: '用户名称/宠物名称/手机号', prop: 'name', placeholder: '请输入用户名称/宠物名称/手机号', required: false, type: 'input' },
			{
				label: '挂号医生',
				prop: 'doctorId',
				placeholder: '请选择挂号医生',
				required: false,
				type: 'select',
				options: [],
				optionkey: 'value',
				optionname: 'label',
			},
		],
		param: { name: '', status: 0 },
	},
});
/**
 * 选择用户
 * @param row
 */
const selectPcu = async (row: any) => {
	emit('selectPcuReload', { pcustomerId: row.customerId });
};

// 搜索点击时表单回调
const onSearch = (data: any) => {
	tb.tableData.param = Object.assign({}, tb.tableData.param, { ...data }, { status: 0 });
	nextTick(() => {
		tableRef.value.pageReset();
	});
};

const getData = async (param: any) => {
	param.status = 0;
	let r = await getAPI(RegistersApi).apiRegistersPagePost(param);
	return r.data;
};
// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};

onMounted(async () => {
	let userArray = userList.value;
	userArray?.forEach((itme: any) => {
		tb.tableData.search[1].options?.push({ value: itme.id, label: itme.realName });
	});
});
</script>

<style scoped></style>
