<template>
	<div class="treatmentinformation-container">
		<el-card :body-style="{ paddingBottom: '0', border: '0px' }" shadow="never" style="--el-card-padding: 0px">
			<el-steps :active="active" finish-status="error" simple style="margin-top: 0; background: var(--el-card-bg-color); border-bottom: var(--el-color-info-light-7) 1px solid">
				<el-step
					title="主诉"
					:class="active == 0 ? 'selectStep' : ''"
					style="cursor: pointer"
					:status="treatData?.cemRecordSteps?.find((s) => s.stepEnum == 0)?.isComplete ? 'success' : active == 0 ? 'finish' : 'wait'"
					@click.native="stepClick(0)"
				/>
				<el-step
					title="体格检查"
					:class="active == 1 ? 'selectStep' : ''"
					style="cursor: pointer"
					:status="treatData?.cemRecordSteps?.find((s) => s.stepEnum == 1)?.isComplete ? 'success' : active == 1 ? 'finish' : 'wait'"
					@click.native="stepClick(1)"
				/>
				<el-step
					title="检查化验"
					:class="active == 2 ? 'selectStep' : ''"
					style="cursor: pointer"
					:status="treatData?.cemRecordSteps?.find((s) => s.stepEnum == 2)?.isComplete ? 'success' : active == 2 ? 'finish' : 'wait'"
					@click.native="stepClick(2)"
				/>
				<el-step
					title="主观诊断"
					:class="active == 3 ? 'selectStep' : ''"
					style="cursor: pointer"
					:status="treatData?.cemRecordSteps?.find((s) => s.stepEnum == 3)?.isComplete ? 'success' : active == 3 ? 'finish' : 'wait'"
					@click.native="stepClick(3)"
				/>
				<el-step
					title="处方"
					:class="active == 4 ? 'selectStep' : ''"
					style="cursor: pointer"
					:status="treatData?.cemRecordSteps?.find((s) => s.stepEnum == 4)?.isComplete ? 'success' : active == 4 ? 'finish' : 'wait'"
					@click.native="stepClick(4)"
				/>
				<el-step
					title="医嘱"
					:class="active == 3 ? 'selectStep' : ''"
					style="cursor: pointer"
					:status="treatData?.cemRecordSteps?.find((s) => s.stepEnum == 5)?.isComplete ? 'success' : active == 5 ? 'finish' : 'wait'"
					@click.native="stepClick(5)"
				/>
				<el-step title="回访" :status="active == 6 ? 'finish' : 'wait'" style="cursor: pointer" @click.native="stepClick(6)" />
			</el-steps>
			<el-scrollbar>
				<div :style="iswindow ? 'height: calc(100vh - 270px);' : 'height: calc(100vh - 335px);'" v-loading="treatload">
					<Complained ref="ComplainedRef" style="padding: 10px" v-show="active == 0" :treatData="treatData" :data="data" :disabled="isWrite" />
					<Physical ref="PhysicalRef" style="padding: 10px" v-show="active == 1" :treatData="treatData" @loadMain="Init" :disabled="isWrite" :data="data" />
					<InspectionTest ref="InspectionTestRef" style="padding: 10px" v-show="active == 2" :treatData="treatData" :disabled="isWrite" :data="data" />
					<Diagnosis ref="diagnosisRef" style="padding: 10px" v-show="active == 3" :treatData="treatData" :disabled="isWrite" :data="data" />
					<Prescription ref="prescriptionRef" style="padding: 10px" v-show="active == 4" :treatData="treatData" :disabled="isWrite" :data="data" />
					<Advice ref="adviceRef" style="padding: 10px" v-show="active == 5" :treatData="treatData" :disabled="isWrite" :data="data" />
				</div>
			</el-scrollbar>
			<el-row class="row-bg" justify="end" align="middle" v-if="isWrite" style="height: 80px; padding: 0px 10px 0px 10px; border-top: var(--el-color-info-light-7) 1px solid">
				<el-col :span="24" style="text-align: center">
					<el-text tag="b" type="danger" size="large">当前病历只能进行查看，无法编辑</el-text>
				</el-col>
			</el-row>
			<el-row class="row-bg" justify="end" align="middle" v-else style="height: 80px; padding: 0px 10px 0px 10px; border-top: var(--el-text-color-secondary) 1px solid">
				<el-col :span="12" style="text-align: start">
					<el-button :icon="Back" type="primary" v-if="active != 0">上一步</el-button>
				</el-col>
				<el-col :span="12" style="text-align: end">
					<el-button :icon="Right" type="primary" @click="nextView">保存并下一步</el-button>
					<el-divider direction="vertical" />
					<el-button :icon="SwitchButton" type="warning">结束诊疗</el-button>
				</el-col>
			</el-row>
		</el-card>
		<!--        <div style="margin-top: 4px;height: calc(100vh - 325px);">-->

		<!--            <el-scrollbar>-->
		<!--                <Complained style="height:100%;min-height:calc(100vh - 525px);"/>-->
		<!--            </el-scrollbar>-->
		<!--        </div>-->
	</div>
</template>

<script lang="ts" setup name="treatmentinformation">
import { onMounted, ref, defineAsyncComponent, watch } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { CEMRecordApi } from '/@/api-services';
import { SwitchButton, Right, Back } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { useUserInfo } from '/@/stores/userInfo';

const stores1 = useUserInfo();
const { userInfos } = storeToRefs(stores1);
// 定义变量内容
const stores = useTagsViewRoutes();
const { isTagsViewCurrenFull, iswindow } = storeToRefs(stores);
const isWrite = ref(false);
const treatload = ref(false);
const treatData = ref<any>({
	cemRecordPhysical: {
		recordId: 0,
		regId: 0,
		petWeight: 0.0,
		temperature: 0,
		respiratoryRate: 0,
		bcs: '',
		crt: 0,
	},
});
const active = ref(0);
const sourceData = ref({});
const PhysicalRef = ref();
//主诉
const ComplainedRef = ref();
// 引入组件
//主诉
const Complained = defineAsyncComponent(() => import('./treats/complained.vue'));
//体格检查
const Physical = defineAsyncComponent(() => import('./treats/physical.vue'));
//检查化验
const InspectionTest = defineAsyncComponent(() => import('./treats/inspectionTest.vue'));
//疾病诊断
const Diagnosis = defineAsyncComponent(() => import('./treats/diagnosis.vue'));
//处方
const Prescription = defineAsyncComponent(() => import('./treats/prescription.vue'));
//医嘱
const Advice = defineAsyncComponent(() => import('./treats/advice.vue'));
const prescriptionRef = ref();
const InspectionTestRef = ref();
const diagnosisRef = ref();
const adviceRef = ref();
//父级传递来的参数
var props = defineProps({
	data: {
		type: Object,
		default: () => {},
	},
});

watch(
	() => props.data,
	(newValue, oldValue) => {
		if (newValue?.recordId != oldValue?.recordId) active.value = 0;
		Init(newValue);
	}
);
//加载数据
const Init = async (d: any) => {
	if (!d) return;
	if (!d?.recordId) return;
	// PhysicalRef.value.clearSelection();
	await InspectionTestRef.value.onSearch({ id: props.data.recordId, regId: props.data.id });
	await prescriptionRef.value.onSearch({ id: props.data.recordId, regId: props.data.id });
	sourceData.value = JSON.stringify(d?.cemRecordZhuSu);
	treatload.value = true;
	await getAPI(CEMRecordApi)
		.apiCEMRecordIdGetRecordByIdGet(d.recordId)
		.then((r) => {
			treatData.value = r.data?.result;
			if (!treatData.value?.cemRecordPhysical)
				treatData.value.cemRecordPhysical = Object.assign({}, treatData.value?.cemRecordPhysical, {
					recordId: 0,
					regId: 0,
					petWeight: 0.0,
					temperature: 0,
					respiratoryRate: 0,
					bcs: '',
					crt: '',
					id: 0,
				});
		})
		.finally(() => {
			treatload.value = false;
		});
	if (treatData.value.status === 2) isWrite.value = true;
	else isWrite.value = treatData.value.visitDoctorId != userInfos.value.id;
	await PhysicalRef.value.getTables(treatData.value.cemRecordPhysical?.cemRecordPhysicalDetails ?? []);
};

//步骤上一步
const stepClick = async (e) => {
	if (e != '' || e != null) {
		if (e == 2) {
			// await InspectionTestRef.value.onSearch({id:props.data.recordId,regId:props.data.id});
		}
		active.value = e;
	}
};
//步骤下一步
const nextView = async () => {
	switch (active.value) {
		case 0:
			await saveZhuSu();
			break;
		case 3:
			diagnosisRef.value.save();
			break;
	}

	if (active.value != 6) active.value += 1;
	PhysicalRef.value.save();
};

//保存主诉
const saveZhuSu = async () => {
	let p = Object.assign({}, treatData.value.cemRecordZhuSu, {
		recordId: treatData.value.id,
		regId: treatData.value.regId,
	});
	if (sourceData.value != p) {
		await getAPI(CEMRecordApi)
			.apiCEMRecordZhusuAddEditPost(p)
			.then(async (r) => {
				await Init(Object.assign(treatData, { recordId: treatData.value.id }));
			});
	}
};
defineExpose({ active });
onMounted(async () => {});
</script>

<style scoped lang="scss">
:deep(.selectStep) {
	.el-step__title.is-success {
		color: var(--el-color-primary) !important;
	}

	.el-step__head.is-success {
		color: var(--el-color-primary) !important;
		border: var(--el-color-primary) !important;
	}
}
</style>
