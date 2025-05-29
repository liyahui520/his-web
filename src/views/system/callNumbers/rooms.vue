<template>
	<div class="systemCallNumberRooms-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="诊室名称">
					<el-input v-model="queryParams.name" clearable placeholder="请输入诊室名称" />
				</el-form-item>

				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'call:rooms:query'"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
					</el-button-group>
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button icon="ele-Plus" @click="openAddCallRoom" v-auth="'call:rooms:add'"> 新增 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" style="overflow: auto; margin-top: 8px">
			<el-table :data="tableData" style="height: calc(100vh - 235px)" v-loading="loading" tooltip-effect="light" border row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="诊室名称" align="center" show-overflow-tooltip="" />
				<el-table-column prop="status" label="状态" align="center">
					<template #default="scope">
						<el-tag :type="scope.row.status == 0 ? 'success' : 'danger'" disable-transitions>
							{{ scope.row.status == 0 ? '启用' : '禁用' }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="sortIndex" label="排序" align="center" show-overflow-tooltip="" />
				<el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip="" />
				<el-table-column label="操作" width="160" align="center" show-overflow-tooltip="" v-if="auth('call:rooms:update') || auth('call:rooms:delete')">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditCallRoom(scope.row)" v-auth="'call:rooms:update'"> 编辑 </el-button>
						<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delCallRoom(scope.row)" v-auth="'call:rooms:delete'"> 删除 </el-button>
					</template>
				</el-table-column>
			</el-table>
			<editDialog ref="editDialogRef" :title="editCallRoomTitle" @reloadTable="handleQuery" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import editDialog from './component/editRoomDialog.vue';
import { getAPI } from '/@/utils/axios-utils';
import { CallNumberApi } from '/@/api-services/api';

const editDialogRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({});
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0,
});
const editCallRoomTitle = ref('');

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(CallNumberApi).apiCallNumberGetCallRoomListGet(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result ?? [];
	if (queryParams.value.name) {
		tableData.value = tableData.value.filter((item: any) => item.name.includes(queryParams.value.name));
	}
	loading.value = false;
};

// 打开新增页面
const openAddCallRoom = () => {
	editCallRoomTitle.value = '添加诊室';
	editDialogRef.value.openDialog({ sortIndex: 0, status: 0 });
};

// 打开编辑页面
const openEditCallRoom = (row: any) => {
	editCallRoomTitle.value = '编辑诊室';
	editDialogRef.value.openDialog({ ...row });
};

// 删除
const delCallRoom = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(CallNumberApi).apiCallNumberDeleteCallRoomPost(row);
			handleQuery();
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

handleQuery();
</script>
