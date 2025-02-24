<template>
	<div class="inHospital-nurseView">
		<el-dialog v-model="isShowDialog" title="添加日常" width="30%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>添加日常</span>
				</div>
			</template>

			<el-form :model="ruleForm" ref="ruleFormRef" size="default" label-width="100px" :rules="rules">
				<el-row :gutter="12">
					<el-form-item v-show="false">
						<el-input v-model="ruleForm.id" />
					</el-form-item>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="记录内容" prop="content">
							<el-input type="textarea" v-model="ruleForm.content" placeholder="请输入记录内容" maxlength="500"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="备注" prop="remark">
							<el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注" maxlength="500"></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="图片">
							<el-upload ref="imageRef" list-type="picture-card" :limit="3" :show-file-list="true" :http-request="uploadPetImageUrlHandle">
								<el-icon>
									<Plus />
								</el-icon>
								<template #file="{ file }">
									<div>
										<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
										<span class="el-upload-list__item-actions">
											<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
												<el-icon><zoom-in /></el-icon>
											</span>

											<span class="el-upload-list__item-delete" @click="handleRemove(file)">
												<el-icon><Delete /></el-icon>
											</span>
										</span>
									</div>
								</template>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog class="next-dialog" v-model="dialogVisible" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Search /> </el-icon>
					<span>预览</span>
				</div>
			</template>
			<img w-full :src="dialogImageUrl" alt="Preview Image" />
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="inHospital-nurseView">
import { ref, onMounted } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi, SysFileApi } from '/@/api-services';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue';

const imageRef = ref();
const isShowDialog = ref<any>(false);
const dialogVisible = ref<any>(false);
const dialogImageUrl = ref<any>('');
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const ruleFormRef = ref();
const ruleForm = ref<any>();
//自行删除非必填规则
const rules = ref<FormRules>({
	content: [{ required: true, message: '请输入记录内容！', trigger: 'blur' }],
});
const handlePictureCardPreview = (file: any) => {
	dialogImageUrl.value = file.url!;
	dialogVisible.value = true;
};
/**
 * 上传的图片
 */
const uploadFiles = ref<any>([]);
/**
 * 处理删除的图片
 * @param file
 */
const handleRemove = async (file: any) => {
	await getAPI(SysFileApi).apiSysFileDeletePost({ id: file.raw.data.id ?? 0 });
	const newArray = uploadFiles.value.filter((m: any) => m.id != file.raw.data.id);
	uploadFiles.value = newArray;
	await imageRef.value.handleRemove(file);
};
/**
 * 打开页面
 * @param row 当前行数据
 */
const openDialog = async (data: any) => {
	isShowDialog.value = true;
	ruleForm.value = data;
	uploadFiles.value = [];
	imageRef.value?.clearFiles();
};
/**
 *
 * @param options
 */
const uploadPetImageUrlHandle = async (options: any) => {
	const res = await getAPI(SysFileApi).apiSysFileUploadFilePostForm(options.file);

	let fileParams = { id: res.data.result?.id, url: res.data.result?.url };
	options.file.data = fileParams;
	uploadFiles.value.push(fileParams);
};
/**
 * 提交
 */
const submit = async () => {
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			ruleForm.value.dailyImages = uploadFiles.value.map((item) => {
				return { fileUrl: item.url, fileId: item.id };
			});
			await getAPI(InHospitalApi)
				.apiInHospitalAddInHospitalsDailysPost(ruleForm.value)
				.then((res: any) => {
					ElMessage.success('添加成功！');
					isShowDialog.value = false;
					emit('reloadTable');
				});
			isShowDialog.value = false;
		}
	});
};

// 页面加载时
onMounted(async () => {});
//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.inHospital-nurseView {
	:deep(.el-dialog__footer) {
		padding-top: 0px !important;
	}
	:deep(.next-dialog .el-dialog__header) {
		height: 30px !important;
	}
}
</style>
