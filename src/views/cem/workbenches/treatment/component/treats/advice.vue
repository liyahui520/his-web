<template>
	<div class="advice">
		<el-card class="full-table" shadow="never" style="margin-top: 0px; height: 100%; border: 0px" :body-style="{ padding: '0px', height: '100%' }">
			<div slot="header" class="clearfix" style="background-color: var(--el-color-primary-light-8); height: 30px; border-radius: 3px 3px 0 0" v-show="$props.isNew">
				<p style="line-height: 30px; font-size: 14px; font-weight: 500; margin-left: 10px; float: left">医嘱</p>
			</div>
			<el-form label-width="120px" label-suffix="：" style="padding: 10px" :class="{ 'overlay-disabled': $props.disabled }">
				<el-form-item label="医嘱">
					<el-input v-model="props.treatData.cemRecordAdvice.adviceContent" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea" placeholder="请输入医嘱" @focus="focus" @blur="signalSave" />
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="advice">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { RegistersApi } from '/@/api-services';
import { signalR } from '../../../signalRCem';
const emit = defineEmits(['save', 'saveStatus']);
// 引入组件
const form = ref({});
var props = defineProps({
	treatData: {
		type: Object,
		default: () => {
			cemRecordAdvice: {
				adviceContent: '';
			}
		},
	},
	data: {
		type: Object,
		default: () => {
			cemRecordAdvice: {
				adviceContent: '';
			}
		},
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
const focus = async () => {
	emit('saveStatus', false);
};
const signalSave = async () => {
	await signalR
		.send('AddEditAdvice', props.treatData.cemRecordAdvice)
		.then(() => {
			emit('saveStatus', true);
		})
		.catch(function (err: any) {
			console.log(err);
		});
};

onMounted(async () => {});
</script>
<style scoped lang="scss">
.advice {
	.overlay-disabled {
		pointer-events: none;
	}
}
</style>
