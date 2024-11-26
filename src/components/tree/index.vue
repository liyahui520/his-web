<template>
	<div>
		<el-card shadow="always" >
			<el-select v-model="typeCode" @change="Init" class="m-2">
				<el-option v-for="item in productTypesData" :key="item.itemCode" :label="item.name" :value="item.itemCode" />
			</el-select>
			<el-divider />
			<el-tree-v2 :data="treeSource" @node-click="handleNodeClick" v-loading="loading" :height="screenInfo.height - 250" :highlight-current="true">
				<template #default="{ node }">
					<el-icon style="color: #b88230; font-size: 16px" v-if="!node.isLeaf"><FolderOpened /></el-icon>
					<el-icon style="color: #b88230; font-size: 16px" v-if="node.isLeaf"><Document /></el-icon>
					<span> {{ node.label }}</span>
				</template>
			</el-tree-v2>
		</el-card>
	</div>
</template>
<script lang="ts" setup name="customerTree">
import { reactive, ref, onMounted } from 'vue';
import { FolderOpened, Document } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductCategorysApi } from '/@/api-services/api';
import { useUserInfo } from '/@/stores/userInfo';

const stores = useUserInfo();
// 定义子组件向父组件传值/事件，pageChange-翻页事件，selectionChange-表格多选事件，可以在父组件处理批量删除/修改等功能，sortHeader-拖拽列顺序事件
const emit = defineEmits(['handleNodeClick']);
const loading = ref<boolean>(false);
const treeSource = ref<any>([]);
const productTypesData = ref<any>([]);
const typeCode = ref<any>('');

const screenInfo = reactive({
	height: 0,
});

onMounted(async () => {
	screenInfo.height = window.innerHeight;
	window.addEventListener('resize', handleResize);
	await loadProductTypes();
});

const handleResize = () => {
	screenInfo.height = window.innerHeight;
};
const Init = async () => {
	loading.value = true;
	let res = await getAPI(ProductCategorysApi).apiProductCategorysListPost({ categoryType: typeCode.value });
	treeSource.value = res.data?.result ?? [];
	emit('handleNodeClick', null, typeCode);
	loading.value = false;
};

//查询产品类型
const loadProductTypes = async () => {
	var res = stores.productTypes ?? [];
	productTypesData.value = res.filter((m) => m.canInStorage == true);

	if (productTypesData.value.length > 0) {
		typeCode.value = productTypesData.value[0]?.itemCode;
		await Init();
	}
};

const handleNodeClick = async (data: any) => {
	emit('handleNodeClick', data, typeCode);
};
</script>

<style scoped></style>
