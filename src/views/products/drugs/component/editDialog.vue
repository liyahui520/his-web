<template>
	<div class="product-drugs-container">
		<el-dialog v-model="isShowDialog" width="70%" draggable :close-on-click-modal="false" destroy-on-close>
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules" :scroll-to-error="true">
				<el-divider content-position="left" style="padding: 0; margin: 15px">药品信息</el-divider>
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
						<el-form-item label="编码" :disabled="editSerialNumber">
							<el-input v-model="ruleForm.serialNumber" placeholder="请输入编码" clearable="" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="35">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="名称" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入名称" clearable="" @change="pinyin" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="条形码" prop="barCode">
							<el-input v-model="ruleForm.barCode" placeholder="请输入条形码" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="拼音简写" prop="nameLetter">
							<el-input v-model="ruleForm.nameLetter" placeholder="请输入缩写" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="英文名称" prop="englishName">
							<el-input v-model="ruleForm.englishName" placeholder="请输入英文名称" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="通用名称" prop="commonName">
							<el-input v-model="ruleForm.commonName" placeholder="请输入通用名称" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="成分" prop="ingredient">
							<el-input v-model="ruleForm.ingredient" placeholder="请输入成分" clearable="" />
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
						<el-form-item label="使用方式" prop="usingMethod">
							<el-select v-model="ruleForm.usingMethod" filterable placeholder="请选择使用方式" style="width: 100%">
								<el-option v-for="item in usingMethodData" :key="item.id" :label="item.value" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="投药方式" prop="dosingWay">
							<el-select v-model="ruleForm.dosingWay" filterable placeholder="请选择投药方式" style="width: 100%">
								<el-option v-for="item in dosingWayData" :key="item.id" :label="item.value" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-divider content-position="left" style="padding: 0; margin: 15px">药品属性</el-divider>

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
							1 {{ inUnitName }} =
							<el-input-number v-model="ruleForm.inSpecific" :max="999999999" :min="1" />
							&nbsp;&nbsp;{{ outUnitName }}
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="品牌" prop="brandId">
							<el-select v-model="ruleForm.brandId" filterable placeholder="请选择品牌" style="width: 100%">
								<el-option v-for="item in brandData" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="规格" prop="specific">
							<el-input v-model="ruleForm.specific" placeholder="请输入规格" clearable="" />
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
				<el-divider content-position="left" style="margin: 15px; width: 98%">
					<el-button type="primary" :icon="Plus" @click="addDosing" plain size="small">添加种类投药</el-button>
				</el-divider>

				<el-row>
					<el-col :span="24" class="mb20">
						<el-table :data="ruleForm.productDosings" style="width: 100%; margin-top: 10px">
							<el-table-column label="种类">
								<template #default="scope">
									<el-form-item
										label-width="0"
										:key="`categoryId${scope.$index}`"
										:prop="'productDosings.' + scope.$index + '.categoryId'"
										:rules="rules.categoryId"
										:inline-message="true"
										style="margin-bottom: 0px"
									>
										<el-select :ref="`categoryId${scope.$index}`" v-model="scope.row.categoryId">
											<el-option v-for="category in getEditpetKindData" :label="category.name" :value="category.id" :key="category.id">{{ category.name }}</el-option>
										</el-select>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="单位">
								<template #default="scope">
									<el-form-item
										label-width="0"
										:key="`unitId${scope.$index}`"
										:prop="'productDosings.' + scope.$index + '.unitId'"
										:rules="rules.unitId"
										:inline-message="true"
										style="margin-bottom: 0px"
									>
										<el-select :ref="`unitId${scope.$index}`" v-model="scope.row.unitId" filterable>
											<el-option v-for="item in unitData" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="使用方式（次/天）">
								<template #default="scope">
									<el-form-item
										label-width="0"
										:key="`useMethods${scope.$index}`"
										:prop="'productDosings.' + scope.$index + '.useMethods'"
										:rules="rules.useMethods"
										:inline-message="true"
										style="margin-bottom: 0px"
									>
										<el-input-number :ref="`useMethods${scope.$index}`" v-model="scope.row.useMethods" :precision="0" :step="1" :max="200" :min="1"></el-input-number>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="使用剂量">
								<template #default="scope">
									<el-form-item
										label-width="0"
										:key="`useDose${scope.$index}`"
										:prop="'productDosings.' + scope.$index + '.useDose'"
										:rules="rules.useDose"
										:inline-message="true"
										style="margin-bottom: 0px"
									>
										<el-input-number :ref="`useDose${scope.$index}`" v-model="scope.row.useDose" :precision="2" :step="1" :max="999999" :min="0.01" controls-position="right"></el-input-number>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="最小剂量">
								<template #default="scope">
									<el-form-item
										label-width="0"
										:key="`useMinDose${scope.$index}`"
										:prop="'productDosings.' + scope.$index + '.useMinDose'"
										:rules="rules.useMinDose"
										:inline-message="true"
										style="margin-bottom: 0px"
									>
										<el-input-number :ref="`useMinDose${scope.$index}`" v-model="scope.row.useMinDose" :precision="2" :step="1" :max="999999" :min="0.01" controls-position="right"></el-input-number>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="最大剂量">
								<template #default="scope">
									<el-form-item
										label-width="0"
										:key="`useMaxDose${scope.$index}`"
										:prop="'productDosings.' + scope.$index + '.useMaxDose'"
										:rules="rules.useMaxDose"
										:inline-message="true"
										style="margin-bottom: 0px"
									>
										<el-input-number :ref="`useMaxDose${scope.$index}`" v-model="scope.row.useMaxDose" :precision="2" :step="1" :max="999999" :min="0.01" controls-position="right"></el-input-number>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="80" align="center" fixed="right">
								<template #default="scope">
									<el-button icon="ele-Delete" size="small" text="" type="danger" @click="deleteDosing(scope.$index)"> 删除 </el-button>
								</template>
							</el-table-column>
						</el-table>
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
import { Plus } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import p from 'js-pinyin';
import { ProductDrugsApi } from '/@/api-services/api';
import { useUserInfo } from '/@/stores/userInfo';
import other from '/@/utils/other';
import { getKinds} from '/@/utils/dict-utils';

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
const categoryRef = ref();
// const productDosingsTableRef = ref();
const ruleForm = ref<any>({
	isdiscount: true,
	cansale: true,
	costprice: 0,
	memberprice: 0,
	saleprice: 0,
	inSpecific: 1,
	isAnaesthesia: false,
	categoryArr: [],
});
const manufacturerData = ref<any>([]);
const providerData = ref<any>([]);
const brandData = ref<any>([]);
const unitData = ref<any>([]);
const unitObject = ref<any>({});
const inUnitName = ref('入库单位');
const outUnitName = ref('出库单位');
const usingMethodData = ref<any>([]);
const dosingWayData = ref<any>([]);
const carcerProp = ref<any>({ checkStrictly: true, value: 'id' });
const getEditpetKindData = ref<any>([]);
/**
 * 获取宠物种类
 */
const getSysPetKind = async () => {
	getEditpetKindData.value = getKinds() ?? [];
};

//转换拼音
const pinyin = async () => {
	ruleForm.value.englishName = p.getFullChars(ruleForm.value.name);
	ruleForm.value.nameLetter = p.getCamelChars(ruleForm.value.name);
};
//添加种类投药
const addDosing = () => {
	ruleForm.value.productDosings.push({ useMethods: 1, useDose: 1, useMinDose: 1, useMaxDose: 2 });
};
//删除种类投药
const deleteDosing = (index: number) => {
	ruleForm.value.productDosings.splice(index, 1);
};
const loadManufacturerData = () => {
	var res = stores.productManufacturers;
	manufacturerData.value = res ?? [];
};
const loadProviderData = () => {
	var res = stores.productProviders;
	providerData.value = res ?? [];
};
const loadBrandData = () => {
	var res = stores.productBrands;
	brandData.value = res ?? [];
};


const loadUnitData = () => {
	var res = stores.productUnits;
	unitData.value = res ?? [];
	unitData.value.forEach((item: any) => {
		unitObject.value[item.id] = item.name;
	});
};
const inUnitChange = () => {
	inUnitName.value = unitObject.value[ruleForm.value.inUnitId];
};
const outUnitChange = () => {
	outUnitName.value = unitObject.value[ruleForm.value.outUnitId];
};

const validateUseDose = (rule: any, value: any, callback: any) => {
	if (value === '' || value === null || value === undefined) {
		callback(new Error('请输入使用剂量！'));
	} else {
		const index = rule.field.split('.')[1];
		if (value < ruleForm.value.productDosings[index].useMinDose) {
			callback(new Error('使用剂量不能小于最小剂量！'));
		} else if (value > ruleForm.value.productDosings[index].useMaxDose) {
			callback(new Error('使用剂量不能大于最大剂量！'));
		}
		callback();
	}
};

const validateUseMinDose = (rule: any, value: any, callback: any) => {
	if (value === '' || value === null || value === undefined) {
		callback(new Error('请输入使用最小剂量！'));
	} else {
		const index = rule.field.split('.')[1];
		if (value >= ruleForm.value.productDosings[index].useMaxDose) {
			callback(new Error('最小剂量不能大于等于最大剂量！'));
		}
		callback();
	}
};
const validateUseMaxDose = (rule: any, value: any, callback: any) => {
	if (value === '' || value === null || value === undefined) {
		callback(new Error('请输入使用最大剂量！'));
	} else {
		const index = rule.field.split('.')[1];
		if (value <= ruleForm.value.productDosings[index].useMinDose) {
			callback(new Error('最大剂量不能小于等于最小剂量！'));
		}
		callback();
	}
};
//自行删除非必填规则
const rules = ref<FormRules>({
	categoryArr: [{ required: true, message: '请选择目录！', trigger: 'change' }],
	name: [{ required: true, message: '请输入名称！', trigger: 'blur' }],
	providerId: [{ required: true, message: '请选择供应商！', trigger: 'change' }],
	manufacturerId: [{ required: true, message: '请选择生产商！', trigger: 'change' }],
	ingredient: [{ required: true, message: '请输入成分！', trigger: 'blur' }],
	usingMethod: [{ required: true, message: '请选择使用方式！', trigger: 'change' }],
	dosingWay: [{ required: true, message: '请选择投药方式！', trigger: 'change' }],
	salePrice: [{ required: true, message: '请输入销售价格！', trigger: 'blur' }],
	memberPrice: [{ required: true, message: '请输入会员价格！', trigger: 'blur' }],
	inUnitId: [{ required: true, message: '请选择入库单位！', trigger: 'change' }],
	outUnitId: [{ required: true, message: '请选择投药单位！', trigger: 'change' }],
	brandId: [{ required: true, message: '请选择品牌！', trigger: 'change' }],
	specific: [{ required: true, message: '请输入规格！', trigger: 'blur' }],
	inSpecific: [{ required: true, message: '请输入换算规格！', trigger: 'blur' }],
	unitId: [{ required: true, message: '请选择单位！', trigger: 'change' }],
	useMethods: [{ required: true, message: '请输入使用方式（次/天）！', trigger: 'change' }],
	useDose: [{ validator: validateUseDose, trigger: 'change' }],
	useMinDose: [{ validator: validateUseMinDose, trigger: 'change' }],
	useMaxDose: [{ validator: validateUseMaxDose, trigger: 'change' }],
});

// 打开弹窗
const openDialog = (row: any,usingMethodList:any,dosingWayList:any) => {
	ruleForm.value = other.deepClone(row);
	usingMethodData.value =usingMethodList;
	dosingWayData.value=dosingWayList;
	if (ruleForm.value.productDosings == undefined || ruleForm.value.productDosings == null) ruleForm.value.productDosings = [];
	isShowDialog.value = true;
	ruleForm.value.manufacturerId = row.manufacturerId == 0 ? null : row.manufacturerId;
	ruleForm.value.providerId = row.providerId == 0 ? null : row.providerId;
	ruleForm.value.brandId = row.brandId == 0 ? null : row.brandId;
	editSerialNumber.value = ruleForm.value.serialNumber != '' && ruleForm.value.serialNumber != null;
	ruleForm.value.categoryArr = findParentIds(props.productCategorysData, ruleForm.value.categoryId, []);
	inUnitChange();
	outUnitChange();
	loadManufacturerData();
	loadProviderData();
	loadBrandData();
	loadUnitData();
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
	resetForm(ruleFormRef);
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	// ruleFormRef.value.resetFields();
	resetForm(ruleFormRef);
	isShowDialog.value = false;
};
const resetForm = (formEl: any) => {
	if (!formEl) return;
	formEl.value.resetFields(); //.resetFields();//.resetFields()
};
// 提交
const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			let values = ruleForm.value;
			values.categoryId = ruleForm.value.categoryArr[ruleForm.value.categoryArr.length - 1];
			if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
				await getAPI(ProductDrugsApi).apiProductDrugsEditPut(values);
			} else {
				await getAPI(ProductDrugsApi).apiProductDrugsAddPost(values);
			}
			resetForm(ruleFormRef);
			closeDialog();
		}
	});
};

// 页面加载时
onMounted(async () => {
	await getSysPetKind();
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style lang="scss" scoped>
.product-drugs-container {
	.el-tag {
		white-space: normal;
		height: auto;
		padding: 9px 9px;
	}
}
</style>
