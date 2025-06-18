<template>
	<div class="store-container">
		<el-tabs v-model="activeName" type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0">
			<el-tab-pane label="入库管理" name="InStock"> <InStock /> </el-tab-pane>
			<el-tab-pane label="入库明细" name="InStockDetail"><InStockDetail /></el-tab-pane> 
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
	// :deep(.el-tabs__nav){
	//     border: 0px;
	//     margin-left: 10px;
	// }
	// :deep(.el-tabs__item){
	//     margin: 0px 10px !important;
	//     margin-left: 20px;
	//     background-color: var(--next-color-white) !important;
	//     border-radius:10px 10px 0 0;
	// }
	// :deep(.el-tabs--top .el-tabs__item.is-top:nth-child(2)){
	//     padding-left: 20px !important;
	// }
	// :deep(.el-tabs--top .el-tabs__item.is-top:last-child){
	//     padding-right: 20px !important;
	// }
	// :deep(.el-tabs__header){
	//     margin: 0;
	// }
	// :deep(.layout-parent > div:first-child .full-table .el-card__body){
	//      display: none !important;
	// }
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
