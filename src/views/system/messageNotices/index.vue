<template>
	<div class="message-notices-container">
		<el-tabs v-model="activeName"  type="border-card" style="height: 100%; border-radius: 5px; overflow: auto; border: 0">
			<el-tab-pane label="短信发送" name="sendMessage">
				<sendMessage v-if="activeName === 'sendMessage'" ref="sendMessageRef"></sendMessage>
			</el-tab-pane>
			<el-tab-pane label="自定义发送" name="sendCustom">
				<sendCustom v-if="activeName === 'sendCustom'" ref="sendCustomRef"></sendCustom>
			</el-tab-pane>
			<el-tab-pane label="已发短信" name="sendNotice">
				<sendNotice v-if="activeName === 'sendNotice'" ref="sendNoticeRef"></sendNotice>
			</el-tab-pane>
			<!-- <el-tab-pane label="短信充值" name="smsRecharge">
				<smsRecharge v-if="activeName === 'smsRecharge'" ref="smsRechargeRef"></smsRecharge>
			</el-tab-pane> -->
		</el-tabs>
	</div>
</template>

<script lang="ts" setup name="inHospital">
import { ref, onMounted ,defineAsyncComponent} from 'vue';

const sendCustom = defineAsyncComponent(() => import('./component/sendCustom.vue'));
const sendMessage = defineAsyncComponent(() => import('./component/sendMessage.vue'));
const sendNotice = defineAsyncComponent(() => import('./component/sendNotice.vue'));
const smsRecharge = defineAsyncComponent(() => import('./component/smsRecharge.vue'));
const activeName = ref('sendMessage');

const sendCustomRef= ref();
const sendMessageRef= ref();
const sendNoticeRef= ref();
const smsRechargeRef= ref();

// 页面加载时
onMounted(async () => {});
</script>

<style lang="scss" scoped>
.message-notices-container {
	// :deep(.el-tabs__nav) {
	// 	border: 0px;
	// 	margin-left: 10px;
	// }
	// :deep(.el-tabs__item) {
	// 	margin: 0px 10px !important;
	// 	margin-left: 20px;
	// 	background-color: var(--next-color-white) !important;
	// 	border-radius: 10px 10px 0 0;
	// }
	// :deep(.el-tabs--top .el-tabs__item.is-top:nth-child(2)) {
	// 	padding-left: 20px !important;
	// }
	// :deep(.el-tabs--top .el-tabs__item.is-top:last-child) {
	// 	padding-right: 20px !important;
	// }
	// :deep(.el-tabs__header) {
	// 	margin: 0;
	// }
	// :deep(.layout-parent > div:first-child .full-table .el-card__body) {
	// 	display: none !important;
	// }
	:deep(.el-tabs--border-card > .el-tabs__header) {
		background-color: var(--next-bg-menuBarActiveColor) !important;
		padding: 0 !important;
	}
	:deep(.el-tabs) {
		.el-tabs__content {
			background-color: var(--next-bg-main-color) !important;
			padding: 0px !important;
		}
	}
}
</style>
