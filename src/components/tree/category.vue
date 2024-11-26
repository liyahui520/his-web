<template>
	<div class="category">
		<el-tree-v2 :data="treeSource" @node-click="handleNodeClick" v-loading="loading"  :height="screenInfo.height - 300" :item-size="32" :highlight-current="true">
			<template #default="{ node }">
				<el-row :gutter="24" style="width: 100%">
					<el-col :span="4">
						<el-icon style="color: #b88230; font-size: 16px" v-if="!node.isLeaf"><FolderOpened /></el-icon>
						<el-icon style="color: #b88230; font-size: 16px" v-if="node.isLeaf"><Document /></el-icon>
						<span> {{ node.label }}</span></el-col
					>
					<el-col :span="8">
						<el-button type="success" :icon="Plus" v-auth="'customer:card:rancharge'" v-if="props.addAuth" title="新增" @click="addCatrgoey(node)" circle size="small" />
						<el-button type="warning" :icon="Edit" v-auth="'customer:card:rancharge'" v-if="props.updateAuth" title="修改" @click="editCatrgoey(node)" circle size="small" />
						<el-button type="danger" :icon="Delete" v-auth="'customer:card:rancharge'" v-if="props.deleteAuth" circle title="删除" @click="deleteCatrgoey(node)" size="small" />
					</el-col>
				</el-row>
			</template>
		</el-tree-v2>
	</div>
</template>
<script lang="ts" setup name="category">
import { reactive, ref, onMounted } from 'vue';
import { FolderOpened, Document } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductCategorysApi } from '/@/api-services/api';
import { Tree } from 'element-plus/es/components/tree-v2/src/types';
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
// 定义子组件向父组件传值/事件，pageChange-翻页事件，selectionChange-表格多选事件，可以在父组件处理批量删除/修改等功能，sortHeader-拖拽列顺序事件
const emit = defineEmits(['handleNodeClick','edit','append','delete']);
const loading = ref<boolean>(false);
const treeSource = ref<any>([]);
const typeCode = ref('');
const screenInfo = reactive({
	height: 0,
});

// 定义父组件传过来的值
const props = defineProps({
	// 搜索表单,type-控件类型（input,select,cascader,date）,options-type为selct时需传值，cascaderData,cascaderProps-type为cascader时需传值，属性同elementUI,cascaderProps不传则使用state默认。
	// 可带入comProps属性，和使用的控件属性对应
	categoryType: {
		type: String, //<TableSearchType>,
		default: '',
	},
	addAuth: {
		type: Boolean,
		default: false,
	},
	updateAuth: {
		type: Boolean,
		default: false,
	},
	deleteAuth: {
		type: Boolean,
		default: false,
	},
});
onMounted(() => {
	screenInfo.height = window.innerHeight;
	window.addEventListener('resize', handleResize);
});

const handleResize = () => {
	screenInfo.height = window.innerHeight;
};
const Init = async (categoryType) => {
	loading.value = true;
	let res = await getAPI(ProductCategorysApi).apiProductCategorysListPost({ categoryType: categoryType });
	treeSource.value = res.data?.result ?? [];
	// emit("handleNodeClick",null,typeCode);
	loading.value = false;
};

/**
 * 修改目录
 * @param d
 */
const editCatrgoey = async (d) => {
	emit('edit', d.data);
};

/**
 * 新增目录
 * @param d
 */
const addCatrgoey = async (d) => {
	emit('append', d.data);
};

/**
 * 删除目录
 * @param d
 */
const deleteCatrgoey = async (d) => {
	emit('delete', d.data);
};

const handleNodeClick = async (data: Tree) => {
	emit('handleNodeClick', data, typeCode);
};

//将属性或者函数暴露给父组件
defineExpose({ Init });
</script>

<style scoped></style>
