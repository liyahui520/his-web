<template>
	<div class="in-hospitals-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-bottom: 8px">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="客户名称">
					<el-input v-model="queryParams.customerName" clearable placeholder="请输入客户名称" />
				</el-form-item>
				<el-form-item label="宠物名称">
					<el-input v-model="queryParams.petName" clearable placeholder="请输入宠物名称" />
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
						<el-button
							icon="ele-Refresh"
							@click="
								() =>
									(queryParams = {
										customerName: '',
										petName: '',
										inHospitalType: InHospitalTypeEnum.NUMBER_0,
										page: 1,
										pageSize: 200,
										total: 0,
									})
							"
						>
							重置</el-button
						>
					</el-button-group>
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button icon="ele-Plus" @click="openAddInHospital" type="success"> 新增 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="data-class" shadow="never" v-loading="cardLoading">
			<span v-if="inHospitalData.length > 0" :style="'float: left;margin-right: 16px;margin-bottom: 16px;'" :key="item.id" v-for="item in inHospitalData">
				<zYCard :item="item" @openNurses="openNurses" @openRooms="openRooms" @openDays="openDays" @outHospital="outHospital" @openPrescription="openPrescription" @openTests="openTests" />
			</span>
			
			<el-empty v-else description="暂无住院信息"> </el-empty>
		</el-card>

		<prescriptions ref="prescriptionsRef"></prescriptions>
		<tests ref="testsRef"></tests>
		<nurses ref="nursesRef" @reloadData="handleQuery"></nurses>
		<rooms ref="roomsRef"></rooms>
		<dailys ref="dailysRef"></dailys>
		<addHospital ref="addHospitalRef" @reloadTable="handleQuery"></addHospital>
	</div>
</template>

<script lang="ts" setup name="inHospitalHospital">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { InHospitalTypeEnum } from '/@/api-services/models/cemrecord-manage/in-hospital-type-enum';
import { InHospitalCostTypeEnum } from '/@/api-services/models/cemrecord-manage/in-hospital-cost-type-enum';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi } from '/@/api-services/api';
import prescriptions from './prescriptions.vue';
import tests from './tests.vue';
import nurses from '../component/nurseView.vue';
import rooms from '../component/roomsView.vue';
import dailys from '../component/dailysView.vue';
import addHospital from './addHospital.vue';
import { formatDate } from '/@/utils/formatTime';
const zYCard = defineAsyncComponent(() => import('../component/zYCard.vue'));

const prescriptionsRef = ref();
const addHospitalRef = ref();
const testsRef = ref();
const nursesRef = ref();
const roomsRef = ref();
const dailysRef = ref();
const cardLoading = ref<boolean>(false);
const queryParams = ref({
	customerName: '',
	petName: '',
	inHospitalType: InHospitalTypeEnum.NUMBER_0,
	page: 1,
	pageSize: 200,
	total: 0,
});
const inHospitalData = ref<any>([]);
/**
 *
 */
const handleQuery = async () => {
	cardLoading.value = true;
	await getAPI(InHospitalApi)
		.apiInHospitalGetInHospitalsPagePost(queryParams.value)
		.then((res) => {
			cardLoading.value = false;
			inHospitalData.value = res.data.result?.items ?? [];
		})
		.finally(() => {
			cardLoading.value = false;
		});
};
/**
 * 添加住院
 */
const openAddInHospital = () => {
	addHospitalRef.value.openDialog({
		regId: 0,
		customerId: 0,
		customerName: '',
		petId: 0,
		petName: '',
		roomId: 0,
		roomName: '',
		inHospitalCostType: InHospitalCostTypeEnum.NUMBER_0,
		startTime: formatDate(new Date(), 'YYYY-mm-dd'),
		salePrice: 0,
		memberPrice: 0,
		monthSalePrice: 0,
		monthMemberPrice: 0,
		inHospitalType: InHospitalTypeEnum.NUMBER_0,
		headId: 0,
		headName: '',
		description: '',
		remark: '',
	});
};

/**
 * 出院
 * @param row 行数据
 */
const outHospital = async (row: any) => {
	row.outHospitalLoading = true;
	await getAPI(InHospitalApi)
		.apiInHospitalOutHospitalsPost({
			id: row.id,
			customerId: row.customerId,
			petId: row.petId,
			ver: row.ver,
		})
		.then(async (res) => {
			row.outHospitalLoading = false;
			await handleQuery();
		})
		.catch(() => {
			row.outHospitalLoading = false;
		});
};
/**
 * 添加日常
 * @param row 行数据
 */
const openDays = (row: any) => {
	dailysRef.value.openDialog(row, InHospitalTypeEnum.NUMBER_0);
};

/**
 * 更换笼位
 * @param row 行数据
 */
const openRooms = (row: any) => {
	roomsRef.value.openDialog(row, InHospitalTypeEnum.NUMBER_0);
};
/**
 * 开具护理
 * @param row 行数据
 */
const openNurses = (row: any) => {
	nursesRef.value.openDialog(row, InHospitalTypeEnum.NUMBER_0);
};

/**
 * 开具化验
 * @param row 行数据
 */
const openTests = (row: any) => {
	testsRef.value.openDialog(row);
};
/**
 * 打开处方
 * @param row 行数据
 */
const openPrescription = (row: any) => {
	prescriptionsRef.value.openDialog(row);
};

// 页面加载时
onMounted(async () => {
	await handleQuery();
});
</script>

<style lang="scss" scoped>
.in-hospitals-container {
	.data-class {
		height: calc(100vh - 225px);
		overflow: auto;
		margin-top: 8px;
		.item-class {
			height: 200px;
			:deep(.el-card__header) {
				height: 35px;
				padding: 8px 10px !important;
			}
			:deep(.el-card__body) {
				height: 90px;
				padding: 10px;
			}
			:deep(.el-card__footer) {
				height: 80px;
				padding: 8px 10px !important;
				.item-footer-class {
					text-align: center;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
