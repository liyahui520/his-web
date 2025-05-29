<template>
	<div class="printConfig-container">
		<el-card shadow="never" style="overflow: auto">
			<template #header>打印机参数 </template>
			<span>
				<el-row :gutter="20" style="align-items: center">
					<el-divider direction="vertical" style="font-weight: 800; border: 2px solid var(--el-color-primary)" />
					<el-text class="w-150px mb-2" truncated>远程打印机设置 </el-text>
				</el-row>
				<el-text class="w-150px mb-2" style="margin-left: 20px; font-size: 12px; color: #666666; line-height: 30px" truncated
					>先启动本地<el-button key="primary" type="primary" link>打印机服务</el-button>
					，然后在服务中添加远程打印机。
				</el-text>
				<el-row :gutter="20" style="padding: 0px 40px 0px">
					<el-form :inline="true" :model="serverform" label-width="auto">
						<el-form-item label="授权码">
							<el-input style="width: 340px" v-model="serverform.machineId" placeholder="请输入授权码" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" >测试连接</el-button>
						</el-form-item>
					</el-form>
				</el-row>  
					<el-row :gutter="20" style="padding: 0px 40px 0px">
					<el-form :inline="true" :model="serverform" label-width="auto">
						<el-form-item label="授权码">
							<el-input style="width: 340px" v-model="serverform.machineId" placeholder="请输入授权码" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" >测试连接</el-button>
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
 
const serverform = ref({
	machineId: '',
});
 
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
