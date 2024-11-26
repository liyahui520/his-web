<template>
	<div class="consumption-record-container">
		<el-dialog v-model="isShowDialog" width="80%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-card shadow="always" :body-style="{ paddingBottom: '0' }">
				<el-form :model="queryParams" ref="queryForm" :inline="true">
					<el-form-item label="预约时间">
						<el-date-picker v-model="dates" :clearable="false" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD" start-placeholder="开始日期" end-placeholder="结束日期" />
					</el-form-item>

					<el-form-item>
						<el-button-group>
							<el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
						</el-button-group>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="full-table" shadow="always" style="margin-top: 8px">
				<el-table ref="paymentTableRef" stripe :data="tableData" style="width: 100%" height="600" v-loading="loading" tooltip-effect="light" row-key="id" size="small">
					<el-table-column prop="pcuName" label="会员名称" fixed="left" show-overflow-tooltip="" />
					<el-table-column prop="petName" label="宠物名称" fixed="left" show-overflow-tooltip="" />
					<el-table-column prop="cellPhone" label="手机号" fixed="left" show-overflow-tooltip="" />
					<el-table-column prop="level" label="预约类型" min-width="100" show-overflow-tooltip="">
						<template #default="scope">
							<el-tag effect="plain">{{ ReservationTypeKeys[scope.row.type] }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="doctorName" label="预约医生" min-width="100" show-overflow-tooltip="" />
					<el-table-column prop="source" label="预约来源" min-width="100" show-overflow-tooltip="">
						<template #default="scope">
							<el-tag effect="plain" type="success">{{ ReservationSourceKeys[scope.row.source] }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="reservationTime" min-width="180" label="预约日期" show-overflow-tooltip="" />
					<el-table-column prop="status" label="状态" min-width="100" show-overflow-tooltip="">
						<template #default="scope">
							<el-tag effect="plain" v-if="scope.row.status != 0" type="warning">
								{{ ReservationStatusKeys[scope.row.status] }}
							</el-tag>
							<el-tag effect="plain" v-else type="danger">{{ ReservationStatusKeys[scope.row.status] }}</el-tag>
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
					<el-button type="primary" size="default" @click="closeDialog">关闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { getAPI } from '/@/utils/axios-utils';
import { ReservationApi, SysEnumApi } from '/@/api-services/api';
import { addMonthsToDate } from '/@/utils/formatTime';

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '预约记录',
	},
});
const isShowDialog = ref(false);
const loading = ref(false);
const queryParams = ref<any>({ customerId: 0, petId: 0, startTime: null, endTime: null });
const tableData = ref<any>([]);
const ReservationTypeKeys = ref<any>({});

const ReservationTypeEnums = ref<any>([]);
const ReservationSourceEnums = ref<any>([]);
const ReservationStatusEnums = ref<any>([]);
const ReservationStatusKeys = ref<any>([]);
const ReservationSourceKeys = ref<any>([]);

const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0 as any,
});

/**
 * 获取枚举值
 * @param val
 */
const getEnums = async (val: string) => {
	let r = await getAPI(SysEnumApi).apiSysEnumEnumDataListGet(val);
	switch (val) {
		case 'ReservationTypeEnum':
			ReservationTypeKeys.value = r.data?.result?.reduce((result: any, item: any) => {
				result[item.value] = item.describe;
				return result;
			}, {});
			break;
		case 'ReservationSourceEnum':
			ReservationSourceKeys.value = r.data?.result?.reduce((result: any, item: any) => {
				result[item.value] = item.describe;
				return result;
			}, {});
			break;
		case 'ReservationStatusEnum':
			ReservationStatusKeys.value = r.data?.result?.reduce((result: any, item: any) => {
				result[item.value] = item.describe;
				return result;
			}, {});
			break;
	}

	return r.data?.result;
};
//日期范围值
const dates = ref<any>([addMonthsToDate(new Date(), -1), addMonthsToDate(new Date(), 0)]);
// 打开弹窗
const openDialog = async (data: any) => {
	isShowDialog.value = true;
	queryParams.value.customerId = data.customerId;
	queryParams.value.petId = data.petId;
	tableData.value = [];
	tableParams.value.total = 0;
	await handleQuery();

	ReservationTypeEnums.value = await getEnums('ReservationTypeEnum'); //ReservationSourceEnum
	ReservationSourceEnums.value = await getEnums('ReservationSourceEnum'); //ReservationSourceEnum
	ReservationStatusEnums.value = await getEnums('ReservationStatusEnum'); //ReservationSourceEnum
};
// 关闭弹窗
const closeDialog = () => {
	isShowDialog.value = false;
};

const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(ReservationApi).apiReservationGetPetReservationPost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total ?? 0;
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
<style scoped lang="scss"></style>
