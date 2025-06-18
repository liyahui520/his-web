<template>
	<div class="medical-container" style="min-width: 1400px; overflow: hidden">
		<el-card shadow="never" :body-style="{ paddingBottom: '0', border: '0' }" style="border-radius: 5px; margin-top: 0; border: 0; min-height: 70px">
			<el-form :model="queryParams" ref="queryForm" :inline="true">
				<el-form-item label="">
					<el-select
						v-model="queryParams.parmarm"
						filterable
						remote
						class="custom-select"
						reserve-keyword
						:placeholder="queryParams.type === 1 ? '请输入手机号' : queryParams.type == 2 ? '请输入会员名称' : '请输入宠物名称'"
						:remote-method="remoteMethod"
						:loading="loading"
						@change="pcuChange"
					>
						<el-option
							style="height: auto; width: 450px; border: 1px solid #c6e2ff; border-radius: 5px; margin: 5px"
							v-for="item in options"
							:label="item?.id"
							:value="item?.id"
							:key="item?.id"
						>
							<el-row>
								<el-col :span="24" style="height: 30px; line-height: 35px">
									<div>
										<span>{{ item?.name ?? '-' }}</span>
										<el-divider direction="vertical" />
										<span>
											<el-icon style="position: relative; top: 2px">
												<ele-Phone />
											</el-icon>
											{{ item?.cellPhone ?? '-' }}
										</span>
										<el-divider direction="vertical" />
										<span>{{ item?.cardNumber ?? '-' }}</span>
									</div>
								</el-col>
								<el-col :span="24" style="height: 110px; line-height: 24px; margin-top: 3px" v-if="item?.pPetss.length > 0">
									<el-carousel height="auto" autoplay style="">
										<el-carousel-item v-if="item?.pPetss == null || item?.pPetss.count <= 0">
											<div>暂无宠物</div>
										</el-carousel-item>
										<el-carousel-item v-else v-for="pet in item?.pPetss" :key="pet.id" style="height: 100px; border: #00c1de 1px dashed; border-radius: 10px; padding: 5px">
											<div style="float: left; text-align: center">
												<div style="text-align: center">
													<el-avatar :size="60" :src="pet?.petImageUrl" @error="errorHandler">
														<img v-if="pet?.petKind === '1300010000001'" src="https://img.huimopei.com/img/Default/Dog.png" />
														<img v-else-if="pet?.petKind === '1300010000002'" src="https://img.huimopei.com/img/Default/Cat.png" />
														<img v-else src="https://img.huimopei.com/img/Default/default.png" />
													</el-avatar>
												</div>
												<span style="font-size: 12px; line-height: 12px; color: #8d8d91">{{ dateEntityFormatYMD(pet?.createTime) }}</span>
											</div>
											<div style="float: left; margin-left: 10px">
												<div>
													<el-link target="_blank" style="font-weight: bold; color: #8d8d91">{{ pet?.petName }}-({{ pet?.petKindText }}) </el-link>
												</div>
												<div style="margin-top: 0px">
													<el-breadcrumb separator="\">
														<el-breadcrumb-item>{{ pet?.petGenderText ?? '-' }} </el-breadcrumb-item>
														<el-breadcrumb-item>
															<el-text style="width: 80px" truncated :title="pet?.petVarietieText">
																{{ pet?.petVarietieText ?? '-' }}
															</el-text>
														</el-breadcrumb-item>
														<el-breadcrumb-item>{{ pet?.petColorText ?? '-' }} </el-breadcrumb-item>
														<el-breadcrumb-item>{{ scale2Format(pet?.petWeight) }}Kg </el-breadcrumb-item>
													</el-breadcrumb>
												</div>
												<div style="margin-top: 5px">
													<el-breadcrumb separator="|">
														<el-breadcrumb-item>
															<el-tag size="small" type="success" v-if="pet?.petIsDeworming == 1">已驱虫 </el-tag>
															<el-tag size="small" type="info" v-if="pet?.petIsDeworming == 0">未驱虫 </el-tag>
															<el-tag size="small" type="danger" v-if="pet?.petIsDeworming == -1">未知 </el-tag>
														</el-breadcrumb-item>
														<el-breadcrumb-item>
															<el-tag size="small" type="success" v-if="pet?.petIsVaccinated == 1">已接种 </el-tag>
															<el-tag size="small" type="info" v-if="pet?.petIsVaccinated == 0">未接种 </el-tag>
															<el-tag size="small" type="danger" v-if="pet?.petIsVaccinated == -1">未知 </el-tag>
														</el-breadcrumb-item>
														<el-breadcrumb-item>
															<el-tag size="small" type="success" v-if="pet?.petIsSterilization == 1">已绝育 </el-tag>
															<el-tag size="small" type="info" v-if="pet?.petIsSterilization == 0">未绝育 </el-tag>
															<el-tag size="small" type="danger" v-if="pet?.petIsSterilization == -1">未知 </el-tag>
														</el-breadcrumb-item>
														<!--                            <el-breadcrumb-item>250天</el-breadcrumb-item>-->
													</el-breadcrumb>
												</div>
											</div>
										</el-carousel-item>
									</el-carousel>
								</el-col>
							</el-row>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="ele-Plus" v-auth="'pcustomer:add'" @click="addPcustomer"> 登记会员 </el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="InitScattered" icon="ele-DArrowLeft" v-auth="'pcustomer:add'"> 回到散客 </el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-row :gutter="10" style="margin-top: 10px">
			<el-col :span="11" style="height: 100%">
				<medicalPcustomer ref="refmedicalPcustomer" />
			</el-col>
			<el-col :span="13" style="height: 100%">
				<medicalDetails @selectPcuReload="selectPcu" />
			</el-col>
		</el-row>

		<AddPcustomer ref="petEditDialogRef" :title="editPetTitle" @reloadTable="handleQuery" />
		<EditDialogNew ref="editDialogNewRef" title="登记会员" @reloadTable="handleNewAddSuccess"></EditDialogNew>
	</div>
</template>

<script lang="ts" setup name="medicalManagement">
import { defineAsyncComponent, ref } from 'vue';
import { debounceRef } from '/@/utils/debounceRef';
import { getAPI } from '/@/utils/axios-utils';
import medicalPcustomer from './component/medicalPcustomer.vue';
import medicalDetails from './component/medicalDetails.vue';

const { dateEntityFormatYMD, scale2Format } = commonFunction();
import { PcustomerApi } from '/@/api-services/api';
import commonFunction from '/@/utils/commonFunction';

//新增会员
const AddPcustomer = defineAsyncComponent(() => import('/@/views/customers/customer/component/editDialog.vue'));
//新增会员
const EditDialogNew = defineAsyncComponent(() => import('/@/views/customers/customer/component/editDialogNew.vue'));


const refmedicalPcustomer = ref();
const pcuParams = ref<number>(0);
const loading = ref(false);
const options = ref<any>([]);
const petEditDialogRef = ref();
const editDialogNewRef = ref();
const editPetTitle = ref('新增会员');
// const editDialogRef = ref();
const queryParams = debounceRef({ type: 1, parmarm: '' }, 5000);

const remoteMethod = async (query: string) => {
	if (query) {
		queryParams.value.parmarm = query;
		loading.value = true;
		await getAPI(PcustomerApi)
			.apiPcustomerGetMedicalCustometPetsPost(queryParams.value)
			.then((r) => {
				options.value = r.data.result;
			})
			.finally(() => {
				loading.value = false;
			});
	} else {
		options.value = [];
	}
};

const handleQuery = async (row: any) => {
	await refmedicalPcustomer.value.initData(row.id);
};

//添加会员
const addPcustomer = async () => {
	//petEditDialogRef.value?.openDialog({ sourceid: '1', sex: '-1' });
	editDialogNewRef.value?.openDialog({ sourceid: '1', sex: '-1' });
};

const pcuChange = async (val: any) => {
	queryParams.value.parmarm = '';
	pcuParams.value = val;
	await refmedicalPcustomer.value.initData(val);
};
const selectPcu = async (row: any) => {
	await refmedicalPcustomer.value.initData(row.pcustomerId);
};
const InitScattered = async () => {
	await refmedicalPcustomer.value.InitScattered();
};
const errorHandler = async () => {
	return false;
};
const handleNewAddSuccess = async (pcustomer: any) => {
	await refmedicalPcustomer.value.initData(pcustomer.id);
};
</script>

<style lang="scss" scoped>
.medical-container {
	.custom-select {
		width: 450px !important;
	}
	.el-card__body {
		.el-row {
			height: 100% !important;
		}
	}

	:deep(.el-select__tags, .el-input, .el-select__input) {
		max-width: 380px !important;
		width: 100% !important;
	}

	:deep(.el-select-dropdown__item) {
		line-height: 24px !important;
	}

	:deep(.el-select-dropdown__wrap) {
		max-height: 60% !important;
	}

	:deep(.el-carousel__button) {
		background-color: #1d8ce0 !important;
	}
}
</style>
