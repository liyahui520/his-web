<template>
	<div class="login-scan-container">
		<div ref="qrcodeRef">
      <el-image style="width: 260px;height: 260px" :src="qrImg">
        <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
		<div class="font12 mt20 login-msg">
			<i class="iconfont icon-saoyisao mr5"></i>
			<span>{{ $t('message.scan.text') }}</span>
		</div>
	</div>
</template>

<script setup lang="ts" name="loginScan">
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref, onMounted, nextTick } from 'vue';
import QRCode from 'qrcodejs2-fixes';
import {loginQr} from "/@/api/system/admin";
// 定义变量内容
const qrcodeRef = ref<HTMLElement | null>(null);
const qrImg = ref('');
// 初始化生成二维码
const initQrcode =async () => {

 let res=await loginQr();
 console.log(res)
 qrImg.value = res.data?.result ?? '';
	// nextTick(() => {
	// 	(<HTMLElement>qrcodeRef.value).innerHTML = '';
	// 	new QRCode(qrcodeRef.value, {
	// 		text: `https://gitee.com/zuohuaijun/Admin.NET`,
	// 		width: 260,
	// 		height: 260,
	// 		colorDark: '#000000',
	// 		colorLight: '#ffffff',
	// 	});
	// });
};
// 页面加载时
onMounted(() => {
	initQrcode();
});
</script>

<style scoped lang="scss">
.login-scan-animation {
	opacity: 0;
	animation-name: error-num;
	animation-duration: 0.5s;
	animation-fill-mode: forwards;
}
.login-scan-container {
	padding: 0 20px 20px;
	display: flex;
	flex-direction: column;
	text-align: center;
	@extend .login-scan-animation;
	animation-delay: 0.1s;
	:deep(img) {
		margin: auto;
	}
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
  }
	.login-msg {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--el-text-color-placeholder);
		@extend .login-scan-animation;
		animation-delay: 0.2s;
	}
}
</style>
