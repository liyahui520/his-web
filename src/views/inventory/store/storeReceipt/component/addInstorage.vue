<template>
	<div class="instorage-add-container">
		<el-dialog v-model="isShowDialog" ref="instorageForm" draggable :close-on-click-modal="false" width="90%"  :destroy-on-close="true" @closed="dialogClosed">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span> {{ props.title }} </span>
				</div>
			</template>
			<el-card style="position: relative">
				<el-row justify="center">
					<el-col :span="4">
						单据号：<el-text size="large" tag="b">{{ queryParams.orderNo }}</el-text>
					</el-col>
					<el-col :span="16" style="text-align: center"><h2>采购单</h2></el-col>
					<el-col :span="4" style="text-align: right"></el-col>
				</el-row>
				<el-divider border-style="dashed" />
				<el-form :model="queryParams" ref="queryFormRef" :rules="rules" :disabled="isDisabledValue" :scroll-to-error="true" :inline="true">
					<el-form-item label="入库类型" prop="type">
						<el-select clearable v-model="queryParams.type" placeholder="请选择入库类型">
							<el-option v-for="item in orderTypes" :key="item.value" :value="item.value" :label="item.describe">
								{{ item.describe }}
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="供应商" prop="providerId">
						<el-select clearable v-model="queryParams.providerId" placeholder="请选择供应商">
							<el-option v-for="item in providers" :key="item.id" :value="item.id" :label="item.name">
								{{ item.name }}
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item v-if="isDisabledValue" label="业务日期">
						<el-text>{{ queryParams.createTime }}</el-text>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="ele-Plus" size="small" v-if="!isDisabledValue" @click="openAddProduct" round> 选择产品 </el-button>
					</el-form-item>
					<el-table ref="tableRef" :data="queryParams.inStorageDetails" style="height: calc(100vh - 400px)" tooltip-effect="light">
						<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
						<el-table-column prop="typeName" label="项目类别" width="100" align="left" show-overflow-tooltip="" />
						<el-table-column prop="categoryName" label="目录" width="100" align="left" show-overflow-tooltip="" />
						<el-table-column prop="productCode" label="产品编号" width="150" align="left" show-overflow-tooltip="" />
						<el-table-column prop="productName" label="产品名称" width="250" align="left" show-overflow-tooltip="" />
						<el-table-column prop="specific" label="规格" width="180" align="left" show-overflow-tooltip="" />
						<el-table-column prop="unitName" label="单位" width="80" align="left" show-overflow-tooltip="" />
						<el-table-column prop="procureCount" label="采购数">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`procureCount${scope.$index}`"
									:prop="'inStorageDetails.' + scope.$index + '.procureCount'"
									:rules="{
										required: true,
										message: '请输入采购数！',
										trigger: 'blur',
									}"
									:inline-message="true"
									style="margin-bottom: 0px !important"
									v-if="!isDisabledValue"
								>
									<el-input-number
										v-model="scope.row.procureCount"
										:min="1"
										:precision="0"
										:max="999999999"
										@change="changeProcureCount(scope.row)"
										controls-position="right"
										style="width: 100%"
									></el-input-number>
								</el-form-item>
								<div v-else>{{ scope.row.procureCount || '0' }}</div>
							</template>
						</el-table-column>
						<el-table-column prop="giveCount" label="赠品数">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`giveCount${scope.$index}`"
									:prop="'inStorageDetails.' + scope.$index + '.giveCount'"
									:rules="{
										required: true,
										message: '请输入赠品数！',
										trigger: 'blur',
									}"
									:inline-message="true"
									style="margin-bottom: 0px !important"
									v-if="!isDisabledValue"
								>
									<el-input-number
										v-model="scope.row.giveCount"
										:min="0"
										:precision="0"
										:max="999999999"
										@change="changeGiveCount(scope.row)"
										controls-position="right"
										style="width: 100%"
									></el-input-number>
								</el-form-item>
								<div v-else>{{ scope.row.giveCount || '0' }}</div>
							</template>
						</el-table-column>
						<el-table-column prop="amount" label="总金额">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`amount${scope.$index}`"
									:prop="'inStorageDetails.' + scope.$index + '.amount'"
									:rules="{
										required: true,
										message: '请输入总金额！',
										trigger: 'blur',
									}"
									:inline-message="true"
									style="margin-bottom: 0px !important"
									v-if="!isDisabledValue"
								>
									<el-input-number
										v-model="scope.row.amount"
										:min="0.00"
										:precision="2"
										:max="999999999.99"
										@change="changeAmount(scope.row)"
										controls-position="right"
										style="width: 100%"
									></el-input-number>
								</el-form-item>

								<div v-else>{{ twoFloorNum(scope.row.amount || '0.00') }}</div>
							</template>
						</el-table-column>
						<el-table-column prop="inPrice" label="采购单价">
							<template #default="scope">
								<el-form-item
									label-width="0"
									:key="`inPrice${scope.$index}`"
									:prop="'inStorageDetails.' + scope.$index + '.inPrice'"
									:rules="{
										required: true,
										message: '请输入采购单价！',
										trigger: 'blur',
									}"
									:inline-message="true"
									style="margin-bottom: 0px !important"
									v-if="!isDisabledValue"
								>
									<el-input-number
										v-model="scope.row.inPrice"
										:min="0.00"
										:precision="2"
										:max="999999999.99"
										@change="changeInPrice(scope.row)"
										controls-position="right"
										style="width: 100%"
									></el-input-number>
								</el-form-item>
								<div v-else>{{ twoFloorNum(scope.row.inPrice || '0.00') }}</div>
							</template>
						</el-table-column>
						<el-table-column prop="singPrice" width="150" label="入库单价">
							<template #default="scope">
								{{ twoFloorNum(scope.row.singPrice || '0.00') }}
							</template>
						</el-table-column>
						<el-table-column label="操作" width="80" v-if="!isDisabledValue">
							<template #default="scope">
								<el-button icon="ele-Delete" size="small" text="" type="danger" @click="remove(scope.row, scope.$index)"> 删除 </el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-row style="margin-top: 15px">
						<el-col :span="24">
							<el-form-item label="备注" style="width: 100%">
								<el-input :disabled="isDisabledValue" v-model="queryParams.remark" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" placeholder="请输入备注" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-card>
			<template #footer>
				<span style="float: left">
					<span style="float: left; margin-left: 50px">
						<p style="font-size: 18px; font-weight: bold">总金额：{{ verifyNumberComma(inStoreTotalAmount || '0.00') }} 元</p>
					</span>
					<span style="float: left; margin-left: 50px">
						<p style="font-size: 18px; font-weight: bold">总量：{{ queryParams.inStorageDetails.length }} 项</p>
					</span>
				</span>
				<span class="dialog-footer">
					<el-button size="default" @click="cancel">关 闭</el-button>
					<el-button type="primary" @click="submit" v-if="!isDisabledValue && !isHiddenValue" size="default">确 定</el-button>
					<el-button type="warning" @click="exportOrder" v-auth="'inventory:instorage:in-storage-examine'" v-if="isDisabledValue && !isHiddenValue" size="default">审 核</el-button>
					<el-button type="danger" @click="rejectOrder" v-if="isDisabledValue && !isHiddenValue" size="default">驳 回</el-button>
				</span>
			</template>
		</el-dialog>
		<ProductDialog ref="ProductDialogRef" @submit="importProduct" />
	</div>
</template>
<script lang="ts" setup name="instorage">
import { defineAsyncComponent, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { SysEnumApi, InStorageApi } from '/@/api-services/api';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import type { FormRules } from 'element-plus';
import { useUserInfo } from '/@/stores/userInfo';
import other from '/@/utils/other';
import Decimal from 'decimal.js';
import commonFunction from '/@/utils/commonFunction';
const { twoFloorNum } = commonFunction();

const stores = useUserInfo();
//产品选择
const ProductDialog = defineAsyncComponent(() => import('/@/views/inventory/component/dialogproducts.vue'));
const ProductDialogRef = ref();
const props = defineProps({
	title: String,
});
const tableRef = ref();
const isEditValue = ref<any>(false);
const isDisabledValue = ref<any>(false);
const isHiddenValue = ref<any>(false);
const queryFormRef = ref();
const queryParams = ref<any>({});
const emits = defineEmits(['submit']);
const isShowDialog = ref(false);
const orderTypes = ref<any>([]);
const providersObject = ref<any>([]);
const providers = ref<any>([]);
const openAddProduct = () => {
	ProductDialogRef.value?.openDialog();
};
/**
 * 采购数变更
 * @param row
 */
const changeProcureCount = (row: any) => {
	if (!row.procureCount) {
		row.procureCount = 1;
	}
	const totalAmount = new Decimal(row.procureCount).mul(new Decimal(row.inPrice));
	const signleAmount = totalAmount.div(new Decimal(row.giveCount).add(new Decimal(row.procureCount)));
	row.amount = new Decimal(totalAmount.toFixed(2, Decimal.ROUND_DOWN)).toNumber();
	row.singPrice = new Decimal(signleAmount.toFixed(2, Decimal.ROUND_DOWN)).toNumber();
};
/**
 * 赠送数变更
 */
const changeGiveCount = (row: any) => {
	if (!row.giveCount) {
		row.giveCount = 0;
	}
	const signleAmount = new Decimal(row.amount).div(new Decimal(row.giveCount).add(new Decimal(row.procureCount)));
	row.singPrice = new Decimal(signleAmount.toFixed(2, Decimal.ROUND_DOWN)).toNumber();
};
/**
 * 总金额变更
 */
const changeAmount = (row: any) => {
	if (!row.amount) {
		row.amount = 0.01;
	}
	const signleAmount = new Decimal(row.amount).div(new Decimal(row.giveCount).add(new Decimal(row.procureCount)));
	const inSignleAmount = new Decimal(row.amount).div(new Decimal(row.procureCount));
	row.inPrice = new Decimal(inSignleAmount.toFixed(2, Decimal.ROUND_DOWN)).toNumber();
	row.singPrice = new Decimal(signleAmount.toFixed(2, Decimal.ROUND_DOWN)).toNumber();
};
/**
 * 采购单价变更
 * @param row
 */
const changeInPrice = (row: any) => {
	if (!row.inPrice) {
		row.inPrice = 0.01;
	}
	const totalAmount = new Decimal(row.procureCount).mul(new Decimal(row.inPrice));
	const signleAmount = totalAmount.div(new Decimal(row.giveCount).add(new Decimal(row.procureCount)));
	row.amount = new Decimal(totalAmount.toFixed(2, Decimal.ROUND_DOWN)).toNumber();
	row.singPrice = new Decimal(signleAmount.toFixed(2, Decimal.ROUND_DOWN)).toNumber();
};
const rules = ref<FormRules>({
	type: [{ required: true, message: '请选择入库类型！', trigger: 'change' }],
	providerId: [{ required: true, message: '请选择供应商！', trigger: 'change' }],
});

//获取所有入库类型
const getOrderTypes = async () => {
	var r = await getAPI(SysEnumApi).apiSysEnumEnumDataListGet('OrderTypeEnum');
	orderTypes.value = r.data?.result ?? [];
};
//获取所有供应商
const getProductProviders = async () => {
	const r = stores.productProviders ?? [];
	providers.value = r;
	r.forEach((v: any) => {
		providersObject.value[v.id] = v.name;
	});
};

//审核
const exportOrder = async () => {
	await getAPI(InStorageApi)
		.apiInStorageIdInStorageExamineGet(queryParams.value.id)
		.then(() => {
			emits('submit');
			cancel();
			closeDialog();
		});
};

//驳回
const rejectOrder = async () => {
	await getAPI(InStorageApi).apiInStorageIdInStorageRejectGet(queryParams.value.id);
	emits('submit');
	cancel();
	closeDialog();
};

/**
 * 关闭窗体销毁数据
 */
const dialogClosed = () => {
	queryParams.value.inCount = 0;
	queryParams.value.amount = 0.0;
	closeDialog();
};

/**
 * 移除对应表格数据
 * @param row
 * @param index
 */
const remove = (row: any, index: number) => {
	queryParams.value.inStorageDetails.splice(index, 1);
};

/**
 * 选中的产品数据
 * @param data
 */
const importProduct = (data: any) => {
	data.forEach((v: any) => {
		const found = queryParams.value.inStorageDetails.find((obj: any) => obj.productId === v.id && obj.categoryId === v.categoryId);
		if (!found)
			queryParams.value.inStorageDetails.push({
				productId: v.id,
				productCode: v.serialNumber,
				categoryId: v.categoryId,
				categoryName: v.categoryName,
				productType: v.type,
				typeName: v.productTypeName,
				productName: v.name,
				specific: v.specific,
				unitName: v.inUnitName,
				unitId: v.inUnitId,
				procureCount: 1,
				giveCount: 0,
				amount: v.costPrice,
				inPrice: v.costPrice,
				singPrice: v.costPrice,
				remark: '',
			});
	});
};

// 打开弹窗
const openDialog = async (isEdit: boolean, row: any, isDisabled: boolean = false, isHeddin: boolean = false) => {
	queryParams.value = {};
	isEditValue.value = isEdit;
	isDisabledValue.value = isDisabled;
	isHiddenValue.value = isHeddin;
	await getOrderTypes();
	await getProductProviders();
	queryParams.value = other.deepClone(row);
	isShowDialog.value = true;
	if (orderTypes.value && orderTypes.value.length > 0) queryParams.value.type = orderTypes.value[0].value;
};

// 关闭弹窗
const closeDialog = () => {
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};
/**
 * 总金额计算
 */
const inStoreTotalAmount = computed((): string => {
	const totalAmountValue = queryParams.value.inStorageDetails.reduce((pre:any, item:any) => {
		return new Decimal(pre).add(new Decimal(item.amount));
	}, 0);
	const result = totalAmountValue.toFixed(2, Decimal.ROUND_DOWN);
	return result;
});
// 提交
const submit = () => {
	if (queryParams.value.inStorageDetails.length <= 0) {
		ElMessage.warning('至少添加一条产品信息');
		return;
	}
	queryFormRef.value.validate(async (valid: boolean) => {
		if (!valid) return;
		queryParams.value.providerName = providersObject.value[queryParams.value.providerId];
		queryParams.value.inCount = queryParams.value.inStorageDetails.length;
		queryParams.value.amount = new Decimal(inStoreTotalAmount.value).toNumber();

		if (queryParams.value.id != undefined && queryParams.value.id > 0) {
			await getAPI(InStorageApi).apiInStorageIdEditPost(queryParams.value.id, queryParams.value);
		} else {
			await getAPI(InStorageApi).apiInStorageAddPost(queryParams.value);
		}
		emits('submit');
		isShowDialog.value = false;
	});
};

// 导出对象
defineExpose({ openDialog });
</script>

<style scoped lang="scss"></style>
