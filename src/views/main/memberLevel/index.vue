<template>
	<div class="memberLevel-container">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
			<Search :search="tb.tableData.search" :param="tb.tableData.param" @search="onSearch" />
		</el-card>
		<el-card class="full-table" shadow="hover" style="margin-top: 8px">
			<Table ref="tableRef" v-bind="tb.tableData" :getData="getData" border>
				<template #sexText="scope">
					<el-tag :type="di('code_sex', scope.row.sex)?.tagType"> {{ di('code_sex', scope.row.sex)?.value }} </el-tag>
				</template>
				<template #command>
					<el-button type="primary" size="small" icon="ele-Plus" round @click="openAddMemberLevel" v-auth="'pcustomer:add'"> 新增会员级别 </el-button>
				</template>

				<template #enabledDiscount="scope">
					<el-tag v-if="scope.row.enabledDiscount"> 是</el-tag>
					<el-tag type="danger" v-else> 否</el-tag>
				</template>
				<template #isDefault="scope">
					<el-tag v-if="scope.row.isDefault"> 是</el-tag>
					<el-tag type="danger" v-else> 否</el-tag>
				</template>
				<template #isEnabled="scope">
					<el-tag v-if="scope.row.isEnabled">启用</el-tag>
					<el-tag type="danger" v-else> 禁用</el-tag>
				</template>
				<template #action="scope">
					<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditMemberLevel(scope.row)" v-auth="'products:bmodes:update'"> 编辑 </el-button>
					<!-- <el-button icon="ele-Delete" size="small" text="" type="danger" @click="delMemberLevel(scope.row)" v-auth="'products:bmodes:delete'"> 删除 </el-button> -->
				</template>
			</Table>
			<editDialog ref="editDialogRef" :title="editMemberLevelTitle" @reloadTable="onSearch" />
		</el-card>
	</div>
</template>

<script lang="ts" setup name="level">
import { defineAsyncComponent, nextTick, reactive, ref } from 'vue';
import editDialog from '/@/views/main/memberLevel/component/editDialog.vue';
import { getAPI } from '/@/utils/axios-utils';
import { MemberLevelApi } from '/@/api-services';


const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const Search = defineAsyncComponent(() => import('/@/components/table/search.vue'));
const tableRef = ref();
const editDialogRef = ref();
const editMemberLevelTitle = ref('');
const tb = reactive<TableDemoState>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			{
				prop: 'name',
				minWidth: '150',
				label: '会员级别',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'enabledDiscount',
				minWidth: '150',
				label: '启用会员价',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'isDefault',
				minWidth: '150',
				label: '默认',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'isEnabled',
				minWidth: '150',
				label: '状态',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				fixed: 'left',
				'show-overflow-tooltip': true,
			},
			{
				prop: 'action',
				width: 120,
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
			hideExport: false, //是否隐藏导出按钮
			exportFileName: '用户信息', //导出报表的文件名，不填写取应用名称
			hideLoad: false,
			hidePrint: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [{ label: '', prop: 'name', placeholder: '请输入会员级别', required: false, type: 'input' }],
		param: { params: '' },
		defaultSort: {
			prop: 'name',
			order: 'ascending',
		},
	},
});

const onSearch = (data: any) => {
	tb.tableData.param = Object.assign({}, tb.tableData.param, { ...data });
	nextTick(() => {
		tableRef.value.pageReset();
	});
};
const getData = async (par: any) => {
	var res = await getAPI(MemberLevelApi).apiMemberLevelPagePost(par);
	return res.data;
};

/**
 * 编辑页面
 * @param row
 */
const openEditMemberLevel = (row: any) => {
	editMemberLevelTitle.value = '编辑会员级别';
	editDialogRef.value.openDialog(row);
};
// 打开新增页面
const openAddMemberLevel = () => {
	editMemberLevelTitle.value = '添加会员级别';
	editDialogRef.value.openDialog({ enableddiscount: true, sortindex: 100,isEnabled: true });
};
</script>
