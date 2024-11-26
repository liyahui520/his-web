<template>
    <div class="sys-varietie-container">
        <el-dialog v-model="state.isShowDialog" draggable width="860px">
            <template #header>
                <div style="color: #fff">
                    <el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
                    <span> {{ props.title }} </span>
                </div>
            </template>
            <el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
                <el-form :model="state.queryParams" ref="queryForm" :inline="true">
                    <el-form-item label="" prop="value">
                        <el-input placeholder="品种名称/拼音" clearable @keyup.enter="handleQuery" v-model="state.queryParams.value" />
                    </el-form-item>
<!--                    <el-form-item label="编码" prop="code">-->
<!--                        <el-input placeholder="编码" clearable @keyup.enter="handleQuery" v-model="state.queryParams.code" />-->
<!--                    </el-form-item>-->
                    <el-form-item>
                        <el-button-group>
                            <el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
                            <el-button icon="ele-Refresh" @click="resetQuery"> 重置 </el-button>
                        </el-button-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="ele-Plus" @click="openAddDictData"> 新增 </el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-card class="full-table" shadow="hover" style="margin-top: 8px">
                <el-table :data="state.dictDataData" style="width: 100%" v-loading="state.loading" border>
                    <el-table-column type="index" label="序号" width="55" align="center" />
                    <el-table-column prop="name" label="品种" show-overflow-tooltip />
                    <el-table-column prop="englishName" label="英文名" show-overflow-tooltip />
<!--                    <el-table-column prop="status" label="状态" width="70" align="center" show-overflow-tooltip>-->
<!--                        <template #default="scope">-->
<!--                            <el-tag type="success" v-if="scope.row.status === 1">启用</el-tag>-->
<!--                            <el-tag type="danger" v-else>禁用</el-tag>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                    <el-table-column prop="order" label="排序" width="70" align="center" show-overflow-tooltip />
                    <el-table-column prop="createTime" label="修改时间" align="center" show-overflow-tooltip />
<!--                    <el-table-column prop="remark" label="备注" show-overflow-tooltip />-->
                    <el-table-column label="操作" width="140" fixed="right" align="center" show-overflow-tooltip>
                        <template #default="scope">
                            <el-button icon="ele-Edit" size="small" text type="primary" @click="openEditDictData(scope.row)"> 编辑 </el-button>
                            <el-button icon="ele-Delete" size="small" text type="danger" @click="delDictData(scope.row)"> 删除 </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        v-model:currentPage="state.tableParams.page"
                        v-model:page-size="state.tableParams.pageSize"
                        :total="state.tableParams.total"
                        :page-sizes="[10, 20, 50, 100]"
                        small
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout="total, sizes, prev, pager, next, jumper"
                />
            </el-card>
        </el-dialog>
        <EditVaritie ref="editaritieRef" :title="state.editVaritieTitle" :kindId="state.queryParams.kindId" />
    </div>
</template>

<script lang="ts" setup name="varietieDialog">
    import { onMounted, onUnmounted, reactive, ref } from 'vue';
    import { ElMessageBox, ElMessage } from 'element-plus';
    import mittBus from '/@/utils/mitt';
    import EditVaritie from './editVarietie.vue';

    import { getAPI } from '/@/utils/axios-utils';
    import { SysPetConfigApi } from '/@/api-services/api';
    import {PetVarietieOutPut} from "/@/api-services/models/pets/varietie/pet-varietie-output";
    import {PagePetVarietieInput} from "/@/api-services/models/pets/varietie/page-pet-varietieinput";
    const editaritieRef = ref<InstanceType<typeof EditVaritie>>()
    const props = defineProps({
        title: String,
    });
    const state = reactive({
        isShowDialog: false,
        loading: false,
        dictDataData: [] as Array<PetVarietieOutPut>,
        queryParams: {} as PagePetVarietieInput,
        tableParams: {
            page: 1,
            pageSize: 20,
            total: 0 as any,
        },
        editVaritieTitle: '',
    });

    onMounted(async () => {
        mittBus.on('submitRefreshDictData', () => {
            handleQuery();
        });
    });

    onUnmounted(() => {
        mittBus.off('submitRefreshDictData');
    });

    // 打开弹窗
    const openDialog = async (row: any) => {
        state.queryParams.kindId = row.id;
       await handleQuery();
        state.isShowDialog = true;
    };

    // 查询操作
    const handleQuery = async () => {
        state.loading = true;
        let params = Object.assign(state.queryParams, state.tableParams);
        var res = await getAPI(SysPetConfigApi).apiSysPetPageVarietie(params);
        state.dictDataData = res.data.result?.items ?? [];
        state.tableParams.total = res.data.result?.total;
        state.loading = false;
    };

    // 重置操作
    const resetQuery = () => {
        state.queryParams.params = '';
        handleQuery();
    };

    // 打开新增页面
    const openAddDictData = () => {
        state.editVaritieTitle = '添加品种';
        editaritieRef.value.openDialog({});
    };

    // 打开编辑页面
    const openEditDictData = (row: any) => {
        state.editVaritieTitle = '编辑品种';
        editaritieRef.value.openDialog(row);
    };

    // 删除
    const delDictData = async (row: any) => {
        ElMessageBox.confirm(`确定删除字典值：【${row.value}】?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(async () => {
                await getAPI(SysPetConfigApi).apiSysPetDeleteVarietie(row.id);
                await handleQuery();
                ElMessage.success('删除成功');
            })
            .catch(() => {});
    };

    // 改变页面容量
    const handleSizeChange =async (val: number) => {
        state.tableParams.pageSize = val;
        await handleQuery();
    };

    // 改变页码序号
    const handleCurrentChange = async (val: number) => {
        state.tableParams.page = val;
       await handleQuery();
    };

    // 导出对象
    defineExpose({ openDialog });
</script>
