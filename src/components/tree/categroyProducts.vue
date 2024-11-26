<template>
	<el-tree-v2
		:data="treeSource"
		@node-click="handleNodeClick"
		v-loading="loading"
		style="min-width: 150px"
		:height="screenInfo.height - props.height"
		:item-size="32"
		:props="{ children: 'childrenTree' }"
		:highlight-current="true"
	>
		<template #default="{ node, data }">
			<el-row :gutter="24" style="width: 100%" :title="node.data.isPro ? node.label : ''">
				<el-col :span="4">
					<el-icon style="color: #b88230; font-size: 16px" v-if="!node.isLeaf && !node.data.isPro">
						<FolderOpened />
					</el-icon>
					<el-icon style="color: #b88230; font-size: 16px" v-if="node.isLeaf && !node.data.isPro">
						<Document />
					</el-icon>
					<el-icon style="color: var(--el-color-primary); font-size: 16px" v-if="node.data.isPro">
						<Coin />
					</el-icon>
					<span>{{ node.label }}</span>
				</el-col>
				<el-col :span="8">
					<el-button type="success" :icon="Plus" v-if="addAuth" title="新增" @click="addCatrgoey(node)" circle size="small" />
					<el-button type="warning" :icon="Edit" v-if="updateAuth" title="修改" @click="editCatrgoey(node)" circle size="small" />
					<el-button type="danger" :icon="Delete" v-if="deleteAuth" circle title="删除" @click="deleteCatrgoey(node)" size="small" />
				</el-col>
			</el-row>
		</template>
	</el-tree-v2>
</template>
<script lang="ts" setup name="categroyProducts">
import { reactive, ref, onMounted } from 'vue';
import { FolderOpened, Document } from '@element-plus/icons-vue';
import { Delete, Edit, Plus, Coin } from '@element-plus/icons-vue';
// 定义子组件向父组件传值/事件，pageChange-翻页事件，selectionChange-表格多选事件，可以在父组件处理批量删除/修改等功能，sortHeader-拖拽列顺序事件
const emit = defineEmits(['handleNodeClick', 'edit', 'append', 'delete']);
const loading = ref<boolean>(false);
const treeSource = ref<any>([]);

let numTime = 0;
const screenInfo = reactive({
	height: 0,
});

onMounted(() => {
	screenInfo.height = window.innerHeight;
	window.addEventListener('resize', handleResize);
});

const handleResize = () => {
	screenInfo.height = window.innerHeight;
};

// 定义父组件传过来的值
const props = defineProps({
	//获取数据的方法，由父组件传递
	getData: {
		type: Function,
		required: true,
	},
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
	height: {
		type: Number,
		default: 320,
	},
});
const handleList = async (e) => {
	loading.value = true;
	const res = await props.getData(e);
	treeSource.value = res;
	loading.value = false;
};

// 树形菜单点击事件
const handleNodeClick = (v) => {
	numTime++;
	setTimeout(function () {
		if (numTime === 1) {
			// todo 单击的逻辑
		}
		if (numTime === 2) {
			// todo 双击的逻辑 一般双击只用到这个, 其他两个条件直接去掉就行
			if (v.isPro) {
				emit('handleNodeClick', v.product);
			}
		}
		numTime = 0;
	}, 200);
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


// 页面加载时
onMounted(async () => {
	handleList(1);
});


//将属性或者函数暴露给父组件
defineExpose({ handleList });
</script>

<style scoped></style>
