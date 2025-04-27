<template>
	<div class="septindex-container">
		<el-scrollbar>
			<el-card class="box-card" :body-style="{ padding: '0px' }" style="min-width: 1100px; height: 100%">
				<div slot="header" class="clearfix" style="background-color: var(--el-color-primary); height: 30px; border-radius: 3px 3px 0 0">
					<p style="line-height: 30px; color: var(--el-color-white); font-size: 16px; font-weight: 800; margin-left: 20px; float: left">I</p>
					<p style="line-height: 30px; color: var(--el-color-white); font-size: 14px; font-weight: 800; margin-left: 10px; float: left">诊疗信息</p>
				</div>
				<div style="padding: 5px">
					<el-row :gutter="5" align="middle" justify="space-between">
						<el-col :span="15">
							<el-avatar 
								:size="60"
								style="float: left; text-align: center"
								:src="props.data?.pPetsInfo?.petImageUrl"
							>
						<img v-if="props?.data?.pPetsInfo?.petKind === '1300010000001'" src="https://img.huimopei.com/img/Default/Dog.png" />
							<img v-else-if="props?.data?.pPetsInfo?.petKind === '1300010000002'" src="https://img.huimopei.com/img/Default/Cat.png" />
							<img v-else src="https://img.huimopei.com/img/Default/default.png" /></el-avatar> 
							<div style="float: left; text-align: center; margin-left: 20px">
								<el-breadcrumb separator="|" style="line-height: 35px">
									<el-breadcrumb-item>
										{{ props.data?.pcutomerDetail?.name }}
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										{{ props.data?.pcutomerDetail?.sexText }}
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										<el-tag class="ml-2" type="success" effect="dark">
											{{ props.data?.pcutomerDetail?.levelText }}
										</el-tag>
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										<el-tag class="ml-2" type="warning" effect="dark">
											{{ props.data?.pcutomerDetail?.cardNumber }}
										</el-tag>
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										<el-tag class="ml-2">{{ props.data?.pcutomerDetail?.cellPhone }}</el-tag>
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										{{ props.data?.pcutomerDetail?.sourceText }}
									</el-breadcrumb-item>
								</el-breadcrumb>
								<el-breadcrumb separator="|" style="line-height: 25px">
									<el-breadcrumb-item>
										{{ props.data?.pPetsInfo?.petName }}
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										{{ props.data?.pPetsInfo?.petKindText }}
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										{{ props.data?.pPetsInfo?.petVarietieText }}
										<!-- <el-text style="width: 120px" truncated>
											{{ props.data?.pPetsInfo?.petVarietieText }}
										</el-text> -->
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										{{ props.data?.pPetsInfo?.petGenderText }}
									</el-breadcrumb-item>
									<el-breadcrumb-item> {{ props.data?.pPetsInfo?.petWeight }}Kg </el-breadcrumb-item>
									<el-breadcrumb-item>
										{{ formatAge(props.data?.pPetsInfo?.petBirthDate) }}
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										<el-tag size="small" type="success" v-if="props.data?.pPetsInfo?.petIsDeworming == 1"> 已驱虫 </el-tag>
										<el-tag size="small" type="warning" v-if="props.data?.pPetsInfo?.petIsDeworming == 0"> 未驱虫 </el-tag>
										<el-tag size="small" type="danger" v-if="props.data?.pPetsInfo?.petIsDeworming == -1"> 驱虫未知 </el-tag>
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										<el-tag size="small" type="success" v-if="props.data?.pPetsInfo?.petIsVaccinated == 1">已接种 </el-tag>
										<el-tag size="small" type="warning" v-if="props.data?.pPetsInfo?.petIsVaccinated == 0">未接种 </el-tag>
										<el-tag size="small" type="danger" v-if="props.data?.pPetsInfo?.petIsVaccinated == -1">接种未知 </el-tag>
									</el-breadcrumb-item>
									<el-breadcrumb-item>
										<el-tag size="small" type="success" v-if="props.data?.pPetsInfo?.petIsSterilization == 1">已绝育 </el-tag>
										<el-tag size="small" type="warning" v-if="props.data?.pPetsInfo?.petIsSterilization == 0">未绝育 </el-tag>
										<el-tag size="small" type="danger" v-if="props.data?.pPetsInfo?.petIsSterilization == -1">绝育未知 </el-tag>
									</el-breadcrumb-item>
								</el-breadcrumb>
							</div>
						</el-col>
						<el-col :span="9">
							<div style="float: right">
								<el-text v-show="$props.isSave" v-if="!$props.disabled">
									<el-icon :color="'#0D76F7'">
										<CircleCheck />
									</el-icon>
									<span style="font-size: 12px; margin-right: 10px; color: #0d76f7">已自动保存</span>
								</el-text>
								<el-text v-show="!$props.isSave" v-if="!$props.disabled">
									<el-icon :color="'#434343'">
										<Edit />
									</el-icon>
									<span style="font-size: 12px; margin-right: 10px; color: #434343">正在编辑中</span>
								</el-text>
								<el-button :icon="CircleCheck" type="primary" @click="save" plain v-if="!$props.disabled">保存</el-button>
								<!-- <el-divider direction="vertical"/>
              <el-button :icon="Printer" type="primary" plain>打印</el-button> -->
								<el-divider direction="vertical" v-if="!$props.disabled" />
								<el-button :icon="View" type="primary" plain @click="priviewRecord($props.data.recordId)">预览并打印</el-button>
								<!--                            <el-divider direction="vertical"/>-->
								<!--                            <el-button :icon="CircleCheck" type="primary">保存病例</el-button>-->
								<el-divider direction="vertical" v-if="!$props.disabled" />
								<el-button :icon="SwitchButton" v-if="!$props.disabled" v-show="isvisitDoctor" @click="endRecord" type="warning">结束诊疗</el-button>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-card>
		</el-scrollbar>
		<PrintView ref="printViewRef" />
	</div>
</template>

<script lang="ts" setup name="septindex">
import { onMounted, onUnmounted, reactive, ref, defineAsyncComponent, nextTick, watch } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { auth } from '/@/utils/authFunction';
import { PrintAndPreviewApi } from '/@/api-services';
import { verifyNumberComma, verifyNumberCnUppercase, verifyTextColor } from '/@/utils/toolsValidate';
import { formatAge } from '/@/utils/formatTime';
import { Check, Delete, Edit, Message, Search, Star, Printer, View, CircleCheck, SwitchButton } from '@element-plus/icons-vue';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';
const PrintView = defineAsyncComponent(() => import('/@/components/print/index.vue'));

const printViewRef = ref();
const isvisitDoctor = ref(true);
const stores1 = useUserInfo();
const { userInfos } = storeToRefs(stores1);
//父级传递来的参数
var props = defineProps({
	data: {
		type: Object,
		default: () => {},
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	isSave: {
		type: Boolean,
		default: true,
	},
});
// 引入组件
// watch(
//     () => props.data,
//     (newValue, oldValue) => {
//       isvisitDoctor.value = newValue?.cemRecord?.visitDoctorId === userInfos.value.id;
//     }
// );
const emit = defineEmits(['save', 'endRecord']);

const save = async () => {
	emit('save');
};

const endRecord = async () => {
	emit('endRecord');
};

const priviewRecord = async (recordId:any) => {
	var r = await getAPI(PrintAndPreviewApi).apiPrintAndPreviewRecordIdGetRecordPreviewPrintPost(recordId, {
		hasZhuSu: true,
		hasPhysical: true,
		hasPrescriptions: true,
		hasTests: true,
		hasDiagnoses: true,
		hasAdvice: true,
		hasFollow: true,
	});
	var data = r.data?.result;
	var json = JSON.parse(data?.template as any);
	printViewRef.value.showDialog(json, data?.binData, json?.panels[0].width);
};

const TagVisitDoctor = async (b) => {
	isvisitDoctor.value = b;
};
defineExpose({ TagVisitDoctor });
onMounted(async () => {});
</script>

<style scoped lang="scss">
.septindex-container {
	height: 100%;

	.box-card {
		height: 80px;
		:deep(.el-avatar) {
			background-color: white !important;
		}
	}
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: '';
	}
	.clearfix:after {
		clear: both;
	}
}
</style>
