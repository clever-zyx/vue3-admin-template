<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" class="layout-aside">
        <!-- <Aside :menuList="menuList"></Aside> -->
        <el-menu
          router
          :default-active="$route.path"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <AsideViewRecursion
            v-for="item in menuList"
            :key="item.path"
            :menu-list="item"
          />
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <div class="header-left">
            <!-- 折叠按钮 -->

            <el-icon
              @click="isCollapse = !isCollapse"
              style="margin-right: 15px; font-size: larger"
            >
              <component :is="isCollapse ? Expand : Fold"></component>
            </el-icon>
            <!-- 面包屑 -->
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item
                v-for="item in breadcrumbList"
                :key="item.path"
                :to="item.path"
              >
                {{ item.meta?.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="header-right">
            <el-button
              size="default"
              :icon="Refresh"
              :circle="true"
            ></el-button>
            <el-button
              size="default"
              :icon="FullScreen"
              :circle="true"
            ></el-button>
            <el-button
              size="default"
              :icon="Setting"
              :circle="true"
            ></el-button>
            <el-dropdown style="margin: 0 20px">
              <el-button size="default" :icon="User" :circle="true">
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>用户信息</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>admin</span>
          </div>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// import Aside from "@/components/AsideView.vue";
import AsideViewRecursion from "@/components/AsideViewRecursion.vue";
import { menuList } from "@/router/routes";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  Expand,
  Fold,
  ArrowRight,
  Setting,
  FullScreen,
  Refresh,
  User,
} from "@element-plus/icons-vue";
const isCollapse = ref(true);
const route = useRoute();

// 计算面包屑列表
const breadcrumbList = computed(() => {
  const matched = route.matched.filter((item) => item.meta?.title);
  
  // 如果当前不在首页，在面包屑前面加上首页
  if (route.path !== '/' && matched.length > 0 && matched[0].name !== 'home') {
    return [
      { path: '/', meta: { title: '首页' } },
      ...matched
    ];
  }
  
  return matched;
});
</script>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100vh;

  .layout-aside {
    transition: width 0.3s ease;
    overflow: hidden;
  }

  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

    .header-left {
      display: flex;
      align-items: center;
    }
  }
}
</style>
