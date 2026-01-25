<template>
  <el-menu router default-active="home">
    <template v-for="item in menuList" :key="item.path">
      <!-- 一级菜单 -->
      <el-menu-item :index="item.path" v-if="!item.children || item.children.length === 0">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-sub-menu :index="item.path" v-else>
        <template #title>
           <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
          {{ item.meta.title}}
        </template>
        <el-menu-item :index="child.path" v-for="child in item.children" :key="child.path">
          <el-icon>
            <component :is="child.meta.icon"></component>
          </el-icon>
         <span> {{ child.meta.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>

</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>

<style scoped lang="scss"></style>