import { defineStore } from 'pinia';

export const useThemeConfig = defineStore('themeConfig', {
	state: (): ThemeConfigState => ({
		themeConfig: {
			// 是否开启布局配置抽屉
			isDrawer: false,

			/**
			 * 全局主题
			 */
			// 默认 primary 主题颜色
			primary: '#0D76F7', //红色:#DE2910 //蓝色:#11559C //绿色:#057748
			// 是否开启深色模式
			isIsDark: false,

			/**
			 * 顶栏设置
			 */
			// 默认顶栏导航背景颜色
			topBar: '#A4B4FB',
			// 默认顶栏导航字体颜色
			topBarColor: '#FFFFFF',
			// 是否开启顶栏背景颜色渐变
			isTopBarColorGradual: false,

			/**
			 * 菜单设置
			 */
			// 默认菜单导航背景颜色
			menuBar: '#FFFFFF',
			// 默认菜单导航字体颜色
			menuBarColor: '#000000',
			// 默认菜单高亮背景色
			menuBarActiveColor: 'var(--el-color-primary-light-7)',
			// 是否开启菜单背景颜色渐变
			isMenuBarColorGradual: false,

			/**
			 * 分栏设置
			 */
			// 默认分栏菜单背景颜色
			columnsMenuBar: '#2C3A49',
			// 默认分栏菜单字体颜色
			columnsMenuBarColor: '#F0F0F0',
			// 是否开启分栏菜单背景颜色渐变
			isColumnsMenuBarColorGradual: false,
			// 是否开启分栏菜单鼠标悬停预加载(预览菜单)
			isColumnsMenuHoverPreload: false,
			// 分栏Logo高度(px)
			columnsLogoHeight: 50,
			// 分栏菜单宽度(px)
			columnsMenuWidth: 70,
			// 分栏菜单高度(px)
			columnsMenuHeight: 50,

			/**
			 * 界面设置
			 */
			// 是否开启菜单水平折叠效果
			isCollapse: false,
			// 是否开启菜单手风琴效果
			isUniqueOpened: true,
			// 是否开启固定 Header
			isFixedHeader: true,
			// 初始化变量，用于更新菜单 el-scrollbar 的高度，请勿删除
			isFixedHeaderChange: false,
			// 是否开启经典布局分割菜单（仅经典布局生效）
			isClassicSplitMenu: false,
			// 是否开启自动锁屏
			isLockScreen: false,
			// 开启自动锁屏倒计时(s/秒)
			lockScreenTime: 300,

			/**
			 * 界面显示
			 */
			// 是否开启侧边栏 Logo
			isShowLogo: true,
			// 初始化变量，用于 el-scrollbar 的高度更新，请勿删除
			isShowLogoChange: true,
			// 是否开启 Breadcrumb，强制经典、横向布局不显示
			isBreadcrumb: true,
			// 是否开启 Tagsview
			isTagsview: true,
			// 是否开启 Breadcrumb 图标
			isBreadcrumbIcon: false,
			// 是否开启 Tagsview 图标
			isTagsviewIcon: false,
			// 是否开启 TagsView 缓存
			isCacheTagsView: true,
			// 是否开启 TagsView 拖拽
			isSortableTagsView: true,
			// 是否开启 TagsView 共用
			isShareTagsView: true,
			// 是否开启 Footer 底部版权信息
			isFooter: false,
			// 是否开启灰色模式
			isGrayscale: false,
			// 是否开启色弱模式
			isInvert: false,
			// 是否开启水印
			isWatermark: true,
			// 水印文案
			watermarkText: 'Voxa',

			/**
			 * 其它设置
			 */
			// Tagsview 风格：可选值"<tags-style-one|tags-style-four|tags-style-five>"，默认 tags-style-five
			// 定义的值与 `/src/layout/navBars/tagsView/tagsView.vue` 中的 class 同名
			tagsStyle: 'tags-style-one',
			// 主页面切换动画: Animate.css
			animation: 'fade-left',
			// 分栏高亮风格：可选值"<columns-round|columns-card>"，默认 columns-round
			columnsAsideStyle: 'columns-round',
			// 分栏布局风格：可选值"<columns-horizontal|columns-vertical>"，默认 columns-horizontal
			columnsAsideLayout: 'columns-vertical',

			/**
			 * 布局切换
			 * 注意：为了演示，切换布局时，颜色会被还原成默认，代码位置：/@/layout/navBars/topBar/settings.vue
			 * 中的 `initSetLayoutChange(设置布局切换，重置主题样式)` 方法
			 */
			// 布局切换：可选值"<defaults|classic|transverse|columns>"，默认 defaults
			layout: 'defaults',

			/**
			 * 后端控制路由
			 */
			// 是否开启后端控制路由
			isRequestRoutes: true,

			/**
			 * 全局网站标题 / 副标题
			 */
			// 网站主标题（菜单导航、浏览器当前网页标题）
			globalTitle: 'Voxa',
			// 网站副标题（登录页顶部文字）
			globalViceTitle: 'Voxa',
			// 网站副标题（登录页顶部文字）
			globalViceTitleMsg: '',
			// 版权和备案文字
			copyright: 'Copyright © 2021-present Admin.NET All rights reserved.',
			// 默认初始语言，可选值"<zh-cn|en|zh-tw>"，默认 zh-cn
			globalI18n: 'zh-cn',
			// 默认全局组件大小，可选值"<large|'default'|small>"，默认 'large'
			globalComponentSize: 'default',
			// 系统 logo 地址
			logoUrl: '',
			// Icp备案号
			icp: '豫ICP备2024067131号',
			// Icp地址
			icpUrl: 'https://beian.miit.gov.cn/', 
		},
	}),
	actions: {
		setThemeConfig(data: ThemeConfigState) {
			this.themeConfig = data.themeConfig;
		},
	},
});

