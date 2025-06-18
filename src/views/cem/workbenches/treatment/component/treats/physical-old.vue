<template>
	<div class="physical">
		<el-form :model="props.treatData.cemRecordPhysical" label-width="90px" label-suffix="：" label-position="right">
			<el-row :gutter="20">
				<el-col :span="4">
					<el-form-item label="体重(Kg)">
						<el-input v-model="props.treatData.cemRecordPhysical.petWeight" type="number" class="mx-4 customer-size" :min="1" controls-position="right" :precision="2" :disabled="props.disabled" />
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="体温(℃)">
						<el-input v-model="props.treatData.cemRecordPhysical.temperature" type="number" class="mx-4 customer-size" :min="1" controls-position="right" :precision="2" :disabled="props.disabled" />
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="呼吸频率(次\分)" label-width="140px">
						<el-input v-model="props.treatData.cemRecordPhysical.respiratoryRate" type="number" class="mx-4 customer-size" :min="1" controls-position="right" :disabled="props.disabled" />
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="CRT(S)">
						<el-input v-model="props.treatData.cemRecordPhysical.crt" type="number" class="mx-4 customer-size" :min="1" controls-position="right" :disabled="props.disabled" />
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="BCS评分">
						<el-select class="customer-size" v-model="props.treatData.cemRecordPhysical.bcs" :disabled="props.disabled">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">{{ item.value }} </el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<VFormRender :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef"> </VFormRender>
		<!--    <RuleTable ref="RuleTableRef" :Data="state" @onSelection="onSelection"/>-->
	</div>
</template>

<script lang="ts" setup name="physical">
import { defineAsyncComponent, nextTick, onMounted, reactive, ref } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { CEMRecordApi, PhysicalItemsApi } from '/@/api-services';
import other from '/@/utils/other';
const selectionRows = ref<any>([]);
const oldSelectionRows = ref<any>([]);

/* 注意：formJson是指表单设计器导出的json，此处演示的formJson只是一个空白表单json！！ */
const formJson = reactive({
	widgetList: [
		{
			key: 103471,
			type: 'grid',
			alias: 'column-1-grid',
			category: 'container',
			icon: 'column-1-grid',
			cols: [
				{
					type: 'grid-col',
					category: 'container',
					icon: 'grid-col',
					internal: true,
					widgetList: [
						{
							key: 75822,
							type: 'checkbox',
							icon: 'checkbox-field',
							formItemFlag: true,
							options: {
								name: 'checkbox8229',
								keyNameEnabled: false,
								keyName: 'checkbox8229',
								label: '耳道检查',
								labelAlign: 'label-right-align',
								defaultValue: [],
								columnWidth: '200px',
								size: '',
								displayStyle: 'inline',
								buttonStyle: false,
								border: false,
								labelWidth: null,
								labelHidden: false,
								labelWrap: false,
								disabled: false,
								hidden: false,
								dsEnabled: false,
								dsName: '',
								dataSetName: '',
								labelKey: 'label',
								valueKey: 'value',
								optionValueType: '',
								optionItems: [
									{
										label: '暂无异常',
										value: 1,
									},
								],
								required: false,
								requiredHint: '',
								validation: '',
								validationHint: '',
								customClass: [],
								labelIconClass: null,
								labelIconPosition: 'rear',
								labelTooltip: null,
								onCreated: '',
								onMounted: '',
								onChange: '',
								onValidate: '',
							},
							id: 'checkbox8229',
						},
					],
					options: {
						name: 'gridCol72064',
						hidden: false,
						span: 24,
						offset: 0,
						push: 0,
						pull: 0,
						responsive: false,
						md: 24,
						sm: 24,
						xs: 24,
						customClass: [],
					},
					id: 'grid-col-72064',
				},
			],
			options: {
				name: 'grid51335',
				hidden: false,
				gutter: 20,
				colHeight: '20',
				customClass: [],
			},
			id: 'grid51335',
		},
		{
			type: 'grid',
			alias: 'column-4-grid',
			category: 'container',
			icon: 'column-4-grid',
			commonFlag: true,
			cols: [
				{
					type: 'grid-col',
					category: 'container',
					icon: 'grid-col',
					internal: true,
					widgetList: [
						{
							key: 37627,
							type: 'select',
							icon: 'select-field',
							formItemFlag: true,
							options: {
								name: '左耳道内毛',
								keyNameEnabled: false,
								keyName: '左耳道内毛',
								label: '左耳道 - 内毛',
								labelAlign: 'label-right-align',
								defaultValue: '',
								placeholder: '',
								columnWidth: '200px',
								size: '',
								labelWidth: null,
								labelHidden: false,
								labelWrap: false,
								disabled: false,
								hidden: false,
								clearable: true,
								filterable: false,
								allowCreate: false,
								remote: false,
								automaticDropdown: true,
								multiple: false,
								multipleLimit: 0,
								collapseTags: false,
								dsEnabled: false,
								dsName: '',
								dataSetName: '',
								labelKey: 'label',
								valueKey: 'value',
								optionValueType: 'String',
								optionItems: [
									{
										label: '多',
										value: '多',
									},
									{
										label: '少',
										value: '少',
									},
								],
								required: false,
								requiredHint: '',
								validation: '',
								validationHint: '',
								customClass: [],
								labelIconClass: null,
								labelIconPosition: 'rear',
								labelTooltip: null,
								onCreated: '',
								onMounted: '',
								onRemoteQuery: '',
								onChange: '',
								onFocus: '',
								onBlur: '',
								onValidate: '',
							},
							id: 'select97701',
						},
					],
					options: {
						name: 'gridCol88327',
						hidden: false,
						span: 5,
						offset: 2,
						push: 0,
						pull: 0,
						responsive: false,
						md: 12,
						sm: 12,
						xs: 12,
						customClass: [],
					},
					id: 'grid-col-88327',
				},
				{
					type: 'grid-col',
					category: 'container',
					icon: 'grid-col',
					internal: true,
					widgetList: [
						{
							key: 37627,
							type: 'select',
							icon: 'select-field',
							formItemFlag: true,
							options: {
								name: 'select16314',
								keyNameEnabled: false,
								keyName: '',
								label: '右耳道 - 内毛',
								labelAlign: 'label-right-align',
								defaultValue: '',
								placeholder: '',
								columnWidth: '200px',
								size: '',
								labelWidth: null,
								labelHidden: false,
								labelWrap: false,
								disabled: false,
								hidden: false,
								clearable: true,
								filterable: false,
								allowCreate: false,
								remote: false,
								automaticDropdown: false,
								multiple: false,
								multipleLimit: 0,
								collapseTags: false,
								dsEnabled: false,
								dsName: '',
								dataSetName: '',
								labelKey: 'label',
								valueKey: 'value',
								optionValueType: '',
								optionItems: [
									{
										label: 'select 1',
										value: 1,
									},
									{
										label: 'select 2',
										value: 2,
									},
									{
										label: 'select 3',
										value: 3,
									},
								],
								required: false,
								requiredHint: '',
								validation: '',
								validationHint: '',
								customClass: [],
								labelIconClass: null,
								labelIconPosition: 'rear',
								labelTooltip: null,
								onCreated: '',
								onMounted: '',
								onRemoteQuery: '',
								onChange: '',
								onFocus: '',
								onBlur: '',
								onValidate: '',
							},
							id: 'select16314',
						},
					],
					options: {
						name: 'gridCol43881',
						hidden: false,
						span: 5,
						offset: 0,
						push: 0,
						pull: 0,
						responsive: false,
						md: 12,
						sm: 12,
						xs: 12,
						customClass: [],
					},
					id: 'grid-col-43881',
				},
				{
					type: 'grid-col',
					category: 'container',
					icon: 'grid-col',
					internal: true,
					widgetList: [
						{
							key: 37627,
							type: 'select',
							icon: 'select-field',
							formItemFlag: true,
							options: {
								name: 'select52226',
								keyNameEnabled: false,
								keyName: '',
								label: '左耳 - 异味',
								labelAlign: 'label-right-align',
								defaultValue: '',
								placeholder: '',
								columnWidth: '200px',
								size: '',
								labelWidth: null,
								labelHidden: false,
								labelWrap: false,
								disabled: false,
								hidden: false,
								clearable: true,
								filterable: false,
								allowCreate: false,
								remote: false,
								automaticDropdown: false,
								multiple: false,
								multipleLimit: 0,
								collapseTags: false,
								dsEnabled: false,
								dsName: '',
								dataSetName: '',
								labelKey: 'label',
								valueKey: 'value',
								optionValueType: '',
								optionItems: [
									{
										label: 'select 1',
										value: 1,
									},
									{
										label: 'select 2',
										value: 2,
									},
									{
										label: 'select 3',
										value: 3,
									},
								],
								required: false,
								requiredHint: '',
								validation: '',
								validationHint: '',
								customClass: [],
								labelIconClass: null,
								labelIconPosition: 'rear',
								labelTooltip: null,
								onCreated: '',
								onMounted: '',
								onRemoteQuery: '',
								onChange: '',
								onFocus: '',
								onBlur: '',
								onValidate: '',
							},
							id: 'select52226',
						},
					],
					options: {
						name: 'gridCol35436',
						hidden: false,
						span: 5,
						offset: 0,
						push: 0,
						pull: 0,
						responsive: false,
						md: 12,
						sm: 12,
						xs: 12,
						customClass: '',
					},
					id: 'grid-col-35436',
				},
				{
					type: 'grid-col',
					category: 'container',
					icon: 'grid-col',
					internal: true,
					widgetList: [
						{
							key: 37627,
							type: 'select',
							icon: 'select-field',
							formItemFlag: true,
							options: {
								name: 'select60761',
								keyNameEnabled: false,
								keyName: '',
								label: '右耳 - 异味',
								labelAlign: 'label-right-align',
								defaultValue: '',
								placeholder: '',
								columnWidth: '200px',
								size: '',
								labelWidth: null,
								labelHidden: false,
								labelWrap: false,
								disabled: false,
								hidden: false,
								clearable: true,
								filterable: false,
								allowCreate: false,
								remote: false,
								automaticDropdown: false,
								multiple: false,
								multipleLimit: 0,
								collapseTags: false,
								dsEnabled: false,
								dsName: '',
								dataSetName: '',
								labelKey: 'label',
								valueKey: 'value',
								optionValueType: '',
								optionItems: [
									{
										label: 'select 1',
										value: 1,
									},
									{
										label: 'select 2',
										value: 2,
									},
									{
										label: 'select 3',
										value: 3,
									},
								],
								required: false,
								requiredHint: '',
								validation: '',
								validationHint: '',
								customClass: [],
								labelIconClass: null,
								labelIconPosition: 'rear',
								labelTooltip: null,
								onCreated: '',
								onMounted: '',
								onRemoteQuery: '',
								onChange: '',
								onFocus: '',
								onBlur: '',
								onValidate: '',
							},
							id: 'select60761',
						},
					],
					options: {
						name: 'gridCol63402',
						hidden: false,
						span: 5,
						offset: 0,
						push: 0,
						pull: 0,
						responsive: false,
						md: 12,
						sm: 12,
						xs: 12,
						customClass: '',
					},
					id: 'grid-col-63402',
				},
			],
			options: {
				name: 'grid61637',
				hidden: false,
				gutter: 20,
				colHeight: '22',
				customClass: [],
			},
			id: 'grid61637',
		},
		{
			key: 19321,
			type: 'grid',
			alias: 'column-4-grid',
			category: 'container',
			icon: 'column-4-grid',
			cols: [
				{
					type: 'grid-col',
					category: 'container',
					icon: 'grid-col',
					internal: true,
					widgetList: [
						{
							key: 37627,
							type: 'select',
							icon: 'select-field',
							formItemFlag: true,
							options: {
								name: 'select116174',
								keyNameEnabled: false,
								keyName: '',
								label: '左耳 - 皮肤颜色',
								labelAlign: 'label-right-align',
								defaultValue: '',
								placeholder: '',
								columnWidth: '200px',
								size: '',
								labelWidth: null,
								labelHidden: false,
								labelWrap: false,
								disabled: false,
								hidden: false,
								clearable: true,
								filterable: false,
								allowCreate: false,
								remote: false,
								automaticDropdown: false,
								multiple: false,
								multipleLimit: 0,
								collapseTags: false,
								dsEnabled: false,
								dsName: '',
								dataSetName: '',
								labelKey: 'label',
								valueKey: 'value',
								optionValueType: 'String',
								optionItems: [
									{
										label: 'select 1',
										value: '1',
									},
									{
										label: 'select 2',
										value: '2',
									},
									{
										label: 'select 3',
										value: '3',
									},
								],
								required: false,
								requiredHint: '',
								validation: '',
								validationHint: '',
								customClass: [],
								labelIconClass: null,
								labelIconPosition: 'rear',
								labelTooltip: null,
								onCreated: '',
								onMounted: '',
								onRemoteQuery: '',
								onChange: '',
								onFocus: '',
								onBlur: '',
								onValidate: '',
							},
							id: 'select116174',
						},
					],
					options: {
						name: 'gridCol19988',
						hidden: false,
						span: 5,
						offset: 2,
						push: 0,
						pull: 0,
						responsive: false,
						md: 6,
						sm: 6,
						xs: 6,
						customClass: [],
					},
					id: 'grid-col-19988',
				},
				{
					type: 'grid-col',
					category: 'container',
					icon: 'grid-col',
					internal: true,
					widgetList: [
						{
							key: 37627,
							type: 'select',
							icon: 'select-field',
							formItemFlag: true,
							options: {
								name: 'select28817',
								keyNameEnabled: false,
								keyName: '',
								label: '右耳 - 皮肤颜色',
								labelAlign: 'label-right-align',
								defaultValue: '',
								placeholder: '',
								columnWidth: '200px',
								size: '',
								labelWidth: null,
								labelHidden: false,
								labelWrap: false,
								disabled: false,
								hidden: false,
								clearable: true,
								filterable: false,
								allowCreate: false,
								remote: false,
								automaticDropdown: false,
								multiple: false,
								multipleLimit: 0,
								collapseTags: false,
								dsEnabled: false,
								dsName: '',
								dataSetName: '',
								labelKey: 'label',
								valueKey: 'value',
								optionValueType: '',
								optionItems: [
									{
										label: 'select 1',
										value: 1,
									},
									{
										label: 'select 2',
										value: 2,
									},
									{
										label: 'select 3',
										value: 3,
									},
								],
								required: false,
								requiredHint: '',
								validation: '',
								validationHint: '',
								customClass: [],
								labelIconClass: null,
								labelIconPosition: 'rear',
								labelTooltip: null,
								onCreated: '',
								onMounted: '',
								onRemoteQuery: '',
								onChange: '',
								onFocus: '',
								onBlur: '',
								onValidate: '',
							},
							id: 'select28817',
						},
					],
					options: {
						name: 'gridCol37712',
						hidden: false,
						span: 5,
						offset: 0,
						push: 0,
						pull: 0,
						responsive: false,
						md: 6,
						sm: 6,
						xs: 6,
						customClass: [],
					},
					id: 'grid-col-37712',
				},
				{
					type: 'grid-col',
					category: 'container',
					icon: 'grid-col',
					internal: true,
					widgetList: [
						{
							key: 37627,
							type: 'select',
							icon: 'select-field',
							formItemFlag: true,
							options: {
								name: 'select77147',
								keyNameEnabled: false,
								keyName: '',
								label: '左耳 - 分泌物',
								labelAlign: 'label-right-align',
								defaultValue: '',
								placeholder: '',
								columnWidth: '200px',
								size: '',
								labelWidth: null,
								labelHidden: false,
								labelWrap: false,
								disabled: false,
								hidden: false,
								clearable: true,
								filterable: false,
								allowCreate: false,
								remote: false,
								automaticDropdown: false,
								multiple: false,
								multipleLimit: 0,
								collapseTags: false,
								dsEnabled: false,
								dsName: '',
								dataSetName: '',
								labelKey: 'label',
								valueKey: 'value',
								optionValueType: '',
								optionItems: [
									{
										label: 'select 1',
										value: 1,
									},
									{
										label: 'select 2',
										value: 2,
									},
									{
										label: 'select 3',
										value: 3,
									},
								],
								required: false,
								requiredHint: '',
								validation: '',
								validationHint: '',
								customClass: [],
								labelIconClass: null,
								labelIconPosition: 'rear',
								labelTooltip: null,
								onCreated: '',
								onMounted: '',
								onRemoteQuery: '',
								onChange: '',
								onFocus: '',
								onBlur: '',
								onValidate: '',
							},
							id: 'select77147',
						},
					],
					options: {
						name: 'gridCol93230',
						hidden: false,
						span: 5,
						offset: 0,
						push: 0,
						pull: 0,
						responsive: false,
						md: 6,
						sm: 6,
						xs: 6,
						customClass: [],
					},
					id: 'grid-col-93230',
				},
				{
					type: 'grid-col',
					category: 'container',
					icon: 'grid-col',
					internal: true,
					widgetList: [
						{
							key: 37627,
							type: 'select',
							icon: 'select-field',
							formItemFlag: true,
							options: {
								name: 'select52360',
								keyNameEnabled: false,
								keyName: '',
								label: '右耳 - 分泌物',
								labelAlign: 'label-right-align',
								defaultValue: '',
								placeholder: '',
								columnWidth: '200px',
								size: '',
								labelWidth: null,
								labelHidden: false,
								labelWrap: false,
								disabled: false,
								hidden: false,
								clearable: true,
								filterable: false,
								allowCreate: false,
								remote: false,
								automaticDropdown: false,
								multiple: false,
								multipleLimit: 0,
								collapseTags: false,
								dsEnabled: false,
								dsName: '',
								dataSetName: '',
								labelKey: 'label',
								valueKey: 'value',
								optionValueType: '',
								optionItems: [
									{
										label: 'select 1',
										value: 1,
									},
									{
										label: 'select 2',
										value: 2,
									},
									{
										label: 'select 3',
										value: 3,
									},
								],
								required: false,
								requiredHint: '',
								validation: '',
								validationHint: '',
								customClass: [],
								labelIconClass: null,
								labelIconPosition: 'rear',
								labelTooltip: null,
								onCreated: '',
								onMounted: '',
								onRemoteQuery: '',
								onChange: '',
								onFocus: '',
								onBlur: '',
								onValidate: '',
							},
							id: 'select52360',
						},
					],
					options: {
						name: 'gridCol62024',
						hidden: false,
						span: 5,
						offset: 0,
						push: 0,
						pull: 0,
						responsive: false,
						md: 6,
						sm: 6,
						xs: 6,
						customClass: '',
					},
					id: 'grid-col-62024',
				},
			],
			options: {
				name: 'grid55934',
				hidden: false,
				gutter: 20,
				colHeight: '22',
				customClass: [],
			},
			id: 'grid55934',
		},
		{
			type: 'grid',
			alias: 'column-4-grid',
			category: 'container',
			icon: 'column-4-grid',
			commonFlag: true,
			cols: [
				{
					type: 'grid-col',
					category: 'container',
					icon: 'grid-col',
					internal: true,
					widgetList: [
						{
							key: 97591,
							type: 'textarea',
							icon: 'textarea-field',
							formItemFlag: true,
							options: {
								name: 'textarea81075',
								keyNameEnabled: false,
								keyName: '',
								label: '其他',
								labelAlign: '',
								rows: 3,
								autosize: false,
								defaultValue: '',
								placeholder: '',
								columnWidth: '200px',
								size: '',
								labelWidth: null,
								labelHidden: false,
								labelWrap: false,
								readonly: false,
								disabled: false,
								hidden: false,
								required: false,
								requiredHint: '',
								validation: '',
								validationHint: '',
								customClass: [],
								labelIconClass: null,
								labelIconPosition: 'rear',
								labelTooltip: null,
								minLength: null,
								maxLength: null,
								showWordLimit: false,
								onCreated: '',
								onMounted: '',
								onInput: '',
								onChange: '',
								onFocus: '',
								onBlur: '',
								onValidate: '',
							},
							id: 'textarea81075',
						},
					],
					options: {
						name: 'gridCol35610',
						hidden: false,
						span: 20,
						offset: 2,
						push: 0,
						pull: 0,
						responsive: false,
						md: 12,
						sm: 12,
						xs: 12,
						customClass: [],
					},
					id: 'grid-col-35610',
				},
			],
			options: {
				name: 'grid79408',
				hidden: false,
				gutter: 12,
				colHeight: '',
				customClass: [],
			},
			id: 'grid79408',
		},
	],
	formConfig: {
		modelName: 'formData',
		refName: 'vForm',
		rulesName: 'rules',
		labelWidth: 100,
		labelPosition: 'left',
		size: '',
		labelAlign: 'label-right-align',
		cssCode: '',
		customClass: [],
		functions: '',
		layoutType: 'PC',
		jsonVersion: 3,
		dataSources: [],
		onFormCreated: '',
		onFormMounted: '',
		onFormDataChange: '',
		onFormValidate: '',
	},
});
const formData = reactive({});
const optionData = reactive({});
const vFormRef = ref(null);

const emit = defineEmits(['loadMain']);
var props = defineProps({
	treatData: {
		cemRecordPhysical: {
			recordId: 0,
			regId: 0,
			petWeight: 1.0,
			temperature: 0,
			respiratoryRate: 0,
			bcs: '',
			crt: 0,
		},
	} as any,

	disabled: {
		type: Boolean,
		default: true,
	},
});

const state = reactive<TableRulesState>({
	tableData: {
		data: [],
		header: [
			{ prop: 'itemName', width: '150', type: '', label: '检查项目' },
			{ prop: 'result', width: '', type: 'input', label: '检查结果' },
			{ prop: 'remark', width: '', type: 'input', label: '说明' },
		],
	} as any,
});

const options = ref([
	{ value: '1', label: '1' },
	{ value: '3', label: '3' },
	{ value: '5', label: '5' },
	{ value: '7', label: '7' },
	{ value: '9', label: '9' },
]);

const onSelection = async (rows) => {
	selectionRows.value = rows;
};

const getTables = async (data: []) => {
	oldSelectionRows.value = [];
	selectionRows.value = [];
	await Init();
	// 根据字段进行合并
	let mergedByField = state.tableData.data.reduce((result: any, item) => {
		if (result != undefined) {
			let foundItem = result.find((r) => r.itemId === item.itemId);
			if (foundItem) {
				oldSelectionRows.value.push(other.deepClone(foundItem) as any);
				// 如果找到了相同字段的元素，将它加入到结果数组中
				// Object.assign(foundItem, item); // 也可以使用 spread 运算符： [...foundItem, ...item]
			} else {
				// 如果没有找到相同字段的元素，将当前元素加入到结果数组中
				result.push(item);
			}
		} else {
			if (result == undefined) result = [];
			result.push(item);
		}

		return result;
	}, data);

	state.tableData.data = mergedByField;
};

const save = async () => {
	let p = Object.assign(
		{},
		props.treatData?.cemRecordPhysical,
		{ cemRecordPhysicalDetails: selectionRows.value },
		{
			recordId: props.treatData.id,
			regId: props.treatData.regId,
		}
	);
	//if (p.id > 0) {
	//	await getAPI(CEMRecordApi).apiCEMRecordIdEditCemPhysicalPut(p.id, p);
	//} else {
	//	await getAPI(CEMRecordApi).apiCEMRecordAddCemPhysicalPost(p);
	//}
	emit('loadMain', Object.assign(props.treatData, { recordId: props.treatData.id }));
	// await getAPI(PhysicalItemsApi).apiPhysicalItemsEditPut(props.treatData?.cemRecordPhysical);
};

const clearSelection = async () => {
	// RuleTableRef.value.toggleSelection();
};

const Init = async () => {
	//let r = await getAPI(PhysicalItemsApi).apiPhysicalItemsGetlistGet();
	//state.tableData.data = r.data?.result ?? [];
};
defineExpose({ clearSelection, save, getTables });
onMounted(async () => {
	await Init();
});
</script>

<style scope lang="scss">
.physical {
	.el-input-number {
		width: inherit !important;
	}

	.customer-size > .el-input {
		width: 100px;
	}

	.customer-size > .el-select {
		width: 100px;
	}
}
</style>
