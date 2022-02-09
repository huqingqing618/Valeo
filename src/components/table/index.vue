<template>
	<div>
		<search />
	</div>
</template>

<script lang="ts">
import search from './components/search.vue'
import { defineComponent } from 'vue'
export default defineComponent({
	components: {
		search,
	},
})
</script>
