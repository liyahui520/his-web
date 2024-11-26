<template>
	<div style="height: 100%">
		<el-auto-resizer>
			<template #default="{ height, width }">
				<!-- <el-checkbox v-if="false" @change="handelAllShow" v-model="checked2">展开全部</el-checkbox> -->
				<el-table-v2
					:columns="columns"
					:data="Comprops.PropVirtTableS.tables || []"
					:default-expanded-row-keys="expandedRowKeys"
					:expanded-row-keys="expandedRowKeys"
					:expand-column-key="columns[0].key"
					fixed
					:width="width"
					:height="height"
				>
					<template #row="props">
						<Row v-bind="props" />
					</template>
					<template #overlay v-if="Comprops.PropVirtTableS.isLoading">
						<div class="el-loading-mask"  style="display: flex; align-items: center; justify-content: center">
							<el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
								<loading-icon />
							</el-icon>
						</div>
					</template>
				</el-table-v2>
			</template>
		</el-auto-resizer>
	</div>
</template>

<script lang="tsx" setup>
import { ElDatePicker, ElInput, ElInputNumber, ElSelectV2 } from 'element-plus';
import {ref,reactive,defineProps,getCurrentInstance,watch} from 'vue'
import { Loading as LoadingIcon } from '@element-plus/icons-vue'
//接收父组件传递过来的数据
const Comprops = defineProps(['PropVirtTableS'])
const proxy = getCurrentInstance()
//定义接收父组件传递过来的数据中 表头显示的对象
const TableHeaderTitle = reactive(Comprops.PropVirtTableS.keyS)
//定义接收父组件传递过来的数据中 列表显示的数据
const TableData = reactive(Comprops.PropVirtTableS.tables)
//展开全部
let checked2 =  ref(false)
//存放展开全部的对象id
let expandedRowKeys = reactive([])

//处理接收到的表头的显示数据 并且根据父组件传递过来的数据，针对传递的类型，来判断是否显示其他的组件，比如下拉,输入框等等，此处只是简单的判断了，如果显示输入框，那么这一列都会是输入框，如果需要个别的显示，那么还需要加上其他条件。
function generateColumns(data:object){
  let propsData = []
      for (const key in data) {
        let list = {}
            list = {
              key:key,
              dataKey: data[key].children ?  '' : key,
              title: data[key].title,
              width: data[key].width ? data[key].width : 'auto',  //这种表头如果多了，超出不显示，列表不会出现横向滚动条
              fixed:data[key].fixed ? data[key].fixed : ''
              // width:150,//这种超出会出现滚动条
            }
            if(key === 'operate'){
                list.cellRenderer = ({ cellData, rowData }) => {
                  // 假设 key 是在外部定义且可访问的
                    return data[key].children.map(item => {
                      let linkElement
                      if (item.type === 'delete') {
                        linkElement = <el-link onClick={() => {handelRowDelete(item,rowData)}} type="danger">删除</el-link>
                      }else if (item.type === 'edit') {
                        linkElement = <el-link type="primary">编辑</el-link>
                      }
                      return  linkElement
                    })
                }
            }else if(data[key].type ) {
              list.cellRenderer = ({ cellData, rowData }) => {
                    let linkElement
                        //显示输入框
                    if (data[key].type === 'input') {
                      linkElement = <ElInput modelValue={rowData[key]} onUpdate:modelValue = {(e)=>{rowData[key] = e} }  value={rowData[key]}  placeholder="请选择" />
                    }
                       //显示下拉
                    else if (data[key].type === 'select') {
                       linkElement = (
                           <ElSelectV2 multiple={data[key].multiple} options={data[key].children} value-key={data[key].value} label-key={data[key].key} modelValue={rowData[key]} onUpdate:modelValue = {(e)=>{rowData[key] = e} }></ElSelectV2>
                         )
                     }
                     else if (data[key].type === 'date') {
                       linkElement = (
                           <ElDatePicker type="date" clearable={false} modelValue={rowData[key]} onUpdate:modelValue = {(e)=>{rowData[key] = e} }></ElDatePicker>
                         )
                     }
                        //显示计数器
                    else if (data[key].type === 'inputnumber') {
                      linkElement = (
                          <ElInputNumber  controls-position="right"   modelValue={rowData[key]} onUpdate:modelValue = {(e)=>{rowData[key] = e} }/>
                        )
                    }
                    return  linkElement
                }
            }
            propsData.push(list)
      }
    return propsData
}

//处理列表显示的数据
const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = TableData.length,
) =>
{
  if(TableData.length<=0) return [];
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        if(column.dataKey){
            //判断是否包含children ：如果包含列表就会显示折叠展开嵌套数据
          if(TableData[rowIndex]?.children){
            rowData[column.dataKey].children = TableData[rowIndex].children
          }else {
            rowData[column.dataKey] = TableData[rowIndex][column.dataKey]==null?'-':TableData[rowIndex][column.dataKey]
          }
        }
        return rowData
      },
      {
        id: rowIndex,
      }
    )
  })
}

//列表的表头显示数据
const columns = generateColumns(TableHeaderTitle)
// let data =reactive([]);
//列表显示的数据
let data =  reactive(
//自定义添加children测试能否显示附加列表
[])

const columnsRowChildren = reactive(generateColumns({
  application_module: {
      title: "物流供应商编号",
      width:'200px'
    },
    business_code: {
      title: "计费规则名称",
      type:'input',
      width:'200px'
    },
    operation_node: {
      title: "计费仓库",
      width:'200px'
    },
    operator_id: {
      title: "物流供应商",
      width:'200px'
    },
    operator_name: {
      title: "物流公司",
      width:'200px'
    },
    es_id: {
      title: "状态",
      width:'200px'
    },
    operate:
      {
        title:'操作',
        width:'400px',
        children: [
          {
            title: "编辑",
            isshow: `buts.includes('system-users-role')`,
            type: "edit",
          },
          {
            title: "删除",
            isshow: `buts.includes('system-users-delete')`,
            type: "delete",
          },
        ]
      }
}))


//嵌套的tab数据 后期可以根据后端返回的数据来替换
const dataChildren = reactive([
    {
      application_module:'Acc200',
      business_code:'御寒羽绒服1',
      type:'上衣',
      operation_node:'0.3456',
      operator_id:'0.3456',
      operator_name:'M-黑色',
      es_id:'1',
    },
    {
      application_module:'Acc200',
      business_code:'御寒羽绒服1',
      type:'上衣',
      operation_node:'0.3456',
      operator_id:'0.3456',
      operator_name:'M-黑色',
      es_id:'1',
    },
    {
      application_module:'Acc200',
      business_code:'御寒羽绒服1',
      type:'上衣',
      operation_node:'0.3456',
      operator_id:'0.3456',
      operator_name:'M-黑色',
      es_id:'1',
    },
])


//展开全部
// function handelAllShow(value:boolean){
//     if(value) expandedRowKeys = data.map(item => item.id)
//     else expandedRowKeys = []
// }

//判断返回渲染
const Row = ({ cells, rowData }) => {
    //如果rowDate.detail存在就会显示嵌套的列表
  if (rowData.detail) return  <el-table-v2 class="nestElTableV2" data={dataChildren} columns={columnsRowChildren}  width={900} height={200}></el-table-v2>
  return cells
}

Row.inheritAttrs = false

//更新数据 页面列表数据不会刷新问题
watch(
  () => Comprops.PropVirtTableS.tables,
  (newValue) => {
    data.splice(0, data.length);
    data.push(...generateData(columns, newValue.length));
    console.log('更新数据')
  }
 )
</script>
