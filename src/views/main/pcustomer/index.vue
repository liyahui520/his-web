<template>
	<div class="pcustomer-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<Search :search="tb.tableData.search" :param="tb.tableData.param" @search="onSearch" />
		</el-card>
		<el-card class="full-table" shadow="never" style="margin-top: 8px">
			<Table ref="tableRef" v-bind="tb.tableData" :getData="getData">
				<template #sexText="scope">
					<el-tag :type="di('code_sex', scope.row.sex)?.tagType"> {{ di('code_sex', scope.row.sex)?.label }} </el-tag>
				</template>
				<template #command>
					<el-button type="primary" size="small" icon="ele-Plus" round @click="openAddPcustomer" v-auth="'pcustomer:add'"> 新增会员 </el-button>
					<el-button type="warning" size="small" icon="ele-Upload" round @click="openImport" v-auth="'pcustomer:add'"> 导入会员 </el-button>
				</template>
				<template #petCount="scope">
					<span>{{ scope.row?.pPetss?.length??0 }}</span>
				</template>
				<template #cardMoney="scope">
					<span>{{ scope.row?.memberCards ?? scope.row?.memberCards[0].totalAmount }}</span>
				</template>
				<template #action="scope">
					<el-space :spacer="spacer">
						<el-button size="small" text="" type="primary" @click="openAddPet(scope.row)" v-auth="'pcustomer:add'"> 新增宠物 </el-button>
						<el-button size="small" text="" type="primary" @click="openDetail(scope.row)" v-auth="'pcustomer:detail'"> 查看详情 </el-button>
						<el-button size="small" text="" type="primary" @click="openEditPcustomer(scope.row)" v-auth="'pcustomer:update'"> 编辑 </el-button>
						<el-button size="small" text="" type="danger" @click="delPcustomer(scope.row)" v-auth="'pcustomer:delete'"> 删除 </el-button>
					</el-space>
				</template>
			</Table>
			<editDialog ref="editDialogRef" :title="editPcustomerTitle" @reloadTable="handleQuery" />
			<editSingDialog ref="editSingDialogRef" :title="editPcustomerTitle" @reloadTable="handleQuery" />
			<petEditDialog ref="petEditDialogRef" :title="editPetTitle" @reloadTable="handleQuery" />
			<uploadExecl ref="uploadExeclRef" :title="importTempTitle" />
			<PcuDetails ref="pcuDetailsRef"/>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="pcustomerManagement">
import { defineAsyncComponent, nextTick, onMounted, reactive, ref, h } from 'vue';
import { ElMessageBox, ElMessage, ElDivider } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import editDialog from '/@/views/main/pcustomer/component/editDialogNew.vue';
import editSingDialog from '/@/views/main/pcustomer/component/editDialog.vue';
import uploadExecl from '/@/views/main/pcustomer/component/uploadExecl.vue';
import petEditDialog from '/@/views/main/ppets/component/editDialog.vue';
import {PcustomerApi,MemberLevelApi } from '/@/api-services/api';


const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const Search = defineAsyncComponent(() => import('/@/components/table/search.vue'));
const PcuDetails = defineAsyncComponent(() => import('./component/pcuDetails.vue'));
const editDialogRef = ref();
const petEditDialogRef = ref();
const tableRef = ref();
const spacer = h(ElDivider, { direction: 'vertical' });
const importTempTitle = ref('导入会员')
const uploadExeclRef = ref();
const editPcustomerTitle = ref('');
const editPetTitle = ref('');
const editSingDialogRef  = ref();
const pcuDetailsRef = ref();
const tb = reactive<TableDemoState>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'createOrgName',
				minWidth: '150',
				label: '所属机构',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'cardNumber',
				minWidth: '150',
				label: '会员编号',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'name',
				minWidth: '120',
				label: '会员名称',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'levelText',
				minWidth: '120',
				label: '会员级别',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'cellPhone',
				minWidth: '160',
				label: '手机号',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'sexText',
				minWidth: '80',
				label: '性别',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'petCount',
				minWidth: '80',
				label: '宠物数量',
				headerAlign: 'center',
				toolTip: true,
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			// {
			//   prop: 'cardMoney',
			//   minWidth: '80',
			//   label: '储值卡余额',
			//   headerAlign: 'center',
			//   toolTip: true,
			//   isCheck: true,
			//   'show-overflow-tooltip': true,
			// },
			{
				prop: 'sourceText',
				minWidth: '120',
				label: '客户来源',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			{
				prop: 'createTime',
				minWidth: '180',
				label: '登记日期',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
			// {
			//   prop: 'createTime',
			//   minWidth: '120',
			//   label: '累计消费',
			//   headerAlign: 'center',
			//   toolTip: true,
			//   sortable: 'custom',
			//   isCheck: true,
			//   type: 'price',
			//   'show-overflow-tooltip': true,
			// },

			{
				prop: 'action',
				width: 320,
				label: '操作',
				type: 'action',
				align: 'center',
				isCheck: true,
				fixed: 'right',
				hideCheck: true,
			},
		],
		// 配置项（必传）
		config: {
			isStripe: true, // 是否显示表格斑马纹
			isBorder: true, // 是否显示表格边框
			isSerialNo: true, // 是否显示表格序号
			isSelection: false, // 是否勾选表格多选
			showSelection: false, //是否显示表格多选
			pageSize: 20, // 每页条数
			hideExport: true, //是否隐藏导出按钮
			exportFileName: '用户信息', //导出报表的文件名，不填写取应用名称
			hideLoad: true,
			hidePrint: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [
			{ label: '', prop: 'params', placeholder: '请输入手机号/用户名/宠物名称', required: false, type: 'input' },
			{
				label: '会员级别',
				prop: 'level',
				placeholder: '请选择会员级别',
				required: false,
				type: 'select',
				options: [],
				optionkey: 'label',
				optionname: 'value',
			},
		],
		param: { params: '' },
		defaultSort: {
			prop: 'name',
			order: 'ascending',
		},
	},
});

const getData = async (par: any) => {
	var res = await getAPI(PcustomerApi).apiPcustomerPagePost(par);
	
	return res.data;
};

// 搜索点击时表单回调
const onSearch = (data: any) => {
	tb.tableData.param = Object.assign({}, tb.tableData.param, { ...data });
	nextTick(() => {
		tableRef.value.pageReset();
	});
};

// 查询操作
const handleQuery = async () => {
  nextTick(() => {
    tableRef.value.pageReset();
  });
};

// 打开新增页面
const openAddPcustomer = () => {
	editPcustomerTitle.value = '添加会员';
	editDialogRef.value?.openDialog({ sourceid: '1', sex: '-1' });
};

const openDetail = async (row:any) => {
	// await router.push('/pcu/detail?id=' + row.id);
	pcuDetailsRef.value.openDialog(row);
};

// 打开编辑页面
const openEditPcustomer = (row: any) => {
	editPcustomerTitle.value = '编辑会员';
	editSingDialogRef.value.openDialog(row);
};

const openImport = ()=>{
	importTempTitle.value = "导入会员信息";
	uploadExeclRef.value?.openDialog({ sourceid: '1', sex: '-1' });
}

const getLevels=async ()=>{
	await getAPI(MemberLevelApi)
		.apiMemberLevelListPost({})
		.then((res) => {
			// getlevelData.value = res.data?.result ?? []; 
			let result = res.data?.result ?? [];
			result.forEach((itme: any) => {
				tb.tableData.search[1].options?.push({ value: itme.id, label: itme.name });
			});
		});
}

const getLeveldatas=async ()=>{
	let r=await getAPI(MemberLevelApi)
		.apiMemberLevelListPost({});
		return r.data?.result ?? [];
}

/**
 * 新建宠物
 * @param row
 */
const openAddPet = (row: any) => {
	editPetTitle.value = '添加宠物';
	petEditDialogRef.value?.openDialog({ petStatus: '1', customerId: row.id });
};

// 删除
const delPcustomer = async (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			// eslint-disable-next-line no-mixed-spaces-and-tabs
			//   await deletePcustomer(row);
			await getAPI(PcustomerApi).apiPcustomerIdDeleteDelete(row.id);
			nextTick(() => {
				tableRef.value.pageReset();
			});
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};
 
onMounted(async () => {
	await getLevels();
});
</script>
