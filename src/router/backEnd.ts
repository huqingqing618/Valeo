import { store } from '/@/store/index.ts'
import { Session } from '/@/utils/storage'
import { NextLoading } from '/@/utils/loading'
import { setAddRoute, setFilterMenuAndCacheTagsViewRoutes } from '/@/router/index'
import { dynamicRoutes } from '/@/router/route'
import { getMenuAdmin, getMenuTest } from '/@/api/menu/index'
import { filterRouteTitle } from '/@/utils/router'
import i18nTitle from '/@/i18n/lang/zh-cn'
const layouModules: any = import.meta.glob('../layout/routerView/*.{vue,tsx}')
const viewsModules: any = import.meta.glob('../views/**/*.{vue,tsx}')
/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...layouModules }, { ...viewsModules })

/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 * @method  NextLoading 界面 loading 动画开始执行
 * @method store.dispatch('userInfos/setUserInfos') 触发初始化用户信息
 * @method store.dispatch('requestOldRoutes/setBackEndControlRoutes') 存储接口原始路由（未处理component），根据需求选择使用
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initBackEndControlRoutes() {
	// 界面 loading 动画开始执行
	if (window.nextLoading === undefined) NextLoading.start()
	// 无 token 停止执行下一步
	if (!Session.get('token')) return false

	// 触发初始化用户信息
	store.dispatch('userInfo/setUserInfos')
	// 获取路由菜单数据
	const res = await getBackEndControlRoutes()
	console.log(res)

	const { menus } = formatMenus(res.data, null)
	menus.forEach((item: any) => {
		dynamicRoutes[0].children?.push(item)
	})

	// menus.forEach((item: any) => {
	// 	item.component = "import('/src/layout/index.vue')"
	// })
	// 存储接口原始路由（未处理component），根据需求选择使用
	store.dispatch('requestOldRoutes/setBackEndControlRoutes', JSON.parse(JSON.stringify(menus)))
	// // 处理路由（component），替换 dynamicRoutes（/@/router/route）第一个顶级 children 的路由
	// dynamicRoutes[0].children = await backEndComponent(menus)
	console.log(menus, 9999)

	// // 添加动态路由
	await setAddRoute()
	// // 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
	setFilterMenuAndCacheTagsViewRoutes()
}

/**
 * 请求后端路由菜单接口
 * @description isRequestRoutes 为 true，则开启后端控制路由
 * @returns 返回后端路由菜单数据
 */
export function getBackEndControlRoutes() {
	//自测
	return getMenuAdmin()

	// // 模拟 admin 与 test
	// const auth = store.state.userInfos.userInfos.roles[0]
	// // 管理员 admin
	// if (auth === 'admin') return getMenuAdmin()
	// // 其它用户 test
	// else return getMenuTest()
}

/**
 * 重新请求后端路由菜单接口
 * @description 用于菜单管理界面刷新菜单（未进行测试）
 * @description 路径：/src/views/system/menu/component/addMenu.vue
 */
export function setBackEndControlRefreshRoutes() {
	getBackEndControlRoutes()
}

/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
// export function backEndComponent(routes: any) {
// 	if (!routes) return
// 	return routes.map((item: any) => {
// 		if (item.component) item.component = dynamicImport(dynamicViewsModules, item.component as string)
// 		item.children && backEndComponent(item.children)
// 		return item
// 	})
// }

// /**
//  * 后端路由 component 转换函数
//  * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
//  * @param component 当前要处理项 component
//  * @returns 返回处理成函数后的 component
//  */
export function dynamicImport(dynamicViewsModules: Record<string, Function>, component: string) {
	const keys = Object.keys(dynamicViewsModules)
	const matchKeys = keys.filter((key) => {
		const k = key.replace(/..\/views|../, '')
		return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
	})
	// console.log(matchKeys)

	if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0]
		return dynamicViewsModules[matchKey]
	}
	if (matchKeys?.length > 1) {
		const matchKey = matchKeys[0]
		return dynamicViewsModules[matchKey]
		// return false
	}
}

//处理动态路由权限
export function formatMenus(data: any, parseMenuItem: any) {
	let home: any = null,
		menus = formatTreeData(data, (d: any) => {
			let item = parseMenuItem ? parseMenuItem(d) : Object.assign({}, d)
			console.log()

			item.meta = Object.assign(
				{
					title: filterRouteTitle(item, i18nTitle.router),
					icon: 'iconfont icon-quanxian',
					hide: item.hide,
					active: item.active || item.uid,
					hideFooter: item.hideFooter,
					hideSidebar: item.hideSidebar,
					tabUnique: item.tabUnique,
					isAffix: false,
				},
				item.meta
			)
			if (!item.children || !item.children.length) {
				if (!home && item.path && !isUrl(item.path)) {
					home = {
						path: item.path,
						title: item.title,
					}
				}
			} else if (item.children[0].path) {
				const cp = item.children[0].path
				if (!item.redirect) {
					item.redirect = cp
				}
				if (!item.path) {
					item.path = cp.substring(0, cp.lastIndexOf('/'))
				}
			}
			if (!item.path) {
				console.error('菜单的path作为vue循环的key不能为空且要唯一: ', d)
				return false
			}
			const list = item.path.split('/')
			list.forEach((letter: any, index: number) => {
				if (!letter) {
				} else {
					if (index === 1) return false
					let str = list[index].substring(0, 1).toLocaleUpperCase()
					list[index] = str + list[index].substring(1)
				}
			})
			item.name = list.join('')
			if (!item.component) {
				item.component = () => import('/src/layout/routerView/parent.vue')
			} else {
				item.component = dynamicImport(dynamicViewsModules, item.component as string)
			}
			return item
		})
	return {
		menus: menus,
		homePath: home ? home.path : null,
		homeTitle: home ? home.title : null,
	}
}
export function formatTreeData(data: any, formatter: any, childKey = 'children') {
	let result: any = []
	if (data && data.length) {
		data.forEach((d: any) => {
			let item = formatter(d)
			if (item !== false) {
				if (item[childKey]) {
					item[childKey] = formatTreeData(item[childKey], formatter, childKey)
				}
				result.push(item)
			}
		})
	}
	return result
}
function isUrl(url: any) {
	return !!(url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')))
}
