<template>
	<el-container class="cem-index-container">
		<el-aside class="sidebar" :width="sidebarWidth">
			<div class="sidebar-main" :style="{ width: sidebarWidth }">
				<el-card :body-style="{ padding: '5px', border: '0px' }" shadow="never">
					<!-- 侧边栏内容 -->
					<SidebarPet @select-item="selectItem" />
				</el-card>
				<el-button @click="toggleSidebar(isSidebarVisible)" :icon="isSidebarVisible ? DArrowLeft : DArrowRight" class="side-left"></el-button>
			</div>
		</el-aside>
		<el-container style="padding: 0px; margin: 0px; min-width: 1100px">
			<SeptIndex :data="rowData" ref="septIndexRef" v-show="isRecord" />
			<TreatHelp v-show="!isRecord" />
		</el-container>
	</el-container>
</template>

<script lang="ts" setup name="cemindex">
import { onMounted, ref, defineAsyncComponent, nextTick } from 'vue';
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';

const SidebarPet = defineAsyncComponent(() => import('/@/views/treatment/component/sidebarpet.vue'));
const SeptIndex = defineAsyncComponent(() => import('./components/cem.vue'));
const TreatHelp = defineAsyncComponent(() => import('./components/nocem.vue'));

const isSidebarVisible = ref(true);
const isRecord = ref(false);
const pcuload = ref(false);
const sidebarWidth = ref('280px');
const rowData = ref<any>({ id: -1 });

const septIndexRef = ref();

const stores1 = useUserInfo();
const { userInfos } = storeToRefs(stores1);
const toggleSidebar = (v) => {
	nextTick(() => {
		isSidebarVisible.value = !v;
		sidebarWidth.value = !v ? '280px' : '5px';
	});
};

const selectItem = async (row) => {
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

onMounted(async () => {});
</script>
<style scoped>
.cem-index-container {
	display: flex;
	min-width: 800px;
	width: 100%;
	height: 100%;

	.side-left {
		transition: width 0.5s;
		cursor: pointer;
		width: 16px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		top: 50%;
		margin-right: -36px;
		right: 20px;
		border: 0;
		color: #0f9bfc;
		background-color: var(--el-color-white);
		padding: 4px 10px;
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
