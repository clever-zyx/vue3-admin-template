<template>
  <el-card>
    <el-table border empty-text="暂无数据" style="margin-bottom: 15px;">
      <el-table-column label="序号" width="180" align="center">
      </el-table-column>
      <el-table-column label="品牌" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
      </el-table-column>
    </el-table>
    <el-pagination 
      v-model:current-page="currentPage" 
      v-model:page-size="pageSize" 
      :page-sizes="[10, 15, 20, 30]"
      size="large" 
      :background="true" 
      layout="prev, pager, next, jumper, ->, total, sizes" 
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(50)
</script>

<style scoped lang="scss"></style>