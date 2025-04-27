<template>
	<div>
		<el-card shadow="never" :body-style="{ paddingBottom: '5px', padding: '0' }">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="客户名称">
					<el-input v-model="queryParams.customerName" clearable placeholder="请输入客户名称/手机号码" />
				</el-form-item>
				<el-form-item label="宠物名称">
					<el-input v-model="queryParams.petName" clearable placeholder="请输入宠物名称" />
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'pcustomer:page'"> 查询 </el-button>
						<el-button
							icon="ele-Refresh"
							@click="
								() => {
									queryParams = {};
								}
							"
						>
							重置
						</el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="full-table" shadow="never" style="margin-top: 0; height: calc(100vh - 305px); padding: 0" :body-style="{ padding: '0px 0px 10px 0px' }">
			<Table ref="tableRef" v-bind="tb.tableData" :getData="getData" @sortHeader="onSortHeader" border>
				<template #customerName="scope">
					<el-button type="primary" link @click="selectPcu(scope.row)">{{ scope.row.customerName }} </el-button>
				</template>
				<template #petKind="scope">
					<el-tag>{{ petKindObject[scope.row.petKind] }}</el-tag>
				</template>
				<template #willPayAmount="scope">
					<el-text type="danger">{{ twoFloorNum(scope.row.willPayAmount?.toFixed(2) || '0.00') }}</el-text>
				</template>
				<template #action="scope">
					<el-button icon="ele-Edit" size="small" text="" type="primary" @click="openPay(scope.row)"> 结算 </el-button>
				</template>
			</Table>
		</el-card>
		<PayDialog ref="payDialogRef" @refresh="handleQuery" />
	</div>
</template>

<script lang="ts" setup name="list">
import { defineAsyncComponent, onMounted, reactive, ref, nextTick } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { PaymentCartsApi } from '/@/api-services';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';
import commonFunction from '/@/utils/commonFunction';
import { getKinds} from '/@/utils/dict-utils';


const { twoFloorNum } = commonFunction();

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/productTable.vue'));

const emit = defineEmits(['selectPcuReload']);
const PayDialog = defineAsyncComponent(() => import('/@/views/payments/pays/payDialog.vue'));
const tableRef = ref();
const payDialogRef = ref();
const getUsersData = ref<any>([]);
const petKindObject = ref<any>({});
const queryParams = ref<any>({});
const stores = useUserInfo();
const { userList } = storeToRefs(stores);
const tb = reactive<any>({
	tableData: {
		// 表头内容（必传，注意格式）
		columns: [
			// {
			//     prop: 'cardNumber',
			//     label: '会员编号',
			//     width: '150',
			//     headerAlign: 'center',
			//     sortable: 'custom',
			//     align: 'left',
			//     isCheck: true,
			//     fixed: 'left',
			//     hideCheck: true,
			//     showOverflowTooltip: true
			// },
			{
				prop: 'customerName',
				label: '会员名称',
				headerAlign: 'center',
				sortable: 'custom',
				align: 'left',
				isCheck: true,
				fixed: 'left',
				hideCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'levelText',
				label: '会员级别',
				width: '100',
				headerAlign: 'center',
				sortable: 'custom',
				align: 'left',
				isCheck: true,
				hideCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'petName',
				width: '120',
				label: '宠物名称',
				headerAlign: 'center',
				sortable: 'custom',
				align: 'left',
				isCheck: true,
				fixed: 'left',
				hideCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'petKind',
				width: '100',
				label: '宠物种类',
				headerAlign: 'center',
				sortable: 'custom',
				align: 'center',
				isCheck: true,
				hideCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'petVarietieText',
				width: '120',
				label: '宠物品种',
				headerAlign: 'center',
				sortable: 'custom',
				align: 'left',
				isCheck: true,
				hideCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'cellPhone',
				label: '手机号',
				width: '100',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'willPayAmount',
				label: '总金额',
				width: '100',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				type: 'price',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'saleName',
				label: '销售人员',
				width: '100',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'createTime',
				label: '下单时间',
				width: '160',
				headerAlign: 'center',
				align: 'center',
				toolTip: true,
				sortable: 'custom',
				isCheck: true,
				showOverflowTooltip: true,
			},
			{
				prop: 'action',
				width: 80,
				label: '操作',
				type: 'action',
				align: 'center',
				isCheck: true,
				fixed: 'right',
				hideCheck: true,
			},
		],
		// 配置项（必传）
		config: {
			isStripe: true, // 是否显示表格斑马纹
			isBorder: false, // 是否显示表格边框
			isSerialNo: true, // 是否显示表格序号
			isSelection: true, // 是否勾选表格多选
			showSelection: false, //是否显示表格多选
			pageSize: 20, // 每页条数
			hideExport: true, //是否隐藏导出按钮
			exportFileName: '待付款订单', //导出报表的文件名，不填写取应用名称
			// hideLoad: false,
			hidePrint: true,
			hideTool: true,
		},
		// 搜索表单，动态生成（传空数组时，将不显示搜索，type有3种类型：input,date,select）
		search: [],
	},
});

/**
 * 选择用户
 * @param row
 */
const selectPcu = async (row: any) => {
	emit('selectPcuReload', { pcustomerId: row.customerId });
};
/**
 * 打开付款界面
 */
const openPay = async (row: any) => {
	//打开结算弹窗
	payDialogRef.value.openDialog(row);
};

const getData = async (par: any) => {
	var queryData = { ...par, ...queryParams.value };
	let res = await getAPI(PaymentCartsApi).apiPaymentCartsGetPaymentCartsPagePost(queryData);
	return res.data;
};

const loadPetKind = async () => {
	let result = getKinds();
	let kindData =result ?? ([] as any);
	kindData.forEach((item: any) => {
		petKindObject.value[item.id] = item.name;
	});
};

// 拖动显示列排序回调
const onSortHeader = (data: object[]) => {
	tb.tableData.columns = data;
};

const handleQuery = () => {
	nextTick(() => {
		tableRef.value.pageReset();
	});
};

onMounted(async () => {
	await loadPetKind();
	getUsersData.value = [];
	let userArray = userList.value;
	userArray?.forEach((itme: any) => {
		getUsersData.value.push({ value: itme.id, label: itme.realName });
	});
});
</script>

<style scoped></style>
