<template>
	<div class="sys-region-container">
		<splitpanes>
			<pane size="20">
				<RegionTree ref="regionTreeRef" @node-click="nodeClick" />
			</pane>
			<pane size="80">
				<el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
					<el-form :model="state.queryParams" ref="queryForm" :inline="true">
						<el-form-item label="行政名称">
							<el-input v-model="state.queryParams.name" placeholder="行政名称" clearable />
						</el-form-item>
						<el-form-item label="行政代码">
							<el-input v-model="state.queryParams.code" placeholder="行政代码" clearable />
						</el-form-item>
						<el-form-item>
							<el-button-group>
								<el-button type="primary" icon="ele-Search" @click="handleQuery" v-auth="'sysRegion:page'"> 查询 </el-button>
								<el-button icon="ele-Refresh" @click="resetQuery"> 重置 </el-button>
							</el-button-group>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" icon="ele-Plus" @click="openAddRegion" v-auth="'sysRegion:add'"> 新增 </el-button>
							<el-button type="danger" icon="ele-Lightning" @click="handlSync" v-auth="'sysRegion:sync'"> 同步统计局 </el-button>
							<el-button type="danger" icon="ele-Lightning" @click="handlMapSync" v-auth="'sysRegion:sync'"> 同步高德数据 </el-button>
						</el-form-item>
					</el-form>
				</el-card>

				<el-card class="full-table" shadow="hover" style="margin-top: 5px">
					<el-table :data="state.regionData" style="width: 100%" v-loading="state.loading" row-key="id" default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" border>
						<el-table-column prop="name" label="行政名称" align="center" show-overflow-tooltip />
						<el-table-column prop="code" label="行政代码" align="center" show-overflow-tooltip />
						<el-table-column prop="cityCode" label="区号" align="center" show-overflow-tooltip />
						<el-table-column prop="orderNo" label="排序" width="70" align="center" show-overflow-tooltip />
						<el-table-column prop="remark" label="备注" header-align="center" show-overflow-tooltip />
						<el-table-column label="操作" width="140" fixed="right" align="center" show-overflow-tooltip>
							<template #default="scope">
								<el-button icon="ele-Edit" size="small" text type="primary" @click="openEditRegion(scope.row)" v-auth="'sysRegion:update'"> 编辑 </el-button>
								<el-button icon="ele-Delete" size="small" text type="danger" @click="delRegion(scope.row)" v-auth="'sysRegion:delete'"> 删除 </el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						v-model:currentPage="state.tableParams.page"
						v-model:page-size="state.tableParams.pageSize"
						:total="state.tableParams.total"
						:page-sizes="[10, 20, 50, 100]"
						size="small"
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						layout="total, sizes, prev, pager, next, jumper"
					/>
				</el-card>
			</pane>
		</splitpanes>

		<EditRegion ref="editRegionRef" :title="state.editRegionTitle" @handleQuery="handleQuery" />
	</div>
</template>

<script lang="ts" setup name="sysRegion">
import { onMounted, reactive, ref } from 'vue';
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

import RegionTree from '/@/views/platform/region/component/regionTree.vue';
import EditRegion from '/@/views/platform/region/component/editRegion.vue';

import { getAPI } from '/@/utils/axios-utils';
import { SysRegionApi } from '/@/api-services/api';
import { SysRegion } from '/@/api-services/models';
import {useUserInfo} from '/@/stores/userInfo';

const editRegionRef = ref<InstanceType<typeof EditRegion>>();
const regionTreeRef = ref<InstanceType<typeof RegionTree>>();
const state = reactive({
	loading: false,
	regionData: [] as Array<SysRegion>, // 列表数据
	queryParams: {
		id: -1,
		pid: undefined,
		name: undefined,
		code: undefined,
	},
	tableParams: {
		page: 1,
		pageSize: 20,
		total: 0 as any,
	},
	editRegionTitle: '',
});

onMounted(async () => {
	await handleQuery();
});

// 查询操作
const handleQuery = async () => {
	state.loading = true;
	let params = Object.assign(state.queryParams, state.tableParams);
	let res = await getAPI(SysRegionApi).apiSysRegionPagePost(params);
	state.regionData = res.data.result?.items ?? [];
	state.tableParams.total = res.data.result?.total;
	state.loading = false;
};

// 重置操作
const resetQuery = async () => {
	state.queryParams.id = -1;
	state.queryParams.pid = undefined;
	state.queryParams.name = undefined;
	state.queryParams.code = undefined;
	await handleQuery();
};

// 打开新增页面
const openAddRegion = () => {
	state.editRegionTitle = '添加行政区域';
	editRegionRef.value?.openDialog({ orderNo: 100 });
};

// 打开编辑页面
const openEditRegion = (row: any) => {
	state.editRegionTitle = '编辑行政区域';
	editRegionRef.value?.openDialog(row);
};

// 删除
const delRegion = (row: any) => {
	ElMessageBox.confirm(`确定删除行政区域：【${row.name}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(SysRegionApi).apiSysRegionDeletePost({ id: row.id });
			await handleQuery();
			// 编辑删除后更新机构数据
			regionTreeRef.value?.initTreeData();
			useUserInfo().reloadSysRegionsList();
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};

// 树组件点击
const nodeClick = async (node: any) => {
	state.queryParams.pid = node.id;
	state.queryParams.name = undefined;
	state.queryParams.code = undefined;
	await handleQuery();
};

// 同步国家统计局操作
const handlSync = async () => {
	ElMessageBox.confirm('确认同步国家统计局行政区域数据？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			ElNotification({
				title: '提示',
				message: '后台努力同步中...',
				type: 'success',
				position: 'bottom-right',
			});
			await getAPI(SysRegionApi).apiSysRegionSyncPost({ timeout: 1000 * 60 * 30 });
			useUserInfo().reloadSysRegionsList();
		})
		.catch(() => {});
};

// 同步国家统计局操作
const handlMapSync = async () => {
	ElMessageBox.confirm('确认同步高德行政区域数据？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			ElNotification({
				title: '提示',
				message: '后台努力同步中...',
				type: 'success',
				position: 'bottom-right',
			});
			await getAPI(SysRegionApi).apiSysRegionSyncGaoDePost({ timeout: 1000 * 60 * 30 });

			useUserInfo().reloadSysRegionsList();
		})
		.catch(() => {});
};

// 改变页面容量
const handleSizeChange = async (val: number) => {
	state.tableParams.pageSize = val;
	await handleQuery();
};

// 改变页码序号
const handleCurrentChange = async (val: number) => {
	state.tableParams.page = val;
	await handleQuery();
};
</script>
