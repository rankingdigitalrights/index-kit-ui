<template>
  <div class="container" style="height: 100%">
    <n-grid x-gap="12" :cols="2" style="height: 100%">
      <n-gi class="grid-item">
        <div>
          <a href="https://google.com" target="_blank">Privacy policy</a>
          <br />
          <p>
            <a href="https://google.com" target="_blank">
              <n-icon size="24">
                <Twitter />
              </n-icon>
            </a>
            <a href="https://google.com" target="_blank">
              <n-icon size="24">
                <Linkedin />
              </n-icon>
            </a>
            <a href="https://google.com" target="_blank">
              <n-icon size="24">
                <CreativeCommons />
              </n-icon>
            </a>
            <a href="https://google.com" target="_blank">
              <n-icon size="24">
                <CreativeCommonsBy />
              </n-icon>
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
import logoInvertedImg from '../assets/logo-inverted.png';
import {
  Twitter,
  Linkedin,
  CreativeCommons,
  CreativeCommonsBy,
} from '@vicons/fa';
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
