<template>
	<div class="product-category-container">
		<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
			<el-form ref="queryForm" :inline="true" label-width="70px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="项目">
							<el-select v-model="productTypesValue" default-first-option placeholder="请选择项目" @change="productTypeChange">
								<el-option v-for="item in productTypesData" :key="item.id" :label="item.name" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item>
							<el-button type="primary" @click="appendBase">添加根目录</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-card class="full-table" shadow="never" :body-style="{ padding: '15px' }" style="margin-top: 8px;"  >
			<CategoryTree
				ref="categoryTreeRef"
				@edit="edit"
				@append="append"
				@delete="remove" 
				:updateAuth="updateAuth"
				:addAuth="updateAuth"
				:deleteAuth="deleteAuth" :height="'calc(100vh - 310px)'"
				style="border: 1px solid rgba(0,0,0,0.12);"
			/>

			<el-dialog v-model="isShowBaseDialog" :title="baseTitle" width="30%">
				<template #header>
					<div style="color: #fff">
						<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
							<ele-Edit />
						</el-icon>
						<span>{{ baseTitle }}</span>
					</div>
				</template>
				<el-form :model="ruleForm" ref="ruleBaseFormRef" :rules="rules">
					<el-form-item label="目录名称" label-width="80px" prop="categoryName">
						<el-input v-model="ruleForm.categoryName" autocomplete="off" />
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="isShowBaseDialog = false">取消</el-button>
						<el-button type="primary" @click="saveBaseCategoryInfo"> 保存 </el-button>
					</span>
				</template>
			</el-dialog>
			<el-dialog v-model="isShowDialog" :title="childrenTitle" width="30%">
				<template #header>
					<div style="color: #fff">
						<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
							<ele-Edit />
						</el-icon>
						<span>{{ childrenTitle }}</span>
					</div>
				</template>
				<el-form :model="ruleForm" ref="ruleFormRef" :rules="rules">
					<el-form-item v-if="!isEdit" label="上级目录" label-width="80px">
						{{ categoryParentLabel }}
					</el-form-item>
					<el-form-item label="目录名称" label-width="80px" prop="categoryName">
						<el-input v-model="ruleForm.categoryName" autocomplete="off" />
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="isShowDialog = false">取消</el-button>
						<el-button type="primary" @click="saveCategoryInfo"> 保存 </el-button>
					</span>
				</template>
			</el-dialog>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="base-category-index">
import { ref, onMounted, defineAsyncComponent, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { ProductCategorysApi } from '/@/api-services/api';
import type { FormRules } from 'element-plus';
import { useUserInfo } from '/@/stores/userInfo';
const CategoryTree = defineAsyncComponent(() => import('/@/components/tree/category.vue'));
const stores = useUserInfo();
const ruleBaseFormRef = ref();
const ruleFormRef = ref();
const categoryId = ref(-1);
const parentId = ref(0);
const categoryParentLabel = ref('');
const isShowDialog = ref(false);
const isShowBaseDialog = ref(false);
const baseTitle = ref('');
const childrenTitle = ref('');
const productTypesData = ref<any>([]);
const productTypesValue = ref<any>(null);
const addAuth = ref<boolean>(true);
const updateAuth = ref<boolean>(true);
const deleteAuth = ref<boolean>(true);
const isEdit = ref(false);
const ruleForm = ref<any>({ categoryName: '' });
const categoryTreeRef = ref();
const productTypeChange = async () => {
	loadAuth();
	await loadCategoryData();
};
const loadAuth = () => {
	addAuth.value = true; // stores.userInfos.authBtnList.some((v: string) => v === authAdd);
	updateAuth.value = true; // stores.userInfos.authBtnList.some((v: string) => v === authUpdate);
	deleteAuth.value = true; // stores.userInfos.authBtnList.some((v: string) => v === authDelete);
};
//自行删除非必填规则
const rules = ref<FormRules>({
	categoryName: [{ required: true, message: '请输入名称！', trigger: 'blur' }],
});
const loadProductTypes = async () => {
	var res = stores.productTypes;
	productTypesData.value = res.filter((m) => {
		return m.itemCode != '70001' && m.itemCode != '80001';
	});
	if (productTypesData.value.length > 0) {
		productTypesValue.value = productTypesData.value[0].itemCode;
		loadAuth();
		await loadCategoryData();
	}
};

interface Tree {
	id: number;
	label: string;
	type: number;
	parentId: number;
	children?: Tree[];
	fullName: '';
}

const edit = (data: Tree) => {
	isEdit.value = true;
	categoryId.value = data.id;
	if (data.parentId == 0) {
		baseTitle.value = '编辑根目录';
		isShowBaseDialog.value = true;
		ruleForm.value.categoryName = data.label;
	} else {
		childrenTitle.value = '编辑目录';
		isShowDialog.value = true;
		ruleForm.value.categoryName = data.label;
	}
};

const appendBase = () => {
	isEdit.value = false;
	baseTitle.value = '添加根目录';
	isShowBaseDialog.value = true;
	ruleForm.value.categoryName = '';
};
const append = (data: Tree) => {
	isEdit.value = false;
	childrenTitle.value = '添加目录';
	isShowDialog.value = true;
	parentId.value = data.id;
	categoryParentLabel.value = data.label;
	ruleForm.value.categoryName = '';
};
const saveBaseCategoryInfo = async () => {
	ruleBaseFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			if (!isEdit.value) {
				await getAPI(ProductCategorysApi).apiProductCategorysAddPost({
					categoryType: productTypesValue.value,
					name: ruleForm.value.categoryName,
				});
			} else {
				await getAPI(ProductCategorysApi).apiProductCategorysEditPut({
					id: categoryId.value,
					categoryType: productTypesValue.value,
					name: ruleForm.value.categoryName,
					ver: ruleForm.value.ver,
				});
			}
			isShowBaseDialog.value = false;
			await loadCategoryData();
			ruleForm.value.categoryName = '';
			categoryId.value = -1;
		}
	});
};
const saveCategoryInfo = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			if (!isEdit.value) {
				await getAPI(ProductCategorysApi).apiProductCategorysAddPost({
					categoryType: productTypesValue.value,
					name: ruleForm.value.categoryName,
					parentId: parentId.value,
					sortIndex: 0,
				});
			} else {
				await getAPI(ProductCategorysApi).apiProductCategorysEditPut({
					id: categoryId.value,
					categoryType: productTypesValue.value,
					name: ruleForm.value.categoryName,
					ver: ruleForm.value.ver,
				});
			}
			isShowDialog.value = false;
			await loadCategoryData();
			categoryParentLabel.value = '';
			ruleForm.value.categoryName = '';
			categoryId.value = -1;
		}
	});
};

const remove = (data: Tree) => {
	ElMessageBox.confirm(`确认要删除【${data.label}】目录吗?`, '系统提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			console.log(data);
			await getAPI(ProductCategorysApi).apiProductCategorysDeleteDelete({ id: data.id });
			ElMessage({
				type: 'success',
				message: '删除成功',
			});
			await loadCategoryData();
		})
		.catch(() => {});
};

// 页面加载时
onMounted(async () => {
	await loadProductTypes();
});
// 监听路由的变化，切换界面时，滚动条置顶
watch(
	() => categoryTreeRef.value,
	async () => {
		if(categoryTreeRef.value){
			await loadCategoryData();
		}
	}
);
const loadCategoryData = async () => {
	await categoryTreeRef.value?.Init(productTypesValue.value);
};
</script>
