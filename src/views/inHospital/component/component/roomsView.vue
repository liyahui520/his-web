<template>
	<div class="inHospital-roomsView">
		<el-dialog v-model="isShowDialog" title="住院笼位" width="70%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>住院笼位</span>
				</div>
			</template>

			<el-card shadow="never" style="height: 500px" v-loading="loading" :body-style="{padding:0}">
				<el-divider content-position="left">当前笼位</el-divider>
				<el-row :gutter="20" style="margin-bottom: 20px">
					<el-col :span="8">名称：{{ currentRoomInfo.name }}</el-col>
					<el-col :span="8">位置：{{ currentRoomInfo.location }}</el-col>
					<el-col :span="8"
						>销售价格：
						<el-text v-if="currentRoomInfo.inHospitalCostType == 0"
							>{{ verifyNumberComma(currentRoomInfo.salePrice?.toFixed(2).toString() || '0.00') }} / {{ currentRoomInfo.inHospitalCostTypeText }}</el-text
						>
						<el-text v-if="currentRoomInfo.inHospitalCostType == 1"
							>{{ verifyNumberComma(currentRoomInfo.monthSalePrice?.toFixed(2).toString() || '0.00') }} / {{ currentRoomInfo.inHospitalCostTypeText }}</el-text
						></el-col
					>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">大小：{{ currentRoomInfo.size }}</el-col>
					<el-col :span="8">状态：<el-tag type="success" v-if="currentRoomInfo.isEnable">启用</el-tag> <el-tag type="info" v-else>禁用</el-tag></el-col>
					<el-col :span="8"
						>会员价格：
						<el-text v-if="currentRoomInfo.inHospitalCostType == 0"
							>{{ verifyNumberComma(currentRoomInfo.memberPrice?.toFixed(2).toString() || '0.00') }} / {{ currentRoomInfo.inHospitalCostTypeText }}</el-text
						>
						<el-text v-if="currentRoomInfo.inHospitalCostType == 1"
							>{{ verifyNumberComma(currentRoomInfo.monthMemberPrice?.toFixed(2).toString() || '0.00') }} / {{ currentRoomInfo.inHospitalCostTypeText }}</el-text
						>
					</el-col>
				</el-row>
				<el-divider content-position="left">可变更笼位</el-divider>
				<el-table :data="tableData" style="height: 300px" tooltip-effect="light" row-key="id" border>
					<el-table-column label="名称" prop="name" width="180" />
					<el-table-column label="位置" prop="location" width="180" />
					<el-table-column label="大小" prop="size" width="180" />
					<el-table-column label="销售价格" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<div v-if="scope.row.inHospitalCostType == 0">{{ verifyNumberComma(scope.row?.salePrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
							<div v-if="scope.row.inHospitalCostType == 1">{{ verifyNumberComma(scope.row?.monthSalePrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="会员价格" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<div v-if="scope.row.inHospitalCostType == 0">{{ verifyNumberComma(scope.row?.memberPrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
							<div v-if="scope.row.inHospitalCostType == 1">{{ verifyNumberComma(scope.row?.monthMemberPrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
						</template>
					</el-table-column>
					<el-table-column label="状态" align="center" width="150">
						<template #default="scope">
							<el-tag type="success" v-if="scope.row.isEnable">启用</el-tag>
							<el-tag type="info" v-else>禁用</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center">
						<template #default="scope">
							<el-button type="primary" size="small" @click="changeRoom(scope.row)">更换</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>

			<div style="margin-top: 10px">
				<el-text type="danger">
					1、只可变更为启用，并且没有被占用的笼位<br />
					2、笼位费用按照出院时选择的笼位计算金额
				</el-text>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submit" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="inHospital-roomsView">
import { ref, onMounted } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi } from '/@/api-services';
import { ElMessageBox, ElMessage } from 'element-plus';
import { verifyNumberComma } from '/@/utils/toolsValidate';

const isShowDialog = ref<any>(false);
const tableData = ref<any>([]);
const loading = ref<any>(false);
const currentRowInfo = ref<any>({});
const inHospitalTypeValue = ref<any>(0);
const currentRoomInfo = ref<any>({});
/**
 * 打开页面
 * @param row 当前行数据
 */
const openDialog = async (row: any, inHospitalType: number) => {
	isShowDialog.value = true;
	currentRowInfo.value = row;
	inHospitalTypeValue.value = inHospitalType;
	await loadRoomsData();
};
const submit = () => {
	isShowDialog.value = false;
};
/**
 * 笼位变更
 */
const changeRoom = (row: any) => {
	ElMessageBox.confirm(`确定要变更笼位吗?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(InHospitalApi)
				.apiInHospitalUpdateInHospitalsRoomPost({
					id: currentRowInfo.value.id,
					customerId: currentRowInfo.value.customerId,
					ver: currentRowInfo.value.ver,
					sourceId: currentRoomInfo.value.id,
					sourceVer: currentRoomInfo.value.ver,
					nowId: row.id,
					nowVer: row.ver,
				})
				.then(async () => {
					submit();
					ElMessage.success('变更成功');
					currentRowInfo.value.roomId= row.id;
					currentRowInfo.value.roomName=row.name;
					await loadRoomsData();
				});
		})
		.catch(() => {});
};

/**
 * 加载笼位数据
 */
const loadRoomsData = async () => {
	loading.value = true;
	tableData.value = [];
	await getAPI(InHospitalApi)
		.apiInHospitalGetRoomsListPost({ inHospitalType: inHospitalTypeValue.value })
		.then((res) => {
			let result = res.data.result ?? [];
			result.forEach((item: any) => {
				if (item.id == currentRowInfo.value.roomId) {
					currentRoomInfo.value = item;
					return;
				}
				if (item.isEnable && !item.isOccupy) tableData.value.push(item);
			});
			loading.value = false;
		});
	loading.value = false;
};
// 页面加载时
onMounted(async () => {});
//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.inHospital-roomsView {
	:deep(.el-dialog__footer) {
		padding-top: 0px !important;
	}
}
</style>
