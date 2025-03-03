<template>
	<el-drawer v-model="drawerShow" :direction="'rtl'" class="ppet-details-container" size="50%">
        <template #header>
      <h4>宠物信息</h4>
    </template>
    <template #default>
        <div style="padding: 10px;">
		<el-card shadow="never" :body-style="{ padding: '0px' }">
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
					<el-input v-model="filterValue" placeholder="请输入宠物名称\种类\品种" @input="filterPet">
						<template #append>
							<el-button :icon="Search" />
						</template>
					</el-input>
				</el-col>
			</el-row>
		</el-card>
		<el-card shadow="never" style=" overflow: auto" :body-style="{padding:0}" v-loading="petLoading">
			<el-scrollbar height="calc(100vh - 225px)"> 
                    <span style="float: left; margin: 10px;width: 380px;">
                    <CardAdd @AddPetDialog="AddPetDialog" />
                    </span>
                    <span style="float: left; margin: 10px;width: 380px;" :key="item.id" v-for="item in getPPets">
                        <CardPet :pet="item" @petsReload="initData" />
                    </span> 
            </el-scrollbar>

		</el-card>
		<EditPet ref="editDialogRef" :title="editPetTitle" @reloadTable="initPcustomer" />
        </div>
        </template>
		<!-- <template #footer>
      <el-button @click="drawerShow = false">关闭</el-button>
    </template> -->
	</el-drawer>
</template>

<script lang="ts" setup name="detailNo">
import { ref, onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { PcustomerApi, PPetsApi, MemberLevelApi } from '/@/api-services/api';
import router from '/@/router';
import { getDictDataList } from '/@/api/system/admin';
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
const filterValue = ref('');
const drawerShow = ref(false);
const pets = ref();
const petLoading = ref(false);

const initPcustomer = async (pcustomerId) => {
	 await initData({id:pcustomerId});
};

//初始化
const initData = async (row) => {
	// if (!router.currentRoute.value.query.id) return; 
    petLoading.value = true;
	const res = await getAPI(PcustomerApi).apiPcustomerIdGetGet(row.id);
	getSingCustomer.value = res.data?.result ?? [];

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
    pets.value =await getPetsListView(row.id);
	getPPets.value = await getPetsListView(row.id);
    petLoading.value = false;
};

// 打开弹窗
const openDialog = async (row: any) => {
    drawerShow.value = true;
    await initData(row);

}

const getDictDataDropdownList = async (val: any) => {
	let list = await getDictDataList(val);
	return list.data.result ?? [];
};
const errorHandler = async () => {
	return false;
};

const filterPet = async (val: any) => { 
	getPPets.value=pets.value.filter((obj) => {
		if (obj.petName.includes(val)) {
			return obj;
		}if (obj.petRecordNumber.includes(val)) {
			return obj;
		}
	}); 
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
});

//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style scoped>
.el-breadcrumb__item {
	height: 40px;
}
</style>
