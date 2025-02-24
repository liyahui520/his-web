<template>
	<div class="inHospital-dailyView">
		<el-dialog v-model="isShowDialog" :title="inHospitalTypeValue == 0 ? '住院日常' : '留观日常'" width="50%" draggable :close-on-click-modal="false">
			<template #header>
				<div style="color: #fff">
					<el-icon size="16" style="margin-right: 3px; display: inline; vertical-align: middle"> <ele-Edit /> </el-icon>
					<span>{{ inHospitalTypeValue == 0 ? '住院日常' : '留观日常' }}</span>
				</div>
			</template>

			<el-card shadow="never" style="height: 500px" :body-style="{ padding: 0 }">
				<el-button type="primary" style="margin: 0px 0px 10px 0px" @click="openDailys">添加日常</el-button>
				<el-table :data="tableData" style="height: 450px" v-loading="loading" tooltip-effect="light" row-key="id" border>
					<el-table-column type="index" label="序号" width="55" align="center" fixed="" />
					<el-table-column prop="content" label="内容" align="left" show-overflow-tooltip="" />
					<el-table-column label="图片" align="left">
						<template #default="scope">
							<div v-if="scope.row.dailyImages.length > 0">
								<el-image
									v-for="(imgItem, index) in scope.row.dailyImages"
									:key="index"
									style="width: 50px; height: 50px; margin-right: 10px"
									:src="imgItem.fileUrl"
									:zoom-rate="1.2"
									:max-scale="7"
									:min-scale="0.2"
									:preview-src-list="scope.row.imageUrl"
									:initial-index="index"
									fit="cover"
									:preview-teleported="true"
								/>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" width="150" align="center">
						<template #default="scope">
							{{ scope.row.createTime }}
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" show-overflow-tooltip="">
						<template #default="scope">
							<el-button v-if="scope.row.payStatus == null" icon="ele-Delete" size="small" text="" type="danger" @click="delInHospitalDailys(scope.row)"> 删除 </el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submit" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
		<addDailys ref="addDailysRef" @reloadTable="selectCallBack"></addDailys>
	</div>
</template>

<script lang="ts" setup name="inHospital-dailyView">
import { ref, onMounted } from 'vue';
import { getAPI } from '/@/utils/axios-utils';
import { InHospitalApi } from '/@/api-services';
import addDailys from './addDailys.vue';
import { ElMessageBox, ElMessage } from 'element-plus';

const isShowDialog = ref<any>(false);
const tableData = ref<any>([]);
const loading = ref<any>(false);
const currentRowInfo = ref<any>({});
const addDailysRef = ref();
const inHospitalTypeValue = ref<any>(0);
/**
 * 打开页面
 * @param row 当前行数据
 */
const openDialog = async (row: any, inHospitalType: number) => {
	isShowDialog.value = true;
	currentRowInfo.value = row;
	inHospitalTypeValue.value = inHospitalType;
	await loadDailysData();
};
/**
 * 删除日常
 */
const delInHospitalDailys = async (row: any) => {
	ElMessageBox.confirm('确认要删除此日常项目吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await getAPI(InHospitalApi)
				.apiInHospitalDeleteInHospitalsDailysPost({ id: row.id, customerId: currentRowInfo.value.customerId, dailyVer: row.ver })
				.then(async (res) => {
					ElMessage.success('删除成功');
					await loadDailysData();
				});
		})
		.catch(() => {});
};
/**
 * 添加日常
 */
const openDailys = () => {
	addDailysRef.value.openDialog({
		inHospitalId: currentRowInfo.value.id,
		content: '',
		remark: '',
		id: 0,
		imagesUrlArrays: [],
		customerid: currentRowInfo.value.customerId,
		customerName: currentRowInfo.value.customerName,
		petId: currentRowInfo.value.petId,
		petName: currentRowInfo.value.petName,
	});
};

/**
 * 选择日常以后的回调
 */
const selectCallBack = async () => {
	await loadDailysData();
};

/**
 * 加载日常数据
 */
const loadDailysData = async () => {
	loading.value = true;
	await getAPI(InHospitalApi)
		.apiInHospitalGetInHospitalsDailysPost({ id: currentRowInfo.value.id, customerId: currentRowInfo.value.customerId })
		.then((res) => {
			tableData.value = res.data?.result ?? [];
			tableData.value.forEach((item: any) => {
				item.imageUrl = item.dailyImages?.map((m) => m.fileUrl);
			});
			loading.value = false;
		});
	loading.value = false;
};

const submit = () => {
	isShowDialog.value = false;
};

// 页面加载时
onMounted(async () => {});
//将属性或者函数暴露给父组件
defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.inHospital-dailyView {
	:deep(.el-dialog__footer) {
		padding-top: 0px !important;
	}
}
</style>
