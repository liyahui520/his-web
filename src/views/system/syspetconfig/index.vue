<template>
    <div class="sys-pet-config-container" :class="isTagsViewCurrenFull ? 'tab-cus-full-Content' : 'tab-cus-Content'">
        <el-card shadow="never" :body-style="{ paddingBottom: '0', border: '0px' }">
            <el-form :model="state.queryParams" ref="queryForm" :inline="true">
                <el-form-item label="" prop="name">
                    <el-input placeholder="种类名称/种类拼音" clearable @keyup.enter="handleQuery" v-model="state.queryParams.params" />
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-button type="primary" icon="ele-Search" @click="handleQuery" > 查询 </el-button>
                        <el-button icon="ele-Refresh" @click="resetQuery"> 重置 </el-button>
                    </el-button-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Plus" @click="openAddKind" > 新增 </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="full-table" shadow="never" :body-style="{ border: '0px' }" style="overflow: auto; margin-top: 8px">
            <el-table :data="state.petKindData" style="width: 100%" v-loading="state.loading" border>
                <el-table-column type="index" label="序号" width="55" align="center" />
                <el-table-column prop="name" label="种类名称" show-overflow-tooltip />
                <el-table-column prop="englishName" label="种类英文" show-overflow-tooltip />
                <el-table-column prop="order" label="排序" width="70" align="center" show-overflow-tooltip />
                <el-table-column prop="createTime" label="修改时间" align="center" show-overflow-tooltip />
                <el-table-column label="操作" width="210" fixed="right" align="center" show-overflow-tooltip>
                    <template #default="scope">
                        <el-button icon="ele-Edit" size="small" text type="primary" @click="openEditDictType(scope.row)" v-auth="'sysPcuPetConfig:edit-kind'" v-if="!scope.row.isAdmin"> 编辑 </el-button>
                        <el-button icon="ele-Memo" size="small" text type="primary" @click="openDictDataDialog(scope.row)" > 品种列表 </el-button>
                        <el-button icon="ele-Delete" size="small" text type="danger" @click="delDictType(scope.row)" v-auth="'sysPcuPetConfig:delete-kind'" v-if="!scope.row.isAdmin"> 删除 </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    v-model:currentPage="state.tableParams.page"
                    v-model:page-size="state.tableParams.pageSize"
                    :total="state.tableParams.total"
                    :page-sizes="[10, 20, 50, 100]"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
            />
        </el-card>
        <EditKind ref="editKindRef" :title="state.editDictTypeTitle" />
        <VarietieDialog  ref="varietieDialog" :title="state.varietieDialogTitle"/>
<!--        <DictDataDialog ref="dictDataDialogRef" />-->
    </div>
</template>

<script lang="ts" setup name="sysPetConfig">
    import { onMounted, onUnmounted, reactive, ref } from 'vue';
    import { ElMessageBox, ElMessage } from 'element-plus';
    import mittBus from '/@/utils/mitt';
    import EditKind from './component/editKind.vue'
    import VarietieDialog from './component/varietieDialog.vue'
    import { getAPI } from '/@/utils/axios-utils';
    import { SysPetConfigApi } from '/@/api-services/api';
    import {PagePetKindInput} from "/@/api-services/models/pets/kind/page-pet-kind-input";
    import {PetKindOutPut} from "/@/api-services/models/pets/kind/pet-kind-output";
    
    import { useUserInfo } from '/@/stores/userInfo';
    import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
    import { storeToRefs } from 'pinia';
    const storesTagsViewRoutes = useTagsViewRoutes();
    const stores = useUserInfo();
    const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
    const editKindRef = ref<InstanceType<typeof EditKind>>();
    const varietieDialog = ref<InstanceType<typeof VarietieDialog>>()
    const state = reactive({
        loading: false,
        petKindData: [] as Array<PetKindOutPut>,
        queryParams: { } as PagePetKindInput,
        tableParams: {
            page: 1,
            pageSize: 20,
            total: 0 as any,
        },
        editDictTypeTitle: '',
        varietieDialogTitle: '',
    });

    onMounted(async () => {
       await handleQuery();

        mittBus.on('submitRefresh', async () => {
            await handleQuery();
        });
    });

    onUnmounted(() => {
        mittBus.off('submitRefresh');
    });

    // 查询操作
    const handleQuery = async () => {
        state.loading = true;
        let params = Object.assign(state.queryParams, state.tableParams);
        var res = await getAPI(SysPetConfigApi).apiSysPetPageKind(params);
        state.petKindData = res.data.result?.items ?? [];
        state.tableParams.total = res.data.result?.total;
        state.loading = false;
    };

    // 重置操作
    const resetQuery = async () => {
        state.queryParams.params = undefined;
       await handleQuery();
    };

    // 打开新增页面
    const openAddKind = async () => {
        state.editDictTypeTitle = '添加种类';
        editKindRef.value?.openDialog({});
    };

    // 打开编辑页面
    const openEditDictType = async (row: any) => {
        state.editDictTypeTitle = '编辑种类';
        editKindRef.value?.openDialog(row);
    };

    // 打开字典值页面
    const openDictDataDialog = async (row: any) => {
        state.varietieDialogTitle = "编辑【"+row.name+"】品种";
        varietieDialog.value?.openDialog(row);
    };

    // 删除
    const delDictType = async(row: any) => {
        ElMessageBox.confirm(`确定删除种类：【${row.name}】?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(async () => {
                await getAPI(SysPetConfigApi).apiSysPetDeleteKind(row.id);
               await handleQuery();
                ElMessage.success('删除成功');
            })
            .catch(() => {});
    };

    // 改变页面容量
    const handleSizeChange = async (val: number)  => {
        state.tableParams.pageSize = val;
        await handleQuery();
    };

    // 改变页码序号
    const handleCurrentChange = async (val: number) => {
        state.tableParams.page = val;
        await handleQuery();
    };
</script>
