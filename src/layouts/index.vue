<template>
  <n-layout position="absolute" has-sider>
    <n-layout-sider>
      <router-link to="/" custom>
        <img src="../assets/logo.png" style="max-width: 80%">
      </router-link>
      <n-menu :options="menuOptions" />
    </n-layout-sider>
    <n-layout>
      <router-view></router-view>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>

import { h } from 'vue'
import { RouterLink } from 'vue-router'

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home',
          }
        },
        { default: () => 'Go Home' }
      ),
    key: 'go-home'
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'about',
          }
        },
        { default: () => 'About this' }
      ),
    key: 'go-about'
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'ranking',
          }
        },
        { default: () => 'Configure ranking' }
      ),
    key: 'go-ranking'
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'company',
          }
        },
        { default: () => 'About company' }
      ),
    key: 'go-company'
  }
]
</script>