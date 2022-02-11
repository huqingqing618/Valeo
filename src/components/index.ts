import myTable from './table/index.vue'

const myComponents = {
	install(vue: any) {
		vue.component('myTable', myTable)
	},
}
export default myComponents
