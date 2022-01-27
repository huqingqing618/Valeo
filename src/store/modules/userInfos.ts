import { Module } from 'vuex';
import { Session } from '/@/utils/storage';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { UserInfosState, RootStateTypes } from '/@/store/interface/index';
import { signIn } from '/@/api/login';
import { getUserInfo } from '/@/api/userInfo';

const userInfosModule: Module<UserInfosState, RootStateTypes> = {
	namespaced: true,
	state: {
		userInfos: {},
	},
	mutations: {
		// 设置用户信息
		getUserInfos(state: any, data: object) {
			state.userInfos = data;
		},
	},
	actions: {
		// 设置用户信息
		async setUserInfos({ commit }, data: object) {
			if (data) {
				commit('getUserInfos', data);
			} else {
				if (Session.get('userInfo')) commit('getUserInfos', Session.get('userInfo'));
			}
		},
		async login(content, params) {
			if (params.username) {
				const { data } = await signIn(params);
				Session.set('token', data.access_token);
				Session.set('token_type', data.token_type);
				const res = await getUserInfo();
				content.commit('getUserInfos', res.data);
				console.log(content);
			}
		},
	},
};

export default userInfosModule;
