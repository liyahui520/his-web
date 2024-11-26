<template>
			<el-table :data="tableData" style="width: 100%" v-loading="loading" tooltip-effect="light" row-key="id" border="">
				<el-table-column type="index" label="序号" width="55" align="center" fixed="left" />
				<el-table-column prop="name" label="名称" fixed="left" show-overflow-tooltip="" />
				<el-table-column prop="categoryName" label="目录" show-overflow-tooltip="" />
				<el-table-column prop="barCode" label="条形码" show-overflow-tooltip="" />
				<el-table-column prop="providerName" label="供应商" show-overflow-tooltip="" />
				<el-table-column prop="manufacturerName" label="生产商" show-overflow-tooltip="" />
				<el-table-column prop="brandName" label="品牌" show-overflow-tooltip="" />
				<el-table-column prop="nameLetter" label="缩写" show-overflow-tooltip="" />
				<el-table-column prop="englishName" label="英文名称" show-overflow-tooltip="" />
				<el-table-column prop="commonName" label="通用名称" show-overflow-tooltip="" />
				<el-table-column prop="salePrice" label="销售价格" width="120"   >
                    <template #default="scope">
                        <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="verifyNumberCnUppercase(scope.row.salePrice.toFixed(2))"
                                placement="top"
                        >
                        {{verifyNumberComma(scope.row.salePrice.toFixed(2)) || '0.00'}}
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="memberPrice" label="会员价格" width="120" >
                    <template #default="scope">
                        <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="verifyNumberCnUppercase(scope.row.memberPrice.toFixed(2))"
                                placement="top"
                        >
                            {{verifyNumberComma(scope.row.memberPrice.toFixed(2)) || '0.00'}}
                        </el-tooltip>
                    </template>
                </el-table-column>
				<el-table-column prop="isDiscount" label="参与打折" width="120" show-overflow-tooltip="">
					<template #default="scope">
						<el-tag v-if="scope.row.isDiscount"> 是 </el-tag>
						<el-tag type="danger" v-else> 否 </el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="canSale" label="可销售" width="120" show-overflow-tooltip="">
					<template #default="scope">
						<el-tag v-if="scope.row.canSale"> 是 </el-tag>
						<el-tag type="danger" v-else> 否 </el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="inUnitName" label="入库单位" width="120" show-overflow-tooltip="" />
				<el-table-column prop="outUnitName" label="出库单位" width="120" show-overflow-tooltip="" />
				<el-table-column prop="inSpecific" label="转换方式" width="130" show-overflow-tooltip="">
					<template #default="scope">
						<el-tag> 1 {{scope.row.inUnitName}} = {{ scope.row.inSpecific }} {{ scope.row.outUnitName }} </el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="140" align="center" fixed="right" show-overflow-tooltip="" v-if="auth('products:goods:update') || auth('products:goods:delete')">
					<template #default="scope">
						<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditProductgoods(scope.row)" v-auth="'products:goods:update'"> 编辑 </el-button>
						<el-button icon="ele-Delete" size="small" text="" type="danger" @click="delProductgoods(scope.row)" v-auth="'products:goods:delete'"> 删除 </el-button>
					</template>
				</el-table-column>
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
			<editDialog ref="editDialogRef" :title="editProductgoodsTitle" @reloadTable="handleQuery" />
</template>

<script lang="ts" setup name="productGoodsVue">
import { ref, watch, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';

import editDialog from '/@/views/products/goods/component/editDialog.vue';
import { getAPI } from '/@/utils/axios-utils';
import { ProductGoodsApi } from '/@/api-services/api';
import mittBus from '/@/utils/newmitt';
import {
    verifyNumberComma,verifyNumberCnUppercase
} from '/@/utils/toolsValidate';
const editDialogRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({ isDiscount: true, name: '', categoryId: -1 });
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0,
});
const editProductgoodsTitle = ref('');

// 查询操作
const handleQuery = async (data: any) => {
	loading.value = true;
	if (data) {
		if (data.hasOwnProperty('name')) queryParams.value.name = data.name;
		else queryParams.value.name = '';
		if (data.hasOwnProperty('isDiscount')) queryParams.value.isDiscount = data.isDiscount;
		else queryParams.value.isDiscount = true;
		if (data.hasOwnProperty('categoryId')) queryParams.value.categoryId = data.categoryId;
		else queryParams.value.categoryId = -1;
	} else {
		queryParams.value.name = '';
		queryParams.value.isDiscount = true;
		queryParams.value.categoryId = -1;
	}
	var res = await getAPI(ProductGoodsApi).apiProductGoodsPagePost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

// 打开新增页面
const openAddProductgoods = (data: any) => {
	editProductgoodsTitle.value = '添加产品';
	editDialogRef.value?.openDialog({ categoryName: data.categoryName,categoryId:data.categoryId, canSale: true, isDiscount: true, costPrice: 0, salePrice: 0, memberPrice: 0 , inSpecific: 1});
};

// 打开编辑页面
const openEditProductgoods = (row: any) => {
	editProductgoodsTitle.value = '编辑产品';
	editDialogRef.value.openDialog({ ...row });
};

// 删除
const delProductgoods = (row: any) => {
	ElMessageBox.confirm(`确定要删除吗?`, '系统提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(ProductGoodsApi).apiProductGoodsDeleteDelete(row);
			handleQuery({});
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

// 改变页面容量
const handleSizeChange = (val: number) => {
	tableParams.value.pageSize = val;
	handleQuery({});
};

// 改变页码序号
const handleCurrentChange = (val: number) => {
	tableParams.value.page = val;
	handleQuery({});
};

// 页面加载时
onMounted(async () => {
	// 监听布局配'置弹窗点击打开
	mittBus.on('goodsQueryMthods', async(params) => {
		await handleQuery(params);
	});
	// 监听布局配'置弹窗点击打开
	mittBus.on('goodsAddMthods', async(params) => {
		openAddProductgoods(params)
	});
	await handleQuery({});
});

//将属性或者函数暴露给父组件
defineExpose({ openAddProductgoods, handleQuery });
</script> 
<style scoped lang="scss">
.btn-edit-bg {
	margin-left: 10px;
}
</style>