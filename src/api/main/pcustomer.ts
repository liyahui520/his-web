import request from '/@/utils/request';
enum Api {
  AddPcustomer = '/api/pcustomer/add',
  DeletePcustomer = '/api/pcustomer/delete',
  UpdatePcustomer = '/api/pcustomer/edit',
  GetPcustomerPage = '/api/pcustomer/page',
  FastAddPcustomer = '/api/pcustomer/fastAdd',
}

// 增加会员
export const addPcustomer = (params?: any) =>
	request({
		url: Api.AddPcustomer,
		method: 'post',
		data: params,
	});
// 增加会员
export const fastAddPcustomer = (params?: any) =>
	request({
		url: Api.FastAddPcustomer,
		method: 'post',
		data: params,
	});

// 删除会员
export const deletePcustomer = (params?: any) => 
	request({
			url: Api.DeletePcustomer,
			method: 'delete',
			data: params,
		});

// 编辑会员
export const updatePcustomer = (params?: any) => 
	request({
			url: Api.UpdatePcustomer,
			method: 'put',
			data: params,
		});

// 分页查询会员
export const getPcustomerPageList = (params?: any) => 
	request({
			url: Api.GetPcustomerPage,
			method: 'post',
			data: params,
			params:params
		});

