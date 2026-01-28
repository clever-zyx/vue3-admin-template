<template>

    <!-- 没有子菜单，渲染菜单项 -->
  <el-menu-item
    v-if="!menuList.children || menuList.children.length === 0"
    :index="menuList.path || '/'"
  >
    <el-icon>
      <component :is="menuList.meta?.icon"></component>
    </el-icon>
    <span>{{ menuList.meta?.title }}</span>
  </el-menu-item>

  <!-- 有子菜单，渲染子菜单并递归 -->
  <el-sub-menu v-else :index="menuList.path">
    <template #title>
      <el-icon>
        <component :is="menuList.meta?.icon"></component>
      </el-icon>
      <span>{{ menuList.meta?.title }}</span>
    </template>
    <!-- 递归渲染子菜单 -->
    <AsideViewRecursion
      v-for="child in menuList.children"
      :key="child.path"
      :menu-list="child"
    />
  </el-sub-menu>

</template>                   

<script setup lang="ts">
import type { Component } from "vue";

interface MenuItem {
  path: string;
  name?: string;
  meta?: {
    title?: string;
    icon?: Component;
    keepAlive?: boolean;
  };
  redirect?: string;
  component?: () => Promise<unknown>;
  children?: MenuItem[];
}

// 定义组件名称以便自引用
defineOptions({
  name: "AsideViewRecursion",
});

defineProps<{
  menuList: MenuItem;

}>();
</script>

<style scoped lang="scss">

</style>