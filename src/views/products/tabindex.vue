<template>
	<div class="base-container">
		<el-tabs v-model="activeName" type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0">
			<el-tab-pane label="商品管理" name="Products">
				<ProductDrug :productTypes="[10001, 20001, 140001, 150001]" />
			</el-tab-pane>
			<el-tab-pane label="洗美服务" name="Units"><ProductDrug :productTypes="[30001, 40001]" /></el-tab-pane>
			<el-tab-pane label="免疫驱虫" name="Brands"><ProductDrug :productTypes="[50001, 60001]" /></el-tab-pane>
			<el-tab-pane label="操作/处置" name="Units1"><ProductDrug :productTypes="[120001]" /></el-tab-pane>
			<!-- <el-tab-pane label="住院寄养" name="Units2" ><ProductDrug :productTypes="[70001,80001]"/></el-tab-pane> -->
			<el-tab-pane label="检验管理" name="Manufacturers"><ProductDrug :productTypes="[110001]" /></el-tab-pane>
			<el-tab-pane label="影像管理" name="Providers"><ProductDrug :productTypes="[90001, 100001, 130001]" /></el-tab-pane>
			<el-tab-pane label="挂号" name="Providers1"><Registers /></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts" setup name="productManage">
import { ref, defineAsyncComponent } from 'vue';
const ProductDrug = defineAsyncComponent(() => import('./index.vue'));
const Registers = defineAsyncComponent(() => import('/@/views/system/registers/index.vue'));
const activeName = ref('Products');
</script> 
<style lang="scss" scoped>
.base-container {
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

	// :deep(.el-tabs__header) {
	// 	margin: 0;
	// 	background-color: var(--next-bg-menuBarActiveColor) !important;
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