<template>
	<div class="productUnits-container"> 
		<el-card shadow="never" style=" overflow: auto; ">
			<el-table :data="tableData" v-loading="loading" border tooltip-effect="light" row-key="id">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="参数名称" align="left" width="300" show-overflow-tooltip="" />
				<el-table-column prop="description" label="描述" align="left" show-overflow-tooltip="" />
				<el-table-column label="设置" align="center" width="300">
					<template #default="scope">
						<el-switch v-model="scope.row.value" size="default" :loading="scope.row.loading" @change="editSysOrgConfig(scope.row)" inline-prompt :active-icon="Check" :inactive-icon="Close" />
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import { getAPI } from '/@/utils/axios-utils';
import { SysOrgConfigApi } from '/@/api-services/api';
import { Check, Close } from '@element-plus/icons-vue';
import other from '/@/utils/other';

const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({ name: '' });

const editSysOrgConfig = async (row: any) => {
	row.loading = true;
	let rowInfo = other.deepClone(row);
	rowInfo.value = rowInfo.value ? '1' : '0';
	let isSuccess = false;
	await getAPI(SysOrgConfigApi)
		.apiSysOrgConfigEditSysOrgConfigPost(rowInfo)
		.then(async (result) => {
			row.loading = false;
			isSuccess = true;
			await handleQuery();
		});

	return new Promise((resolve, reject) => {
		if (isSuccess) {
            return resolve(true);
        }
        else return reject(false);
	});
};
// 查询操作
const handleQuery = async () => {
	loading.value = true;
	await getAPI(SysOrgConfigApi)
		.apiSysOrgConfigGetSysOrgConfigsGet()
		.then((res) => {
			let result = res.data?.result ?? [];
			if (!isEmptyString(queryParams.value.name)) result = result.filter((item: any) => item.name.indexOf(queryParams.value.name) !== -1);
			result.forEach((item: any) => {
				item.value = item.value === '1';
				item.loading = false;
			});
			tableData.value = result;
			loading.value = false;
		})
		.catch((error) => {
			loading.value = false;
		});
};
/**
 * 判断是否非空
 * @param str 字符串
 */
const isEmptyString = (str: string) => {
	return str === null || str === 'null' || str === 'undefined' || str.trim() === '' || str === undefined;
};

handleQuery();
</script>
