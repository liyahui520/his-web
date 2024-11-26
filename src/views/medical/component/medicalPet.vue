<template>
	<el-card
		class="box-card"
		:style="
			props.pet?.petStatus == '-1' || props.pet?.petStatus == '0'
				? 'width:360px;height: 150px;border-radius: 15px 15px 0px 0px;filter:grayscale(1)'
				: 'width:360px;height: 150px;border-radius: 15px 15px 0px 0px;'
		"
		:body-style="{ padding: '0px' }"
	>
		<el-row :gutter="10">
			<el-col :span="24" style="margin-top: 5px">
				<el-tag type="warning" size="small" style="margin-left: 4px">
					{{ props.pet.petRecordNumber ?? '----------' }}
				</el-tag>
				<el-tag type="info" size="small" style="margin-left: 5px" v-if="props.pet.petStatus == '-1'">{{ props.pet.petStatusText }}</el-tag>
				<el-tag type="warning" size="small" style="margin-left: 5px" v-if="props.pet.petStatus == '0'">{{ props.pet.petStatusText }}</el-tag>
				<el-tag type="success" size="small" style="margin-left: 5px" v-if="props.pet.petStatus == '1'">{{ props.pet.petStatusText }}</el-tag>
				<el-tag type="" size="small" style="margin-left: 5px" v-if="props.pet.petStatus == '2'">{{ props.pet.petStatusText }}</el-tag>
				<el-tag type="danger" size="small" style="margin-left: 5px" v-if="props.pet.petStatus == '3'">{{ props.pet.petStatusText }}</el-tag>
				<span style="float: right; margin-right: -5px"><el-button icon="ele-Edit" size="small" text="" type="primary" title="编辑" @click="editPet"></el-button></span>
			</el-col>
			<el-col :span="24" style="padding-left: 10px">
				<div style="float: left; text-align: center">
					<div style="text-align: center">
						<el-avatar
							v-if="props.pet.petImageUrl != void 0 && props.pet.petImageUrl != null && props.pet.petImageUrl != '' && props.pet.petImageUrl != 'null' && props.pet.petImageUrl != 'undefined'"
							:size="80"
							style="background-color: white"
							shape="square"
							:src="props.pet.petImageUrl"
                            @error="errorHandler"
						/>
						<el-avatar v-else :size="80" style="background-color: white" shape="square" src="src/assets/in-hospitals/animal.png" @error="errorHandler" />
<!-- 
						<el-avatar :size="80" :src="props.pet.petImageUrl" @error="errorHandler">
							<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
						</el-avatar> -->
					</div>
					<span style="font-size: 12px; line-height: 30px; color: #8d8d91">{{ dateEntityFormatYMD(props.pet.createTime) }}</span>
				</div>
				<div style="float: left; margin-left: 10px">
					<div>
						<el-link target="_blank" style="font-weight: bold; font-size: 16px">{{ props.pet.petName }}-({{ props.pet.petKindText }}) </el-link>
					</div>
					<div style="margin-top: 10px">
						<el-breadcrumb separator="\">
							<el-breadcrumb-item>{{ props.pet.petGenderText ?? '-' }}</el-breadcrumb-item>
							<el-breadcrumb-item>
								<el-text style="max-width: 80px" truncated :title="props.pet.petVarietieText">{{ props.pet.petVarietieText ?? '-' }}</el-text>
							</el-breadcrumb-item>
							<el-breadcrumb-item>{{ props.pet.petColorText ?? '-' }}</el-breadcrumb-item>
							<el-breadcrumb-item>{{ scale2Format(props.pet.petWeight) }}Kg</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div style="margin-top: 12px">
						<el-breadcrumb separator="|">
							<el-breadcrumb-item>
								<el-tag size="small" type="success" v-if="props.pet?.petIsDeworming == 1">已驱虫</el-tag>
								<el-tag size="small" type="info" v-if="props.pet?.petIsDeworming == 0">未驱虫</el-tag>
								<el-tag size="small" type="danger" v-if="props.pet?.petIsDeworming == -1">未知</el-tag>
							</el-breadcrumb-item>
							<el-breadcrumb-item>
								<el-tag size="small" type="success" v-if="props.pet?.petIsVaccinated == 1">已接种</el-tag>
								<el-tag size="small" type="info" v-if="props.pet?.petIsVaccinated == 0">未接种</el-tag>
								<el-tag size="small" type="danger" v-if="props.pet?.petIsVaccinated == -1">未知</el-tag>
							</el-breadcrumb-item>
							<el-breadcrumb-item>
								<el-tag size="small" type="success" v-if="props.pet?.petIsSterilization == 1">已绝育</el-tag>
								<el-tag size="small" type="info" v-if="props.pet?.petIsSterilization == 0">未绝育</el-tag>
								<el-tag size="small" type="danger" v-if="props.pet?.petIsSterilization == -1">未知</el-tag>
							</el-breadcrumb-item>
							<!--                            <el-breadcrumb-item>250天</el-breadcrumb-item>-->
						</el-breadcrumb>
					</div>
					<div style="margin-top: 12px; font-size: 12px">
						<el-link type="primary" style="margin-left: 1px" @click="openPaymentOrderRecord">消费记录</el-link>
						<el-link type="primary" style="margin-left: 5px" @click="openMedicalRecords">诊疗记录</el-link>
						<el-link type="primary" style="margin-left: 5px" v-if="!props.pcustomer.isScattered" @click="openVaccines">驱虫疫苗</el-link>
						<el-link type="primary" style="margin-left: 5px" v-if="!props.pcustomer.isScattered" @click="openReservations">预约记录</el-link>
					</div>
				</div>
			</el-col>
		</el-row>
	</el-card>
	<el-card
		class="box-card"
		:style="
			props.pet?.petStatus == '-1' || props.pet?.petStatus == '0'
				? 'border-top: 0px; width:360px;height: 80px;border-radius:0px 0px 15px 15px;padding:3px;margin-top: -1px;text-align: center;filter:grayscale(1)'
				: 'border-top: 0px; width:360px;height: 80px;border-radius:0px 0px 15px 15px;padding:3px;margin-top: -1px;text-align: center;'
		"
		:body-style="{ padding: '0px' }"
	>
		<el-row :gutter="20">
			<el-col :span="6">
				<el-card shadow="hover" :body-style="{ padding: '6px' }" style="border-radius: 10px; border: 0px; cursor: pointer" @click="reg">
					<el-avatar :size="40" style="background-color: white" src="https://xn-default-pic.oss-cn-hangzhou.aliyuncs.com/Ico/%E9%A2%84%E7%BA%A6%E6%8C%82%E5%8F%B7.png" />
					<div>
						<el-text type="info">诊疗挂号</el-text>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card shadow="hover" :body-style="{ padding: '6px' }" style="border-radius: 10px; border: 0px; cursor: pointer" @click="openSalesServices">
					<el-avatar :size="40" style="background-color: white" src="https://xn-default-pic.oss-cn-hangzhou.aliyuncs.com/Ico/%E9%A2%84%E7%BA%A6%E6%9F%A5%E8%AF%A2.png" />
					<div>
						<el-text type="info">洗美服务</el-text>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card shadow="hover" :body-style="{ padding: '6px' }" style="border-radius: 10px; border: 0px; cursor: pointer" @click="openSalesGoods">
					<el-avatar :size="40" style="background-color: white" src="https://xn-default-pic.oss-cn-hangzhou.aliyuncs.com/Ico/%E5%95%86%E5%93%81%E9%94%80%E5%94%AE%E8%A1%A8.png" />
					<div>
						<el-text type="info">销售商品</el-text>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card shadow="hover" v-if="!props.pcustomer.isScattered" :body-style="{ padding: '6px' }" style="border-radius: 10px; border: 0px; cursor: pointer" @click="reserregister">
					<el-avatar :size="40" style="background-color: white" src="https://xn-default-pic.oss-cn-hangzhou.aliyuncs.com/Ico/%E4%BD%93%E6%A3%80%E9%A2%84%E7%BA%A6%E5%A4%87%E4%BB%BD.png" />
					<div>
						<el-text type="info">门店预约</el-text>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</el-card>
	<EditPet ref="editDialogRef" :title="editPetTitle" @reloadTable="petReloadTable" />
	<AddReservation ref="AddReservationRef" :title="AddReservationTitle" :pcustomer="props.pcustomer" :pet="props.pet" />
	<Reg ref="regRef" :pcustomer="props.pcustomer" :pet="props.pet" />
	<Vaccination ref="vaccinationRef" :customerInfo="props.pcustomer" :petInfo="props.pet" />
	<SaleGoods ref="saleGoodsRef" @reloadTable="reloadCustomerInfo" />
	<SaleServices ref="saleServicesRef" @reloadTable="reloadCustomerInfo" />
	<VaccinationPet ref="vaccinationPetRef" :title="'驱虫疫苗'" />
	<ConsumptionRecord ref="consumptionRecordRef" :title="'消费记录'" />
	<PetReservation ref="petReservationRef" :title="'预约记录'" />
	<PetCEMRecords ref="petCEMRecordsRef" :title="'诊疗记录'" />
</template>

<script lang="ts" setup>
import commonFunction from '/@/utils/commonFunction';
import { ref, defineAsyncComponent } from 'vue';

const EditPet = defineAsyncComponent(() => import('../../main/ppets/component/editDialog.vue'));
const AddReservation = defineAsyncComponent(() => import('/@/components/reservation/add.vue'));
const Vaccination = defineAsyncComponent(() => import('/@/components/vaccinations/editVaccinations.vue'));
const VaccinationPet = defineAsyncComponent(() => import('/@/components/vaccinations/indexPetVaccinations.vue'));
const SaleGoods = defineAsyncComponent(() => import('/@/components/sales/goods.vue'));
const SaleServices = defineAsyncComponent(() => import('/@/components/sales/services.vue'));
const ConsumptionRecord = defineAsyncComponent(() => import('/@/components/payments/consumptionRecord.vue'));
const Reg = defineAsyncComponent(() => import('/@/components/register/reg.vue'));
const PetReservation = defineAsyncComponent(() => import('/@/components/reservation/petReservation.vue'));
const PetCEMRecords = defineAsyncComponent(() => import('/@/components/register/petCEMRecords.vue'));
const regRef = ref();
const { dateEntityFormatYMD, scale2Format } = commonFunction();
const AddReservationRef = ref();
const emit = defineEmits(['petsReload', 'reloadTable']);
const editDialogRef = ref();
const petReservationRef = ref();
const petCEMRecordsRef = ref();
const vaccinationRef = ref();
const consumptionRecordRef = ref();
const saleGoodsRef = ref();
const saleServicesRef = ref();
const vaccinationPetRef = ref();
const editPetTitle = ref('');
const AddReservationTitle = ref();
const errorHandler = () => {
	return true;
};
const reloadCustomerInfo = () => {
	emit('reloadTable');
};
const petReloadTable = async () => {
	emit('petsReload');
};
/**
 * 打开诊疗记录
 */
const openMedicalRecords=()=>{
	
	petCEMRecordsRef.value.openDialog({ customerId: props.pcustomer.id, petId: props.pet.id });
}
/**
 * 打开消费记录
 */
const openPaymentOrderRecord = () => {
	consumptionRecordRef.value.openDialog({ customerId: props.pcustomer.id, petId: props.pet.id });
};

/**
 * 打开销售服务
 */
const openSalesServices = () => {
	saleServicesRef.value.openDialog({ customerInfo: props.pcustomer, petInfo: props.pet });
};

/**
 * 打开销售商品
 */
const openSalesGoods = () => {
	saleGoodsRef.value.openDialog({ customerInfo: props.pcustomer, petInfo: props.pet });
};

/**
 * 打开预约记录
 */
const openReservations = () => {
	petReservationRef.value.openDialog({ customerId: props.pcustomer.id, petId: props.pet.id });
};

/**
 * 开具驱虫疫苗
 */
const openVaccines = () => {
	vaccinationRef.value.openDialog({ vaccinationInfos: [], customerInfo: props.pcustomer, petInfo: props.pet, recordId: '0' });
};
/**
 * 修改宠物
 */
const editPet = async () => {
	editPetTitle.value = '修改宠物';
	editDialogRef.value?.KindChange(props.pet?.petKind);
	editDialogRef.value?.openDialog(props.pet);
};

// 打开新增页面
const openAddPcustomer = async () => {
	AddReservationTitle.value = '新增预约';
	AddReservationRef.value?.openDialog({ sourceid: '1', sex: '-1' });
};

/**
 * 预约挂号
 */
const reserregister = async () => {
	await openAddPcustomer();
};

/**
 * 挂号
 */
const reg = async () => {
	regRef.value.openDialog();
};

var props = defineProps({
	pet: {} as any,
	pcustomer: {} as any,
});

defineExpose({});
</script>

<style scoped></style>
