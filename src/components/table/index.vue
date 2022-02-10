<template>
	<div>
		<search>
			<template v-slot:search>
				<slot name="search"> </slot>
			</template>
		</search>
		<my-table :tableList="tableList">
			<template v-slot:tableColumn>
				<slot name="tableColumn"> </slot>
			</template>
		</my-table>
		<!-- <paging></paging> -->
	</div>
</template>

<script lang="ts">
import search from './components/search.vue'
import myTable from './components/table.vue'
import paging from './components/paging.vue'
import { defineComponent } from 'vue'
export default defineComponent({
	components: {
		search,
		myTable,
		paging,
	},
	props: {
		tableList: {
			type: Array,
			required: true,
		},
	},
	setup() {
		return {}
	},
})
</script>
