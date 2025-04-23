<template>
	<el-card class="box-card" style="width: 380px; height: 150px; border-radius: 15px" :body-style="{ padding: '0px' }">
		<el-row :gutter="10">
			<el-col :span="24">
				<el-tag type="warning" size="small" style="margin-left: 4px">
					{{ props?.pet?.petRecordNumber ?? '----------' }}
				</el-tag>
				<el-tag type="info" size="small" style="margin-left: 5px" v-if="props?.pet?.petStatus == '-1'">{{ props?.pet?.petStatusText }}</el-tag>
				<el-tag type="warning" size="small" style="margin-left: 5px" v-if="props?.pet?.petStatus == '0'">{{ props?.pet?.petStatusText }}</el-tag>
				<el-tag type="success" size="small" style="margin-left: 5px" v-if="props?.pet?.petStatus == '1'">{{ props?.pet?.petStatusText }}</el-tag>
				<el-tag type="" size="small" style="margin-left: 5px" v-if="props?.pet?.petStatus == '2'">{{ props?.pet?.petStatusText }}</el-tag>
				<el-tag type="danger" size="small" style="margin-left: 5px" v-if="props?.pet?.petStatus == '3'">{{ props?.pet?.petStatusText }}</el-tag>
				<span style="float: right; margin-right: -5px"><el-button icon="ele-Edit" size="small" text="" type="primary" title="编辑" @click="editPet"></el-button></span>
			</el-col>
			<el-col :span="24" style="padding-left: 10px">
				<div style="float: left; text-align: center">
					<div style="text-align: center">
						<el-avatar
							:size="80"
							:src="props?.pet?.petImageUrl" 
						>
							<img v-if="props?.pet?.petKind === '1300010000001'" src="https://img.huimopei.com/img/Default/Dog.png" />
							<img v-else-if="props?.pet?.petKind === '1300010000002'" src="https://img.huimopei.com/img/Default/Cat.png" />
							<img v-else src="https://img.huimopei.com/img/Default/default.png" />
						</el-avatar> 
						<!-- <el-avatar v-else :size="80" :src="'src/assets/in-hospitals/animal.png'" @error="errorHandler"> </el-avatar> -->
					</div>
					<span style="font-size: 12px; line-height: 30px; color: #8d8d91">{{ dateEntityFormatYMD(props?.pet?.createTime) }}</span>
				</div>
				<div style="float: left; margin-left: 10px">
					<div>
						<el-link target="_blank" style="font-weight: bold; font-size: 16px">{{ props?.pet?.petName }}-({{ props?.pet?.petKindText }}) </el-link>
					</div>
					<div style="margin-top: 10px">
						<el-breadcrumb separator="\">
							<el-breadcrumb-item>{{ props?.pet?.petGenderText ?? '-' }}</el-breadcrumb-item>
							<el-breadcrumb-item>
								<el-text style="width: 80px" truncated :title="props?.pet?.petVarietieText">{{ props?.pet?.petVarietieText ?? '-' }}</el-text>
							</el-breadcrumb-item>
							<el-breadcrumb-item>{{ props?.pet?.petColorText ?? '-' }}</el-breadcrumb-item>
							<el-breadcrumb-item>{{ scale2Format(props?.pet?.petWeight) }}Kg</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div style="margin-top: 12px">
						<el-breadcrumb separator="|">
							<el-breadcrumb-item>
								<el-tag size="small" type="success" v-if="props.pet?.petIsDeworming == 1">已驱虫</el-tag>
								<el-tag size="small" type="info" v-if="props.pet?.petIsDeworming == 0">未驱虫</el-tag>
								<el-tag size="small" type="danger" v-if="props.pet?.petIsDeworming == -1">未知</el-tag>
							</el-breadcrumb-item>
							<el-breadcrumb-item>
								<el-tag size="small" type="success" v-if="props.pet?.petIsVaccinated == 1">已接种</el-tag>
								<el-tag size="small" type="info" v-if="props.pet?.petIsVaccinated == 0">未接种</el-tag>
								<el-tag size="small" type="danger" v-if="props.pet?.petIsVaccinated == -1">未知</el-tag>
							</el-breadcrumb-item>
							<el-breadcrumb-item>
								<el-tag size="small" type="success" v-if="props.pet?.petIsSterilization == 1">已绝育</el-tag>
								<el-tag size="small" type="info" v-if="props.pet?.petIsSterilization == 0">未绝育</el-tag>
								<el-tag size="small" type="danger" v-if="props.pet?.petIsSterilization == -1">未知</el-tag>
							</el-breadcrumb-item>
							<!--                            <el-breadcrumb-item>250天</el-breadcrumb-item>-->
						</el-breadcrumb>
					</div>
					<div style="margin-top: 12px; font-size: 12px">
						<el-link type="primary" style="margin-left: 1px">消费记录</el-link>
						<el-link type="primary" style="margin-left: 5px">诊疗记录</el-link>
						<el-link type="primary" style="margin-left: 5px">驱虫疫苗</el-link>
						<el-link type="primary" style="margin-left: 5px">预约提醒</el-link>
					</div>
				</div>
			</el-col>
		</el-row>
		<EditPet ref="editDialogRef" :title="editPetTitle" @reloadTable="petReloadTable" />
	</el-card>
</template>

<script lang="ts" setup>
import commonFunction from '/@/utils/commonFunction';
import EditPet from './editDialog.vue';
import { ref } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { SysPetConfigApi } from '/@/api-services';

const { dateEntityFormatYMD, scale2Format } = commonFunction();

const emit = defineEmits(['petsReload']);
const editDialogRef = ref();
const editPetTitle = ref('');
const errorHandler = () => {
	return true;
};

const petReloadTable = async () => {
	emit('petsReload');
};

/**
 * 获取宠物种类
 */
const getSysPetKind = async () => {
	const res = await getAPI(SysPetConfigApi).apiSysPetKindGet();
	return res.data.result ?? [];
};

/**
 * 种类值变更事件
 * @param kindId
 * @constructor
 */
const KindChange = async (kindId) => {
	if (!kindId) return;
	const res = await getAPI(SysPetConfigApi).apiSysPetVarietieGetByKindId(kindId);
};

/**
 * 修改宠物
 */
const editPet = async () => {
	editPetTitle.value = '修改宠物';
	editDialogRef.value?.KindChange(props.pet?.petKind);
	editDialogRef.value?.openDialog(props.pet);
};

var props = defineProps({
	pet: {} as any,
});

defineExpose({});
</script>

<style scoped lang="scss">
.box-card {
	:deep(.el-avatar) {
		background-color: white !important;
	}
}
</style>
