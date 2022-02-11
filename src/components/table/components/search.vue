<template>
	<div>
		<el-form :model="form" size="small" label-width="100px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15" v-for="v in search" :key="v.id">
					<el-form-item :label="v.label" v-if="v.type === 'input'">
						<el-input @keydown.enter="query" v-model="form[v.value]" :placeholder="`请输入${v.label}`" clearable></el-input>
					</el-form-item>
					<el-form-item :label="v.label" v-else-if="v.type === 'select'">
						<el-select v-model="form[v.value]" placeholder="请选择职务" clearable class="w100">
							<el-option :label="item.label" :value="item.value" v-for="(item, i) in v.enum" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="date1" :label="v.label" v-else-if="v.type === 'datePicker'">
						<el-date-picker v-model="form[v.value]" type="date" placeholder="Pick a date" class="w100"></el-date-picker>
					</el-form-item>
				</el-col>
				<slot name="search"></slot>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15">
					<el-button type="primary" size="small" @click="query">
						<el-icon>
							<elementSearch />
						</el-icon>
						查询</el-button
					>
					<el-button type="success" size="small" @click="clearForm">
						<el-icon>
							<elementDelete />
						</el-icon>
						清空</el-button
					>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script lang="ts">
import { reactive, inject } from 'vue'
export default {
	name: 'search',
	inject: {
		search: {
			default: () => [
				{
					value: '',
					type: '', //input:输入框    radio:单选框    select:选择框   check:多选框    datePicker:日期
				},
			],
		},
	},
	emits: ['queryData'],
	setup(props, content) {
		let form: any = reactive({})
		let queryData: any = inject('queryData')
		const query = () => {
			queryData(form)
		}
		const clearForm = () => {
			Object.keys(form).forEach((item) => {
				form[item] = null
			})
		}
		return {
			form,
			query,
			queryData,
			clearForm,
		}
	},
}
</script>
