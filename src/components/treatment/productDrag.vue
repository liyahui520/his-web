<template>
	<div class="productDrag">
		<el-dialog v-model="isShowDialog" width="80%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<div class="customer-row" :gutter="0" :style="{ height: screenInfo.height - 255 + 'px' }">
				<div style="position: absolute">
					<el-card
						:style="{ width: isSidebarVisible ? '10px' : '250px', float: 'left', transition: 'width 0.5s', height: screenInfo.height - 255 + 'px' }"
						:body-style="{ padding: '0px' }"
						style="border-radius: var(--el-card-border-radius); border: 1px solid var(--el-card-border-color)"
					>
						<el-tabs v-model="tabKey" class="demo-tabs">
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
						<el-button
							@click="toggleSidebar(isSidebarVisible)"
							:icon="isSidebarVisible ? DArrowRight : DArrowLeft"
							class="record-aside"
							style="width: 20px; font-weight: bold; border: 0; padding: 0"
						></el-button>
					</el-card>
				</div>
				<div :style="{ width: isSidebarVisible ? screenInfo.width - 70 + 'px' : screenInfo.width - 310 + 'px', transition: 'width 0.5s' }" style="float: right; margin-left: 30px">
					<el-scrollbar>
						<el-card class="box-card" :body-style="{ padding: '5px', height: '100%' }" style="min-width: 600px">
							<el-row :gutter="0" style="height: 100%; width: 100%" align="middle" justify="space-between">
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
											<!--                            <el-breadcrumb-item>-->
											<!--                                押金：￥0.00-->
											<!--                            </el-breadcrumb-item>-->
											<!--                            <el-breadcrumb-item>-->
											<!--                                会员卡：￥0.00-->
											<!--                            </el-breadcrumb-item>-->
											<!--                            <el-breadcrumb-item>-->
											<!--                                账户：￥0.00-->
											<!--                            </el-breadcrumb-item>-->
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
						<el-card class="box-card" :body-style="{ padding: '10px', height: '100%', border: '0px' }">
							<el-row class="mb-4">
								<!--                                <el-input  v-popover="popoverRef" v-model="value" placeholder="请输入项目名称/英文名/简称" style="width: 400px"/>-->
								<el-popover placement="bottom-start" :width="720" trigger="click" ref="popoverRef" :persistent="false">
									<template #reference>
										<el-input style="width: 400px" class="m-2" v-model="value" @input="remoteMethod"></el-input>
									</template>
									<el-table
										ref="multipleTableRef"
										:data="options"
										stripe
										highlight-current-row
										height="350px"
										size="small"
										@row-click="rowClick"
										@row-dblclick="toggleSelection"
										@selection-change="selectRow"
									>
										<el-table-column type="selection" width="55" />
										<el-table-column width="120" property="typeText" label="类型">
											<template #default="scope">
												<el-tag type="success" effect="light">
													{{ scope.row.typeText }}
												</el-tag>
											</template>
										</el-table-column>
										<el-table-column width="150" property="name" label="产品名称">
											<template #default="scope">
												<span v-html="verifyTextColor(queryValue, scope.row.name)"></span>
											</template>
										</el-table-column>
										<el-table-column width="120" property="salePrice" label="单价">
											<template #default="scope">
												<span>{{ verifyNumberComma(scope.row.salePrice.toFixed(2).toString()) }}</span>
											</template>
										</el-table-column>
										<el-table-column width="120" property="englishName" label="英文名">
											<template #default="scope">
												<span v-html="verifyTextColor(queryValue, scope.row.englishName)"></span>
											</template>
										</el-table-column>
										<el-table-column width="120" property="nameLetter" label="简称">
											<template #default="scope">
												<span v-html="verifyTextColor(queryValue, scope.row.nameLetter)"></span>
											</template>
										</el-table-column>
									</el-table>
								</el-popover>
								<el-button type="primary" style="margin-left: 20px" @click="submit">保存检验项目</el-button>
								<!-- <el-button type="success">打印</el-button>
                                <el-button type="info">预览</el-button> -->
								<!-- <el-button type="warning">打包</el-button> -->
							</el-row>
						</el-card>
						<div>
							<el-table :data="tableData" :height="screenInfo.height - 380" stripe highlight-current-row>
								<el-table-column label="序号" type="index" width="55" show-overflow-tooltip />
								<el-table-column label="检验信息" style="text-align: center">
									<el-table-column prop="typeText" label="分组" min-width="110">
										<template #default="scope">
											<el-select
												v-model="scope.row.orderId"
												filterable
												v-if="scope.row.child == null || scope.row.child.length <= 0"
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

									<el-table-column prop="typeText" label="类型" min-width="100" show-overflow-tooltip />
									<el-table-column prop="itemName" label="项目名称" min-width="150" show-overflow-tooltip />
								</el-table-column>
								<el-table-column label="计费信息">
									<el-table-column prop="count" label="数量" min-width="120" show-overflow-tooltip>
										<template #default="scope">
											<el-input v-model="scope.row.count" type="number" min="1" @change="countCharge(scope.row)" />
										</template>
									</el-table-column>
									<el-table-column prop="salePrice" label="单价" min-width="120" show-overflow-tooltip>
										<template #default="scope">
											<el-input
												v-model="scope.row.salePrice"
												:formatter="
													(value) => {
														return formatInput(value);
													}
												"
												:parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
												@change="countCharge(scope.row)"
											/>
											<!--                                            {{ verifyNumberComma(scope.row.salePrice.toFixed(2).toString()) }}-->
										</template>
									</el-table-column>
									<el-table-column prop="amountPrice" label="总金额" min-width="120" show-overflow-tooltip>
										<template #default="scope">
											{{ verifyNumberComma(scope.row.amountPrice?.toFixed(2).toString() ?? '0.00') }}
										</template>
									</el-table-column>
								</el-table-column>
								<el-table-column prop="remark" label="备注" width="" show-overflow-tooltip />
								<el-table-column fixed="right" label="操作" width="80">
									<template #default="scope">
										<el-button link type="danger" size="small" :icon="DeleteFilled" @click="deleteRow(scope.$index)"> 删除 </el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-scrollbar>
				</div>
			</div>

			<!-- 
            <template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel" size="default">取 消</el-button>
					<el-button type="primary" @click="submit" size="default">确 定</el-button>
				</span>
            </template> -->
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="productDrag">
import { reactive, ref, nextTick, onMounted, defineAsyncComponent } from 'vue';
import { ElMessage, ElTable } from 'element-plus';
import { DocumentAdd, DArrowLeft, DArrowRight, DeleteFilled } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductCategorysApi, ProductTestApi, CEMRecordApi } from '/@/api-services/api';
import { verifyNumberComma, verifyTextColor } from '/@/utils/toolsValidate';
import { ProductTypeEnums } from '/@/api-services';
import { formatAge } from '/@/utils/formatTime';
import { CEMRecordItemGroupTypeEnum } from '/@/api-services/models/cemrecord-manage';
import other from '/@/utils/other';

const CategroyProducts = defineAsyncComponent(() => import('/@/components/tree/categroyProducts.vue'));
const isSidebarVisible = ref(false);
const tabKey = ref('first');
const sidebarWidth = ref('');
const queryValue = ref();
const popoverOpen = ref(false);
const popoverRef = ref();
const orderGroupData = ref<any>([]);
const orderGroupObject = ref<any>({});
const isAdding = ref(false);
const optionName = ref('');
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '挂号',
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

const screenInfo = reactive({
	height: 0,
	width: 0,
});
const handleResize = () => {
	screenInfo.height = window.innerHeight;
	screenInfo.width = window.innerWidth * 0.8;
};

//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const categroyProductsRef = ref();
//选择产品--------------Start-----------------
const productloading = ref(false);
const value = ref<any>([]);
const options = ref([]);

const selectRowList = ref([]);
const multipleTableRef = ref<InstanceType<typeof ElTable>>();

//选择产品--------------END -------------------
const tableData = ref<any>([]);

const testData = ref<any>({
	recordId: 0,
	regId: 0,
	amountPrice: 0,
	count: 0,
});

//格式化
const formatInput = (val) => {
	return verifyNumberComma(val);
};

const countCharge = (row) => {
	row.amountPrice = row.count * row.salePrice;
};

const deleteRow = async (index) => {
	tableData.value.splice(index, 1);
};

//选择产品
const remoteMethod = async () => {
	if (value.value) {
		queryValue.value = value.value;
		popoverOpen.value = true;
		productloading.value = true;
		await getAPI(ProductTestApi)
			.apiProductTestNameListByNameGet({ name: value.value })
			.then((res) => {
				options.value = res.data?.result ?? [];
			})
			.finally(() => {
				productloading.value = false;
			});
	} else {
		popoverOpen.value = false;
	}
};

const rowClick = async (rows) => {
	if (rows) {
		multipleTableRef.value!.toggleRowSelection(rows, true);
	} else {
		multipleTableRef.value!.clearSelection();
	}
};

const handleNodeClick = async (item) => {
	tableData.value.push({
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
		unitName: item.outUnitName,
		unitId: item.outUnitId,
	});
};

//处理数据
const refreshData = async (rows) => {
	var r = rows.reduce((all: any, item) => {
		all.push({
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
			unitName: item.outUnitName,
			unitId: item.outUnitId,
		});
		return all;
	}, []);
	return r;
};

//双击事件
const toggleSelection = async (rows) => {
	let d = other.deepClone(selectRowList.value);
	let netb = [] as any;
	if (d.length > 0) {
		let r = await refreshData(d);
		netb = [...tableData.value, ...r];
	} else {
		netb.push(rows);
		let r = await refreshData(netb);
		// tableData.value.push(rows);
		netb = [...tableData.value, ...r];
	}
	tableData.value = netb;
	popoverRef.value.hide();
};

//获取选中的行值
const selectRow = async (se) => {
	selectRowList.value = se;
};

const toggleSidebar = async (v) => {
	await nextTick(() => {
		isSidebarVisible.value = !v ? true : false;
		sidebarWidth.value = !v.value ? '' : '0';
	});
};
const onConfirm = async () => {
	if (optionName.value) {
		await getAPI(CEMRecordApi)
			.apiCEMRecordAddCemRecordItemGroupPost({
				name: optionName.value,
				type: CEMRecordItemGroupTypeEnum.NUMBER_0,
			})
			.then(async () => {
				clear();
				await loadOrderGroupData();
			});
	}
};
const clear = () => {
	optionName.value = '';
	isAdding.value = false;
};
const onAddOption = () => {
	isAdding.value = true;
};
const changeOrderGroup = (row) => {
	if (row.orderId) row.orderName = orderGroupObject.value[row.orderId];
};
/**
 * 加载单位数据
 */
const loadOrderGroupData = async () => {
	await getAPI(CEMRecordApi)
		.apiCEMRecordGetCemRecordItemGroupsPost({ type: CEMRecordItemGroupTypeEnum.NUMBER_0 })
		.then((res) => {
			orderGroupData.value = res.data.result ?? [];
			orderGroupData.value.forEach((item: any) => {
				orderGroupObject.value[item.id] = item.name;
			});
		});
};
// 打开弹窗
const openDialog = async (row) => {
	tableData.value = [];
	isShowDialog.value = true;
	if (row) {
		tableData.value = other.deepClone(row.cemRecordTestItem);
		testData.value = row;
	}
	await nextTick(() => {
		categroyProductsRef.value?.handleList(1);
	});
	await loadOrderGroupData();
};
// 关闭弹窗
const closeDialog = () => {
	ruleFormRef.value?.resetFields();
	emit('reloadTable');
	isShowDialog.value = false;
};

// 取消
const cancel = () => {
	ruleFormRef.value?.resetFields();
	emit('reloadTable');
	isShowDialog.value = false;
};

const submit = async () => {
	if (tableData.value.length <= 0) {
		ElMessage.error('请选择要保存的项目！');
		return;
	}
	testData.value.cemRecordTestItem = tableData.value;
	if (testData.value.id > 0) await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdEditTestsPut(props.treatData.regId, props.treatData.id, testData.value);
	else await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdAddTestsPost(props.treatData.regId, props.treatData.id, testData.value);
	await cancel();
};

//化验
const getData = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_110001);
	return a.data?.result ?? [];
};

//试纸
const getDataPaper = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_150001);
	return a.data?.result ?? [];
};

//显微镜
const getDataMicroscope = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_130001);
	return a.data?.result ?? [];
};

//摄影检查
const getDataX = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_100001);
	return a.data?.result ?? [];
};

//超声检查
const getDataB = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_90001);
	return a.data?.result ?? [];
};

// 页面加载时
onMounted(async () => {
	screenInfo.height = window.innerHeight;
	screenInfo.width = window.innerWidth * 0.8;
	window.addEventListener('resize', handleResize);
});
//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style scoped lang="scss">
.demo-tabs {
	.el-tabs__content {
		height: 100% !important;
	}
}

:deep(.el-dialog__body) {
	min-height: calc(100vh - 250px) !important;
	background-color: #eef0f7;
	padding: 3px;
	.customer-row {
		min-height: calc(100vh - 255px) !important;
		//margin-right: -20px !important;
	}
}

.productDrag {
	:deep(.el-table__header) {
		.cell {
			text-align: center !important;
		}
	}
	:deep(.el-overlay .el-overlay-dialog .el-dialog .el-dialog__body) {
		padding: 5px !important;
	}
	.record-aside {
		cursor: pointer;
		width: 16px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		top: 50%;
		margin-right: -18px;
		right: 0;
		//left: -15px;
		margin-top: -20px;
		font-size: 16px;
		color: #0f9bfc;
		background-color: var(--el-color-white);
	}
	:deep(.el-tabs__header) {
		padding: 0 0 0 5px !important;
	}

	.el-select-v2 {
		:deep(.el-select-v2__selected-item) {
			.el-tag {
				width: 0;
				opacity: 0;
				margin: 0;
				overflow: hidden;
				border: 0;
				padding: 0;
			}
		}
	}
}
</style>
