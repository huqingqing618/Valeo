import request from '/@/utils/request';

export const getUserInfo = () => {
	return request({
		url: '/index/getUserInfo',
		method: 'GET',
	});
};
