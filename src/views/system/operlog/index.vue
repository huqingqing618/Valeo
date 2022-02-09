<template>
	<div class="system-menu-container">
		<el-card shadow="hover">
			<myTable />
		</el-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import table from '/@/components/table/index.vue'
export default defineComponent({
	components: { myTable: table },
})
</script>
