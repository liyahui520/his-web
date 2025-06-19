<template>
	<div :class="isTagsViewCurrenFull ? 'medicineRecords-container tab-cus-full-Content' : 'medicineRecords-container tab-cus-Content'">
		<el-row :gutter="4" style="height: 100%;overflow: hidden;margin: 0px;">
			<el-col :span="3">
				<el-card shadow="never" style="height: 100%; min-height: 150mm" :body-style="{ padding: '0px' }">
					<div slot="header" class="clearfix" style="background-color: var(--el-color-primary); height: 30px; border-radius: 3px 3px 0 0">
						<p style="line-height: 30px; color: var(--el-color-white); font-size: 16px; font-weight: 800; margin-left: 20px; float: left">I</p>
						<p style="line-height: 30px; color: var(--el-color-white); font-size: 14px; font-weight: 800; margin-left: 10px; float: left">处方笺模板</p>
					</div>
					<div class="prescript">
						<div v-for="item in tableData" :key="item.name" :class="[activeItem == item.name ? 'active-prescript' : '', 'prescript-list']" @click="handleCurrentChange(item)">
							<span>{{ item.name }}</span>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="21">
				<PrintCusView
					v-if="currentTemplate == 'A5'"
					:printType="printParam.printType"
					:Providers="printParam.Providers"
					:hiprintEpContainer="printParam.hiprintEpContainer"
					:hiprintprintTemplate="printParam.hiprintprintTemplate"
					:PrintElementOptionSetting="printParam.PrintElementOptionSetting"
					:tempDatas="printParam.tempDatas"
				/>
				<PrintCusViewA4
					v-if="currentTemplate == 'A4'"
					:printType="printParam.printType"
					:Providers="printParam.Providers"
					:hiprintEpContainer="printParam.hiprintEpContainer"
					:hiprintprintTemplate="printParam.hiprintprintTemplate"
					:PrintElementOptionSetting="printParam.PrintElementOptionSetting"
					:tempDatas="printParam.tempDatas"
				/>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup name="prescriptionNotes">
import { computed, onMounted, ref, reactive, defineAsyncComponent } from 'vue';
import 'vue-json-pretty/lib/styles.css';

import tempProviders from './component/datas/PrescriptionProvider';
import RecordPrescriptionData from './component/datas/RecordPrescriptionData';
import InspectionTestDataProvider from './component/datas/InspectionTestDataProvider';
import InspectionTestDataProviderData from './component/datas/InspectionTestDataProviderData';
import RecordTestData from './component/datas/RecordTestData';
import RecordTestProvider from './component/datas/RecordTestProvider';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { storeToRefs } from 'pinia';
const storesTagsViewRoutes = useTagsViewRoutes();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);

import { PrintTypeEnum } from '/@/api-services/models/template-json-manage/print-type-enum';

const PrintCusView = defineAsyncComponent(() => import('./component/index.vue'));
const PrintCusViewA4 = defineAsyncComponent(() => import('./component/index_A4.vue'));
const singleTableRef = ref();
const activeItem = ref();
const printParam = ref({
	printType: PrintTypeEnum.NUMBER_1001,
	Providers: InspectionTestDataProvider,
	hiprintEpContainer: 'huayanhiprintEpContainer',
	hiprintprintTemplate: 'hauyanhiprintprintTemplate',
	PrintElementOptionSetting: 'huayanPrintElementOptionSetting',
	tempDatas: InspectionTestDataProviderData,
});
const currentTemplate = ref<any>('A5');
const tableData = [
	{
		name: '化验单模板',
		type: PrintTypeEnum.NUMBER_1001,
		cn: 'huayan',
		providers: RecordTestProvider,
		tempData: RecordTestData,
	},
	{
		name: '处方笺模板',
		type: PrintTypeEnum.NUMBER_1002,
		cn: 'chufang',
		providers: tempProviders,
		tempData: RecordPrescriptionData,
	},
	{
		name: '收费清单模板',
		type: PrintTypeEnum.NUMBER_1003,
		cn: 'chufang',
		providers: tempProviders,
		tempData: RecordPrescriptionData,
	},
	{
		name: '驱虫疫苗模板',
		type: PrintTypeEnum.NUMBER_1004,
		cn: 'chufang',
		providers: tempProviders,
		tempData: RecordPrescriptionData,
	},
	{
		name: '麻醉单模板',
		type: PrintTypeEnum.NUMBER_1002,
		cn: 'chufang',
		providers: tempProviders,
		tempData: RecordPrescriptionData,
	},
];

const resultTemp = [];

const handleCurrentChange = (row:any) => {
	console.log("row",row);
	currentTemplate.value = 'A5';
	printParam.value.printType = row.type;
	printParam.value.tempDatas = row.tempData;
	printParam.value.Providers = row.providers;
	activeItem.value = row.name;
};

onMounted(() => {
	activeItem.value = tableData[0].name;
});
</script>

<style scoped lang="scss">
:deep(.el-tabs--border-card) {
	background: var(--next-bg-main-color) !important;
}
.prescript {
	height: 300px;
	.prescript-list {
		cursor: pointer;
		margin: 0 0px;
		padding: 10px 20px;
		border-bottom: 1px solid #eeeeee;
		font-size: 14px;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.65);
	}
	.active-prescript {
		color: var(--el-color-primary);
		background-color: var(--el-color-primary-light-9);
	}
}
</style>
