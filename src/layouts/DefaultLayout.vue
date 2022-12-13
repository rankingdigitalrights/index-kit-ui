<template>
  <div class="container">
    <div class="sidebar-logo">
      <n-image :src="logoImg" height="60" preview-disabled />
    </div>
    <n-layout has-sider class="layout-top">
      <n-layout-sider width="15%">
        <br />
        <n-menu :options="menuOptions" />
      </n-layout-sider>
      <div class="layout-line">&nbsp;</div>
      <router-view />
    </n-layout>
  </div>
  <n-layout-footer>
    <AppFooter />
  </n-layout-footer>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { RouterLink } from 'vue-router';
import logoImg from '../assets/logo.png';
import AppFooter from '../components/AppFooter.vue';

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home',
          },
          class: 'menu-link',
        },
        { default: () => 'Home' }
      ),
    key: 'go-home',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'about',
          },
          class: 'menu-link',
        },
        { default: () => 'About' }
      ),
    key: 'go-about',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'ranking',
          },
          class: 'menu-link',
        },
        { default: () => 'Ranking editor' }
      ),
    key: 'go-ranking',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'company',
          },
          class: 'menu-link',
        },
        { default: () => 'Companies editor' }
      ),
    key: 'go-company',
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

.sidebar-logo {
  height: 120px;
  display: flex;
  padding-left: 30px;
  align-items: center;
}
</style>
