<template>
  <div class="box">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="content">
      <div class="man">
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="bottom">
      <p class="text">男生<span>58%</span></p>
      <p class="text">女生<span>42%</span></p>
    </div>
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount } from "vue";
const echartsRef = ref(null);
let chartInstance: echarts.ECharts | null = null; // 保存图表实例的引用

onMounted(() => {
  initEcharts();
});

// 组件卸载前销毁图表实例
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose(); // 销毁图表，释放内存
    chartInstance = null;
  }
});
const initEcharts = () => {
  if (!echartsRef.value) return;
  chartInstance = echarts.init(echartsRef.value); // 将实例保存到外部变量
  const option = {
    // grid: 图表的绘图网格配置，控制图表在容器中的位置和大小
    grid: {
      left: "0%", // 左边距为0，让图表紧贴容器左边
      right: "0%", // 右边距为0，让图表紧贴容器右边
      top: "20%", // 上边距20%，给图表留出上方空间
      bottom: "20%", // 下边距20%，给图表留出下方空间
      containLabel: false, // 不包含坐标轴标签，因为我们隐藏了坐标轴
    },
    // xAxis: X轴配置（横向柱状图中，X轴表示数值）
    xAxis: {
      type: "value", // 数值轴类型，用于显示连续的数值
      show: false, // 隐藏X轴，不显示刻度线、标签等
      max: 100, // 设置最大值为100，因为我们用百分比（58+42=100）
    },
    // yAxis: Y轴配置（横向柱状图中，Y轴表示分类）
    yAxis: {
      type: "category", // 类目轴类型，用于显示离散的分类数据
      show: false, // 隐藏Y轴，不显示刻度线、标签等
      data: [""], // 只有一个空分类，因为我们只需要一条横向柱子
    },
    // series: 系列列表，每个系列代表一组数据
    series: [
      {
        name: "男生", // 系列名称，用于图例和tooltip
        type: "bar", // 柱状图类型
        stack: "total", // 堆叠标识，相同stack值的系列会堆叠在一起
        barWidth: "40px", // 柱子的宽度（这里是高度，因为是横向）
        data: [58], // 数据值，男生占58%
        // itemStyle: 图形样式配置
        itemStyle: {
          // color: 柱子的颜色，这里使用线性渐变
          color: {
            type: "linear", // 线性渐变类型
            x: 0, // 渐变起点的x坐标（0表示左边）
            y: 0, // 渐变起点的y坐标
            x2: 1, // 渐变终点的x坐标（1表示右边）
            y2: 0, // 渐变终点的y坐标（0表示水平渐变）
            // colorStops: 渐变的颜色断点
            colorStops: [
              { offset: 0, color: "#4facfe" }, // 0%位置的颜色（左边）
              { offset: 1, color: "#00f2fe" }, // 100%位置的颜色（右边）
            ],
          },
          // borderRadius: 圆角配置 [左上, 右上, 右下, 左下]
          // 横向柱状图中：[左侧上, 右侧上, 右侧下, 左侧下]
          borderRadius: [20, 0, 0, 20], // 只给左侧设置圆角
        },
        // label: 图形上的文本标签
        label: {
          show: false, // 不显示数值标签
        },
      },
      {
        name: "女生", // 系列名称
        type: "bar", // 柱状图类型
        stack: "total", // 与男生系列使用相同的stack，实现堆叠效果
        barWidth: "40px", // 柱子的宽度
        data: [42], // 数据值，女生占42%
        // itemStyle: 图形样式配置
        itemStyle: {
          // color: 粉色渐变
          color: {
            type: "linear", // 线性渐变
            x: 0, // 从左到右渐变
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#f093fb" }, // 左边粉紫色
              { offset: 1, color: "#f5576c" }, // 右边粉红色
            ],
          },
          borderRadius: [0, 20, 20, 0], // 只给右侧设置圆角
        },
        label: {
          show: false, // 不显示数值标签
        },
      },
    ],
  };
  chartInstance.setOption(option);
};

</script>

<style scoped lang="scss">
.box {
  margin: 10px 0;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
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
    }}
  .content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 40px;
    .man {
      width: 80px;
      height: 80px;
      background: url(../../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 80%;
        height: 80%;
      }
    }
    .woman {
      width: 80px;
      height: 80px;
      background: url(../../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 80%;
        height: 80%;
      }
    }
  }
  .bottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .text {
      font-size: 20px;
      color: #fff;
    }
  }
  .echarts {
    width: 100%;
    height: 50px;
    margin-top: 20px;
  }
}
</style>