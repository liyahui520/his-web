<template> 
		<div class="syssettingconfig-container">
			<el-tabs v-model="activeName" type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0">
				<el-tab-pane label="会员宠物" name="pcupetConfig">
					<SysPcuPetConfig />
				</el-tab-pane>
				<el-tab-pane label="业务参数" name="sysConfig">
					<SysOrgConfig />
				</el-tab-pane>
				<el-tab-pane label="宠物品种" name="petConfig">
					<PetConfig />
				</el-tab-pane>
				<el-tab-pane label="打印机设置" name="printConfig">
					<SysPrintConfig />
				</el-tab-pane>
			</el-tabs>
		</div> 
</template>

<script lang="ts" setup name="syssettingconfig">
import { ref, defineAsyncComponent } from 'vue';

const SysOrgConfig = defineAsyncComponent(() => import('./component/orgConfig.vue'));
const SysPcuPetConfig = defineAsyncComponent(() => import('./component/pcuPetConfig.vue'));
const SysPrintConfig = defineAsyncComponent(() => import('./component/printConfig.vue'));
const PetConfig = defineAsyncComponent(() => import('/@/views/system/syspetconfig/index.vue')); 

const activeName = ref('pcupetConfig');
</script>
<style lang="scss" scoped>
.syssettingconfig-container {
	:deep(.el-tabs--border-card > .el-tabs__header) {
		background-color: var(--next-bg-menuBarActiveColor) !important;
		padding: 0 !important;
	}
	:deep(.el-tabs) {
		.el-tabs__content {
			background-color: var(--next-bg-main-color) !important;
			padding: 0px !important;
			overflow: auto;
		}
	}
}
</style>
