<template>
  <div class="top">
    <div class="left">
      <span class="page-title" @click="goHome">首页</span>
    </div>
    <div class="center">
      <span class="page-center-title">数据看板</span>
    </div>
    <div class="right">
      <span class="page-right-title">统计报告</span>
      <span class="page-right-time">{{ currentTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRealTime } from '@/utils/time'
import { useRouter } from 'vue-router'
const { currentTime } = useRealTime('YYYY.MM.DD HH:mm')
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.top {
  display: flex;

  .left {
    height: 54px;
    flex: 1;
    background: url(../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .page-title {
      width: 170px;
      background: url(../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: cover;
      color: #fff;
      font-size: 30px;
      line-height: 50px;
      text-align: center
    }
  }

  .center {
    flex: 3;

    .page-center-title {
      display: block;
      width: 100%;
      height: 108px;
      background: url(../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: cover;
      color: #fff;
      font-size: 45px;
      line-height: 108px;
      text-align: center;
    }

  }

  .right {
    flex: 1;
    background: url(../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    height: 54px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .page-right-title {
      width: 170px;

      background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: cover;
      color: #fff;
      font-size: 30px;
      line-height: 50px;
      text-align: center
    }

    .page-right-time {
      align-items: center;
      line-height: 50px;
      margin-left: 40px;
      color: #fff;
    }
  }
}
</style>