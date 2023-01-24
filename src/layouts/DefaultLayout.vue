<template>
  <div class="">
    <n-layout has-sider class="layout-top">
      <n-layout-sider width="20%">
        <n-space align="center" justify="space-between" class="sidebar-logo">
          <n-image
            :src="props.isDarkModeActive ? logoInvertedImg : logoImg"
            height="60"
            preview-disabled
          />
        </n-space>
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
import { h, defineProps, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
import logoImg from '../assets/lab-logo.svg';
import logoInvertedImg from '../assets/lab-logo-white.svg';
import AppFooter from '../components/AppFooter.vue';
import { Sun, MoonRegular } from '@vicons/fa';
import {
  NLayout,
  NLayoutSider,
  NMenu,
  NLayoutFooter,
  NImage,
  NIcon,
  NSpace,
} from 'naive-ui';

const props = defineProps<{
  isDarkModeActive: boolean;
}>();

const emit = defineEmits<{
  (e: 'changeTheme'): void;
}>();

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
  {
    key: 'toggle-theme',
    label: () =>
      h(
        'a',
        {
          // class: 'menu-link',
          onClick: () => emit('changeTheme'),
        },
        {
          default: () => {
            if (props.isDarkModeActive) return 'Dark mode';
            else return 'Light mode';
          },
        }
      ),
    icon: () =>
      h(
        NIcon,
        {},
        {
          default: () => {
            if (props.isDarkModeActive) return h(MoonRegular);
            else return h(Sun);
          },
        }
      ),
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
  min-height: calc(100vh - 120px);
  display: flex;
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
