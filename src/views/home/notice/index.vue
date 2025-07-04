<template>
	<div class="notice-container">
		<el-card shadow="hover" :body-style="{ paddingBottom: '0' }">
			<el-form :model="state.queryParams" ref="queryForm" :inline="true">
				<el-form-item label="标题">
					<el-input v-model="state.queryParams.title" placeholder="标题" clearable />
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="state.queryParams.type" placeholder="类型" clearable>
						<el-option label="通知" :value="1" />
						<el-option label="公告" :value="2" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button-group>
						<el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
						<el-button icon="ele-Refresh" @click="resetQuery"> 重置 </el-button>
					</el-button-group>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card class="full-table" shadow="hover" style="margin-top: 5px">
			<el-table :data="state.noticeData" style="width: 100%" v-loading="state.loading" border :row-class-name="tableRowClassName">
				<el-table-column type="index" label="序号" width="55" align="center" />
				<el-table-column prop="sysNotice.title" label="标题" header-align="center" show-overflow-tooltip />
				<el-table-column prop="sysNotice.content" label="内容" header-align="center" show-overflow-tooltip>
					<template #default="scope"> {{ removeHtml(scope.row.sysNotice.content) }} </template>
				</el-table-column>
				<el-table-column prop="sysNotice.type" label="类型" width="100" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag v-if="scope.row.sysNotice.type === 1"> 通知 </el-tag>
						<el-tag type="warning" v-else> 公告 </el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="sysNotice.createTime" label="创建时间" align="center" show-overflow-tooltip />
				<el-table-column prop="readStatus" label="阅读状态" width="100" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="info" v-if="scope.row.readStatus === 1"> 已读 </el-tag>
						<el-tag type="danger" v-else> 未读 </el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="sysNotice.publicUserName" label="发布者" align="center" show-overflow-tooltip />
				<el-table-column prop="sysNotice.publicTime" label="发布时间" align="center" show-overflow-tooltip />
				<el-table-column label="操作" width="80" fixed="right" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-button icon="ele-InfoFilled" size="small" text type="primary" @click="viewDetail(scope.row)"> 详情 </el-button>
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
		<el-dialog v-model="state.dialogVisible" draggable width="769px">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Bell /> </el-icon>
					<span> 消息详情 </span>
				</div>
			</template>
			<div class="w-e-text-container">
				<div v-html="state.content" data-slate-editor></div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="state.dialogVisible = false">确认</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="notice">
import '@wangeditor/editor/dist/css/style.css';
import { onMounted, reactive } from 'vue';
import commonFunction from '/@/utils/commonFunction';

import { getAPI } from '/@/utils/axios-utils';
import { SysNoticeApi } from '/@/api-services/api';
import { SysNoticeUser } from '/@/api-services/models';

const { removeHtml } = commonFunction();
const state = reactive({
	loading: false,
	noticeData: [] as Array<SysNoticeUser>,
	queryParams: {
		title: undefined,
		type: undefined,
	},
	tableParams: {
		page: 1,
		pageSize: 20,
		total: 0 as any,
	},
	editNoticeTitle: '',
	dialogVisible: false,
	content: '',
});
onMounted(async () => {
	handleQuery();
});

// 查询操作
const handleQuery = async () => {
	state.loading = true;
	var res = await getAPI(SysNoticeApi).apiSysNoticePageReceivedGet(state.queryParams.title, state.queryParams.type, state.tableParams.page, state.tableParams.pageSize);
	state.noticeData = res.data.result?.items ?? [];
	state.tableParams.total = res.data.result?.total;
	state.loading = false;
};
// 重置操作
const resetQuery = () => {
	state.queryParams.title = undefined;
	state.queryParams.type = undefined;
	handleQuery();
};
// 改变页面容量
const handleSizeChange = (val: number) => {
	state.tableParams.pageSize = val;
	handleQuery();
};
// 改变页码序号
const handleCurrentChange = (val: number) => {
	state.tableParams.page = val;
	handleQuery();
};
// 查看详情
const viewDetail = async (row: any) => {
	state.content = row.sysNotice.content;
	state.dialogVisible = true;

	row.readStatus = 1;
	// mittBus.emit('noticeRead', row.sysNotice.id);
	await getAPI(SysNoticeApi).apiSysNoticeSetReadPost({ id: row.sysNotice.id });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tableRowClassName = ({ row, rowIndex }: { row: SysNoticeUser; rowIndex: number }) => {
	return row.readStatus === 1 ? 'info-row' : '';
};
</script>

<style lang="scss">
// .el-table .info-row {
// 	--el-table-tr-bg-color: var(--el-color-info-light-9);
// }

.editor{
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 3;
}
.toolbar {
  border: 1px solid #ccc;
  min-height: 50px;
}
// 富文本查看表格样式(对查看的时候需要自己手动加table/td/th的样式,不然就只有内容没有线)
.notice {
  table {
    border: none;
    border-collapse: collapse;
  }
  table td,
  table th{
    border: 1px solid #ccc;
    padding: 3px 5px;
    min-width: 50px;
    height: 20px;
  }
  table th {
    border-right: 1px solid #ccc;
    border-bottom: 2px solid #ccc;
    text-align: center;
    background-color: #f1f1f1;
  }
  blockquote{
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }
  code{
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }
  ul, ol{
    margin: 10px 0 10px 20px;
  }
  pre {
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    padding: 10px;
    margin: 5px 0px;
    font-size: 0.8em;
    border-radius: 3px;
  }
  .ql-editor ul li {
    list-style-type: disc;    // 解决序列li前面的.不展示问题
  }
  .ql-editor ol li {
    list-style-type: decimal;   // 解决序列li前面的数字不展示问题
  }
}
// 在哪个页面查看就给表格外围加个class包起来,因为加的样式是全局的,避免样式污染覆盖,我查看表格的页面外围加了个class=notice
</style>
