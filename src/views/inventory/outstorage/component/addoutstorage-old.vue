<template>
	<div class="addoutstorage-container">
		<el-dialog v-model="isShowDialog" ref="instorageForm" draggable :close-on-click-modal="false" :fullscreen="true" :destroy-on-close="true" @closed="dialogClosed">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span> {{ props.title }} </span>
				</div>
			</template>
			<el-card style="position: relative">
				<StampBadge
					v-if="state.isDisabled || queryParams.status == 0"
					style="position: absolute; top: 0; right: 0"
					size="middle"
					:color="queryParams.status == 3 ? 'success' : queryParams.status == 0 ? 'error' : 'warning'"
					:content="queryParams?.statusName"
					:rotate="45"
				/>
				<el-row justify="center">
					<el-col :span="4">
						<el-text class="mx-1" style="color: #8d8d91">单据号：{{ queryParams.orderNo }}</el-text>
					</el-col>
					<el-col :span="16" style="text-align: center"><h2>出库单</h2></el-col>
					<el-col :span="4" style="text-align: right"></el-col>
				</el-row>
				<el-divider border-style="dashed" />
				<el-form :model="queryParams" ref="queryForm" :rules="rules" :disabled="state.isDisabled" :inline="true">
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
					<el-form-item label="业务日期">
						<el-date-picker v-model="queryParams.createTime" type="date" placeholder="业务日期" readonly />
					</el-form-item>
				</el-form>
				<TableRules :Data="state" :height="'calc(100vh - 430px)'" @dialogChange="dialogChange" @numberChange="numberChange">
					<template #action="scope">
						<el-button link icon="ele-Delete" v-if="scope.$index != 0 && !state.isDisabled" @click="remove(scope)" type="danger" size="small">删除 </el-button>
					</template>
				</TableRules>
				<el-row style="margin-top: 15px">
					<el-col :span="24">
						<el-form :model="queryParams">
							<el-form-item label="备注">
								<el-input :disabled="state.isDisabled" v-model="queryParams.remark" :autosize="{ minRows: 3, maxRows: 4 }" type="textarea" placeholder="请输入备注" />
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
			</el-card>
			<template #footer>
				<span style="float: left">
					<span style="float: left; margin-left: 50px">
						<!--                        <el-statistic title="总金额" :value="0.0000" :precision="4" prefix="￥" suffix="元"/>-->
						<p style="font-size: 18px; font-weight: bold">总金额：{{ verifyNumberComma(queryParams.amount.toFixed(2).toString() || '0.00') }} 元</p>
					</span>
					<span style="float: left; margin-left: 50px">
						<p style="font-size: 18px; font-weight: bold">总量：{{ queryParams.outCount }} 项</p>
					</span>
				</span>
				<span class="dialog-footer">
					<el-button size="default" @click="cancel">关 闭</el-button>
					<el-button type="primary" @click="submit" v-if="!state.isDisabled && !state.isHidden" size="default">确 定</el-button>
					<el-button type="warning" @click="exportOrder" v-if="state.isDisabled && !state.isHidden" size="default">审 核</el-button>
					<el-button type="danger" @click="rejectOrder" v-if="state.isDisabled && !state.isHidden" size="default">驳 回</el-button>
				</span>
			</template>
		</el-dialog>
		<ProductDialog ref="ProductDialogRef" @submit="importProduct" />
	</div>
</template>
<script lang="ts" setup name="addoutstorage">
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { SysEnumApi, OutStorageApi } from '/@/api-services/api';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import type { FormRules } from 'element-plus';
import { formatDate } from '/@/utils/formatTime';

import { useUserInfo } from '/@/stores/userInfo';
import other from '/@/utils/other';

const stores = useUserInfo();
const TableRules = defineAsyncComponent(() => import('/@/components/table/rules.vue'));
//产品选择
const ProductDialog = defineAsyncComponent(() => import('/@/views/inventory/component/dialogproducts.vue'));
const ProductDialogRef = ref();
const props = defineProps({
	title: String,
});
const queryForm = ref();
const queryParams = ref<any>({
	createTime: new Date(),
	type: 0,
	amount: 0.0,
	outCount: 0,
	orderNo: 'C' + formatDate(new Date(), 'YYYYmmddHHMMSS'),
	differCount: 0,
	differAmount: 0.0,
});
const emits = defineEmits(['updateData', 'submit']);
const isShowDialog = ref(false);
const orderTypes = ref<any>([]);
const providers = ref<any>([]);
const state = reactive<TableRulesState>({
	isDisabled: false,
	isHidden: false,
	tableData: {
		data: [
			{
				productId: -1,
				productCode: '-',
				categoryName: '-',
				productType: '-',
				productTypeName: '-',
				productName: '',
				specific: '-',
				unitName: '-',
				procureCount: 0,
				giveCount: 0,
				amount: 0.0,
				singPrice: 0.0,
				remark: '-',
			},
		],
		header: [
			{ prop: 'productCode', width: '150', label: '编号' },
			{ prop: 'categoryName', width: '150', label: '目录' },
			{ prop: 'productTypeName', width: '150', label: '项目类别' },
			{ prop: 'productName', width: '', label: '产品名称', type: 'dialog', placeholder: '查询产品' },
			{ prop: 'specific', width: '80', label: '规格' },
			{ prop: 'unitName', width: '80', label: '单位' },
			{
				prop: 'outPrice',
				width: '',
				label: '出库单价',
				type: 'number',
				precision: 2,
				tooltipCount: '实际入库单价',
				isTooltip: true,
			},
			{ prop: 'procureCount', width: '', label: '出库数量', isRequired: true, type: 'number', min: 1 },
			{ prop: 'giveCount', width: '', label: '出库赠品数', type: 'number', min: 0 },
			{ prop: 'amount', width: '', label: '总金额', type: 'number', precision: 2 },
			{ prop: 'remark', width: '', label: '备注', type: 'input', placeholder: '请输入备注' },
			{
				prop: 'action',
				width: 150,
				label: '操作',
				type: 'action',
				align: 'center',
				isCheck: true,
				fixed: 'right',
				hideCheck: true,
			},
		],
		option: [
			{ value: '选项1', label: '黄金糕' },
			{ value: '选项2', label: '双皮奶' },
			{ value: '选项3', label: '蚵仔煎' },
		],
	},
});

const rules = ref<FormRules>({
	type: [{ required: true, message: '请选择入库类型！', trigger: 'change' }],
	providerId: [{ required: true, message: '请选择供应商！', trigger: 'change' }],
});
onMounted(async () => {
	await getData();
	await getOrderTypes();
	await getProductProviders();
});

//获取所有入库类型
const getOrderTypes = async () => {
	var r = await getAPI(SysEnumApi).apiSysEnumEnumDataListGet('OutOrderTypeEnum');
	orderTypes.value = r.data?.result ?? [];
};
//获取所有供应商
const getProductProviders = async () => {
	const r = stores.productProviders;
	providers.value = r ?? [];
};

//审核
const exportOrder = async () => {
	await getAPI(OutStorageApi)
		.apiOutStorageIdOutStorageExamineGet(queryParams.value.id)
		.then(async () => {
			emits('submit');
			await cancel();
			await closeDialog();
		});
};

//驳回
const rejectOrder = async () => {
	await getAPI(OutStorageApi).apiOutStorageIdOutStorageRejectGet(queryParams.value.id);
	emits('submit');
	await cancel();
	await closeDialog();
};

const numberChange = async (row: any) => {
	row.singPrice = Number((row.amount / (row.procureCount + row.giveCount)).toFixed(2));
	row.inPrice = Number((row.amount / row.procureCount).toFixed(2));
	queryParams.value.amount = state.tableData.data.reduce((total, object) => total + object.amount, 0.0);
};
/**
 * 关闭窗体销毁数据
 */
const dialogClosed = async () => {
	queryParams.value.outCount = 0;
	queryParams.value.amount = 0.0;
	await closeDialog();
};


const remove = async (row: any) => {
	state.tableData.data.splice(row.$index, 1);
	queryParams.value.amount = state.tableData.data.reduce((total, object) => total + object.amount, 0.0);
	queryParams.value.outCount = state.tableData.data.length - 1;
};

/**
 * 选中的产品数据
 * @param data
 */
const importProduct = async (data: any) => {
	data.forEach((v) => {
		// state.tableData.data.concat(s=>s.)
		const found = state.tableData.data.find((obj) => obj.productId === v.id && obj.categoryId === v.categoryId);
		if (!found)
			state.tableData.data.push({
				productId: v.id,
				productCode: v.serialNumber,
				categoryId: v.categoryId,
				categoryName: v.categoryName,
				productType: v.type,
				productTypeName: v.productTypeName,
				productName: v.name,
				specific: v.specific,
				unitName: v.inUnitName,
				unitId: v.inUnitId,
				procureCount: 0,
				giveCount: 0,
				amount: 0.0,
				outPrice: 0.0,
				singPrice: 0.0, // v.singPrice,
				remark: '',
			});
	});
	queryParams.value.outCount = state.tableData.data.length - 1;
};

const importEditProduct = async (data: any) => {
	data.forEach((v) => {
		// state.tableData.data.concat(s=>s.)
		const found = state.tableData.data.find((obj) => obj.productId === v.id && obj.categoryId === v.categoryId);
		if (!found)
			state.tableData.data.push({
				productId: v.productId,
				productCode: v.productCode,
				categoryId: v.categoryId,
				categoryName: v.categoryName,
				productType: v.productType,
				productTypeName: v.typeName,
				productName: v.productName,
				specific: v.specific,
				unitName: v.unitName,
				unitId: v.unitId,
				procureCount: v.procureCount,
				giveCount: v.giveCount,
				amount: v.amount,
				outPrice: v?.outPrice ?? 0.0,
				singPrice: v.singPrice, // v.singPrice,
				remark: v.remark,
				ver: v.ver,
			});
	});
	if (!state.isDisabled) queryParams.value.outCount = state.tableData.data.length - 1;
};

const getData = async () => {
	// state.tableData.data.push();
	console.log(state.tableData);
	// tableRef.value.doLayout();
};
// 打开弹窗
const openDialog = async (isEdit: boolean, row: any, isDisabled: boolean = false, isHeddin: boolean = false) => {
	queryForm.value?.resetFields();
	state.isDisabled = isDisabled;
	state.isHidden = isHeddin;
	if (isDisabled) {
		state.tableData.data.splice(0, 1);
		if (state.tableData.header.find((s) => s.prop == 'action')) state.tableData.header.splice(state.tableData.header.length - 1, 1);
	} else {
		if (!state.tableData.header.find((s) => s.prop == 'action')) {
			state.tableData.header.push({
				prop: 'action',
				width: 150,
				label: '操作',
				type: 'action',
				align: 'center',
				isCheck: true,
				fixed: 'right',
				hideCheck: true,
			});
		}
	}
	if (isEdit) {
		queryParams.value = row;
		console.log('row', row);
		await importEditProduct(row.outStorageDetails);
	} else {
		// orderNo.value = 'R'+formatDate(new Date(),'YYYYmmddHHMMSS');
		queryParams.value = {
			createTime: new Date(),
			type: 0,
			amount: 0.0,
			orderNo: 'C' + formatDate(new Date(), 'YYYYmmddHHMMSS'),
			differCount: 0,
			differAmount: 0.0,
			outCount: 0,
		};
		state.tableData.data = [
			{
				productId: -1,
				productCode: '-',
				categoryName: '-',
				categoryId: -1,
				productType: '-',
				productName: '',
				productTypeName: '-',
				specific: '-',
				unitName: '-',
				unitId: -1,
				procureCount: 0,
				giveCount: 0,
				amount: 0.0,
				outPrice: 0.0,
				singPrice: 0.0,
				remark: '-',
			},
		];
	}

	isShowDialog.value = true;
};

// 关闭弹窗
const closeDialog = () => {
	// emits('updateData');
	queryForm.value?.resetFields();
	state.tableData.data = [
		{
			productId: -1,
			productCode: '-',
			categoryName: '-',
			categoryId: -1,
			productType: '-',
			productTypeName: '-',
			productName: '',
			specific: '-',
			unitName: '-',
			unitId: -1,
			procureCount: 0,
			giveCount: 0,
			amount: 0.0,
			outPrice: 0.0,
			singPrice: 0.0,
			remark: '-',
		},
	];
	queryParams.value = {
		createTime: new Date(),
		type: 0,
		orderNo: 'C' + formatDate(new Date(), 'YYYYmmddHHMMSS'),
		amount: 0.0,
		differCount: 0,
		differAmount: 0.0,
		outCount: 0,
	};
	// isShowDialog.value = false;
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};

// 提交
const submit = () => {
	queryForm.value.validate(async (valid: boolean) => {
		if (!valid) return;
		let rows = other.deepClone(state.tableData.data);
		rows.splice(0, 1);
		let p = providers.value.find((obj) => obj.id === queryParams.value.providerId);
		queryParams.value.outStorageDetails = rows;
		queryParams.value.providerName = p.name;
		if (queryParams.value.id != undefined && queryParams.value.id > 0) {
			await getAPI(OutStorageApi).apiOutStorageIdEditPost(queryParams.value.id, queryParams.value);
		} else {
			await getAPI(OutStorageApi).apiOutStorageAddPost(queryParams.value);
		}
		emits('submit');
		isShowDialog.value = false;
		//await dialogClosed();
	});
};

//查询产品弹出框
const dialogChange = async () => {
	ProductDialogRef.value?.openDialog();
};

// 导出对象
defineExpose({ openDialog });
</script>

<style scoped></style>
