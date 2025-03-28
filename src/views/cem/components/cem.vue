<template>
	<div class="cem-container">
		<el-container v-loading="treatload">
			<el-header height="110px" class="header" style="padding: 0px; margin: 0px; min-width: 1100px">
				<Septindex :data="$props.data" ref="septIndexRef" @save="save" @endRecord="endRecord" :isSave="isSave" :disabled="isWrite" />
			</el-header>
			<el-main ref="maincontainerRef" style="padding: 0px; margin: 0px; margin-top: 10px; min-width: 1100px; overflow-y: auto">
				<el-watermark :font="font" :content="watermark">
					<!-- <el-overlay :visible.sync="isWrite" :class="{ 'overlay-disabled': isWrite }"> -->
					<Complained :treatData="treatData" id="complained" :data="data" :disabled="isWrite" :isNew="true" @saveStatus="saveStatus" />
					<Physical ref="physicalRef" :treatData="treatData" id="physical" :data="data" :disabled="isWrite" :isNew="true"   @saveStatus="saveStatus"/>
					<InspectionTest ref="InspectionTestRef" :treatData="treatData" id="inspectionTest" :data="data" :disabled="isWrite" :isNew="true"  @saveStatus="saveStatus"/>
					<Diagnosis ref="diagnosisRef" :treatData="treatData" id="diagnosis" :data="data" :disabled="isWrite" :isNew="true"   @saveStatus="saveStatus"/>
					<Prescription ref="prescriptionRef" :treatData="treatData" id="prescription" :data="data" :disabled="isWrite" :isNew="true"  @saveStatus="saveStatus"/>
				</el-watermark>
				<Advice :treatData="treatData" id="advice" :data="data" :disabled="isWrite" :isNew="true" @saveStatus="saveStatus"/>
			</el-main>
			<el-footer style="padding: 0px; margin: 0px; margin-top: 10px; min-width: 1100px" v-show="!isWrite">
				<el-card class="full-table" shadow="never" style="margin-top: 0px; height: 100%; border: 0px" :body-style="{ padding: '0px', height: '100%' }">
					<el-row class="row-bg" justify="end" align="middle" style="height: 60px; padding: 0px 10px 0px 10px">
						<el-col :span="12" style="text-align: start"> </el-col>
						<el-col :span="12" style="text-align: end">
							<el-button @click="save">保 存</el-button>
							<el-divider direction="vertical" />
							<el-button type="warning" @click="endRecord">结束诊疗</el-button>
						</el-col>
					</el-row>
				</el-card>
			</el-footer>
		</el-container>
	</div>
</template>
<script lang="ts" setup name="cem">
import { onMounted, onUnmounted, reactive, ref, defineAsyncComponent, nextTick, watch } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { auth } from '/@/utils/authFunction';
import { CEMRecordApi, CEMRecordApiFp, SysEnumApi } from '/@/api-services';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';
import { CEMRecord } from '/@/api-services/models/cemrecord-manage/cemrecord';
import { ElMessage, ElMessageBox } from 'element-plus';

import { cemStart, signalR } from '../signalRCem';
import other from '/@/utils/other';
const stores1 = useUserInfo();
const { userInfos } = storeToRefs(stores1);
const isvisitDoctor = ref(true);
const isSave = ref(true);
const isWrite = ref(false);
const treatload = ref(false);
const sourceData = ref({});
const prescriptionRef = ref();
const InspectionTestRef = ref();
const maincontainerRef = ref();
const physicalRef = ref();
const diagnosisRef = ref();
const watermark = ref(['当前病例已结束']);
const font = reactive({
	color: 'rgba(255, 20, 50, .15)',
});
const treatData = ref({
	cemRecordPhysical: {
		recordId: 0,
		regId: 0,
		petWeight: 0.0,
		temperature: 0,
		respiratoryRate: 0,
		bcs: '',
		crt: 0,
	},
	status: 0,
	visitDoctorId: 0,
	cemRecordAdvice: { adviceContent: null },
	id: 0,
});
//父级传递来的参数
var props = defineProps({
	data: {
		type: Object,
		default: () => {},
	},
});

const Septindex = defineAsyncComponent(() => import('/@/views/treatment/component/septindex.vue'));
const Complained = defineAsyncComponent(() => import('/@/views/treatment/component/treats/complained.vue'));
const Physical = defineAsyncComponent(() => import('/@/views/treatment/component/treats/physical.vue'));
const InspectionTest = defineAsyncComponent(() => import('/@/views/treatment/component/treats/inspectionTest.vue'));
const Diagnosis = defineAsyncComponent(() => import('/@/views/treatment/component/treats/diagnosis.vue'));
const Prescription = defineAsyncComponent(() => import('/@/views/treatment/component/treats/prescription.vue'));
const Advice = defineAsyncComponent(() => import('/@/views/treatment/component/treats/advice.vue'));

watch(
	() => props.data,
	(newValue, oldValue) => {
		watermark.value =
			newValue.status == 2 ? ['当前病例已结束'] : newValue.cemRecord.visitDoctorId === userInfos.value.id ? [''] : ['非当前病例责任医生', '责任医生:' + newValue.cemRecord.visitDoctorName];
		if (newValue.cemRecord.status === 2) isWrite.value = true;
		else isWrite.value = newValue.cemRecord.visitDoctorId != userInfos.value.id;
		Init(newValue);
	}
);

const saveStatus = async (r) => {
	isSave.value = r;
};

const save = async () => {
	await nextTick(async () => {
		treatload.value = true;
		physicalRef.value.save();
		diagnosisRef.value.save();
		await getAPI(CEMRecordApi)
			.apiCEMRecordRegIdRecordIdGetRecordNewSavePost(props.data.cemRecord.regId, props.data.cemRecord.id, (treatData as CEMRecord).value)
			.then((r) => {
				Init(props.data);
			})
			.finally(() => {
				treatload.value = false;
			});
	});
};

//结束诊疗
const endRecord = async () => {
	ElMessageBox.confirm('确定结束当前病例?', '系统提示', {
		confirmButtonText: '结束病例',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			getAPI(CEMRecordApi)
				.apiCEMRecordIdEndPut(props.data.recordId)
				.then((r) => {
					Init(props.data);
				});
		})
		.catch(() => {
			// ElMessage({
			//   type: 'info',
			//   message: 'Delete canceled',
			// })
		});
};

const handleClick = (e: MouseEvent) => {
	e.preventDefault();
};
//加载数据
const Init = async (d: any) => {
	if (!d) return;
	if (!d?.recordId) return; 
	// PhysicalRef.value.clearSelection();
	// sourceData.value = JSON.stringify(d?.cemRecordZhuSu);
	cemStart(d?.cemRecord?.regId, d?.cemRecord?.id);
	await InspectionTestRef.value.onSearch({ id: d?.cemRecord?.id, regId: d?.cemRecord?.regId });
	await prescriptionRef.value.onSearch({ id: d?.cemRecord?.id, regId: d?.cemRecord?.regId });
	treatload.value = true;
	await getAPI(CEMRecordApi)
		.apiCEMRecordIdGetRecordByIdGet(d.recordId)
		.then((r) => {
			treatData.value = r.data?.result;
			if (!treatData.value.id) return;
			// sourceData.value =Object.freeze(r.data?.result);
			let temp = other.deepClone(r.data?.result);
			if (!treatData.value?.cemRecordAdvice) {
				treatData.value = Object.assign({}, treatData.value, {
					cemRecordAdvice: {
						adviceContent: null,
					},
				});
			}
			// if (!treatData.value?.cemRecordPhysical)
			// treatData.value.cemRecordPhysical = Object.assign({}, treatData.value?.cemRecordPhysical, {
			//   recordId: 0,
			//   regId: 0,
			//   petWeight: 0.0,
			//   temperature: 0,
			//   respiratoryRate: 0,
			//   bcs: '',
			//   crt: '',
			//   id: 0
			// });
			sourceData.value = temp;
		})
		.finally(() => {
			treatload.value = false;
		});
};

const handleBeforeUnload = (event) => {
	signalR.stop();
};

const TagVisitDoctor = async (b) => {
	isvisitDoctor.value = b;
};
defineExpose({ TagVisitDoctor });

onUnmounted(() => {
	window.removeEventListener('beforeunload', handleBeforeUnload);
	signalR.stop();
});

onMounted(async () => {
	window.addEventListener('beforeunload', handleBeforeUnload);
});
</script>

<style scoped lang="scss">
.cem-container {
	width: 100%;
	left: 0;
	display: flex;
	.anchor {
		position: absolute;
		right: 0;
		top: 45%;
		z-index: 9999999;
	}
	.overlay-disabled {
		pointer-events: none;
	}
}
</style>
