<template>
  <div ref="echartsRef">1111111111</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import ChinaJson from "./ChinaJson.json";
const echartsRef = ref();
let echartsInstance: echarts.ECharts | null = null;
echarts.registerMap("china", ChinaJson as any);
onMounted(() => {
  initChart();
});

const geoCoordMap = {},
  data = [];
ChinaJson.features.forEach(function (item, index) {
  const name = item.properties.name,
    cp = item.properties.center;
  if (cp) {
    geoCoordMap[name] = cp; // 地区经纬度
    data.push({
      name: name,
      value: cp.concat(Math.round(Math.random() * 100)),
    });
  }
});
const data1 = [
  {
    name: "北京",
    value: [116.405285, 39.904989, 116.405285, 39.904989, 49],
  },
  {
    name: "天津",
    value: [117.190182, 39.125596, 117.190182, 39.125596, 18],
  },
  {
    name: "河北",
    value: [114.502461, 38.045474, 114.502461, 38.045474, 97],
  },
  {
    name: "山西",
    value: [112.549248, 37.857014, 112.549248, 37.857014, 85],
  },
  {
    name: "内蒙古",
    value: [111.670801, 40.818311, 111.670801, 40.818311, 83],
  },
];
const initChart = () => {
  echartsInstance = echarts.init(echartsRef.value);
  const option = {
    tooltip: {
      trigger: "item",
      formatter: function (params, ticket, callback) {
        if (params.seriesType == "scatter") {
          return "线路：" + params.data.name + "" + params.data.value[2];
        } else if (params.seriesType == "lines") {
          return (
            params.data.fromName +
            ">" +
            params.data.toName +
            "<br />" +
            params.data.value
          );
        }
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      left: "left",
      top: "bottom",
      text: ["高", "低"], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: ["#004693"], // 蓝绿
      },
    },
    geo: {
      show: true,
      map: "china",
      roam: "scale",
      zoom: 1.25,
      label: {
        show: true,
        padding: 4,
        color: "#ddd",
        fontFamily: "pf-zh",
      },
      itemStyle: {
        normal: {
          areaColor: "#031525",
          borderWidth: 1,
          borderColor: "#00CFFC",
        },
        emphasis: {
          areaColor: "#2B91B7",
        },
      },
    },
    series: [
      {
        type: "map",
        map: "china",
        geoIndex: 0,
        roam: false,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: true,
          },
          emphasis: {
            show: false,
            textStyle: {
              color: "#fff",
            },
          },
        },
        itemStyle: {
          normal: {
            areaColor: "#031525",
            borderColor: "#3B5077",
          },
          emphasis: {
            areaColor: "#2B91B7",
          },
        },
        animation: false,
        data: data1,
      },
      // 散点
      {
        name: "散点",
        type: "scatter",
        coordinateSystem: "geo",
        symbolSize: 5,
        label: {
          normal: {
            show: false,
            position: "right",
          },
        },
        itemStyle: {
          normal: {
            color: "red",
          },
        },
        zlevel: 10,
        data: data1,
      },
      {
        name: "点",
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "pin", //气泡
        symbolSize: function (val) {
          return 40;
        },
        label: {
          show: true,
          formatter: function (parm) {
            return parm.value[4];
          },
          textStyle: {
            color: "#fff",
          },
        },
        itemStyle: {
          color: "#F62157", //标志颜色
        },
        zlevel: 6,
        data: data1,
      },
    ],
  };
  echartsInstance.setOption(option);
};
</script>

<style>
</style>