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
							<el-input style="width: 340px" v-model="serverform.machineId" placeholder="请输入授权码" />
							<el-button type="primary" style="margin-left: 10px;" @click="btnCon">测试连接</el-button>
						</el-form-item>
						<el-form-item label="病例打印机">
							<el-select placeholder="请选择病例打印机" style="width: 240px" v-model="serverform.A4Device">
								<el-option v-for="item in printDevies" :key="item.name" :label="item.name"
									:value="item.name" />
							</el-select>
							<el-input v-model="serverform.pageCount" type="number" min="1"
								style="max-width: 150px;margin-left: 10px;">
								<template #append>份数</template>
							</el-input>
						</el-form-item>
						<el-form-item label="小票打印机">
							<el-select placeholder="请选择小票打印机" style="width: 240px">
								<el-option v-for="item in printDevies" :key="item.name" :label="item.name"
									:value="item.name" />
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="info">{{ '取消修改' }}</el-button>
							<el-button type="primary">保 存</el-button>
						</el-form-item>
					</el-form>
				</el-row>
			</span>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { auth } from '/@/utils/authFunction';
import { getAPI } from '/@/utils/axios-utils';
import { clone, isObjectValueEqual } from '/@/utils/arrayOperation';
import { PcuPetConfigApi, MemberLevelApi } from '/@/api-services/api';
import { formatDate } from '/@/utils/formatTime';
import { getDictDataList } from '/@/utils/dict-utils';
import { autoConnect, disAutoConnect, hiprint, defaultElementTypeProvider } from 'vue-plugin-hiprint-signalr'

const serverform = ref({
	machineId: '',
	A4Device: '',
	pageCount: 1, // 打印份数
});

const printDevies = ref([]); // 打印机列表

const btnCon = async () => {
	if (serverform.value.machineId) {
		hiprint.hiwebSocket.getPrintById(serverform.value.machineId);
		hiprint.refreshPrinterList(res => { printDevies.value = res; })
	}
	else {
		ElMessageBox.alert('请输入授权码', '提示', {
			type: 'warning',
			showClose: false,
			showCancelButton: false,
			confirmButtonText: '确定',
		});
	}
}

// 页面加载时
onMounted(async () => {
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
