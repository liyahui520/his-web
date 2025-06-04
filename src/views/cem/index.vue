<template>
	<el-container class="cem-index-container">
		<el-aside class="sidebar" :width="sidebarWidth">
			<div class="sidebar-main" :style="{ width: sidebarWidth }">
				<el-card :body-style="{ padding: '5px', border: '0px' }" shadow="never">
					<!-- 侧边栏内容 -->
					<SidebarPet @select-item="selectItem" />
				</el-card>
				<el-button @click="toggleSidebar(isSidebarVisible)" :title="isSidebarVisible ? '隐藏' : '显示'" :icon="isSidebarVisible ? DArrowLeft : DArrowRight" class="side-left"></el-button>
			</div>
		</el-aside>
		<el-container style="padding: 0px; margin: 0px; min-width: 1100px">
			<SeptIndex :data="rowData" ref="septIndexRef" v-show="isRecord" />
			<TreatHelp v-show="!isRecord" />
		</el-container>
		<div v-if="loadCall" class="affix-container">
			<el-tooltip class="box-item" effect="light" content="开始叫号" placement="top-start">
				<el-affix position="bottom" :offset="20">
					<el-avatar :size="30" style="background-color: white" shape="square" :src="animal" @click="hanleCall" />
				</el-affix>
			</el-tooltip>
		</div>

		<Call v-if="loadCall" ref="callRef" />
	</el-container>
</template>

<script lang="ts" setup name="cemindex">
import { onMounted, ref, defineAsyncComponent, nextTick } from 'vue';
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';
import animal from '/@/assets/call.png';

const SidebarPet = defineAsyncComponent(() => import('/@/views/treatment/component/sidebarpet.vue'));
const SeptIndex = defineAsyncComponent(() => import('./components/cem.vue'));
const TreatHelp = defineAsyncComponent(() => import('./components/nocem.vue'));
const Call = defineAsyncComponent(() => import('./components/call.vue'));

const stores1 = useUserInfo();
const { userInfos, sysSpecialSettings } = storeToRefs(stores1);
const isSidebarVisible = ref(true);
const isRecord = ref(false);
const pcuload = ref(false);
const sidebarWidth = ref('280px');
const rowData = ref<any>({ id: -1 });
const loadCall = ref(false);
const callRef = ref(); //叫号组件
const septIndexRef = ref();

/**
 * 打开叫号
 */
const hanleCall = () => {
	//此处弹出右侧弹出抽屉
	callRef.value.openDrawer();
};
const toggleSidebar = (v: any) => {
	nextTick(() => {
		isSidebarVisible.value = !v;
		sidebarWidth.value = !v ? '280px' : '5px';
	});
};

const selectItem = async (row: any) => {
	pcuload.value = true;
	await nextTick(async () => {
		if (row.recordId) {
			isRecord.value = true;
			rowData.value = Object.assign({}, row, { ramdex: Date.now() });

			if (rowData.value?.cemRecord?.status === 2) await septIndexRef.value.TagVisitDoctor(false);
			else await septIndexRef.value.TagVisitDoctor(rowData.value?.cemRecord?.value?.visitDoctorId === userInfos.value.id);
		}
	});
	pcuload.value = false;
};

onMounted(async () => {
	for (let item of sysSpecialSettings.value) {
		if (item.type == 1 && item.isOpen == true) loadCall.value = true;
	}
});
</script>
<style scoped>
.cem-index-container {
	display: flex;
	min-width: 800px;
	width: 100%;
	height: 100%;
	.affix-container {
		position: fixed;
		right: 50px;
		bottom: 100px;
		z-index: 999;
		cursor: pointer;
	}
	.side-left {
		transition: width 0.5s;
		cursor: pointer;
		width: 16px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		top: 0%;
		margin-right: -36px;
		right: 22px;
		border: 0;
		color: #0f9bfc;
		background-color: var(--el-color-white);
		padding: 4px 10px;
		border-radius: 0px 18px 18px 0px;
		border: 1px solid var(--el-color-primary);
		border-left: 0px;
	}

	.side-left-close {
		transition: width 0.5s;
		cursor: pointer;
		width: 16px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		top: 50%;
		margin-left: -2px;
		right: -20px;
		color: #0f9bfc;
		background-color: var(--el-color-white);
	}
}

.sidebar {
	transition: width 0.5s;
	margin-right: 13px;
	margin-left: -10px;
}

.sidebar-main {
	position: absolute;
	transition: width 0.5s;
}

.main {
	flex: 1;
}
</style>
