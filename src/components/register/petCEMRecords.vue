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
			<el-card class="full-table" shadow="always" style="height: 550px;margin-top: 8px">
				<el-table ref="paymentTableRef" :data="tableData" border style="width: 100%" height="600" v-loading="loading" tooltip-effect="light" row-key="id">
					<el-table-column prop="customerName" label="会员名称" fixed="left" show-overflow-tooltip="" />
					<el-table-column prop="petName" label="宠物名称" fixed="left" show-overflow-tooltip="" />
					<el-table-column prop="regTypeText" label="病例类型" min-width="100" show-overflow-tooltip="">
						<template #default="scope">
							<el-tag effect="plain">{{ scope.row.regTypeText }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="statusText" label="诊疗状态" min-width="100" show-overflow-tooltip="">
						<template #default="scope">
							<el-tag effect="plain">{{ scope.row.statusText }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="visitDoctorName" label="就诊医生" show-overflow-tooltip="" />
					<el-table-column prop="regTime" label="挂号时间" width="150" show-overflow-tooltip="" />
					<el-table-column prop="recordTime" label="就诊时间" width="150" show-overflow-tooltip="" />
					<el-table-column prop="updateTime" label="结束时间" width="150" >
						<template #default="scope">
                            {{ scope.row.status ==2 ? scope.row.updateTime : '' }}
                            
						</template>
					</el-table-column>
					<!-- <el-table-column prop="isHospital" label="住院病例" show-overflow-tooltip="" >
						<template #default="scope">
							<el-tag type="primary" effect="plain">{{ scope.row.isHospital?'是':'否' }}</el-tag>
						</template>
					</el-table-column> -->
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
import { CEMRecordApi } from '/@/api-services/api';

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '诊疗记录',
	},
});
const isShowDialog = ref(false);
const loading = ref(false);
const queryParams = ref<any>({ customerId: 0, petId: 0 });
const tableData = ref<any>([]);

const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0 as any,
});

// 打开弹窗
const openDialog = async (data: any) => {
	isShowDialog.value = true;
	queryParams.value.customerId = data.customerId;
	queryParams.value.petId = data.petId;
	tableData.value = [];
	tableParams.value.total = 0;
	await handleQuery();

};
// 关闭弹窗
const closeDialog = () => {
	isShowDialog.value = false;
};

const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(CEMRecordApi).apiCEMRecordGetPetCemRecordsPost(Object.assign(queryParams.value, tableParams.value));
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
