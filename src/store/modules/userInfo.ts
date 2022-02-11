import { Module } from 'vuex'
import { Session } from '/@/utils/storage'
// 此处加上 `.ts` 后缀报错，具体原因不详
import { UserInfosState, RootStateTypes } from '/@/store/interface/index'
import { getUserInfo } from '/@/api/userInfo'
import { signIn } from '/@/api/login'

const userInfosModule: Module<UserInfosState, RootStateTypes> = {
	namespaced: true,
	state: {
		userInfos: {},
		token: Session.get('toekn'),
	},
	mutations: {
		// 设置用户信息
		setUserInfo(state: any, data: object) {
			state.userInfos = data
		},
		setToken(state: any, payload: any) {
			state.token = payload.access_token
			Session.set('token', payload.access_token)
			Session.set('token_type', payload.token_type)
		},
	},
	actions: {
		// 设置用户信息
		async setUserInfos({ commit }, data: object) {
			if (data) {
				commit('getUserInfos', data)
			} else {
				if (Session.get('userInfo')) commit('getUserInfos', Session.get('userInfo'))
			}
		},
		// const { data } = await signIn(params);
		// 		Session.set('token', data.access_token);
		// 		Session.set('token_type', data.token_type);
		// 		const res = await getUserInfo();
		// 		content.commit('getUserInfos', res.data);
		// 		console.log(concontenttex);

		async userLogin({ commit }, params: object) {
			const { data } = await signIn(params)
			commit('setToken', data)
			const res = await getUserInfo()
			commit('setUserInfo', res.data)
		},
	},
}

export default userInfosModule
