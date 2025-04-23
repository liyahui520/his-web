<template>
	<div class="inHospital-nurseView">
		<el-dialog v-model="isShowDialog" title="住院护理" width="50%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>住院护理</span>
				</div>
			</template>

			<el-card shadow="never" style="height: 500px" :body-style="{padding:0}">
				<el-button type="primary" style="margin: 0px 0px 10px 0px" @click="openNurses">添加护理</el-button>
				<el-table :data="tableData" style="height: 450px" v-loading="loading" tooltip-effect="light" row-key="id" border>
					<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
					<el-table-column prop="inHospitalNurseName" label="名称" align="left" show-overflow-tooltip="" />
					<el-table-column label="销售价格" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<div v-if="scope.row.inHospitalCostType == 0">{{ verifyNumberComma(scope.row?.salePrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
							<div v-if="scope.row.inHospitalCostType == 1">{{ verifyNumberComma(scope.row?.monthSalePrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
						</template>
					</el-table-column>
					<el-table-column label="会员价格" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<div v-if="scope.row.inHospitalCostType == 0">{{ verifyNumberComma(scope.row?.memberPrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
							<div v-if="scope.row.inHospitalCostType == 1">{{ verifyNumberComma(scope.row?.monthMemberPrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
						</template>
					</el-table-column>
					<el-table-column label="开始时间" width="120" align="center">
						<template #default="scope">
							{{ formatDate(new Date(scope.row.startTime), 'YYYY-mm-dd') }}
						</template>
					</el-table-column>
					<!-- <el-table-column label="结束时间" width="120" align="center">
						<template #default="scope">
							{{ scope.row.endTime != null && scope.row.endTime != '' ? formatDate(new Date(scope.row.endTime), 'YYYY-mm-dd') : '' }}
						</template>
					</el-table-column> -->
					<el-table-column label="操作" width="80" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<el-button v-if="scope.row.payStatus == null" icon="ele-Delete" size="small" text="" type="danger" @click="delInHospitalNurses(scope.row)"> 删除 </el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submit" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
		<addNurse ref="addNurseRef" @reloadTable="selectCallBack"></addNurse>
	</div>
</template>

<script lang="ts" setup name="inHospital-nurseView">
import { ref, onMounted } from 'vue';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi } from '/@/api-services';
import addNurse from './addNurse.vue';
import { formatDate } from '/@/utils/formatTime';
import { ElMessageBox, ElMessage } from 'element-plus';

//父级传递来的函数，用于回调
const emit = defineEmits(['reloadData']);
const isShowDialog = ref<any>(false);
const tableData = ref<any>([]);
const loading = ref<any>(false);
const currentRowInfo = ref<any>({});
const addNurseRef = ref();
const inHospitalTypeValue = ref<any>(0);
const isLoading=ref<any>(false);
/**
 * 打开页面
 * @param row 当前行数据
 */
const openDialog = async (row: any, inHospitalType: number) => {
	isShowDialog.value = true;
	isLoading.value=false;
	currentRowInfo.value = row;
	inHospitalTypeValue.value = inHospitalType;
	await loadNurseData();
};
/**
 * 删除护理
 */
const delInHospitalNurses = async (row: any) => {
	ElMessageBox.confirm('确认要删除此护理项目吗?','提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
		.then(async () => {
			await getAPI(InHospitalApi)
				.apiInHospitalDeleteInHospitalsNursesPost({ id: row.id, customerId: currentRowInfo.value.customerId, inHospitalId: currentRowInfo.value.id, ver: row.ver })
				.then(async (res) => {
					isLoading.value = true;
					ElMessage.success('删除成功');
					await loadNurseData();
				});
		})
		.catch(() => {});
};
/**
 * 添加护理
 */
const openNurses = () => {
	addNurseRef.value.openDialog(currentRowInfo.value, inHospitalTypeValue.value);
};

/**
 * 选择护理以后的回调
 */
const selectCallBack = async () => {
	isLoading.value = true;
	await loadNurseData();
};

/**
 * 加载护理数据
 */
const loadNurseData = async () => {
	loading.value = true;
	await getAPI(InHospitalApi)
		.apiInHospitalGetInHospitalNursesPost({ id: currentRowInfo.value.id, customerId: currentRowInfo.value.customerId })
		.then((res) => {
			tableData.value = res.data?.result ?? [];
			loading.value = false;
		});
	loading.value = false;
};

const submit = () => {
	isShowDialog.value = false;
	if(isLoading.value){
		emit('reloadData');
	}
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
