<template>
	<div class="sys-userCenter-container">
		<el-row :gutter="5" style="width: 100%">
			<el-col :span="8" :xs="24">
				<el-card shadow="hover">
					<div class="account-center-avatarHolder">
						<!-- <el-upload class="h100" ref="uploadAvatarRef" action="" :limit="1" :show-file-list="false" :auto-upload="false" :on-change="uploadAvatarFile" accept=".jpg,.png,.bmp,.gif">
							<el-avatar :size="100" :src="userInfos.avatar" />
						</el-upload> -->
						<el-avatar
							:size="100"
							:src="userInfos.avatar"
							@click="openCropperDialog"
							v-loading="state.avatarLoading"
							element-loading-spinner="el-icon-Upload"
							element-loading-background="rgba(0, 0, 0, 0.2)"
							@mouseenter="mouseEnterAvatar"
							@mouseleave="mouseLeaveAvatar"
						/>
						<div class="username">{{ userInfos.realName }}</div>
					</div>
					<div class="account-center-org">
						<p>
							<el-icon><ele-School /></el-icon> <span>{{ userInfos.orgName ?? '超级管理员' }}</span>
						</p>
						<p>
							<el-icon><ele-Mug /></el-icon> <span>{{ userInfos.posName ?? '超级管理员' }}</span>
						</p>
						<p>
							<el-icon><ele-LocationInformation /></el-icon> <span>{{ userInfos.address ?? '家庭住址' }}</span>
						</p>
					</div>
					<div class="image-signature">
						<el-image :src="userInfos.signature" fit="contain" alt="电子签名" loading="lazy" style="width: 100%; height: 100%"> </el-image>
					</div>
					<el-button icon="ele-Edit" type="primary" @click="openSignDialog" > 电子签名 </el-button>
					<el-upload
						ref="uploadSignRef"
						action=""
						accept=".png"
						:limit="1"
						:show-file-list="false"
						:auto-upload="false"
						:on-change="uploadSignFile"
						:on-exceed="uploadSignFileExceed"
						style="display: inline-block; margin-left: 12px; position: absolute"
					>
						<el-button icon="ele-UploadFilled" >上传手写签名</el-button>
					</el-upload>
				</el-card>
			</el-col>

			<el-col :span="16" :xs="24">
				<el-card shadow="hover">
					<el-tabs>
						<el-tab-pane label="基础信息" v-loading="state.loading">
							<el-form :model="state.ruleFormBase" ref="ruleFormBaseRef" label-width="auto">
								<el-row :gutter="35">
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
										<el-form-item label="真实姓名" prop="realName" :rules="[{ required: true, message: '真实姓名不能为空', trigger: 'blur' }]">
											<el-input v-model="state.ruleFormBase.realName" placeholder="真实姓名" clearable />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
										<el-form-item label="昵称">
											<el-input v-model="state.ruleFormBase.nickName" placeholder="昵称" clearable />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
										<el-form-item label="手机号码" >
											<el-input v-model="state.ruleFormBase.phone" placeholder="手机号码" clearable />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
										<el-form-item label="邮箱">
											<el-input v-model="state.ruleFormBase.email" placeholder="邮箱" clearable />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
										<el-form-item label="出生日期" >
											<el-date-picker v-model="state.ruleFormBase.birthday" type="date" placeholder="出生日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" class="w100" />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
										<el-form-item label="性别">
											<el-radio-group v-model="state.ruleFormBase.sex">
												<el-radio :value="1">男</el-radio>
												<el-radio :value="2">女</el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
										<el-form-item label="地址">
											<el-input v-model="state.ruleFormBase.address" placeholder="地址" clearable type="textarea" />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
										<el-form-item label="备注">
											<el-input v-model="state.ruleFormBase.remark" placeholder="备注" clearable type="textarea" />
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
										<el-form-item>
											<el-button icon="ele-SuccessFilled" type="primary" @click="submitUserBase" > 保存基本信息 </el-button>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-tab-pane>
						<!-- <el-tab-pane label="组织机构">
							<OrgTree ref="orgTreeRef" />
						</el-tab-pane> -->
						<el-tab-pane label="修改密码">
							<el-form ref="ruleFormPasswordRef" :model="state.ruleFormPassword" label-width="auto">
								<el-form-item label="当前密码" prop="passwordOld" :rules="[{ required: true, message: '当前密码不能为空', trigger: 'blur' }]">
									<el-input v-model="state.ruleFormPassword.passwordOld" type="password" autocomplete="off" show-password />
								</el-form-item>
								<el-form-item label="新密码" prop="passwordNew" :rules="[{ required: true, message: '新密码不能为空', trigger: 'blur' }]">
									<el-input v-model="state.ruleFormPassword.passwordNew" type="password" autocomplete="off" show-password />
								</el-form-item>
								<el-form-item label="确认密码" prop="passwordNew2" :rules="[{ validator: validatePassword, required: true, trigger: 'blur' }]">
									<el-input v-model="state.passwordNew2" type="password" autocomplete="off" show-password />
								</el-form-item>
								<el-form-item>
									<el-button icon="ele-Refresh" @click="resetPassword">重 置</el-button>
									<el-button icon="ele-SuccessFilled" type="primary" @click="submitPassword" >确 定</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-col>
		</el-row>

		<el-dialog v-model="state.signDialogVisible" draggable width="600px">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-EditPen /> </el-icon>
					<span> 电子签名 </span>
				</div>
			</template>
			<div style="border: 1px dashed gray; width: 100%; height: 250px">
				<VueSignaturePad ref="signaturePadRef" :options="state.signOptions" style="background-color: #fff" />
			</div>
			<div style="margin-top: 10px">
				<div style="display: inline">画笔粗细：<el-input-number v-model="state.signOptions.minWidth" :min="0.5" :max="2.5" :step="0.1" size="small" /></div>
				<div style="display: inline; margin-left: 30px">画笔颜色：<el-color-picker v-model="state.signOptions.penColor" color-format="hex" size="default"> </el-color-picker></div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="unDoSign">撤销</el-button>
					<el-button @click="clearSign">清屏</el-button>
					<el-button type="primary" @click="saveUploadSign">保存</el-button>
				</span>
			</template>
		</el-dialog>

		<CropperDialog ref="cropperDialogRef" :title="state.cropperTitle" @uploadCropperImg="uploadCropperImg" />
	</div>
</template>

<script lang="ts" setup name="sysUserCenter">
import { onMounted, watch, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ElForm, ElMessageBox, genFileId } from 'element-plus';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
import { useUserInfo } from '/@/stores/userInfo';
import { base64ToFile, blobToFile } from '/@/utils/base64Conver';
// import OrgTree from '/@/views/system/accountRole/user/component/orgTree.vue';
import CropperDialog from '/@/components/cropper/index.vue';
import VueGridLayout from 'vue-grid-layout';
import { sm2 } from 'sm-crypto-v2';
import { clearAccessTokens, getAPI } from '/@/utils/axios-utils';
import { SysFileApi, SysUserApi } from '/@/api-services/api';
import { ChangePwdInput, SysUser, SysFile } from '/@/api-services/models';

const stores = useUserInfo();
const { userInfos } = storeToRefs(stores);
const uploadSignRef = ref<UploadInstance>();
//const uploadAvatarRef = ref<UploadInstance>();
const signaturePadRef = ref<InstanceType<typeof VueGridLayout>>();
const ruleFormBaseRef = ref<InstanceType<typeof ElForm>>();
const ruleFormPasswordRef = ref<InstanceType<typeof ElForm>>();
const cropperDialogRef = ref<InstanceType<typeof CropperDialog>>();
const state = reactive({
	loading: false,
	avatarLoading: false,
	signDialogVisible: false,
	ruleFormBase: {} as SysUser,
	ruleFormPassword: {} as ChangePwdInput,
	signOptions: {
		penColor: '#000000',
		minWidth: 1.0,
		onBegin: () => {
			signaturePadRef.value.resizeCanvas();
		},
	},
	signFileList: [] as any,
	passwordNew2: '',
	cropperTitle: '',
});

onMounted(async () => {
	state.loading = true;
	var res = await getAPI(SysUserApi).apiSysUserBaseInfoGet();
	state.ruleFormBase = res.data.result ?? { account: '' };
	state.loading = false;
});

watch(state.signOptions, () => {
	signaturePadRef.value.signaturePad.penColor = state.signOptions.penColor;
	signaturePadRef.value.signaturePad.minWidth = state.signOptions.minWidth;
});

// 上传头像图片
const uploadCropperImg = async (e: any) => {
	var res = await getAPI(SysFileApi).apiSysFileUploadAvatarPostForm(blobToFile(e.img, userInfos.value.account + '.png'));
	userInfos.value.avatar = getFileUrl(res.data.result!);
	state.ruleFormBase.avatar = userInfos.value.avatar;
};

// 打开电子签名页面
const openSignDialog = () => {
	state.signDialogVisible = true;
};

// 保存并上传电子签名
const saveUploadSign = async () => {
	const { isEmpty, data } = signaturePadRef.value.saveSignature();
	if (isEmpty) {
		userInfos.value.signature = null;
		state.ruleFormBase.signature = null;
	} else {
		var res = await getAPI(SysFileApi).apiSysFileUploadSignaturePostForm(base64ToFile(data, userInfos.value.account + '.png'));
		userInfos.value.signature = getFileUrl(res.data.result!);
		state.ruleFormBase.signature = userInfos.value.signature;
	}
	clearSign();
	state.signDialogVisible = false;
};

// 撤销电子签名
const unDoSign = () => {
	signaturePadRef.value.undoSignature();
};

// 清空电子签名
const clearSign = () => {
	signaturePadRef.value.clearSignature();
};

// 上传手写电子签名
const uploadSignFile = async (file: any) => {
	var res = await getAPI(SysFileApi).apiSysFileUploadSignaturePostForm(file.raw);
	userInfos.value.signature = res.data.result?.url;
	state.ruleFormBase.signature = userInfos.value.signature;
};

// 获得电子签名文件列表
const handleChangeSignFile = (_file: any, fileList: []) => {
	state.signFileList = fileList;
};

// 修改个人信息
const submitUserBase = () => {
	ruleFormBaseRef.value?.validate(async (valid: boolean) => {
		if (!valid) return;
		ElMessageBox.confirm('确定修改个人基础信息？', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		}).then(async () => {
			await getAPI(SysUserApi).apiSysUserBaseInfoPost(state.ruleFormBase);
		});
	});
};

// 密码验证
const validatePassword = (_rule: any, value: any, callback: any) => {
	if (state.passwordNew2 != state.ruleFormPassword.passwordNew) {
		callback(new Error('两次密码不一致！'));
	} else {
		callback();
	}
};

// 密码重置
const resetPassword = () => {
	state.ruleFormPassword.passwordOld = '';
	state.ruleFormPassword.passwordNew = '';
	state.passwordNew2 = '';
};

// 密码提交
const submitPassword = () => {
	ruleFormPasswordRef.value?.validate(async (valid: boolean) => {
		if (!valid) return;

		// SM2加密密码
		const cpwd: ChangePwdInput = { passwordOld: '', passwordNew: '' };
		const publicKey = window.__env__.VITE_SM_PUBLIC_KEY;
		cpwd.passwordOld = sm2.doEncrypt(state.ruleFormPassword.passwordOld, publicKey, 1);
		cpwd.passwordNew = sm2.doEncrypt(state.ruleFormPassword.passwordNew, publicKey, 1);
		await getAPI(SysUserApi).apiSysUserChangePwdPost(cpwd);

		// 退出系统
		ElMessageBox.confirm('密码已修改，是否重新登录系统？', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		}).then(async () => {
			clearAccessTokens();
		});
	});
};

// 打开裁剪弹窗
const openCropperDialog = () => {
	state.cropperTitle = '更换头像';
	cropperDialogRef.value?.openDialog(userInfos.value.avatar);
};

// 鼠标进入和离开头像时
const mouseEnterAvatar = () => {
	state.avatarLoading = true;
};

const mouseLeaveAvatar = () => {
	state.avatarLoading = false;
};

// 上传签名超出数量限制时执行
const uploadSignFileExceed: UploadProps['onExceed'] = (files) => {
	uploadSignRef.value!.clearFiles();
	const file = files[0] as UploadRawFile;
	file.uid = genFileId();
	uploadSignRef.value!.handleStart(file);
};

// 获取文件地址
const getFileUrl = (row: SysFile): string => {
	if (row.bucketName == 'Local') {
		return `/${row.filePath}/${row.id}${row.suffix}`;
	} else {
		return row.url!;
	}
};

// 导出对象
defineExpose({ handleChangeSignFile });
</script>

<style lang="scss" scoped>
.account-center-avatarHolder {
	text-align: center;
	margin-bottom: 24px;

	.username {
		font-size: 20px;
		line-height: 28px;
		font-weight: 500;
		margin-bottom: 4px;
	}
}
.account-center-org {
	margin-bottom: 8px;
	position: relative;
	p {
		margin-top: 10px;
	}
	span {
		padding-left: 10px;
	}
}
.avatar {
	margin: 0 auto;
	width: 104px;
	height: 104px;
	margin-bottom: 20px;
	border-radius: 50%;
	overflow: hidden;
	img {
		height: 100%;
		width: 100%;
	}
}

.image-signature {
	margin-top: 20px;
	margin-bottom: 10px;
	width: 100%;
	height: 150px;
	background-color: #fff;
	text-align: center;
	vertical-align: middle;
	border: solid 1px var(--el-border-color);
}
</style>
