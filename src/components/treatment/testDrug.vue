<template>
	<div class="prescription-drug-drag">
		<el-dialog v-model="isShowDialog" width="80%" draggable fullscreen :close-on-click-modal="false" :destroy-on-close="true" :before-close="closeBefore">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<el-row v-loading="submitLoading"  element-loading-text="保存中，请勿关闭此页面！">
				<el-col :span="4" class="left-container">
					<el-card shadow="always" style="margin-left: 5px">
						<el-tabs v-model="tabValue">
							<el-tab-pane label="检查化验" name="first" style="overflow: auto">
								<CategroyProducts ref="categroyProductsRef" :getData="getData" :addAuth="false" @handleNodeClick="handleNodeClick" :updateAuth="false" :deleteAuth="false" />
							</el-tab-pane>
							<el-tab-pane label="试纸" name="second" style="overflow: auto">
								<CategroyProducts ref="categroyProductsRef" :getData="getDataPaper" :addAuth="false" @handleNodeClick="handleNodeClick" :updateAuth="false" :deleteAuth="false" />
							</el-tab-pane>
							<el-tab-pane label="摄影检查" name="third" style="overflow: auto">
								<CategroyProducts ref="categroyProductsRef" :getData="getDataX" :addAuth="false" @handleNodeClick="handleNodeClick" :updateAuth="false" :deleteAuth="false" />
							</el-tab-pane>
							<el-tab-pane label="超声检查" name="fourth" style="overflow: auto">
								<CategroyProducts ref="categroyProductsRef" :getData="getDataB" :addAuth="false" @handleNodeClick="handleNodeClick" :updateAuth="false" :deleteAuth="false" />
							</el-tab-pane>
							<el-tab-pane label="显微镜" name="fourth1" style="overflow: auto">
								<CategroyProducts ref="categroyProductsRef" :getData="getDataMicroscope" :addAuth="false" @handleNodeClick="handleNodeClick" :updateAuth="false" :deleteAuth="false" />
							</el-tab-pane>
						</el-tabs>
					</el-card>
				</el-col>
				<el-col :span="20" class="right-container">
					<el-container>
						<el-header class="right-container-header">
							<el-card shadow="always">
								<el-row :gutter="0" align="middle" justify="space-between">
									<el-col :span="24">
										<el-avatar :size="60" style="float: left; text-align: center" :src="props.data?.pPetsInfo?.petImageUrl" />
										<div style="float: left; text-align: center; margin-left: 20px">
											<el-breadcrumb separator="|" style="line-height: 35px">
												<el-breadcrumb-item>
													{{ props.data?.pcutomerDetail?.name }}
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													{{ props.data?.pcutomerDetail?.sexText }}
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													<el-tag class="ml-2" type="success" effect="dark">
														{{ props.data?.pcutomerDetail?.levelText }}
													</el-tag>
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													<el-tag class="ml-2" type="warning" effect="dark">
														{{ props.data?.pcutomerDetail?.cardNumber }}
													</el-tag>
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													<el-tag class="ml-2">{{ props.data?.pcutomerDetail?.cellPhone }} </el-tag>
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													{{ props.data?.pcutomerDetail?.sourceText }}
												</el-breadcrumb-item>
											</el-breadcrumb>
											<el-breadcrumb separator="|" style="line-height: 25px">
												<el-breadcrumb-item>
													{{ props.data?.pPetsInfo?.petName }}
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													{{ props.data?.pPetsInfo?.petKindText }}
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													{{ props.data?.pPetsInfo?.petVarietieText }}
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													{{ props.data?.pPetsInfo?.petGenderText }}
												</el-breadcrumb-item>
												<el-breadcrumb-item> {{ props.data?.pPetsInfo?.petWeight }}Kg </el-breadcrumb-item>
												<el-breadcrumb-item>
													{{ props.data?.pPetsInfo?.petBirthDate ? formatAge(props.data?.pPetsInfo?.petBirthDate) : '-' }}
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													<el-tag size="small" type="success" v-if="props.data?.pPetsInfo?.petIsDeworming == 1"> 已驱虫 </el-tag>
													<el-tag size="small" type="warning" v-if="props.data?.pPetsInfo?.petIsDeworming == 0"> 未驱虫 </el-tag>
													<el-tag size="small" type="danger" v-if="props.data?.pPetsInfo?.petIsDeworming == -1"> 未知 </el-tag>
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													<el-tag size="small" type="success" v-if="props.data?.pPetsInfo?.petIsVaccinated == 1">已接种 </el-tag>
													<el-tag size="small" type="warning" v-if="props.data?.pPetsInfo?.petIsVaccinated == 0">未接种 </el-tag>
													<el-tag size="small" type="danger" v-if="props.data?.pPetsInfo?.petIsVaccinated == -1">未知 </el-tag>
												</el-breadcrumb-item>
												<el-breadcrumb-item>
													<el-tag size="small" type="success" v-if="props.data?.pPetsInfo?.petIsSterilization == 1">已绝育 </el-tag>
													<el-tag size="small" type="warning" v-if="props.data?.pPetsInfo?.petIsSterilization == 0">未绝育 </el-tag>
													<el-tag size="small" type="danger" v-if="props.data?.pPetsInfo?.petIsSterilization == -1">未知 </el-tag>
												</el-breadcrumb-item>
											</el-breadcrumb>
										</div>
									</el-col>
								</el-row>
							</el-card>
						</el-header>
						<el-main class="right-container-main">
							<el-card shadow="always" :body-style="{ padding: '10px 10px 10px 10px', height: '100%', border: '0px' }">
								<el-row class="mb-4">
									<el-popover placement="bottom-start" :width="840" trigger="click" ref="popoverRef" :persistent="false">
										<template #reference>
											<el-input style="width: 400px" v-model="serchName" @input="remoteMethod"></el-input>
										</template>
										<el-table
											ref="multipleTableRef"
											:data="remoteTableData"
											stripe
											highlight-current-row
											height="350px"
											:tree-props="{ children: 'child' }"
											size="small"
											@row-click="remoteTableClick"
											@row-dblclick="remoteTableDoubleClick"
											:loading="remoteSerachLoading"
										>
											<el-table-column type="selection" width="55" align="center" />
											<el-table-column width="80" property="typeText" label="类型">
												<template #default="scope">
													<el-tag type="success" effect="light">
														{{ scope.row.typeText }}
													</el-tag>
												</template>
											</el-table-column>
											<el-table-column width="150" property="name" label="产品名称">
												<template #default="scope">
													<el-tooltip class="box-item" effect="dark" :content="scope.row.name" placement="top-start">
														<el-text truncated>
															<span v-html="verifyTextColor(serchName, scope.row.name)"></span>
														</el-text>
													</el-tooltip>
												</template>
											</el-table-column>
											<el-table-column width="120" property="salePrice" label="单价">
												<template #default="scope">
													<span>{{ verifyNumberComma(scope.row.salePrice.toFixed(2).toString()) }}</span>
												</template>
											</el-table-column>
											<el-table-column width="120" property="englishName" label="英文名">
												<template #default="scope">
													<el-tooltip class="box-item" effect="dark" :content="scope.row.englishName" placement="top-start">
														<el-text truncated>
															<span v-html="verifyTextColor(serchName, scope.row.englishName)"></span>
														</el-text>
													</el-tooltip>
												</template>
											</el-table-column>
											<el-table-column width="120" property="nameLetter" label="简称">
												<template #default="scope">
													<el-tooltip class="box-item" effect="dark" :content="scope.row.nameLetter" placement="top-start">
														<el-text truncated>
															<span v-html="verifyTextColor(serchName, scope.row.nameLetter)"></span>
														</el-text>
													</el-tooltip>
												</template>
											</el-table-column>
											<el-table-column width="120" property="commonName" label="通用名">
												<template #default="scope">
													<el-tooltip class="box-item" effect="dark" :content="scope.row.commonName" placement="top-start">
														<el-text truncated>
															<span v-html="verifyTextColor(serchName, scope.row.commonName)"></span>
														</el-text>
													</el-tooltip>
												</template>
											</el-table-column>
										</el-table>
									</el-popover>
									<el-text style="margin-left: 20px">总金额：</el-text>
									<el-text tag="b" type="primary">
										{{ verifyNumberComma(totalAmountComputed.toFixed(2).toString() ?? '0.00') }}
									</el-text>
									<el-button type="primary" style="margin-left: 20px" @click="savePrescription" :icon="DocumentAdd"> 保存处方项目 </el-button>
								</el-row>
							</el-card>
							<el-card shadow="always" :body-style="{ padding: '10px 10px 0px 10px', height: '100%', border: '0px' }">
								<el-table
									height="calc(100vh - 240px)"
									:data="tableData.cemRecordPrescriptionItems"
									stripe
									highlight-current-row
									row-key="vKey"
									ref="prescriptionItemTableRef"
								>
								<el-table-column label="序号" type="index" width="55" align="center"/>
									<el-table-column label="项目信息" style="text-align: center">
										<el-table-column prop="typeText" label="分组" min-width="110">
											<template #default="scope">
												<el-select
													v-model="scope.row.orderId"
													filterable
													placeholder="请选择分组"
													style="width: 100%; margin-right: 10px; line-height: 23px"
													@change="(value) => changeOrderGroup(scope.row)"
												>
													<el-option v-for="item in orderGroupData" :key="item.id" :label="item.name" :value="item.id"></el-option>
													<template #footer>
														<el-button v-if="!isAdding" :icon="DocumentAdd" class="mb20" text bg size="small" @click="onAddOption"> 添加 </el-button>
														<template v-else>
															<el-input v-model="optionName" class="option-input" placeholder="" size="small" style="width: 100px; margin-right: 10px" />
															<el-button type="primary" size="small" round @click="onConfirm"> 保存 </el-button>
															<el-button size="small" @click="clear" round>取消</el-button>
														</template>
													</template>
												</el-select>
											</template>
										</el-table-column>
										<el-table-column prop="typeText" label="类型" min-width="60" show-overflow-tooltip />
										<el-table-column prop="itemName" label="项目名称" min-width="150" show-overflow-tooltip />
									</el-table-column>
									<el-table-column label="计费信息" fixed="right">
										<el-table-column prop="count" label="数量" min-width="90" show-overflow-tooltip>
											<template #default="scope">
												<el-input-number
													class="input-number-width"
													v-if="!scope.row.isPack"
													v-model="scope.row.count"
													:precision="0"
													:min="1"
													controls-position="right"
													@change="countCharge(scope.row)"
												/>
												<span v-else>{{ scope.row.count }}</span>
											</template>
										</el-table-column>
										<el-table-column prop="salePrice" label="单价" min-width="100" show-overflow-tooltip>
											<template #default="scope">
												<el-input-number
													class="input-number-width"
													v-if="!scope.row.isPack"
													v-model="scope.row.salePrice"
													:precision="2"
													:min="0"
													:max="99999999"
													controls-position="right"
													@change="(value: any) => countCharge(scope.row)"
												/>
												<span v-else>{{ verifyNumberComma(scope.row?.salePrice ?? '0.00') }}</span>
											</template>
										</el-table-column>
										<el-table-column prop="amountPrice" label="总金额" width="100" show-overflow-tooltip>
											<template #default="scope">
												{{ verifyNumberComma(scope.row?.amountPrice ?? '0.00') }}
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
						</el-main>
					</el-container>
				</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="prescriptionDrugDrag">
import { ref, defineAsyncComponent, computed } from 'vue';
import { ElMessageBox, ElTable } from 'element-plus';
import { ElMessage } from 'element-plus';
import { DocumentAdd, DeleteFilled } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductCategorysApi, CEMRecordApi, ProductDrugsApi } from '/@/api-services/api';
import { CEMRecordItemGroupTypeEnum } from '/@/api-services/models/cemrecord-manage';
import { verifyNumberComma, verifyTextColor } from '/@/utils/toolsValidate';
import { ProductTypeEnums } from '/@/api-services';
import { formatAge } from '/@/utils/formatTime';
import { useUserInfo } from '/@/stores/userInfo';
import other from '/@/utils/other';
import Decimal from 'decimal.js';

const CategroyProducts = defineAsyncComponent(() => import('/@/components/tree/categroyProducts.vue'));

//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const stores = useUserInfo();
const isShowDialog = ref<boolean>(false);
const orderGroupData = ref<any>([]);
const orderGroupObject = ref<any>({});
const unitData = ref<any>([]);
const unitObject = ref<any>({});
const sourceData = ref<any>([]); //源数据
const tableData = ref<any>({}); //
const tabValue = ref<string>('first');
const popoverRef = ref();
const popoverOpen = ref<boolean>(false);
const manufacturerData = ref<any>([]);
const manufacturerObject = ref<any>({});
const providerData = ref<any>([]);
const providerObject = ref<any>({});
const brandData = ref<any>([]);
const brandObject = ref<any>({});
const serchName = ref<string>('');
const multipleTableRef = ref();
const remoteTableData = ref<any>([]);
const remoteSerachLoading = ref<boolean>(false);
const isAdding = ref<boolean>(false);
const optionName = ref<string>('');
const prescriptionItemTableRef = ref();
const submitLoading = ref<boolean>(false);


//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '检验项目',
	},
	data: {
		type: Object,
		default: () => {},
	},
	treatData: {
		type: Object,
		default: () => {},
	},
});

/**
 * 实时计算总金额
 */
const totalAmountComputed = computed(() => {
	let totalAmountValue = tableData.value?.cemRecordPrescriptionItems?.reduce((pre: any, item: any) => {
		let accumulateAmount = new Decimal(pre).add(new Decimal(item.amountPrice));
		return new Decimal(accumulateAmount);
	}, 0);
	if (totalAmountValue) {
		const result = totalAmountValue.toFixed(2, Decimal.ROUND_UP);
		return new Decimal(result).toNumber();
	}
	return 0;
});
/**
 * 删除数据行
 * @param index
 */
const deleteRow = (index: number) => {
	tableData.value.cemRecordPrescriptionItems.splice(index, 1);
};
/**
 * 数量变更
 * @param row
 */
const countCharge = (row: any) => {
	if (!row.count) row.count = 1;
	if (!row.salePrice) row.salePrice = 1;
	let accumulateAmount = new Decimal(row.count).mul(new Decimal(row.salePrice));
	const result = accumulateAmount.toFixed(2, Decimal.ROUND_UP);
	row.amountPrice = new Decimal(result).toNumber();
};

/**
 * 添加分组
 */
const onAddOption = () => {
	isAdding.value = true;
};
/**
 * 添加分组确认
 */
const onConfirm = async () => {
	if (optionName.value) {
		await getAPI(CEMRecordApi)
			.apiCEMRecordAddCemRecordItemGroupPost({
				name: optionName.value,
				type: CEMRecordItemGroupTypeEnum.NUMBER_1,
			})
			.then(async () => {
				clear();
				await loadOrderGroupData();
			});
	}
};
/**
 * 清空填写的分组名称
 */
const clear = () => {
	optionName.value = '';
	isAdding.value = false;
};
/**
 * 选择分组变更事件
 * @param row
 */
const changeOrderGroup = (row) => {
	if (row.orderId) row.orderName = orderGroupObject.value[row.orderId];
};
/**
 * 远程搜索产品
 */
const remoteMethod = async () => {
	if (serchName.value != null && serchName.value != '') {
		popoverOpen.value = true;
		remoteSerachLoading.value = true;
		remoteTableData.value = [];
		await getAPI(ProductDrugsApi)
			.apiProductDrugsListByKindPost({ name: serchName.value, kindId: props.data?.pPetsInfo?.petKind ?? 0 })
			.then((res) => {
				remoteTableData.value = res.data?.result ?? [];
			})
			.finally(() => {
				remoteSerachLoading.value = false;
			});
	} else {
		remoteTableData.value = [];
		popoverOpen.value = false;
	}
};
/**
 * 搜索产品的双击事件
 * @param rows
 */
const remoteTableClick = async (row:any) => {
	tableData.value.cemRecordPrescriptionItems.push({
			recordId: props.treatData.id,
			regId: props.treatData.regId,
			itemId: row.id,
			itemName: row.name,
			type: row.type,
			typeText: row.typeText,
			count: 1,
			salePrice: row.salePrice,
			amountPrice: row.salePrice,
			isEditPrice: 0,
			remark: '',
			unitName: unitObject.value[row.outUnitId],
			unitId: row.outUnitId,
		});
	popoverRef.value.hide();
};

/**
 * 搜索产品的双击事件
 * @param rows
 */
const remoteTableDoubleClick = async () => {
	let multipleSelectionRows = multipleTableRef.value.getSelectionRows();
	multipleSelectionRows.forEach((row: any) => {
		tableData.value.cemRecordPrescriptionItems.push({
			recordId: props.treatData.id,
			regId: props.treatData.regId,
			itemId: row.id,
			itemName: row.name,
			type: row.type,
			typeText: row.typeText,
			count: 1,
			salePrice: row.salePrice,
			amountPrice: row.salePrice,
			isEditPrice: 0,
			remark: '',
			unitName: unitObject.value[row.outUnitId],
			unitId: row.outUnitId,
		});
	});
	popoverRef.value.hide();
};

//#region 加载基础数据 生产商、供应商、品牌、单位

/**
 * 加载生产商数据
 */
const loadManufacturerData = () => {
	var res = stores.productManufacturers;
	manufacturerData.value = res ?? [];
	manufacturerData.value.forEach((item: any) => {
		manufacturerObject.value[item.id] = item.name;
	});
};
/**
 * 加载供应商数据
 */
const loadProviderData = () => {
	var res = stores.productProviders;
	providerData.value = res ?? [];
	providerData.value.forEach((item: any) => {
		providerObject.value[item.id] = item.name;
	});
};
/**
 * 加载品牌数据
 */
const loadBrandData = () => {
	var res = stores.productBrands;
	brandData.value = res ?? [];
	brandData.value.forEach((item: any) => {
		brandObject.value[item.id] = item.name;
	});
};

/**
 * 加载单位数据
 */
const loadUnitData = async () => {
	let productUnits = stores.productUnits;
	unitData.value = productUnits ?? [];
	unitData.value.forEach((item: any) => {
		unitObject.value[item.id] = item.name;
	});
};

//#endregion

/**
 * 打开弹窗
 * @param row 数据
 */
const openDialog = async (row) => {
	if (!row.cemRecordPrescriptionItems) {
		row.cemRecordPrescriptionItems = [];
	}
	sourceData.value = other.deepClone(row);
	loadUnitData();
	loadManufacturerData();
	loadProviderData();
	loadBrandData();
	isShowDialog.value = true;
	tableData.value = other.deepClone(row);

	await loadOrderGroupData();
};
/**
 * 关闭弹窗
 */
const closeDialog = () => {
	emit('reloadTable');
	isShowDialog.value = false;
};

/**
 * 加载分组数据
 */
const loadOrderGroupData = async () => {
	await getAPI(CEMRecordApi)
		.apiCEMRecordGetCemRecordItemGroupsPost({ type: CEMRecordItemGroupTypeEnum.NUMBER_1 })
		.then((res) => {
			orderGroupData.value = res.data.result ?? [];
			orderGroupData.value.forEach((item: any) => {
				orderGroupObject.value[item.id] = item.name;
			});
		});
};
/**
 * 关闭之前验证数据是否发生过改变
 * @param done
 */
const closeBefore = async (done) => {
	if (JSON.stringify(sourceData.value) != JSON.stringify(tableData.value)) {
		ElMessageBox.confirm(`数据已修改，是否保存?`, '提示', {
			confirmButtonText: '保存',
			cancelButtonText: '取消',
			type: 'warning',
			showClose: true,
			distinguishCancelAndClose: true,
		})
			.then(() => {
				savePrescription();
			})
			.catch((_) => {
				if (_ === 'cancel') done();
			});
	} else {
		done();
	}
};
/**
 * 目录节点双击回调函数
 * @param item
 */
const handleNodeClick = async (item: any) => {
	tableData.value.cemRecordPrescriptionItems.push({
			recordId: props.treatData.id,
			regId: props.treatData.regId,
			itemId: item.id,
			itemName: item.name,
			type: item.type,
			typeText: item.typeText,
			count: 1,
			salePrice: item.salePrice,
			amountPrice: item.salePrice,
			isEditPrice: 0,
			remark: '',
			unitName: unitObject.value[item.outUnitId],
			unitId: item.outUnitId,
		});
};

/**
 * 保存处方
 */
const savePrescription = async () => {
	if (tableData.value.length <= 0) {
		ElMessage.error('请选择要保存的项目！');
		return;
	}
	submitLoading.value=true;
	if (tableData.value.id > 0) await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdEditTestsPut(props.treatData.regId, props.treatData.id, tableData.value).finally(() => submitLoading.value=false);
	else await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdAddTestsPost(props.treatData.regId, props.treatData.id, tableData.value).finally(() => submitLoading.value=false);
	closeDialog();
};

/**
 * 化验
 */
const getData = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_110001);
	return a.data?.result ?? [];
};

/**
 * 试纸
 */
const getDataPaper = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_150001);
	return a.data?.result ?? [];
};

/**
 * 显微镜
 */
const getDataMicroscope = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_130001);
	return a.data?.result ?? [];
};

/**
 * 摄影检查
 */
const getDataX = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_100001);
	return a.data?.result ?? [];
};

/**
 * 超声检查
 */
const getDataB = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_90001);
	return a.data?.result ?? [];
};

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style scoped lang="scss">
.prescription-drug-drag {
	:deep(.el-overlay .el-overlay-dialog .el-dialog .el-dialog__body) {
		padding: 5px 0px 0px 0px !important;
	}
	.left-container {
		:deep(.el-card__body) {
			padding: 20px 20px 0px 20px !important;
		}
	}
	.right-container {
		.right-container-header {
			height: 70px;
		}

		:deep(.el-input-number.is-controls-right .el-input__wrapper) {
			padding-right: 15px;
		}

		:deep(.el-table__indent) {
			display: none;
		}

		:deep(.el-input-number.is-controls-right .el-input-number__decrease) {
			display: none;
		}

		:deep(.el-input-number.is-controls-right .el-input-number__increase) {
			display: none;
		}
		:deep(.el-main) {
			padding: 20px 20px 0px 20px !important;
		}
		.right-container-main {
			.input-number-width {
				width: 100% !important;
			}
		}
	}
}
</style>
