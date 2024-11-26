<template>
	<div class="inHospital-nurseView">
		<el-dialog v-model="isShowDialog" title="护理项目选择" width="50%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>护理项目选择</span>
				</div>
			</template>

			<el-card shadow="never" style="height: 550px" :body-style="{padding:0}">
				<el-table ref="nurseTableRef" :data="tableData" style="height: 450px" v-loading="loading" tooltip-effect="light" row-key="inHospitalNurseId" border>
					<el-table-column type="selection" width="55" align="center" />
					<!-- <el-table-column type="index" label="序号" width="55" align="center" /> -->
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
					<el-table-column label="开始时间" width="160" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<el-date-picker style="width: 90%" format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="scope.row.startTime" type="date" placeholder="选择护理开始时间" />
						</template>
					</el-table-column>
					<!-- <el-table-column label="结束时间" width="140" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<el-date-picker
								v-if="scope.row.inHospitalCostType == 0"
								style="width: 90%"
								format="YYYY-MM-DD"
								value-format="YYYY-MM-DD"
								v-model="scope.row.endTime"
								type="date"
								placeholder="选择护理结束时间"
							/>
						</template>
					</el-table-column> -->
				</el-table>
				<div style="margin-top: 10px">
					<el-text type="danger">
						1、当选择了按月护理时，当护理时间不足一个月时，按一个月计算。<br />
						2、当选择了按天护理时，如果结束护理时间没有选择，则按照出院时间进行计算护理天数，护理结束大于出院时间时则按照出院时间来计算护理费用，当护理时间不足一天时，按一天计算。
					</el-text>
				</div>
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="inHospital-nurseView">
import { ref, onMounted, reactive } from 'vue';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi } from '/@/api-services';
import { ElMessageBox, ElMessage } from 'element-plus';
import { formatDate } from '/@/utils/formatTime';

const isShowDialog = ref<any>(false);
const tableData = ref<any>([]);
const loading = ref<any>(false);
const inHospitalTypeValue = ref<any>(0);
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const nurseTableRef = ref();
const currentRowInfo = ref<any>({});
/**
 * 打开页面
 * @param row 当前行数据
 */
const openDialog = async (data: any, inHospitalType: number) => {
	isShowDialog.value = true;
	inHospitalTypeValue.value = inHospitalType;
	currentRowInfo.value = data;
	await loadNurseData();
};

/**
 * 加载护理数据
 */
const loadNurseData = async () => {
	loading.value = true;
	tableData.value = [];
	await getAPI(InHospitalApi)
		.apiInHospitalGetNurseListPost({ inHospitalType: inHospitalTypeValue.value })
		.then((res) => {
			let result = res.data?.result ?? [];
			result.forEach((item: any) =>
				tableData.value.push({
					inHospitalNurseId: item.id,
					inHospitalNurseName: item.name,
					inHospitalCostType: item.inHospitalCostType,
					inHospitalCostTypeText: item.inHospitalCostTypeText,
					startTime: formatDate(new Date(), 'YYYY-mm-dd'),
					endTime: '',
					salePrice: item.salePrice,
					memberPrice: item.memberPrice,
					monthSalePrice: item.monthSalePrice,
					monthMemberPrice: item.monthMemberPrice,
					remark: '',
				})
			);
			loading.value = false;
		});
	loading.value = false;
};

const submit = async () => {
	if (nurseTableRef.value.getSelectionRows().length <= 0) {
		ElMessage.error('请选择护理项目');
		return;
	}
	const nurseItemsSubmit = nurseTableRef.value.getSelectionRows();
	nurseItemsSubmit.forEach((item: any) => {
		item.startTime = item.startTime == null || item.startTime == '' ? formatDate(new Date(), 'YYYY-mm-dd') : item.startTime;
	});
	const submitInfo = {
		inHospitalId: currentRowInfo.value.id,
		customerId: currentRowInfo.value.customerId,
		customerName: currentRowInfo.value.customerName,
		petId: currentRowInfo.value.petId,
		petName: currentRowInfo.value.petName,
		nurseItems: nurseTableRef.value.getSelectionRows(),
	};
	await getAPI(InHospitalApi)
		.apiInHospitalAddInHospitalsNursesPost(submitInfo)
		.then((res: any) => {
			ElMessage.success('添加成功！');
			isShowDialog.value = false;
			emit('reloadTable', nurseTableRef.value.getSelectionRows());
		});
	isShowDialog.value = false;
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
