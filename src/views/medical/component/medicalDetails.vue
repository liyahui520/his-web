<template>
	<el-tabs v-model="tabValue" type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0">
		<el-tab-pane name="PendTreat" label="待诊疗">
			<PendTreat v-if="tabValue == 'PendTreat'" @selectPcuReload="selectPcu" />
		</el-tab-pane>
		<el-tab-pane name="InTreat" label="诊疗中"><InTreat v-if="tabValue == 'InTreat'" @selectPcuReload="selectPcu" /> </el-tab-pane>
		<el-tab-pane name="medicalDetails" label="预约中心"> <medicalDetails v-if="tabValue == 'medicalDetails'"  @selectPcuReload="selectPcu" /></el-tab-pane>
		<el-tab-pane name="WillPay" label="待付款"><WillPay v-if="tabValue == 'WillPay'"  @selectPcuReload="selectPcu" /></el-tab-pane> 
		<el-tab-pane name="Vaccina" label="驱虫疫苗"><Vaccina v-if="tabValue == 'Vaccina'"  @selectPcuReload="selectPcu" /></el-tab-pane>
	</el-tabs>
</template>

<script lang="ts" setup name="medicalManagement">
import { defineAsyncComponent, ref } from 'vue';
const medicalDetails = defineAsyncComponent(() => import('/@/components/reservation/list.vue'));
const PendTreat = defineAsyncComponent(() => import('/@/components/reservation/pendTreat.vue'));
const InTreat = defineAsyncComponent(() => import('/@/components/reservation/inTreat.vue'));
const Vaccina = defineAsyncComponent(() => import('/@/components/vaccinations/indexVaccinations.vue'));
const WillPay = defineAsyncComponent(() => import('/@/components/payments/willPayOrder.vue'));
const emit = defineEmits(['selectPcuReload']);

const tabValue = ref<any>('PendTreat');

const selectPcu = async (row: any) => {
	emit('selectPcuReload', row);
};
</script>

<style scoped lang="scss">
:deep(.el-tabs--border-card>.el-tabs__header){
	background-color:var(--next-bg-menuBarActiveColor) !important;
}

</style>
