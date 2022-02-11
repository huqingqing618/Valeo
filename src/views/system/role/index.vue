<template>
	<div class="system-menu-container">
		<el-card shadow="hover">
			<myTable :tableList="tableList" :tableLoading="tableLoading">
				<template v-slot:search> </template>
				<template #gender="{ row }">
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
					<el-switch v-model="row.status" @change="editStatus(row)" :active-value="1" :inactive-value="2" />
				</template>
				<template #action="{ row }">
					<el-link type="primary" :underline="false" icon="elementEdit" @click="openEdit(row)"> 修改 </el-link>
					<el-link type="primary" :underline="false" icon="elementFinished" @click="openAuth(row)" class="ml152 mr15">分配权限 </el-link>
					<el-popconfirm class="ele-action" title="确定要删除此角色吗？" @confirm="remove(row)">
						<template v-slot:reference>
							<el-link type="danger" :underline="false" icon="elementDelete">删除 </el-link>
						</template>
					</el-popconfirm>
				</template>
			</myTable>
		</el-card>
	</div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, toRefs, provide } from 'vue'
import { getRoleList, delRole } from '/@/api/system/index.ts'
import { filterSlot } from '/@/utils/enumerate.ts'

export default defineComponent({
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
					prop: 'name',
					label: '角色名称',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 200,
				},
				{
					prop: 'code',
					label: '角色标识',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 150,
				},
				{
					prop: 'status',
					label: '职级状态',
					sortable: 'custom',
					align: 'center',
					width: 150,
					resizable: false,
					slot: 'status',
				},
				{
					prop: 'sort',
					label: '排序号',
					align: 'center',
					showOverflowTooltip: true,
					width: 100,
				},
				{
					prop: 'note',
					label: '备注',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 200,
				},
				{
					prop: 'createTime',
					label: '创建时间',
					sortable: 'custom',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 160,
				},
				{
					prop: 'updateTime',
					label: '更新时间',
					sortable: 'custom',
					align: 'center',
					showOverflowTooltip: true,
					minWidth: 160,
				},
				{
					columnKey: 'action',
					label: '操作',
					width: 230,
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
				} = await getRoleList({ ...state.page, ...state.searchForm })

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
		const remove = async (row: any) => {
			try {
				const { data } = await delRole({ id: row.id })
				console.log(data)

				ElMessage.success(data)
			} finally {
				getTableList()
			}
		}
		const openEdit = () => {}
		const openAuth = () => {}
		provide('queryData', queryData)
		provide('pageChange', pageChange)
		return { ...toRefs(state), queryData, editStatus, remove, openEdit, openAuth }
	},
})
</script>
