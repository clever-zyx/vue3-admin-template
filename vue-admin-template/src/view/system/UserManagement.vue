<template>
  <!-- 表单栏 -->
  <el-card shadow="always" style="margin-bottom: 20px;">
    <el-form :model="form" label-width="80px" :inline="true" class="form" @submit.prevent="handleSearch">
      <el-form-item label="用户名:" prop="name">
        <el-input v-model="form.name" placeholder="请输入用户名" clearable ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" :loading="loading" @click="handleSearch"
          native-type="button">搜索</el-button>
        <el-button size="default" @click="handleReset" native-type="button">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- table栏 -->
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <template #header>
      <el-button type="primary" size="default" @click="handleAdd">添加</el-button>
      <el-button type="danger" size="default">批量删除</el-button>
    </template>
    <!-- card body -->
    <el-table border :data="userList">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="ID" width="120" align="center" prop="id"></el-table-column>
      <el-table-column label="用户名" width="120" align="center" prop="username"> </el-table-column>
      <el-table-column label="昵称" width="120" align="center" prop="nickname"> </el-table-column>
      <el-table-column label="头像" width="120" align="center" prop="avatar">
        <template #default="{ row }">
          <el-avatar :src="row.avatar" :size="50">
            <el-icon>
              <User />
            </el-icon>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="用户角色" width="120" align="center" prop="role">
        <template #default="{ row }">
          <el-tag :type="getRoleType(row.role)" effect="dark">
            {{ getRoleLabel(row.role) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="120" align="center" prop="phone"> </el-table-column>
      <el-table-column label="创建时间" width="160" align="center" prop="createdAt">
        <template #default="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="160" align="center" prop="updatedAt">
        <template #default="{ row }">
          {{ formatDate(row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="info" size="small">详情</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30]"
    size="large" :background="true" layout="prev, pager, next, jumper, ->, total, sizes" :total="total"
    style="margin-top: 20px;" @change="fetchUserList">
  </el-pagination>
 

  <el-drawer v-model="DrawerStatus" :before-close="handleClose">
    <template #header>
      <h4>{{ DrawerMode === "add" ? '添加用户' : '编辑用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="userform" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userform.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="userform.email" placeholder="请输入邮箱" clearable />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="userform.password" placeholder="请输入密码" clearable />
        </el-form-item>
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="userform.nickname" placeholder="请输入昵称" clearable />
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="userform.phone" placeholder="请输入手机号" clearable />
        </el-form-item>
        <el-form-item label="角色:" prop="role">
          <el-select v-model="userform.role" placeholder="请选择角色" style="width: 240px">
            <el-option label="管理员" value="admin" />
            <el-option label="编辑" value="editor" />
            <el-option label="用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="isActive">
          <el-radio-group v-model="userform.isActive">
            <el-radio :value="true" size="large">激活</el-radio>
            <el-radio :value="false" size="large">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { getUserList, type UserListItem } from '../../api/reqUserManagement'
import { User } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, type FormRules, type FormInstance } from 'element-plus'
import { updateUser, type updateUserRequest, addUser } from '../../api/reqUserManagement'

const form = reactive({
  name: ''
})
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const loading = ref(false)

const formRef = ref<FormInstance>()
const DrawerMode = ref<"add" | "edit">('add')
const DrawerStatus = ref(false)
const userList = ref<UserListItem[]>([])
const currentEditId = ref<string>()

const userform = reactive<updateUserRequest>({
  username: '',
  email: '',
  password: '',
  nickname: '',
  phone: '',
  role: '',
  isActive: true,
})

const rules = reactive<FormRules<updateUserRequest>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email' as const, message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  phone: [
    { message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ],
  isActive: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
})

// 格式化时间
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 获取角色标签类型
const getRoleType = (role: string | undefined) => {
  const roleMap: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
    'admin': 'danger',
    'user': 'success',
    'guest': 'info',
    'manager': 'warning'
  }
  return roleMap[role || ''] || 'info'
}

// 获取角色显示文本
const getRoleLabel = (role: string | undefined) => {
  const labelMap: Record<string, string> = {
    'admin': '管理员',
    'user': '普通用户',
    'guest': '访客',
    'manager': '经理'
  }
  return labelMap[role || ''] || role || '未知'
}

// 搜索处理
const handleSearch = () => {
  // 如果已经在第一页，手动触发搜索
  if (currentPage.value === 1) {
    fetchUserList()
  } else {
    // 否则改变页码
    currentPage.value = 1
  }
}

// 重置处理
const handleReset = () => {
  form.name = ''
  // 如果已经在第一页，手动触发搜索
  if (currentPage.value === 1) {
    fetchUserList()
  } else {
    // 否则改变页码
    currentPage.value = 1
  }
}

// 获取用户列表
const fetchUserList = async () => {
  try {
    loading.value = true
    const res = await getUserList({
      page: currentPage.value,
      limit: pageSize.value,
      search: form.name
    })

    if (res.success && res.data) {
      total.value = res.pagination.total
      userList.value = res.data
    } else {
      ElMessage.error(res.message || '获取用户列表失败')
    }
  } catch (err) {
    ElMessage.error((err as Error).message)
  } finally {
    loading.value = false
  }
}
// 清空表单
const clearForm = () => {
  Object.assign(userform, {
    username: '',
    email: '',
    password: '',
    nickname: '',
    phone: '',
    role: '',
    isActive: true,
  })
  formRef.value?.clearValidate()
}

// 处理添加
const handleAdd = () => {
  DrawerMode.value = 'add'
  DrawerStatus.value = true
  clearForm()
}

// 处理编辑
const handleEdit = (row: UserListItem) => {
  DrawerMode.value = 'edit'
  DrawerStatus.value = true
  currentEditId.value = row.id
  Object.assign(userform, {
    username: row.username,
    email: row.email,
    nickname: row.nickname,
    phone: row.phone,
    role: row.role,
    isActive: row.isActive
  })
}

// 处理提交（确认按钮）
const confirmClick = async () => {
  if (!formRef.value) return

  try {
    const valid = await formRef.value.validate()
    if (!valid) return

    // 过滤掉空字符串的字段，避免传递空字符串给后台
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(userform).filter(([_, value]) =>
        value !== '' && value !== null && value !== undefined
      )
    ) as unknown as updateUserRequest

    let res
    if (DrawerMode.value === 'add') {
      res = await addUser(filteredData)
    } else {
      res = await updateUser(currentEditId.value as string, filteredData)
    }

    if (res.success) {
      ElMessage.success(DrawerMode.value === 'add' ? '添加用户成功' : '修改用户成功')
      DrawerStatus.value = false
      clearForm()
      fetchUserList()
    } else {
      ElMessage.error(res.message || (DrawerMode.value === 'add' ? '添加用户失败' : '修改用户失败'))
    }
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  }
}

// 处理关闭
const handleClose = () => {
  ElMessageBox.confirm(
    '你确定要关闭吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    DrawerStatus.value = false
    clearForm()
  }).catch(() => {
    // 用户取消关闭
  })
}

onMounted(() => {
  fetchUserList()
})
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  align-items: center;
  gap: 10px;

  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>