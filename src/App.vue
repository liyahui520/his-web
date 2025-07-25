<template>
	<el-config-provider :size="getGlobalComponentSize" :locale="getGlobalI18n">
		<router-view v-show="setLockScreen" />
		<LockScreen v-if="themeConfig.isLockScreen" />
		<Settings ref="settingsRef" v-show="setLockScreen" />
		<CloseFull v-if="!themeConfig.isLockScreen" />
		<!-- <Upgrade v-if="needUpdate" /> -->
		<!-- <Sponsors /> -->
    <!-- <div
      style="position:fixed;text-align:center;bottom:0;margin:0 auto;width:100%;color: #5c6b77"
    >
      <a
        target="_blank"
        style="color: #5c6b77"
        href="https://beian.miit.gov.cn/"
        >豫ICP备2024067131号</a
      >
      &nbsp; @2024-2026 
    </div>  -->
	</el-config-provider>
</template>

<script setup lang="ts" name="app">
import {defineAsyncComponent, computed, ref, onBeforeMount, onMounted, onUnmounted, nextTick, watch} from 'vue';
import {useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import {useTagsViewRoutes} from '/@/stores/tagsViewRoutes';
import {useThemeConfig} from '/@/stores/themeConfig';
import other from '/@/utils/other';
import {Local, Session} from '/@/utils/storage';
import mittBus from '/@/utils/mitt';
import setIntroduction from '/@/utils/setIconfont';
// import Watermark from '/@/utils/watermark';
import { SysConfigApi } from '/@/api-services';
import { getAPI } from '/@/utils/axios-utils';

// 引入组件
const LockScreen = defineAsyncComponent(() => import('/@/layout/lockScreen/index.vue'));
const Settings = defineAsyncComponent(() => import('/@/layout/navBars/topBar/settings.vue'));
const CloseFull = defineAsyncComponent(() => import('/@/layout/navBars/topBar/closeFull.vue'));
// const Upgrade = defineAsyncComponent(() => import('/@/layout/upgrade/index.vue'));
// const Sponsors = defineAsyncComponent(() => import('/@/layout/sponsors/index.vue'));

// 定义变量内容
const { messages, locale } = useI18n();
const settingsRef = ref();
const route = useRoute();
const stores = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const {themeConfig} = storeToRefs(storesThemeConfig);
const needUpdate = ref(false);
const setingsRef = ref();

// 设置锁屏时组件显示隐藏
const setLockScreen = computed(() => {
  // 防止锁屏后，刷新出现不相关界面
  // https://gitee.com/lyt-top/vue-next-admin/issues/I6AF8P
  return themeConfig.value.isLockScreen ? themeConfig.value.lockScreenTime > 1 : themeConfig.value.lockScreenTime >= 0;
});

// // 获取版本号
// const getVersion = computed(() => {
// 	let isVersion = false;
// 	if (route.path !== '/login') {
// 		// @ts-ignore
// 		if ((Local.get('version') && Local.get('version') !== __NEXT_VERSION__) || !Local.get('version')) isVersion = true;
// 	}
// 	return isVersion;
// });

// checkUpdate(() => {
// 	needUpdate.value = true;
// }, 60000);


// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
  return other.globalComponentSize();
});
// 获取全局 i18n
const getGlobalI18n = computed(() => {
  return messages.value[locale.value];
});
// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {
  // 设置批量第三方 icon 图标
  setIntroduction.cssCdn();
  // 设置批量第三方 js
  setIntroduction.jsCdn();
});
// 页面加载时
onMounted(() => {
  nextTick(() => {
    if (Session.get('iswindow')) {
      stores.setWindow(true);
      Session.set('isTagsViewCurrenFull', true);
    } 
    // 监听布局配'置弹窗点击打开
    mittBus.on('openSettingsDrawer', () => {
			settingsRef.value.openDrawer();
		});
    // 获取缓存中的布局配置
    if (Local.get('themeConfig')) {
      storesThemeConfig.setThemeConfig({themeConfig: Local.get('themeConfig')});
      document.documentElement.style.cssText = Local.get('themeConfigStyle');
    }
    // 获取缓存中的全屏配置
    if (Session.get('isTagsViewCurrenFull')) {
      stores.setCurrenFullscreen(Session.get('isTagsViewCurrenFull'));
    } 
  });
});
// 页面销毁时，关闭监听布局配置/i18n监听
onUnmounted(() => {
	mittBus.off('openSettingsDrawer', () => {});
});
// 监听路由的变化，设置网站标题
watch(
    () => route.path,
    () => {
      other.useTitle();
    },
    {
      deep: true,
    }
);

// 加载系统信息
const loadSysInfo = () => {
	getAPI(SysConfigApi)
		.apiSysConfigSysInfoGet()
		.then((res) => {
			if (res.data.type != 'success') return;

			const data = res.data.result;
			// 系统logo
			themeConfig.value.logoUrl = data.logo;
			// 主标题
			themeConfig.value.globalTitle = data.title;
			// 副标题
			themeConfig.value.globalViceTitle = data.viceTitle;
			// 系统说明
			themeConfig.value.globalViceTitleMsg = data.viceDesc;
			// Icp备案信息
			themeConfig.value.icp = data.icp;
			themeConfig.value.icpUrl = data.icpUrl;
			// 水印
			themeConfig.value.isWatermark = data.watermark != null;
			themeConfig.value.watermarkText = data.watermark;
			// 版权说明
			themeConfig.value.copyright = data.copyright;
			// 登录验证
			themeConfig.value.secondVer = data.secondVer == 1;
			themeConfig.value.captcha = data.captcha == 1;
			// 登陆时隐藏租户
			themeConfig.value.hideTenantForLogin = data.hideTenantForLogin;
			// 注册功能
			themeConfig.value.registration = data.enableReg == 1;
			// 更新配置加载状态
			themeConfig.value.isLoaded = true;
			// 更新 favicon
			updateFavicon(data.sysLogo);

			// 保存配置
			Local.remove('themeConfig');
			Local.set('themeConfig', storesThemeConfig.themeConfig);
		})
		.catch(() => {
			// 置空 logo 地址
			themeConfig.value.logoUrl = '';
			// 保存配置
			Local.remove('themeConfig');
			Local.set('themeConfig', storesThemeConfig.themeConfig);
			return;
		});
};

// 更新 favicon
const updateFavicon = (url: string): void => {
	const favicon = document.getElementById('favicon') as HTMLAnchorElement;
	favicon!.href = url ? url : 'data:;base64,=';
};

// 加载系统信息
loadSysInfo();

// 阻止火狐浏览器在拖动时打开新窗口
document.body.ondrop = function (event) {
	event.preventDefault();
	event.stopPropagation();
};
</script>
<style lang="scss">
/* //全局设置不可选中 */
body {
  //-webkit-user-select: none;
  //
  //-moz-user-select: none;
  //
  //-ms-user-select: none;
  //
  //user-select: none;

  :deep(.el-table--default .el-table__cell) {
    padding: 4px 0 !important;
  }

  :deep(.el-table--default .cell) {
    padding: 0 4px !important;
  }
//    .el-select {
//	width: 171px !important;
//}
.el-select__wrapper {
	line-height: 22px !important;
}
}
.el-form--inline {
	.el-form-item {
		.el-select {
			width: 171px !important;
		}
		.el-select__wrapper {
			line-height: 22px !important;
		}
		//.el-date-editor {
		//	--el-date-editor-width: 171px !important;
		//}
		//.el-input {
		//	width: 171px !important;
		//}
	}
}
</style>
