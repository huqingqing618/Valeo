<template>
	<div class="my-table">
		<search>
			<template v-slot:search>
				<slot name="search"> </slot>
			</template>
		</search>
		<el-card class="min73vh">
			<template #header>
				<div>
					<span>Card name</span>
					<el-button class="button" type="text">Operation button</el-button>
				</div>
			</template>
			<my-table :tableList="tableList" :tableLoading="tableLoading">
				<template v-for="(v, i) in columnsList" :key="i" v-slot:[v]="{ row }">
					<slot :name="v" :row="row"> </slot>
				</template>
			</my-table>
		</el-card>
		<paging></paging>
	</div>
</template>

<script lang="ts">
import search from './components/search.vue'
import myTable from './components/table.vue'
import paging from './components/paging.vue'
import { defineComponent, ref } from 'vue'
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
		tableLoading: {
			type: Boolean,
			default: () => false,
		},
	},
	inject: ['columnsList'],
	setup() {
		const name = ref('type')
		return {
			name,
		}
	},
})
</script>
<style scoped lang="scss">
.my-table {
	::v-deep(.el-card) {
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) !important;
	}
}
</style>
