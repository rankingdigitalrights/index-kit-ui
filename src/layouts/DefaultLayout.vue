<template>
  <n-layout-header v-if="isMobile" class="sticky-header">
    <div class="layout-header">
      <n-space align="center" justify="space-between" :wrap-item="false">
        <n-image
          :src="props.isDarkModeActive ? logoInvertedImg : logoImg"
          height="30"
          preview-disabled
          @click="goToHome"
        />
        <n-dropdown
          trigger="click"
          placement="right"
          size="small"
          :options="menuOptions"
        >
          <n-button text type="primary">
            <n-icon :size="30">
              <Elementor />
            </n-icon>
          </n-button>
        </n-dropdown>
      </n-space>
    </div>
  </n-layout-header>
  <div class="">
    <n-layout has-sider class="layout-top">
      <n-layout-sider class="hidden-mobile">
        <n-space align="center" justify="space-between" class="sidebar-logo">
          <n-image
            :src="props.isDarkModeActive ? logoInvertedImg : logoImg"
            height="60"
            preview-disabled
          />
        </n-space>
        <n-menu :options="menuOptions" />
      </n-layout-sider>
      <div class="layout-line hidden-mobile">&nbsp;</div>
      <router-view />
    </n-layout>
  </div>
  <AppFooter />
</template>

<script lang="ts" setup>
import {
  h,
  defineProps,
  defineEmits,
  onBeforeMount,
  onUnmounted,
  type Ref,
  ref,
  provide,
} from 'vue';
import { RouterLink } from 'vue-router';
import logoImg from '../assets/lab-logo.svg';
import logoInvertedImg from '../assets/lab-logo-white.svg';
import AppFooter from '../components/AppFooter.vue';
import { Sun, MoonRegular, Elementor } from '@vicons/fa';
import {
  NLayout,
  NLayoutSider,
  NMenu,
  NLayoutHeader,
  NDropdown,
  NButton,
  NImage,
  NIcon,
  NSpace,
} from 'naive-ui';

const isMobile: Ref<Boolean> = ref(false);

provide('isMobile', isMobile);

onBeforeMount(() => {
  window.addEventListener('resize', onResize);
  onResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

const props = defineProps<{
  isDarkModeActive: boolean;
}>();

const emit = defineEmits<{
  (e: 'changeTheme'): void;
}>();

function onResize() {
  if (window.innerWidth >= 768) {
    isMobile.value = false;
  } else {
    isMobile.value = true;
  }
}

// TODO Go to home
function goToHome() {
  console.log('go to home');
}

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
            name: 'ranking',
          },
          class: 'menu-link',
        },
        { default: () => 'General settings' }
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
        { default: () => 'Companies and services' }
      ),
    key: 'go-company',
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
        { default: () => 'Workspace setup' }
      ),
    key: 'go-about',
  },
  {
    key: 'divider',
    type: 'divider',
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

.layout-header {
  padding: 15px;
  border-bottom: 1px solid #e8e8e8;
}
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
