<script setup lang="ts">
import { ref, type Ref, computed } from 'vue';
import DefaultLayout from './layouts/DefaultLayout.vue';
import {
  NConfigProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  type GlobalTheme,
  darkTheme,
} from 'naive-ui';

import { lightThemeOverride, darkThemeOverride } from './themes.js';

let activeTheme: Ref<GlobalTheme | null> = ref(null);

// a computed value that return the correct override
const themeOverrides = computed(() => {
  // if activeTheme.value is different to null, its dark theme, so return darkThemeOverride
  return activeTheme.value ? darkThemeOverride : lightThemeOverride;
});

const isDarkModeActive = computed(() => {
  return activeTheme.value ? true : false;
});

// a function that toggle the theme
const toggleTheme = () => {
  // if activeTheme.value is null, set it to darkTheme, otherwise set it to null
  activeTheme.value = activeTheme.value ? null : darkTheme;
};
</script>

<template>
  <n-config-provider :theme="activeTheme" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <DefaultLayout
              :isDarkModeActive="isDarkModeActive"
              @changeTheme="toggleTheme"
            ></DefaultLayout>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
