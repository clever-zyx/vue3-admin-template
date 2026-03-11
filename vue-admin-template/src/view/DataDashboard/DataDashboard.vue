<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <classNumber class="classNumber"></classNumber>
          <gradeNumber class="gradeNumber"></gradeNumber>
          <majorNumber class="majorNumber"></majorNumber>
        </div>
        <div class="center">
          <Map class="Map"></Map>
          <Foot class="Foot"></Foot>
        </div>
        <div class="right">right</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import Top from "./components/top.vue";
import classNumber from "./components/left/classNumber.vue";
import gradeNumber from "./components/left/gradeNumber.vue";
import majorNumber from "./components/left/majorNumber.vue";
import Map from "./components/center/map.vue";
import Foot from "./components/center/foot.vue";
const screen = ref();

// 获取屏幕宽高
const getScreenWH = (w = 1920, h = 1080) => {
  const screenWidth = window.innerWidth / w;
  const screenHeight = window.innerHeight / h;
  return screenWidth < screenHeight ? screenWidth : screenHeight;
};
const updateScreen = () => {
  screen.value.style.transform = `translate(-50%, -50%) scale(${getScreenWH()}) `;
};
onMounted(() => {
  nextTick(() => {
    updateScreen();
  });
  window.addEventListener("resize", updateScreen);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateScreen);
});
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    top: 50%;
    left: 50%;
    // background-color: pink;

    .top {
      // width: 100%;
      height: 108px;
      // background-color: #fff;
    }

    .bottom {
      display: flex;
      height: 972px;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .classNumber {
          flex: 1.3;
        }
        .gradeNumber {
          flex: 1;
        }
        .majorNumber {
          flex: 1;
        }
      }

      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .Map {
          flex: 4;
  
        }
        .Foot {
          flex: 1.5;
          
        }
      }

      .right {
        flex: 1;
        background-color: red;
      }
    }
  }
}
</style>