<template>
	<div class="system-menu-container">
		<el-card shadow="hover">
			<myTable :tableList="tableList" :tableLoading="tableLoading">
				<template v-slot:search> </template>
				<!-- <template #gender="{ row }">
					<el-tag :type="['success', 'primary', 'warning'][row.gender - 1]" size="mini">
						{{ ['男', '女', '保密'][row.gender - 1] }}
					</el-tag>
				</template>
				<template #avatar="{ row }">
					<el-avatar shape="square" :size="25" :src="row.avatar" />
				</template>
				<template #roles="{ row }">
					<el-tag v-for="item in row.roles" :key="item.id" size="mini" type="primary" :disable-transitions="true">
						{{ item.name }}
					</el-tag>
				</template>
				<template #status="{ row }">
					<el-switch v-model="row.status" @change="editStatus(row)" :active-value="1" :inactive-value="2" /> -->
				<!-- </template> -->
			</myTable>
		</el-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, provide } from 'vue'
import { getUserList } from '/@/api/system/index.ts'
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
					prop: 'username',
					label: '用户账号',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 110,
				},
				{
					prop: 'realname',
					label: '用户姓名',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 110,
				},
				{
					columnKey: 'avatar',
					label: '头像',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 60,
					slot: 'avatar',
				},
				{
					prop: 'genderName',
					label: '性别',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 60,
					slot: 'gender',
				},
				{
					prop: 'mobile',
					label: '手机号',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 110,
				},
				{
					columnKey: 'roles',
					label: '角色',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 200,
					slot: 'roles',
				},
				{
					prop: 'levelName',
					label: '职级',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 110,
				},
				{
					prop: 'positionName',
					label: '岗位',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 110,
				},
				{
					prop: 'deptName',
					label: '部门',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 150,
				},
				{
					prop: 'status',
					label: '职级状态',
					align: 'center',
					width: 100,
					resizable: false,
					slot: 'status',
				},
				{
					prop: 'createTime',
					label: '创建时间',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 160,
					//   formatter: (row, column, cellValue) => {
					//     return this.$util.toDateString(cellValue);
					//   }
				},
				{
					prop: 'updateTime',
					label: '更新时间',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 160,
					//   formatter: (row, column, cellValue) => {
					//     return this.$util.toDateString(cellValue);
					//   }
				},
				{
					columnKey: 'action',
					label: '操作',
					width: 220,
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
			tableList: [],
			tableLoading: false,
			searchForm: {},
		})
		const getTableList = async () => {
			state.tableLoading = true
			try {
				const {
					data: { records, pages, total },
				} = await getUserList({ ...state.page, ...state.searchForm })

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
		const editStatus = (row: any) => {}
		provide('queryData', queryData)
		provide('pageChange', pageChange)
		return { ...toRefs(state), queryData, editStatus }
	},
})
</script>
