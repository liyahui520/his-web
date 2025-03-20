<template>
    <Table ref="tableTestsRef" v-bind="tb.tableData" :getData="getData" border @sortHeader="onSortHeader"
        @selectionChange="selectionChange">
        <template v-slot:command>
            <el-button type="danger" :icon="Delete" plain size="small" @click="batchDelete" v-auth="'products:drugs:delete'">批量删除</el-button>
            <el-button type="primary" :icon="Edit" plain size="small" @click="batchEdit" v-auth="'products:drugs:update'">批量编辑</el-button>
			<el-button type="warning" size="small" icon="ele-Upload" round @click="downTemp" v-auth="'products:drugs:import'"> 导入产品 </el-button>
        </template>
        <template #isDiscount="scope">
            <el-tag v-if="scope.row.isDiscount"> 是</el-tag>
            <el-tag type="danger" v-else> 否</el-tag>
        </template>
        <template #canSale="scope">
            <el-tag v-if="scope.row.canSale"> 是</el-tag>
            <el-tag type="danger" v-else> 否</el-tag>
        </template>
        <template #action="scope" v-if="auth('products:drugs:update') || auth('products:drugs:delete')">
            <el-button icon="ele-Edit" size="small" text="" type="primary" @click="openEditProductTests(scope.row)"
                v-auth="'products:drugs:update'"> 编辑
            </el-button>
            <el-button icon="ele-Delete" size="small" text="" type="danger" @click="delProductTests(scope.row)"
                v-auth="'products:drugs:delete'"> 删除
            </el-button>
        </template>
    </Table>

    <editTestDialog ref="editTestDialogRef" :title="editProductTestsTitle" @reloadTable="handleQuery"
        :productCategorysData="props.productCategorysData" />
    <batchEditDialog ref="batchEditDialogRef" :title="'批量编辑'" @reloadTable="handleQuery"
        :productCategorysData="props.productCategorysData" />
        <downloadTemp ref="downloadTempRef" :title="importTempTitle" />
</template>

<script lang="ts" setup name="productTestsVue">
import { ref, onMounted, defineAsyncComponent, nextTick, reactive } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import { getAPI } from '/@/utils/axios-utils';
import { Delete, Edit, Flag, Failed } from '@element-plus/icons-vue'
import { ProductTestApi } from '/@/api-services/api';
import batchEditDialog from '/@/views/products/component/batchEditDialog.vue';
import mittBus from '/@/utils/newmitt';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';
import downloadTemp from '/@/views/products/component/downloadTemp.vue';

const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const editTestDialog = defineAsyncComponent(() => import('./component/editDialog.vue'));
const editTestDialogRef = ref();
const batchEditDialogRef = ref();
const loading = ref(false);
const tableTestsRef = ref();
const deleteIds = ref<any>([]);
const editProductTestsTitle = ref('');
const importTempTitle = ref('');
const downloadTempRef = ref();
var props = defineProps({
    productCategorysData: {
        type: Array,
        default: []
    }
});
const tb = reactive<TableDemoState>({
    tableData: {
        // 表头内容（必传，注意格式）
        columns: [

            {
                prop: 'categoryName',
                width: '150',
                label: '所属目录',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true, fixed: 'left',
                'show-overflow-tooltip': true,
            }, {
                prop: 'name',
                width: '',
                label: '名称',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                fixed: 'left',
                'show-overflow-tooltip': true,
            },
            {
                prop: 'barCode',
                width: '120',
                label: '条形码',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
            },
            {
                prop: 'serialNumber',
                width: '160',
                label: '编码',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
            },
            {
                prop: 'nameLetter',
                width: '120',
                label: '缩写',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
            },
            {
                prop: 'englishName',
                width: '120',
                label: '英文名称',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
            },
            {
                prop: 'commonName',
                width: '120',
                label: '通用名称',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
            },
            {
                prop: 'salePrice',
                width: '120',
                label: '销售价格',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                type: 'price',
                'show-overflow-tooltip': true,
            },
            {
                prop: 'memberPrice',
                width: '120',
                label: '会员价格',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                type: 'price',
                'show-overflow-tooltip': true,
            },
			{
				prop: 'outUnitName',
				width: '120',
				label: '单位',
				headerAlign: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				'show-overflow-tooltip': true,
			},
            {
                prop: 'isDiscount',
                width: '110',
                label: '参与打折',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
                align:"center"
            },
            {
                prop: 'canSale',
                width: '100',
                label: '可销',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                align:"center"
            },
            {
                prop: 'action',
                width: 150,
                label: '操作',
                type: 'action',
                align: 'center',
                isCheck: true,
                fixed: 'right',
                hideCheck: true
            },
        ],
        // 配置项（必传）
        config: {
            isStripe: true, // 是否显示表格斑马纹
            isBorder: false, // 是否显示表格边框
            isSerialNo: true, // 是否显示表格序号
            isSelection: true, // 是否勾选表格多选
            showSelection: true, //是否显示表格多选
            pageSize: 20, // 每页条数
            isDisabled:false,
            hideExport: false, //是否隐藏导出按钮
            exportFileName: '化验信息', //导出报表的文件名，不填写取应用名称
            // hideLoad: false,
            hidePrint: true
        },
        // 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
        search: [],
        param: { name: '', categoryId: -1, canOrder: true, canSale: true },
        defaultSort: {
            prop: 'name',
            order: 'ascending',
        },
    },
});

/**
 * 下载导入模板信息
 */
 const downTemp = async () => {
	importTempTitle.value = '导入产品信息';
	downloadTempRef.value?.openDialog(ProductTypeEnums.NUMBER_110001, [], []);
};
// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
    tb.tableData.columns = data;
};
const getData = async (par: any) => {
    let res = await getAPI(ProductTestApi).apiProductTestPagePost(par);
    return res.data;
}

//选中的值
const selectionChange = async (d) => {
    deleteIds.value = [];
    d.forEach((v:any) => {
        deleteIds.value.push(v.id);
    });
}
// 查询操作
const handleQuery = async (data: any) => {
    loading.value = true;
    if (data) {
        if (data.hasOwnProperty('name')) tb.tableData.param.name = data.name;
        else tb.tableData.param.name = '';
        if (data.hasOwnProperty('isDiscount')) tb.tableData.param.isDiscount = data.isDiscount;
        else tb.tableData.param.isDiscount = false;
        if (data.hasOwnProperty('canOrder')) tb.tableData.param.canOrder = data.canOrder;
        else tb.tableData.param.canOrder = false;
        if (data.hasOwnProperty('canSale')) tb.tableData.param.canSale = data.canSale;
        else tb.tableData.param.canSale = false;
        if (data.hasOwnProperty('canCable')) tb.tableData.param.canCable = data.canCable;
        else tb.tableData.param.canCable = false;
        if (data.hasOwnProperty('categoryId')) tb.tableData.param.categoryId = data.categoryId;
        else tb.tableData.param.categoryId = -1;
    }

    await nextTick(() => {
        tableTestsRef?.value?.pageReset();
    });
    loading.value = false;
};

// 打开新增页面
const openAddProductTests = async (data: any) => {
    editProductTestsTitle.value = '添加化验';
    editTestDialogRef.value.openDialog({
        categoryName: data.categoryName,
        categoryArr: data.categoryId == -1 ? [] : [data.categoryId],
        isDiscount: true,
        costPrice: 0,
        salePrice: 0,
        memberPrice: 0,
        canOrder:true,
        canSale:true,
        canCable:true
    });
};

// 打开编辑页面
const openEditProductTests = (row: any) => {
    editProductTestsTitle.value = '编辑化验';
    row.categoryArr = row.categoryId == -1 ? [] : [row.categoryId]
    editTestDialogRef.value.openDialog({ ...row });
};

// 删除
const delProductTests = (row: any) => {
    ElMessageBox.confirm(`确定要删除吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            await getAPI(ProductTestApi).apiProductTestDeletePost(row);
            handleQuery({});
            ElMessage.success('删除成功');
        })
        .catch(() => {
        });
};

//批量编辑
const batchEdit = () => {
    const tableRows = tableTestsRef.value.getSelectionRows();
    if (tableRows.length <= 0) {
        ElMessage.warning('请先选择要编辑的数据');
        return;
    }
    batchEditDialogRef.value?.openDialog({ products: tableRows }, false);
}
const batchDelete=()=>{
        const tableRows= tableTestsRef.value.getSelectionRows();
        if (tableRows.length <= 0) {
            ElMessage.warning('请先选择要删除的数据');
            return;
        }
        ElMessageBox.confirm(`确定要删除吗？共 ` + tableRows.length + ` 条数据`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(async () => {
                await getAPI(ProductTestApi).apiProductTestDeleteByIdsDelete({ids: tableRows.map(m=>{return m.id;})}).then(_ => {
                    nextTick(() => {
                        tableTestsRef?.value?.pageReset();
                    });
                    ElMessage.success('删除成功');
                }).catch(_ => {
                    ElMessage.error('删除失败');
                });


            })
            .catch(() => {
            });
    }
// 页面加载时
onMounted(async () => {
    // 监听布局配'置弹窗点击打开
    mittBus.on('testsQueryMthods', async (params) => {
        await handleQuery(params);
    });
    // 监听布局配'置弹窗点击打开
    mittBus.on('testsAddMthods', async (params:any) => {
        await openAddProductTests(params);
    });

});

</script> 