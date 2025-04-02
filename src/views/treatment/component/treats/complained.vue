<template>
	<div class="sidebarpet">
		<el-card class="full-table" shadow="never" style="padding: 0px; height: 100%; border: 0px" :body-style="{ padding: '0px' }">
			<div slot="header" class="clearfix" style="background-color: var(--el-color-primary-light-8); height: 30px; border-radius: 3px 3px 0 0" v-show="$props.isNew">
				<p style="line-height: 30px; font-size: 14px; font-weight: 500; margin-left: 10px; float: left">主诉</p>
			</div>
			<el-form label-width="80px" label-suffix="：" style="padding: 10px" :class="{ 'overlay-disabled': $props.disabled }">
				<el-form-item label="主诉">
					<Editor
						mode="simple"
						style="width: 90%"
						:getHtml="props.treatData?.cemRecordZhuSu?.htmlZhuSu ?? ''"
						:isShow="!$props.isNew"
						@update:getText="updateZhuSuText"
						@update:getHtml="updateZhuSuHtml"
						:height="'120px'"
						@update:blur="save"
						@update:getAll="signalSave"
						:toolbarConfig="toolbarConfig"
						@btn:selectTemp="selectZhusuTemp"
						@btn:addTemp="addZhusuTemp"
					/>
				</el-form-item>
				<el-form-item label="既往史">
					<Editor
						style="width: 90%"
						:getHtml="props.treatData?.cemRecordZhuSu?.htmlPastHistory ?? ''"
						:height="'120px'"
						@update:blur="save"
						:isShow="!$props.isNew"
						@update:getText="updatePastHistoryText"
						@update:getHtml="updatePastHistoryHtml"
						:toolbarConfig="toolbarConfig"
						@update:get-all="signalPastHistorySave"
						@btn:selectTemp="selectpastHistoryTemp"
						@btn:addTemp="addpastHistoryTemp"
					/>
				</el-form-item>
				<el-form-item label="现病史">
					<Editor
						mode="simple"
						style="width: 90%"
						:getHtml="props.treatData?.cemRecordZhuSu?.htmlAllergyHistory ?? ''"
						:height="'120px'"
						@update:blur="save"
						:isShow="!$props.isNew"
						@update:getText="updateAllergyHistoryText"
						@update:getHtml="updateAllergyHistoryHtml"
						:toolbarConfig="toolbarConfig"
						@update:get-all="signalAllergyHistorySave"
						@btn:selectTemp="selectAllergyHistoryTemp"
						@btn:addTemp="addAllergyHistoryTemp"
					/>
				</el-form-item>
			</el-form>
		</el-card>
		<!-- @update:append="append" -->
		<TxtTemp ref="txtTempRef" :title="txtTitle"/>
		<TxtAddTemp ref="txtAddTempRef" :title="addTxtTitle"/>
	</div>
</template>

<script lang="ts" setup name="sidebarpet">
import { defineAsyncComponent, onMounted, ref, shallowRef, watch } from 'vue'; 
import { IToolbarConfig } from '@wangeditor/editor'; 
import { signalR } from '/@/views/cem/signalRCem'; 
import { ElMessage } from 'element-plus';
import other from '/@/utils/other';

// 引入组件
const Editor = defineAsyncComponent(() => import('/@/components/editor/index.vue')); 
const TxtTemp = defineAsyncComponent(() => import('/@/components/cemtemplate/txttemp/index.vue')); 
const TxtAddTemp = defineAsyncComponent(() => import('/@/components/cemtemplate/txttemp/add.vue')); 
const emit = defineEmits(['save', 'saveStatus']);
const txtTempRef = ref();
const txtTitle = ref('');
const txtAddTempRef = ref();
const addTxtTitle = ref('新增模板')
var props = defineProps({
	treatData: {
		type: Object,
		default: () => {},
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	isNew: {
		type: Boolean,
		default: false,
	},
});

watch(
	() => props.treatData,
	(newValue, oldValue) => {
		oldData.value = other.deepClone(newValue) as any;
	}
);

const oldData = ref<any>({ cemRecordZhuSu: {zhuSu:'',htmlZhuSu:'',pastHistory:'',htmlPastHistory:'',allergyHistory:'',htmlAllergyHistory:''} });

const toolbarConfig: Partial<IToolbarConfig> = {
	excludeKeys: ['group-image', 'group-video', 'fullScreen', 'insertLink', 'insertVideo', 'codeBlock'],
};

const save = (e:any) => {
	console.log("保存",e)
	emit('save', e);
};

const signalSave = async (val:any, html:any) => {
	if (oldData.value?.cemRecordZhuSu?.zhuSu !== val) { 
		await signalR
			.send('SaveZhuSu', val, html)
			.then(() => {
				emit('saveStatus', true);
			})
			.catch(function (err: any) {
				console.log(err);
			});

		oldData.value.cemRecordZhuSu.zhuSu = val;
		oldData.value.cemRecordZhuSu.htmlZhuSu = html;
		// oldData.value = Object.assign({},  oldData.value, {cemRecordZhuSu:{zhuSu: val,htmlZhuSu: html}});
	}
};

const updateZhuSuText = async (val:any) => {
  if (oldData.value?.cemRecordZhuSu?.zhuSu !== val)
		    emit('saveStatus', false);
      else
      emit('saveStatus', true);
	props.treatData.cemRecordZhuSu = Object.assign({}, props.treatData.cemRecordZhuSu, { zhuSu: val });
};

const updateZhuSuHtml = async (html:any) => { 
	props.treatData.cemRecordZhuSu = Object.assign({}, props.treatData.cemRecordZhuSu, { htmlZhuSu: html });
};

const signalPastHistorySave = async (val:any, html:any) => {
	if (oldData.value?.cemRecordZhuSu?.pastHistory !== val) { 
		await signalR
			.send('SaveZhuSuPastHistory', val, html)
			.then((_) => {
				emit('saveStatus', true);
			})
			.catch(function (err: any) {
				console.log(err);
			});

		oldData.value.cemRecordZhuSu.pastHistory = val;
		oldData.value.cemRecordZhuSu.htmlPastHistory = html;
		// oldData.value = Object.assign({},  oldData.value, {cemRecordZhuSu:{pastHistory: val,htmlPastHistory: html}});
	}
};
const updatePastHistoryText = async (val:any) => {
  if (oldData.value?.cemRecordZhuSu?.pastHistory !== val)
		    emit('saveStatus', false);
      else
      emit('saveStatus', true);
	props.treatData.cemRecordZhuSu = Object.assign({}, props.treatData.cemRecordZhuSu, { pastHistory: val });
};

const updatePastHistoryHtml = async (html:any) => {
	props.treatData.cemRecordZhuSu = Object.assign({}, props.treatData.cemRecordZhuSu, { htmlPastHistory: html });
};

const signalAllergyHistorySave = async (val:any, html:any) => {
	if (oldData.value?.cemRecordZhuSu?.allergyHistory !== val) {
		await signalR
			.send('SaveZhuSuAllergyHistory', val, html)
			.then((_) => {
				emit('saveStatus', true);
			})
			.catch(function (err: any) {
				console.log(err);
			});
		oldData.value.cemRecordZhuSu.allergyHistory = val;
		oldData.value.cemRecordZhuSu.htmlAllergyHistory = html;
		// oldData.value = Object.assign({},  oldData.value.cemRecordZhuSu, {allergyHistory: val,htmlAllergyHistory: html});
	}
};

const updateAllergyHistoryText = async (val:any) => {
	
  if (oldData.value?.cemRecordZhuSu?.allergyHistory !== val)
		    emit('saveStatus', false);
      else
      emit('saveStatus', true);
	props.treatData.cemRecordZhuSu = Object.assign({}, props.treatData.cemRecordZhuSu, { allergyHistory: val });
};

const updateAllergyHistoryHtml = async (html:any) => {
	props.treatData.cemRecordZhuSu = Object.assign({}, props.treatData.cemRecordZhuSu, { htmlAllergyHistory: html });
};

/**
 * 选择主诉模板
 */
const selectZhusuTemp = async()=>{
	txtTitle.value = '选择主诉模板';
	txtTempRef.value?.openDialog(0);
}

/**
 * 保存主诉模板
 */
 const addZhusuTemp = async()=>{
	if(props.treatData.cemRecordZhuSu.zhuSu)
	txtAddTempRef.value.openDialog(0,props.treatData.cemRecordZhuSu.zhuSu);
	else
	ElMessage.warning('请先输入主诉内容')
}

/**
 * 选择既往史模板
 */
 const selectpastHistoryTemp = async()=>{
	txtTitle.value = '选择既往史模板';
	txtTempRef.value?.openDialog(1);
}

/**
 * 保存既往史模板
 */
 const addpastHistoryTemp = async()=>{
	if(props.treatData.cemRecordZhuSu.pastHistory)
	txtAddTempRef.value.openDialog(1,props.treatData.cemRecordZhuSu.pastHistory);
	else
	ElMessage.warning('请先输入既往史内容')
}

/**
 * 选择现病史模板
 */
 const selectAllergyHistoryTemp = async()=>{
	txtTitle.value = '选择现病史模板';
	txtTempRef.value?.openDialog(2);
}

/**
 * 保存现病史模板
 */
 const addAllergyHistoryTemp = async()=>{
	if(props.treatData.cemRecordZhuSu.AllergyHistory)
	txtAddTempRef.value.openDialog(2,props.treatData.cemRecordZhuSu.AllergyHistory);
	else
	ElMessage.warning('请先输入现病史内容')
}


onMounted(async () => {});
</script>
<style scoped lang="scss">
.sidebarpet {
	.overlay-disabled {
		pointer-events: none;
	}
}
</style>
