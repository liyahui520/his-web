<template>
	<div class="product-papers-edit-container">
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
				<el-divider content-position="left" style="padding: 0; margin: 15px">试纸信息</el-divider>
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
						<el-form-item label="试纸编码">
							<el-input v-model="ruleForm.serialNumber" :disabled="editSerialNumber" placeholder="请输入试纸编码" clearable="" maxlength="100" />
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
				</el-row>

				<el-divider content-position="left" style="padding: 0; margin: 15px">试纸属性</el-divider>
				<el-row :gutter="35">
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
						<el-form-item label="单位" prop="outUnitId">
							<el-select v-model="ruleForm.outUnitId" filterable placeholder="请选择单位" style="width: 100%">
								<el-option v-for="item in unitData" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="状态">
							<!-- <el-checkbox label="可订" v-model="ruleForm.canOrder" /> -->
							<el-checkbox label="可销" v-model="ruleForm.canSale" />
							<!-- <el-checkbox label="可盘" v-model="ruleForm.canCable" /> -->
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="35">
					<!-- <el-col :xs="16" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="允许零库存" prop="isZeroSale">
							<el-switch v-model="ruleForm.isZeroSale" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col> -->
					<el-col :xs="16" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="参与打折" prop="isDiscount">
							<el-switch v-model="ruleForm.isDiscount" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col>
				</el-row>
<!-- 
				<el-divider content-position="left" style="padding: 0; margin: 15px">检查结果</el-divider>

				<el-row>
					<el-col :span="24" class="mb20">
						<div style="margin-bottom: 10px; margin-left: 50px">
							<el-button type="primary" :icon="Plus" @click="addTestStripResults" plain size="small">添加</el-button>
						</div>
						<el-table :data="ruleForm.productTestStripResults" style="width: 100%" border>
							<el-table-column label="正常/异常">
								<template #default="scope">
									<el-form-item
										label-width="0"
										:key="`situation${scope.$index}`"
										:prop="'productTestStripResults.' + scope.$index + '.situation'"
										:rules="rules.situation"
										:inline-message="true"
										style="margin-bottom: 0px"
									>
										<el-input :ref="`situation${scope.$index}`" v-model="scope.row.situation" placeholder="正常/异常" clearable="" maxlength="100" />
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="结果">
								<template #default="scope">
									<el-form-item
										label-width="0"
										:key="`result${scope.$index}`"
										:prop="'productTestStripResults.' + scope.$index + '.result'"
										:rules="rules.result"
										:inline-message="true"
										style="margin-bottom: 0px"
									>
										<el-input :ref="`result${scope.$index}`" v-model="scope.row.result" placeholder="结果" clearable="" maxlength="100" />
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="描述">
								<template #default="scope">
									<el-form-item
										label-width="0"
										:key="`description${scope.$index}`"
										:prop="'productTestStripResults.' + scope.$index + '.description'"
										:inline-message="true"
										style="margin-bottom: 0px"
									>
										<el-input :ref="`description${scope.$index}`" v-model="scope.row.description" placeholder="描述" clearable="" maxlength="100" />
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="80" align="center" fixed="right">
								<template #default="scope">
									<el-button icon="ele-Delete" size="small" text="" type="danger" @click="deleteTestStripResults(scope.$index)"> 删除 </el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row> -->

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
import { ElMessage, FormInstance } from 'element-plus';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { Plus } from '@element-plus/icons-vue';
import p from 'js-pinyin';
import { ProductPaperApi } from '/@/api-services/api';

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
		default: [],
	},
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const editSerialNumber = ref(false);
const ruleForm = ref<any>({
	isDiscount: true,
	canSale: true,
	costPrice: 0,
	memberPrice: 0,
	salePrice: 0,
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
	outUnitId: [{ required: true, message: '请选择出库单位！', trigger: 'blur' }],
	situation: [{ required: true, message: '请输入正常/异常！', trigger: 'blur' }],
	result: [{ required: true, message: '请输入结果！', trigger: 'blur' }],
});

const manufacturerData = ref<any>([]);
const providerData = ref<any>([]);
const unitData = ref<any>([]);
const unitObject = ref<any>({});
// //添加试纸结果
// const addTestStripResults = () => {
// 	ruleForm.value.productTestStripResults.push({ situation: '', result: '', description: '' });
// };
// //删除种类投药
// const deleteTestStripResults = (index: number) => {
// 	ruleForm.value.productTestStripResults.splice(index, 1);
// };
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

const loadUnitData = async () => {
	var res = stores.productUnits;
	unitData.value = res ?? [];
	unitData.value.forEach((item: any) => {
		unitObject.value[item.id] = item.name;
	});
};
// 打开弹窗
const openDialog = (row: any) => {
	ruleForm.value = other.deepClone(row);
	isShowDialog.value = true;
	ruleForm.value.manufacturerId = row.manufacturerId == 0 ? null : row.manufacturerId;
	ruleForm.value.providerId = row.providerId == 0 ? null : row.providerId;
	ruleForm.value.brandId = row.brandId == 0 ? null : row.brandId;
	// if (ruleForm.value.productTestStripResults == undefined || ruleForm.value.productTestStripResults == null) ruleForm.value.productTestStripResults = [];
	editSerialNumber.value = ruleForm.value.serialNumber != '' && ruleForm.value.serialNumber != null;
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
	// if (ruleForm.value.productTestStripResults.length <= 0) {
	// 	ElMessage.error('请添加试纸结果！');
	// 	return;
	// }

	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			let values = ruleForm.value;
			values.categoryId = ruleForm.value.categoryArr[ruleForm.value.categoryArr.length - 1];
			if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
				await getAPI(ProductPaperApi).apiProductPaperEditPut(values);
			} else {
				await getAPI(ProductPaperApi).apiProductPaperAddPost(values);
			}
			closeDialog();
		}
	});
};

// 页面加载时
onMounted(async () => {
	await loadManufacturerData();
	await loadProviderData();
	await loadUnitData();
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.product-papers-edit-container {
	.el-tag {
		white-space: normal;
		height: auto;
		padding: 9px 9px;
	}
}
</style>
