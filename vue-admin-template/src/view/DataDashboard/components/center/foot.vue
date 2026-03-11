<template>
  <div class="box">
    <div class="top">
      <p class="title">专业人数</p>
      <p class="bg"></p>
    </div>
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
const echartsRef = ref(null);

onMounted(() => {
  initChart();
});
const initChart = () => {
  const myChart = echarts.init(echartsRef.value);
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false,
      axisTick: {
        show: false
      },
    },
    yAxis: {
      type: 'value',
        splitLine: {
        show: false
      }
    },
    series: [
      {
        type:'line',
        smooth: true,
        areaStyle:{
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 255, 255, 0.2)'
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 255, 0)'
            }
          ])
        },
        data: [
          {value: 10, name: 'A'},
          {value: 70, name: 'B'},
          {value: 30, name: 'C'},
          {value: 40, name: 'D'},
          {value: 90, name: 'E'},
          {value: 60, name: 'F'},
          {value: 70, name: 'G'},
        ],

      }],
    grid:{
      left: '10%',
      right: '10%',
      bottom: '10%',
      top: '20%',
      containLabel: true
    }
  };
  myChart.setOption(option);
};
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 0 10px;
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
  }
  .echarts {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>