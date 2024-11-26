<template>
	<div class="dialog-product">
		<el-dialog v-model="isShowDialog" draggable :close-on-click-modal="false" :width="'calc(180vh)'" :style="'min-width:calc(100vh);' + 'height:calc(95vh+5px)'" :destroy-on-close="true">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span> 选择产品 </span>
				</div>
			</template>

			<el-row :gutter="8">
				<el-col :span="6">
					<CTree @handleNodeClick="handleNodeClick" />
				</el-col>
				<el-col :span="18">
					<el-card>
						<el-form :model="queryParams" ref="queryForm" :inline="true">
							<el-form-item label="产品名称">
								<el-input v-model="queryParams.productName" clearable placeholder="请输入产品名称" />
							</el-form-item>
							<el-form-item label="产品编码">
								<el-input v-model="queryParams.itemCode" clearable placeholder="请输入产品编码" />
							</el-form-item>
							<el-form-item>
								<el-button-group>
									<el-button type="primary" icon="ele-Search" @click="loadProducts"> 查询 </el-button>
								</el-button-group>
							</el-form-item>
						</el-form>
					</el-card>
					<el-card shadow="always" style="height: calc(100vh - 225px); overflow: auto; margin-top: 8px">
						<el-table ref="tableRef" :data="tableData" border style="height: calc(100vh - 290px)" v-loading="loading" tooltip-effect="light" row-key="id">
							<el-table-column type="selection" width="50" align="center" reserve-selection />
							<el-table-column prop="serialNumber" label="编码" width="150" align="left" show-overflow-tooltip="" />
							<el-table-column prop="categoryName" label="目录" align="left" show-overflow-tooltip="" />
							<el-table-column prop="name" label="产品名称" align="left" show-overflow-tooltip="" />
							<el-table-column prop="inUnitName" label="单位名称" width="150" align="left" show-overflow-tooltip="" />
							<el-table-column prop="specific" label="规格" width="150" align="left" show-overflow-tooltip="" />
							<el-table-column prop="costPrice" label="成本价(元)" width="150" align="left" show-overflow-tooltip="" >
                                <template #default="scope">
                                    <div>
                                        {{ verifyNumberComma(scope.row.costPrice || '0.00' ) }}
                                    </div>
                                </template>
                                </el-table-column>
							<el-table-column prop="count" label="库存" width="100" align="left" show-overflow-tooltip="" />
						</el-table>

						<el-pagination
							v-model:currentPage="tableParams.page"
							v-model:page-size="tableParams.pageSize"
							:total="tableParams.total"
							:page-sizes="[10, 20, 50, 100]"
							background=""
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							layout="total, sizes, prev, pager, next, jumper"
						/>
					</el-card>
				</el-col>
			</el-row>
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="cancel">取 消</el-button>
					<el-button type="primary" size="default" @click="onproductSubmit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="dialog-product">
import { defineAsyncComponent, ref } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { InStorageApi } from '/@/api-services/api';
import { useUserInfo } from '/@/stores/userInfo';
import { verifyNumberComma } from '/@/utils/toolsValidate';

const stores = useUserInfo();
const CTree = defineAsyncComponent(() => import('/@/components/tree/index.vue'));
const isShowDialog = ref(false);
const loading = ref(false);
const tableRef = ref();
const unitObject = ref<any>({});
const emit = defineEmits(['submit']);
const queryParams = ref<any>({
	productName: '',
	itemCode: '',
	categoryId: -1,
	categoryType: 10001,
});
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0 as any,
});
const tableData = ref<any>([]);

const loadUnitData = () => {
	let productUnits = stores.productUnits;
	productUnits.forEach((item: any) => {
		unitObject.value[item.id] = item.name;
	});
};

const loadProducts = async () => {
	loading.value = true;
	await getAPI(InStorageApi)
		.apiInStorageProductPagePost(Object.assign({}, queryParams.value, tableParams.value))
		.then((res) => {
			tableData.value = res.data.result?.items ?? [];
			tableParams.value.total = res.data.result?.total;
			tableData.value.forEach((item) => {
				item.inUnitName = unitObject.value[item.inUnitId];
				item.outUnitName = unitObject.value[item.outUnitId];
			});
			loading.value = false;
		})
		.catch(() => {
			loading.value = false;
		});
	loading.value = false;
};

/**
 * 点击确认
 */
const onproductSubmit = async () => {
	const selectionData = tableRef.value.getSelectionRows();
	emit('submit', selectionData);
	isShowDialog.value = false;
};

/**
 * 点击树节点
 * @param row
 */
const handleNodeClick = async (row, code) => {
	if (row) {
		queryParams.value.categoryId = row.id;
	}
	queryParams.value.categoryType = code;
	await loadProducts();
};

// 打开弹窗
const openDialog = () => {
	isShowDialog.value = true;
	loadUnitData();
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};

// 改变页面容量
const handleSizeChange = (val: number) => {
	tableParams.value.pageSize = val;
	loadProducts();
};

// 改变页码序号
const handleCurrentChange = (val: number) => {
	tableParams.value.page = val;
	loadProducts();
};
// 导出对象
defineExpose({ openDialog });
</script>

<style scoped></style>
