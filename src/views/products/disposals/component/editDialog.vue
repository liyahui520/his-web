<template>
	<div class="product-Tests-container">
		<el-dialog v-model="isShowDialog" :title="props.title" width="80%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="80px" :rules="rules">
				<el-row :gutter="8">
					<el-col :span="8">
						<el-card shadow="always" style="height: 780px">
							<el-row :gutter="35">
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="所属目录" prop="categoryArr">
										<el-cascader ref="categoryRef" separator=">" v-model="ruleForm.categoryArr" :props="carcerProp" :options="props.productCategorysData" filterable clearable style="width: 100%">
											<template #default="{ node, data }">
												<span>{{ data.label }}</span>
												<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
											</template>
										</el-cascader>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="编码">
										<el-input v-model="ruleForm.serialNumber" :disabled="editSerialNumber" placeholder="请输入编码" clearable="" />
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="35">
								<el-form-item v-show="false">
									<el-input v-model="ruleForm.id" />
								</el-form-item>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="名称" prop="name">
										<el-input v-model="ruleForm.name" placeholder="请输入名称" clearable="" @change="pinyin" />
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="条形码" prop="barCode">
										<el-input v-model="ruleForm.barCode" placeholder="请输入条形码" clearable="" />
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="缩写" prop="nameLetter">
										<el-input v-model="ruleForm.nameLetter" placeholder="请输入缩写" clearable="" />
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="英文名称" prop="englishName">
										<el-input v-model="ruleForm.englishName" placeholder="请输入英文名称" clearable="" />
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="通用名称" prop="commonName">
										<el-input v-model="ruleForm.commonName" placeholder="请输入通用名称" clearable="" />
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="单位" prop="outUnitId">
										<el-select v-model="ruleForm.outUnitId" filterable placeholder="请选择单位" style="width: 100%">
											<el-option v-for="item in unitData" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="销售价格" prop="salePrice">
										<el-input-number v-model="ruleForm.salePrice" :precision="2" :step="1" :max="999999999" :min="0"></el-input-number>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="会员价格" prop="memberPrice">
										<el-input-number v-model="ruleForm.memberPrice" :precision="2" :step="1" :max="999999999" :min="0"></el-input-number>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="参与打折" prop="isDiscount">
										<el-switch v-model="ruleForm.isDiscount" active-text="是" inactive-text="否" />
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
									<el-form-item label="状态">
										<el-checkbox label="可订" v-model="ruleForm.canOrder" />
										<el-checkbox label="可销" v-model="ruleForm.canSale" />
										<el-checkbox label="可盘" v-model="ruleForm.canCable" />
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="mb20">
									<el-form-item label="注意事项" prop="notice">
										<el-input type="textarea" v-model="ruleForm.notice" placeholder="请输入注意事项" maxlength="200"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="mb20">
									<el-form-item label="备注" prop="remark">
										<el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注" maxlength="200"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-card>
					</el-col>
					<el-col :span="16">
						<el-card shadow="always" style="height: 780px">
							<template #header>
								<el-row justify="space-between">
									<el-col :span="18">
										<span>试纸/消耗品</span>
									</el-col>
									<el-col :span="6">
										<el-button icon="ele-Plus" size="small" type="primary" @click="openCheckProductDialog"> 新增 </el-button>
										<el-button icon="ele-Delete" size="small" type="danger" @click="selectConsumablesAndPaperClear"> 清空 </el-button>
									</el-col>
								</el-row>
							</template>
							<el-table :data="ruleForm.productMedicationRelations" style="padding-bottom: 40px;">
								<el-table-column type="index" label="序号" width="55" align="center" />
								<el-table-column label="类型" width="100">
									<template #default="scope">
										<span>{{ productTypeObject[scope.row.targetProductType] }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="targetName" label="名称" />
								<el-table-column prop="targetUnit" label="单位" width="130" show-overflow-tooltip="" />
								<el-table-column prop="targetSpecific" label="规格" width="150" show-overflow-tooltip="" />
								<el-table-column label="数量" width="180">
									<template #default="scope">
										<el-form-item
											label-width="0"
											:key="`targetProductNumber${scope.$index}`"
											:prop="'productMedicationRelations.' + scope.$index + '.targetProductNumber'"
											:rules="rules.targetProductNumber"
											:inline-message="true"
											style="margin-bottom: 0px"
										>
											<el-input-number :ref="`targetProductNumber${scope.$index}`" v-model="scope.row.targetProductNumber" :precision="0" :step="1" :max="999999" :min="1"></el-input-number>
										</el-form-item>
									</template>
								</el-table-column>
								<el-table-column label="操作" width="80" align="center">
									<template #default="scope">
										<el-button icon="ele-Delete" link size="small" type="danger" @click="deleteMedicationRelations(scope.$index)" />
									</template>
								</el-table-column>
							</el-table>
						</el-card>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel" size="default">取 消</el-button>
					<el-button type="primary" @click="submit" size="default">确 定</el-button>
				</span>
			</template>
			<Products ref="productRef" :title="'选择试纸/消耗品'" @reloadTable="checkProductQuery" />
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import p from 'js-pinyin';
import { ProductDisposalApi } from '/@/api-services/api';
import { useUserInfo } from '/@/stores/userInfo';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';
import other from '/@/utils/other';

const Products = defineAsyncComponent(() => import('/@/components/products/selectProducts.vue'));
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const stores = useUserInfo();
const ruleFormRef = ref();
const productRef = ref();
const isShowDialog = ref(false);
const editSerialNumber = ref(false);
const ruleForm = ref<any>({});
const unitData = ref<any>([]);
const unitObject = ref<any>({});
const carcerProp = ref<any>({ checkStrictly: true, value: 'id' });
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
	productCategorysData: {
		type: Array,
		default: [] as any,
	},
});
const productTypeObject = {
	'140001': '消耗品',
	'150001': '试纸',
};
/**
 * 移除关联
 * @param index
 */
const deleteMedicationRelations = (index: number) => {
	ruleForm.value.productMedicationRelations.splice(index, 1);
};
const checkProductQuery = (data: any) => {
	data.forEach((item: any) => {
		if (ruleForm.value.productMedicationRelations.findIndex((i: any) => i.targetProductId == item.productId) == -1) {
			ruleForm.value.productMedicationRelations.push({
				productId: ruleForm.value.id,
				productType: ruleForm.value.type,
				targetProductId: item.productId,
				targetProductType: item.productType,
				targetName: item.productName,
				targetSpecific: item.specific,
				targetUnit: item.outUnitName,
				targetProductNumber: 1,
			});
		}
	});
};
//清除已选的试纸和消耗品
const selectConsumablesAndPaperClear = () => {
	ruleForm.value.productMedicationRelations = [];
};

//打开选择消耗品和试纸弹窗
const openCheckProductDialog = () => {
	productRef.value.openDialog(
		[
			{ label: '消耗品', value: ProductTypeEnums.NUMBER_140001 },
			{ label: '试纸', value: ProductTypeEnums.NUMBER_150001 },
		],
		ProductTypeEnums.NUMBER_140001
	);
};

//自行删除非必填规则
const rules = ref<FormRules>({
	categoryArr: [{ required: true, message: '请选择目录！', trigger: 'change' }],
	name: [{ required: true, message: '请输入名称！', trigger: 'blur' }],
	salePrice: [{ required: true, message: '请输入销售价格！', trigger: 'blur' }],
	memberPrice: [{ required: true, message: '请输入会员价格！', trigger: 'blur' }],
	outUnitId: [{ required: true, message: '请选择单位！', trigger: 'blur' }],
	targetProductNumber: [{ required: true, message: '请输入数量！', trigger: 'change' }],
});
/**
 * 加载单位数据
 */
const loadUnitData = async () => {
	let productUnits = stores.productUnits;
	unitData.value = productUnits ?? [];
	unitData.value.forEach((item: any) => {
		unitObject.value[item.id] = item.name;
	});
};

//转换拼音
const pinyin = async () => {
	ruleForm.value.englishName = p.getFullChars(ruleForm.value.name);
	ruleForm.value.nameLetter = p.getCamelChars(ruleForm.value.name);
};

// 打开弹窗
const openDialog = (row: any) => {
	ruleForm.value = other.deepClone(row);
	isShowDialog.value = true;
	editSerialNumber.value = ruleForm.value.serialNumber != '' && ruleForm.value.serialNumber != null;
	if (!ruleForm.value.productMedicationRelations) ruleForm.value.productMedicationRelations = [];
	ruleForm.value.categoryArr = findParentIds(props.productCategorysData, ruleForm.value.categoryId, []);
};
const findParentIds = (tree: any, targetId: any, parentIds = <any>[]) => {
	for (const node of tree) {
		if (node.id === targetId) {
			parentIds.push(node.id);
			return parentIds;
		}
		if (node.children && node.children.length > 0) {
			const result = findParentIds(node.children, targetId, parentIds.concat(node.id));
			if (result) {
				return result;
			}
		}
	}
	return null;
};

// 关闭弹窗
const closeDialog = () => {
	emit('reloadTable');
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};

// 提交
const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			let values = ruleForm.value;
			values.categoryId = ruleForm.value.categoryArr[ruleForm.value.categoryArr.length - 1];
			if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
				await getAPI(ProductDisposalApi).apiProductDisposalEditPut(values);
			} else {
				await getAPI(ProductDisposalApi).apiProductDisposalAddPost(values);
			}
			closeDialog();
		}
	});
};

// 页面加载时
onMounted(async () => {
	await loadUnitData();
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.product-Tests-container {
	.el-tag {
		white-space: normal;
		height: auto;
		padding: 9px 9px;
	}
}
</style>
