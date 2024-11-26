import request from '/@/utils/request';
enum Api {
  AddMemberLevel = '/api/memberLevel/add',
  DeleteMemberLevel = '/api/memberLevel/delete',
  UpdateMemberLevel = '/api/memberLevel/edit',
  GetMemberLevelPage = '/api/memberLevel/page',

  GetMemberLevelList = '/api/memberLevel/list',
}

// 增加会员级别
export const addMemberLevel = (params?: any) =>
	request({
		url: Api.AddMemberLevel,
		method: 'post',
		data: params,
	});

// 删除会员级别
export const deleteMemberLevel = (params?: any) => 
	request({
			url: Api.DeleteMemberLevel,
			method: 'delete',
			data: params,
		});

// 编辑会员级别
export const updateMemberLevel = (params?: any) => 
	request({
			url: Api.UpdateMemberLevel,
			method: 'put',
			data: params,
		});

// 分页查询会员级别
export const getMemberLevelPageList = (params?: any) => 
	request({
			url: Api.GetMemberLevelPage,
			method: 'post',
			data: params,
			params:params
		});
// 分页所有会员级别
export const getMemberLevelList = (params?: any) =>
	request({
		url: Api.GetMemberLevelList,
		method: 'post',
		data: params,
		params:params
	});
