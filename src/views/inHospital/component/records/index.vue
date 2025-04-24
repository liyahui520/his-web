<template>
	<div class="inHospital-Records" :class="isTagsViewCurrenFull ? 'tab-cus-full-Content' : 'tab-cus-Content'">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				
				<el-form-item label="住院时间">
					<el-date-picker v-model="inDates" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :shortcuts="shortcuts" start-placeholder="开始日期" end-placeholder="结束日期" />
				</el-form-item>
				<el-form-item label="出院时间">
					<el-date-picker v-model="outDates" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :shortcuts="shortcuts" start-placeholder="开始日期" end-placeholder="结束日期" />
				</el-form-item>
				<el-form-item label="客户名称">
					<el-input v-model="queryParams.customerName" clearable />
				</el-form-item>
				<el-form-item label="手机号码">
					<el-input v-model="queryParams.cellPhone" clearable />
				</el-form-item>
				<el-form-item label="类型">
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
			</el-form>
		</el-card>
		<el-card shadow="never" class="full-table" style="overflow: auto; margin-top: 8px">
			<el-table :data="tableData" v-loading="loading" tooltip-effect="light" row-key="id" border>
				<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
				<el-table-column prop="inHospitalTypeText" width="75" label="类型" align="center" >
					<template #default="scope">
						<el-tag type="warning" v-if="scope.row.inHospitalType == 0">{{ scope.row.inHospitalTypeText }}</el-tag>
						<el-tag type="primary" v-if="scope.row.inHospitalType == 1">{{ scope.row.inHospitalTypeText }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="orderNo" label="病历编号" width="160" align="left" show-overflow-tooltip="" />
				<el-table-column prop="customerName" label="用户名称" align="left" show-overflow-tooltip="" />
				<el-table-column prop="cellPhone" label="手机号码" width="120"  align="left" show-overflow-tooltip="" />
				<el-table-column prop="petName" label="宠物名称" align="left" show-overflow-tooltip=""/>
				<el-table-column prop="petKindText" label="种类" width="100" align="left" show-overflow-tooltip=""/>
				<el-table-column prop="petVarietieText" label="品种" align="left" show-overflow-tooltip=""/>
				<el-table-column prop="inHospitalStatusText" label="状态" align="center" width="100" />
				<el-table-column label="入院时间" align="center" width="150">
					<template #default="scope">
						{{ scope.row.startTime }}
					</template>
				</el-table-column>
				<el-table-column label="出院时间" align="center" width="150">
					<template #default="scope">
						{{ scope.row.outHospitalTime }}
					</template>
				</el-table-column>
				<el-table-column prop="description" label="入院描述" align="left" show-overflow-tooltip=""/>
				<el-table-column label="操作" width="120" align="center" show-overflow-tooltip="">
					<template #default="scope">
						<el-button size="small" text="" type="primary" @click="openInfo(scope.row)"> 详情 </el-button>
						<el-button v-if="scope.row.inHospitalType == 0" size="small" text="" type="primary" @click="openRecordInfo(scope.row)" > 查看病例 </el-button>
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
		<infos ref="infosRef"></infos>
	</div>
</template>

<script lang="ts" setup name="inHospitalRecords">
import { ref,defineAsyncComponent } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi } from '/@/api-services/api';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';

const infos = defineAsyncComponent(() => import('./info.vue'));
const storesTagsViewRoutes = useTagsViewRoutes();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
const infosRef=ref();
//日期范围值
const inDates = ref<any>([]);
const outDates = ref<any>([]);
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({
	cellPhone: '',
	customerName: '',
	inStartTime: '',
	inEndTime: '',
	outStartTime: '',
	outEndTime: '',
	inHospitalType: null,
});

const inHospitalType = ref<number>(-1);
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0 as any,
});
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
/**
 * 查看详情
 */
const openInfo=(row:any)=>{
	infosRef.value.openDialog(row);
}
/**
 * 跳转至病例
 * @param row 
 */
const openRecordInfo=(row:any)=>{
    
	ElMessage.info('此功能还在开发中，敬请期待！');
}

/**
 * 查询操作
 */
const handleQuery = async () => {
	loading.value = true;
	if (inDates.value != null) {
        queryParams.value.inStartTime = inDates.value[0];
        queryParams.value.inEndTime = inDates.value[1];
    }
    else {
        queryParams.value.inStartTime = null;
        queryParams.value.inEndTime = null;
    }
	if (outDates.value != null) {
        queryParams.value.outStartTime = outDates.value[0];
        queryParams.value.outEndTime = outDates.value[1];
    }
    else {
        queryParams.value.outStartTime = null;
        queryParams.value.outEndTime = null;
    }
	queryParams.value.inHospitalType = inHospitalType.value == -1 ? null : inHospitalType.value;
	await getAPI(InHospitalApi).apiInHospitalGetInHospitalRecordsPost(Object.assign(queryParams.value, tableParams.value)).then((res:any)=>{
		tableData.value = res.data.result?.items ?? [];
		tableParams.value.total = res.data.result?.total;
	}).finally(()=>{
		loading.value = false;
	});
	
};

/**
 * 改变页面容量
 * @param val 
 */
const handleSizeChange = (val: number) => {
	tableParams.value.pageSize = val;
	handleQuery();
};

/**
 * 改变页码序号
 * @param val 
 */
const handleCurrentChange = (val: number) => {
	tableParams.value.page = val;
	handleQuery();
};

handleQuery();
</script>

<style lang="scss" scoped>
.inHospital-Records {
}
</style>
