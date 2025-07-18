import request from '/@/utils/request';
enum Api {
	DictTypeDataList = '/api/sysDictData/DataList',
	AllDictList = '/api/sysDictType/AllDictList',
}
import { getTempToken } from '/@/utils/axios-utils';
// 根据字典类型编码获取字典值集合
export const getDictDataList = (params?: any) =>
	request({
		url: `${Api.DictTypeDataList}/${params}`,
		method: 'get',
	});

export const loginQr = ()=>{
 return	request({
		url: `/${getTempToken()}/get-qr-img`,
		method: 'get',
	});
}

// 获取所有字典
export const getAllDictList = () =>
	request({
		url: `${Api.AllDictList}`,
		method: 'get',
	});
