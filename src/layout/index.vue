<template>
	<component :is="layouts[themeConfig.layout]" />
</template>

<script setup lang="ts" name="layout">
import { onBeforeMount, onUnmounted, defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Local } from '/@/utils/storage';
import mittBus from '/@/utils/mitt';
import {autoConnect, disAutoConnect, hiprint, defaultElementTypeProvider} from 'vue-plugin-hiprint-signalr'
    import { ElMessageBox, ElMessage } from 'element-plus';
import { getToken } from '/@/utils/axios-utils';

     
// 引入组件
const layouts: any = {
	defaults: defineAsyncComponent(() => import('/@/layout/main/defaults.vue')),
	classic: defineAsyncComponent(() => import('/@/layout/main/classic.vue')),
	transverse: defineAsyncComponent(() => import('/@/layout/main/transverse.vue')),
	columns: defineAsyncComponent(() => import('/@/layout/main/columns.vue')),
};

// 定义变量内容
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

// 20240117 最大窗体宽度
let maxClientWidth = document.body.clientWidth;

// 窗口大小改变时(适配移动端)
const onLayoutResize = () => {
	if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout);
	const clientWidth = document.body.clientWidth;

	// 20240117 最大窗体宽度 > 当前宽度，不触发 layoutMobileResize 事件
	if (maxClientWidth > clientWidth) return;
	maxClientWidth = clientWidth;

	if (clientWidth < 1000) {
		themeConfig.value.isCollapse = false;
		mittBus.emit('layoutMobileResize', {
			layout: 'defaults',
			clientWidth,
		});
	} else {
		mittBus.emit('layoutMobileResize', {
			layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
			clientWidth,
		});
	}
};

// 页面加载前
onBeforeMount(() => {
	hiprint.hiwebSocket.setHost(`${window.__env__.VITE_API_URL}/hubs/printPC`,getToken());//{host:"http://192.168.10.29:17521",token:''}
  
	onLayoutResize();
	window.addEventListener('resize', onLayoutResize);
	autoConnect();
	hiprint.hiwebSocket.socket.on('printSuccess',(e)=>{
          ElMessage.success(e);
          // hiprint.hiwebSocket.stop()
        })
        hiprint.hiwebSocket.socket.on('printError', function (e) {
          ElMessage.error(e); 
          // hiprint.hiwebSocket.stop()
        })
});

// 页面卸载时
onUnmounted(() => {
	window.removeEventListener('resize', onLayoutResize);
	disAutoConnect();
});
</script>
