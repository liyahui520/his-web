import request from '/@/utils/request';
enum Api {
	listProduct = '/api/productCategorys/{categoryType}/list-product',
}
export const listProduct = (params:any) =>
	request({
		url: Api.listProduct.replace(`{${"categoryType"}}`, encodeURIComponent(String(params))),
		method: 'get'
	});