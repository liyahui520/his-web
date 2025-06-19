<template>
	<div class="syssettingconfig-container">
		<el-tabs v-model="activeName" type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0">
			<el-tab-pane v-auth="'settings:customerbase'" label="会员宠物" name="pcupetConfig">
				<SysPcuPetConfig />
			</el-tab-pane>
			<el-tab-pane v-auth="'settings:businessparam'" label="业务参数" name="sysConfig">
				<SysOrgConfig />
			</el-tab-pane>
			<el-tab-pane v-auth="'settings:varietie'" label="宠物品种" name="petConfig">
				<PetConfig />
			</el-tab-pane>
			<el-tab-pane v-auth="'settings:cages'" label="笼位" name="cage">
				<cage ></cage>
			</el-tab-pane>
			<el-tab-pane v-auth="'settings:nurses'" label="护理" name="nurse">
				<nurse ></nurse>
			</el-tab-pane>
			<el-tab-pane v-auth="'settings:print'" label="打印机设置" name="printConfig">
				<SysPrintConfig />
			</el-tab-pane>
			<el-tab-pane v-auth="'settings:rooms'" label="诊室管理" name="rooms">
				<rooms ></rooms>
			</el-tab-pane>
			<el-tab-pane v-auth="'settings:devices'" label="设备管理" name="devices">
				<devices ref="devicesRef"></devices>
			</el-tab-pane>
			<el-tab-pane v-auth="'settings:devicebind'" v-if="loadCall" label="大屏设备绑定" name="bindDevicesConfig">
				<BindDevices />
			</el-tab-pane>
			<el-tab-pane v-auth="'sysRegisters:register'" label="挂号项目" name="registers">
				<registers ></registers>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts" setup name="syssettingconfig">
import { ref, defineAsyncComponent, onMounted } from 'vue';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';

const SysOrgConfig = defineAsyncComponent(() => import('./component/orgConfig.vue'));
const SysPcuPetConfig = defineAsyncComponent(() => import('./component/pcuPetConfig.vue'));
const SysPrintConfig = defineAsyncComponent(() => import('./component/printConfig.vue'));
const PetConfig = defineAsyncComponent(() => import('./syspetconfig/index.vue'));
const BindDevices = defineAsyncComponent(() => import('./callNumbers/bindDevices.vue'));
const cage = defineAsyncComponent(() => import('./cages/index.vue'));
const nurse = defineAsyncComponent(() => import('./nurses/index.vue'));
const rooms = defineAsyncComponent(() => import('./callNumbers/rooms.vue'));
const devices = defineAsyncComponent(() => import('./callNumbers/devices.vue'));
const registers = defineAsyncComponent(() => import('./registers/index.vue'));

const stores = useUserInfo();
const { sysSpecialSettings } = storeToRefs(stores);
const activeName = ref('pcupetConfig');
const loadCall = ref(false);
const loadPrint = ref(false);
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
