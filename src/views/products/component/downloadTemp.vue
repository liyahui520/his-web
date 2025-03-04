<template>
	<div class="pcustomer-container">
		<el-dialog v-model="isShowDialog" :width="700" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle">
						<ele-Edit />
					</el-icon>
					<span>{{ props.title }}</span>
				</div>
			</template>
			<div style="height: 450px; max-width: 800px">
				<el-steps direction="vertical" :active="3" finish-status="finish">
					<el-step title="下载产品导入模版">
						<template #description>
							<span style="color: black; font-weight: 500; font-size: 14px">下载产品导入模版，并按要求填写内容。</span>
							<span style="color: black; font-weight: 500; font-size: 14px">点击下载</span>
							<el-button type="primary" link @click="downloadTemplate"> 《产品导入模版》 </el-button>
						</template>
					</el-step>
					<el-step title="上传文件数据，确认信息无误">
						<template #description>
							<el-upload class="upload-demo" ref="upload" drag :auto-upload="false" :limit="1" :file-list="fileList" :on-exceed="handleExceed" :on-change="handleChange" accept=".xlsx">
								<el-icon class="el-icon--upload"><upload-filled /></el-icon>
								<div class="el-upload__text">将文件拖到此处，或<em>点击手动上传</em></div>
								<template #tip>
									<div class="el-upload__tip">请上传大小不超过 10MB 的文件</div>
								</template>
							</el-upload>
						</template>
					</el-step>
					<el-step title="数据预览，手动效验并上传">
						<template #description>
							<p style="color: black; font-weight: 500; font-size: 14px">模板上传完成后，请点击数据效验完成上传</p>
							<el-button type="primary" v-show="fileList.length > 0" @click="UploadFile" :loading="btnloading"> 数据效验 </el-button>
						</template>
					</el-step>
				</el-steps>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel" size="default">取 消</el-button>
					<!-- <el-button type="primary" @click="submit" size="default">确 定</el-button> -->
				</span>
			</template>
		</el-dialog>
		<importTemp ref="importTempRef" title="数据效验" />
		<error ref="errorRef" title="模板数据异常" :errorMessage="message"/>
	</div>
</template>

<script lang="ts" setup name="editDialog">
import { ref, onMounted } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { UploadFilled } from '@element-plus/icons-vue';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
import importTemp from '/@/views/products/component/importTemp.vue';
import error from '/@/components/message/error.vue';
import { downloadByData, getFileName } from '/@/utils/download';
import { genFileId } from 'element-plus';
import { ImportProductApi } from '/@/api-services/api';

const usingMethodObject = ref<any>({});
const dosingWayObject = ref<any>({});
const file = ref<any>();
const fileList = ref<any>([]);
const importTempRef = ref();
const errorRef = ref();
const upload = ref();
const message = ref('');
const btnloading=ref(false);
//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const isShowDialog = ref(false);
const productType=ref<any>(-1);

// 打开弹窗
const openDialog = async (type: any,usingMethodData:any,dosingWayData:any) => {
	fileList.value = [];
	isShowDialog.value = true;
    productType.value=type;
    console.log(dosingWayData,usingMethodData);
    dosingWayObject.value=dosingWayData;
    usingMethodObject.value=usingMethodData;
};

// 通过onChanne方法获得文件列表
const handleChange = (l: any, f: []) => {
	file.value = l;
	fileList.value = f;
};
const handleExceed = (files) => {
	upload.value!.clearFiles();
	const file = files[0] as UploadRawFile;
	file.uid = genFileId();
	upload.value!.handleStart(file);
};

// 取消
const cancel = () => {
	isShowDialog.value = false;
};

/**
 * 下载产品导入模板
 */
const downloadTemplate=async ()=>{
	var res = await getAPI(ImportProductApi).apiImportProductDownProductDrugTemplateInputGet(productType.value,{ responseType: 'blob' });
    let fileName = getFileName(res.headers);
    downloadByData(res.data as any, fileName);
}

const UploadFile = async () => {
	if (fileList.value.length > 0) {
		btnloading.value=true;
		message.value='';
		var r = await getAPI(ImportProductApi).apiImportProductValidateProductDrugPostForm(fileList.value[0]?.raw);
		if (!r.data?.result?.scuess) {
			r.data?.result?.data.forEach(element => {
				message.value+=`第`+element.rowIndex+'行：';
				Object.keys(element.fieldErrors).forEach(key=>{
					message.value+='['+key+']:'+element.fieldErrors[key]+'   '
				});
				message.value+="\r\n";
			});
			errorRef.value?.openDialog();
		} else {
			importTempRef.value?.openDialog(r.data?.result?.data,usingMethodObject.value,dosingWayObject.value);
		}
		btnloading.value=false;
	}
};

// 页面加载时
onMounted(async () => {});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>
<style scoped lang="scss">
:deep(.el-step__icon-inner) {
	font-size: 14px !important;
}
</style>
