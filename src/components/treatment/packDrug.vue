<template>
	<div class="productDrugDrag">
		<el-dialog v-model="isShowDialog" width="60%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-card>
				<el-table :data="tableData" stripe height="450px" highlight-current-row>
					<el-table-column label="序号" type="index" width="55" show-overflow-tooltip />
					<el-table-column label="项目信息" style="text-align: center">
						<el-table-column prop="typeText" label="分组" min-width="100" show-overflow-tooltip> </el-table-column>
						<el-table-column prop="typeText" label="类型" min-width="80" show-overflow-tooltip />
						<el-table-column prop="itemName" label="项目名称" min-width="150" show-overflow-tooltip />
						<el-table-column prop="itemName" label="使用方式" min-width="150" show-overflow-tooltip>
							<template #default="scope">
								<el-select v-model="scope.row.dosingWay" filterable disabled placeholder="请选择使用方式" style="width: 100%">
									<el-option v-for="item in dosingWayData" :key="item.id" :label="item.value" :value="item.id"></el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column prop="specific" label="规格" show-overflow-tooltip />
					</el-table-column>
					<el-table-column label="投药信息" style="text-align: center">
						<el-table-column prop="useDose" label="单次用量" min-width="80"> </el-table-column>
						<el-table-column prop="unitName" label="单位" min-width="80" show-overflow-tooltip />
						<el-table-column prop="dayNum" label="天数" min-width="80" show-overflow-tooltip> </el-table-column>
						<el-table-column prop="useMethods" label="次/天" min-width="80" show-overflow-tooltip> </el-table-column>
						<el-table-column prop="amountCount" label="总次数" min-width="80" show-overflow-tooltip />
					</el-table-column>
					<el-table-column label="计费信息" fixed="right">
						<!--                                    <el-table-column prop="unitName" label="单位" min-width="80" show-overflow-tooltip/>-->
						<el-table-column prop="count" label="数量" min-width="100" show-overflow-tooltip />
						<el-table-column prop="salePrice" label="单价" min-width="100" show-overflow-tooltip>
							<template #default="scope">
								{{ verifyNumberComma(scope.row.salePrice + '') }}
							</template>
						</el-table-column>
						<el-table-column prop="amountPrice" label="总金额" min-width="100" show-overflow-tooltip>
							<template #default="scope">
								{{ verifyNumberComma(scope.row.amountPrice + '') }}
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="80">
						<template #default="scope">
							<el-button link type="danger" size="small" :icon="DeleteFilled" @click="deleteRow(scope.$index)"> 删除 </el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>

			<template #footer>
				<el-space wrap>
					<el-form :model="form" ref="ruleFormRef" label-width="120px" label-suffix="：" :inline="true" :rules="rules">
						<el-form-item label="总金额">
							<el-text class="mx-1" size="large">{{ verifyNumberComma(totalAmountComputed.toFixed(2).toString() ?? '0.00') }}</el-text>
						</el-form-item>
						<el-form-item label="包名" prop="itemName">
							<el-input v-model="form.itemName" placeholder="请输入包名" />
						</el-form-item>
						<el-form-item label="打包价格" prop="amountPrice">
							<el-input-number
								class="input-number-width"
								@change="
									(val) => {
										if (!val) form.amountPrice = 0;
									}
								"
								:controls="false"
								:min="0"
								:max="99999999"
								v-model="form.amountPrice"
								:precision="2"
								controls-position="right"
							/>
						</el-form-item>
					</el-form>
				</el-space>
				<span class="dialog-footer">
					<el-button @click="cancel" >取 消</el-button>
					<el-button type="primary" @click="submit" >确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="productDrugDrag">
import { ref, onMounted, computed } from 'vue';
import { ElTable } from 'element-plus';
import { DeleteFilled } from '@element-plus/icons-vue';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import { getDictDataList } from '/@/api/system/admin';
import commonFunction from '/@/utils/commonFunction';
import Decimal from 'decimal.js';
import type { FormRules } from 'element-plus';

const { generateGUID } = commonFunction();
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '项目打包',
	},
});

//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const isShowDialog = ref(false);
const form = ref<any>({});
const dosingWayData = ref<any>([]);
const tableData = ref<any>([]);
const ruleFormRef = ref();
//自行删除非必填规则
const rules = ref<FormRules>({
	itemName: [{ required: true, message: '请输入包名！', trigger: 'blur' }],
	amountPrice: [{ required: true, message: '请输入打包价格！', trigger: 'change' }],
});

//获取使用方式
const getUsingMethods = async () => {
	let res = await getDictDataDropdownList('code_dosing_way');
	dosingWayData.value = res ?? [];
};
const getDictDataDropdownList = async (val: any) => {
	let list = await getDictDataList(val);
	return list.data.result ?? [];
};
// 打开弹窗
const openDialog = async (data: any) => {
	tableData.value = [];
	isShowDialog.value = true;
	data.forEach((element) => {
		element.isPack = true;
		tableData.value.push(element);
	});
};

const deleteRow = async (index) => {
	tableData.value.splice(index, 1);
};

// 关闭弹窗
const closeDialog = () => {
	emit('reloadTable');
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};

const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			form.value.child = tableData.value;
			form.value.count = tableData.value.length;
			form.value.isPack = true;
			form.value.vKey = generateGUID();
			emit('reloadTable', form.value);
			isShowDialog.value = false;
		}
	});
};

const totalAmountComputed = computed(() => {
	let totalAmountValue = tableData.value.reduce((pre: any, item: any) => {
		let accumulateAmount = new Decimal(pre).add(new Decimal(item.amountPrice));
		return new Decimal(accumulateAmount);
	}, 0);
	const result = totalAmountValue.toFixed(2, Decimal.ROUND_UP);
	return new Decimal(result).toNumber();
});
// 页面加载时
onMounted(() => {
	getUsingMethods();
});
//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style scoped></style>
