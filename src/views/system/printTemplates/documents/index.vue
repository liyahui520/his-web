<template>
	<div class="documentTemplate-container">
		<el-container style="overflow: inherit">
			<el-aside class="sidebar" :width="sidebarWidth">
				<div class="sidebar-main" style="height: 98%" :width="sidebarWidth">
					<el-card style="height: 100%; transition: width 0.5s" :width="sidebarWidth" :body-style="{ padding: '0px', width: sidebarWidth, transition: 'width 0.5s' }">
						<el-scrollbar height="100%" :min-size="10">
							<div style="background-color: var(--el-color-primary); height: 40px; border-radius: 3px 3px 0 0">
								<p style="line-height: 40px; color: var(--el-color-white); font-size: 16px; font-weight: 800; margin-left: 20px; float: left">I</p>
								<p style="line-height: 40px; color: var(--el-color-white); font-size: 14px; font-weight: 500; margin-left: 10px; float: left">文书管理</p>
								<el-button style="float: right; margin-top: 8px; margin-right: 10px; border: var(--el-color-white) 1px solid" @click="add" size="small" type="primary">新增 </el-button>
							</div>
							<div class="prescript" v-loading="loading">
								<div
									style="display: grid; grid-template-columns: 170px auto"
									v-for="item in tableData"
									:key="item.id"
									:class="[activeItem == item.id ? 'active-prescript' : '', 'prescript-list']"
									@click="rowClick(item)"
								>
									<span>{{ item.name }}</span>
									<span style="display: grid; grid-template-columns: 60px auto">
										<el-switch
											v-model="item.isEnable"
											class="ml-2"
											size="small"
											inline-prompt
											style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
											active-text="启用"
											inactive-text="停用"
											@change="update(item)"
										/>
										<span
											><el-button type="danger" style="font-size: 12px; padding: 0px" link @click="deleteRow(item)">删除</el-button>
											<el-button type="primary" style="font-size: 12px; padding: 0px" link @click="renameRow(item)">重命名</el-button></span
										>
									</span>
								</div>
							</div>
						</el-scrollbar>
					</el-card>
					<el-button @click="toggleSidebar(isSidebarVisible)" :icon="isSidebarVisible ? DArrowLeft : DArrowRight" class="side-left"></el-button>
				</div>
			</el-aside>
			<el-container style="overflow: inherit">
				<el-main style="padding: 0; height: 500px">
					<el-card style="height: 100%" class="box-card" :body-style="{ padding: '0px' }" v-loading="loading">
						<!-- :insert-node="insertNode" -->
						<Editor
							ref="editorRef"
							:height="'calc(100%)'"
							:placeholder="''"
							@update:getText="updateAllergyHistoryText"
							:content="from.template ?? ''"
							:tempList="items"
							@update:getHtml="updateAllergyHistoryHtml"
							:toolbarConfig="toolbarConfig" 
							:insert-node="insertNode" 
						/>
					</el-card>
				</el-main>
				<el-footer style="padding: 0">
					<el-card
						style="height: 100%; display: flex; align-items: center; justify-content: center"
						class="save-box-card"
						:body-style="{ padding: '1px', display: 'flex', 'align-items': 'center', 'justify-content': 'center' }"
					>
						<el-button type="primary" class="centered" @click="saveDocument">保存文书</el-button>
						<el-button type="info" style="margin-left: 20px" @click="openPrint">预览</el-button>
					</el-card>
				</el-footer>
			</el-container>
			<el-aside class="sidebar-right" :width="sidebarRightWidth">
				<div class="sidebar-right-main" style="height: 98%" :width="sidebarRightWidth">
					<el-card style="height: 100%; transition: width 0.5s" :width="sidebarRightWidth" :body-style="{ padding: '0px', width: sidebarRightWidth, transition: 'width 0.5s' }">
						<div style="background-color: var(--el-color-primary); height: 40px">
							<p style="line-height: 40px; color: var(--el-color-white); font-size: 16px; font-weight: 800; margin-left: 20px; float: left">I</p>
							<p style="line-height: 40px; color: var(--el-color-white); font-size: 14px; font-weight: 500; margin-left: 10px; float: left">标签</p>
						</div>
						<div style="padding: 10px">
							<el-form-item>
								<el-check-tag
									v-for="item in items"
									checked
									style="margin-right: 8px; margin-top: 8px"
									@change="
										(status: boolean) => {
											onChange(item);
										}
									"
									:key="item.label"
									>{{ item.label }}</el-check-tag
								>
							</el-form-item>
						</div>
					</el-card>
					<el-button @click="toggleSidebarRight(isSidebarRightVisible)" :icon="isSidebarRightVisible ? DArrowRight : DArrowLeft" class="side-right"></el-button>
				</div>
			</el-aside>
		</el-container>
		<printDialog ref="printDialogRef" />
		<editName ref="editNameRef" :title="editTitle" @reload="handleQuery" />
	</div>
</template>

<script lang="ts" setup name="documentTemplate">
import { ref, defineAsyncComponent, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { DocumentTemplateApi } from '/@/api-services/api';
import { IToolbarConfig } from '@wangeditor/editor';
// 推荐设置操作 width 为 200
import { SysDocumentTemplatesEditInput } from '/@/api-services/models';
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue';
import other from '/@/utils/other';

// 引入组件
const Editor = defineAsyncComponent(() => import('/@/components/mention/AutoComplete.vue'));
const printDialog = defineAsyncComponent(() => import('/@/components/print/index.vue'));
const editName = defineAsyncComponent(() => import('./component/editName.vue'));
const editorRef = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const queryParams = ref<any>({});
const printDialogRef = ref();
const printTitle = ref('');
const isSidebarVisible = ref(true);
const isSidebarRightVisible = ref(true);
const sidebarWidth = ref('350px');
const sidebarRightWidth = ref('280px');
const insertNode = ref('');
const activeItem = ref(0);
const editNameRef = ref();
const editTitle = ref('新建文书');
const tableParams = ref({
	page: 1,
	pageSize: 999,
	total: 0,
});
const toolbarConfig: Partial<IToolbarConfig> = {
	excludeKeys: ['blockquote', 'insertLink', 'insertVideo', 'codeBlock', 'fullScreen', 'group-more-style', 'emotion', 'group-video', 'todo', 'uploadImage'],
};

const from = ref<SysDocumentTemplatesEditInput>({
	name: '',
	id: 0,
	isEnable: true,
	template: '',
});

const items = ref<any>([
	{ id: 1, label: '机构名称' },
	{ id: 2, label: '机构地址' },
	{ id: 3, label: '机构联系方式' },
	{ id: 4, label: '宠主姓名' },
	{ id: 5, label: '宠主联系方式' },
	{ id: 6, label: '宠主会员编号' },
	{ id: 7, label: '宠主会员级别' },
	{ id: 8, label: '宠主备注' },
	{ id: 9, label: '宠物名称' },
	{ id: 10, label: '宠物种类' },
	{ id: 11, label: '宠物品种' },
	{ id: 12, label: '宠物病例编号' },
	{ id: 13, label: '宠物性别' },
	{ id: 14, label: '宠物年龄' },
	{ id: 15, label: '宠物毛色' },
	{ id: 16, label: '宠物体重' },
]);

const onChange = (item: any) => {
	editorRef.value.insertMention(item.id, `{{${item.label}}}`);
};

const toggleSidebar = (v) => {
	nextTick(() => {
		isSidebarVisible.value = !v;
		sidebarWidth.value = !v ? '350px' : '10px';
	});
};
const toggleSidebarRight = (v) => {
	nextTick(() => {
		isSidebarRightVisible.value = !v;
		sidebarRightWidth.value = !v ? '280px' : '10px';
	});
};
// 查询操作
const handleQuery = async (row = null) => {
	loading.value = true;
	var res = await getAPI(DocumentTemplateApi).apiDocumentTemplatePagePost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total ?? 0;
	loading.value = false;
	if (row != null) {
		activeItem.value = (row as any).id;
		rowClick(row);
	} else if (tableData.value.length > 0) {
		activeItem.value = tableData.value[0].id;
		rowClick(tableData.value[0]);
	}
};

//启用停用
const update = async (row) => {
	await getAPI(DocumentTemplateApi).apiDocumentTemplateEditPut(row);
	await handleQuery();
};
//点击事件
const rowClick = async (row) => {
	from.value = row;
	activeItem.value = row.id;
};

// 打开打印页面
const openPrint = async () => {
	printTitle.value = '打印文书'; 
	// var res = await getAPI(SysPrintApi).apiSysPrintPrintNameGet('文书打印模板');
	var printTemplate= '{"panels":[{"index":0,"name":1,"paperType":"A4","height":297,"width":210,"paperHeader":0,"paperFooter":841.8897637795277,"printElements":[{"options":{"left":16.5,"top":12,"height":804,"width":562.5,"field":"longText","title":"长文本","right":579,"bottom":816,"vCenter":297.75,"hCenter":414,"coordinateSync":false,"widthHeightSync":false,"hideTitle":true},"printElementType":{"title":"长文本","type":"longText"}}],"paperNumberContinue":true,"watermarkOptions":{},"panelLayoutOptions":{}}]}';
	var template = JSON.parse(printTemplate);
	let row =htmlContent.value;;
	let json = other.deepClone({ longText: row });
	printDialogRef.value.showDialog(template, json);
};

const updateAllergyHistoryText = async (val) => {};
const htmlContent = ref('');
const updateAllergyHistoryHtml = async (html) => {
	htmlContent.value = html;
};

/**
 * 保存文书
 */
const saveDocument = async () => {
	loading.value = true;
  from.value.template = htmlContent.value;
	if ((from.value.id ?? 0) > 0) await getAPI(DocumentTemplateApi).apiDocumentTemplateEditPut(from.value);
	// else{

	//   //  await getAPI(DocumentTemplateApi).apiDocumentTemplateAddPost(from.value);
	// }
	loading.value = false;
	await handleQuery();
};

/**
 * 新增
 */
const add = async () => {
	editTitle.value = '新增文书';
	editNameRef.value.openDialog({
		name: '',
		id: 0,
		isEnable: true,
		template: '',
	});
};

/**
 * 删除文书
 * @param row
 */
const deleteRow = async (row) => {
	await getAPI(DocumentTemplateApi)
		.apiDocumentTemplateDeleteDelete(row)
		.then((_) => {
			ElMessage({
				showClose: true,
				message: '删除成功！',
				type: 'success',
			});
			handleQuery();
		});
};

/**
 * 重命名
 * @param row
 */
const renameRow = async (row) => {
	editNameRef.value.openDialog(row);
};

handleQuery();
</script>

<style scoped>
.prescript {
	line-height: 24px;
	.prescript-list {
		cursor: pointer;
		margin: 0 0px;
		padding: 8px 20px;
		border-bottom: 1px solid #eeeeee;
		font-size: 14px;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.65);
	}
	.active-prescript {
		color: var(--el-color-primary);
		background-color: var(--el-color-primary-light-9);
	}
}
.documentTemplate-container {
  .w-e-text-container{ 
    width: 220mm !important;
  }
	:deep(.el-card__body) {
		height: 100% !important;
	}

	.sidebar-main {
		position: absolute;
		transition: width 0.5s;
	}

	.sidebar {
		transition: width 0.5s;
		margin-right: 13px;
	}

	.sidebar-right {
		transition: width 0.5s;
		margin-left: 13px;
	}

	.sidebar-right-main {
		position: absolute;
		transition: width 0.5s;
	}

	.side-left {
		transition: width 0.5s;
		cursor: pointer;
		width: 16px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		top: 50%;
		margin-right: -36px;
		right: 20px;
		border: 0;
		color: #0f9bfc;
		background-color: var(--el-color-white);
		padding: 4px 10px;
	}

	.side-right {
		transition: width 0.5s;
		cursor: pointer;
		width: 16px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		top: 50%;
		margin-right: -36px;
		left: -10px;
		border: 0;
		color: #0f9bfc;
		background-color: var(--el-color-white);
		padding: 4px 10px;
	}

	:deep(.editor-container) {
		height: 100% !important;
		z-index: 10 !important;
	}

	:deep(.save-box-card) {
		.el-button {
			display: block;
			margin: 0 auto;
		}

		:deep(.el-card__body) {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	:deep(.editor-container .w-e-text-container) {
		height: calc(100% - 40px) !important;
		background-color: var(--next-bg-main-color) !important;
		overflow-y: auto !important;
		position: relative !important;
	}

	:deep(.w-e-scroll) {
	}

	:deep(.w-e-text-container [data-slate-editor]) {
		width: 215mm !important;
		/* height: 332mm !important; */
		margin: 20px auto 150px auto !important;
		background-color: var(--el-fill-color-blank) !important;
		padding: 20px 30px 30px 30px !important;
		border: 1px solid #e8e8e8 !important;
		box-shadow: 0 2px 10px rgb(0 0 0 / 12%) !important;
	}

	:deep(.w-e-text-placeholder) {
		width: 750px !important;
		margin: 30px auto 150px auto !important;
		padding: 20px 50px 50px 220px !important;
	}
}
</style>
