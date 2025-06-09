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
				<el-tab-pane v-if="loadPrint" label="打印机设置" name="printConfig">
					<SysPrintConfig />
				</el-tab-pane>
				<el-tab-pane v-if="loadCall" label="大屏设备绑定" name="bindDevicesConfig">
					<BindDevices />
				</el-tab-pane>
			</el-tabs>
		</div> 
</template>

<script lang="ts" setup name="syssettingconfig">
import { ref, defineAsyncComponent,onMounted } from 'vue';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';

const SysOrgConfig = defineAsyncComponent(() => import('./component/orgConfig.vue'));
const SysPcuPetConfig = defineAsyncComponent(() => import('./component/pcuPetConfig.vue'));
const SysPrintConfig = defineAsyncComponent(() => import('./component/printConfig.vue'));
const PetConfig = defineAsyncComponent(() => import('/@/views/system/syspetconfig/index.vue')); 
const BindDevices = defineAsyncComponent(() => import('/@/views/system/callNumbers/bindDevices.vue')); 

const stores = useUserInfo();
const { sysSpecialSettings } = storeToRefs(stores);
const activeName = ref('pcupetConfig');
const loadCall=ref(false);
const loadPrint=ref(false);
onMounted(async () => {
	for (let item of sysSpecialSettings.value) {
		if (item.type == 0 && item.isOpenSpecial == true) loadPrint.value = true;
		if (item.type == 1 && item.isOpenSpecial == true) loadCall.value = true;
	}
});
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
