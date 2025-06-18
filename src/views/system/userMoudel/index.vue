<template>
	<div class="usermoudel-container">
		<el-tabs v-model="activeName" type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0">
			<el-tab-pane label="系统用户" name="user">
				<User />
			</el-tab-pane>
			<el-tab-pane label="角色管理" name="role">
				<Role />
			</el-tab-pane>
			<el-tab-pane label="职位管理" name="pos">
				<Pos />
			</el-tab-pane> 
		</el-tabs>
	</div>
</template>

<script lang="ts" setup name="usermoudel">
import { ref, defineAsyncComponent, onMounted } from 'vue';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';
 
const User = defineAsyncComponent(() => import('/@/views/system/user/index.vue'));
const Role = defineAsyncComponent(() => import('/@/views/system/role/index.vue')); 
const Pos = defineAsyncComponent(() => import('/@/views/system/pos/index.vue')); 

const stores = useUserInfo();
const { sysSpecialSettings } = storeToRefs(stores);
const activeName = ref('user');
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
.usermoudel-container {
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
