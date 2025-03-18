<template>
	<div class="productDrugDrag">
		<el-dialog v-model="isShowDialog" width="80%" draggable fullscreen :close-on-click-modal="false" :destroy-on-close="true" :before-close="closeBefore">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<div class="customer-row" :gutter="0" :height="screenInfo.height - 0">
				<div>
					<el-card
						:style="{ width: isSidebarVisible ? '10px' : '240px', float: 'left', height: screenInfo.height - 70 + 'px', transition: 'width 0.5s' }"
						:body-style="{ padding: '0px' }"
						style="border-radius: var(--el-card-border-radius); border: 1px solid var(--el-card-border-color)"
					>
						<el-tabs v-model="tabKey">
							<el-tab-pane label="药品" name="first" style="overflow: auto; padding-left: 15px">
								<CategroyProducts ref="categroyProductsRef" :getData="getData" :addAuth="false" @handleNodeClick="handleNodeClick" :height="175" :updateAuth="false" :deleteAuth="false" />
							</el-tab-pane>
							<el-tab-pane label="处置" name="second" style="overflow: auto">
								<CategroyProducts ref="categroyProductsRef" :getData="getDataPaper" :addAuth="false" @handleNodeClick="handleNodeClick" :height="175" :updateAuth="false" :deleteAuth="false" />
							</el-tab-pane>
							<el-tab-pane label="消耗品" name="fourth1" style="overflow: auto">
								<CategroyProducts ref="categroyProductsRef" :getData="getDataMicroscope" :addAuth="false" @handleNodeClick="handleNodeClick" :height="175" :updateAuth="false" :deleteAuth="false" />
							</el-tab-pane>
						</el-tabs>
					</el-card>
					<el-button
						@click="toggleSidebar(isSidebarVisible)"
						:icon="isSidebarVisible ? DArrowRight : DArrowLeft"
						class="record-aside"
						style="width: 20px; font-weight: bold; border: 0; padding: 0"
					></el-button>
				</div>
				<div :style="{ width: tableScreen.width + 'px', float: 'left', height: screenInfo.height - 60 + 'px', 'margin-left': '20px', transition: 'width 0.5s' }">
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
										:tree-props="{ children: 'child' }"
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
												<el-tooltip class="box-item" effect="dark" :content="scope.row.name" placement="top-start">
													<el-text truncated>
														<span v-html="verifyTextColor(queryValue, scope.row.name)"></span>
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
														<span v-html="verifyTextColor(queryValue, scope.row.englishName)"></span>
													</el-text>
												</el-tooltip>
											</template>
										</el-table-column>
										<el-table-column width="120" property="nameLetter" label="简称">
											<template #default="scope">
												<el-tooltip class="box-item" effect="dark" :content="scope.row.nameLetter" placement="top-start">
													<el-text truncated>
														<span v-html="verifyTextColor(queryValue, scope.row.nameLetter)"></span>
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
								<!-- <el-button type="success">打印</el-button>
                <el-button type="info">预览</el-button> -->
								<el-button type="warning" @click="pack">打包</el-button>
							</el-row>
						</el-card>
						<div>
							<el-table
								:data="tableData.cemRecordPrescriptionItems"
								class="cus-table"
								:height="screenInfo.height - 195"
								stripe
								selectable
								highlight-current-row
								@selection-change="SelectionRows"
								:span-method="arraySpanMethod"
								:tree-props="{ children: 'child' }"
								row-key="vKey"
							>
								<el-table-column type="selection" width="55" :selectable="selectable" align="center"> </el-table-column>
								<!--                                <el-table-column label="序号" type="index" width="55" show-overflow-tooltip/>-->
								<el-table-column label="项目信息" style="text-align: center">
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
											<el-breadcrumb separator="|" v-else-if="scope.row.child != null && scope.row.child.length > 0">
												<el-breadcrumb-item>打包名称：{{ scope.row.itemName }} </el-breadcrumb-item>
												<el-breadcrumb-item>总项：{{ scope.row.count }}</el-breadcrumb-item>
												<el-breadcrumb-item>
													总金额：{{
														scope.row.amountPrice ??
														verifyNumberComma(
															parseFloat(scope.row?.amountPrice ?? 0.0)
																?.toFixed(2)
																.toString() ?? '0.00'
														)
													}}
												</el-breadcrumb-item>
												<el-breadcrumb-item></el-breadcrumb-item>
											</el-breadcrumb>
										</template>
									</el-table-column>
									<el-table-column prop="typeText" label="类型" min-width="60" show-overflow-tooltip />
									<el-table-column prop="itemName" label="项目名称" min-width="150" show-overflow-tooltip />
									<el-table-column prop="itemName" label="使用方式" min-width="150" show-overflow-tooltip>
										<template #default="scope">
											<el-select v-model="scope.row.dosingWay" filterable placeholder="请选择使用方式" style="width: 100%">
												<el-option v-for="item in dosingWayData" :key="item.id" :label="item.value" :value="item.id"></el-option>
											</el-select>
										</template>
									</el-table-column>
									<el-table-column prop="specific" label="规格" show-overflow-tooltip />
								</el-table-column>
								<el-table-column label="投药信息" style="text-align: center">
									<el-table-column prop="useDose" label="单次用量" min-width="80">
										<template #default="scope">
											<el-input
												type="number"
												v-model="scope.row.useDose"
												v-if="scope.row.useMaxDose > 0 && scope.row.useMinDose > 0 && !scope.row.isPack"
												:min="scope.row.useMinDose"
												:max="scope.row.useMaxDose"
												controls-position="right"
											/>
											<el-input type="number" v-model="scope.row.useDose" v-else-if="!scope.row.isPack" min="1" controls-position="right" />
											<span v-else>{{ scope.row.useDose }}</span>
										</template>
									</el-table-column>
									<el-table-column prop="unitName" label="单位" min-width="60" show-overflow-tooltip />
									<el-table-column prop="dayNum" label="天数" min-width="70" show-overflow-tooltip>
										<template #default="scope">
											<el-input v-model="scope.row.dayNum" type="number" min="1" v-if="!scope.row.isPack" @change="dayCharge(scope.row)" />
											<span v-else>{{ scope.row.dayNum }}</span>
										</template>
									</el-table-column>
									<el-table-column prop="useMethods" label="次/天" min-width="70" show-overflow-tooltip>
										<template #default="scope">
											<el-input v-model="scope.row.useMethods" type="number" min="1" v-if="!scope.row.isPack" @change="dayCharge(scope.row)" />
											<span v-else>{{ scope.row.useMethods }}</span>
										</template>
									</el-table-column>
									<el-table-column prop="amountCount" label="总次数" min-width="70" show-overflow-tooltip />
								</el-table-column>
								<el-table-column label="计费信息" fixed="right">
									<!--                                    <el-table-column prop="unitName" label="单位" min-width="80" show-overflow-tooltip/>-->
									<el-table-column prop="count" label="数量" min-width="90" show-overflow-tooltip>
										<template #default="scope">
											<el-input v-model="scope.row.count" type="number" min="1" v-if="!scope.row.isPack" @change="countCharge(scope.row)" />
											<span v-else>{{ scope.row.count }}</span>
										</template>
									</el-table-column>
									<el-table-column prop="salePrice" label="单价" min-width="100" show-overflow-tooltip>
										<template #default="scope">
											<el-input
												v-model="scope.row.salePrice"
												v-if="!scope.row.isPack"
												:formatter="
													(value) => {
														return formatInput(value);
													}
												"
												:parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
												@change="countCharge(scope.row)"
											/>

											<span v-else>{{
												scope.row?.salePrice
													? verifyNumberComma(
															parseFloat(scope.row?.salePrice ?? 0.0)
																.toFixed(2)
																.toString() ?? '0.00'
														)
													: verifyNumberComma('0.00')
											}}</span>
											<!--                                            {{ verifyNumberComma(scope.row.salePrice.toFixed(2).toString()) }}-->
										</template>
									</el-table-column>
									<el-table-column prop="amountPrice" label="总金额" min-width="100" show-overflow-tooltip>
										<template #default="scope">
											{{
												verifyNumberComma(
													parseFloat(scope.row.amountPrice ?? 0.0)
														.toFixed(2)
														?.toString() ?? '0.00'
												)
											}}
										</template>
									</el-table-column>
								</el-table-column>
								<el-table-column fixed="right" label="操作" width="80">
									<template #default="scope">
										<el-button link type="danger" size="small" :icon="DeleteFilled" v-if="(!scope.row.child || scope.row.child.length <= 0) && !scope.row.isPack" @click="deleteRow(scope.$index)">
											删除
										</el-button>
										<el-button link type="danger" size="small" :icon="DeleteFilled" v-else-if="scope.row.child && scope.row.child.length > 0 && scope.row.isPack" @click="deleteRow(scope.$index)">
											删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-scrollbar>
				</div>

				<div style="float: right">
					<el-card :body-style="{ padding: '0px' }" :style="{ height: screenInfo.height - 70 + 'px', width: isRigheSidebarVisible ? '10px' : '245px', transition: 'width 0.5s' }">
						<el-tabs>
							<el-tab-pane label="单院套餐" name="tc-first" style="overflow: auto">
								<CategroyProducts ref="categroyProductsRef" :getData="getSingMeal" :addAuth="false" @handleNodeClick="handleNodeClick" :height="175" :updateAuth="false" :deleteAuth="false" />
							</el-tab-pane>
							<el-tab-pane label="连锁套餐" name="tc-second" style="overflow: auto">
								<CategroyProducts ref="categroyProductsRef" :getData="getSingMeal" :addAuth="false" @handleNodeClick="handleNodeClick" :height="175" :updateAuth="false" :deleteAuth="false" />
							</el-tab-pane>
						</el-tabs>
					</el-card>
					<el-button
						@click="toggleRightSidebar(isRigheSidebarVisible)"
						:icon="isRigheSidebarVisible ? DArrowLeft : DArrowRight"
						class="record-right-aside"
						style="width: 20px; font-weight: bold; border: 0; padding: 0"
					></el-button>
				</div>
				<!--                <div  style="block-size: auto;margin: 0;padding: 0;width: 25px;float: right" :style="{height:screenInfo.height-70+'px'}">-->
				<!--                    -->
				<!--                </div>-->
			</div>

			<PackDrug ref="packDrugRef" @reloadTable="packLoad" />
			<!--            <template #footer>-->
			<!--				<span class="dialog-footer">-->
			<!--					<el-button @click="cancel" size="default">取 消</el-button>-->
			<!--					<el-button type="primary" @click="submit" size="default">确 定</el-button>-->
			<!--				</span>-->
			<!--            </template>-->
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="productDrugDrag">
import { reactive, ref, nextTick, onMounted, defineAsyncComponent, computed } from 'vue';
import { ElMessageBox,ElMessage, ElTable } from 'element-plus';
import { DocumentAdd, DArrowLeft, DArrowRight, DeleteFilled } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductCategorysApi, CEMRecordApi, ProductDrugsApi,SysDictDataApi } from '/@/api-services/api';
import { CEMRecordItemGroupTypeEnum } from '/@/api-services/models/cemrecord-manage';
import { verifyNumberComma, verifyTextColor } from '/@/utils/toolsValidate';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';
import { formatAge } from '/@/utils/formatTime';
import commonFunction from '/@/utils/commonFunction';
import { useUserInfo } from '/@/stores/userInfo';
import other from '/@/utils/other';
import Decimal from 'decimal.js';

const stores = useUserInfo();
const { generateGUID } = commonFunction();
const CategroyProducts = defineAsyncComponent(() => import('/@/components/tree/categroyProducts.vue'));
const PackDrug = defineAsyncComponent(() => import('/@/components/treatment/packDrug.vue'));
const isSidebarVisible = ref(false);
const isRigheSidebarVisible = ref(false);
const tabKey = ref('first');
const queryValue = ref();
const popoverOpen = ref(false);
const popoverRef = ref();
const packDrugRef = ref();
const isAdding = ref(false);
const optionName = ref('');
const amount = ref(0.0);
const tableScreen = reactive({
	width: 0,
});
//老数据
const oldData = ref();
const unitData = ref<any>([]);
const unitObject = ref<any>({});

//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const isShowDialog = ref(false);
const categroyProductsRef = ref();
//选择产品--------------Start-----------------
const productloading = ref(false);
const value = ref<any>([]);
const options = ref([]);
const dosingWayData = ref<any>([]);
const orderGroupData = ref<any>([]);
const orderGroupObject = ref<any>([]);
const selectRowList = ref([]);
const multipleTableRef = ref<InstanceType<typeof ElTable>>();

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

const testData = ref({
	recordId: 0,
	regId: 0,
	// 金额
	amountPrice: 0,
	// 数量
	count: 0,
});
const tableData = ref<any>({ cemRecordPrescriptionItems: [] });
// //监听数据
// watch(
// 	() => testData.value,
// 	(newValue, oldValue) => {
// 		sumAmount();
// 	}
// );
const packRows = ref([]);
const screenInfo = reactive({
	height: 0,
	width: 0,
});
const onAddOption = () => {
	isAdding.value = true;
};
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

const closeBefore = async (done) => {
	if (JSON.stringify(oldData.value) != JSON.stringify(tableData.value)) {
		ElMessageBox.confirm(`数据已修改，是否保存?`, '提示', {
			confirmButtonText: '保存',
			cancelButtonText: '取消',
			type: 'warning',
			showClose: true,
			distinguishCancelAndClose: true,
		})
			.then((_) => {
				savePrescription();
			})
			.catch((_) => {
				if (_ === 'cancel') done();
			});
	} else {
		done();
	}
};

const totalAmountComputed = computed(() => {
	let totalAmountValue = tableData.value?.cemRecordPrescriptionItems.reduce((pre:any, item:any) => {
		let accumulateAmount = new Decimal(pre).add(new Decimal(item.amountPrice));
		return new Decimal(accumulateAmount);
	}, 0);
	const result = totalAmountValue.toFixed(2, Decimal.ROUND_UP);
	return new Decimal(result).toNumber();
});
// //计算总金额
// const sumAmount = async () => {
// 	amount.value = 0.0;
// 	if (tableData.value?.cemRecordPrescriptionItems?.length > 0) {
// 		let allList = tableData.value?.cemRecordPrescriptionItems.reduce((all: any, item) => {
// 			amount.value += parseFloat(item.amountPrice);
// 			all.push(item);
// 			return all;
// 		}, []);
// 		tableData.value.cemRecordPrescriptionItems = other.deepClone(allList);
// 	}
// };

const clear = () => {
	optionName.value = '';
	isAdding.value = false;
};
const handleResize = () => {
	screenInfo.height = window.innerHeight;
	screenInfo.width = window.innerWidth;
	let w = window.innerWidth;
	if (!isSidebarVisible.value) w = w - 320;
	else {
		w = w - 80;
	}
	if (!isRigheSidebarVisible.value) w = w - 300;
	else {
		w = w - 80;
	}
	tableScreen.width = w;
};

//选择产品--------------END -------------------

//格式化
const formatInput = (val) => {
	return verifyNumberComma(parseFloat(val).toFixed(2).toString());
};

//合并行
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
	if (row.child && row.child.length > 0) {
		if (columnIndex === 1) {
			return [1, 14];
		} else if (columnIndex != 14) {
			return [0, 0];
		} else {
			return [1, 1];
		}
	}
};

//获取table选中的值
const SelectionRows = async (rows) => {
	packRows.value = rows;
};

//保存处方
const savePrescription = async () => {
	var json = other.deepClone(tableData.value.cemRecordPrescriptionItems) as any;
	if (tableData.value.id) await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdIdEditPrescriptionPut(props.treatData?.regId, props.treatData?.id, tableData.value.id, json);
	else await getAPI(CEMRecordApi).apiCEMRecordRegIdRecordIdAddPrescriptionPost(props.treatData?.regId, props.treatData?.id, json);
	await closeDialog();
};

const countCharge = async (row) => {
	row.amountPrice = row.count * row.salePrice;
	// await sumAmount();
};

const deleteRow = async (index) => {
	tableData.value.cemRecordPrescriptionItems.splice(index, 1);
	// await sumAmount();
};

//计算投药量
const dayCharge = async (row) => {
	row.amountCount = row.dayNum * row.useMethods;
};

const changeOrderGroup = (row) => {
	if (row.orderId) row.orderName = orderGroupObject.value[row.orderId];
};

//选择产品
const remoteMethod = async () => {
	if (value.value) {
		queryValue.value = value.value;
		popoverOpen.value = true;
		productloading.value = true;
		await getAPI(ProductDrugsApi)
			.apiProductDrugsNameKindIdListByNameGet(value.value, props.data?.pPetsInfo?.petKind ?? 0)
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
		multipleTableRef.value!.toggleRowSelection(rows, undefined);
	} else {
		multipleTableRef.value!.clearSelection();
	}
};

const packLoad = async (row) => {
	row.child.reduce((all: [], item) => {
		tableData.value.cemRecordPrescriptionItems = tableData.value.cemRecordPrescriptionItems.filter((i, index) => i.vKey != item.vKey);
	}, []);
	row.recordId = props.treatData?.id;
	row.regId = props.treatData?.regId;
	tableData.value.cemRecordPrescriptionItems.push(other.deepClone(row));
	// await sumAmount();
};

const handleNodeClick = async (item: any) => {
	let json = {
		recordId: props.treatData?.id,
		regId: props.treatData?.regId,
		itemId: item.id,
		itemName: item.name,
		type: item.type,
		typeText: item.typeText,
		count: 1,
		salePrice: item.salePrice,
		amountPrice: item.salePrice,
		isEditPrice: 0,
		remark: '',
		unitName: unitObject.value[item.outUnitId], //
		unitId: item.outUnitId,
		specific: item.specific,
		useDose: 1,
		useMethods: item.useMethods ?? 1,
		dayNum: 1,
		amountCount: item.useMethods ?? 1,
		dosingWay: item.dosingWay,
		isPack: false,
		child: null,
		useMaxDose: item.useMaxDose ?? 0,
		useMinDose: item.useMinDose ?? 0,
		vKey: generateGUID(),
	};
	tableData.value.cemRecordPrescriptionItems.push(json);
};

//处理数据
const refreshData = async (rows) => {
	let r = rows.reduce((all: any, item) => {
		let json = {
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
			specific: item.specific,
			useDose: item.useDose ?? 1,
			useMethods: item.useMethods ?? 1,
			dayNum: 1,
			amountCount: item.useMethods ?? 1,
			dosingWay: item.dosingWay,
			isPack: false,
			child: null,
			useMaxDose: item.useMaxDose ?? 0,
			useMinDose: item.useMinDose ?? 0,
			vKey: generateGUID(),
		};
		all.push(json);
		return all;
	}, []);
	return r;
};

const selectable = async (row, index) => {
	return false;
};

//双击事件
const toggleSelection = async (rows) => {
	let d = other.deepClone(selectRowList.value);
	let netb = [] as any;
	if (d.length > 0) {
		let r = await refreshData(d);
		netb = [...tableData.value.cemRecordPrescriptionItems, ...r];
	} else {
		netb.push(rows);
		let r = await refreshData(netb);
		// tableData.value.push(rows);
		netb = [...tableData.value.cemRecordPrescriptionItems, ...r];
	}
	tableData.value.cemRecordPrescriptionItems = netb;
	popoverRef.value.hide();
};

//获取使用方式
const getUsingMethods = async () => {
	let res = await getDictDataDropdownList('code_dosing_way');
	dosingWayData.value = res ?? [];
};

const getDictDataDropdownList = async (val: any) => {
	let list = await getAPI(SysDictDataApi).apiSysDictDataDataListCodeGet(val);
	return list.data.result ?? [];
};

//获取选中的行值
const selectRow = async (se) => {
	selectRowList.value = se;
};

const toggleSidebar = async (v) => {
	await nextTick(() => {
		isSidebarVisible.value = !v ? true : false;
		if (!v) {
			tableScreen.width = tableScreen.width + 230;
		} else {
			tableScreen.width = tableScreen.width - 230;
		}
	});
};

const toggleRightSidebar = async (v) => {
	await nextTick(() => {
		isRigheSidebarVisible.value = !v ? true : false;
		if (!v) {
			tableScreen.width = tableScreen.width + 240;
		} else {
			tableScreen.width = tableScreen.width - 240;
		}
	});
};


// 打开弹窗
const openDialog = async (row) => {
	oldData.value = other.deepClone(row);
	if (row?.cemRecordPrescriptionItems?.length > 0) {
		let allList = row?.cemRecordPrescriptionItems.reduce((all: any, item) => {
			if (!item.vKey) item.vKey = generateGUID();
			if (item.child && item.child.length > 0) {
				let c = item.child.reduce((a: any, i: any) => {
					i.child = null;
					i.vKey = generateGUID();
					a.push(i);
					return a;
				}, []);
				item.child = c;
			}
			all.push(item);
			return all;
		}, []);
		tableData.value.cemRecordPrescriptionItems = other.deepClone(allList);
		oldData.value.cemRecordPrescriptionItems = other.deepClone(allList);
	}

	isShowDialog.value = true;
	if (row) {
		tableData.value = other.deepClone(row);
		testData.value = row;
	}
	await getUsingMethods();
	await loadOrderGroupData();
	await nextTick(() => {
		categroyProductsRef.value?.handleList(1);
	});
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

//打包
const pack = async () => {
	packRows.value = packRows.value.filter((item:any, index) => item.isPack === false);
	if (packRows.value.length <= 0) {
        ElMessage.warning('请先选择要打包的数据');
        return;
    }
	packDrugRef.value?.openDialog(packRows.value);
};
/**
 * 加载单位数据
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
 * 加载单位数据
 */
const loadUnitData = async () => {
	let productUnits = stores.productUnits;
	unitData.value = productUnits ?? [];
	unitData.value.forEach((item: any) => {
		unitObject.value[item.id] = item.name;
	});
};
const getSingMeal=async ()=>{

}
//药品
const getData = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_20001);
	return a.data?.result ?? [];
};

//处置
const getDataPaper = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_120001);
	return a.data?.result ?? [];
};

//消耗品
const getDataMicroscope = async () => {
	var a = await getAPI(ProductCategorysApi).apiProductCategorysCategoryTypeListProductGet(ProductTypeEnums.NUMBER_140001);
	return a.data?.result ?? [];
};

// 页面加载时
onMounted(async () => {
	screenInfo.height = window.innerHeight;
	screenInfo.width = window.innerWidth;
	let w = window.innerWidth;
	tableScreen.width = w - 580;
	window.addEventListener('resize', handleResize);
	await loadUnitData();
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
	max-height: inherit !important;
	padding: 8px !important;
	overflow-x: inherit !important;
	overflow-y: inherit !important;
	background-color: #eef0f7;

}

:deep(.el-overlay .el-overlay-dialog .el-dialog .el-dialog__body) {
	padding: 8px !important;
}

.productDrugDrag {
	:deep(.el-table__header) {
		.cell {
			text-align: center !important;
		}
	}

	.record-aside {
		cursor: pointer;
		width: 16px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		top: 50%;
		margin-left: -2px;
		//left: -15px;
		margin-top: -20px;
		font-size: 16px;
		color: #0f9bfc;
		background-color: var(--el-color-white);
	}

	.el-table__row {
		.el-breadcrumb {
			font-weight: bold;
		}
	}

	.record-right-aside {
		cursor: pointer;
		width: 16px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		top: 50%;
		margin-left: -2px;
		//right: 15px;
		margin-top: -20px;
		//right: 0px;
		margin-left: -18px;
		font-size: 16px;
		color: #0f9bfc;
		background-color: var(--el-color-white);
	}

	:deep(.el-tabs__header) {
		padding: 0 0 0 5px !important;
	}

	:deep(#tab-first) {
		padding-left: 15px !important;
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

	.cus-table {
		:deep(.el-table__indent) {
			padding-left: initial !important;
		}

		:deep(.el-table__placeholder) {
			width: initial !important;
		}
	}
}
</style>
