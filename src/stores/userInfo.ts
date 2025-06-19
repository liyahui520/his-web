import { defineStore } from 'pinia';
import { Local, Session } from '/@/utils/storage';
import Watermark from '/@/utils/watermark';
import { useThemeConfig } from '/@/stores/themeConfig';
import { i18n } from "/@/i18n";

import { getAPI } from '/@/utils/axios-utils';
import { SysAuthApi, 
	SysConstApi, 
	SysDictTypeApi, 
	SysUserApi, 
	ProductUnitsApi, 
	ProductBrandsApi, 
	ProductProvidersApi, 
	ProductManufacturersApi, 
	SysProductTypeApi,
	SysRegionApi,
	SysOrgExtApi,
	SysPcuPetConfigApi,
	SysSpecialSettingApi
 } from '/@/api-services/api';


const { t } = i18n.global;
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {} as any,
		constList: [] as any,
		dictList: {} as any,
		dictListInt: {} as any,
		userList: {} as any,
		productUnits: [] as any,
		productProviders: [] as any,
		productManufacturers: [] as any,
		productBrands: [] as any,
		productTypes: [] as any,
		sysRegions: [] as any,
		sysOrgInfo:{} as any,
		petKinds:[] as any,
		petVarieties:[] as any,
		sysSpecialSettings:[] as any,
	}),
	getters: {
		// // 获取系统常量列表
		// async getSysConstList(): Promise<any[]> {
		// 	var res = await getAPI(SysConstApi).apiSysConstListGet();
		// 	this.constList = res.data.result ?? [];
		// 	return this.constList;
		// },
	},
	actions: {
		// 存储用户信息到浏览器缓存
		async setUserInfos() {
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				const userInfos = <UserInfos>await this.getApiUserInfo();
				this.userInfos = userInfos;
			}
		},

		// 存储常量信息到浏览器缓存
		async setConstList() {
			if (Session.get('constList')) {
				this.constList = Session.get('constList');
			} else {
				const constList = <any[]>await this.getSysConstList();
				Session.set('constList', constList);
				this.constList = constList;
			}
		},

		// 存储字典信息到浏览器缓存
		async setDictList() {
			//var res = await getAPI(SysDictTypeApi).apiSysDictTypeAllDictListGet();
			//this.dictList = res.data.result;
			var dictList = await getAPI(SysDictTypeApi).apiSysDictTypeAllDictListGet().then(res => res.data.result ?? {});
			var dictListTemp = JSON.parse(JSON.stringify(dictList));

			await Promise.all(Object.keys(dictList).map(async (key) => {
				dictList[key].forEach((da: any, index: any) => {
					setDictLangMessageAsync(dictListTemp[key][index]);
				});
				// 如果 key 以 "Enum" 结尾，则转换 value 为数字
				if (key.endsWith("Enum")) {
					dictListTemp[key].forEach((e: any) => e.value = Number(e.value));
				}
			}))
			this.dictList = dictListTemp;
			// if (Session.get('dictList')) {
			// 	this.dictList = Session.get('dictList');
			// } else {
			//	const dictList = <any[]>await this.getAllDictList();
			//	Session.set('dictList', dictList);
			//	this.dictList = dictList;
			// }
		},
		async setUserList() {
			// 存储字典信息到浏览器缓存
			if (Session.get('userList')) {
				this.userList = Session.get('userList');
			} else {
				const userList = <any[]>await this.getAllUserList();
				Session.set('userList', userList);
				this.userList = userList;
			}
		},
		async reloadProductUnitList() {
			Session.remove('productUnits');
			this.productUnits = [];
			// 存储字典信息到浏览器缓存
			if (Session.get('productUnits')) {
				this.productUnits = Session.get('productUnits');
			} else {
				const productUnits = <any[]>await this.getProductUnits();
				Session.set('productUnits', productUnits);
				this.productUnits = productUnits;
			}
		},
		async reloadProductBrandList() {
			Session.remove('productBrands');
			// 存储字典信息到浏览器缓存
			if (Session.get('productBrands')) {
				this.productBrands = Session.get('productBrands');
			} else {
				const productBrands = <any[]>await this.getProductBrands();
				Session.set('productBrands', productBrands);
				this.productBrands = productBrands;
			}
		},
		async reloadProductManufacturerList() {
			Session.remove('productManufacturers');
			// 存储字典信息到浏览器缓存
			if (Session.get('productManufacturers')) {
				this.productManufacturers = Session.get('productManufacturers');
			} else {
				const productManufacturers = <any[]>await this.getProductManufacturers();
				Session.set('productManufacturers', productManufacturers);
				this.productManufacturers = productManufacturers;
			}
		},
		async reloadProductProviderList() {
			Session.remove('productProviders');
			// 存储字典信息到浏览器缓存
			if (Session.get('productProviders')) {
				this.productProviders = Session.get('productProviders');
			} else {
				const productProviders = <any[]>await this.getProductProviders();
				Session.set('productProviders', productProviders);
				this.productProviders = productProviders;
			}
		},
		async reloadProductTypesList() {
			Session.remove('productTypes');
			// 存储字典信息到浏览器缓存
			if (Session.get('productTypes')) {
				this.productTypes = Session.get('productTypes');
			} else {
				const productTypes = <any[]>await this.getProductTypes();
				Session.set('productTypes', productTypes);
				this.productTypes = productTypes;
			}
		},

		async reloadSysRegionsList() {
			Session.remove('sysRegions');
			// 存储字典信息到浏览器缓存
			if (Session.get('sysRegions')) {
				this.sysRegions = Session.get('sysRegions');
			} else {
				const sysRegions = <any[]>await this.getSysRegions();
				Session.set('sysRegions', sysRegions);
				this.sysRegions = sysRegions;
			}
		},

		async reloadSysOrgExts() {
			Session.remove('sysOrgInfo');
			// 存储字典信息到浏览器缓存
			if (Session.get('sysOrgInfo')) {
				this.sysOrgInfo = Session.get('sysOrgInfo');
			} else {
				const sysOrgInfo = await this.getSysOrgExts();
				Session.set('sysOrgInfo', sysOrgInfo);
				this.sysOrgInfo = sysOrgInfo;
			}
		},
		async reloadSysSpecialSettings() {
			Session.remove('sysSpecialSettings');
			// 存储字典信息到浏览器缓存
			if (Session.get('sysSpecialSettings')) {
				this.sysSpecialSettings = Session.get('sysSpecialSettings');
			} else {
				const specialSetting =  await this.getSysSpecials();
				Session.set('sysSpecialSettings', specialSetting);
				this.sysSpecialSettings = specialSetting;
			}
		},
		async reloadGetKinds() {
			Session.remove('petKinds');
			// 存储字典信息到浏览器缓存
			if (Session.get('petKinds')) {
				this.petKinds = Session.get('petKinds');
			} else {
				const petKinds = await this.getKinds();
				Session.set('petKinds', petKinds);
				this.petKinds = petKinds;
			}
		},
		async reloadpetVarieties() {
			Session.remove('petVarieties');
			// 存储字典信息到浏览器缓存
			if (Session.get('petVarieties')) {
				this.petVarieties = Session.get('petVarieties');
			} else {
				const petVarieties = await this.getVarieties();
				Session.set('petVarieties', petVarieties);
				this.petVarieties = petVarieties;
			}
		},
		// 获取当前用户信息
		getApiUserInfo() {
			return new Promise((resolve) => {
				getAPI(SysAuthApi)
					.apiSysAuthUserInfoGet()
					.then(async (res: any) => {
						if (res.data.result == null) return;
						var d = res.data.result;
						const userInfos = {
							id: d.id,
							account: d.account,
							realName: d.realName,
							phone: d.phone,
							idCardNum: d.idCardNum,
							email: d.email,
							accountType: d.accountType,
							avatar: d.avatar ?? '/upload/logo.png',
							address: d.address,
							signature: d.signature,
							orgId: d.orgId,
							orgName: d.orgName,
							posName: d.posName,
							roles: d.roleIds,
							authBtnList: d.buttons,
							time: new Date().getTime(),
						};
						// vue-next-admin 提交Id：225bce7 提交消息：admin-23.03.26:发布v2.4.32版本
						// 增加了下面代码，引起当前会话的用户信息不会刷新，如：重新提交的头像不更新，需要新开一个页面才能正确显示
						// Session.set('userInfo', userInfos);

						// 用户水印
						const storesThemeConfig = useThemeConfig();
						storesThemeConfig.themeConfig.watermarkText = d.watermarkText ?? '';
						if (storesThemeConfig.themeConfig.isWatermark) Watermark.set(storesThemeConfig.themeConfig.watermarkText);
						else Watermark.del();

						Local.remove('themeConfig');
						Local.set('themeConfig', storesThemeConfig.themeConfig);

						resolve(userInfos);
					});
			});
		},

		// 获取常量集合
		getSysConstList() {
			return new Promise((resolve) => {
				getAPI(SysConstApi)
					.apiSysConstListGet()
					.then(async (res: any) => {
						resolve(res.data.result ?? []);
					});
			});
		},

		// 获取字典集合
		getAllDictList() {
			return new Promise((resolve) => {
				if (this.dictList) {
					resolve(this.dictList);
				} else {
					getAPI(SysDictTypeApi)
						.apiSysDictTypeAllDictListGet()
						.then((res: any) => {
							resolve(res.data.result ?? []);
						});
				}
			});
		},

		// 根据字典类型和代码取字典项
		getDictItemByCode(typePCode: string, val: string) {
			if (val != undefined && val !== '') {
				const _val = val.toString();
				const ds = this.getDictDatasByCode(typePCode);
				for (const element of ds) {
					if (element.value === _val) {
						return element;
					}
				}
			}
			return {};
		},

		// 根据字典类型和值取描述
		getDictLabelByVal(typePCode: string, val: string) {
			if (val != undefined && val !== '') {
				const _val = val.toString();
				const ds = this.getDictDatasByCode(typePCode);
				for (const element of ds) {
					if (element.value === _val) {
						return element;
					}
				}
			}
			return {};
		},

		// 根据字典类型和描述取值
		getDictValByLabel(typePCode: string, label: string) {
			if (!label) return '';
			const ds = this.getDictDatasByCode(typePCode);
			for (const element of ds) {
				if (element.name === label) {
					return element;
				}
			}
			return ''; // 明确返回空字符串
		},
		// 获取字典集合
		getAllUserList() {
			return new Promise((resolve) => {
				getAPI(SysUserApi)
					.apiSysUserGetUserGet()
					.then(async (res: any) => {
						resolve(res.data.result ?? []);
					});
			});
		},
		// 根据字典类型字典数据
		getDictDatasByCode(dictTypeCode: string) {
			return this.dictList[dictTypeCode] || [];
		},

		// 根据字典类型获取字典数据（值转为数字类型）
		getDictIntDatasByCode(dictTypeCode: string) {
			let ds = this.dictListInt[dictTypeCode];
			if (ds) {
				return ds;
			}

			const dictList = this.dictList[dictTypeCode];
			if (dictList) {
				ds = dictList.map((element: { code: any }) => {
					return { ...element, code: Number(element.code) };
				});
				this.dictListInt[dictTypeCode] = ds;
			}

			return ds;
		},
		/**
		 * 获取系统产品单位
		 * @returns
		 */
		getProductUnits() {
			return new Promise((resolve) => {
				if (this.productUnits && this.productUnits.length > 0) {
					resolve(this.productUnits);
				} else {
					getAPI(ProductUnitsApi)
						.apiProductUnitsSelectListPost()
						.then(async (res: any) => {
							resolve(res.data.result ?? []);
						});
				}
			});
		},
		/**
		 * 获取系统产品供应商
		 * @returns
		 */
		getProductProviders() {
			return new Promise((resolve) => {
				if (this.productProviders && this.productProviders.length > 0) {
					resolve(this.productProviders);
				} else {
					getAPI(ProductProvidersApi)
						.apiProductProvidersSelectListPost()
						.then(async (res: any) => {
							resolve(res.data.result ?? []);
						});
				}
			});
		},
		/**
		 * 获取系统产品生产商
		 * @returns
		 */
		getProductManufacturers() {
			return new Promise((resolve) => {
				if (this.productManufacturers && this.productManufacturers.length > 0) {
					resolve(this.productManufacturers);
				} else {
					getAPI(ProductManufacturersApi)
						.apiProductManufacturersSelectListPost()
						.then(async (res: any) => {
							resolve(res.data.result ?? []);
						});
				}
			});
		},
		/**
		 * 获取系统产品品牌
		 * @returns
		 */
		getProductBrands() {
			return new Promise((resolve) => {
				if (this.productBrands && this.productBrands.length > 0) {
					resolve(this.productBrands);
				} else {
					getAPI(ProductBrandsApi)
						.apiProductBrandsSelectListPost()
						.then(async (res: any) => {
							resolve(res.data.result ?? []);
						});
				}
			});
		},
		/**
		 * 获取系统产品类型
		 * @returns
		 */
		getProductTypes() {
			return new Promise((resolve) => {
				if (this.productTypes && this.productTypes.length > 0) {
					resolve(this.productTypes);
				} else {
					getAPI(SysProductTypeApi)
						.apiSysProductTypeListGet()
						.then(async (res: any) => {
							resolve(res.data.result ?? []);
						});
				}
			});
		},
		/**
		 * 获取系统产品地址
		 * @returns
		 */
		getSysRegions() {
			return new Promise((resolve) => {
				if (this.sysRegions && this.sysRegions.length > 0) {
					resolve(this.sysRegions);
				} else {
					getAPI(SysRegionApi)
						.apiSysRegionGetHasChildrenListGet()
						.then(async (res: any) => {
							resolve(res.data.result ?? []);
						});
				}
			});
		},
		/**
		 * 获取系统机构信息
		 * @returns
		 */
		getSysOrgExts() {
			return new Promise((resolve) => {
				if (this.sysOrgInfo && this.sysOrgInfo.hasOwnProperty('id')) {
					resolve(this.sysOrgInfo);
				} else {
					getAPI(SysOrgExtApi)
						.apiSysOrgExtGetSysOrgInfoGet()
						.then(async (res: any) => {
							resolve(res.data.result ?? {});
						});
				}
			});
		},

		/**
		 * 获取系统权益信息
		 * @returns
		 */
		getSysSpecials() {
			return new Promise((resolve) => {
				if (this.sysSpecialSettings && this.sysSpecialSettings.length>0) {
					resolve(this.sysSpecialSettings);
				} else {
					getAPI(SysSpecialSettingApi)
						.apiSysSpecialSettingGetSpecialSettingsGet()
						.then(async (res: any) => {
							resolve(res.data.result ?? []);
						});
				}
			});
		},
		/**
		 * 获取种类
		 */
		getKinds(){
			return new Promise((resolve) => {
				if (this.petKinds && this.petKinds.length > 0) {
					resolve(this.petKinds);
				} else {
					getAPI(SysPcuPetConfigApi)
						.apiSysPcuPetConfigGetAllKindGet()
						.then(async (res: any) => {
							resolve(res.data.result ?? {});
						});
				}
			});
		},
		getAllKinds(){
			return this.petKinds;
		},
		/**
		 * 获取品种
		 * @returns 
		 */
		getVarieties(){
			return new Promise((resolve) => {
				if (this.petVarieties && this.petVarieties.length > 0) {
					resolve(this.petVarieties);
				} else {
					getAPI(SysPcuPetConfigApi)
						.apiSysPcuPetConfigGetAllVarietieGet()
						.then(async (res: any) => {
							resolve(res.data.result ?? {});
						});
				}
			});
		},
		getVarietiesByKindId(kindId : string){
			return this.petVarieties[kindId];
		}
	},
});


// 处理字典国际化, 默认显示字典中的label值
const setDictLangMessageAsync = async (dict: any) => {
	dict.langMessage = `message.dictType.${dict.typeCode}_${dict.value}`;
	const text = t(dict.langMessage);
	dict.label = text !== dict.langMessage ? text : dict.label;
}