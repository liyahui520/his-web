<template>
	<div class="base-container">
		<el-tabs v-model="activeName" type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0">
			<el-tab-pane label="目录管理" name="CategoryMan">
				<CategoryView ref="CategoryViewRef" />
			</el-tab-pane>
			<el-tab-pane label="单  位" name="Units"><Units ref="UnitsRef" /></el-tab-pane>
			<el-tab-pane label="品  牌" name="Brands"><Brands ref="BrandsRef" /></el-tab-pane>
			<el-tab-pane label="生产商" name="Manufacturers"><Manufacturers ref="ManufacturersRef" /></el-tab-pane>
			<el-tab-pane label="供应商" name="Providers"><Providers ref="ProvidersRef" /></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts" setup name="base">
import { ref, defineAsyncComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';

const CategoryView = defineAsyncComponent(() => import('/@/views/products/categorys/index.vue'));
const Units = defineAsyncComponent(() => import('/@/views/products/units/index.vue'));
const Brands = defineAsyncComponent(() => import('/@/views/products/brands/index.vue'));
const Manufacturers = defineAsyncComponent(() => import('/@/views/products/manufacturers/index.vue'));
const Providers = defineAsyncComponent(() => import('/@/views/products/providers/index.vue'));
const activeName = ref('CategoryMan');
const CategoryViewRef=ref();
const UnitsRef=ref();
const BrandsRef=ref();
const ManufacturersRef=ref();
const ProvidersRef=ref();
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
