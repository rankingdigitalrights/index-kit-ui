<template>
  <div class="container">
    <div class="sidebar-logo">
      <n-image :src="logoImg" height="60" preview-disabled />
    </div>
    <n-layout has-sider class="layout-top">
      <n-layout-sider class="layout-sider" width="15%">
        <br />
        <n-menu :options="menuOptions" />
      </n-layout-sider>
      <div class="line">&nbsp;</div>
      <n-layout-content
        :native-scrollbar="false"
        class="main-content"
        width="55%"
      >
        <div class="section-content">
          <router-view />
        </div>
      </n-layout-content>
      <div class="line" v-show="showHelpSider">&nbsp;</div>
      <n-layout-sider
        width="25%"
        class="side-content"
        :native-scrollbar="false"
        v-show="showHelpSider"
      >
        sasdsaddas
        <h1>Hello</h1>
        <!-- lorem ipsum -->
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, quod, quia, voluptatibus quae voluptatem quibusdam
          voluptatum quos quidem natus quas. Quisquam, quae. Quisquam, quae.
          Quisquam, quae. Quisquam, quae.
        </p>
      </n-layout-sider>
    </n-layout>
  </div>
  <n-layout-footer>
    <AppFooter />
  </n-layout-footer>
</template>

<script lang="ts" setup>
import { h, ref, computed } from "vue";
import { RouterLink } from "vue-router";
import logoImg from "../assets/logo.png";
import AppFooter from "../components/AppFooter.vue";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();

const showHelpSider = computed(() => appStore.showHelpSider);

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "home",
          },
          class: "menu-link",
        },
        { default: () => "Go Home" }
      ),
    key: "go-home",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "about",
          },
          class: "menu-link",
        },
        { default: () => "About this" }
      ),
    key: "go-about",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "ranking",
          },
          class: "menu-link",
        },
        { default: () => "Ranking editor" }
      ),
    key: "go-ranking",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "company",
          },
          class: "menu-link",
        },
        { default: () => "Companies editor" }
      ),
    key: "go-company",
  },
];
</script>

<style lang="scss" scoped>
.n-layout-footer {
  background: #1c5275;
  color: #fff;
  padding: 24px;
  height: 120px;
}
.layout-top {
  height: calc(100vh - 120px - 120px);
  box-sizing: border-box;
  // padding-top: 30px;
}

.layout-sider {
}

.main-content,
.side-content {
}


.sidebar-logo {
  height: 120px;
  display: flex;
  padding-left: 30px;
  align-items: center;
}
.line {
  // width: 3px;
  // margin: 0 10px;
  min-height: 250px;
  height: 100%;
  background-color: #eb6a5b;
  // flex: auto;
}
.section-content {
  padding: 0 30px 50px 30px;
  margin: 0 auto;
}
</style>
