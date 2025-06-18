<template>
	<el-row :gutter="4" style="margin: 0px auto; height: 200mm">
		<el-col :span="4">
			<el-card :body-style="{ padding: '0px' }" shadow="never" v-show="isEdit" class="full-table">
				<div slot="header" class="clearfix" style="background-color: var(--el-color-primary); height: 30px; border-radius: 3px 3px 0 0">
					<p style="line-height: 30px; color: var(--el-color-white); font-size: 16px; font-weight: 800; margin-left: 20px; float: left">I</p>
					<p style="line-height: 30px; color: var(--el-color-white); font-size: 14px; font-weight: 800; margin-left: 10px; float: left">标签</p>
				</div>
				<el-row :gutter="24" style="height: calc(100vh - 140px); overflow-y: auto">
					<el-col :span="23" :offset="1" :id="$props.hiprintEpContainer" class="rect-printElement-types" :class="props.hiprintEpContainer"> </el-col>
				</el-row>
			</el-card>
		</el-col>
		<el-col :span="15">
			<el-card shadow="never" class="card-design full-table" style="width: 220mm; margin: 0 auto; height: 200mm" v-loading="loading">
				<template #header>
					<el-button-group style="width: 240px">
						<el-select v-model="state.selectmode" showSearch @change="InitPrintTemp" option-label-prop="label" class="w100" style="width: 240px" value-key="id">
							<el-option v-for="(opt, idx) in state.modeList" :key="opt" :label="opt.name" :value="opt">
								<span style="float: left">{{ opt.name }}</span>
								<span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">
									<el-button
										key="danger"
										type="danger"
										text
										@click.stop="
											() => {
												ElMessage.error(`操作失败:`);
											}
										"
									>
										<el-icon><Close /></el-icon>
									</el-button>
								</span>
							</el-option>
						</el-select>
					</el-button-group>
					<!-- 预览/打印 -->
					<el-button-group style="margin-left: 8px; flex: 1">
						<el-button type="primary" @click="preEnable"> 应用此模板 </el-button>
					</el-button-group>

					<span style="margin-left: 28px; flex: 1">
						<el-text class="mx-1">正在使用的模版</el-text>
						<el-button type="primary" link> {{ state.enablename }} </el-button>
					</span>
				</template>
				<span :class="{ 'overlay-disabled': !isEdit }">
					<div :id="$props.hiprintprintTemplate" :class="$props.hiprintprintTemplate"></div>
				</span>
				<div style="margin: 20px auto">
					<el-button
						type="primary"
						v-show="!isEdit"
						@click="
							() => {
								isEdit = true;
							}
						"
						plain
					>
						设 计
					</el-button>
					<el-button
						type="info"
						v-show="isEdit"
						@click="
							() => {
								isEdit = false;
							}
						"
					>
						取消修改
					</el-button>
					<el-button type="primary" v-show="isEdit" @click="edit"> 保存修改 </el-button>
					<el-button type="warning" @click="restart" plain> 还 原 </el-button>
					<el-button type="primary" icon="ele-View" @click="preView" plain> 预览 </el-button>
				</div>
			</el-card>
		</el-col>
		<!-- <el-col :span="7">
			<el-card shadow="never" class="card-design">
				<div id="preview_content" ref="previewContentRef"></div>
			</el-card>
		</el-col> -->
		<el-col :span="5" class="params_setting_container">
			<el-card shadow="never" :body-style="{ padding: '0px' }" v-show="isEdit">
				<el-row class="hinnn-layout-sider">
					<div :id="PrintElementOptionSetting" style="height: calc(100vh - 110px); overflow-y: auto; overflow-x: hidden"></div>
				</el-row>
			</el-card>
		</el-col>
	</el-row>

	<el-drawer title="打印模板" v-model="state.templateDialogVisible">
		<vue-json-pretty :data="state.templateContent" showLength showIcon showLineNumber showSelectController />
	</el-drawer>

	<!-- 预览 -->
	<PrintPreview ref="preViewRef" />
</template>

<script lang="ts" setup name="hiprintDesign">
import { computed, onMounted, ref, reactive, nextTick, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { Close } from '@element-plus/icons-vue';
import { hiprint, disAutoConnect } from 'vue-plugin-hiprint-signalr';
import tempProviders from './datas/PrescriptionProvider';
import PrintPreview from '/@/views/platform/print/component/hiprint/preview.vue';
import cEMRecordPrescriptiondata from './datas/RecordPrescriptionData';
import { getAPI } from '/@/utils/axios-utils';
import { PrintTemplateApi } from '/@/api-services/api';
import { PrintTypeEnum } from '/@/api-services/models/template-json-manage/print-type-enum';
import other from '/@/utils/other';
const emit = defineEmits(['edit']);

let hiprintTemplate = ref();
const isEdit = ref(false);
const preViewRef = ref();
const state = reactive({
	// 模板选择
	mode: 0,
	selectmode: {} as any,
	enablename: '',
	modeList: [] as any,
	// 当前纸张
	curPaper: {
		type: 'A5',
		width: 210,
		height: 147.6,
	},
	// 纸张类型
	paperTypes: {
		A3: {
			width: 420,
			height: 296.6,
		},
		A4: {
			width: 210,
			height: 296.6,
		},
		A5: {
			width: 210,
			height: 147.6,
		},
		B3: {
			width: 500,
			height: 352.6,
		},
		B4: {
			width: 250,
			height: 352.6,
		},
		B5: {
			width: 250,
			height: 175.6,
		},
	},
	scaleValue: 1,
	scaleMax: 5,
	scaleMin: 0.5,
	// 自定义纸张
	paperPopVisible: false,
	paperWidth: 210,
	paperHeight: 147.6,

	templateDialogVisible: false,
	templateContent: '',
});
const loading = ref(false);

var props = defineProps({
	printType: {
		type: Number,
		default: PrintTypeEnum.NUMBER_1001,
	},
	Providers: {
		type: Object,
		default: tempProviders,
	},
	hiprintEpContainer: {
		type: String,
		default: 'hiprintEpContainer',
	},
	hiprintprintTemplate: {
		type: String,
		default: 'hiprint-printTemplate',
	},
	PrintElementOptionSetting: {
		type: String,
		default: 'PrintElementOptionSetting',
	},
	tempDatas: {
		type: Object,
		default: cEMRecordPrescriptiondata,
	},
});

watch(
	() => props.printType,
	(newValue, oldValue) => {
		state.selectmode = {};
		changeMode(props.Providers);
		handleQuery();
	},
	{ deep: true }
);
// 查询操作
const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(PrintTemplateApi).apiPrintTemplateTypeGetallGet(props.printType);
	state.modeList = [];
	if (res.data.result?.length ?? 0 > 0) {
		// state.modeList =res.data.result?.items;
		try {
			InitmodeList(res.data.result, props.Providers);
		} catch (e) {
			console.log(e);
		} finally {
			loading.value = false;
		}
	} else {
		setPaper(props.Providers.paperType, state.paperTypes[props.Providers.paperType]);
	}

	loading.value = false;
};

// 选择模板
const changeMode = (providers) => {
	// let provider = providers[state.mode];
	hiprint.init({
		providers: [providers.f],
	});
	// hiprint.init({
	// 		providers: [new defaultElementTypeProvider()]
	// 	});
	hiprint.setConfig({
		movingDistance: 2.5,
		text: {
			supportOptions: [
				{
					name: 'styler',
					hidden: true,
				},
				{
					name: 'formatter',
					hidden: true,
				},
			],
		},
	});
	// 渲染自定义选项
	const hiprintEpContainerEl = document.getElementById(props.hiprintEpContainer);
	if (hiprintEpContainerEl) {
		hiprintEpContainerEl.innerHTML = '';
	}
	hiprint.PrintElementTypeManager.build('.' + props.hiprintEpContainer, providers.value);

	// 渲染绘画模板
	const hiprintPrintTemplate = document.getElementById(props.hiprintprintTemplate);
	if (hiprintPrintTemplate) {
		hiprintPrintTemplate.innerHTML = '';
	}
	// 初始化打印模板设计器
	let template = {};
	hiprintTemplate.value = new hiprint.PrintTemplate({
		template: template,
		settingContainer: '#' + props.PrintElementOptionSetting,
		paginationContainer: '.Print' + props.hiprintprintTemplate,
		fontList: [
			{ title: '微软雅黑', value: 'Microsoft YaHei' },
			{ title: '黑体', value: 'STHeitiSC-Light' },
			{ title: 'Arial', value: 'Arial' },
			{ title: '宋体', value: 'SimSun' },
			{ title: '华为楷体', value: 'STKaiti' },
			{ title: 'cursive', value: 'cursive' },
			{ title: 'Vector', value: 'Vector' },
		],
	});
	hiprintTemplate.value.design('#' + props.hiprintprintTemplate);
	// 获取当前放大比例, 当zoom时传true才会有
	state.scaleValue = hiprintTemplate.value.editingPanel.scale || 1;
	// preView();
};

/**
 * 设置纸张大小
 * @param type [A3, A4, A5, B3, B4, B5, other]
 * @param value {width,height} mm
 */
const setPaper = (type: string, value: { width: number; height: number }) => {
	try {
		if (Object.keys(state.paperTypes).includes(type)) {
			state.curPaper = { type: type, width: value.width, height: value.height };
			hiprintTemplate.value.setPaper(value.width, value.height);
		} else {
			state.curPaper = { type: 'other', width: value.width, height: value.height };
			hiprintTemplate.value.setPaper(value.width, value.height);
		}
	} catch (error) {
		ElMessage.error(`操作失败: ${error}`);
	}
};


// 预览
const preView = () => {
	let { width } = state.curPaper;
	let tempData: any = props.tempDatas;
	// if(state.mode==2)
	// 	tempData =instorePrintData;
	// if(state.mode==3)
	// 	tempData =inspectionTestData;
	// if(state.mode==5)
	// 	tempData =cEMRecordPrescriptiondata;

	preViewRef.value.showDialog(hiprintTemplate.value, tempData, width);
};

//启用此模板
const preEnable = async () => {
	await getAPI(PrintTemplateApi).apiPrintTemplateIdTypeEnablePut(state.selectmode.id, props.printType);
	ElMessage.success('应用成功');
	await handleQuery();
};

const InitmodeList = (datas, p) => {
	state.modeList = datas;
	state.enablename = datas.find((s) => s.status === 1)?.name;

	changeMode(p);
	// setPaper('A5',{
	// 		width: 210,
	// 		height: 147.6,
	// 	});
	setPaper(p.paperType, state.paperTypes[p.paperType]);
	isEdit.value = false;
	if (!state.selectmode.id) state.selectmode = state.modeList[0];

	console.log("state.selectmode",state.selectmode)
	InitPrintTemp();
};

const InitPrintTemp = () => {
	hiprintTemplate.value.clear();
	hiprintTemplate.value.update(JSON.parse(state.selectmode.template));
};

//修改处方笺
const edit = async () => {
	let temp = JSON.stringify(hiprintTemplate.value.getJson() || {});
	let row = other.deepClone(state.selectmode);
	row.template = temp;
	// emit("edit",row);
	await getAPI(PrintTemplateApi)
		.apiPrintTemplateEditPost(row)
		.then(async (r:any) => {
			if (r.data?.code === 200) {
				ElMessage.success('保存成功');
			} else {
				ElMessage.error('保存失败');
				return false;
			}
			await handleQuery();
			return true;
		});
};

const restart = async () => {
	loading.value = true;
	await getAPI(PrintTemplateApi)
		.apiPrintTemplateTypeRestartPut(props.printType)
		.then((r) => {
			loading.value = false;
			handleQuery();
		});
};

onMounted(() => {
	nextTick(() => {
		state.modeList = [{ type: tempProviders.type, name: tempProviders.name, value: tempProviders.value }];
		changeMode(props.Providers);
		setPaper(props.Providers.paperType, state.paperTypes[props.Providers.paperType]);
	});
	handleQuery();
	// otherPaper(); // 默认纸张
});

// 导出对象
defineExpose({ hiprintTemplate, state, InitmodeList });
</script>

<style lang="scss" scoped>
:deep(.rect-printElement-types .hiprint-printElement-type > li > ul > li > a) {
	// padding: 4px 4px;
	//color: #1296db;
	// line-height: 1;
	height: auto;
	text-overflow: ellipsis;
	color: var(--el-color-primary);
	box-shadow: none !important;
	border: 1px dashed var(--el-color-primary);
}

// 默认图片
:deep(.hiprint-printElement-image-content) {
	img {
		content: url('~@/assets/logo.png');
	}
}

// 设计容器
.card-design {
	overflow: hidden;
	overflow-x: auto;
	overflow-y: auto;
}
:deep(.hidroppable) {
	margin: 0 auto;
}

:deep(.hiprint-option-item-submitBtn) {
	background: var(--el-color-primary);
}
:deep(.hiprint-option-item-deleteBtn) {
	background: var(--el-color-danger);
}
:deep(.prop-tabs .prop-tab-items li.active) {
	color: var(--el-color-primary);
	border-bottom: 1px solid var(--el-color-primary);
}
:deep(.ant-modal-body) {
	padding: 0px;
}

:deep(.ant-modal-content) {
	margin-bottom: 24px;
}
:deep(.hiprint-printElement-vline) {
	pointer-events: none;
}
:deep(.hiprint-printElement-hline),
:deep(.hiprint-headerLine),
:deep(.hiprint-footerLine) {
	pointer-events: none;
}
:deep(.hiprint-printPaper-content) {
	:deep(.hiprint-printElement-text-content) {
		border: 0cap;
	}
}
:deep(.hiprint-printElement-text-content) {
	border: 0cap;
}
:deep(.hiprint-printElement-table-handle),
:deep(.resizebtn) {
	display: none;
}
:deep(.el-tabs--border-card) {
	background: var(--next-bg-main-color) !important;
}

.overlay-disabled {
	pointer-events: none;
}
</style>
