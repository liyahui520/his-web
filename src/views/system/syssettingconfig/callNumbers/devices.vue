<template>
	<div :class="isTagsViewCurrenFull ? 'systemCallNumberDevices-container tab-cus-full-Content' : 'systemCallNumberDevices-container tab-cus-Content'">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="设备标识">
					<el-input v-model="queryParams.name" clearable placeholder="请输入设备标识" />
				</el-form-item>

				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
					</el-button-group>
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button icon="ele-Plus" @click="openAddCallDevice"> 新增 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" class="full-table"  style="overflow: auto; margin-top: 8px">
			<el-table :data="tableData"  v-loading="loading" tooltip-effect="light" border row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="deviceIdentity" label="设备标识" align="left" show-overflow-tooltip="" />
				<el-table-column prop="times" label="播放次数" align="center" show-overflow-tooltip="" />
				<el-table-column prop="rate" label="播放语速" align="center" show-overflow-tooltip="" />
				<el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip="" />
				<el-table-column label="操作" width="160" align="center" show-overflow-tooltip="">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditCallDevice(scope.row)"> 编辑 </el-button>
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
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { storeToRefs } from 'pinia';
const storesTagsViewRoutes = useTagsViewRoutes();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);

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
	editDialogRef.value.openDialog({ times: 1, rate: 0.7, pitch: 1, productItems: [] });
};

// 打开编辑页面
const openEditCallDevice = (row: any) => {
	editCallDeviceTitle.value = '编辑设备';
	editDialogRef.value.openDialog({ ...row });
};

handleQuery();
</script>
