<template>
  <div class="login-container">
    <el-form class="login-form" :model="useForm" ref="loginFormRef" :rules="rules">
      <h1>管理系统模板</h1>
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" :prefix-icon="User" v-model="useForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" :prefix-icon="Lock" v-model="useForm.password" type="password" show-password
          @keyup.enter="goLogin">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="login-btn" type="primary" @click="goLogin">登录</el-button>
      </el-form-item>
    </el-form>



  </div>
</template>

<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLogin } from '@/api/useLogin'
import { ElMessage, ElNotification } from 'element-plus'
import { useUserStore } from "@/stores/user/useUser";
const loginFormRef = ref()
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const useForm = reactive({
  username: '',
  password: '',
})

// }
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能小于3个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6个字符', trigger: 'blur' }
  ]
}

const goLogin = async () => {
  await loginFormRef.value.validate()

  loading.value = true
  try {

    const res = await useLogin(useForm)
    // console.log(res);
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('userInfo', JSON.stringify(res.data.user))
    useUserStore().setToken(res.data.token)
    useUserStore().setUserInfo(res.data.user)
    ElNotification({ message: '登录成功', type: 'success' })
    
    // 登录成功后，跳转到用户原本想访问的页面
    const redirect = route.query.redirect as string
    router.push(redirect || '/')
    loading.value = false

  } catch (error: any) {
    loading.value = false
    // 检查是否有 response 数据
    if (error.response?.data) {
      const { message } = error.response.data
      ElMessage.error(message || '用户名或密码错误')
    } else {
      ElMessage.error('网络异常，请检查网络连接')
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url(../assets/image.png);
  background-size: cover;
  background-position: center;
  padding: 0 auto;

  .login-form {
    position: relative;
    top: 30vh;
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>