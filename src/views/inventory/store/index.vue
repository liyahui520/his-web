<template>
	<div class="store-container">
		<el-tabs v-model="activeName" type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0">
			<el-tab-pane label="入库管理" name="InStock" v-auth="'inventory:instorage'"> <InStock /> </el-tab-pane>
			<el-tab-pane label="入库明细" name="InStockDetail" v-auth="'inventory:instoreitem'"><InStockDetail /></el-tab-pane> 
		</el-tabs>
	</div>
</template>

<script lang="ts" setup name="store-container">
import { ref, defineAsyncComponent } from 'vue'; 

const InStockDetail = defineAsyncComponent(() => import('/@/views/inventory/store/storeDetail/index.vue'));
const InStock = defineAsyncComponent(() => import('/@/views/inventory/store/storeReceipt/index.vue')); 
const activeName = ref('InStock');
</script>
<style lang="scss" scoped name="store">
.store-container {
	:deep(.el-tabs--border-card > .el-tabs__header) {
		background-color: var(--next-bg-menuBarActiveColor) !important;
		padding: 0 !important;
	}
	:deep(.el-tabs) {
		.el-tabs__content {
			background-color: var(--next-bg-main-color) !important;
			padding: 0px !important;
		}
	}
}
</style>
