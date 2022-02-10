<template>
	<div class="system-menu-container">
		<el-card shadow="hover">
			<myTable :tableList="tableList">
				<template v-slot:search> </template>
				<template v-slot:tableColumn> </template>
			</myTable>
		</el-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, provide } from 'vue'
import { getLoginlogList } from '/@/api/system/loginlog.ts'
import { operlogSex, operlogOccupation } from '/@/utils/enumerate.ts'
import table from '/@/components/table/index.vue'
export default defineComponent({
	components: { myTable: table },
	setup() {
		const state = reactive({
			search: [
				{ id: 1, type: 'input', value: 'name', label: '姓名' },
				{ id: 2, type: 'select', value: 'occupation', label: '职务', enum: operlogOccupation },
				{ id: 3, type: 'input', value: 'phone', label: '手机' },
				{ id: 4, type: 'select', value: 'sex', label: '性别', enum: operlogSex },
				{ id: 5, type: 'datePicker', value: 'date', label: '日期' },
			],
			columns: [
				{
					columnKey: 'selection',
					type: 'selection',
					width: 45,
					align: 'center',
					fixed: 'left',
				},
				{
					prop: 'id',
					label: 'ID',
					width: 60,
					align: 'center',
					showOverflowTooltip: true,
					fixed: 'left',
				},
				{
					prop: 'title',
					label: '日志标题',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 100,
				},
				{
					prop: 'username',
					label: '操作账号',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 100,
				},
				{
					prop: 'loginIp',
					label: 'IP地址',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 130,
				},
				{
					prop: 'os',
					label: '操作系统',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 100,
				},
				{
					prop: 'browser',
					label: '浏览器',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 100,
				},
				{
					prop: 'type',
					label: '操作类型',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 100,
					slot: 'type',
				},
				{
					prop: 'status',
					label: '操作状态',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 100,
					slot: 'status',
				},

				{
					prop: 'note',
					label: '备注',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 100,
				},
				{
					prop: 'createTime',
					label: '操作时间',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 160,
				},
				{
					columnKey: 'action',
					label: '操作',
					width: 90,
					align: 'center',
					resizable: false,
					slot: 'action',
					fixed: 'right',
				},
			],
			tableList: [],
			page: {
				page: 1,
				pages: 0,
				limit: 10,
			},
		})
		const getTableList = async () => {
			const {
				data: { records, pages },
			} = await getLoginlogList({ ...state.page })
			state.page.pages = pages
			state.tableList = records
		}
		getTableList()
		const queryData = (searchForm: any) => {}
		provide('queryData', queryData)
		provide('search', state.search)
		provide('columns', state.columns)
		// provide('tableList', state.tableList)

		return { ...toRefs(state), queryData }
	},
})
</script>
