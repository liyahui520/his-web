<template>
	<div class="printConfig-container">
		<el-card shadow="never" style="overflow: auto">
			<template #header>打印机参数 </template>
			<span>
				<el-row :gutter="20" style="align-items: center">
					<el-divider direction="vertical"
						style="font-weight: 800; border: 2px solid var(--el-color-primary)" />
					<el-text class="w-150px mb-2" truncated>远程打印机设置 </el-text>
				</el-row>
				<el-text class="w-150px mb-2"
					style="margin-left: 20px; font-size: 12px; color: #666666; line-height: 30px"
					truncated>先启动本地<el-button key="primary" type="primary" link>打印机服务</el-button>
					，然后在服务中添加远程打印机。
				</el-text>
				<el-row :gutter="10" style="padding: 0px 40px 0px">
					<el-form :model="serverform" label-width="auto">
						<el-form-item label="授权码">
							<el-input style="width: 340px" :disabled="isEnabled" v-model="printConfig.app.machineId"
								placeholder="请输入授权码" />
							<el-button type="primary" style="margin-left: 10px" @click="btnCon">测试连接</el-button>
						</el-form-item>
						<el-form-item :label="item.printType === 0 ? '病例打印' : '小票打印'"
							v-for="item in printConfig.appSettings">
							<el-select :placeholder="item.printType === 0 ? '请选择病例打印' : '请选择小票打印'" style="width: 240px"
								:disabled="isEnabled" v-model="item.printName">
								<el-option v-for="item in printDevies" :key="item.name" :label="item.name"
									:value="item.name" />
							</el-select>
							<el-input v-model="item.printPage" type="number" min="1" v-if="item.printType === 0"
								:disabled="isEnabled" style="max-width: 150px;margin-left: 10px;">
								<template #append>份数</template>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="info" v-if="isEnabled" @click="edit">{{ '编辑' }}</el-button>
							<el-button type="info" v-if="!isEnabled" @click="cancel">{{ '取消修改' }}</el-button>
							<el-button type="primary" v-if="!isEnabled" @click="save">保 存</el-button>
						</el-form-item>
					</el-form>
				</el-row>
			</span>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox } from 'element-plus';
import { hiprint } from 'vue-plugin-hiprint-signalr';
import { getAPI } from '/@/utils/axios-utils';
import { PrintSettingApi } from '/@/api-services/api';

const isEnabled = ref(true); // 是否启用打印机服务

const serverform = ref({
	machineId: '',
	A4Device: '',
	pageCount: 1, // 打印份数
});

const printConfig = ref({
	app: {
		machineId: '',
	},
	appSettings: [
		{
			printType: 0, // 病例打印
			printName: '',
		},
		{
			printType: 1, // 小票打印
			printName: '',
		},
	],
});

const printDevies = ref<any>([]); // 打印机列表

const btnCon = async () => {
	if (printConfig.value.app.machineId) {
		await getPrint(printConfig.value.app.machineId);
	} else {
		ElMessageBox.alert('请输入授权码', '提示', {
			type: 'warning',
			showClose: false,
			showCancelButton: false,
			confirmButtonText: '确定',
		});
	}
};

const getPrint = async (machineId: string) => {
	if (machineId) {
		// 获取打印机列表
		hiprint.hiwebSocket.getPrintById(machineId);
		hiprint.refreshPrinterList((res: any) => {
			printDevies.value = res;
			getAPI(PrintSettingApi).sernumberNoGetPrintConnectionIdGet(machineId).then((res: any) => {
				printConfig.value.app = res.data.result ?? {};
			});
		});
	}
};

const init = async () => {
	// 获取打印机配置
	await getAPI(PrintSettingApi).getPrintSettingConfigGet().then(async (res: any) => {
		printConfig.value = res.data.result ?? {};
		await getPrint(printConfig.value.app.machineId);
	});
};

const edit = () => {
	isEnabled.value = !isEnabled.value; // 切换编辑状态 
};

/**
 * 取消修改
 */
const cancel = async () => {
	isEnabled.value = true; // 取消修改后，重新启用编辑
	await init();
};

const save = async () => {
	// 保存打印机配置
	await getAPI(PrintSettingApi).printIdAddPrintSettingPost(printConfig.value.app.id, printConfig.value.appSettings).then((res: any) => {
		init();
		isEnabled.value = true; // 取消修改后，重新启用编辑
	});
};

// 页面加载时
onMounted(async () => {
	await init();
	// 获取打印机列表 
});
</script>
<style lang="scss" scoped>
.pcuPetConfig-container {
	.clearfix {
		display: flex;
		justify-content: space-between;
	}
}
</style>
