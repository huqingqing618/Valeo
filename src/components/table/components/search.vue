<template>
	<div>
		<el-form :model="form" size="small" label-width="100px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15">
					<el-form-item label="姓名">
						<el-input v-model="form.name" placeholder="请输入姓名" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15">
					<el-form-item label="职务">
						<el-select v-model="form.occupation" placeholder="请选择职务" clearable class="w100">
							<el-option label="计算机 / 互联网 / 通信" value="1"></el-option>
							<el-option label="生产 / 工艺 / 制造" value="2"></el-option>
							<el-option label="医疗 / 护理 / 制药" value="3"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15">
					<el-form-item label="手机">
						<el-input v-model="form.phone" placeholder="请输入手机" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15">
					<el-form-item label="性别">
						<el-select v-model="form.sex" placeholder="请选择性别" clearable class="w100">
							<el-option label="男" value="1"></el-option>
							<el-option label="女" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15">
					<el-form-item prop="date1" label="日期">
						<el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15">
					<!-- <el-form-item prop="date2" label="多选框">
						<el-checkbox-group v-model="form.checkbox" class="w100">
							<el-checkbox label="Online" name="type"></el-checkbox>
							<el-checkbox label="Promotion" name="type"></el-checkbox>
						</el-checkbox-group>
					</el-form-item> -->
					<el-button type="primary" size="small">Primary</el-button>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
	props: {
		search: {
			type: Array,
			default: () => [
				{
					value: '',
					type: '', //input:输入框    radio:单选框    select:选择框   check:多选框    datePicker:日期
				},
			],
		},
	},
	setup() {
		const form: object = reactive({
			checkbox: [],
		})

		return {
			form,
		}
	},
}
</script>
