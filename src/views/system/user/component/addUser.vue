<template>
	<div class="system-add-user-container">
		<el-dialog title="新增用户" v-model="isShowDialog" width="769px">
			<el-form :model="ruleForm" size="small" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户姓名:" prop="realname">
							<el-input clearable :maxlength="20" v-model="ruleForm.realname" placeholder="请输入用户姓名" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户昵称:" prop="nickname">
							<el-input clearable :maxlength="20" v-model="ruleForm.nickname" placeholder="请输入用户昵称" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="性别:" prop="gender">
							<el-select clearable class="w100" v-model="ruleForm.gender" placeholder="请选择性别">
								<el-option label="男" :value="1" />
								<el-option label="女" :value="2" />
								<el-option label="保密" :value="3" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="出生日期:" prop="birthday">
							<el-date-picker
								type="date"
								class="w100"
								v-model="ruleForm.birthday"
								value-format="yyyy-MM-dd"
								format="yyyy-MM-dd"
								placeholder="请选择出生日期"
							/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="邮箱:" prop="email">
							<el-input clearable :maxlength="100" v-model="ruleForm.email" placeholder="请输入邮箱" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号:" prop="mobile">
							<el-input clearable :maxlength="11" v-model="ruleForm.mobile" placeholder="请输入手机号" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="职级：" prop="levelId">
							<el-select filterable clearable v-model="ruleForm.levelId" size="small" placeholder="-请选择职级-" class="w100">
								<el-option v-for="item in levelList" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="岗位：" prop="positionId">
							<el-select filterable clearable v-model="ruleForm.positionId" size="small" placeholder="-请选择岗位-" class="w100">
								<el-option v-for="item in positionList" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="所属部门:" prop="deptId">
							<treeselect
								v-model="ruleForm.deptId"
								:options="deptList"
								placeholder="请选择所属部门"
								:defaultExpandLevel="3"
								:normalizer="
									(d) => {
										return { id: d.id, label: d.name, children: d.children || undefined }
									}
								"
							/>
						</el-form-item>
					</el-col> -->
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="状态:" prop="status">
							<el-radio-group v-model="ruleForm.status">
								<el-radio :label="1">在用</el-radio>
								<el-radio :label="2">禁用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="详细地址:" prop="address">
							<el-input clearable :maxlength="150" v-model="ruleForm.address" placeholder="请输入详细地址" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序号:" prop="sort">
							<el-input-number :min="0" v-model="ruleForm.sort" placeholder="请输入排序号" controls-position="right" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色:" prop="roleIds">
							<el-select multiple clearable class="w100" v-model="ruleForm.roleIds" placeholder="请选择角色">
								<el-option v-for="item in roleList" :key="item.id" :value="item.id" :label="item.name" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户账号:" prop="username">
							<el-input clearable :maxlength="20" :disabled="isUpdate" v-model="ruleForm.username" placeholder="请输入用户账号" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="登录密码:" prop="password">
							<el-input show-password :maxlength="20" v-model="ruleForm.password" placeholder="请输入登录密码" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="个人简介:">
							<el-input :rows="3" clearable type="textarea" :maxlength="200" v-model="ruleForm.intro" placeholder="请输入个人简介" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="small">新 增</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { addUser } from '/@/api/system'
import { log } from 'console'
export default {
	name: 'systemAddUser',
	setup() {
		const state = reactive({
			isShowDialog: false,
			ruleForm: {},
		})
		// 打开弹窗
		const openDialog = () => {
			state.isShowDialog = true
		}
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false
		}
		// 取消
		const onCancel = () => {
			closeDialog()
		}
		// 新增
		const onSubmit = async () => {
			try {
				const res = await addUser(state.ruleForm)
				console.log(res)
			} catch (err) {}
			closeDialog()
		}
		// 初始化部门数据
		// 页面加载时
		onMounted(() => {})
		return {
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		}
	},
}
</script>
