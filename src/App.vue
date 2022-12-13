<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue';
import {
  NConfigProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  type GlobalThemeOverrides,
} from 'naive-ui';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily:
      '"Poppins", v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFamilyMono:
      'v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace',
  },
  Menu: {
    itemColorHover: 'rgba(255, 255, 255, 0)',
    itemTextColor: '#1c5275',
    itemColorActive: 'rgba(255, 255, 255, 0)',
    itemColorActiveHover: 'rgba(255, 255, 255, 0)',
    // itemTextColorActiveHover: "#eb6a5b",
    itemTextColorActiveHover: '#1c5275',
    // itemTextColorActive: "#eb6a5b",
    itemTextColorActive: '#1c5275',
    itemTextColorHover: '#eb6a5b',
  },
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-global-style />
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <DefaultLayout></DefaultLayout>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
