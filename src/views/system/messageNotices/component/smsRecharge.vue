<template>
	<div class="message-notices-sms-recharge-container">
		<el-card style="height: calc(100vh - 150px)">
			<el-empty :description="'建设中，敬请期待。'"></el-empty>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="inHospital">
import { ref, onMounted, defineAsyncComponent } from 'vue';

// 页面加载时
onMounted(async () => {});
</script>
