<template>
	<el-dialog v-model="state.dialogVisible" class="printView" style="background-color: var(--next-bg-main-color)" draggable align-center :close-on-click-modal="false" :width="state.width + 20 + 'mm'">
		<template #header>
			<div style="color: #fff">
				<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
					<ele-Edit />
				</el-icon>
				<span>{{ props.title }}</span>
			</div>
		</template>
		<div id="preview_content" ref="previewContentRef"></div>
		<template #footer>
			<el-button :loading="state.waitShowPrinter" type="primary" icon="ele-Printer" @click.stop="print">直接打印</el-button>
			<el-button type="primary" icon="ele-Printer" @click.stop="toPdf">导出PDF</el-button>
			<el-button key="close" @click="hideDialog"> 关闭 </el-button>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { hiprint } from 'vue-plugin-hiprint-signalr';
// autoConnect(); // 默认 自动连接直接打印客户端
// disAutoConnect(); // 取消自动连接直接打印客户端

const printName = ref('Microsoft Print to PDF');

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '打印预览',
	},
});
const state = reactive({
	dialogVisible: false,
	waitShowPrinter: false,
	width: 0, // 纸张宽 mm
	printData: {}, // 打印数据
	hiprintTemplate: {} as any,
});

const previewContentRef = ref();
let pd = {};
const showDialog = (templte: any, printData: {}, isdialog = true, width = 210) => {
	// hiprint.init({host:'https://api-pro.huimopei.com',token:'small-10'});//{host:"http://192.168.10.29:17521",token:''}
	//  hiprint.hiwebSocket.setHost({host:'https://api-pro.huimopei.com',token:'small-10'});
	// autoConnect();

	// hiprint.refreshPrinterList((list) => {
	//   console.log(list);
	//   // printList.value = list;
	//   // console.log(printList.value.find(a=>a.name==printName.value).server.clientId)
	//   // clientId.value =printList.value.find(a=>a.name==printName.value).server.clientId;
	// });
	pd = printData;
	var hiprintTemplate = new hiprint.PrintTemplate({ template: templte, settingContainer: '#PrintElementOptionSetting', paginationContainer: '.hiprint-printPagination' });

	// hiprintTemplate.addPrintHtml({ options: { width: 140, height: 35, top: 180, left: 20, content:'<p>{&lt;所属机构&gt;}护理记录单</p><p>宠物主人：{&lt;宠主名称&gt;} &nbsp; &nbsp;宠主电话：{&lt;宠主电话&gt;} &nbsp; 宠物名称：{&lt;宠物名称&gt;} &nbsp; &nbsp;种类：{&lt;宠物种类&gt;} &nbsp; 品种：{&lt;宠物品种&gt;} &nbsp; </p><p>性别：{&lt;宠物性别&gt;} &nbsp; &nbsp; &nbsp; &nbsp; 体重：{&lt;宠物体重&gt;}kg &nbsp; &nbsp; &nbsp; 病例号：{&lt;宠物病历号&gt;} &nbsp;年龄：{&lt;宠物年龄&gt;}</p><p>日期</p><table style="width: auto;"><tbody><tr><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="708"></th></tr><tr><td colSpan="1" rowSpan="1" width="auto">12</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto">3</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto">321</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto">21321</td><td colSpan="1" rowSpan="1" width="auto">1321</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto">321</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto">3</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto">321</td><td colSpan="1" rowSpan="1" width="auto">132</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto">213</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto">321</td><td colSpan="1" rowSpan="1" width="auto">32</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto">213</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto">321</td><td colSpan="1" rowSpan="1" width="auto">321</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto">21</td><td colSpan="1" rowSpan="1" width="auto"></td></tr></tbody></table><p>____ 年 ____ &nbsp;月 ____ &nbsp;日 值班助理：_________</p><p>____ 年____ &nbsp;月____ &nbsp; 日 值班助理：_________ &nbsp; </p><p>时间</p><p>医嘱：</p><p>备注</p><p>1、是否饮食可以根据食盆内食物是否食用来判断日常观察是最重要的部分。</p><p>2、手术动物必须记录切口愈合情况。</p><p>3、正常符号：√，异常报告，符号：X，特殊要求时数字化。</p><p>4、大便异常时用 软 稀 &nbsp;水样 &nbsp;稀带血（同时记录血的颜色）记得拍照报告</p><p>5、不清楚的问题及时报备。</p><p>正常生理指标：</p><p>心率：犬：60-160 &nbsp;猫：120-220（次/分钟）</p><p>体温：犬：37-39.2 猫：37.5-39.5 （℃）</p><p>呼吸频率：犬10-20 猫：15-25 （次/分钟）</p><p>收缩压：犬和猫100-150 （mmHg）</p><p>舒张压：犬和猫60-90 &nbsp; （mmHg）</p><p>平均压：犬：70-100 猫：80-120 &nbsp;（mmHg）</p><p>情况说明：</p><p><br></p><p><br></p>' } });

	state.dialogVisible = isdialog;
	state.width = width;
	state.hiprintTemplate = hiprintTemplate;
	state.printData = printData;
	// state.hiprintTemplate.addPrintHtml({ options: { width: 140, height: 35, top: 180, left: 20, content:'<h1>123213123123</h1>' } });
	console.log("hiprintTemplate",hiprintTemplate)
	console.log("templte",templte)
	console.log("printData",printData)
	console.log("isdialog",isdialog)
	console.log("width",width)
	nextTick(() => {
		while (previewContentRef.value?.firstChild) {
			previewContentRef.value.removeChild(previewContentRef.value.firstChild);
		}
		const newHtml = hiprintTemplate.getHtml(printData);
		previewContentRef.value.appendChild(newHtml[0]);
	});
};

const print = () => {
	try {
		//   if (!hiprint.hiwebSocket.opened) {
		//   ElMessage.warning('未连接到远程打印机，将启用本地打印机');
		//   hiprint.print({templates:[{template: state.hiprintTemplate, data: pd}]})
		//   return;
		// }
		hiprint.getClients((e) => {
			if (Object.keys(e).length <= 0) {
				ElMessage.warning('未连接到远程打印机，将启用本地打印机');
				state.hiprintTemplate.print(state.printData);
				// hiprint.print({ templates: [{ template: state.hiprintTemplate, data: pd }] });
				return;
			} else
				state.hiprintTemplate.print2(state.printData, {
					printer: printName,
					title: props.title,
					//printByFragments: true,   // 是否需要分批打印，分批打印能够支持连续打印大量数据，但会增加打印所需时间
					// generateHTMLInterval: 30, // 多条数据生成HTML的间隔，单位ms，默认是10
					// fragmentSize: 10000,  // 分片字符长度，默认50000
					// sendInterval: 20, // 分片传输间隔，单位ms，默认10
					// type: 'pdf',
				});
		});
	} catch (e) {
		console.log(e);
	} 
	//  state.hiprintTemplate.on('success', function (e) {
	//     ElMessage.success('已发送到打印机');
	//   })
	// 发送任务到打印机失败
	// state.hiprintTemplate.on('printError', function (e) {
	//   console.log('打印失败',e)
	//   ElMessage.error('打印机异常');
	// })
};

const print2 = (templte: any, printData: {}, width = 210) => {
	// hiprint.hiwebSocket.reconnect()
	// showDialog(templte,printData,false)
	//  hiprint.hiwebSocket.setHost({host:'https://api-pro.huimopei.com',token:'small-10'});
	// autoConnect();
	//  console.log('dayin',hiprint.hiwebSocket)
	try {
		// hiprint.hiwebSocket.start()
		let hiprintTemplate = new hiprint.PrintTemplate({ template: templte });
		hiprint.getClients((e) => {
			if (Object.keys(e).length <= 0) {
				ElMessage.warning('未连接到远程打印机，将启用本地打印机');
				hiprintTemplate.print(printData);
				return;
			} else {
				hiprintTemplate.print2(printData, {
					printer: printName,
					title: props.title,
				});
			}
		});
	} catch (e) {
		console.log(e);
	} 
};

const toPdf = () => {
	state.hiprintTemplate.toPdf(state.printData, 'PDF文件');
};
onMounted(() => {
});
const hideDialog = () => {
	state.dialogVisible = false;
};

defineExpose({ showDialog, print2 });
</script>

<style lang="scss" scoped>
:deep(.ant-modal-body) {
	padding: 0px;
}
:deep(.el-dialog__footer) {
	background: var(--el-fill-color-blank);
}
:deep(.ant-modal-content) {
	margin-bottom: 24px;
}
:deep(*) {
	-webkit-print-color-adjust: exact !important; /* Chrome, Safari */

	color-adjust: exact !important; /*Firefox*/

	print-color-adjust: exact !important;
}

:deep(.el-dialog__footer) {
	background: var(--el-fill-color-blank) !important;
}

.printView {
	background-color: var(--next-bg-main-color) !important;
	#preview_content,
	.el-dialog__footer {
		//background-color: #FFFFFF;

		:deep(.hiprint-printPaper) {
			background: var(--el-fill-color-blank) !important;
			margin-bottom: 20px !important;
			box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
		}
		:deep(.hiprint-printTemplate .hiprint-printPanel:first-child) {
			background: transparent;
		}
	}
}
</style>
<style></style>
