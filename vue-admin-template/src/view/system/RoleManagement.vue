<template>

  <!-- 头部 -->
  <el-card shadow="always" style="margin-bottom: 20px;">
    <el-form :model="form" label-width="80px" :inline="true" size="default" class="Heardform"
      @submit.prevent="handleSearch">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名"></el-input>
      </el-form-item>
      <el-form-item size="default">
        <el-button type="primary" size="default" @click="handleSearch">搜索</el-button>
        <el-button type="default" size="default" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>


  </el-card>
  <!-- table -->
  <el-card shadow="always">
    <el-table :data="tableData" style="width: 100%" size="small" border>
      <el-table-column prop="id" label="ID" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="角色名" width="180" align="center">
      </el-table-column>
      <el-table-column prop="displayName" label="显示内容" align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" width="180" align="center">
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="180" align="center">
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="180" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="default" @click="handleGrant(row)">分配权限</el-button>
          <el-button type="danger" size="default" @click="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30]"
      size="large" :background="true" layout="prev, pager, next, jumper, ->, total, sizes" :total="total"
      style="margin-top: 20px;" @change="getRoleList">
    </el-pagination>
  </el-card>
  <!-- 抽屉 -->
  <el-drawer title="分配权限" v-model="drawer" direction="rtl" size="30%" :before-close="handleClose">
    <el-tree
      ref="treeRef"
      style="max-width: 600px"
      :data="MenuList"
      :props="defaultProps"
      :default-expand-all="true"
      :default-checked-keys="menuIds"
      show-checkbox
      node-key="id"
    />

    <template #footer>
      <div style="flex: auto">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </template>
  </el-drawer>

</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getUesRoleList, type RoleListItem, getRoleInfo as fetchRoleInfo } from "@/api/reqRoleMangement";
import { reqMenuList, type MenuListItem } from "@/api/reqMenuManagement";
import { ElMessage, ElMessageBox } from "element-plus";
import type { ElTree } from 'element-plus'

const form = ref({ name: '' })
const tableData = ref<RoleListItem[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const drawer = ref(false)
const MenuList = ref<MenuListItem[]>([])
const defaultProps = {
  children: 'children',
  label: 'title',
}
const menuIds = ref<string[]>([])
const currentRoleId = ref<string>('')
const treeRef = ref<InstanceType<typeof ElTree>>()
onMounted(() => {
  getRoleList()
})
// 搜索处理
const handleSearch = () => {
  // 如果已经在第一页，手动触发搜索
  if (currentPage.value === 1) {
    getRoleList()
  } else {
    // 否则改变页码
    currentPage.value = 1
  }
}

// 重置处理
const handleReset = () => {
  form.value.name = ''
  // 如果已经在第一页，手动触发搜索
  if (currentPage.value === 1) {
    getRoleList()
  } else {
    // 否则改变页码
    currentPage.value = 1
  }
}


// 获取角色列表
const getRoleList = async () => {
  try {
    const res = await getUesRoleList({
      page: currentPage.value,
      limit: pageSize.value,
      search: form.value.name
    })
    tableData.value = res.data
    total.value = res.pagination.total
  } catch (err) {
    ElMessage.error((err as Error).message)
  }

}
// 处理分配权限
const handleGrant = async (row: RoleListItem) => {
  currentRoleId.value = row.id || ''
  drawer.value = true

  // 并行获取菜单列表和角色信息
  await Promise.all([
    getMenuList(),
    getRoleInfoData(row.id || '')
  ])
}

//获取菜单列表
const getMenuList = async () => {
  try {
    const res = await reqMenuList()
    if (res.success && res.data) {
      MenuList.value = res.data
    }
  } catch (err) {
    ElMessage.error((err as Error).message)
  }
}

//获取角色信息
const getRoleInfoData = async (id: string) => {
  try {
    const res = await fetchRoleInfo(id)
    if (res.success && res.data) {
      menuIds.value = res.data.menuIds
    }
  } catch (err) {
    ElMessage.error((err as Error).message)
  }
}

//处理提交
const handleSubmit = () => {
  // 获取选中的节点（包括半选中的父节点）
  const checkedKeys = treeRef.value?.getCheckedKeys() || []
  const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys() || []
  const allSelectedIds = [...checkedKeys, ...halfCheckedKeys]

  console.log('选中的菜单ID:', allSelectedIds)
  console.log('当前角色ID:', currentRoleId.value)

  // TODO: 调用更新角色权限的接口
  // await updateRolePermissions(currentRoleId.value, allSelectedIds)

  ElMessage.success('权限分配成功')
  drawer.value = false
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
    drawer.value = false
  }).catch(() => {
    // 用户取消关闭
  })
}
// 处理删除
const handleRemove = (row: RoleListItem) => {
  console.log(row)
}
</script>

<style scoped lang="scss">
.Heardform {
  display: flex;
  align-items: center;
  gap: 30px;

}

:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>