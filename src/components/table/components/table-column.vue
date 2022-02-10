<template>
	<el-table-column
		v-if="!row.slot"
		:type="row.type"
		:width="row.width"
		:key="i"
		:prop="row.prop"
		:label="row.label"
		:align="row.align"
		:fixed="row.fixed"
	>
	</el-table-column>

	<el-table-column
		v-else-if="row.slot"
		:type="row.type"
		:width="row.width"
		:key="i"
		:prop="row.prop"
		:label="row.label"
		:align="row.align"
		:fixed="row.fixed"
	>
	</el-table-column>
</template>

<script lang="ts">
export default {
	name: 'my-table',
	props: {
		row: {
			type: Object,
			default: () => {},
		},
	},
	setup(props, content) {},
}
</script>
