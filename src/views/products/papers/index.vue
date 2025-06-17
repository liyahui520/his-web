<template>
    <Table ref="tableRef" v-bind="tb.tableData" :getData="getData" border @sortHeader="onSortHeader"
        @selectionChange="selectionChange">
        <template v-slot:command>
            <el-button type="danger" :icon="Delete" plain size="small" @click="batchDelete" v-auth="'products:papers:delete'">批量删除</el-button>
            <el-button type="primary" :icon="Edit" plain size="small" @click="batchEdit" v-auth="'products:papers:update'">批量编辑</el-button>
			<el-button type="warning" size="small" icon="ele-Upload" round @click="downTemp" v-auth="'products:papers:import'"> 导入产品 </el-button>
        </template>
        <template #isDiscount="scope">
            <el-tag v-if="scope.row.isDiscount"> 是</el-tag>
            <el-tag type="danger" v-else> 否</el-tag>
        </template>
        <template #canSale="scope">
            <el-tag v-if="scope.row.canSale"> 是</el-tag>
            <el-tag type="danger" v-else> 否</el-tag>
        </template>
        <template #action="scope" v-if="auth('products:papers:update') || auth('products:papers:delete')">
            <el-button icon="ele-Edit" size="small" text="" type="primary" v-auth="'products:papers:update'" @click="openEditProductpapers(scope.row)"> 编辑
            </el-button>
            <el-button icon="ele-Delete" size="small" text="" type="danger" v-auth="'products:papers:delete'" @click="delProductpapers(scope.row)"> 删除
            </el-button>
        </template>
    </Table>
    <editDialog ref="editDialogRef" :title="editProductpapersTitle" @reloadTable="handleQuery"
        :productCategorysData="props.productCategorysData" />
    <batchEditDialog ref="batchEditDialogRef" :title="'批量编辑'" @reloadTable="handleQuery"
        :productCategorysData="props.productCategorysData" />
        <downloadTemp ref="downloadTempRef" :title="importTempTitle"  @reloadTable="handleQuery" />
</template>

<script lang="ts" setup name="productPapersVue">
import { ref, watch, onMounted, reactive, defineAsyncComponent, nextTick } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import editDialog from '/@/views/products/papers/component/editDialog.vue';
import { Delete, Edit, Flag, Failed } from '@element-plus/icons-vue'
import { getAPI } from '/@/utils/axios-utils';
import { ProductPaperApi } from '/@/api-services/api';
import mittBus from '/@/utils/newmitt';
import { verifyTextColor } from "/@/utils/toolsValidate";
import batchEditDialog from '/@/views/products/component/batchEditDialog.vue';
import { ProductTypeEnums } from '/@/api-services/models/product-manage';
import downloadTemp from '/@/views/products/component/downloadTemp.vue';


const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));
const tableRef = ref<RefType>();
const editDialogRef = ref();
const batchEditDialogRef = ref();
const deleteIds = ref<any>([]);
const editProductpapersTitle = ref('');
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
                width: '120',
                label: '所属目录',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true, fixed: 'left',
                'show-overflow-tooltip': true,
            },
            {
                prop: 'name',
                width: '120',
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
                isCheck: true, fixed: 'left',
                'show-overflow-tooltip': true,
            },
            {
                prop: 'nameLetter',
                width: '',
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
                prop: 'isDiscount',
                width: '120',
                label: '参与打折',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
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
                prop: 'providerName',
                width: '120',
                label: '供应商',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
            },
            {
                prop: 'manufacturerName',
                width: '120',
                label: '生产商',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
            },
            {
                prop: 'canSale',
                width: '120',
                label: '可销',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true
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
            exportFileName: '试纸信息', //导出报表的文件名，不填写取应用名称
        },
        // 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
        search: [
            // { label: '创建时间', prop: 'time', placeholder: '请选择', required: false, type: 'date' },
        ],
        param: { name: '', categoryId: -1,canOrder: true, canSale: true },
        defaultSort: {
            prop: 'name',
            order: 'ascending',
        },
    },
});

// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
    tb.tableData.columns = data;
};
/**
 * 下载导入模板信息
 */
const downTemp = async () => {
	importTempTitle.value = '导入产品信息';
	downloadTempRef.value?.openDialog(ProductTypeEnums.NUMBER_150001, [], []);
};

// 查询操作
const handleQuery = async (data: any) => {

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
        tableRef?.value?.pageReset();
    });
};

//选中的值
const selectionChange = async (d) => {
    deleteIds.value = [];
    d.forEach(v => {
        deleteIds.value.push(v.id);
    });
}

//搜索时字体高亮
const colorformatter = async (a, b, val) => {
    console.log(tb.tableData.param.name);
    val = '111';
    if (tb.tableData.param.name)
        return verifyTextColor(val, tb.tableData.param.name);
    else return val;
}

const getData = async (par: any) => {
    let res = await getAPI(ProductPaperApi).apiProductPaperPagePost(par);
    return res.data;
}

// 打开新增页面
const openAddProductpapers = (data: any) => {
    editProductpapersTitle.value = '添加试纸';
    editDialogRef.value?.openDialog({
        categoryName: data.categoryName, canOrder: true,
        categoryArr: data.categoryId == -1 ? [] : [data.categoryId],
        canSale: true,
        isDiscount: true,
        costPrice: 0,
        salePrice: 0,
        memberPrice: 0,
        inSpecific: 1,
        productTestStripResults:[]
    });
};

// 打开编辑页面
const openEditProductpapers = (row: any) => {
    editProductpapersTitle.value = '编辑试纸';
    row.categoryArr = row.categoryId == -1 ? [] : [row.categoryId]
    editDialogRef.value.openDialog({ ...row });
};

// 删除
const delProductpapers = (row: any) => {
    ElMessageBox.confirm(`确定要删除吗?`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            await getAPI(ProductPaperApi).apiProductPaperDeletePost(row);
            await nextTick(() => {
                tableRef?.value?.pageReset();
            });
            ElMessage.success('删除成功');
        })
        .catch(() => {
        });
};

//批量编辑
const batchEdit = () => {
    const tableRows = tableRef.value.getSelectionRows();
    if (tableRows.length <= 0) {
        ElMessage.warning('请先选择要编辑的数据');
        return;
    }
    batchEditDialogRef.value?.openDialog({ products: tableRows }, true);
}
const batchDelete=()=>{
        const tableRows= tableRef.value.getSelectionRows();
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
                await getAPI(ProductPaperApi).apiProductPaperDeleteByIdsDelete({ids: tableRows.map(m=>{return m.id;})}).then(_ => {
                    nextTick(() => {
                        tableRef?.value?.pageReset();
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
    mittBus.on('papersQueryMthods', async (params) => {
        await handleQuery(params);
    });
    // 监听布局配'置弹窗点击打开
    mittBus.on('papersAddMthods', async (params) => {
        openAddProductpapers(params)
    });
});

</script>
<style scoped lang="scss">
.btn-edit-bg {
    margin-left: 10px;
}
</style>