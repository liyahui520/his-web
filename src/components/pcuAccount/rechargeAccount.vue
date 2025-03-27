<template>
	<div class="rechargeAccount">
		<el-dialog v-model="isShowDialog" width="50%" draggable :close-on-click-modal="false" destroy-on-close>
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic" :inline="true">
				<PayMethod ref="payMethodRef" :dynamicValidateForm="dynamicValidateForm?.pcuAccountPayMethods" />
				<el-row>
					<el-col :span="24">
						<el-form-item label="赠送金额">
							<el-input
								v-model="dynamicValidateForm.givePrice"
								placeholder="Please input"
								:formatter="
									(value) => {
										return verifyNumberCommaNo(value?.toString() || '0.00');
									}
								"
							>
								<template #prepend> ￥ </template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-text tag="b" style="margin-right: 15px">赠送金额：{{ verifyNumberComma(dynamicValidateForm.givePrice?.toString() || '0.00') }}</el-text>
					<el-text tag="b" style="margin-right: 15px">本金金额：{{ verifyNumberComma(dynamicValidateForm.principalPrice?.toString() || '0.00') }}</el-text>
					<el-text tag="b" style="margin-right: 15px">入账金额：{{ verifyNumberComma(dynamicValidateForm.occurPrice?.toString() || '0.00') }}</el-text>
					<el-button @click="cancel" size="default">关 闭</el-button>
					<el-button type="primary" @click="submit" size="default">充 值</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="rechargeAccount">
import { defineAsyncComponent, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { PcuAccountApi } from '/@/api-services';
import { verifyNumberComma, verifyNumberIntegerAndFloat, verifyNumberCommaNo } from '/@/utils/toolsValidate';
import { getDictDataList } from '/@/utils/dict-utils';

const PayMethod = defineAsyncComponent(() => import('/@/components/pcuAccount/payMethod.vue'));
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const getPriceModth = ref<any>([]);
const isShowDialog = ref<any>(false);
const tableRef = ref();
const sing = ref();
const formRef = ref<any>();
const payMethodRef = ref<any>();
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});

const dynamicValidateForm = reactive<{
	pcuAccountPayMethods: [];
	amountPrice: Number;
	givePrice: Number;
	principalPrice: Number;
	occurPrice: Number;
	customerId: String;
}>({
	pcuAccountPayMethods: [
		// {
		//     typeId: 0,
		//     typeName:'微信',
		//     price: 0.00,
		// },
	],
	amountPrice: 0.0,
	givePrice: 0.0,
	principalPrice: 0.0,
	occurPrice: 0.0,
	customerId: 0,
});

watch(dynamicValidateForm, (newVal, oldValue) => {
	let v = 0.0;
	newVal.pcuAccountPayMethods.forEach((s) => {
		v += Number.parseFloat(s?.price == '' ? 0.0 : verifyNumberIntegerAndFloat(s.price));
	});
	dynamicValidateForm.principalPrice = v.toFixed(2);
	dynamicValidateForm.occurPrice = (v + Number.parseFloat(verifyNumberIntegerAndFloat(dynamicValidateForm.givePrice))).toFixed(2);
});

// 关闭弹窗
const closeDialog = () => {
	emit('reloadTable');
	resetForm(formRef);
	isShowDialog.value = false;
};
// 打开弹窗
const openDialog = async (customerId) => {
	resetForm(formRef);
	await Init();
	dynamicValidateForm.customerId = customerId;
	isShowDialog.value = true;
};
// 取消
const cancel = () => {
	resetForm(formRef); //.value.resetFields();
	isShowDialog.value = false;
};

//确认
const submit = async () => {
	if (dynamicValidateForm.principalPrice == 0.0 || dynamicValidateForm.principalPrice == '') {
		ElMessage.error('本金充值不能为0');
	} else {
		await getAPI(PcuAccountApi).apiPcuAccountRechargeAccountPost(dynamicValidateForm);
		await closeDialog();
	}
};


const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.value?.resetFields(); //.resetFields();//.resetFields()
};

const Init = async () => {
	dynamicValidateForm.pcuAccountPayMethods = [];
	var r = getDictDataList('funding_method');
	getPriceModth.value = r;
	getPriceModth.value.forEach((s) => {
		dynamicValidateForm.pcuAccountPayMethods.push({
			typeId: s.id,
			typeName: s.label,
			price: '0.00',
			customerId: dynamicValidateForm.customerId,
		});
	});
	dynamicValidateForm.givePrice = '0.00';
	dynamicValidateForm.amountPrice = '0.00';
	dynamicValidateForm.principalPrice = '0.00';
	dynamicValidateForm.occurPrice = '0.00';
};

// 页面加载时
onMounted(async () => {
	await Init();
});
//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style scoped lang="scss">
.pcuAccountDetail {
	.table-container {
		height: 500px;
	}
}
</style>
