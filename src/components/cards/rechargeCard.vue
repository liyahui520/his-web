<template>
	<div class="rechargeCard-container">
		<el-dialog v-model="isShowDialog" width="50%" draggable :close-on-click-modal="false" destroy-on-close>
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>

			<el-descriptions title="基本信息" :column="4" :border="true">
				<el-descriptions-item label="会员名称">{{ props.pcustomer.name }}</el-descriptions-item>
				<el-descriptions-item label="卡号">{{ props.cardInfo.cardNumber }}</el-descriptions-item>
				<el-descriptions-item label="有效期">{{ props.cardInfo.endTime }}</el-descriptions-item>
				<el-descriptions-item label="状态">
					<el-tag type="success" v-if="props.cardInfo.status == 0">{{ props.cardInfo.statusText }}</el-tag>
					<el-tag type="danger" v-else-if="props.cardInfo.status == 1">{{ props.cardInfo.statusText }}</el-tag>
					<el-tag type="warning" v-else-if="props.cardInfo.status == 2">{{ props.cardInfo.statusText }}</el-tag>
				</el-descriptions-item>
			</el-descriptions>
			<el-divider border-style="dashed" content-position="center" style="margin: 10px 0px"> </el-divider>
			<el-form ref="ruleFormRef" :model="ruleForm" :inline="true" status-icon>
				<el-row>
					<el-col style="display: flex" :span="12" v-for="(item, index) in ruleForm.rechargeDetails" :key="index">
						<el-form-item :prop="'rechargeType' + item.rechargeType">
							<div style="display: flex; flex-direction: row; justify-content: center">
								<img :src="getPriceModthObject[item.rechargeType!].url" width="30px" height="30px" />
								<span style="margin-left: 10px; width: 50px">{{ getPriceModthObject[item.rechargeType!].name }}</span>
							</div>
						</el-form-item>
						<el-form-item :prop="'totalAmount' + item.rechargeType" style="width: 50%">
							<el-input-number
								style="width: 100%"
								v-model="item.totalAmount"
								:precision="2"
								:step="100"
								:min="0"
								:max="9999999"
								@change="
									(currentValue: any, oldValue: any) => {
										if (!currentValue) item.totalAmount = 0;
									}
								"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item prop="giveAmount" style="display: flex">
							<div width="30px"></div>
							<span style="margin-left: 10px; width: 92px">赠送金额</span>
							<el-input-number
								style="width: 25%"
								v-model="ruleForm.giveAmount"
								:precision="2"
								:min="0"
								:step="100"
								:max="9999999"
								@change="
									(currentValue: any, oldValue: any) => {
										if (!currentValue) ruleForm.giveAmount = 0;
									}
								"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item prop="reamrk" style="display: flex">
							<div width="30px"></div>
							<span style="margin-left: 10px; width: 92px">备注</span>
							<el-input style="width: 80%" type="textarea" v-model="ruleForm.remark" placeholder="请输入备注" clearable="" maxlength="100" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<el-divider border-style="dashed" content-position="center" style="margin: 10px 0px"> </el-divider>
			<el-descriptions style="margin-top: 30px" :column="3" :border="false" size="large">
				<el-descriptions-item width="12%" label="本金总金额"
					><el-text tag="b">{{ computedOriAmout }}</el-text></el-descriptions-item
				>
				<el-descriptions-item width="12%" label="赠送金额"
					><el-text tag="b">{{ ruleForm.giveAmount }}</el-text></el-descriptions-item
				>
				<el-descriptions-item width="12%" label="总充值金额"
					><el-text tag="b">{{ computedTotalAmout }}</el-text></el-descriptions-item
				>
			</el-descriptions>

			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="cancel">取 消</el-button>
					<el-button :disabled="computedTotalAmout <= 0" type="primary" size="default" :loading="submitLoading" @click="submitForm"
						><el-icon>
							<Wallet /> </el-icon
						>充 值</el-button
					>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup name="rechargeCard-container" lang="ts">
import { ref, defineAsyncComponent, reactive, computed } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { MemberCardApi } from '/@/api-services';
import { MemberCardRechargeInput } from '/@/api-services/models/card-manage';
import { ElMessage } from 'element-plus';
import { Wallet } from '@element-plus/icons-vue';
import { getDictDataList } from '/@/utils/dict-utils';

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '会员卡充值',
	},
	pcustomer: {} as any,
	cardInfo: {} as any,
});
const getPriceModth = ref<any>([]);
const getPriceModthObject = ref<any>({});
const isShowDialog = ref(false);
const ruleFormRef = ref();
const submitLoading = ref(false);
const ruleForm = ref<MemberCardRechargeInput>({
	customerId: 0,
	cardId: 0,
	giveAmount: 0,
	remark: '',
	rechargeDetails: [] as any,
});

//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
// 打开弹窗
const openDialog = async () => {
	getPriceModth.value = getDictDataList('code_card_recharge_type');
	isShowDialog.value = true;
	ruleForm.value.customerId = props.pcustomer.id;
	ruleForm.value.cardId = props.cardInfo.id;
	ruleForm.value.remark = '';
	ruleForm.value.rechargeDetails = [];
	getPriceModthObject.value = {};
	getPriceModth.value.forEach((item: any) => {
		ruleForm.value.rechargeDetails?.push({ rechargeType: item.value, totalAmount: 0 });
		getPriceModthObject.value[item.value] = { name: item.label, url: `src/assets/pay-type/${item.value}.png` };
	});
};

const computedOriAmout = computed(() => {
	return ruleForm.value.rechargeDetails?.reduce((pre: any, cur: any) => {
		return pre + cur.totalAmount;
	}, 0);
});
const computedTotalAmout = computed(() => {
	let totalAmountValue =
		ruleForm.value.rechargeDetails?.reduce((pre: any, cur: any) => {
			return pre + cur.totalAmount;
		}, 0) + ruleForm.value.giveAmount;
	return totalAmountValue;
});

// 提交
const submitForm = async () => {
	if (computedTotalAmout.value <= 0) return;
	submitLoading.value = true;
	await getAPI(MemberCardApi)
		.apiMemberCardRanchargeMembercardPost(ruleForm.value)
		.then((res) => {
			ElMessage.success('充值成功');
			closeDialog();
		})
		.catch((err) => {
			ElMessage.error(err.data.message);
			closeDialog();
		})
		.finally(() => {
			submitLoading.value = false;
		});
};

// 关闭弹窗
const closeDialog = () => {
	ruleFormRef.value?.resetFields();
	emit('reloadTable');
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	ruleFormRef.value?.resetFields();
	isShowDialog.value = false;
};

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style scoped lang="scss"></style>
