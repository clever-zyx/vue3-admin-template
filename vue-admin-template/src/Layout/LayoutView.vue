<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" class="layout-aside">
        <!-- <Aside :menuList="menuList"></Aside> -->
        <el-menu router :default-active="$route.path" :collapse="isCollapse" :collapse-transition="false"
          background-color="#2e3f52" text-color="#fff" active-text-color="#66a0f8"
          style="border-radius: 0;height: 100vh;"
          >
          <AsideViewRecursion v-for="item in menuList" :key="item.path" :menu-list="item" />
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <div class="header-left">

            <!-- 折叠按钮 -->
            <el-icon @click="isCollapse = !isCollapse" style="margin-right: 15px; font-size: larger">
              <component :is="isCollapse ? Expand : Fold"></component>
            </el-icon>

            <!-- 面包屑 -->
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="item.path">
                <span>{{ item.meta?.title }}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="header-right">

            <!-- 刷新按钮  -->
            <el-button size="default" :icon="Refresh" :circle="true" @click="refresh"></el-button>
            <!-- 全屏按钮 -->
            <el-button size="default" :icon="FullScreen" :circle="true" @click="toggleFullScreen"></el-button>
            <!-- 设置按钮 -->
            <el-button size="default" :icon="Setting" :circle="true"></el-button>
            <!-- 用户按钮 -->
            <div class="headPortrait">
              <img :src="userInfo?.avatar || '/favicon.ico'" alt="用户头像">
            </div>
            <!-- <el-dropdown style="margin: 0 20px">
                <span>admin</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>用户信息</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
</el-dropdown> -->
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ userInfo?.username || '用户' }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>用户信息</el-dropdown-item>
                  <el-dropdown-item @click="LogOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main v-if="stateRefresh"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// import Aside from "@/components/AsideView.vue";
import AsideViewRecursion from "@/components/AsideViewRecursion.vue";
import { menuList } from "@/router/routes";
import { ref, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user/useUser";
import { useLogout } from "@/api/useLogin";
import {
  Expand,
  Fold,
  ArrowRight,
  Setting,
  FullScreen,
  Refresh,

  ArrowDown
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";



const isCollapse = ref(false);
const route = useRoute();
const stateRefresh = ref(true)

const userInfo = useUserStore().userInfo
console.log(userInfo);
// 计算面包屑列表
const breadcrumbList = computed(() => {
  const matched = route.matched.filter((item) => item.meta?.title);

  // 如果当前不在首页，在面包屑前面加上首页
  if (route.path !== '/' && matched.length > 0 && matched[0]?.name !== 'home') {
    return [
      { path: '/', meta: { title: '首页' } },
      ...matched
    ];
  }

  return matched;
});

// 刷新页面
const refresh = async () => {
  stateRefresh.value = false;
  await nextTick();
  // 添加一个短暂延迟，让用户看到刷新效果
  setTimeout(() => {
    stateRefresh.value = true;
  }, 200);
};
// 全屏
const toggleFullScreen = () => {
  const full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 退出登录
const LogOut = async () => {

  try {
    await useLogout()
    await useUserStore().lougout()
  } catch (error) {
    ElMessage.error(error.message || '退出登录失败')
  }
}

</script>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100vh;

  .layout-aside {
    height: 100vh;
    transition: width 0.3s ease;
    overflow: hidden;
  }

  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ededed;



    .header-left {
      display: flex;
      align-items: center;
    }

    .header-right {
      display: flex;
      align-items: center;
      justify-content: space-around;

      .headPortrait {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #fff;
        margin: 0 10px 0px 15px;
        overflow: hidden;
        // display: flex;
        // justify-content: center;  
        // align-items: center;
      }
    }
  }
}
</style>
