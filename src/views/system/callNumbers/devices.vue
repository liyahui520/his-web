<template>
	<div class="systemCallNumberDevices-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="设备标识">
					<el-input v-model="queryParams.name" clearable placeholder="请输入设备标识" />
				</el-form-item>

				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'call:devices:query'"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
					</el-button-group>
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button icon="ele-Plus" @click="openAddCallDevice" v-auth="'call:devices:add'"> 新增 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" style="height: calc(100vh); overflow: auto; margin-top: 8px">
			<el-table :data="tableData" style="height: calc(100vh - 235px)" v-loading="loading" tooltip-effect="light" border row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="deviceIdentity" label="设备标识" align="left" show-overflow-tooltip="" />
				<el-table-column prop="times" label="播放次数" align="center" show-overflow-tooltip="" />
				<el-table-column prop="rate" label="播放语速" align="center" show-overflow-tooltip="" />
				<el-table-column prop="pitch" label="播放音调" align="center" show-overflow-tooltip="" />
				<el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip="" />
				<el-table-column label="操作" width="160" align="center" show-overflow-tooltip="" v-if="auth('call:devices:update') || auth('call:devices:delete')">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditCallDevice(scope.row)" v-auth="'call:devices:update'"> 编辑 </el-button>
						<!-- <el-button icon="ele-Delete" size="small" text="" type="danger" @click="delCallDevice(scope.row)" v-auth="'call:devices:delete'"> 删除 </el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<editDialog ref="editDialogRef" :title="editCallDeviceTitle" @reloadTable="handleQuery" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { auth } from '/@/utils/authFunction';
import editDialog from './component/editDeviceDialog.vue';
import { getAPI } from '/@/utils/axios-utils';
import { CallNumberApi } from '/@/api-services/api';

const editDialogRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({ name: '' });
const editCallDeviceTitle = ref('');

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(CallNumberApi).apiCallNumberGetCallDeviceListGet();
	tableData.value = res.data.result ?? [];
	if (queryParams.value.name) {
		tableData.value = tableData.value.filter((item: any) => item.name.includes(queryParams.value.name));
	}
	loading.value = false;
};

// 打开新增页面
const openAddCallDevice = () => {
	editCallDeviceTitle.value = '添加设备';
	editDialogRef.value.openDialog({ times: 1, rate: 1, pitch: 0 });
};

// 打开编辑页面
const openEditCallDevice = (row: any) => {
	editCallDeviceTitle.value = '编辑设备';
	editDialogRef.value.openDialog({ ...row });
};


handleQuery();
</script>
