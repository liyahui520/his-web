<template>
	<div class="inHospital-roomsView">
		<el-dialog v-model="isShowDialog" title="详情" width="70%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>详情</span>
				</div>
			</template>

			<el-card shadow="never" style="height: 650px" v-loading="loading" :body-style="{ padding: 0 }">
				<el-descriptions title="" :column="5">
					<el-descriptions-item label="用户名称：">{{ hospitalDetailInfo.customerName }}</el-descriptions-item>
					<el-descriptions-item label="宠物名称：">{{ hospitalDetailInfo.petName }}</el-descriptions-item>
					<el-descriptions-item label="笼位名称：">{{ hospitalDetailInfo.roomName }}</el-descriptions-item>
					<el-descriptions-item label="负责人：">{{ hospitalDetailInfo.headName }}</el-descriptions-item>
					<el-descriptions-item label="入住时间：">{{ formatDate(new Date(hospitalDetailInfo.startTime), 'YYYY-mm-dd') }}</el-descriptions-item>
					<el-descriptions-item label="住院状态：">
						<el-tag type="success" v-if="hospitalDetailInfo.inHospitalStatus == 0">入住中</el-tag>
						<el-tag type="info" v-if="hospitalDetailInfo.inHospitalStatus == 1">已出院</el-tag>
					</el-descriptions-item>
					<el-descriptions-item label="支付状态：">
						<el-tag type="success" v-if="hospitalDetailInfo.inHospitalPayStatus == 0">待支付</el-tag>
						<el-tag type="primary" v-else-if="hospitalDetailInfo.inHospitalPayStatus == 1">已支付</el-tag>
						<el-tag type="warning" v-else-if="hospitalDetailInfo.inHospitalPayStatus == 2">部分已退款</el-tag>
						<el-tag type="info" v-else-if="hospitalDetailInfo.inHospitalPayStatus == 3">已退款</el-tag>
						<el-tag type="danger" v-else-if="hospitalDetailInfo.inHospitalPayStatus == 4">已删除</el-tag>
					</el-descriptions-item>
					<el-descriptions-item label="入住时长：">{{ hospitalDetailInfo.stayDate }}</el-descriptions-item>
					<el-descriptions-item label="出院时间：">{{
						hospitalDetailInfo.inHospitalStatus == 1 ? formatDate(new Date(hospitalDetailInfo.outHospitalTime), 'YYYY-mm-dd HH:MM:SS') : ''
					}}</el-descriptions-item>
				</el-descriptions>
				<el-divider content-position="left">护理项目</el-divider>
				<el-table :data="hospitalDetailInfo.nurseItems" empty-text="暂无数据" style="height: 200px" tooltip-effect="light" row-key="id" border>
					<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
					<el-table-column prop="inHospitalNurseName" label="名称" align="left" show-overflow-tooltip="" />
					<el-table-column label="开始时间" width="120" align="center">
						<template #default="scope">
							{{ formatDate(new Date(scope.row.startTime), 'YYYY-mm-dd') }}
						</template>
					</el-table-column>
					<el-table-column v-if="hospitalDetailInfo.inHospitalPayStatus == 0" label="销售价格" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<div v-if="scope.row.inHospitalCostType == 0">{{ verifyNumberComma(scope.row?.salePrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
							<div v-if="scope.row.inHospitalCostType == 1">{{ verifyNumberComma(scope.row?.monthSalePrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
						</template>
					</el-table-column>
					<el-table-column v-if="hospitalDetailInfo.inHospitalPayStatus == 0" label="会员价格" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<div v-if="scope.row.inHospitalCostType == 0">{{ verifyNumberComma(scope.row?.memberPrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
							<div v-if="scope.row.inHospitalCostType == 1">{{ verifyNumberComma(scope.row?.monthMemberPrice?.toFixed(2).toString() || '0.00') }} / {{ scope.row.inHospitalCostTypeText }}</div>
						</template>
					</el-table-column>
					<el-table-column v-if="hospitalDetailInfo.inHospitalPayStatus != 0" label="付款金额" align="center" show-overflow-tooltip="">
						<template #default="scope">{{ verifyNumberComma(scope.row?.actualAmount?.toFixed(2).toString() || '0.00') }} </template>
					</el-table-column>
					<el-table-column label="支付状态" align="center" width="100"  show-overflow-tooltip="">
						<template #default="scope">
						<el-tag type="success" v-if="scope.row.payStatus == 0">待支付</el-tag>
						<el-tag type="primary" v-else-if="scope.row.payStatus == 1">已支付</el-tag>
						<el-tag type="warning" v-else-if="scope.row.payStatus == 2">部分已退款</el-tag>
						<el-tag type="info" v-else-if="scope.row.payStatus == 3">已退款</el-tag>
						<el-tag type="danger" v-else-if="scope.row.payStatus == 4">已删除</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" width="150" align="center">
						<template #default="scope">
							{{ formatDate(new Date(scope.row.createTime), 'YYYY-mm-dd HH:MM:SS') }}
						</template>
					</el-table-column>
				</el-table>
				<el-divider content-position="left">日常记录</el-divider>
				<el-table :data="hospitalDetailInfo.dailys" empty-text="暂无数据" style="height: 250px" tooltip-effect="light" row-key="id" border>
					<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
					<el-table-column prop="content" label="内容" width="300" align="left" show-overflow-tooltip="" />
					<el-table-column label="创建时间" width="150" align="center">
						<template #default="scope">
							{{ scope.row.createTime }}
						</template>
					</el-table-column>
					<el-table-column label="图片" align="left">
						<template #default="scope">
							<div v-if="scope.row.dailyImages.length > 0">
								<el-image
									v-for="(imgItem, index) in scope.row.dailyImages"
									:key="index"
									style="width: 50px; height: 50px; margin-right: 10px"
									:src="imgItem"
									:zoom-rate="1.2"
									:max-scale="7"
									:min-scale="0.2"
									:preview-src-list="scope.row.dailyImages"
									:initial-index="index"
									fit="cover"
									:preview-teleported="true"
								/>
							</div>
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
	</div>
</template>

<script lang="ts" setup name="inHospital-roomsView">
import { ref } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi } from '/@/api-services';
import { ElMessageBox, ElMessage } from 'element-plus';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import { formatDate } from '/@/utils/formatTime';

const isShowDialog = ref<any>(false);
const loading = ref<any>(false);
const hospitalDetailInfo = ref<any>({});
/**
 * 打开页面
 * @param row 当前行数据
 */
const openDialog = async (row: any, inHospitalType: number) => {
	isShowDialog.value = true;
	hospitalDetailInfo.value = {};
	await loadHospitalDetail(row);
};
/**
 * 加载住院详情信息
 */
const loadHospitalDetail = async (row: any) => {
	loading.value = true;
	await getAPI(InHospitalApi)
		.apiInHospitalGetInHospitalsDetailPost({
			id: row.id,
			regId: row.regId,
			recordId: row.recordId,
			customerId: row.customerId,
		})
		.then((res) => {
			hospitalDetailInfo.value = res.data.result ?? {};
		})
		.finally(() => {
			loading.value = false;
		});
};

const submit = () => {
	isShowDialog.value = false;
};

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
