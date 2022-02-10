<template>
	<el-table ref="table" :data="tableList" style="width: 100%" :header="header">
		<!-- <tableColumn v-for="(v, i) in columns" :key="i" :row="v"></tableColumn> -->
		<el-table-column
			:type="v.type"
			v-for="(v, i) in columns"
			:width="v.width"
			:key="i"
			:prop="v.prop"
			:label="v.label"
			:align="v.align"
			:fixed="v.fixed"
		>
			<template v-if="v.slot" v-slot="{ row }">
				<slot name="v.slot" :scoped="row"></slot>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts">
import tableColumn from './table-column.vue'
import { inject, watch } from 'vue'
export default {
	name: 'my-table',
	props: {
		tableList: {
			type: Array,
			default: () => [],
		},
	},
	components: {
		tableColumn,
	},
	inject: ['columns'],
	// data() {
	// 	return {
	// 		header: 0,
	// 	}
	// },
	setup(props, content) {},
	// mounted() {
	// 	const table: any = this.$refs.table
	// 	window.onresize = () => {
	// 		return (() => {
	// 			let heightStyle = table.offsetHeight
	// 			console.log(heightStyle)
	// 			this.header = heightStyle
	// 		})()
	// 	}
	// },
}
</script>
