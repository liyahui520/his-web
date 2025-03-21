<template>
	<div class="refundAccount">
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
				<el-form-item label="本金金额">
					<el-input
						v-model="dynamicValidateForm.principalPrice"
						:formatter="
							(value) => {
								return verifyNumberCommaNo(value?.toString() || '0.00');
							}
						"
						@change="valueChang"
					>
						<template #prepend> ￥ </template>
					</el-input>
				</el-form-item>
				<el-form-item label="赠送金额">
					<el-input
						v-model="dynamicValidateForm.givePrice"
						:formatter="
							(value) => {
								return verifyNumberCommaNo(value?.toString() || '0.00');
							}
						"
						@change="valueChang"
					>
						<template #prepend> ￥ </template>
					</el-input>
				</el-form-item>
				<el-form-item label="退款总金额">
					<el-input
						v-model="dynamicValidateForm.occurPrice"
						disabled
						:formatter="
							(value) => {
								return verifyNumberCommaNo(value?.toString() || '0.00');
							}
						"
					>
						<template #prepend> ￥ </template>
					</el-input>
				</el-form-item>
				<el-form-item label="退款方式">
					<el-select class="m-2" placeholder="选择退款方式" v-model="payMethod">
						<el-option v-for="item in getPriceModth" :key="item.id" :label="item.value" :value="item" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel" size="default">关 闭</el-button>
					<el-button type="primary" @click="submit" size="default">充 值</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="refundAccount">
import { defineAsyncComponent, nextTick, onMounted, reactive, ref } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { PcuAccountApi, SysDictDataApi } from '/@/api-services';
import { verifyNumberIntegerAndFloat, verifyNumberCommaNo } from '/@/utils/toolsValidate';
import { useUserInfo } from '/@/stores/userInfo';

const stores = useUserInfo();
const dictList = stores.dictList;
const PayMethod = defineAsyncComponent(() => import('/@/components/pcuAccount/payMethod.vue'));
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const getPriceModth = ref([]);
const isShowDialog = ref(false);
const tableRef = ref();
const sing = ref();
const formRef = ref();
const payMethodRef = ref();
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});

const payMethod = ref();

const pcuAccountPayMethod = ref({
	typeId: 0,
	typeName: '微信',
	price: 0.0,
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
//
// watch(dynamicValidateForm, (newVal, oldValue) => {
//     let v = 0.00;
//     newVal.pcuAccountPayMethods.forEach(s => {
//         v += Number.parseFloat(s?.price == '' ? 0.00 : verifyNumberIntegerAndFloat(s.price));
//     });
//     dynamicValidateForm.principalPrice = v.toFixed(2);
//     dynamicValidateForm.occurPrice = (v + (Number.parseFloat(verifyNumberIntegerAndFloat(dynamicValidateForm.givePrice)))).toFixed(2);
// })

// 关闭弹窗
const closeDialog = () => {
	emit('reloadTable');
	resetForm(formRef);
	isShowDialog.value = false;
};
// 打开弹窗
const openDialog = async (customerId) => {
	resetForm(formRef);
	dynamicValidateForm.customerId = customerId;
	let r = await getAPI(PcuAccountApi).apiPcuAccountCustomerIdGetPcuAccountInfoGet(dynamicValidateForm.customerId);
	// getPriceModth.value.forEach((s) => {
	//     dynamicValidateForm.pcuAccountPayMethods.push({
	//         typeId: s.id,
	//         typeName: s.value,
	//         price: '0.00',
	//         customerId: dynamicValidateForm.customerId
	//     })
	// });
	dynamicValidateForm.givePrice = r.data?.result?.givePrice.toFixed(2);
	dynamicValidateForm.amountPrice = r.data?.result?.amountPrice.toFixed(2);
	dynamicValidateForm.principalPrice = r.data?.result?.principalPrice.toFixed(2);
	dynamicValidateForm.occurPrice = r.data?.result?.amountPrice.toFixed(2);
	isShowDialog.value = true;
};
// 取消
const cancel = () => {
	resetForm(formRef); //.value.resetFields();
	isShowDialog.value = false;
};

//确认
const submit = async () => {
	dynamicValidateForm.pcuAccountPayMethods = [];
	pcuAccountPayMethod.value.typeId = payMethod.value.id;
	pcuAccountPayMethod.value.typeName = payMethod.value.value;
	pcuAccountPayMethod.value.price = dynamicValidateForm.occurPrice;
	pcuAccountPayMethod.value.customerId = dynamicValidateForm.customerId;
	dynamicValidateForm.pcuAccountPayMethods.push(pcuAccountPayMethod.value);
	if (dynamicValidateForm.principalPrice == 0.0 || dynamicValidateForm.principalPrice == '') {
		ElMessage.error('退款金额不能为0');
	} else {
		await getAPI(PcuAccountApi).apiPcuAccountRefundAccountPost(dynamicValidateForm);
		await closeDialog();
	}
};


const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.value?.resetFields(); //.resetFields();//.resetFields()
};
//值改变事件
const valueChang = async () => {
	dynamicValidateForm.occurPrice = (
		Number.parseFloat(verifyNumberIntegerAndFloat(dynamicValidateForm.principalPrice)) + Number.parseFloat(verifyNumberIntegerAndFloat(dynamicValidateForm.givePrice))
	).toFixed(2);
};

const Init = async () => {
	dynamicValidateForm.pcuAccountPayMethods = [];
	var r =dictList['funding_method'];
	getPriceModth.value = r;
	payMethod.value = r[0];
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
