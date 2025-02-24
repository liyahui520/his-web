<template>
	<div class="inHospital-Nures">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="护理名称">
					<el-input v-model="queryParams.name" clearable placeholder="请输入护理名称" />
				</el-form-item>
				<el-form-item label="护理类型">
					<el-radio-group v-model="inHospitalType">
						<el-radio border :value="-1">全部</el-radio>
						<el-radio border :value="0">住院</el-radio>
						<el-radio border :value="1">留观</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
					</el-button-group>
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button type="success" icon="ele-Plus" @click="openAddInHospitalNurses"> 新增 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" style="height: calc(100vh - 235px); overflow: auto; margin-top: 8px">
			<el-table :data="tableData" style="height: calc(100vh - 320px)" v-loading="loading" tooltip-effect="light" row-key="id" border>
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="name" label="名称" align="center" show-overflow-tooltip="" />
				<el-table-column label="护理类型" align="center">
					<template #default="scope">
						<el-tag type="warning" v-if="scope.row.inHospitalType == 0">{{ scope.row.inHospitalTypeText }}</el-tag>
						<el-tag type="primary" v-if="scope.row.inHospitalType == 1">{{ scope.row.inHospitalTypeText }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="销售价格" align="center" show-overflow-tooltip="">
					<template #default="scope">
						<div v-if="scope.row.inHospitalCostType == 0">{{ verifyNumberComma(scope.row?.salePrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
						<div v-if="scope.row.inHospitalCostType == 1">{{ verifyNumberComma(scope.row?.monthSalePrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="会员价格" align="center" show-overflow-tooltip="">
					<template #default="scope">
						<div v-if="scope.row.inHospitalCostType == 0">{{ verifyNumberComma(scope.row?.memberPrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
						<div v-if="scope.row.inHospitalCostType == 1">{{ verifyNumberComma(scope.row?.monthMemberPrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" align="center">
					<template #default="scope">
						{{ scope.row.createTime }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="160" align="center" show-overflow-tooltip="">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditInHospitalNurses(scope.row)"> 编辑 </el-button>
						<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delInHospitalNurses(scope.row)"> 删除 </el-button>
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
			<editDialog ref="editDialogRef" :title="editInHospitalNursesTitle" @reloadTable="handleQuery" />
		</el-card>
	</div>
</template>

<script lang="ts" setup name="inHospitalNures">
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi } from '/@/api-services/api';
import editDialog from './editDialog.vue';
import { verifyNumberComma } from '/@/utils/toolsValidate';

const editDialogRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({
	inHospitalType: null,
	name: '',
});
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0 as any,
});
const editInHospitalNursesTitle = ref('');
const inHospitalType = ref<number>(-1);

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	queryParams.value.inHospitalType = inHospitalType.value == -1 ? null : inHospitalType.value;
	var res = await getAPI(InHospitalApi).apiInHospitalGetNursePagePost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

// 打开新增页面
const openAddInHospitalNurses = () => {
	editInHospitalNursesTitle.value = '添加护理';
	editDialogRef.value.openDialog({ inHospitalCostType: 0, inHospitalType: 0, salePrice: 0, memberPrice: 0, monthSalePrice: 0, monthMemberPrice: 0 });
};

// 打开编辑页面
const openEditInHospitalNurses = (row: any) => {
	editInHospitalNursesTitle.value = '编辑护理';
	editDialogRef.value.openDialog({ ...row });
};

// 删除
const delInHospitalNurses = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(InHospitalApi).apiInHospitalDeleteNursePost(row);
			handleQuery();
			ElMessage.success('删除成功');
		})
		.catch(() => {});
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

<style lang="scss" scoped>
.inHospital-Nures {
}
</style>
