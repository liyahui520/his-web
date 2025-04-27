<template>
	<div>
		<el-dialog v-model="state.isShowDialog" width="860px" draggable :close-on-click-modal="false" destroy-on-close>
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<Table ref="tableDrugsRef" v-bind="tb.tableData" style="height: 600px;" :getData="getData" border @sortHeader="onSortHeader"  @selectionChange="selectionChange">
               
			<template #action="scope">
                <el-button size="small" text type="primary" @click="append(scope.row.content)"> 追加 </el-button>
                <el-button size="small" text type="primary" @click="add(scope.row.content)"> 覆盖 </el-button>
                <el-button size="small" text type="info" @click="edit(scope.row)"> 编辑 </el-button>
                <el-button size="small" text type="danger" @click="del(scope.row)"> 删除 </el-button>
                </template>
            </Table>
		</el-dialog>
        <TxtEditTemp ref="TxtEditTempRef" @reload="reload"/>
	</div>
</template>

<script setup lang="ts" name="txttemp">
import { reactive, nextTick, ref,defineAsyncComponent } from 'vue';  
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
import { getAPI } from '/@/utils/axios-utils';
import { CemTemplateApi } from '/@/api-services/api'; 
const TxtEditTemp = defineAsyncComponent(() => import('/@/components/cemtemplate/txttemp/edit.vue')); 
import { emit } from 'process';
const props = defineProps({
	title: {
		type: String,
		default: () => '',
	},
});
const TxtEditTempRef = ref();
const tableDrugsRef = ref();
const emits = defineEmits(['uploadCropperImg','update:append','update:add']); 
// 定义变量内容
const state = reactive({
	isShowDialog: false,
	cropperImg: '',
	cropperImgBase64: '',
	cropper: '' as RefType,
});


const tb = reactive<TableDemoState>({
    tableData: {
        // 表头内容（必传，注意格式）
        columns: [

            {
                prop: 'name',
                width: '150',
                label: '名称',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,  
                'show-overflow-tooltip': true,
            }, {
                prop: 'content', 
                label: '内容',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true, 
                'show-overflow-tooltip': true,
            },
            {
                prop: 'createUserName',
                width: '120',
                label: '创建人',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
            },
            {
                prop: 'createTime',
                width: '140',
                label: '创建时间',
                headerAlign: 'center',
                toolTip: true,
                sortable: 'custom',
                isCheck: true,
                'show-overflow-tooltip': true,
            },
            {
                prop: 'action',
                width: 150,
                label: '操作',
                type: 'action',
                align: 'center',
                isCheck: true, 
                hideCheck: true
            },
        ],
        // 配置项（必传）
        config: {
            isStripe: true, // 是否显示表格斑马纹
            isBorder: false, // 是否显示表格边框
            isSerialNo: true, // 是否显示表格序号
            isSelection: false, // 是否勾选表格多选
            showSelection: true, //是否显示表格多选
            pageSize: 20, // 每页条数
            hideExport: true, //是否隐藏导出按钮
            exportFileName: '商品信息', //导出报表的文件名，不填写取应用名称
            // hideLoad: false,
            hideRefresh:true,
            hideSet:true,
            isDisabled:true,
            hidePrint: true
        },
        // 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
        search: [],
        param: { name: '',type:0},
        defaultSort: {
            prop: 'name',
            order: 'ascending',
        },
    },
});

const getData = async (par: any) => {
    let res = await getAPI(CemTemplateApi).apiCemTemplatePagePost(par);
    return res.data;
}

// 拖动显示列排序回调
const onSortHeader =async (data: object[]) => {
    tb.tableData.columns = data;
};

//选中的值
const selectionChange = async (d) => {
     
}

// 打开弹窗
const openDialog =async (d) => { 
	state.isShowDialog = true;
    tb.tableData.param.type = d;
    tableDrugsRef.value?.handleList();
	nextTick(() => {
	});
};
// 关闭弹窗
const closeDialog = async () => { 
	state.isShowDialog = false;
};
// 取消
const onCancel = async () => {
	closeDialog();
};

//保存
const onSubmit = (row:any)=>{ 
}

/**
 * 追加
 */
const append=async (content:any)=>{
    emits('update:append',content,tb.tableData.param.type);
}

/**
 * 覆盖
 */
 const add=async (content:any)=>{
    emits('update:add',content,tb.tableData.param.type);
}

/**
 * 删除
 * @param row 
 */
const del =async (row:any)=>{ 
    await getAPI(CemTemplateApi).apiCemTemplateIdDeleteDelete(row.id); 
    tableDrugsRef.value?.handleList();
}

/**
 * 修改
 * @param row 
 */
const edit = async(row:any)=>{
   await TxtEditTempRef.value?.openDialog(row);
}

/**
 * 刷新
 */
const reload = async() =>{
    tableDrugsRef.value?.handleList();
}

// 暴露变量
defineExpose({
	openDialog,
    onCancel
});
</script>

<style scoped lang="scss">
</style>
