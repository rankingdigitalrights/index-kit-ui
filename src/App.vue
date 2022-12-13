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
  Input: {
    border: '1px solid #1c5275',
    borderHover: '1px solid #eb6a5b',
    borderFocus: '1px solid #eb6a5b',
    boxShadowFocus: '0 0 0 2px rgba(235, 106, 91, 0.3)',
  },
  Checkbox: {
    border: '2px solid #1c5275',
    colorChecked: '#eb6a5b',
    borderDisabled: '2px solid rgb(224,224,230)',
    borderDisabledChecked: '2px solid rgb(224,224,230)',
    borderChecked: '2px solid rgb(235, 106, 91)',
    boxShadowFocus: '0 0 0 2px rgba(235, 106, 91, 0.3)',
  },
  Switch: {
    railColorActive: '#eb6a5b',
    railColor: '#1c5275',
    boxShadowFocus: '0 0 0 2px rgba(235, 106, 91, 0.2)',
  },
  Slider: {
    fillColor: '#eb6a5b',
    fillColorHover: '#eb6a5b',
  },
  Button: {
    colorPrimary: '#eb6a5bff',
    colorHoverPrimary: '#AD4135FF',
    colorPressedPrimary: '#851E12FF',
    colorFocusPrimary: '#AD4135FF',
    colorDisabledPrimary: '#A02618FF',
    borderPrimary: '#eb6a5bff',
    textColorTextPrimary: '#9F2618FF',
    textColorTextHoverPrimary: '#B04134FF',
    textColorTextPressedPrimary: '#78160BFF',
    textColorTextFocusPrimary: '#AD4135FF',
    textColorGhostPrimary: '#A32617FF',
    textColorGhostPressedPrimary: '#78160BFF',
    textColorGhostDisabledPrimary: '#EB6A5BFF',
    textColorGhostFocusPrimary: '#AD4135FF',
    textColorGhostHoverPrimary: '#AD4135FF',
    rippleColorPrimary: '#eb6a5bff',
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
