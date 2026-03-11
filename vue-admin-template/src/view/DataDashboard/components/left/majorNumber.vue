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
import { onBeforeUnmount, onMounted, ref } from "vue";
import * as echarts from "echarts";
const echartsRef = ref(null);
let echartsInstance: echarts.ECharts | null = null;
onMounted(() => {
  initChart();
});
onBeforeUnmount(() => {
  echartsInstance?.dispose();
  echartsInstance = null;
});
const initChart = () => {
  echartsInstance = echarts.init(echartsRef.value);
  const option = {
    // 提示框组件：鼠标悬停时显示的信息框
    tooltip: {
      trigger: "item", // 触发类型：'item'数据项触发，适用于饼图；'axis'坐标轴触发，适用于柱状图/折线图
    },
    // 图例组件：用于筛选和标识不同系列
    legend: {
      orient: "vertical", // 图例布局朝向：'vertical'垂直/'horizontal'水平
      right: "10%", // 图例距离容器右侧的距离
      top: "center", // 图例垂直居中
      textStyle: {
        color: "#fff", // 图例文字颜色
        fontSize: 12, // 图例文字大小
      },
    },
    // 系列列表：每个系列通过 type 决定图表类型
    series: [
      {
        name: "专业人数", // 系列名称，用于 tooltip 的显示和 legend 的图例筛选
        type: "pie", // 图表类型：'pie'饼图、'bar'柱状图、'line'折线图等
        radius: ["40%", "70%"], // 饼图半径：[内半径, 外半径]，设置两个值形成环形图；单个值为实心饼图
        center: ["35%", "60%"], // 饼图中心位置：[水平位置, 垂直位置]，调整垂直位置向下移动
        avoidLabelOverlap: false, // 是否启用防止标签重叠策略，false 时标签可能会重叠
        // 图形样式
        itemStyle: {
          borderRadius: 10, // 扇区圆角半径，单位px，让饼图扇区边缘圆润
          borderColor: "#fff", // 扇区边框颜色
          borderWidth: 2, // 扇区边框宽度，单位px
        },
        // 饼图图形上的文本标签
        label: {
          show: false, // 是否显示标签，false 则默认不显示扇区名称和数值
          position: "inside", // 标签位置：'outside'外部/'inside'内部/'center'中心
 
          fontSize: 12, // 标签字体大小，单位px
        },
        // 高亮状态：鼠标悬停时的样式
        emphasis: {
          label: {
            show: true, // 高亮时显示标签
            fontSize: 20, // 高亮时标签字体大小，单位px
            fontWeight: "bold", // 高亮时标签字体粗细：'normal'/'bold'/'bolder'/'lighter' 或数字
          },
        },
        // 标签的视觉引导线
        labelLine: {
          show: false, // 是否显示引导线，false 则不显示连接标签和扇区的线
        },
        // 系列中的数据内容数组
        data: [
          { value: 1048, name: "Search Engine" }, // value: 数据值，name: 数据项名称
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
     
  };
  echartsInstance.setOption(option);
};
</script>

<style scoped lang = "scss">
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
}}
.echarts {
  width: 100%;
  height: 200px;
}
</style>