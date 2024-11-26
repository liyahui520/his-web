<template>
	<div class="productUnits-container">
		<el-dialog v-model="isShowDialog" :title="props.title" width="70%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>

			<el-card shadow="never" :body-style="{ paddingBottom: '5px', padding: '0' }">
				<el-form :model="queryParams" ref="queryForm" :inline="true">
					<el-form-item label="预约类型">
						<el-select clearable v-model="queryParams.type" placeholder="请选择预约类型">
							<el-option v-for="item in ReservationTypeEnums" :key="item.value" :value="item.value" :label="item.describe">
								{{ item.describe }}
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="预约来源">
						<el-select clearable v-model="queryParams.source" placeholder="请选择预约类型">
							<el-option v-for="item in ReservationSourceEnums" :key="item.value" :value="item.value" :label="item.describe">
								{{ item.describe }}
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态">
						<el-select clearable v-model="queryParams.status" placeholder="请选择状态">
							<el-option v-for="item in ReservationStatusEnums" :key="item.value" :value="item.value" :label="item.describe">
								{{ item.describe }}
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="预约时间">
						<el-date-picker style="width: 230px" v-model="dates" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="defaultTime2" :clearable="false" />
					</el-form-item>
					<el-form-item>
						<el-button-group>
							<el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'pcustomer:page'"> 查询 </el-button>
							<el-button
								icon="ele-Refresh"
								@click="
									() => {
										queryParams = {};
										dates = [
											new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()),
											new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()),
										];
									}
								"
							>
								重置
							</el-button>
						</el-button-group>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="full-table" shadow="never" style="margin-top: 0; height: calc(100vh - 360px); padding: 0" :body-style="{ padding: '0px 0px 10px 0px' }">
				<el-table :data="tableData" style="width: 100%" v-loading="loading" tooltip-effect="light" row-key="id" border="">
					<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
					<el-table-column prop="pcuName" label="会员名称" fixed="left" show-overflow-tooltip="">
						<template #default="scope">
							{{ scope.row.pcuName }}
						</template>
					</el-table-column>
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
					<!--            <el-table-column prop="createTime" width="180" label="登记日期" show-overflow-tooltip=""/>-->
					<el-table-column prop="status" label="状态" min-width="100" show-overflow-tooltip="">
						<template #default="scope">
							<el-tag effect="plain" v-if="scope.row.status != 0" type="warning">
								{{ ReservationStatusKeys[scope.row.status] }}
							</el-tag>
							<el-tag effect="plain" v-else type="danger">{{ ReservationStatusKeys[scope.row.status] }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150" align="center" fixed="right" show-overflow-tooltip="">
						<template #default="scope">
							<el-button icon="ele-CircleCheck" v-if="scope.row.status == 1" size="small" text="" type="primary" @click="handleConfirm(scope.row)"> 确认 </el-button>
							<el-button icon="ele-CircleCheck" v-if="scope.row.status == 2" size="small" text="" type="primary" @click="handleToStore(scope.row)"> 已到店 </el-button>
							<el-button icon="ele-Delete" v-if="scope.row.status == 1" size="small" text="" type="danger" @click="handleCancel(scope.row)"> 取消 </el-button>
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
					<el-button @click="cancel" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { SysEnumApi, ReservationApi } from '/@/api-services';
import { addDaysToDate } from '/@/utils/formatTime';

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
const isShowDialog = ref(false);
const loading = ref(false);
const tableData = ref<any>([]);
const ReservationTypeEnums = ref<any>([]);
const ReservationTypeKeys = ref<any>({});
const ReservationSourceEnums = ref<any>([]);
const ReservationSourceKeys = ref<any>([]);
const ReservationStatusEnums = ref<any>([]);
const ReservationStatusKeys = ref<any>([]);
const queryParams = ref<any>({});
const dates = ref([new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()), new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate())]);
const defaultTime2: [string, string] = [addDaysToDate(new Date(), 0), addDaysToDate(new Date(), 10)];


// 打开弹窗
const openDialog = async (row: any) => {
	isShowDialog.value = true;
    dates.value=row;
    ReservationTypeEnums.value = await getEnums('ReservationTypeEnum'); //ReservationSourceEnum
	ReservationSourceEnums.value = await getEnums('ReservationSourceEnum'); //ReservationSourceEnum
	ReservationStatusEnums.value = await getEnums('ReservationStatusEnum'); //ReservationSourceEnum
	await InitData();
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};

/**
 * 操作已确认
 */
const handleConfirm = async (row: any) => {
	loading.value = true;
	await getAPI(ReservationApi)
		.apiReservationConfirmPut({ id: row.id, ver: row.ver })
		.then(async () => {
			ElMessage.success('操作成功');
			await handleQuery();
		})
		.catch(() => {
			loading.value = false;
		});
};
/**
 * 操作到店
 */
const handleToStore = async (row: any) => {
	loading.value = true;
	await getAPI(ReservationApi)
		.apiReservationTostorePut({ id: row.id, ver: row.ver })
		.then(async () => {
			ElMessage.success('操作成功');
			await handleQuery();
		})
		.catch(() => {
			loading.value = false;
		});
};
/**
 * 操作取消
 */
const handleCancel = async (row: any) => {
	loading.value = true;
	await getAPI(ReservationApi)
		.apiReservationCancelPut({ id: row.id, ver: row.ver })
		.then(async () => {
			ElMessage.success('操作成功');
			await handleQuery();
		})
		.catch(() => {
			loading.value = false;
		});
};

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

/**
 * 查询
 * @constructor
 */
const InitData = async () => {
	loading.value = true;
	queryParams.value.reservationStartTime = dates.value != null ? dates.value[0] : null;
	queryParams.value.reservationEndTime = dates.value != null ? dates.value[1] : null;
	let res = await getAPI(ReservationApi).apiReservationPagePost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

/**
 * 查询
 */
const handleQuery = async () => {
	await InitData();
};


//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
