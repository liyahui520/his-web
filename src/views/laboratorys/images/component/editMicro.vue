<template>
	<el-drawer v-model="isShowDrawer" :title="props.title" size="960" :close-on-click-modal="true">
		<template #header="{ titleId, titleClass }">
			<h4 :id="titleId" :class="titleClass">{{ props.title }}</h4>
		</template>
		<div>
			<div style="padding: 20px 10px">
				<el-descriptions class="margin-top" :column="2" :size="size" border>
					<el-descriptions-item>
						<template #label>
							<div class="cell-item">
								<el-icon :style="iconStyle">
									<user />
								</el-icon>
								客户名称
							</div>
						</template>
						{{ customerPetInfo.customerName }}
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<div class="cell-item">
								<el-icon :style="iconStyle">
									<tickets />
								</el-icon>
								报告单
							</div>
						</template>
						{{ customerPetInfo.itemName }}
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<div class="cell-item">
								<el-icon :style="iconStyle">
									<user />
								</el-icon>
								宠物名称
							</div>
						</template>
						{{ customerPetInfo.petName }}
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<div class="cell-item">
								<el-icon :style="iconStyle">
									<tickets />
								</el-icon>
								开具医生
							</div>
						</template>
						{{ customerPetInfo.doctorName }}
					</el-descriptions-item>

					<el-descriptions-item>
						<template #label>
							<div class="cell-item">
								<el-icon :style="iconStyle">
									<user />
								</el-icon>
								宠物种类
							</div>
						</template>
						{{ customerPetInfo.petKindText }}
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<div class="cell-item">
								<el-icon :style="iconStyle">
									<tickets />
								</el-icon>
								开具日期
							</div>
						</template>
						{{ customerPetInfo.billingTime }}
					</el-descriptions-item>
				</el-descriptions>
			</div>
			<div style="padding-left: 20px; border-top: 1px solid var(--el-card-border-color); padding-top: 20px; padding-bottom: 20px; padding-right: 5px">
				<el-form v-loading="drawerLoading" :model="saveMicroInspectForm" label-width="auto" label-position="left">
					<el-form-item label="显微镜图像：">
						<div class="report-image" v-for="item in saveMicroInspectForm.microInspectImgList" :key="item.id!" v-show="item.isDelete === false">
							<div v-if="item.isDelete === false">
								<el-image :src="item.microImageUrl" :preview-src-list="previewImage.imgs"></el-image>
								<div class="img-conver">
									<el-popconfirm title="确定删除图像?" confirm-button-type="danger" @confirm="deleteImage(item)">
										<template #reference>
											<span style="margin-right: 10px; padding: 0px 4px; cursor: pointer">删除</span>
										</template>
									</el-popconfirm>
									<a style="margin-left: 10px; padding: 0px 4px; cursor: pointer; text-decoration: none; color: #fff" :href="item.microImageUrl" target="_blank">打开</a>
								</div>
								<div class="report-info">
									<div>
										<el-input v-model="item.microImagePartName" style="width: 100%" :rows="2" placeholder="请填写图像部位">
											<template #prepend>标本/描述</template>
										</el-input>
									</div>
									<div style="margin-top: 4px">
										<el-input v-model="item.microImageDescribe" type="textarea" style="width: 100%" :rows="3" placeholder="请填写图像描述">
											<template #prepend>图像描述</template>
										</el-input>
									</div>
								</div>
							</div>
						</div>
						<div style="width: 100%; position: relative; top: 8px">
							<el-upload ref="bscanImageUploadRef" class="upload-demo upload-report" drag multiple :http-request="uploadPetImageUrlHandle" :show-file-list="false">
								<el-icon class="el-icon--upload"><upload-filled /></el-icon>
								<div class="el-upload__text">
									<div style="padding: 0px; margin: 0px; line-height: 22px; margin-top: 5px">
										请将图像拖动到此处/<em>点击选择图像</em><br />
										支持上传jpg/png格式图像，且图像大小不超过10M
									</div>
								</div>
							</el-upload>
						</div>
					</el-form-item>
					<el-form-item label="显微镜部位：">
						<el-input v-model="saveMicroInspectForm.microInspectPart" placeholder="请填写显微镜部位" :rows="2" type="textarea" />
					</el-form-item>
					<el-form-item label="显微镜描述：">
						<el-input v-model="saveMicroInspectForm.microDescribe" placeholder="请填写显微镜描述" :rows="2" type="textarea" />
					</el-form-item>
					<el-form-item label="显微镜提示：">
						<el-input v-model="saveMicroInspectForm.microTips" placeholder="请填写显微镜提示" :rows="2" type="textarea" />
					</el-form-item>
					<el-form-item label="显微镜建议：">
						<el-input v-model="saveMicroInspectForm.microPropose" placeholder="请填写显微镜建议" :rows="2" type="textarea" />
					</el-form-item>
					<el-form-item label="检查医生：">
						<div>
							<el-select v-model="saveMicroInspectForm.checkDoctorId" placeholder="请选择检查医生" style="width: 200px">
								<el-option v-for="item in doctorUserData" :key="item.id" :label="item.realName" :value="item.id" />
							</el-select>
							<span style="padding: 10px"> | </span>
							<el-date-picker v-model="saveMicroInspectForm.checkTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="date" placeholder="请选择检查时间" />
						</div>
					</el-form-item>
					<el-form-item label="报告医生：">
						<div>
							<el-select v-model="saveMicroInspectForm.reportDoctorId" placeholder="请选择报告医生" style="width: 200px">
								<el-option v-for="item in doctorUserData" :key="item.id" :label="item.realName" :value="item.id" />
							</el-select>
							<span style="padding: 10px"> | </span>
							<el-date-picker v-model="saveMicroInspectForm.reportTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="date" placeholder="请选择报告时间" />
						</div>
					</el-form-item>
					<el-form-item label="助理：">
						<div>
							<el-select v-model="saveMicroInspectForm.assistantId" placeholder="请选择助理" style="width: 200px">
								<el-option v-for="item in doctorUserData" :key="item.id" :label="item.realName" :value="item.id" />
							</el-select>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<template #footer>
			<div class="drawer-footer">
				<el-button @click="cancel" size="default">取 消</el-button>
				<el-button @click="save" type="primary" size="default" :loading="saveLoading">保 存</el-button>
			</div>
		</template>
	</el-drawer>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { getAPI } from '/@/utils/axios-utils';
import { useUserInfo } from '/@/stores/userInfo';
import { MicroInspectApi } from '/@/api-services/api';
import { SysFileApi } from '/@/api-services/api';
import { SaveMicroInspectInput } from '/@/api-services/models/laboratory-manage/save-micro-inspect-input';
import { SaveMicroImgInspectInput } from '/@/api-services/models/laboratory-manage/save-micro-img-inspect-input';
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';
// 描述列表样式开始
import { Tickets, User } from '@element-plus/icons-vue';
import type { ComponentSize } from 'element-plus';
import { formatDate } from '/@/utils/formatTime';

//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const stores = useUserInfo();
const { userList } = storeToRefs(stores);
const doctorUserData = ref<any>([]);
const doctorUserObject = ref<any>({});

/**
 * 获取医生列表
 */
const getUserList = async () => {
	doctorUserData.value = userList.value;
	doctorUserData.value.map((item: any) => {
		doctorUserObject.value[item.id] = item.realName;
	});
};

//父级传递来的参数
var props = defineProps({
	title: {
		type: String,
		default: '',
	},
});

// 弹窗控制
const isShowDrawer = ref(false);
const drawerLoading = ref(true);
const customerPetInfo = reactive({
	customerName: null,
	itemName: null,
	petName: null,
	petKindText: null,
	billingTime: null,
	doctorName: null,
} as any);
// 打开弹窗
const openDialog = async (row: any) => {
	customerPetInfo.customerName = row.customerName;
	customerPetInfo.itemName = row.itemName;
	customerPetInfo.petName = row.petName;
	customerPetInfo.petKindText = row.petKindText;
	customerPetInfo.billingTime = row.billingTime;
	customerPetInfo.doctorName = row.doctorName;
	saveMicroInspectForm.microInspectImgList = [];
	previewImage.imgs = [];

	isShowDrawer.value = true;
	getUserList();
	await getmicroInspectResult(row.id);
};

//将属性或者函数暴露给父组件
defineExpose({ openDialog });

// 取消
const cancel = () => {
	emit('reloadTable');
	isShowDrawer.value = false;
};

const size = ref<ComponentSize>('default');
const iconStyle = computed(() => {
	const marginMap = {
		large: '8px',
		default: '6px',
		small: '4px',
	} as any;
	return {
		marginRight: marginMap[size.value] || marginMap.default,
	};
});
// 描述列表样式结束

// 显微镜检查结果表单
const saveMicroInspectForm = reactive({
	cemRecordTestItemId: 0,
	microDescribe: null,
	microInspectPart: null,
	microTips: null,
	microPropose: null,
	checkDoctorId: null,
	checkDoctorName: null,
	checkTime: null,
	reportDoctorId: null,
	reportDoctorName: null,
	reportTime: null,
	assistantId: null,
	assistantName: null,
	microInspectImgList: [] as Array<SaveMicroImgInspectInput>,
} as SaveMicroInspectInput);

// 获取显微镜结果
const getmicroInspectResult = async (cEMRecordTestItemId: number) => {
	drawerLoading.value = true;

	saveMicroInspectForm.cemRecordTestItemId = cEMRecordTestItemId;

	var res = await getAPI(MicroInspectApi).apiMicroInspectByRecordTestItemIdCEMRecordTestItemIdGet(cEMRecordTestItemId);
	if (res.data.result) {
		var result = res.data.result;
		saveMicroInspectForm.microDescribe = result.microDescribe;
		saveMicroInspectForm.microTips = result.microTips;
		saveMicroInspectForm.microPropose = result.microPropose;
		saveMicroInspectForm.microInspectPart = result.microPropose;

		saveMicroInspectForm.checkDoctorId = result.checkDoctorId;
		saveMicroInspectForm.checkDoctorName = result.checkDoctorName;
		saveMicroInspectForm.checkTime = formatDate(new Date(result.checkTime as any), 'YYYY-mm-dd');

		saveMicroInspectForm.reportDoctorId = result.reportDoctorId;
		saveMicroInspectForm.reportDoctorName = result.reportDoctorName;
		saveMicroInspectForm.reportTime = formatDate(new Date(result.reportTime as any), 'YYYY-mm-dd');
		saveMicroInspectForm.microInspectImgList = result.microInspectImgList as Array<SaveMicroImgInspectInput>;

		result.microInspectImgList?.forEach((element) => {
			previewImage.imgs.push(element.microImageUrl!);
		});
	} else {
		saveMicroInspectForm.microDescribe = null;
		saveMicroInspectForm.microTips = null;
		saveMicroInspectForm.microPropose = null;
		saveMicroInspectForm.microInspectPart = null;

		saveMicroInspectForm.checkDoctorId = doctorUserData.value[0].id;
		saveMicroInspectForm.checkDoctorName = doctorUserObject.value[doctorUserData.value[0].id];
		saveMicroInspectForm.checkTime = formatDate(new Date(), 'YYYY-mm-dd');

		saveMicroInspectForm.reportDoctorId = doctorUserData.value[0].id;
		saveMicroInspectForm.reportDoctorName = doctorUserObject.value[doctorUserData.value[0].id];
		saveMicroInspectForm.reportTime = formatDate(new Date(), 'YYYY-mm-dd');

		saveMicroInspectForm.microInspectImgList = [];
		previewImage.imgs = [];
	}

	drawerLoading.value = false;
};

// 保存显微镜检查结果
const saveLoading = ref(false);
const save = async () => {
	saveLoading.value = true;

	saveMicroInspectForm.checkDoctorName = doctorUserObject.value[saveMicroInspectForm.checkDoctorId ?? 0];
	saveMicroInspectForm.reportDoctorName = doctorUserObject.value[saveMicroInspectForm.reportDoctorId ?? 0];
	saveMicroInspectForm.assistantName = doctorUserObject.value[saveMicroInspectForm.assistantId ?? 0];
	await getAPI(MicroInspectApi)
		.apiMicroInspectSavePost(saveMicroInspectForm)
		.then((res) => {
			saveLoading.value = false;
			ElMessage({
				message: '报告保存成功',
				type: 'success',
			});
			cancel();
		})
		.catch((res) => {
			saveLoading.value = false;
		});
};

// 删除图片
const deleteImage = (img: SaveMicroImgInspectInput) => {
	img.isDelete = true;
	previewImage.imgs = previewImage.imgs.filter((item) => item != img.microImageUrl);
};
// 上传图片处理
const uploadPetImageUrlHandle = async (options: any) => {
	const res = await getAPI(SysFileApi).apiSysFileUploadFilePostForm(options.file);
	var result = res.data.result;
	if (result) {
		const img: SaveMicroImgInspectInput = {
			id: 0,
			microImageUrl: result.url!,
			microImageDescribe: '',
			microImagePartName: '',
			isDelete: false,
		};
		saveMicroInspectForm.microInspectImgList?.push(img);
		previewImage.imgs.push(result.url!);
	}
};

// 图片预览
const previewImage = reactive({ imgs: [] as Array<string> });
</script>

<style lang="css" scoped>
/* 底部抽屉样式 */
.drawer-footer {
	padding: 10px;
	border-top: 1px solid var(--el-card-border-color);
}

.report-image {
	position: relative;
	border: 1px solid var(--el-card-border-color);
	width: 100%;
	border-radius: 5px;
	margin-bottom: 4px;
}

.report-image .el-image {
	position: absolute;
	left: 10px;
	top: 10px;
	height: 118px;
	width: 160px;
	object-fit: cover;
	border-radius: 5px;
}

.img-conver {
	position: absolute;
	top: 101px;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	left: 10px;
	height: 28px;
	width: 160px;
	background-color: rgb(0, 0, 0, 0.6);
	line-height: 28px;
	color: #fff;
	font-size: 14px;
	text-align: center;
	backdrop-filter: blur(2px);
}

.report-info {
	padding-left: 180px;
	padding-top: 10px;
	padding-right: 10px;
	min-height: 128px;
	margin-bottom: 10px;
}
</style>

<style>
.upload-report .el-upload-dragger {
	padding: 0px !important;
}
.upload-report .el-upload {
	--el-upload-dragger-padding-horizontal: 0px;
}
.upload-report .el-upload-dragger .el-icon--upload {
	position: relative;
	top: 4px;
}
.upload-report .el-upload-dragger .el-upload__text {
	position: relative;
	top: -16px;
}
</style>
