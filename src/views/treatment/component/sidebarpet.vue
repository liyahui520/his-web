<template>
	<div class="sidebarpet-container">
		<el-form ref="ruleFormRef" size="default" label-width="0px">
			<el-form-item>
				<el-date-picker
					v-model="dates"
					:shortcuts="shortcuts"
					type="daterange"
					range-separator="-"
					:cell-class-name="cellClass"
					@change="petReload"
					:arrow-control="true"
					:clearable="false"
					@calendar-change="caledarChange"
					size="small"
					style="margin-bottom: 1px; width: 120px; padding: 0 3px"
				/>
				<el-checkbox v-model="checkMe" @change="isMeChange" border size="small">只看我</el-checkbox>
			</el-form-item>
		</el-form>
		<el-tabs class="pettab" :stretch="true" v-model="activeName">
			<el-tab-pane name="Pending" :label="'待诊疗(' + PendTreats.length + ')'" :style="iswindow ? 'height: calc(100vh - 160px);' : 'height: calc(100vh - 200px);'" v-loading="load">
				<div v-if="PendTreats.length > 0">
					<span v-for="i in PendTreats" :key="i.id" style="margin-bottom: 20px">
						<TreatPet linktitle="待诊疗" :data="i" :checkId="checkId" @reload="CheckInit" />
					</span>
				</div>
				<span v-else>
					<el-empty description="暂无待诊疗数据">
						<!-- <el-button type="warning" plain round>快速挂号</el-button> -->
					</el-empty>
				</span>
			</el-tab-pane>
			<el-tab-pane name="During"  :label="'诊疗中(' + InTreats.length + ')'" :style="iswindow ? 'height: calc(100vh - 160px);' : 'height: calc(100vh - 200px);'" v-loading="load">
				<div v-if="InTreats.length > 0">
					<span v-for="i in InTreats" :key="i.id" style="margin-bottom: 20px">
						<TreatPet linktitle="诊疗中" :data="i" @click.prevent="treatClick(i)" :checkId="checkId" @reload="petReload" />
					</span>
				</div>

				<span v-else>
					<el-empty description="暂无数据" />
				</span>
			</el-tab-pane>
			<el-tab-pane  name="Completed" :label="'已完成(' + EndTreats.length + ')'" :style="iswindow ? 'height: calc(100vh - 160px);' : 'height: calc(100vh - 200px);'" v-loading="load">
				<div v-if="EndTreats.length">
					<span v-for="i in EndTreats" :key="i.id" style="margin-bottom: 20px">
						<TreatPet :data="i" @click="treatClick(i)" :checkId="checkId" />
					</span>
				</div>
				<span v-else>
					<el-empty description="暂无已完成数据" />
				</span>
			</el-tab-pane>
		</el-tabs>
		<el-button class="Refresh" @click="Init" :icon="Refresh" title="刷新" type="primary" circle />
	</div>
</template>

<script lang="ts" setup name="sidebarpet">
import { defineAsyncComponent, nextTick, onMounted } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { RegistersApi } from '/@/api-services';
import { RegistersStatusEnum } from '/@/api-services/models/register-manage';
import { ref } from 'vue-demi';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { Refresh } from '@element-plus/icons-vue';
// 定义变量内容
const stores = useTagsViewRoutes();
const { isTagsViewCurrenFull, iswindow } = storeToRefs(stores);
const activeName = ref('Pending');
const emit = defineEmits(['select-item']);
// 引入组件
const TreatPet = defineAsyncComponent(() => import('./treatpet.vue'));

const PendTreats = ref<any>([]);
const InTreats = ref<any>([]);
const EndTreats = ref<any>([]);
const load = ref(false);
const checkId = ref<any>(null);
const checkMe = ref(true);
const ruleForm = ref({
	startTime: new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0),
	endTime: new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 23, 59, 59),
	isMe:true,
});
const dates = ref([
	new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0),
	new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 23, 59, 59),
]);

const shortcuts = [
	{
		text: '近一周',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			return [start, end];
		},
	},
	{
		text: '近两周',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
			return [start, end];
		},
	},
	{
		text: '近一个月',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			return [start, end];
		},
	},
];
const Init = async () => {
	load.value = true;
	let all = await getTreat();
	//待诊疗
	PendTreats.value = all.filter((obj) => obj.status == RegistersStatusEnum.PendTreat).sort((a,b)=>b.id-a.id); // await getTreat(RegistersStatusEnum.PendTreat);
	//诊疗中
	InTreats.value = all.filter((obj) => obj.status == RegistersStatusEnum.InTreat).sort((a,b)=>b.cemRecord?.id-a.cemRecord?.id);  // await getTreat(RegistersStatusEnum.InTreat);
	//诊疗完成
	EndTreats.value = all.filter((obj) => obj.status == RegistersStatusEnum.EndTreat).sort((a,b)=>b.updateTime?.id-a.updateTime?.id); // await getTreat(RegistersStatusEnum.EndTreat);
	
	load.value = false;
};

const CheckInit =async (data :any) => {
	await Init();
	if(data){ 
		let item=InTreats.value.filter(o=>(o.id == data.id))[0];
		await treatClick(item);
		activeName.value = "During";
	}
};

const petReload = async (row: any) => {
	await Init();
	if(row.id==checkId.value){
		let item=InTreats.value[0];
		await treatClick(item);
	}
	// 
};

const isMeChange = async ()=>{
	await Init();
}

const treatClick = async (item: any) => {
	await nextTick(async () => {
		checkId.value = item.id;
		emit('select-item', item);
	});
};

const cellClass = async (date) => {
	// console.log('date',date)
};

const caledarChange = async (dates) => {
	// console.log('dates',dates);
};

const getTreat = async () => {
	ruleForm.value.startTime = dates.value[0];
	ruleForm.value.endTime = dates.value[1];
	ruleForm.value.isMe = checkMe.value;
	let r = await getAPI(RegistersApi).apiRegistersGetPost(ruleForm.value);
	return r.data?.result ?? [];
};

onMounted(async () => {
	await Init();
});
</script>

<style scoped lang="scss">
.sidebarpet-container {
	height: 100%;

	margin-top: 0px !important;

	:deep(.el-tabs__item) {
		padding: 0 6px !important;
	}

	.Refresh {
		transition: width 0.5s;
		cursor: pointer;
		width: 30px;
		height: 30px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		top: 80%;
		margin-right: 16px;
		right: 20px;
		border: 0;
		padding: 4px 10px;
	}

	.el-tabs__content {
		height: calc(100vh - 0px) !important;
	}

	.pettab {
		height: calc(100vh - 160px);
		font-size: 12px;
		.el-tab-pane{
			overflow: auto;
			padding-bottom: 50px;
		}
	}
}
</style>
