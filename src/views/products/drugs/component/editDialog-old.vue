<template>
	<div class="product-drugs-container">
		<el-dialog v-model="isShowDialog" width="50%" draggable :close-on-click-modal="false">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
                    <span>{{ props.title }}</span>
                </div>
            </template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
				<el-row>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="目录" prop="categoryId">
							<el-tag type="danger">{{ ruleForm.categoryName }}</el-tag>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="35">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="名称" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入名称" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="条形码" prop="barCode">
							<el-input v-model="ruleForm.barCode" placeholder="请输入条形码" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="供应商" prop="providerId">
							<el-select v-model="ruleForm.providerId" filterable placeholder="请选择供应商">
								<el-option v-for="item in providerData" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="生产商" prop="manufacturerId">
							<el-select v-model="ruleForm.manufacturerId" filterable placeholder="请选择供应商">
								<el-option v-for="item in manufacturerData" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="成分" prop="ingredient">
							<el-input v-model="ruleForm.ingredient" placeholder="请输入成分" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="缩写" prop="nameLetter">
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
						<el-form-item label="使用方式" prop="usingMethod">
							<el-select v-model="ruleForm.usingMethod" filterable placeholder="请选择使用方式">
								<el-option v-for="item in usingMethodData" :key="item.id" :label="item.label" :value="item.id"> </el-option>
							</el-select>
						</el-form-item>

					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="投药方式" prop="dosingWay">
							<el-select v-model="ruleForm.dosingWay" filterable placeholder="请选择投药方式">
								<el-option v-for="item in dosingWayData" :key="item.id" :label="item.label" :value="item.id"> </el-option>
							</el-select>
						</el-form-item>

					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="麻醉药品" prop="isAnaesthesia">
							<el-switch v-model="ruleForm.isAnaesthesia" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="成本价" prop="costPrice">
							<el-input-number v-model="ruleForm.costPrice" :precision="2" :step="0.1" :max="999999999" :min="0"></el-input-number>
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
						<el-form-item label="参与打折" prop="isDiscount">
							<el-switch v-model="ruleForm.isDiscount" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="可销" prop="cansale">
							<el-switch v-model="ruleForm.cansale" active-text="是" inactive-text="否" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="入库单位" prop="inUnitId">
							<el-select v-model="ruleForm.inUnitId" filterable placeholder="请选择入库单位" @change="inUnitChange">
								<el-option v-for="item in unitData" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="出库单位" prop="outUnitId">
							<el-select v-model="ruleForm.outUnitId" filterable placeholder="请选择出库单位" @change="outUnitChange">
								<el-option v-for="item in unitData" :key="item.id" :label="item.name" :value="item.id"> </el-option>
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
							<el-select v-model="ruleForm.brandId" filterable placeholder="请选择品牌">
								<el-option v-for="item in brandData" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="规格" prop="specific">
							<el-input v-model="ruleForm.specific" placeholder="请输入规格" clearable="" />
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
import { ProductDrugsApi } from '/@/api-services/api';
import { useUserInfo } from '/@/stores/userInfo';
import { getDictDataList } from '/@/utils/dict-utils';

const stores = useUserInfo();

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const ruleForm = ref<any>({ isdiscount: true, cansale: true, costprice: 0, memberprice: 0, saleprice: 0, inSpecific: 1,isAnaesthesia:false });

const manufacturerData = ref<any>([]);
const providerData = ref<any>([]);
const brandData = ref<any>([]);
const unitData = ref<any>([]);
const unitObject = ref<any>({});
const inUnitName = ref('入库单位');
const outUnitName = ref('出库单位');
const usingMethodData=ref<any>([]);
const dosingWayData=ref<any>([]);

const loadUsingMethodData=async ()=>{
	var res = getDictDataList('code_using_method');
	usingMethodData.value = res?? [];
};
const loadDosingWayData=async()=>{
	var res = getDictDataList('code_dosing_way');
	dosingWayData.value = res?? [];
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
const inUnitChange=async ()=>{
	inUnitName.value=unitObject.value[ruleForm.value.inUnitId];
}
const outUnitChange=async ()=>{
	outUnitName.value=unitObject.value[ruleForm.value.outUnitId];
}
//自行删除非必填规则
const rules = ref<FormRules>({
	name: [{ required: true, message: '请输入名称！', trigger: 'blur' }],
	providerId: [{ required: true, message: '请选择供应商！', trigger: 'blur' }],
	manufacturerId: [{ required: true, message: '请选择生产商！', trigger: 'blur' }],
	ingredient: [{ required: true, message: '请输入成分！', trigger: 'blur' }],
	usingMethod: [{ required: true, message: '请选择使用方式！', trigger: 'blur' }],
	dosingWay: [{ required: true, message: '请选择投药方式！', trigger: 'blur' }],
	salePrice:[{ required: true, message: '请输入销售价格！', trigger: 'blur' }],
	memberPrice:[{ required: true, message: '请输入会员价格！', trigger: 'blur' }],
	inUnitId: [{ required: true, message: '请选择入库单位！', trigger: 'blur' }],
	outUnitId: [{ required: true, message: '请选择投药单位！', trigger: 'blur' }],
	brandId: [{ required: true, message: '请选择品牌！', trigger: 'blur' }],
	specific: [{ required: true, message: '请输入规格！', trigger: 'blur' }],
	inSpecific: [{ required: true, message: '请输入换算规格！', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (row: any) => {
	ruleForm.value =  { ...row };
	isShowDialog.value = true;
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
			if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
				await getAPI(ProductDrugsApi).apiProductDrugsEditPut(values);
			} else {
				await getAPI(ProductDrugsApi).apiProductDrugsAddPost(values);
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
	await loadUsingMethodData();
	await loadDosingWayData();
	await inUnitChange();
	await outUnitChange();
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
