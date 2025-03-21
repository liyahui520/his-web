<template>
	<div class="productgoods-container" :class="isTagsViewCurrenFull ? 'tab-cus-full-Content' : 'tab-cus-Content'">
		<el-card shadow="never" :body-style="{ paddingBottom: '0', border: '0px' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true" label-width="70px">
				<el-form-item label="产品类型">
					<el-radio-group v-model="productTypesValue" @change="productTypeChange">
						<el-radio-button v-for="item in productTypesData" :key="item.id" :label="item.name" :value="item.itemCode" />
					</el-radio-group>
				</el-form-item>
				<el-form-item label="目录" aria-invalid="true">
					<el-cascader ref="categoryRef" :props="carcerProp" :options="productCategorysData" filterable clearable @change="categoryChange">
						<template #default="{ node, data }">
							<span>{{ data.label }}</span>
							<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
						</template>
					</el-cascader>
				</el-form-item>
				<el-form-item label="名称">
					<el-input v-model="queryParams.name" clearable placeholder="请输入名称/通用名/缩写/英文名称" />
				</el-form-item>
				<el-form-item label="">
					<el-checkbox
						border
						label="可订"
						v-show="productTypesValue == '10001' || productTypesValue == '20001' || productTypesValue == '50001' || productTypesValue == '60001'"
						v-model="queryParams.canOrder"
					/>
					<el-checkbox border label="可销" v-model="queryParams.canSale" />
					<el-checkbox
						border
						label="可盘"
						v-show="productTypesValue == '10001' || productTypesValue == '20001' || productTypesValue == '50001' || productTypesValue == '60001'"
						v-model="queryParams.canCable"
					/>
					<el-checkbox border label="参与打折" v-model="queryParams.isDiscount" />
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'products:goods:query'"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="() => (queryParams = { canOrder: true, canSale: true, isDiscount: true })"> 重置 </el-button>
					</el-button-group>
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Plus" @click="openAddProductInfo" v-auth="'products:goods:add'"> 新增 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card class="full-table" shadow="never" :body-style="{ border: '0px' }" style="overflow: auto; margin-top: 8px;">
			<component :is="componentObject[productTypesValue]?.name" :productCategorysData="productCategorysData"> </component>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="productManage">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductCategorysApi } from '/@/api-services/api';
import mittBus from '/@/utils/newmitt';
import { useUserInfo } from '/@/stores/userInfo';

import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { storeToRefs } from 'pinia';
const storesTagsViewRoutes = useTagsViewRoutes();
const stores = useUserInfo();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
// 页面加载时
onMounted(async () => {
	await loadProductTypes();
});
var props = defineProps({
	productTypes: {
		type: Array,
		default: [] as any,
	},
});

const categoryRef = ref();
const productTypesData = ref<any>([]);
const productCategorysData = ref<any>([]);
const productTypesValue = ref<any>('');
const productCategoryLabel = ref('');
const queryParams = ref<any>({ name: '', categoryId: -1, canOrder: true, canSale: true });
const carcerProp = ref<any>({ checkStrictly: true });
const componentObject: { [key: string]: { name: any; add: () => void; query: () => void } } = {
	'10001': {
		name: defineAsyncComponent(() => import('./goods/index.vue')),
		add: () => {
			mittBus.emit('goodsAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('goodsQueryMthods', queryParams.value);
		},
	},
	'20001': {
		name: defineAsyncComponent(() => import('./drugs/index.vue')),
		add: () => {
			mittBus.emit('drugsAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('drugsQueryMthods', queryParams.value);
		},
	},
	'30001': {
		name: defineAsyncComponent(() => import('./cosmetologys/index.vue')),
		add: () => {
			mittBus.emit('cosmetologysAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('cosmetologysQueryMthods', queryParams.value);
		},
	},
	'40001': {
		name: defineAsyncComponent(() => import('./washs/index.vue')),
		add: () => {
			mittBus.emit('washsAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('washsQueryMthods', queryParams.value);
		},
	},
	'50001': {
		name: defineAsyncComponent(() => import('./defaunations/index.vue')),
		add: () => {
			mittBus.emit('defaunationsAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('defaunationsQueryMthods', queryParams.value);
		},
	},
	'60001': {
		name: defineAsyncComponent(() => import('./vaccines/index.vue')),
		add: () => {
			mittBus.emit('vaccinesAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('vaccinesQueryMthods', queryParams.value);
		},
	},
	//移除住院留观内容
	// "70001": {
	//     name: defineAsyncComponent(() => import('./hospitals/index.vue')),
	//     add: () => {
	//         mittBus.emit("hospitalsAddMthods", {
	//             categoryName: productCategoryLabel.value,
	//             categoryId: queryParams.value.categoryId
	//         });
	//     },
	//     query: () => {
	//         if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
	//         mittBus.emit("hospitalsQueryMthods", queryParams.value);
	//     }
	// },
	// "80001": {
	//     name: defineAsyncComponent(() => import('./fosters/index.vue')),
	//     add: () => {
	//         mittBus.emit("fostersAddMthods", {
	//             categoryName: productCategoryLabel.value,
	//             categoryId: queryParams.value.categoryId
	//         });
	//     },
	//     query: () => {
	//         if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
	//         mittBus.emit("fostersQueryMthods", queryParams.value);
	//     }
	// },
	'90001': {
		name: defineAsyncComponent(() => import('./bmodes/index.vue')),
		add: () => {
			mittBus.emit('bmodesAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('bmodesQueryMthods', queryParams.value);
		},
	},
	'100001': {
		name: defineAsyncComponent(() => import('./xrays/index.vue')),
		add: () => {
			mittBus.emit('xraysAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('xraysQueryMthods', queryParams.value);
		},
	},
	'110001': {
		name: defineAsyncComponent(() => import('./tests/index.vue')),
		add: () => {
			mittBus.emit('testsAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('testsQueryMthods', queryParams.value);
		},
	},
	'120001': {
		name: defineAsyncComponent(() => import('./disposals/index.vue')),
		add: () => {
			mittBus.emit('disposalsAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('disposalsQueryMthods', queryParams.value);
		},
	},
	'130001': {
		name: defineAsyncComponent(() => import('./microscopes/index.vue')),
		add: () => {
			mittBus.emit('microscopesAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('microscopesQueryMthods', queryParams.value);
		},
	},
	'140001': {
		name: defineAsyncComponent(() => import('./consumables/index.vue')),
		add: () => {
			mittBus.emit('consumablesAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('consumablesQueryMthods', queryParams.value);
		},
	},
	'150001': {
		name: defineAsyncComponent(() => import('./papers/index.vue')),
		add: () => {
			mittBus.emit('papersAddMthods', {
				categoryName: productCategoryLabel.value,
				categoryId: queryParams.value.categoryId,
			});
		},
		query: () => {
			if (!queryParams.value.categoryId) queryParams.value.categoryId = -1;
			mittBus.emit('papersQueryMthods', queryParams.value);
		},
	},
};
const productTypeObject = {};

const handleQuery = async () => {
	if (productTypesValue.value == null || productTypesValue.value == '') return;
	(componentObject as any)[(productTypeObject as any)[productTypesValue.value]].query();
};
const loadCategoryData = async () => {
	var res = await getAPI(ProductCategorysApi).apiProductCategorysListPost({ categoryType: productTypesValue.value as any });
	productCategorysData.value = res.data.result ?? [];
};
const productTypeChange = async () => {
	queryParams.value = { name: '', categoryId: -1, canOrder: true, canSale: true };
	productCategoryLabel.value = '';
	await loadCategoryData();
};
const loadProductTypes = async () => {
	productCategorysData.value = [];
	productCategoryLabel.value = '';
	queryParams.value.categoryId = -1;
	var res = stores.productTypes;
	var resultData = res ?? [];
	productTypesData.value = [];
	resultData.forEach((element: any) => {
		if (props.productTypes?.includes(element.itemCode) && !productTypesData.value.some((item: any) => item.itemCode === element.itemCode)) {
			productTypesData.value.push(element);
		}
		(productTypeObject as any)[element.itemCode] = element.itemCode;
	});
	if (productTypesData.value.length > 0) {
		productTypesValue.value = productTypesData.value[0].itemCode;
		await loadCategoryData();
	}
};
const categoryChange = async (e: any) => {
	const checkedNode = categoryRef.value.getCheckedNodes();
	queryParams.value.categoryId = checkedNode[0]?.data.id;
	productCategoryLabel.value = checkedNode[0]?.text; //获取当前点击节点的label值
};
const openAddProductInfo = async () => {
	// if (productCategoryLabel.value == null || productCategoryLabel.value == undefined || productCategoryLabel.value == '') {
	//     ElMessage.warning('请选择目录');
	//     return;
	// }
	(componentObject as any)[(productTypeObject as any)[productTypesValue.value]].add();
};
</script>
<style scoped lang="scss">
.btn-edit-bg {
	margin-left: 4px;
}
</style>
