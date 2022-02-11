<template>
	<el-table ref="table" :data="tableList" style="width: 100%" v-loading="tableLoading">
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
			:min-width="v.minWidth"
		>
			<template v-if="v.slot" v-slot="{ row }">
				<slot :name="v.slot" :row="row"></slot>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts">
import { inject, onMounted, watch, ref } from 'vue'
import tableColumn from './table-column.vue'
export default {
	name: 'my-table',
	props: {
		tableList: {
			type: Array,
			default: () => [],
		},
		tableLoading: {
			type: Boolean,
			default: () => false,
		},
	},
	components: {
		tableColumn,
	},
	inject: ['columns'],
	setup(props, content) {
		let table: any = ref(null)
		onMounted(() => {})
		return {
			table,
		}
	},
}
</script>
