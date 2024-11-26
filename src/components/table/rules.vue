<template>
    <div class="layout-pd">
        <el-form ref="tableRulesRef" :model="props.Data.tableData" size="default">
            <el-table ref="tableRef" :data="props.Data.tableData.data" :header-fixed="true" :row-class-name="rowclassName" border class="module-table-uncollected" :stripe="true" :height="height" :fixed="true">
                <el-table-column type="index" width="50" label="序号" align="center" :index="(props.Data.isDisabled)?oneIndexMethod:indexMethod">
				<template #default="{ $index }">
					{{ state?.page?((state.page.page - 1) * state.page.pageSize + $index + 1):$index }}
				</template>
				</el-table-column>
                <el-table-column
                        v-for="(item, index) in props.Data.tableData.header"
                        :key="index"
                        show-overflow-tooltip
                        :prop="item.prop"
                        :width="item.width"
                        :label="item.label"
                >
                    <template v-slot:header>
                        <span v-if="item.isRequired" class="color-danger">*</span>
                        <span class="pl5">{{ item.label }}</span>
                        <el-tooltip v-if="item.isTooltip" effect="dark" :content="item.tooltipCount" placement="top">
                            <i class="fa fa-question-circle-o"/>
                            <el-icon><Search /></el-icon>
                        </el-tooltip>
                    </template>
                    <template #default="scope" v-if="$slots[item.prop]">
                        <slot :name="item.prop" v-bind="scope"></slot>
                    </template>
                    <template v-slot="scope">
                        <el-form-item
                                :prop="`data.${scope.$index}.${item.prop}`" v-if="!props.Data.isDisabled"
                                :rules="scope.$index>0?[{ required: item.isRequired, message: '不能为空', trigger: `${item.type}` == 'input' ? 'blur' : 'change' }]:[{required: false}]"
                        >
                            <el-select v-if="item.type === 'select'&&scope.$index>0" v-model="scope.row[item.prop]" placeholder="请选择" :disabled="props.Data.isDisabled">
                                <el-option v-for="sel in props.Data.tableData.option" :key="sel.value" :label="sel.label" :value="sel.value" />
                            </el-select>
                            <el-input-number
                                    v-else-if="item.type === 'number'&&scope.$index>0"
                                    v-model="scope.row[item.prop]"
                                    class="mx-4"
                                    :min="item.min??0"
                                    :precision="item.precision==null?0:item.precision"
                                    controls-position="right"
                                    :value-on-clear="item.precision>0?0.00:0"
                                    :disabled="props.Data.isDisabled==false?item.disabled:props.Data.isDisabled"
                                    @change="numberChange(scope.row)"
                            />
                            <p v-else-if="item.type==='price'&&scope.$index>0">
                                {{verifyNumberComma(scope.row[item.prop].toFixed(2)) || '0.00'}}
                            </p>
                            <el-date-picker   :disabled="props.Data.isDisabled"
                                    v-else-if="item.type === 'date'&&scope.$index>0"
                                    v-model="scope.row[item.prop]"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width: 100%"
                            />
                            <el-input :disabled="props.Data.isDisabled" v-else-if="item.type === 'input'&&scope.$index>0" v-model="scope.row[item.prop]" :placeholder="item.placeholder??'请输入内容'" />
                            <el-input :disabled="props.Data.isDisabled" v-else-if="item.type === 'dialog'&&scope.$index==0" v-model="scope.row[item.prop]" readonly :placeholder="item.placeholder??'请输入内容'" @click="dialogChange" :suffix-icon="Search">
                            </el-input>
                            <el-text v-else class="mx-1">{{scope.row[item.prop]}}</el-text>
                        </el-form-item>
                        <el-form-item
                                :prop="`data.${scope.$index}.${item.prop}`" v-else
                                :rules="scope.$index>0?[{ required: item.isRequired, message: '不能为空', trigger: `${item.type}` == 'input' ? 'blur' : 'change' }]:[{required: false}]"
                        >
                            <el-select v-if="item.type === 'select'" v-model="scope.row[item.prop]" placeholder="请选择" :disabled="props.Data.isDisabled">
                                <el-option v-for="sel in props.Data.tableData.option" :key="sel.value" :label="sel.label" :value="sel.value" />
                            </el-select>
<!--                            <el-input-number-->
<!--                                    v-else-if="item.type === 'number'&&scope.$index>0"-->
<!--                                    v-model="scope.row[item.prop]"-->
<!--                                    class="mx-4"-->
<!--                                    :min="item.min??0"-->
<!--                                    :precision="item.precision==null?0:item.precision"-->
<!--                                    controls-position="right"-->
<!--                                    :value-on-clear="item.precision>0?0.00:0"-->
<!--                                    :disabled="props.Data.isDisabled==false?item.disabled:props.Data.isDisabled"-->
<!--                                    @change="numberChange(scope.row)"-->
<!--                            />-->
                            <p v-else-if="item.type==='number'&&item.precision>0">
                                {{verifyNumberComma(scope.row[item.prop].toFixed(2)) || '0.00'}}
                            </p>
                            <p v-else-if="item.type==='price'">
                                {{verifyNumberComma(scope.row[item.prop].toFixed(2)) || '0.00'}}
                            </p>
                            <el-date-picker   :disabled="props.Data.isDisabled"
                                              v-else-if="item.type === 'date'"
                                              v-model="scope.row[item.prop]"
                                              type="date"
                                              placeholder="选择日期"
                                              style="width: 100%"
                            />
<!--                            <el-input :disabled="props.Data.isDisabled" v-else-if="item.type === 'input'" v-model="scope.row[item.prop]" :placeholder="item.placeholder??'请输入内容'" />-->
<!--                            <el-input :disabled="props.Data.isDisabled" v-else-if="item.type === 'dialog'" v-model="scope.row[item.prop]" readonly :placeholder="item.placeholder??'请输入内容'" @click="dialogChange" :suffix-icon="Search">-->
<!--                            </el-input>-->
                            <el-text v-else class="mx-1">{{scope.row[item.prop]}}</el-text>
                        </el-form-item>
                    </template>
                </el-table-column>

<!--                <el-table-column fixed="right" label="操作" width="80">-->
<!--                    <template #default>-->
<!--                        <el-button link type="danger" size="small">删除</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
        </el-form>
<!--        <el-row class="flex mt15">-->
<!--            <div class="flex-margin">-->
<!--                <el-button size="default" type="success" @click="onValidate(tableRulesRef)">表格验证</el-button>-->
<!--                <el-button size="default" type="primary" @click="onAddRow">新增一行</el-button>-->
<!--            </div>-->
<!--        </el-row>-->
    </div>
</template>

<script setup lang="ts" name="pagesTableRules">
    import {reactive, ref, nextTick, onMounted} from 'vue';
    import { ElMessage } from 'element-plus';
    import type { FormInstance } from 'element-plus';
    import { Search } from '@element-plus/icons-vue'
    import {
        verifyNumberComma, verifyNumberCnUppercase, verifyTextColor
    } from '/@/utils/toolsValidate';

    //父级传递来的函数，用于回调
    const emit = defineEmits(["dialogChange","numberChange"]);
    const indexMethod = (index: number) => {
        return index;
    }
    const oneIndexMethod =(index:number)=>{
        return index+1;
    }

    const props = defineProps({
        title: String,
        height:{
            type:String,
            default:'calc(100vh - 370px)'
        },
        Data: {
            type:reactive<TableRulesState>(),
            default:reactive<TableRulesState>({
                isDisabled:false,
                isEdit:false,
                tableData: {
                    data: [],
                    header: [
                        { prop: 'a1', width: '', label: '一级分类', isRequired: true, type: 'select' },
                        { prop: 'a2', width: '', label: '二级分类', isRequired: true, type: 'select' },
                        { prop: 'a3', width: '', label: '三级分类', isRequired: true, type: 'select' },
                        { prop: 'a4', width: '', label: '四级分类', isRequired: true, type: 'date' },
                        { prop: 'a5', width: '', label: '五级分类', isRequired: true, type: 'input' },
                        { prop: 'a6', width: '', label: '六级分类', isTooltip: true, type: 'dialog' },
                        { prop: 'a7', width: '', label: '演示级分类', type: 'input' },
                        { prop: 'a8', width: '', label: '颜色是分类', type: 'input' },
                    ],
                    option: [
                        { value: '选项1', label: '黄金糕' },
                        { value: '选项2', label: '双皮奶' },
                        { value: '选项3', label: '蚵仔煎' },
                    ],
                }
        })
        }
    });
    // 定义变量内容
    const tableRulesRef = ref<FormInstance>();
    const tableRef = ref();

    const numberChange =async (row:any)=>{
        emit("numberChange",row);

    }

    // 表格验证
    const onValidate = (formEl: FormInstance | undefined) => {
        if (props.Data.tableData.data.length <= 0) return ElMessage.warning('请先点击增加一行');
        if (!formEl) return;
        formEl.validate((valid) => {
            if (!valid) return ElMessage.warning('表格项必填未填');
            ElMessage.success('全部验证通过');
        });
    };
    // 新增一行
    const onAddRow = (row) => {
        props.Data.tableData.data.push(row);
        tableRef.value.doLayout();
    };

    const rowclassName = async (row)=>{
        // console.log(index)
        if(row.rowIndex==0){
            return "fixed-row";//"position:'sticky';left:0;zIndex:1;backgroundColor:'#fff'";
        }
    }

    const  dialogChange =async ()=>{
        emit("dialogChange");
    }

    // onMounted(cssFirst);
    // 导出对象
    defineExpose({onAddRow});
</script>
<style scoped>
  :deep(.el-table__body-wrapper tr:first-child) {
        position: sticky !important;
        left: 0;
        z-index: 1;
        background-color: #fff; /* 设置为表格背景色，避免遮挡其他内容 */
    }
</style>
