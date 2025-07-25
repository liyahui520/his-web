<template>
	<div class="table-search-container" v-if="props.search.length > 0">
		<el-form ref="tableSearchRef" :model="state.innerModelValue" label-width="100px" class="table-form" :inline="true">
			<!-- <el-row :gutter="2"> -->
			<!-- <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4" class="mb20"></el-col> -->
			<!-- <el-col  -->
			<span v-for="(val, key) in props.search" :key="key" v-show="key < 5 || state.isToggle">
				<template v-if="val.type !== ''">
					<el-form-item
						label-width="auto"
						:label="val.label"
						:prop="val.prop"
						:rules="[{ required: val.required, message: `${val.label}不能为空`, trigger: val.type === 'input' ? 'blur' : 'change' }]"
					>
						<el-input
							v-model="state.innerModelValue[val.prop]"
							v-bind="val.comProps"
							:placeholder="val.placeholder"
							:clearable="!val.required"
							v-if="val.type === 'input'"
							@keyup.enter="onSearch(tableSearchRef)"
							@change="val.change"
							class="w100"
						/>
						<el-date-picker
							v-model="state.innerModelValue[val.prop]"
							v-bind="val.comProps"
							type="date"
							:placeholder="val.placeholder"
							:clearable="!val.required"
							v-else-if="val.type === 'date'"
							@change="val.change"
							class="w100"
						/>
						<el-date-picker
							v-model="state.innerModelValue[val.prop]"
							v-bind="val.comProps"
							type="monthrange"
							value-format="YYYY/MM/DD"
							:placeholder="val.placeholder"
							:clearable="!val.required"
							v-else-if="val.type === 'monthrange'"
							@change="val.change"
							class="w100"
						/>
						<el-date-picker
							v-model="state.innerModelValue[val.prop]"
							v-bind="val.comProps"
							type="daterange"
							value-format="YYYY/MM/DD"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:clearable="!val.required"
							:shortcuts="shortcuts"
							:default-time="defaultTime"
							v-else-if="val.type === 'daterange'"
							@change="val.change"
							class="w100"
						/>
						<el-select
							v-model="state.innerModelValue[val.prop]"
							v-bind="val.comProps"
							:clearable="!val.required"
							:placeholder="val.placeholder"
							v-else-if="val.type === 'select'"
							@change="val.change"
							class="w100"
						>
							<el-option v-for="(item, index) in val.options" :key="index" :label="item.label" :value="item.value"> </el-option>
						</el-select>
						<el-cascader
							v-else-if="val.type === 'cascader' && val.cascaderData"
							:options="val.cascaderData"
							:clearable="!val.required"
							filterable
							:props="val.cascaderProps ? val.cascaderProps : state.cascaderProps"
							:placeholder="val.placeholder"
							@change="val.change"
							class="w100"
							v-bind="val.comProps"
							v-model="state.innerModelValue[val.prop]"
						>
						</el-cascader>
					</el-form-item>
				</template>
			</span>
			<!-- </el-col> -->
			<!-- <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="mb20"> -->
			<el-form-item class="table-form-btn" label-width="auto">
				<div>
					<!-- 使用el-button-group会导致具有type属性的按钮的右边框无法显示 -->
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="onSearch(tableSearchRef)"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="onReset(tableSearchRef)"> 重置 </el-button>
					</el-button-group>
				</div>
			</el-form-item>
			<slot name="command"></slot>
			<!-- </el-col>
			</el-row> -->
			<el-divider style="margin-top: 5px" v-if="search.length > 5">
				<el-button :icon="state.isToggle ? 'ele-ArrowUpBold' : 'ele-ArrowDownBold'" class="divider-btn" @click="state.isToggle = !state.isToggle"> </el-button>
			</el-divider>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="makeTableDemoSearch">
import { reactive, ref, watch, toRefs } from 'vue';
import type { FormInstance } from 'element-plus';
import { dayjs } from 'element-plus';

import { formatDate } from '/@/utils/formatTime';
import { EmptyObjectType } from '/@/types/global';
// 定义父组件传过来的值
const props = defineProps({
	// 搜索表单,type-控件类型（input,select,cascader,date）,options-type为selct时需传值，cascaderData,cascaderProps-type为cascader时需传值，属性同elementUI,cascaderProps不传则使用state默认。
	// 可带入comProps属性，和使用的控件属性对应
	search: {
		type: Array<TableSearchType>,
		default: [],
	},
	modelValue: {
		type: Object,
		default: () => ({}),
	},
});

// 定义子组件向父组件传值/事件
const emit = defineEmits(['search', 'reset', 'update:modelValue']);

// 将 props中的值转为 ref
const refProps = toRefs(props);
const searchModel = refProps.modelValue;
const defaultTime2: [Date, Date] = [
	new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 0, 0, 0),
	new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 23, 59, 59),
]; // '12:00:00', '08:00:00'
// 定义变量内容
const tableSearchRef = ref<FormInstance>();
const state = reactive({
	form: {},
	isToggle: false,
	cascaderProps: { checkStrictly: true, emitPath: false, value: 'id', label: 'name', expandTrigger: 'hover' },
	/** 内部 modelValue */
	innerModelValue: {} as EmptyObjectType,
});

/** 监听 props.modelValue 变化 */
watch(
	() => props.modelValue,
	(val) => {
		state.innerModelValue = val;
	}
);

/** 监听 state.innerModelValue 变化 */
watch(
	() => state.innerModelValue,
	(val) => {
		emit('update:modelValue', val);
	},
	{ deep: true }
);

// 查询
const onSearch = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((isValid: boolean): void => {
		if (!isValid) return;

		emit('search', state.innerModelValue);
	});
};

// 重置
const onReset = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	emit('reset', state.innerModelValue);
};

/** 时间范围默认时间 */
const defaultTime = [formatDate(new Date(), 'YYYY-mm-dd') + ' 00:00:00', formatDate(new Date(), 'YYYY-mm-dd') + ' 23:59:59']; // ref<[Date, Date]>([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]);
/** 时间范围快捷选择 */
const shortcuts = [
	{
		text: '7天内',
		value: () => {
			const end = dayjs().endOf('day').toDate();
			const start = dayjs().startOf('day').add(-7, 'day').toDate();
			return [start, end];
		},
	},
	{
		text: '1个月内',
		value: () => {
			const end = dayjs().endOf('day').toDate();
			const start = dayjs().startOf('day').add(-1, 'month').toDate();
			return [start, end];
		},
	},
	{
		text: '3个月内',
		value: () => {
			const end = dayjs().endOf('day').toDate();
			const start = dayjs().startOf('day').add(-3, 'month').toDate();
			return [start, end];
		},
	},
];
</script>

<style scoped lang="scss">
.table-search-container {
	display: flex;

	.table-form {
		flex: 1;

		.table-form-btn-toggle {
			white-space: nowrap;
			user-select: none;
			display: flex;
			align-items: center;
			color: var(--el-color-primary);
		}
	}
}

.divider-btn {
	height: 20px;
	border-radius: 10px;
}
</style>
