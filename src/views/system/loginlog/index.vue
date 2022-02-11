<template>
	<div class="system-menu-container">
		<el-card shadow="hover">
			<myTable :tableList="tableList" :tableLoading="tableLoading">
				<template v-slot:search> </template>
				<template v-slot:type="{ row }">
					<el-tag :type="['success', 'danger', 'warning', 'info'][row.type - 1]" size="mini">
						{{ ['登录系统', '注销系统', '操作日志'][row.type - 1] }}
					</el-tag>
				</template>
				<template v-slot:status="{ row }">
					<el-tag :type="['success', 'danger'][row.status]" size="mini">
						{{ ['操作成功', '操作失败'][row.status] }}
					</el-tag>
				</template>
			</myTable>
		</el-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, provide } from 'vue'
import { getLoginlogList } from '/@/api/system/loginlog.ts'
import { filterSlot } from '/@/utils/enumerate.ts'
import table from '/@/components/table/index.vue'
export default defineComponent({
	components: { myTable: table },
	setup() {
		const state = reactive({
			search: [{ id: 1, type: 'input', value: 'username', label: '用户账号' }],
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
			page: {
				page: 1,
				total: 0,
				limit: 10,
			},
			columnsList: [],
			tableList: null,
			tableLoading: false,
			searchForm: {},
		})
		const getTableList = async () => {
			state.tableLoading = true
			try {
				const {
					data: { records, pages, total },
				} = await getLoginlogList({ ...state.page, ...state.searchForm })

				state.page.total = total
				state.tableList = records
			} finally {
				state.tableLoading = false
			}
		}
		state.columnsList = filterSlot(state.columns)
		getTableList()
		provide('page', state.page)
		provide('search', state.search)
		provide('columns', state.columns)
		provide('columnsList', state.columnsList)
		//搜索获取数据
		const queryData = (searchForm: any) => {
			state.searchForm = searchForm
			getTableList()
		}
		//分页发生改变
		const pageChange = (pages: Object) => {
			getTableList()
		}
		provide('queryData', queryData)
		provide('pageChange', pageChange)
		return { ...toRefs(state), queryData }
	},
})
</script>
