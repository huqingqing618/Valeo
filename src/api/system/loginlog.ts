import request from '/@/utils/request'

export const getLoginlogList = (params: object) => {
	return request({
		url: 'loginlog/index',
		method: 'GET',
		params,
	})
}
