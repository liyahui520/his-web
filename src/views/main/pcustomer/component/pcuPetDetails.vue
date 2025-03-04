<template>
	<div class="ppet-details-container">
		<el-card shadow="never" :body-style="{ padding: '8px' }">
			<el-row :gutter="20" style="margin-bottom: 8px">
				<el-col :span="20">
					<el-breadcrumb separator="|">
						<el-breadcrumb-item>
							<el-avatar icon="el-icon-user-solid" :src="getSingCustomer.avatarUrl" @error="errorHandler">
								<img :src="getSingCustomer.avatarUrl" />
							</el-avatar>
						</el-breadcrumb-item>
						<el-breadcrumb-item>
							<el-link type="primary">{{ getSingCustomer.name ?? '-' }}</el-link>
						</el-breadcrumb-item>
						<el-breadcrumb-item>{{ getSingCustomer.cardNumber ?? '-' }}</el-breadcrumb-item>
						<el-breadcrumb-item>{{ getEditsexDataArr[getSingCustomer.sex] ?? '-' }}</el-breadcrumb-item>
						<el-breadcrumb-item>
							<el-tag>
								<el-icon>
									<ele-Phone />
								</el-icon>
								{{ getSingCustomer.cellPhone ?? '-' }}
							</el-tag>
						</el-breadcrumb-item>
						<el-breadcrumb-item>{{ getLevelDataArr[getSingCustomer.level] ?? '-' }}</el-breadcrumb-item>
						<el-breadcrumb-item>{{ getsourceidDataArr[getSingCustomer.sourceId] ?? '-' }} </el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
			</el-row>
		</el-card>
		<el-card shadow="never" style="margin-top: 10px; padding-bottom: 8px" :body-style="{ padding: '8px' }">
			<el-row :gutter="20">
				<el-col :span="20">
					<el-input placeholder="请输入宠物名称\种类\品种">
						<template #append>
							<el-button :icon="Search" />
						</template>
					</el-input>
				</el-col>
			</el-row>
		</el-card>
		<el-card shadow="never" style="height: 100%; overflow: auto">
			<span style="float: left; margin-right: 10px; margin-bottom: 10px">
				<CardAdd @AddPetDialog="AddPetDialog" />
			</span>
			<span style="float: left; margin-right: 10px; margin-bottom: 10px" :key="item.id" v-for="item in getPPets">
				<CardPet :pet="item" @petsReload="initData" />
			</span>
		</el-card>
		<EditPet ref="editDialogRef" :title="editPetTitle" @reloadTable="initData" />
	</div>
</template>

<script lang="ts" setup name="detailNo">
import { ref, onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { SysDictDataApi, PPetsApi, MemberLevelApi } from '/@/api-services/api';
import router from '/@/router';
import CardPet from '/@/views/main/ppets/component/cardPet.vue';
import CardAdd from '/@/views/main/ppets/component/cardAdd.vue';
import EditPet from '../../ppets/component/editDialog.vue';
import { Search } from '@element-plus/icons-vue';

const getSingCustomer = ref<any>({});
const getPPets = ref<any>([]);
const getlevelData = ref<any>([]);
const getsourceidData = ref<any>([]);
const getEditsexData = ref<any>([]);
const getEditsexDataArr = reactive<any>([]);
const getLevelDataArr = reactive<any>([]);
const getsourceidDataArr = reactive<any>([]);
const editDialogRef = ref();
const editPetTitle = ref('');

//初始化
const initData = async () => {
	// if (!router.currentRoute.value.query.id) return;

	// const res = await getAPI(PcustomerApi).apiPcustomerIdGetGet(router.currentRoute.value.query.id);
	// getSingCustomer.value = res.data?.result ?? [];

	await getAPI(MemberLevelApi)
		.apiMemberLevelListPost({})
		.then((resData) => {
			getlevelData.value = resData.data?.result ?? [];
			getlevelData.value.forEach((s) => {
				getLevelDataArr[s.id] = s.name;
			});
		});

	getsourceidData.value = await getDictDataDropdownList('code_customer_source');
	getsourceidData.value.forEach((s) => {
		getsourceidDataArr[s.code] = s.value;
	});
	getEditsexData.value = await getDictDataDropdownList('code_sex');
	getEditsexData.value.forEach((s) => {
		getEditsexDataArr[s.code] = s.value;
	});
	getPPets.value = await getPetsListView(router.currentRoute.value.query.id);
};
const getDictDataDropdownList = async (val: any) => {
	let list = await getAPI(SysDictDataApi).apiSysDictDataDataListCodeGet(val);
	return list.data.result ?? [];
};
const errorHandler = async () => {
	return false;
};



/**
 * 获取宠物
 * @param val
 */
const getPetsListView = async (val: any) => {
	let list = await getAPI(PPetsApi).apiPPetsInfoDetailByCustomeridGet(val);
	return list.data.result ?? [];
};

/**
 * 新增宠物
 * @constructor
 */
const AddPetDialog = async () => {
	editPetTitle.value = '修改宠物';
	editDialogRef.value?.openDialog({
		petGender: '-1',
		petWeight: 0.1,
		petIsVaccinated: -1,
		petIsDeworming: -1,
		petStatus: '1',
		petIsSterilization: -1,
		petBlood: '-1',
		customerId: router.currentRoute.value.query.id,
	});
};

// 页面加载时
onMounted(async () => {
	await initData();
});
</script>

<style scoped>
.el-breadcrumb__item {
	height: 40px;
}
</style>
