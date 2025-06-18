<template>
	<div class="specialSettings-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="机构Id">
					<el-input v-model="queryParams.orgId" placeholder="请输入机构Id" />
				</el-form-item>
				<el-form-item label="机构名称">
					<el-input v-model="queryParams.orgName" placeholder="请输入机构名称" />
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" style="height: calc(100vh - 235px); overflow: auto; margin-top: 8px">
			<el-table :data="tableData" style="height: calc(100vh - 310px)" v-loading="loading" tooltip-effect="light" row-key="id" border>
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="orgName" label="机构名称" align="center" show-overflow-tooltip="" />
				<el-table-column prop="name" label="权益名称" align="center" show-overflow-tooltip="" />
				<el-table-column prop="typeText" label="权益类型" align="center" show-overflow-tooltip="" />
				<el-table-column prop="isOpen" label="是否开启" align="center" show-overflow-tooltip="">
					<template #default="scope">
						<el-tag v-if="scope.row.isOpen == 1" type="success">开启</el-tag>
						<el-tag v-else type="danger">关闭</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="expirationTime" label="到期时间" align="center" show-overflow-tooltip="">
					<template #default="scope">
						<span v-if="scope.row.isOpen == 1">{{ scope.row.expirationTime }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="160" align="center" show-overflow-tooltip="">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditSpecialSettings(scope.row)"> 编辑 </el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				v-model:currentPage="tableParams.page"
				v-model:page-size="tableParams.pageSize"
				:total="tableParams.total"
				:page-sizes="[10, 20, 50, 100]"
				background=""
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				layout="total, sizes, prev, pager, next, jumper"
			/>
			<editDialog ref="editDialogRef" :title="editSpecialSettingsTitle" @reloadTable="handleQuery" />
		</el-card>
	</div>
</template>

<script lang="ts" setup name="sysSpecialSettings">
import { ref } from 'vue';
import editDialog from './component/editDialog.vue';
import { getAPI } from '/@/utils/axios-utils';
import { SysSpecialSettingApi } from '/@/api-services/api';

const editDialogRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({
	orgId: null,
	orgName: '',
});
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0 as any,
});
const editSpecialSettingsTitle = ref('');

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	if (queryParams.value.orgId == '') queryParams.value.orgId = null;
	var res = await getAPI(SysSpecialSettingApi).apiSysSpecialSettingGetSpecialSettingListPost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

// 打开编辑页面
const openEditSpecialSettings = (row: any) => {
	editSpecialSettingsTitle.value = '编辑权益设置';
	editDialogRef.value.openDialog({ ...row });
};

// 改变页面容量
const handleSizeChange = (val: number) => {
	tableParams.value.pageSize = val;
	handleQuery();
};

// 改变页码序号
const handleCurrentChange = (val: number) => {
	tableParams.value.page = val;
	handleQuery();
};

handleQuery();
</script>
