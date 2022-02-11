export const filterRouteTitle = (item: any, i18nRouter: any) => {
	const index = Object.values(i18nRouter).findIndex((items) => {
		return items === item.title
	})
	const keyList = Object.keys(i18nRouter)
	return index !== -1 ? 'message.router.' + keyList[index] : item.title
}
