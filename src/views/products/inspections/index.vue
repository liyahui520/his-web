<template>
    <div class="product-inspections">
        <el-row :gutter="8"  style="width: 100%; height: 100%; flex: 1">
            <el-col :span="5" style="display: flex; height: 100%; flex: 1">
                <el-card shadow="hover" :body-style="{ height: 'calc(100% - 51px)',padding:'10px' }" style="width: 100%;">
                    <template #header>
                        <el-row justify="space-between">
                            <el-col :span="18">
                                <span>检查类目</span>
                            </el-col>
                            <el-col :span="6">
                                <el-button icon="ele-Plus" type="primary" v-auth="'products:inspections:query'" @click="openAddInspections">
                                    新增 </el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <el-scrollbar height="'calc(100% - 51px)'">
                    <el-tree v-loading="inspectionsLoading" :data="inspectionsData" accordion @node-click="handleNodeClick" style="width: 100%;" ref="inspectionsDataRef"
                        highlight-current empty-text="暂无检查类目，请先添加一个吧~" node-key="id">
                        <template #default="{ node }">
                            <el-row justify="space-between" style="width: 100%;">
                                <el-col :span="19">
                                    <span> {{ node.label }}</span>
                                </el-col>
                                <el-col :span="5">
                                    <el-button type="warning" :icon="Edit" @click="openEditInspections(node.data)" title="修改"
                                        circle size="small" v-auth="'products:inspections:update'" />
                                    <el-button type="danger" :icon="Delete" @click="delInspections(node.data)" title="删除" circle size="small" v-auth="'products:inspections:delete'" />
                                </el-col>
                            </el-row>
                        </template>
                    </el-tree>
                </el-scrollbar>
                </el-card>
            </el-col>
            <el-col :span="19" style="display: flex; height: 100%; flex: 1">
                <el-card shadow="hover" :body-style="{ height: 'calc(100% - 51px)' }"  class="full-table">
                    <template #header> 
                    <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-bottom: -18px;">
                        <el-form-item label="项目名称">
                            <el-input v-model="queryParams.name" clearable />
                        </el-form-item>
                        <el-form-item>
                            <el-button-group>
                                <el-button type="primary" icon="ele-Search" v-auth="'products:inspectionitems:query'" @click="handleDetailsQuery" > 查询
                                </el-button>
                                <el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
                            </el-button-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button-group>
                                <el-button icon="ele-Plus" type="primary"  v-auth="'products:inspectionitems:add'" @click="openAddInspectionDetails"> 新增 </el-button>
                            </el-button-group>
                        </el-form-item>
                    </el-form>
                    </template>
                    <el-table :data="tableData" style="width: 100%" v-loading="loading" tooltip-effect="light" row-key="id" class="full-table">
                        <el-table-column type="index" label="序号" width="55" align="left" fixed="" />
                        <el-table-column prop="name" label="项目名称" fixed="" align="left" width="100" show-overflow-tooltip="" />
                        <el-table-column prop="chName" label="中文名称" align="left" width="100" show-overflow-tooltip="" />
                        <el-table-column prop="unit" label="单位" width="100"  show-overflow-tooltip="" />
                        <el-table-column label="犬(幼年)" align="center">
                            <el-table-column prop="youngDogMax" align="center" label="最大" show-overflow-tooltip="" />
                            <el-table-column prop="youngDogMin" align="center" label="最小" show-overflow-tooltip="" />
                        </el-table-column>
                        <el-table-column label="犬(成年)" align="center">
                            <el-table-column prop="dogMax" align="center" label="最大" show-overflow-tooltip="" />
                            <el-table-column prop="dogMin" align="center" label="最小" show-overflow-tooltip="" />
                        </el-table-column>
                        <el-table-column label="犬(老年)" align="center">
                            <el-table-column prop="oldDogMax" align="center" label="最大" show-overflow-tooltip="" />
                            <el-table-column prop="oldDogMin" align="center" label="最小" show-overflow-tooltip="" />
                        </el-table-column>
                        <el-table-column label="猫(幼年)" align="center">
                            <el-table-column prop="youngCatMax" align="center" label="最大" show-overflow-tooltip="" />
                            <el-table-column prop="youngCatMin" align="center" label="最小" show-overflow-tooltip="" />
                        </el-table-column>
                        <el-table-column label="猫(成年)" align="center">
                            <el-table-column prop="dogMax" align="center" label="最大" show-overflow-tooltip="" />
                            <el-table-column prop="dogMin" align="center" label="最小" show-overflow-tooltip="" />
                        </el-table-column>
                        <el-table-column label="猫(老年)" align="center">
                            <el-table-column prop="oldCatMax" align="center" label="最大" show-overflow-tooltip="" />
                            <el-table-column prop="oldCatMin" align="center" label="最小" show-overflow-tooltip="" />
                        </el-table-column>
                        <el-table-column label="其他(幼年)" align="center">
                            <el-table-column prop="youngOtherMax" align="center" label="最大" show-overflow-tooltip="" />
                            <el-table-column prop="youngOtherMin" align="center" label="最小" show-overflow-tooltip="" />
                        </el-table-column>
                        <el-table-column label="其他(成年)" align="center">
                            <el-table-column prop="dogMax" align="center" label="最大" show-overflow-tooltip="" />
                            <el-table-column prop="dogMin" align="center" label="最小" show-overflow-tooltip="" />
                        </el-table-column>
                        <el-table-column label="其他(老年)" align="center">
                            <el-table-column prop="oldOtherMax" align="center" label="最大" show-overflow-tooltip="" />
                            <el-table-column prop="oldOtherMin" align="center" label="最小" show-overflow-tooltip="" />
                        </el-table-column>
                        <el-table-column prop="remark" label="临床意义" align="left" width="100" show-overflow-tooltip="" />
                        <el-table-column label="操作" width="140" align="center" fixed="right" show-overflow-tooltip=""
                            v-if="auth('products:inspectionitems:update') || auth('products:inspectionitems:delete')">
                            <template #default="scope">
                                <el-button icon="ele-Edit" size="small" text="" type="primary"
                                    @click="openEditInspectionsDetails(scope.row)" v-auth="'products:inspectionitems:update'"> 编辑
                                </el-button>
                                <el-button icon="ele-Delete" size="small" text="" type="danger"
                                    @click="delInspectionsDetails(scope.row)" v-auth="'products:inspectionitems:delete'"> 删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-model:currentPage="tableParams.page" v-model:page-size="tableParams.pageSize"
                        :total="tableParams.total" :page-sizes="[10, 20, 50, 100]"  background=""
                        @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        layout="total, sizes, prev, pager, next, jumper" />
                </el-card>
            </el-col>
        </el-row>

        <editInspectionsDialog ref="editInspectionsDialogRef" :title="editInspectionsTitle"
            @reloadTable="handleInspectionsQuery" />
        <editInspectionsDetailsDialog ref="editInspectionsDetailsDialogRef" :title="editInspectionsDetailsTitle"
            @reloadTable="handleDetailsQuery" :inspectionsData="inspectionsData" />

    </div>
</template>


<script lang="ts" setup name="productInspectionsManage">
import { ref } from 'vue';
import { ElMessageBox, ElMessage, ElTree } from 'element-plus';
import { Delete,Edit,} from '@element-plus/icons-vue'
import { auth } from '/@/utils/authFunction';
import editInspectionsDialog from '/@/views/products/inspections/component/editInspections.vue';
import editInspectionsDetailsDialog from '/@/views/products/inspections/component/editinspectionsDetails.vue';

import { getAPI } from '/@/utils/axios-utils';
import { ProductInspectionApi, ProductInspectionDetailApi } from '/@/api-services/api';

const inspectionsData = ref<any>([])

const editInspectionsDialogRef = ref();
const editInspectionsDetailsDialogRef = ref();
const inspectionsLoading = ref(false);
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({productInspectionId:'-1',name:''});
const tableParams = ref({
    page: 1,
    pageSize: 20,
    total: 0,
});
const editInspectionsTitle = ref('');
const editInspectionsDetailsTitle = ref('');

const defaultNode=ref(0);
const inspectionsDataRef = ref<InstanceType<typeof ElTree>>();

// 查询操作
const handleInspectionsQuery = async () => {
    inspectionsLoading.value = true;
    var res = await getAPI(ProductInspectionApi).apiProductInspectionListGet();
    var result = res.data.result ?? [];
    inspectionsData.value = [];
    result.forEach((element: any) => {
        inspectionsData.value.push({ label: element.itemName, id: element.id, ver: element.ver });
    });
    // console.log('inspectionsDataRef',inspectionsDataRef) 
    // if(result.length>0)
    // inspectionsDataRef.value!.setCurrentKey(inspectionsData.value[0].id,false);
    // console.log(inspectionsDataRef.value!.getCurrentNode());

    inspectionsLoading.value = false;
};

// 打开新增页面
const openAddInspections = () => {
    editInspectionsTitle.value = '添加检查类目';
    editInspectionsDialogRef.value.openDialog({});
};

// 打开编辑页面
const openEditInspections = (row: any) => {
    editInspectionsTitle.value = '编辑检查类目';
    editInspectionsDialogRef.value.openDialog({ itemName: row.label, id: row.data.id, ver: row.data.ver });

};

// 打开新增页面
const openAddInspectionDetails = () => {
    editInspectionsDetailsTitle.value = '添加检查项目明细';
    editInspectionsDetailsDialogRef.value.openDialog({
        dogMax:0,dogMin:0,catMax:0,catMin:0,otherMax:0,otherMin:0,
        youngDogMax:0,youngDogMin:0,youngCatMax:0,youngCatMin:0,youngOtherMax:0,youngOtherMin:0,
        oldDogMax:0,oldDogMin:0,oldCatMax:0,oldCatMin:0,oldOtherMax:0,oldOtherMin:0,
    });
};
// 打开编辑页面
const openEditInspectionsDetails = (row: any) => {
    editInspectionsDetailsTitle.value = '编辑检查项目明细';
    editInspectionsDetailsDialogRef.value.openDialog({...row});

};
const handleDetailsQuery = async () => {
    loading.value = true;
    var res = await getAPI(ProductInspectionDetailApi).apiProductInspectionDetailPagePost(Object.assign(queryParams.value, tableParams.value));
    tableData.value = res.data.result?.items ?? [];
    tableParams.value.total = res.data.result?.total;
    loading.value = false;
}
const handleNodeClick = async (data: any) => {
    queryParams.value.productInspectionId=data.id;
    await handleDetailsQuery();
}
// 删除
const delInspections = (row: any) => {
    ElMessageBox.confirm(`确定要删除吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
            await getAPI(ProductInspectionApi).apiProductInspectionIdDeleteDelete(row.id);
            handleInspectionsQuery();
            ElMessage.success('删除成功');
        })
        .catch(() => {
        });
};
// 删除
const delInspectionsDetails = (row: any) => {
    ElMessageBox.confirm(`确定要删除吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
            await getAPI(ProductInspectionDetailApi).apiProductInspectionDetailIdDeleteDelete(row.id);
            handleDetailsQuery();
            ElMessage.success('删除成功');
        })
        .catch(() => {
        });
};
// 改变页面容量
const handleSizeChange = (val: number) => {
    tableParams.value.pageSize = val;
    handleDetailsQuery();
};

// 改变页码序号
const handleCurrentChange = (val: number) => {
    tableParams.value.page = val;
    handleDetailsQuery();
};

handleInspectionsQuery();
</script>
<style scoped lang="scss">
.product-inspections {}
</style>
