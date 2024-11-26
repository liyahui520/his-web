import request from '/@/utils/request';
enum Api {
  AddPpets = '/api/ppets/add',
  DeletePpets = '/api/ppets/delete',
  UpdatePpets = '/api/ppets/update',
  PagePpets = '/api/ppets/page',
  UploadPetImageUrl = '/api/ppets/UploadPetImageUrl',
}

// 增加宠物
export const addPpets = (params?: any) =>
	request({
		url: Api.AddPpets,
		method: 'post',
		data: params,
	});

// 删除宠物
export const deletePpets = (params?: any) => 
	request({
			url: Api.DeletePpets,
			method: 'post',
			data: params,
		});

// 编辑宠物
export const updatePpets = (params?: any) => 
	request({
			url: Api.UpdatePpets,
			method: 'post',
			data: params,
		});

// 分页查询宠物
export const pagePpets = (params?: any) => 
	request({
			url: Api.PagePpets,
			method: 'post',
			data: params,
		});

	/**
	* 上传宠物照片  
	*/
export const uploadPetImageUrl = (params: any) =>
		uploadFileHandle(params, Api.UploadPetImageUrl)

	export const uploadFileHandle = (params: any, url: string) => { 
	const formData = new window.FormData();
	formData.append('file', params.file);
	//自定义参数
	if (params.data) {
		Object.keys(params.data).forEach((key) => {
			const value = params.data![key];
			if (Array.isArray(value)) {
				value.forEach((item) => {
					formData.append(`${key}[]`, item);
				});
				return;
			}
			formData.append(key, params.data![key]);
		});
	}
	return request({
		url: url,
		method: 'POST',
		data: formData,
		headers: {
			'Content-type': 'multipart/form-data;charset=UTF-8',
			// ts-ignore
			ignoreCancelToken: true,
		},
	});
};
