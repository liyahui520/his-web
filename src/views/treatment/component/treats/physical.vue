<template>
	<div class="physical">
		<el-card class="full-table" shadow="never" style="padding: 0px; height: 100%; border: 0px" :body-style="{ padding: '0px', height: '100%' }">
			<div slot="header" class="clearfix" style="background-color: var(--el-color-primary-light-8); height: 30px; border-radius: 3px 3px 0 0" v-show="$props.isNew">
				<p style="line-height: 30px; font-size: 14px; font-weight: 500; margin-left: 10px; float: left">体格检查</p>
			</div>
			<div class="diagnosis-info" style="padding: 10px">
				<!-- 顶部table -->
				<div class="table-info">
					<div class="table-time">
						<el-date-picker v-model="inspection_time" :clearable="false" type="datetime" placeholder="选择日期时间"> </el-date-picker>
						<span class="time-desc">更换时间</span>
					</div>
					<div class="table-info-list">
						<div class="table-info-item" v-for="(item, index) in tableList" :key="index" :class="{ 'overlay-disabled': disabled }">
							<div>
								{{ item.title }}
								<i v-if="item.type == 'change'" class="iconfont icon-gantanhao" style="color: #f76c0d; cursor: pointer; margin-left: 3px"></i>
							</div>
							<el-select v-model="item.value" filterable placeholder="" @change="signalSave" v-if="item.type == 'change'" class="info-item-select">
								<el-option v-for="tagList in item.tag" :key="tagList" :label="tagList" :value="tagList"> </el-option>
							</el-select>
							<div v-else-if="item.type == 'string'">
								<input class="clear-number-style" @change="signalSave" style="text-align: center; padding-top: 2px" v-model="item.value" maxlength="10" @input="inputValuePhysical(item, $event)" />
							</div>
							<div v-else>
								<input class="clear-number-style" style="text-align: center; padding-top: 2px" v-model.number="item.value" type="number" max="99999" @input="inputValuePhysical(item, $event)" />
							</div>
						</div>
					</div>
				</div>

				<!-- icon 菜单 -->
				<div class="icon-info">
					<div v-for="(item, index) in iconList" :key="index">
						<div class="icon-info-list">
							<div :class="[active.typeId == item.typeId ? 'active-icon' : '', 'info-list-icon']">
								<img :src="active.typeId == item.typeId ? item.typeCheckedIcon : item.typeIcon" @click="changeIcon(item)" />
								<div>{{ item.typeName }}</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 主要选择项 -->
				<div class="active-name" :class="{ 'overlay-disabled': disabled }">
					<div style="margin-top: 5px">{{ active?.typeName }}:</div>
					<div class="input-info">
						<div class="input-info-no" v-if="iconList.length">
							<!-- <input type="checkbox" v-model="iconList[iconList.map(item => item.id).indexOf(active.id)].value" @change="changeAllCheck(iconList[iconList.map(item => item.id).indexOf(active.id)].value)"/>
            <span>未见明显异常</span> -->
							<!-- {{ iconList[iconList.map(item => item.typeId).indexOf(active.typeId)] }}
            {{ iconList.map(item => item.typeId) }}
            {{ iconList.map(item => item.typeId).indexOf(active.typeId)}} -->
							<el-checkbox
								v-model="iconList[iconList.map((item) => item.typeId).indexOf(active.typeId)].isNormal"
								@change="changeAllCheck(iconList[iconList.map((item) => item.typeId).indexOf(active.typeId)].isNormal)"
								>未见明显异常
							</el-checkbox>
						</div>
						<div class="input-info-list">
							<div v-for="(inputItemObjData, choiceIndexKey) in inputItem" :key="choiceIndexKey">
								<el-row>
									<el-col :span="5" :md="11" :lg="11" :xl="5" v-for="choiceItem in inputItemObjData" :key="choiceItem.physicalExamItemId" class="input-group">
										<div v-if="choiceItem.valueType == 0" class="input-checkbox">
											<!-- <input type="checkbox" v-model="choiceItem.value" @change="changeCheckBox(choiceItem.value, choiceItem)"/>
                    <span>{{choiceItem.name}}</span> -->
											<el-checkbox v-model="choiceItem.resultValue" :true-value="'true'" @change="changeCheckBox(choiceItem.resultValue, choiceItem)">
												{{ choiceItem.name }}
											</el-checkbox>
										</div>
										<div v-if="choiceItem.valueType == 1" class="input-select">
											<span>{{ choiceItem.name }} </span>
											<el-select v-model="choiceItem.resultValue" @change="changeSelect(choiceItem.resultValue, choiceItem, 'select')" placeholder="">
												<el-option v-for="(itemOption, index) in choiceItem.options" :key="index" :label="itemOption.optionName" :value="itemOption.optionName"></el-option>
											</el-select>
										</div>
										<div v-if="choiceItem.valueType == 2" class="input-text">
											<span>
												<span>{{ choiceItem.name }}</span>
												<!-- <el-tooltip effect="dark" content="点击评分系统后直接弹窗勾选内容" placement="top"
                                      v-if="(active.typeId == 6 || active.typeName == '皮肤检查') && choiceItem.id == 120"
                          >
                            <i class="el-icon-warning itching-tips" style="cursor: pointer;"
                               @click="showDogSkinValue(choiceItem.value, choiceItem, 'input')"
                            />
                          </el-tooltip> -->
											</span>
											<div class="input-text-div">
												<!-- <input v-if="(active.typeId == 6 || active.typeName == '皮肤检查') && choiceItem.physicalExamItemId == 120" type="text"
                             v-model="choiceItem.value" @focus="showDogSkinValue(choiceItem.value, choiceItem, 'input')"
                      /> -->
												<input maxlength="599" type="text" v-model="choiceItem.resultValue" @blur="changeSelect(choiceItem.resultValue, choiceItem, 'input')" />
											</div>
											<!-- <span class="score-hight-text" v-if="showItchingTig"> 瘙痒评分大于40分，立即止痒！ </span> -->
										</div>

										<div v-if="choiceItem.valueType == 3" class="input-multiple">
											<span>{{ choiceItem.name }}</span>
											<el-select placeholder="" v-model="choiceItem.resultValue" multiple @change="changeSelect(choiceItem.resultValue, choiceItem, 'multiple')">
												<el-option v-for="(itemOption, index) in choiceItem.options" :key="index" :label="itemOption.option_name" :value="itemOption.option_name"></el-option>
											</el-select>
										</div>
									</el-col>
								</el-row>
								<!-- <div v-if="choiceIndexKey == 0 && showItchingTig">
                <el-image
                  style="width: 601px; height: 210px"
                  :src="require('@/assets/doctor-work-mgt/dog-skin/find-problem-img.png')"
                  fit="fit"
                />
              </div> -->
							</div>
						</div>
					</div>
				</div>

				<!-- 已选缺陷概览 -->
				<div class="inspect-data">
					<div v-for="(value, key) in inspectData" :key="key">
						<span class="inspect-data-title">{{ key }} : </span>
						<div class="inspect-data-tag">
							<el-tag
								:style="item.name == '其他' ? { whiteSpace: 'normal', wordBreak: 'break-all', marginRight: '10px', marginBottom: '10px' } : { marginRight: '10px', marginBottom: '10px' }"
								v-for="item in value"
								:key="item.id"
								:closable="!$props.disabled"
								@close="deleteTag(item, key)"
								:disable-transitions="false"
							>
								{{ item.name }} {{ item.resultValue === 'true' ? '' : ': ' + item.resultValue }}
							</el-tag>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="physical">
import { defineAsyncComponent, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { CEMRecordApi, PhysicalItemsApi } from '/@/api-services';
import { signalR } from '/@/views/cem/signalRCem';
// 引入组件

const selectionRows = ref([]);
const oldSelectionRows = ref([]);

let inspection_time = new Date();
const tableList = ref([
	{
		title: '体重（kg）',
		value: '',
		key: 'petWeight',
	},
	{
		title: '体温（°C）',
		value: '',
		key: 'temperature',
	},
	{
		title: '心率（次/分）',
		value: '',
		key: 'heartRate',
	},
	{
		title: '呼吸频率（次/分）',
		value: '',
		key: 'respiratoryRate',
	},
	{
		title: 'BCS评分',
		value: undefined,
		tag: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		type: 'change',
		key: 'bcs',
	},
	{
		title: 'CRT（秒）',
		value: '',
		key: 'crt',
		type: 'string',
	},
]);
let iconList: any = ref([]);
let active: any = ref({
	typeId: 1,
});
let inspectData: any = ref({});
let inputItem: any = ref({});
const emit = defineEmits(['loadMain']);
var props = defineProps({
	treatData: {
		type: Object,
		default: {
			cemRecordPhysical: {
				recordId: 0,
				regId: 0,
				petWeight: 1.0,
				temperature: 0,
				respiratoryRate: 0,
				heartRate: 0,
				bcs: '',
				crt: 0,
			},
			id: 0,
		} as any,
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

const state = reactive<TableRulesState>({
	isDisabled: false,
	isHidden: false,
	isEdit: true,
	tableData: {
		types: [] as any,
	},
});
watch(
	() => props.treatData,
	(newValue, oldValue) => {
		// 监听父页面选择的病例变化触发初始化
		Init(newValue);
	}
); 

watch(
	() =>inspectData,
	(newValue, oldValue) => {
		// 监听父页面选择的病例变化触发初始化
		console.log(newValue)
	},{deep:true}
)


const inputValuePhysical = async (item, $event) => {
	if (item.value === '') {
		return;
	}
	// crt 什么都可以输入
	if (item.type == 'string') {
		item.value = $event.target.value;
		return;
	}
	if (item.key !== 'weight' && item.key !== 'temperature') {
		item.value = Number($event.target.value.replace(/\D+/, ''));
	}
	if (item.value > 9999) {
		item.value = 9999;
	}
	if (item.value < 0) {
		item.value = 0;
	}
	signalSave();
};
const changeAllCheck = (val) => {
	// val 是true的时候 取消下面所有选择  &&  删除下面tag
	if (val || val == 'true') {
		let indexOfId = iconList.value.map((item) => item.typeId).indexOf(active.value.typeId);
		for (let i = 0; i < iconList.value[indexOfId].items.length; i++) {
			iconList.value[indexOfId].items[i].resultValue = '';
		}
		delete inspectData.value[active.value.typeName];
	}
	signalSave();
};
// 点击checkBox的框
const changeCheckBox = (val, item) => {
	console.log('初始化checkBox', item);
	// 新增
	if (val || val == 'true') {
		// 判断这个对象里面有这个值
		if (inspectData.value[active.value.typeName]) {
			inspectData.value[active.value.typeName].push(item);
		} else {
			inspectData.value[active.value.typeName] = [item];
		}
		// 如果选中的无异常  无异常变为false
		if (iconList.value[iconList.value.map((item) => item.typeName).indexOf(active.value.typeName)].isNormal) {
			iconList.value[iconList.value.map((item) => item.typeName).indexOf(active.value.typeName)].isNormal = false;
		}
	} else {
		// 删除
		deleteInspectData(item, active.value.typeName);
	}
	signalSave();
};
// 点击select的框
const changeSelect = (val, item, type) => {
	if (type == 'multiple' && Array.isArray(val)) {
		if (val.length == 0) {
			val = false;
		}
	}
	// 新增
	if (val) {
		// 判断这个对象里面有这个值
		if (inspectData.value[active.value.typeName]) {
			// 如果有这个值的话 就改变
			let indexOfName = inspectData.value[active.value.typeName].map((itemData) => itemData.physicalExamItemId).indexOf(item.physicalExamItemId);
			if (indexOfName !== -1) {
				inspectData.value[active.value.typeName][indexOfName] = item;
			} else {
				inspectData.value[active.value.typeName].push(item);
			}
		} else {
			inspectData.value[active.value.typeName] = [item];
		}
		// 如果选中的无异常  无异常变为false
		if (iconList.value[iconList.value.map((item) => item.typeName).indexOf(active.value.typeName)].isNormal) {
			iconList.value[iconList.value.map((item) => item.typeName).indexOf(active.value.typeName)].isNormal = false;
		}
	} else {
		// 删除
		deleteInspectData(item, active.value.typeName);
	}
	signalSave();
};

// 点击删除tag
const deleteTag = (item, activeName) => {
	let nameIndexOf = iconList.value.map((item) => item.typeName).indexOf(activeName);
	for (let i = 0; i < iconList.value[nameIndexOf].items.length; i++) {
		if (iconList.value[nameIndexOf].items[i].physicalExamItemId == item.physicalExamItemId) {
			iconList.value[nameIndexOf].items[i].resultValue = '';
			break;
		}
	}

	deleteInspectData(item, activeName);
	signalSave();
};
// 删除下面tag数据
const deleteInspectData = (item, activeName) => {
	if (!inspectData.value[activeName]) {
		return;
	}
	// 如果操作的在inspectData这个里面没有 直接返回
	if (inspectData.value[activeName].map((item) => item.physicalExamItemId).indexOf(item.physicalExamItemId) == -1) {
		return;
	}
	inspectData.value[activeName].splice(inspectData.value[activeName].map((item) => item.physicalExamItemId).indexOf(item.physicalExamItemId), 1);
	if (inspectData.value[activeName].length == 0) {
		delete inspectData.value[activeName];
		// 勾中全部无异常
		iconList.value[iconList.value.map((item) => item.typeName).indexOf(activeName)].isNormal = true;
	}
	signalSave();
};
const save = async () => {
	// let p = Object.assign({}, props.treatData?.cemRecordPhysical, {cemRecordPhysicalDetails: selectionRows.value}, {
	//   recordId: props.treatData.id,
	//   regId: props.treatData.regId
	// })

	// 赋值到要提交的对象

	state.tableData.inspection_time = inspection_time;
	for (let i = 0; i < tableList.value.length; i++) {
		state.tableData[tableList.value[i].key] = tableList.value[i].value;
	}
	for (let i = 0; i < state.tableData.types.length; i++) {
		for (let w = 0; w < state.tableData.types[i].items.length; w++) {
			state.tableData.types[i].items[w].result.result = state.tableData.types[i].items[w].resultValue;
		}
	}
	// console.log(state.tableData)
	// return
	// if (p.id > 0) {
	//   await getAPI(CEMRecordApi).apiCEMRecordIdEditCemPhysicalPut(p.id, p);
	// } else {
	//   await getAPI(CEMRecordApi).apiCEMRecordAddCemPhysicalPost(p);
	// }
	// emit('loadMain', Object.assign(props.treatData, {recordId: props.treatData.id}))
	await getAPI(PhysicalItemsApi).apiPhysicalExamDetailPut(state.tableData);
};

const saveData = async () => {
	state.tableData.inspection_time = inspection_time;
	for (let i = 0; i < tableList.value.length; i++) {
		state.tableData[tableList.value[i].key] = tableList.value[i].value;
	}
	for (let i = 0; i < state.tableData.types.length; i++) {
		for (let w = 0; w < state.tableData.types[i].items.length; w++) {
			state.tableData.types[i].items[w].result.result = state.tableData.types[i].items[w].resultValue;
		}
	}
	Object.assign(props.treatData, { cemRecordPhysical: state.tableData });
};

const signalSave = async () => {
	state.tableData.inspection_time = inspection_time;
	for (let i = 0; i < tableList.value.length; i++) {
		state.tableData[tableList.value[i].key] = tableList.value[i].value;
	}
	for (let i = 0; i < state.tableData.types.length; i++) {
		for (let w = 0; w < state.tableData.types[i].items.length; w++) {
			state.tableData.types[i].items[w].result.result = state.tableData.types[i].items[w].resultValue;
		}
	}
	await signalR
		.send('SavePhysical', state.tableData)
		.then(() => { 
		})
		.catch(function (err: any) {
			console.log(err);
		});
};

const changeIcon = (item) => {
	active.value = item;
	inputItem.value = formatData(item.items);
};
const formatData = (data) => {
	let jsonData = data;
	let dataObj = {};
	for (let i = 0; i < jsonData.length; i++) {
		if (dataObj[jsonData[i].rowNum]) {
			dataObj[jsonData[i].rowNum].push(jsonData[i]);
		} else {
			dataObj[jsonData[i].rowNum] = [jsonData[i]];
		}
	}
	return dataObj;
};
const Init = async (v) => {
	inspectData = ref({});
	let r = await getAPI(PhysicalItemsApi).apiPhysicalExamDetailGet(v.id);
	state.tableData = r.data?.result ?? [];
	// 赋值时间
	if (state.tableData.inspection_time) {
		inspection_time = state.tableData.inspection_time;
	}

	for (let i = 0; i < tableList.value.length; i++) {
		if (state.tableData[tableList.value[i].key] || state.tableData[tableList.value[i].key] === 0) {
			tableList.value[i].value = state.tableData[tableList.value[i].key];
		} else {
			tableList.value[i].value = '';
		}
	}
	for (let i = 0; i < state.tableData.types.length; i++) {
		state.tableData.types[i].isNormal = true;
		for (let w = 0; w < state.tableData.types[i].items.length; w++) {
			state.tableData.types[i].items[w].resultValue = null;
			state.tableData.types[i].items[w].resultValue = state.tableData.types[i].items[w].result.result;
			if (state.tableData.types[i].items[w].result.result) {
				state.tableData.types[i].isNormal = false;
				if (inspectData.value[state.tableData.types[i].typeName]) {
					inspectData.value[state.tableData.types[i].typeName].push(state.tableData.types[i].items[w]);
				} else {
					inspectData.value[state.tableData.types[i].typeName] = [state.tableData.types[i].items[w]];
				}
			}
			// let indexOfData = physical_exam_data.map((item) => item.item_id).indexOf(this.activepet.physical_exam_details[i].items[w].id)
			// // 编辑的时候里面有值
			// if (indexOfData !== -1) {
			//   state.tableData.types[i].value = false
			//   // 赋值input
			//   state.tableData.types[i].items[w].value = physical_exam_data[indexOfData].value

			//   // 赋值input下面list
			//   if (inspectData[this.activepet.physical_exam_details[i].name]) {
			//     inspectData[this.activepet.physical_exam_details[i].name].push(physical_exam_data[indexOfData])
			//   } else {
			//     inspectData[this.activepet.physical_exam_details[i].name] = [physical_exam_data[indexOfData]]
			//   }
			// }
		}
	}

	iconList.value = state.tableData.types;
	changeIcon(iconList.value[0]);
};

defineExpose({ save, saveData });
// onMounted(async () => {
//   await Init();
// });
</script>

<style scope lang="scss">
.diagnosis-info {
	padding-left: 80px;
	padding-right: 60px;
	// width: 80%;
	margin: 0 auto;
	.overlay-disabled {
		pointer-events: none;
	}
	.btn-show-eye {
		width: 180px;
		margin-bottom: 18px;
	}
}

.table-info {
	margin-top: 16px;

	.table-time {
		background: #f5f6f8;
		height: 32px;
		border: 1px solid #e3e3e3;
		border-bottom: none;
		display: flex;
		align-items: center;

		::v-deep input {
			border: none;
			background: transparent;
		}
		.el-input__wrapper {
			background: rgba(0, 0, 0, 0);
			border: none;
			box-shadow: none;
		}
		.time-desc {
			font-size: 12px;
			font-family:
				PingFangSC-Regular,
				PingFang SC;
			font-weight: 400;
			color: #0f36d8;
			margin-left: -50px;
		}
	}

	.table-info-list {
		display: flex;
		text-align: center;

		.table-info-item {
			flex: 1;
			border: 1px solid #e3e3e3;

			> div {
				display: flex;
				justify-content: center;
				height: 30px;
				align-items: center;
				border-bottom: 1px solid #e3e3e3;
				font-size: 14px;
			}

			input {
				border: none;
				outline: none;
				width: 100%;
			}

			.info-item-select {
				.el-select__wrapper {
					width: 100%;
					border: none;
					box-shadow: none;
					background: none;
				}
				::v-deep input {
					text-align: center;
					border: none;
					border-top: 1px solid #e3e3e3;
					border-bottom: 1px solid #e3e3e3;
				}
			}
		}
	}
}

.icon-info {
	margin-top: 18px;
	display: flex;
	flex-wrap: wrap;

	.icon-info-list {
		width: 90px;
		margin-bottom: 24px;

		.info-list-icon {
			font-size: 14px;
			font-family:
				PingFangSC-Regular,
				PingFang SC;
			font-weight: 400;
			color: rgba($color: #000000, $alpha: 0.3);
			white-space: nowrap;
			text-align: center;
			cursor: pointer;
		}
		.info-list-icon > img {
			width: 64px;
			height: 64px;
		}

		.active-icon {
			font-weight: 500;
			color: #0f36d8;
		}
	}
}

.image-list {
	margin-left: 3px;
	display: flex;
	.drag-view {
		display: flex;
		flex-wrap: wrap;
		max-width: calc(100% - 155px);
		.detail-image-item {
			margin-right: 18px;
			position: relative;
			border-radius: 6px;
			overflow: hidden;
			border: 1px solid #c0ccda;
			height: 76px;
			margin-bottom: 10px;
			.image-wrap {
				/* border: 1px solid #c0ccda; */
				position: absolute;
				top: 0;
				left: 0;
				width: 76px;
				height: 76px;
				background: rgba(0, 0, 0, 0.5);
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.detail-icon {
				color: white;
				font-size: 20px;
				margin-left: 10px;
				cursor: pointer;
			}
		}
		.image-wrap-none {
			position: absolute;
			bottom: 0px;
			right: 0px;
			background: rgba(0, 0, 0, 0.5);
			border-radius: 4px 0px 4px 0px;
			text-align: center;
			font-size: 14px;
			padding: 0px 3px;
			font-family:
				PingFangSC-Regular,
				PingFang SC;
			font-weight: 400;
			color: #ffffff;
		}
	}

	::v-deep .el-upload--picture-card {
		width: 80px;
		height: 80px;
		line-height: 80px;

		.el-icon-plus {
			font-size: 12px;
			padding: 1px;
		}
	}

	::v-deep .el-upload-list__item {
		width: 80px;
		height: 80px;
		line-height: 80px;
	}

	.code-scanning {
		cursor: pointer;
		margin-left: 18px;
		width: 80px;
		height: 80px;
		border-radius: 6px;
		background-color: #fbfdff;
		border: 1px dashed #c0ccda;
		text-align: center;
		font-size: 12px;
		text-align: center;
		line-height: 80px;
		color: #8c939d;
	}
}

.inspect-data {
	> div {
		margin-top: 6px;
		margin-bottom: 6px;
		display: flex;
	}

	.inspect-data-title {
		width: 100px;
		min-width: 100px;
		display: flex;
		align-items: center;
		font-size: 14px;
		//font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
	}

	.inspect-data-tag {
		flex: 1;
		padding-top: 5px;
	}
}

.diagnosis-desc {
	display: flex;
	margin: 12px 0 16px 0;
	font-size: 14px;

	> span {
		margin-left: -98px;
		white-space: nowrap;
		margin-right: 10px;
	}

	::v-deep .el-textarea {
		textarea {
			padding-bottom: 16px;
		}
	}
}

.active-name {
	display: flex;
	font-size: 14px;
	color: #606266;
	font-weight: 600;
}

.input-info {
	flex: 1;

	.input-info-no {
		input {
			margin-right: 8px;
		}

		margin-left: 8px;
		margin-bottom: 10px;
		font-size: 14px;
		//font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.65);
	}

	.input-info-list {
		// display: flex;
		// flex-wrap: wrap;
		.itching-tips {
			font-size: 16px;
			color: #ff9f0a;
			margin: 0 12px 0 5px;
		}

		.input-group {
			margin-right: 10px;
			margin-bottom: 18px;
			font-size: 14px;
			font-family:
				PingFangSC-Regular,
				PingFang SC;
			height: 21px;
			line-height: 21px;
			font-weight: 400;
			color: rgba(0, 0, 0, 0.65);

			.input-checkbox {
				width: 150px;
			}

			.input-text {
				display: flex;
				margin-top: 10px;
				// 瘙痒评分绝对定位的 父级相对定位
				position: relative;

				span {
					width: 102px;
					white-space: nowrap;
				}

				.score-hight-text {
					font-size: 14px;
					font-weight: 500;
					color: #f76c0d;
					position: absolute;
					left: calc(100% + 20px);
				}

				.input-text-div {
					flex: 1;

					input {
						height: 24px;
						width: 100%;
					}
				}
			}

			.input-select {
				display: flex;

				> span {
					white-space: nowrap;
					width: 130px;
				}

				::v-deep input[type='text'] {
					border: none;
					outline: none;
					height: 20px;
					border-bottom: 1px solid #e3e3e3;
				}
			}

			input[type='checkbox'] {
				border: none;
				outline: none;
				width: 30px;
			}

			input[type='text'] {
				border: none;
				outline: none;
				// width: 100px;
				border-bottom: 1px solid #e3e3e3;
			}
		}
	}
}

.dog-skin {
	::v-deep .el-dialog__header {
		display: none !important;
	}

	::v-deep .el-dialog {
		max-width: 720px !important;
	}

	::v-deep .el-dialog__body {
		padding: 0 0 !important;
	}

	::v-deep .el-dialog__footer .el-button {
		border-radius: 30px !important;
	}

	.skin-bg {
		width: 702px;
		height: 898px;
		margin: 0 auto;
		background: url('../../../assets/doctor-work-mgt/dog-skin/dog-skin.png') center / 100% 100% no-repeat;
		position: relative;

		.fixed-checkbox {
			// height: 30px;
			// width: 30px;
			position: absolute;
			left: 45px;

			&:nth-of-type(1) {
				top: 331px;
			}

			&:nth-of-type(2) {
				top: 436px;
			}

			&:nth-of-type(3) {
				top: 562px;
			}

			&:nth-of-type(4) {
				top: 675px;
			}

			&:nth-of-type(5) {
				top: 798px;
			}
		}

		::v-deep .el-checkbox__inner {
			border: 1px solid #0f36d8 !important;
		}

		::v-deep .el-checkbox__label {
			display: none !important;
		}
	}

	.diy-header {
		text-align: center;
		height: 30px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.85);

		.itching-tips {
			font-size: 16px;
			color: #ff9f0a;
			margin: 0 5px 0 5px;
		}
	}
}
</style>
