<template>
	<div class="import-container">
		<el-dialog v-model="isShowDialog" :fullscreen="true" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-card shadow="never" style="height: calc(100vh - 125px)" :body-style="{ padding: 0 }">
				<Table ref="tableRef" v-if="PropVirtTableS.tables" :PropVirtTableS="PropVirtTableS"> </Table>
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-text class="mx-1" type="primary" style="margin-right: 10px">待导入总条数：{{ PropVirtTableS.tables.length }}条</el-text>
					<el-button @click="cancel" size="default">取 消</el-button>
					<el-button type="primary" @click="submit" size="default">数据上传</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="tsx" setup name="editDialog">
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { ImportProductApi } from '/@/api-services';
import { ElButton } from 'element-plus';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';
import { useUserInfo } from '/@/stores/userInfo';

const Table = defineAsyncComponent(() => import('/@/components/table/tableV2.vue'));

const tableRef = ref();
const productType = ref<any>(-1);
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
//定义数据结构
let PropVirtTableS = reactive({
	tables: [],
	TableHeigth: '700',
	isLoading: true,
	//自己定义的列表头显示数据 注意：application_module KEY值需要跟显示数据的KEY对应，否则此列数据显示不出来.
	keyS: {
		name: {
			title: '产品名称',
			width: 150,
		},
		firstCategoryName: {
			title: '二级目录',
			width: 150,
		},
		twoCategoryName: {
			title: '三级目录',
			width: 150,
		},
		commonName: {
			title: '通用名称',
			width: 150,
		},
		barCode: {
			title: '条形码',
			width: 150,
		},
		providerName: {
			title: '供应商',
			width: 150,
		},
		manufacturerName: {
			title: '生产商',
			width: 150,
		},
		brandName: {
			title: '品牌名称',
			width: 150,
		},
		ingredient: {
			title: '成分',
			width: 150,
		},
		usingMethodName: {
			title: '使用方式',
			width: 150,
		},
		dosingWayName: {
			title: '投药方式',
			width: 150,
		},
		salePrice: {
			title: '销售价格',
			width: 100,
		},
		memberPrice: {
			title: '会员价格',
			width: 100,
		},
		interval: {
			title: '接种间隔',
			width: 100,
		},
		intervalUnit: {
			title: '接种间隔单位',
			width: 100,
		},
		times: {
			title: '接种次数',
			width: 100,
		},
		inUnitName: {
			title: '入库单位',
			width: 100,
		},
		outUnitName: {
			title: '出库单位',
			width: 100,
		},
		canSaleName: {
			title: '可销',
			width: 50,
		},
		canOrderName: {
			title: '可订',
			width: 50,
		},
		canCableName: {
			title: '可盘',
			width: 50,
		},
		isAnaesthesiaName: {
			title: '有无批次',
			width: 80,
		},
		isDiscountName: {
			title: '参与打折',
			width: 80,
		},
		isZeroSaleName: {
			title: '允许零库存',
			width: 90,
		},
		specific: {
			title: '规格',
			width: 150,
		},
		remark: {
			title: '备注',
			width: 200,
		},
	},
});

const isShowDialog = ref(false);

const intervalUnitObject = ref<any>({ Day: '天', Week: '周', Month: '月', Year: '年' });
// 打开弹窗
const openDialog = async (row: any, usingMethodData: any, dosingWayData: any, type: any) => {
	PropVirtTableS.tables = row;
	isShowDialog.value = true;
	PropVirtTableS.isLoading = false;
	productType.value = type;
	PropVirtTableS.tables.forEach((item: any) => {
		item.usingMethodName = usingMethodData[item.usingMethod];
		item.dosingWayName = dosingWayData[item.dosingWay];
		item.isAnaesthesiaName = item.isAnaesthesia == 1 ? '是' : '否';
		item.isDiscountName = item.isDiscount == 1 ? '是' : '否';
		item.isZeroSaleName = item.isZeroSale == 1 ? '是' : '否';
		item.canSaleName = item.canSale == 1 ? '是' : '否';
		item.canOrderName = item.canOrder == 1 ? '是' : '否';
		item.canCableName = item.canCable == 1 ? '是' : '否';
		item.intervalUnit = intervalUnitObject.value[item.intervalUnit];
	});
	if (productType.value != ProductTypeEnums.NUMBER_50001 && productType.value != ProductTypeEnums.NUMBER_60001) {
		Reflect.deleteProperty(PropVirtTableS.keyS, 'interval');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'intervalUnit');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'times');
	}
	if (productType.value != ProductTypeEnums.NUMBER_20001) {
		Reflect.deleteProperty(PropVirtTableS.keyS, 'ingredient');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'usingMethodName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'dosingWayName');
	}
	if (productType.value == ProductTypeEnums.NUMBER_140001 || productType.value == ProductTypeEnums.NUMBER_150001) {
		Reflect.deleteProperty(PropVirtTableS.keyS, 'brandName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'isAnaesthesiaName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'isZeroSaleName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'canOrderName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'canCableName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'inUnitName');
	}
	if (
		productType.value != ProductTypeEnums.NUMBER_10001 &&
		productType.value != ProductTypeEnums.NUMBER_20001 &&
		productType.value != ProductTypeEnums.NUMBER_50001 &&
		productType.value != ProductTypeEnums.NUMBER_60001
	) {
		Reflect.deleteProperty(PropVirtTableS.keyS, 'specific');
	}
	if (productType.value == ProductTypeEnums.NUMBER_30001 || productType.value == ProductTypeEnums.NUMBER_40001) {
		Reflect.deleteProperty(PropVirtTableS.keyS, 'barCode');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'providerName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'manufacturerName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'brandName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'inUnitName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'canOrderName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'canCableName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'isAnaesthesiaName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'isZeroSaleName');
	}
	if (
		productType.value == ProductTypeEnums.NUMBER_110001 ||
		productType.value == ProductTypeEnums.NUMBER_120001 ||
		productType.value == ProductTypeEnums.NUMBER_90001 ||
		productType.value == ProductTypeEnums.NUMBER_100001 ||
		productType.value == ProductTypeEnums.NUMBER_130001
	) {
		Reflect.deleteProperty(PropVirtTableS.keyS, 'providerName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'manufacturerName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'brandName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'inUnitName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'canOrderName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'canCableName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'isAnaesthesiaName');
		Reflect.deleteProperty(PropVirtTableS.keyS, 'isZeroSaleName');
	}
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};

// 提交
const submit = async () => {
	if (PropVirtTableS.tables.length > 0) {
		await getAPI(ImportProductApi)
			.apiImportProductSaveProductDrugInputPost(productType.value, PropVirtTableS.tables)
			.then(async () => {
				ElMessage.success('导入成功');

				await useUserInfo().reloadProductUnitList();
				await useUserInfo().reloadProductBrandList();
				await useUserInfo().reloadProductManufacturerList();
				await useUserInfo().reloadProductProviderList();
				cancel();
			});
	} else {
		ElMessage.warning('未识别到有效数据');
	}
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style lang="scss" scoped>
:deep(.el-dialog__footer) {
	padding-top: 0 !important;
	text-align: center !important;
}
</style>
