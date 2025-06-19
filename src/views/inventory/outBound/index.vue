<template>
	<div class="outBound-container">
		<el-tabs v-model="activeName" type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0"> 
			<el-tab-pane label="出库管理" name="OutStock"> <OutStock /> </el-tab-pane>
			<el-tab-pane label="出库明细" name="OutStockDetail"><OutStockDetail /></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts" setup name="outBound-container">
import { ref, defineAsyncComponent } from 'vue'; 
const OutStockDetail = defineAsyncComponent(() => import('/@/views/inventory/outBound/outBoundDetail/index.vue'));
const OutStock = defineAsyncComponent(() => import('/@/views/inventory/outBound/outBoundReceipt/index.vue'));
const activeName = ref('OutStock');
</script>
<style lang="scss" scoped name="outBound">
.outBound-container {
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
