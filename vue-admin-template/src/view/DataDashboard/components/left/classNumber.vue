<template>
  <div class="box">
    <div class="top">
      <p class="title">班级人数</p>
      <p class="bg"></p>
      <div class="sumNumber">
        <span>总人数：</span>
        <span style="color: red">9999</span>
      </div>
      <div class="number">
        <span class="number-count" v-for="(item, index) in count" :key="index">
          {{ item }}
        </span>
      </div>
    </div>
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";
const count = ref("741616人");
const echartsRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

// 初始化图表
const initChart = () => {
  if (!echartsRef.value) return;
  chartInstance = echarts.init(echartsRef.value);
  const option = {
    series: [
      {
        type: "liquidFill",
        data: [0.03],
      },
    ],
  };

  chartInstance.setOption(option);
};

onMounted(() => {
  initChart();
});

// 组件卸载时销毁图表实例
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style lang="scss" scoped>
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    margin-right: 20px;
    .title {
      font-size: 20px;
      color: #fff;
    }
    .bg {
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      width: 68px;
      height: 7px;
      margin-top: 10px;
    }
    .sumNumber {
      font-size: 20px;
      color: #fff;
      display: flex;
      justify-content: flex-end;
    }
    .number {
      display: flex;
      margin-top: 30px;
      .number-count {
        height: 40px;
        line-height: 40px;
        flex: 1;
        font-size: 30px;
        text-align: center;
        color: #fff;
        background: url(../../images/total.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .echarts {
    margin-top: 10px;
    width: 100%;
    height: 250px;
  }
}
</style>