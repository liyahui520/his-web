<template>
    <div style="height: 100%">

        <el-card shadow="never"
            style="border-radius: 5px;max-height: 150px;height: 25%;min-height: 150px;text-align: left;line-height: 50px;border: 0"
            :body-style="{ padding: '10px', height: '150px' }" v-loading="pculoding">

            <el-row :gutter="0" style="height: 35px">
                <el-col :span="4">
                    <el-text truncated>会员名称：{{ pcustomerDetail.name }}
                    </el-text>
                </el-col>
                <el-col :span="7">
                    <el-text truncated>会员级别：
                        <el-tag class="mx-1" type="success" effect="light">{{ pcustomerDetail.levelText ?? '-' }}
                        </el-tag>
                    </el-text>
                </el-col>
                <el-col :span="6" v-show="!pcustomerDetail.isScattered">
                    <el-text truncated :tag="pcustomerDetail.isScattered ? 'del' : 'p'">储值卡余额：
                        <el-link style="line-height: 16px;font-size: 16px" @click="openCardDetails"
                            v-if="pcustomerDetail.isCard">{{ verifyNumberComma(pcustomerDetail.cardAmount?.toFixed(2) ||
                            '0.00') }}</el-link>
                        <span v-else><el-button type="primary" size="small" @click="addNewCard">新开卡</el-button></span>
                    </el-text>
                </el-col>
                <el-col :span="7" v-show="!pcustomerDetail.isScattered">
                    <el-text truncated :tag="pcustomerDetail.isScattered ? 'del' : 'p'">押金余额：
                        <el-link style="line-height: 16px;font-size: 16px" @click="openDepositDetails">{{
                            verifyNumberComma(pcustomerDetail.depositAmount?.toFixed(2) || '0.00') }}</el-link>
                    </el-text>
                </el-col>
            </el-row>
            <el-row :gutter="0" style="height: 35px">
                <el-col :span="4">
                    <el-text truncated>性 别：{{ pcustomerDetail.sexText ?? '-' }}</el-text>
                </el-col>
                <el-col :span="7">
                    <el-text truncated>会员编号：
                        <el-tag class="mx-1" type="danger" effect="light">{{ pcustomerDetail.cardNumber ?? '-' }}
                        </el-tag>
                    </el-text>
                </el-col>
                <el-col :span="6" v-show="!pcustomerDetail.isScattered">
                    <el-text truncated :tag="pcustomerDetail.isScattered ? 'del' : 'p'">次卡余次：
                        <el-link style="line-height: 16px;" @click="openSecondaryCardDetails">{{
                            pcustomerDetail.secondaryCardBalance || '0' }}</el-link>
                    </el-text>
                </el-col>
                <el-col :span="7">
                    <el-text truncated>
                        总消费：<span style="font-size: 16px;"
                            :title="pcustomerDetail.totalConsumptionAmount">{{ verifyNumberComma(pcustomerDetail.totalConsumptionAmount?.toFixed(2) || '0.00') }}</span>
                    </el-text>
                </el-col>
            </el-row>
            <el-row :gutter="0" style="height: 28px">
                <el-col :span="11">
                    <el-text truncated>手 机 号：{{ pcustomerDetail.cellPhone ?? '-' }}</el-text>
                </el-col>
                <el-col :span="7" style="font-weight: bold;">
                    <el-text truncated>
                        待付款：
                        <el-text style="font-size: 16px;line-height: 20px" type="danger">{{
                                verifyNumberComma(pcustomerDetail.willPayAmount?.toFixed(2) || '0.00') }}</el-text>
                    </el-text>
                </el-col>
            </el-row>
            <span style="margin-right: 12px;line-height: 12px;"><el-link icon="ele-Plus" size="small" type="primary"
                    @click="AddPetDialog">添加宠物</el-link></span>
            <span style="margin-right: 12px;line-height: 12px"><el-link icon="ele-Edit" size="small" type="primary"
                    @click="openEditPcustomer" :disabled="pcustomerDetail.isScattered">编辑会员</el-link>
                <!--                <el-button icon="ele-Edit" size="small" text="编辑" content="编辑" type="primary" title="编辑" >编辑</el-button>-->
            </span>
        </el-card>
        <el-card shadow="never" style="overflow:auto;border-radius: 5px;margin-top: 10px;"
            :style="iswindow ? 'height: calc(100vh - 260px)' : 'height: calc(100vh - 350px)'"
            :body-style="{ padding: '10px', border: '1' }" v-loading="petloading">
            <span :style="'float: left;margin-right: 10px;margin-bottom: 10px;'" :key="item.id"
                v-for="item in getPPets">
                <CardPet :pet="item" @petsReload="petsReload" @reloadTable="pcustomerInitData" :pcustomer="pcustomerDetail" />
            </span>
        </el-card>

        <EditPet ref="editPetDialogRef" :title="editPetTitle" @reloadTable="petInitData" />
        <editDialog ref="editDialogRef" :title="editPcustomerTitle" @reloadTable="pcustomerInitData" />
        <!-- <PcuAccountDetail ref="pcuAccountDetailRef" :title="pcuAccountDetailTitle" @reloadTable="pcustomerInitData" /> -->
        <AddNewCard ref="addNewCardRef" :title="'新开会员卡'" :pcustomer="pcustomerDetail"
            @reloadTable="pcustomerInitData" />
        <StoredCard ref="storedCardRef" :title="'会员卡明细'" :pcustomer="pcustomerDetail" :cardId="pcustomerDetail.cardId"
            @reloadTable="pcustomerInitData" />
        <DepositsView ref="depositsViewRef" :title="'押金明细'" :pcustomer="pcustomerDetail"
            @reloadTable="pcustomerInitData" />
        <SecondaryCardsView ref="secondaryCardsViewRef" :title="'次卡明细'" :pcustomer="pcustomerDetail" />
    </div>
</template>

<script lang="ts" setup name="medicalManagement">
import { ref, onMounted, defineAsyncComponent } from "vue";
import { getAPI } from '/@/utils/axios-utils';
import { PcustomerApi, PPetsApi } from '/@/api-services/api';
import editDialog from '/@/views/main/pcustomer/component/editDialog.vue'
import EditPet from '/@/views/main/ppets/component/editDialog.vue'
import CardPet from './medicalPet.vue'
import {
    verifyNumberComma
} from '/@/utils/toolsValidate';
// import commonFunction from "/@/utils/commonFunction";
import { storeToRefs } from "pinia";
import { useTagsViewRoutes } from "/@/stores/tagsViewRoutes";
import { ElMessage } from "element-plus";



// const PcuAccountDetail = defineAsyncComponent(() => import('./pcuAccountDetail.vue'));
const AddNewCard = defineAsyncComponent(() => import('/@/components/cards/addCard.vue'));
const StoredCard = defineAsyncComponent(() => import('/@/components/cards/storedCard.vue'));
const DepositsView = defineAsyncComponent(() => import('/@/components/deposits/view.vue'));
const SecondaryCardsView = defineAsyncComponent(() => import('/@/components/secondaryCards/view.vue'));
// 定义变量内容
const stores = useTagsViewRoutes();
const { isTagsViewCurrenFull, iswindow } = storeToRefs(stores);


const getPPets = ref<any>([]);
const pcustomerDetail = ref<any>({});
const editDialogRef = ref();
const editPetDialogRef = ref();
const petloading = ref(false)
const pculoding = ref(false);
const editPcustomerTitle = ref("");
const editPetTitle = ref("");
const pcuAccountDetailRef = ref();
// const pcuAccountDetailTitle = ref("账户明细");
const addNewCardRef = ref();
const storedCardRef = ref();
const depositsViewRef = ref();
const secondaryCardsViewRef = ref();
// const { dateEntityFormatYMD, scale2Format, twoFloorNum } = commonFunction();
const style = "'overflow:auto;border-radius: 15px;margin-top: 5px;height: " + (document.documentElement.clientHeight - 195) / document.documentElement.clientHeight * 100 + "%;min-width: 300px;'"
const initData = async (val: any) => {
    petloading.value = true;
    pculoding.value = true;
    getPPets.value = await getPetsListView(val);
    pcustomerDetail.value = await getPcustomerDetail(val);
}
const pcustomerInitData = async () => {
    pculoding.value = true;
    pcustomerDetail.value = await getPcustomerDetail(pcustomerDetail.value.id);
}

const petInitData = async () => {
    petloading.value = true;
    getPPets.value = await getPetsListView(pcustomerDetail.value.id);
}

// 打开编辑页面
const openEditPcustomer = () => {
    editPcustomerTitle.value = '编辑会员';
    editDialogRef.value.openDialog(pcustomerDetail.value);
};

/**
 * 打开会员卡明细
 */
const openCardDetails = async () => {

    storedCardRef.value.openDialog();
}
/**
 * 打开押金明细
 */
const openDepositDetails = async () => {
    depositsViewRef.value.openDialog();
}
/**
 * 打开次卡明细
 */
 const openSecondaryCardDetails = async () => {
    if(getPPets.value.length==0){
        ElMessage.warning('请先添加宠物');
        return;
    }
    secondaryCardsViewRef.value.openDialog(getPPets.value[0]);
}
/**
 * 新增宠物
 * @constructor
 */
const AddPetDialog = async () => {
    editPetTitle.value = '修改宠物';
    editPetDialogRef.value?.openDialog({
        petGender: '-1',
        petWeight: 0.1,
        petIsVaccinated: -1,
        petIsDeworming: -1,
        petStatus: '1',
        petIsSterilization: -1,
        petBlood: '-1',
        customerId: pcustomerDetail.value.id
    });
}

/**
 * 获取宠物
 * @param val
 */
const getPetsListView = async (val: any) => {
    let list = await getAPI(PPetsApi).apiPPetsInfoDetailByCustomeridGet(val);

    petloading.value = false;
    return list.data.result ?? [];
};

/**
 * 获取单个会员信息
 * @param id
 */
const getPcustomerDetail = async (id: any) => {
    let list = await getAPI(PcustomerApi).apiPcustomerIdGetDetailGet(id);
    pculoding.value = false;
    return list.data.result ?? {};
}
/**
 * 获取散客信息
 * @param id
 */
const getScatteredPcustomerDetail = async () => {
    let list = await getAPI(PcustomerApi).apiPcustomerGetScatteredDetailGet();
    pculoding.value = false;
    return list.data.result ?? {};
}

/**
 * 刷新宠物列表
 */
const petsReload = async () => {
    petloading.value = true;
    getPPets.value = await getPetsListView(pcustomerDetail.value.id);
}

/**
 * 初始化散客信息
 * @constructor
 */
const InitScattered = async () => {
    petloading.value = true;
    pculoding.value = true;
    pcustomerDetail.value = await getScatteredPcustomerDetail();
    getPPets.value = await getPetsListView(pcustomerDetail.value.id);
}

// /**
//  * 查看账户明细
//  */
// const openAccountDetails = async () => {
//     pcuAccountDetailRef.value?.openDialog(pcustomerDetail.value.id);
// }

/**
 * 新开会员卡
 */
const addNewCard = async () => {
    addNewCardRef.value.openDialog();
}

// 页面加载时
onMounted(async () => {
    await InitScattered();
});

defineExpose({ initData, InitScattered });
</script>

<style scoped>
.el-card__body {
    height: 100%;
}

.el-link .el-icon--right.el-icon {
    vertical-align: text-bottom;
}
</style>