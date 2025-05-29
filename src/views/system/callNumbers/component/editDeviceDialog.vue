<template>
	<div class="systemCallNumberEditDevice-container">
		<el-dialog v-model="isShowDialog" :title="props.title" :width="'40%'" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
				<el-row :gutter="12">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="设备标识" prop="deviceIdentity">
							<el-input v-model="ruleForm.deviceIdentity" placeholder="请输入设备标识" clearable="" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="播放次数" prop="times">
							<el-slider v-model="ruleForm.times" :min="1" :max="5" :step="1" :marks="sliderMark.times" show-stops />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="播放语速" prop="rate">
							<el-slider v-model="ruleForm.rate" :min="0.1" :max="1" :step="0.1" :marks="sliderMark.rate" show-stops />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
						<el-form-item label="播放音调" prop="pitch">
							<el-slider v-model="ruleForm.pitch" :min="0.1" :max="2" :step="0.1" :marks="sliderMark.pitch" show-stops />
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left" style="width: 98%; margin: 15px">
					<el-button type="primary" :icon="Plus" @click="addGoodsItems" plain size="small">添加推荐商品</el-button>
				</el-divider>

				<el-row>
					<el-col :span="24" class="mb20">
						<el-table :data="ruleForm.productItems" style="width: 100%" height="450">
							<el-table-column label="项目名称" prop="productName" />
							<el-table-column label="项目类型" prop="typeText" width="80" />
							<el-table-column label="销售价格" prop="salePrice" width="100" />
							<el-table-column label="单位" prop="outUnitName" width="100" />
							<el-table-column label="操作" width="80" align="center" fixed="right">
								<template #default="scope">
									<el-button icon="ele-Delete" size="small" text="" type="danger" @click="deleteGoodsItems(scope.$index)"> 移除 </el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel" size="default">取 消</el-button>
					<el-button type="primary" @click="submit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		<Products ref="productRef" :title="productRefTitle" @reloadTable="handleSelectProduct" />
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { CallNumberApi } from '/@/api-services/api';
import { Plus } from '@element-plus/icons-vue';
import other from '/@/utils/other';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';
import { useUserInfo } from '/@/stores/userInfo';

const stores = useUserInfo();
const unitData = ref<any>([]);
const unitObject = ref<any>({});
const productRef = ref();
const Products = defineAsyncComponent(() => import('/@/components/products/selectProducts.vue'));
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const ruleForm = ref<any>({});
const productRefTitle = ref('选择项目');
const sliderMark = ref({
	times: {
		1: '1次',
		2: '2次',
		3: '3次',
		4: '4次',
		5: '5次',
	},
	rate: {
		0.1: '0.1',
		0.2: '0.2',
		0.3: '0.3',
		0.4: '0.4',
		0.5: '0.5',
		0.6: '0.6',
		0.7: '0.7',
		0.8: '0.8',
		0.9: '0.9',
		1.0: '1.0',
	},
	pitch: {
		0.1: '0.1',
		0.2: '0.2',
		0.3: '0.3',
		0.4: '0.4',
		0.5: '0.5',
		0.6: '0.6',
		0.7: '0.7',
		0.8: '0.8',
		0.9: '0.9',
		1.0: '1.0',
		1.1: '1.1',
		1.2: '1.2',
		1.3: '1.3',
		1.4: '1.4',
		1.5: '1.5',
		1.6: '1.6',
		1.7: '1.7',
		1.8: '1.8',
		1.9: '1.9',
		2.0: '2.0',
	},
});
//自行删除非必填规则
const rules = ref<FormRules>({
	deviceIdentity: [{ required: true, message: '请输入设备标识！', trigger: 'blur' }],
});
/**
 * 加载单位数据
 */
const loadUnitData = () => {
	let productUnits = stores.productUnits;
	unitData.value = productUnits ?? [];
	unitData.value.forEach((item: any) => {
		unitObject.value[item.id] = item.name;
	});
};

/**
 * 处理选中产品信息
 * @param data
 */
const handleSelectProduct = (data: any) => {
	data.forEach((item: any) => {
		if (ruleForm.value.productItems.findIndex((i: any) => i.productId == item.productId) == -1) {
			ruleForm.value.productItems.push({
				productId: item.productId,
				productName: item.productName,
				salePrice: item.salePrice,
				outUnitId: item.outUnitId,
				outUnitName: unitObject.value[item.outUnitId],
				typeText: item.productTypeText,
				type: item.productType,
			});
		}
	});
};
/**
 * 添加设备包含项目
 */
const addGoodsItems = () => {
	productRef.value.openDialog([], ProductTypeEnums.NUMBER_10001);
};
/**
 * 移除设备包含项目
 */
const deleteGoodsItems = (index: number) => {
	ruleForm.value.productItems.splice(index, 1);
};
// 打开弹窗
const openDialog = (row: any) => {
	loadUnitData();
	ruleForm.value = other.deepClone(row);
	if (ruleForm.value.productItems) {
		ruleForm.value.productItems.forEach((item: any) => {
			item.outUnitName = unitObject.value[item.outUnitId];
		});
	}
	isShowDialog.value = true;
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

// 提交
const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			let values = ruleForm.value;
			console.log('提交的数据', values);
			if (ruleForm.value.id != undefined && ruleForm.value.id > 0) {
				await getAPI(CallNumberApi).apiCallNumberEditCallDevicePost(values);
			} else {
				await getAPI(CallNumberApi).apiCallNumberAddCallDevicePost(values);
			}
			closeDialog();
		}
	});
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
