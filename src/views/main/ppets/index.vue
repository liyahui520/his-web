<template>
	<div class="ppets-container">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="宠物名称">
							<el-input v-model="queryParams.petName" clearable placeholder="请输入宠物名称" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="犬证号码 ">
							<el-input v-model="queryParams.petIdentityNumber" clearable placeholder="请输入犬证号码 " />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="病历号码 ">
							<el-input v-model="queryParams.petRecordNumber" clearable placeholder="请输入病历号码 " />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20 search-actions">
						<div>
							<el-button type="primary" icon="ele-Plus" @click="openAddPpets" v-auth="'ppets:add'"> 新增 </el-button>
						</div>
						<div>
							<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
							<el-button type="primary" plain icon="ele-Search" @click="handleQuery" v-auth="'ppets:page'"> 查询 </el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-card shadow="hover" style="margin-top: 8px">
			<el-table :data="tableData" style="width: 100%" v-loading="loading" tooltip-effect="light" row-key="id" border="">
				<el-table-column type="index" label="序号" width="55" align="center" />
				<el-table-column prop="petName" label="宠物名称" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petGender" label="性别" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petBirthDate" label="生日" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petKind" label="宠物种类" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petVarietie" label="宠物种类" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petBlood" label="宠物血型" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petColor" label="宠物颜色" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petWeight" label="宠物体重" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petIsSterilization" label="是否绝育" show-overflow-tooltip="">
					<template #default="scope">
						<el-tag v-if="scope.row.petIsSterilization"> 是</el-tag>
						<el-tag type="danger" v-else> 否</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="petIdentityNumber" label="犬证号码 " fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petRecordNumber" label="病历号码 " fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petDrugAllergy" label="药物过敏 " fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petIsVaccinated" label="已接种疫苗" show-overflow-tooltip="">
					<template #default="scope">
						<el-tag v-if="scope.row.petIsVaccinated"> 是</el-tag>
						<el-tag type="danger" v-else> 否</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="petIsDeworming" label="已驱虫" show-overflow-tooltip="">
					<template #default="scope">
						<el-tag v-if="scope.row.petIsDeworming"> 是</el-tag>
						<el-tag type="danger" v-else> 否</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="petChip" label="宠物芯片 " fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petImageUrl" label="宠物照片 " show-overflow-tooltip="">
					<template #default="scope">
						<el-image
							style="width: 60px; height: 60px"
							:src="scope.row.petImageUrl"
							:lazy="true"
							:hide-on-click-modal="true"
							:preview-src-list="[scope.row.petImageUrl]"
							:initial-index="0"
							fit="scale-down"
							preview-teleported
						/>
					</template>
				</el-table-column>
				<el-table-column prop="petStatus" label="宠物状态" fixed="" show-overflow-tooltip="" />
				<el-table-column prop="petRemark" label="宠物备注 " fixed="" show-overflow-tooltip="" />
				<el-table-column label="操作" width="140" align="center" fixed="right" show-overflow-tooltip="" v-if="auth('ppets:update') || auth('ppets:delete')">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditPpets(scope.row)" v-auth="'ppets:update'"> 编辑 </el-button>
						<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delPpets(scope.row)" v-auth="'ppets:delete'"> 删除 </el-button>
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
			<editDialog ref="editDialogRef" :title="editPpetsTitle" @reloadTable="handleQuery" />
		</el-card>
	</div>
</template>

<script lang="ts" setup name="ppets">
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import editDialog from '/@/views/main/ppets/component/editDialog.vue';
import { getAPI } from '/@/utils/axios-utils';
import { PPetsApi } from '/@/api-services';

const editDialogRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({});
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0,
});
const editPpetsTitle = ref('');

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(PPetsApi).apiPPetsPagePost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

// 打开新增页面
const openAddPpets = () => {
	editPpetsTitle.value = '添加宠物';
	editDialogRef.value.openDialog({
		petGender: '-1',
		petKind: '-1',
		petVarietie: '-1',
		petBlood: '-1',
		petColor: '-1',
		petStatus: '1',
	});
};

// 打开编辑页面
const openEditPpets = (row: any) => {
	editPpetsTitle.value = '编辑宠物';
	editDialogRef.value.openDialog(row);
};

// 删除
const delPpets = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(PPetsApi).apiPPetsIdDeleteDelete(row);
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
