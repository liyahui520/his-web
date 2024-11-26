<template>
	<div class="message-notices-send-notice-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="发送时间">
					<el-date-picker :clearable="false" v-model="dates" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :shortcuts="shortcuts" start-placeholder="开始日期" end-placeholder="结束日期" />
				</el-form-item>

				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never" style="height: calc(100vh - 205px); overflow: auto; margin-top: 8px">
			<el-table :data="tableData" style="height: calc(100vh - 320px)" v-loading="loading" tooltip-effect="light" row-key="id" border>
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="customerName" label="用户名称" width="150" align="center" show-overflow-tooltip="" />
				<el-table-column prop="cellPhone" label="手机号码" width="150" align="center" show-overflow-tooltip="" />
				<el-table-column prop="createTime" label="发送时间" width="150" align="center" show-overflow-tooltip="">
					<template #default="scope">
						<el-text size="default">{{ formatDate(new Date(scope.row.createTime), 'YYYY-mm-dd HH:MM:SS') }}</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="content" label="发送内容" align="left" show-overflow-tooltip="" />
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
	</div>
</template>

<script lang="ts" setup name="messageNoticesSendNotice">
import { ref,onMounted } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { SysSmsSendApi } from '/@/api-services/api';
import { addDaysToDate, formatDate } from '/@/utils/formatTime';

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

//日期范围值
const dates = ref<any>([addDaysToDate(new Date(), 0), addDaysToDate(new Date(), 0)]);
//时间可选范围
const shortcuts = [
	{
		text: '近一周',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			return [start, end];
		},
	},
	{
		text: '近两周',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
			return [start, end];
		},
	},
	{
		text: '近一个月',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			return [start, end];
		},
	},
];

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	queryParams.value.startTime = dates.value[0];
	queryParams.value.endTime = dates.value[1];
	var res = await getAPI(SysSmsSendApi).apiSysSmsSendGetSendedSmsPost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

// 改变页面容量
const handleSizeChange =async (val: number) => {
	tableParams.value.pageSize = val;
	await handleQuery();
};

// 改变页码序号
const handleCurrentChange =async (val: number) => {
	tableParams.value.page = val;
	await handleQuery();
};
// 页面加载时
onMounted(() => {
	handleQuery();
});

</script>
