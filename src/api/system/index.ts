import request from '/@/utils/request'

// 获取用户信息
export const getUserList = (params: object) => {
	return request({
		url: 'user/index',
		method: 'GET',
		params,
	})
}

export const addUser = (data: object) => {
	return request({
		url: 'user/add',
		method: 'POST',
		data,
	})
}

// 获取角色信息
export const getRoleList = (params: object) => {
	return request({
		url: 'role/index',
		method: 'GET',
		params,
	})
}

//删除角色
export const delRole = (params: any) => {
	return request({
		url: `/role/delete/${params.id}`,
		method: 'DELETE',
	})
}

//获取登录日志
export const getLoginlogList = (params: object) => {
	return request({
		url: 'loginlog/index',
		method: 'GET',
		params,
	})
}
