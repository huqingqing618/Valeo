<template>
	<el-pagination
		@size-change="onHandleSizeChange"
		@current-change="onHandleCurrentChange"
		class="mt15"
		:pager-count="5"
		:page-sizes="[10, 20, 30]"
		v-model:current-page="tableData.param.pageNum"
		background
		v-model:page-size="tableData.param.pageSize"
		layout="total, sizes, prev, pager, next, jumper"
		:total="tableData.total"
	>
	</el-pagination>
</template>

<script lang="ts">
import {} from 'vue'
export default {}
</script>
