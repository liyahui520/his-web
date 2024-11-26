import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setCurrenFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
export const useTagsViewRoutes = defineStore('tagsViewRoutes', {
	state: (): TagsViewRoutesState => ({
		tagsViewRoutes: [],
		isTagsViewCurrenFull: false,
		iswindow:false,
		isEE:false
	}),
	actions: {
		async setTagsViewRoutes(data: Array<string>) {
			this.tagsViewRoutes = data;
		},
		setCurrenFullscreen(bool: Boolean) {
			Session.set('isTagsViewCurrenFull', bool);
			this.isTagsViewCurrenFull = bool;
		},
		setWindow(bool: Boolean) {
			Session.set('iswindow', bool);
			this.iswindow = bool;
		},
		setWindowIsEE(bool: Boolean) {
			Session.set('isEE', bool);
			this.isEE = bool;
		},
	},
});
