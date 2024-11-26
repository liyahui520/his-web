<template>
	<div class="productUnits-container">
		<el-dialog v-model="isShowDialog" :title="props.title" width="70%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-card shadow="never" :body-style="{ paddingBottom: '0px', padding: '0' }">
				<el-form :model="queryParams" ref="queryForm" :inline="true">
					<el-form-item label="客户名称">
						<el-input v-model="queryParams.customerName" clearable placeholder="请输入客户名称" />
					</el-form-item>
					<el-form-item label="宠物名称">
						<el-input v-model="queryParams.petName" clearable placeholder="请输入宠物名称" />
					</el-form-item>
					<el-form-item label="预计接种时间">
						<el-date-picker v-model="dates" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD" start-placeholder="开始日期" end-placeholder="结束日期" />
					</el-form-item>
					<el-form-item>
						<el-button-group>
							<el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'pcustomer:page'"> 查询 </el-button>
							<el-button
								icon="ele-Refresh"
								@click="
									() => {
										queryParams = {};
									}
								"
							>
								重置
							</el-button>
						</el-button-group>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="full-table" shadow="never" style="margin-top: 0; height: calc(100vh - 315px); padding: 0" :body-style="{ padding: '0px 0px 10px 0px' }">
				<el-table :data="tableData" style="width: 100%" v-loading="loading" tooltip-effect="light" row-key="id" border="">
					<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
					<el-table-column prop="customerName" label="会员名称" fixed="left" show-overflow-tooltip="">
						<template #default="scope">
							{{ scope.row.customerName }}
						</template>
					</el-table-column>
					<el-table-column prop="petName" label="宠物名称" width="100" fixed="left" show-overflow-tooltip="" />
					<el-table-column prop="expectVaccinations" label="预接种时间" width="100" fixed="left" show-overflow-tooltip="">
						<template #default="scope">
							<span>{{ formatDate(new Date(scope.row.expectVaccinations), 'YYYY-mm-dd') }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="productName" label="项目名称" width="200" show-overflow-tooltip="" />
					<el-table-column prop="vaccinates" label="执行时间" width="200" show-overflow-tooltip="">
						<template #default="scope">
							<span>{{ scope.row.vaccinates != null && scope.row.vaccinates != undefined ? formatDate(new Date(scope.row.vaccinates), 'YYYY-mm-dd HH:MM:SS') : '' }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="operateName" label="操作人" width="100" show-overflow-tooltip="" />
					<el-table-column label="状态" width="90">
						<template #default="scope">
							<el-tag type="danger" v-if="!scope.row.isWillOrder && !scope.row.isPayed"> 待下单 </el-tag>
							<el-tag type="danger" v-else-if="scope.row.isWillOrder && !scope.row.isPayed"> 待付款 </el-tag>
							<el-tag v-else-if="scope.row.isPayed"> 已支付 </el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200" align="center" fixed="right">
						<template #default="scope">
							<el-tooltip effect="light" v-if="!scope.row.isWillOrder && !scope.row.isPayed" content="下单" placement="top">
								<el-button :disabled="scope.row.placeOrderDisabled" icon="ele-ShoppingTrolley" size="small" text="" @click="handlePlaceOrder(scope.row)" type="success"></el-button>
							</el-tooltip>
							<el-tooltip effect="light" v-if="scope.row.isPayed && !scope.row.vaccinates" content="执行" placement="top">
								<el-button icon="ele-Select" size="small" text="" @click="handleExec(scope.row)" type="warning"></el-button>
							</el-tooltip>
							<el-tooltip effect="light" v-if="!scope.row.isPayed && !scope.row.inoculated" content="延迟" placement="top">
								<el-button icon="ele-DArrowRight" size="small" text="" @click="handleDelay(scope.row)" type="info"></el-button>
							</el-tooltip>
							<el-tooltip effect="light" v-if="!scope.row.isPayed" content="编辑" placement="top">
								<el-button icon="ele-Edit" size="small" text="" @click="openVaccines(scope.row)" type="primary"></el-button>
							</el-tooltip>
							<el-tooltip effect="light" v-if="!scope.row.isPayed && !scope.row.inoculated" content="删除" placement="top">
								<el-button icon="ele-Delete" size="small" text="" @click="handleDelete(scope.row)" type="danger"></el-button>
							</el-tooltip>
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
			<Vaccination ref="vaccinationRef" />
			<DelayVaccination ref="delayVaccinationRef" @reloadTable="handleQuery" />
			<ExecVaccination ref="execVaccinationRef" @reloadTable="handleQuery" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { addWeeksToDateReturnDate } from '/@/utils/formatTime';
import { formatDate } from '/@/utils/formatTime';
import Vaccination from '/@/components/vaccinations/editVaccinations.vue';
import DelayVaccination from '/@/components/vaccinations/delayVaccinations.vue';
import ExecVaccination from '/@/components/vaccinations/execVaccinations.vue';
import { getAPI } from '/@/utils/axios-utils';
import { VaccinationApi } from '/@/api-services/api';

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
const queryParams = ref<any>({});
const loading = ref(false);
const tableData = ref<any>([]);
const vaccinationRef = ref();
const delayVaccinationRef = ref();
const execVaccinationRef = ref();
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0 as any,
});
const isShowDialog = ref(false);


// 打开弹窗
const openDialog = async (row: any) => {
    dates.value=row;
	isShowDialog.value = true;
    await handleQuery();
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};


//处理删除
const handleDelete = async (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			row.placeOrderDisabled = true;
			await getAPI(VaccinationApi)
				.apiVaccinationVaccinationDeletePost({ id: row.id, customerId: row.customerId })
				.catch((item) => {
					row.placeOrderDisabled = false;
				});
			row.placeOrderDisabled = false;
			await handleQuery();
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

//处理执行
const handleExec = async (row: any) => {
	execVaccinationRef.value.openDialog({
		id: row.id,
		grouping: row.grouping,
		isAllDelay: true,
		expectVaccinations: row.expectVaccinations,
		customerId: row.customerId,
	});
};
//处理延迟
const handleDelay = async (row: any) => {
	delayVaccinationRef.value.openDialog({
		id: row.id,
		grouping: row.grouping,
		interval: 1,
		intervalUnit: 'Day',
		isAllDelay: true,
		expectVaccinations: row.expectVaccinations,
		customerId: row.customerId,
	});
};

//处理产品下单
const handlePlaceOrder = async (row: any) => {
	row.placeOrderDisabled = true;
	await getAPI(VaccinationApi)
		.apiVaccinationVaccinationPlaceOrderPost({ id: row.id })
		.catch((item) => {
			row.placeOrderDisabled = false;
		});
	row.placeOrderDisabled = false;
	await handleQuery();
};

//日期范围值
const dates = ref<any>([addWeeksToDateReturnDate(new Date(), -1), addWeeksToDateReturnDate(new Date(), 0)]);

//编辑驱虫疫苗
const openVaccines = async (row: any) => {
	let result = await getAPI(VaccinationApi).apiVaccinationGetVaccinationDetailPost({ id: row.id });
	let vaccInfo = result.data.result ?? ({} as any);
	vaccInfo.vaccinations.totalAmount = vaccInfo.vaccinations.salePrice * vaccInfo.vaccinations.count;
	vaccinationRef.value.openDialog({
		vaccinationInfos: [vaccInfo.vaccinations],
		isEditType: true,
		customerInfo: { id: row.customerId, name: row.customerName, cellPhone: row.cellPhone },
		petInfo: { id: row.petId, petName: row.petName },
		recordId: row.recordId,
	});
};
// 查询操作
const handleQuery = async () => {
	loading.value = true;
	queryParams.value.startDate = dates.value[0];
	queryParams.value.endDate = dates.value[1];
	var res = await getAPI(VaccinationApi).apiVaccinationGetVaccinationPageListPost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
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


//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
