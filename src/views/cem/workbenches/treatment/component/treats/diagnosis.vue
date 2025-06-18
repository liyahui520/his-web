<template>
	<div class="diagnosis">
		<el-card class="full-table" shadow="never" style="padding: 0px; height: 100%; border: 0px" :body-style="{ padding: '0px' }">
			<div slot="header" class="clearfix" style="background-color: var(--el-color-primary-light-8); height: 30px; border-radius: 3px 3px 0 0" v-show="$props.isNew">
				<p style="line-height: 30px; font-size: 14px; font-weight: 500; margin-left: 10px; float: left">疾病诊断</p>
			</div>
			<div style="padding: 10px" :class="{ 'overlay-disabled': $props.disabled }">
				<el-form label-width="120px" label-suffix="：">
					<el-form-item label="疾病诊断">
						<el-select
							style="width: 80%"
							v-model="form.cemRecordDiagnosisDetailss"
							multiple
							filterable
							remote
							reserve-keyword
							placeholder="请输入诊断名称"
							:remote-method="Init"
							:loading="loading"
							value-key="diagnosisId"
							@change="signalSave"
						>
							<el-option v-for="item in options" :key="item.diagnosisId" :label="item.name" :value="item">
								<span style="float: left">{{ item.name }}</span>
								<span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.name }}</span>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="病情描述">
						<el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" @focus="focus" @blur="signalSave" />
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="diagnosis">
import { defineAsyncComponent, onMounted, watch, ref } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { CEMRecordApi } from '/@/api-services';
import { signalR } from '../../../signalRCem';

const emit = defineEmits(['save', 'saveStatus']);
const form = ref<any>({});
const loading = ref(false);
const options = ref<any>([]);
var props = defineProps({
	treatData: {
		type: Object,
		default: () => {},
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	isNew: {
		type: Boolean,
		default: false,
	},
});

watch(
	() => props.treatData,
	(newValue, oldValue) => {
		form.value = props.treatData?.cemRecordDiagnoses ?? {};
	}
);
//获取疾病诊断数据
const Init = async (val: any) => {
	if (!val) return;
	loading.value = true;
	let r = await getAPI(CEMRecordApi).apiCEMRecordGetDiagnosisTempListNameGet(val ?? '');
	options.value = r.data?.result ?? [];
	loading.value = false;
};
const focus = async () => {
	emit('saveStatus', false);
};
/**
 * 保存
 */
const save = async () => {
	await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdEditDiagnosisPut(props.treatData.regId, props.treatData.id, form.value);
};

const signalSave = async () => {
	// if (!props.treatData?.cemRecordDiagnoses?.id)
	// 	await signalR
	// 		.send('AddDiagnosis', form.value)
	// 		.then((_) => {
	// 			emit('saveStatus', true);
	// 		})
	// 		.catch(function (err: any) {
	// 			console.log(err);
	// 		});
	// else {
	form.value.id = props.treatData?.cemRecordDiagnoses?.id;
	await signalR
		.send('EditDiagnosis', form.value)
		.then((_) => {
			emit('saveStatus', true);
		})
		.catch(function (err: any) {
			console.log(err);
		});
	// }
};

defineExpose({ save });
onMounted(async () => {
	await signalR.on('EditDiagnosis', (_) => {
		props.treatData.cemRecordDiagnoses = _;
		form.value = _;
	});
	await Init(' ');
});
</script>
<style scoped lang="scss">
.diagnosis {
	.overlay-disabled {
		pointer-events: none;
	}
}
</style>
