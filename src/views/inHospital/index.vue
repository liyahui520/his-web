<template>
	<div class="base-inhospitable-container">
		<el-tabs v-model="activeName" type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0">
			<el-tab-pane label="住院" name="inHospital">
				<inHospital v-show="activeName === 'inHospital'" ref="inHospitalRef"></inHospital>
			</el-tab-pane>
			<el-tab-pane label="留观" name="fosterCare">
				<fosterCare v-show="activeName === 'fosterCare'" ref="fosterCareRef"></fosterCare>
			</el-tab-pane>
			<!-- <el-tab-pane label="记录" name="records">
				<records v-show="activeName === 'records'" ref="recordsRef"></records>
			</el-tab-pane>
			<el-tab-pane label="笼位" name="cage">
				<cage v-show="activeName === 'cage'" ref="cageRef"></cage>
			</el-tab-pane>
			<el-tab-pane label="护理" name="nurse">
				<nurse v-show="activeName === 'nurse'" ref="nurseRef"></nurse>
			</el-tab-pane> -->
		</el-tabs>
	</div>
</template>

<script lang="ts" setup name="inHospital">
import { ref, onMounted ,defineAsyncComponent} from 'vue';

const inHospital = defineAsyncComponent(() => import('./component/inHospitals/index.vue'));
const fosterCare = defineAsyncComponent(() => import('./component/fosterCares/index.vue'));
// const cage = defineAsyncComponent(() => import('./component/cages/index.vue'));
// const nurse = defineAsyncComponent(() => import('./component/nurses/index.vue'));
// const records = defineAsyncComponent(() => import('./component/records/index.vue'));

const activeName = ref('inHospital');

const inHospitalRef= ref();
const fosterCareRef= ref();
// const recordsRef= ref();
// const cageRef= ref();
// const nurseRef= ref();

// 页面加载时
onMounted(async () => {});
</script>

<style lang="scss" scoped>
.base-inhospitable-container {
	
	// :deep(.el-tabs__header) {
	// 	margin: 0;
	// 	background-color: var(--next-bg-menuBarActiveColor) !important;
	// } 
	:deep(.el-tabs--border-card>.el-tabs__header){
	background-color:var(--next-bg-menuBarActiveColor) !important;
	padding: 0 !important;
}
:deep(.el-tabs){
	.el-tabs__content{
	background-color: var(--next-bg-main-color) !important;
	padding: 0px !important;
}

}

}
</style>
