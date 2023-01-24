<template>
  <div class="container" style="height: 100%">
    <n-grid x-gap="12" :cols="2" style="height: 100%">
      <n-gi class="grid-item">
        <div>
          <a href="https://google.com" target="_blank">Privacy policy</a>
          <br />
          <p>
            <a href="https://twitter.com/rankingrights" target="_blank">
              <n-icon size="24">
                <Twitter />
              </n-icon>
            </a>
            <a
              href="https://www.linkedin.com/company/ranking-digital-rights/"
              target="_blank"
            >
              <n-icon size="24">
                <Linkedin />
              </n-icon>
            </a>
            <a
              href="https://creativecommons.org/licenses/by/4.0/legalcode"
              target="_blank"
            >
              <n-space inline size="small">
                <n-icon size="24">
                  <CreativeCommons />
                </n-icon>
                <n-icon size="24">
                  <CreativeCommonsBy />
                </n-icon>
              </n-space>
            </a>
          </p>
        </div>
      </n-gi>
      <n-gi class="grid-item right">
        <n-image :src="logoInvertedImg" height="60" preview-disabled />
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { NGrid, NGi, NIcon, NImage, NSpace } from 'naive-ui';
import {
  Twitter,
  Linkedin,
  CreativeCommons,
  CreativeCommonsBy,
} from '@vicons/fa';
import logoInvertedImg from '../assets/logo-inverted.png';
</script>

<style lang="scss" scoped>
.grid-item {
  display: flex;
  align-items: center;
  &.right {
    justify-content: right;
  }
}

a {
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #eb6a5b;
  }
  // make a space but not for the first one
  &:not(:first-child) {
    margin-left: 1rem;
  }
}
</style>
