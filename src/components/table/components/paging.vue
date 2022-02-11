<template>
	<el-pagination
		@size-change="onHandleSizeChange"
		@current-change="onHandleCurrentChange"
		class="mt15"
		:pager-count="5"
		:page-sizes="[10, 20, 30]"
		v-model:current-page="page.page"
		background
		v-model:page-size="page.limit"
		layout="total, sizes, prev, pager, next, jumper"
		:total="page.total"
	>
	</el-pagination>
</template>

<script lang="ts">
import { init } from 'echarts'
import { defineComponent, inject, reactive, toRefs } from 'vue'
export default defineComponent({
	setup(props) {
		const page = inject('page')
		const pageChange: any = inject('pageChange')

		const onHandleSizeChange = () => {
			pageChange(page)
		}
		const onHandleCurrentChange = () => {
			pageChange(page)
		}
		return {
			page,
			onHandleSizeChange,
			onHandleCurrentChange,
		}
	},
})
</script>
