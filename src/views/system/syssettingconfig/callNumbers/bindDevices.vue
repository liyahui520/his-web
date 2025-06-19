<template>
	<div class="systemCallNumberBindDevices-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="诊室名称">
					<el-input v-model="queryParams.name" clearable placeholder="请输入诊室名称" />
				</el-form-item>

				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" style="overflow: auto; margin-top: 8px">
			<el-table :data="tableData" v-loading="loading" tooltip-effect="light" border row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="诊室名称" align="center" show-overflow-tooltip="" />
				<el-table-column prop="deviceIdentity" label="设备" align="center" show-overflow-tooltip="" />
				<el-table-column prop="status" label="绑定状态" align="center">
					<template #default="scope">
                        <el-tag v-if="scope.row.deviceIdentity" type="success">已绑定</el-tag>
                        <el-tag v-else type="danger">未绑定</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="sortIndex" label="诊室排序" align="center" show-overflow-tooltip="" />
				<el-table-column label="操作" width="160" align="center" show-overflow-tooltip="" >
					<template #default="scope">
						<el-button icon="ele-Monitor" v-if="!scope.row.deviceIdentity" size="small" text="" type="primary" @click="openEditCallRoom(scope.row)">
							绑定
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<editDialog ref="editDialogRef" :title="editCallRoomTitle" @reloadTable="handleQuery" />
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import editDialog from './component/bindDeviceDialog.vue';
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
const deviceData = ref<any>([]);

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(CallNumberApi).apiCallNumberGetCallRoomUseListGet(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result ?? [];
	if (queryParams.value.name) {
		tableData.value = tableData.value.filter((item: any) => item.name.includes(queryParams.value.name));
	}
	loading.value = false;
};

// 打开编辑页面
const openEditCallRoom = (row: any) => {
	editCallRoomTitle.value = '编辑诊室';
	if (row.deviceSettingId == 0) row.deviceSettingId = null;
	editDialogRef.value.openDialog({ ...row }, deviceData.value);
};
/**
 * 加载所有设备
 */
const loadDevices = async () => {
	var res = await getAPI(CallNumberApi).apiCallNumberGetCallDevicesGet();
	deviceData.value = res.data.result ?? [];
};
handleQuery();
loadDevices();
</script>
