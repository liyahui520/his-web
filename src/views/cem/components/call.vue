<template>
	<div class="payment-methods-container">
		<el-drawer v-model="isShowDrawer" title="叫号" size="40%" :direction="'rtl'">
			<template #header>
				<h4 class="title">叫号</h4>
			</template>
			<template #default>
				<el-card shadow="never" :body-style="{ paddingBottom: '0' }">
					<el-form :model="queryParams" ref="queryForm" :inline="true">
						<el-form-item label="诊室">
							<el-select v-model="queryParams.roomId" placeholder="请选择诊室" @change="handleQuery">
								<el-option v-for="item in roomData" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" icon="ele-ArrowRight" :disabled="tableData.length <= 0 || loading" @click="callNumber"> 叫号 </el-button>
							<el-button type="warning" icon="ele-DArrowRight" :disabled="tableData.length <= 1 || loading" @click="skipCallNumber"> 跳过当前 </el-button>
						</el-form-item>
					</el-form>
					<el-text type="success" size="large" tag="b">当前呼叫：{{callText}}</el-text>
				</el-card>
				<el-card shadow="never" style="overflow: auto; margin-top: 8px">
					<el-table :data="tableData" v-loading="loading" tooltip-effect="light" row-key="id" border>
						<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
						<el-table-column prop="customerName" label="会员名称" align="center" show-overflow-tooltip="" />
						<el-table-column prop="petName" label="宠物名称" align="center" show-overflow-tooltip="" />
						<el-table-column prop="petKindText" label="宠物种类" align="center" show-overflow-tooltip="" />
						<el-table-column prop="roomName" label="诊室" align="center" show-overflow-tooltip="" />
						<el-table-column prop="callNumber" label="排队编号" align="center" show-overflow-tooltip="" />
					</el-table>
				</el-card>
			</template>
		</el-drawer>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { CallNumberApi } from '/@/api-services';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';

const stores = useUserInfo();
const { userInfos } = storeToRefs(stores);
const isShowDrawer = ref(false);
const loading = ref(false);
const queryParams = ref<any>({
	page: 1,
	pageSize: 500,
	total: 0,
});
const callText= ref('');
const tableData = ref<any>([]);
const roomData = ref<any>([]);
// 打开弹窗
const openDrawer = async () => {
	await loadCallRoom();
	tableData.value = [];
	isShowDrawer.value = true;
	handleQuery();
};
/**
 * 加载诊室
 */
const loadCallRoom = async () => {
	let res = await getAPI(CallNumberApi).apiCallNumberGetCallRoomUseListGet();
	roomData.value = res.data.result ?? [];
	if (roomData.value.length > 0) {
		if (localStorage.getItem(`callRoomId_${userInfos.value.id}`)) {
			queryParams.value.roomId = localStorage.getItem(`callRoomId_${userInfos.value.id}`);
		} else {
			queryParams.value.roomId = roomData.value[0].id;
		}
	}
};
/**
 * 查询待叫号列表
 */
const handleQuery = async () => {
	loading.value = true;
	if (queryParams.value.roomId) {
		localStorage.setItem(`callRoomId_${userInfos.value.id}`, queryParams.value.roomId);
	}
	await getAPI(CallNumberApi)
		.apiCallNumberGetRegUserListPost(queryParams.value)
		.then((res) => {
			tableData.value = res.data.result?.items ?? [];
		})
		.finally(() => {
			loading.value = false;
		});
};
/**
 * 下一个
 */
const callNumber = async () => {
	if (tableData.value.length > 0) {
		loading.value = true;
		let row = tableData.value[0];
		callText.value = `排队编号：${row.callNumber}，宠物：${row.petName}`;
		await getAPI(CallNumberApi)
			.apiCallNumberCallNumberPost({
				regId: row.id,
				id: row.roomId,
				callNumber: row.callNumber,
				customerId: row.customerId,
				customerName: row.customerName,
				petId: row.petId,
				petName: row.petName,
				roomName: row.roomName,
				isRepeat: false,
				isSkip: false,
				nextCall: tableData.value.length > 1 ? tableData.value[1] : null,
			})
			.finally(() => {
				loading.value = false;
			});
	}
};
/**
 * 跳过当前
 */
const skipCallNumber = async () => {
	if (tableData.value.length > 1) {
		loading.value = true;
		let row = tableData.value[1];
		callText.value = `排队编号：${row.callNumber}，宠物：${row.petName}`;
		await getAPI(CallNumberApi)
			.apiCallNumberCallNumberPost({
				regId: row.id,
				id: row.roomId,
				callNumber: row.callNumber,
				customerId: row.customerId,
				customerName: row.customerName,
				petId: row.petId,
				petName: row.petName,
				roomName: row.roomName,
				isRepeat: false,
				nextCall: tableData.value.length > 2 ? tableData.value[2] : null,
				isSkip: true,
				skipCall: {
					regId: tableData.value[0].id,
					id: tableData.value[0].roomId,
					callNumber: tableData.value[0].callNumber,
					customerId: tableData.value[0].customerId,
					customerName: tableData.value[0].customerName,
					petId: tableData.value[0].petId,
					petName: tableData.value[0].petName,
					roomName: tableData.value[0].roomName,
				},
			})
			.finally(() => {
				loading.value = false;
			});
		handleQuery();
	}
};

//将属性或者函数暴露给父组件
defineExpose({ openDrawer });
</script>

<style scoped lang="scss"></style>
