<template>
  <n-layout position="absolute" has-sider>
    <n-layout-sider>
      <div class="logo" style="padding: 24px;">
        <n-tag size="large" :bordered="false">
          RDR Toolkit
          <template #avatar>
            <n-avatar :src="logoImg" />
          </template>
        </n-tag>
      </div>
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
import logoImg from "../assets/logo-square.png"

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
        { default: () => 'Ranking editor' }
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
        { default: () => 'Companies editor' }
      ),
    key: 'go-company'
  }
]
</script>