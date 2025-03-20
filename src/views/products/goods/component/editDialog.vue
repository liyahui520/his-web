<template>
	<div class="product-goods-edit-container">
		<el-dialog v-model="isShowDialog" :title="props.title" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
				<el-divider content-position="left" style="padding: 0; margin: 15px">商品信息</el-divider>
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="所属目录" prop="categoryArr">
							<el-cascader ref="categoryRef" separator=">" v-model="ruleForm.categoryArr" :props="carcerProp" :options="props.productCategorysData" filterable clearable style="width: 100%">
								<template #default="{ node, data }">
									<span>{{ data.label }}</span>
									<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="商品编码">
							<el-input v-model="ruleForm.serialNumber" :disabled="editSerialNumber" placeholder="请输入商品编码" clearable="" maxlength="100" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="35">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="名称" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入名称" clearable="" maxlength="100" @change="pinyin" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="条形码" prop="barCode">
							<el-input v-model="ruleForm.barCode" placeholder="请输入条形码" clearable="" maxlength="100" />
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="英文名称" prop="englishName">
							<el-input v-model="ruleForm.englishName" placeholder="请输入英文名称" clearable="" maxlength="100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="名称缩写" prop="nameLetter">
							<el-input v-model="ruleForm.nameLetter" placeholder="请输入名称缩写" clearable="" maxlength="100" />
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="通用名称" prop="commonName">
							<el-input v-model="ruleForm.commonName" placeholder="请输入通用名称" clearable="" maxlength="100" />
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="供应商" prop="providerId">
							<el-select v-model="ruleForm.providerId" filterable placeholder="请选择供应商" style="width: 100%">
								<el-option v-for="item in providerData" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="生产商" prop="manufacturerId">
							<el-select v-model="ruleForm.manufacturerId" filterable placeholder="请选择供应商" style="width: 100%">
								<el-option v-for="item in manufacturerData" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="品牌" prop="brandId">
							<el-select v-model="ruleForm.brandId" filterable placeholder="请选择品牌" style="width: 100%">
								<el-option v-for="item in brandData" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-divider content-position="left" style="padding: 0; margin: 15px">商品属性</el-divider>
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="成本价">
							<el-text type="primary">{{ ruleForm.costPrice }}</el-text>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="库存">
							<el-text type="primary">{{ ruleForm.count ?? 0 }}</el-text>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="销售价格" prop="salePrice">
							<el-input-number v-model="ruleForm.salePrice" :precision="2" :step="0.1" :max="999999999" :min="0"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="会员价格" prop="memberPrice">
							<el-input-number v-model="ruleForm.memberPrice" :precision="2" :step="0.1" :max="999999999" :min="0"></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="入库单位" prop="inUnitId">
							<el-select v-model="ruleForm.inUnitId" filterable placeholder="请选择入库单位" @change="inUnitChange" style="width: 100%">
								<el-option v-for="item in unitData" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="出库单位" prop="outUnitId">
							<el-select v-model="ruleForm.outUnitId" filterable placeholder="请选择出库单位" @change="outUnitChange" style="width: 100%">
								<el-option v-for="item in unitData" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="换算" prop="inSpecific">
							1 {{ inUnitName ?? '入库单位' }} &nbsp;&nbsp;=&nbsp;&nbsp;
							<el-input-number v-model="ruleForm.inSpecific" :max="999999999" :min="1" />
							&nbsp;&nbsp;{{ outUnitName ?? '出库单位' }}
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="状态">
							<el-checkbox label="可订" v-model="ruleForm.canOrder" />
							<el-checkbox label="可销" v-model="ruleForm.canSale" />
							<el-checkbox label="可盘" v-model="ruleForm.canCable" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="35">
					<el-col :xs="16" :sm="8" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="允许零库存" prop="isZeroSale">
							<el-switch v-model="ruleForm.isZeroSale" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col>
					<el-col :xs="16" :sm="8" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="参与打折" prop="isDiscount">
							<el-switch v-model="ruleForm.isDiscount" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col>
					<el-col :xs="16" :sm="8" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="批次" prop="isAnaesthesia">
							<el-switch v-model="ruleForm.isAnaesthesia" active-text="有" inactive-text="无" />
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
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel" size="default">取 消</el-button>
					<el-button type="primary" @click="submit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import p from 'js-pinyin';
import { ProductGoodsApi } from '/@/api-services/api';

import { useUserInfo } from '/@/stores/userInfo';
import other from '/@/utils/other';

const stores = useUserInfo();
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
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref<any>();
const isShowDialog = ref(false);
const editSerialNumber = ref(false);
const ruleForm = ref<any>({
	isDiscount: true,
	canSale: true,
	costPrice: 0,
	memberPrice: 0,
	salePrice: 0,
	inSpecific: 1,
	englishName: '',
	categoryArr: [],
});
const carcerProp = ref<any>({ checkStrictly: true, value: 'id' });
//自行删除非必填规则
const rules = ref<FormRules>({
	categoryArr: [{ required: true, message: '请选择目录！', trigger: 'change' }],
	name: [{ required: true, message: '请输入名称！', trigger: 'blur' }],
	providerId: [{ required: true, message: '请选择供应商！', trigger: 'blur' }],
	manufacturerId: [{ required: true, message: '请选择生产商！', trigger: 'blur' }],
	salePrice: [{ required: true, message: '请输入销售价格！', trigger: 'blur' }],
	memberPrice: [{ required: true, message: '请输入会员价格！', trigger: 'blur' }],
	inUnitId: [{ required: true, message: '请选择入库单位！', trigger: 'blur' }],
	outUnitId: [{ required: true, message: '请选择出库单位！', trigger: 'blur' }],
	inSpecific: [{ required: true, message: '请输入换算规格！', trigger: 'blur' }],
});

const manufacturerData = ref<any>([]);
const providerData = ref<any>([]);
const brandData = ref<any>([]);
const unitData = ref<any>([]);
const unitObject = ref<any>({});
const inUnitName = ref('入库单位');
const outUnitName = ref('出库单位');

const inUnitChange = () => {
	inUnitName.value = unitObject.value[ruleForm.value.inUnitId];
};
const outUnitChange = () => {
	outUnitName.value = unitObject.value[ruleForm.value.outUnitId];
};
//转换拼音
const pinyin = async () => {
	ruleForm.value.englishName = p.getFullChars(ruleForm.value.name);
	ruleForm.value.nameLetter = p.getCamelChars(ruleForm.value.name);
};
const loadManufacturerData = async () => {
	var res = stores.productManufacturers;
	manufacturerData.value = res ?? [];
};
const loadProviderData = async () => {
	var res = stores.productProviders;
	providerData.value = res ?? [];
};
const loadBrandData = async () => {
	var res = stores.productBrands;
	brandData.value = res ?? [];
};
const loadUnitData = async () => {
	var res = stores.productUnits;
	unitData.value = res ?? [];
	unitData.value.forEach((item: any) => {
		unitObject.value[item.id] = item.name;
	});
};
// 打开弹窗
const openDialog = async (row: any) => {
	ruleForm.value = other.deepClone(row);
	inUnitName.value = unitObject.value[row.inUnitId];
	outUnitName.value = unitObject.value[row.outUnitId];
	isShowDialog.value = true;
	ruleForm.value.manufacturerId = row.manufacturerId == 0 ? null : row.manufacturerId;
	ruleForm.value.providerId = row.providerId == 0 ? null : row.providerId;
	ruleForm.value.brandId = row.brandId == 0 ? null : row.brandId;
	editSerialNumber.value = ruleForm.value.serialNumber != '' && ruleForm.value.serialNumber != null;
	ruleForm.value.categoryArr = findParentIds(props.productCategorysData, ruleForm.value.categoryId, []);
	inUnitChange();
	outUnitChange();
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
const resetForm = (formEl: any) => {
	if (!formEl) return;
	formEl.value.resetFields(); //.resetFields();//.resetFields()
};
// 关闭弹窗
const closeDialog = () => {
	emit('reloadTable');
	resetForm(ruleFormRef);
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	resetForm(ruleFormRef);
	isShowDialog.value = false;
};

// 提交
const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			let values = ruleForm.value;
			values.categoryId = ruleForm.value.categoryArr[ruleForm.value.categoryArr.length - 1];
			if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
				await getAPI(ProductGoodsApi).apiProductGoodsEditPut(values);
			} else {
				await getAPI(ProductGoodsApi).apiProductGoodsAddPost(values);
			}
			closeDialog();
		}
	});
};

// 页面加载时
onMounted(async () => {
	await loadManufacturerData();
	await loadProviderData();
	await loadBrandData();
	await loadUnitData();
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.product-goods-edit-container {
	.el-tag {
		white-space: normal;
		height: auto;
		padding: 9px 9px;
	}
}
</style>
