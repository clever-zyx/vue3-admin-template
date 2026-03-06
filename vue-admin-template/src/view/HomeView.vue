<template>
  <div>
    <el-card :body-style="{ padding: '20px' }">
      <div class="home">
        <el-avatar :src="userInfo?.avatar" size="large" />
        <div style="margin-left: 40px;">
          <h3  style="margin-bottom: 15px;">{{ getTimeGreeting() }}，{{ userInfo?.username || '用户' }}</h3>
          <span >后台管理模板</span>
        </div>
      </div>
    </el-card>



  </div>

</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user/useUser'
import { getTimeGreeting } from '@/utils/time'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
</script>

<style scoped lang="scss">
.home {
  display: flex;
  align-items: center;
}


</style>