<template>
	<div class="inHospital-nurseView">
		<el-dialog v-model="isShowDialog" title="选择住院宠物" width="60%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>选择住院宠物</span>
				</div>
			</template>
			<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
				<el-form :model="queryParams" ref="queryForm" :inline="true">
					<el-form-item label="会员名称">
						<el-input v-model="queryParams.name" placeholder="请输入会员名称" />
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input v-model="queryParams.cellPhone" placeholder="请输入手机号码" />
					</el-form-item>
					<!-- <el-form-item label="会员编号">
						<el-input v-model="queryParams.cardNumber" clearable placeholder="请输入会员编号" />
					</el-form-item> -->
					<el-form-item label="宠物名称">
						<el-input v-model="queryParams.petName" placeholder="请输入宠物名称" />
					</el-form-item>

					<el-form-item>
						<el-button-group>
							<el-button type="primary" icon="ele-Search" @click="loadCustomerPetData"> 查询 </el-button>
						</el-button-group>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card shadow="always" style="height: 500px; margin-top: 5px">
				<el-table :data="tableData" style="height: 430px" v-loading="loading" tooltip-effect="light" row-key="id">
					<el-table-column prop="customerName" label="会员名称" align="left" show-overflow-tooltip="" />
					<el-table-column prop="cellPhone" label="手机号码" align="left" show-overflow-tooltip="" />
					<el-table-column prop="levelText" label="会员级别" align="left" show-overflow-tooltip="" />
					<el-table-column prop="cardNumber" label="会员编号" align="left" show-overflow-tooltip="" />
					<el-table-column prop="petRecordNumber" label="病历编号" />
					<el-table-column prop="petName" label="宠物名称" />
					<el-table-column prop="petGenderText" label="性别" />
					<el-table-column prop="petKindText" label="品种" />
					<el-table-column prop="petVarietieText" label="种类" />
					<el-table-column label="操作" width="80" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<el-button v-if="scope.row.payStatus == null" size="small" text="" type="primary" @click="confirmPet(scope.row)"> 确认 </el-button>
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
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submit" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="inHospital-nurseView">
import { ref, onMounted } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { PcustomerApi } from '/@/api-services';

const isShowDialog = ref<any>(false);
const tableData = ref<any>([]);
const loading = ref<any>(false);
const queryParams = ref<any>({});
	const tableParams = ref({
    page: 1,
    pageSize: 20,
    total: 0 as any,
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);

/**
 * 打开页面
 * @param row 当前行数据
 */
const openDialog = async () => {
	isShowDialog.value = true;
	queryParams.value = {};
	tableData.value = [];
};
/**
 * 确认宠物选择
 * @param row 当前行数据
 */
const confirmPet = async (row: any) => {
	isShowDialog.value = false;
	emit('reloadTable', row);
};

/**
 * 加载用户宠物信息
 */
const loadCustomerPetData = async () => {
	loading.value = true;
	await getAPI(PcustomerApi)
		.apiPcustomerGetCustomerPetForHospitalPost(queryParams.value)
		.then((res) => {
			tableData.value = res.data.result?.items ?? [];
			tableParams.value.total = res.data.result?.total;
			loading.value = false;
		});
	loading.value = false;
};

const submit = () => {
	isShowDialog.value = false;
};

// 改变页面容量
const handleSizeChange = async (val: number) => {
    tableParams.value.pageSize = val;
    await loadCustomerPetData();
};

// 改变页码序号
const handleCurrentChange = async (val: number) => {
    tableParams.value.page = val;
    await loadCustomerPetData();
};
// 页面加载时
onMounted(async () => {});
//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.inHospital-nurseView {
	:deep(.el-dialog__footer) {
		padding-top: 0px !important;
	}
}
</style>
