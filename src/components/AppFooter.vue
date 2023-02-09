<template>
  <n-layout-footer>
    <div class="container">
      <n-grid x-gap="12" :cols="isMobile ? 1 : 2" style="height: 100%">
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
          <n-image
            :src="logoInvertedImg"
            height="60"
            class="rdr-logo-footer"
            preview-disabled
          />
        </n-gi>
      </n-grid>
    </div>
  </n-layout-footer>
</template>

<script lang="ts" setup>
import { inject, type Ref } from 'vue';
import { NGrid, NGi, NIcon, NImage, NSpace, NLayoutFooter } from 'naive-ui';
import {
  Twitter,
  Linkedin,
  CreativeCommons,
  CreativeCommonsBy,
} from '@vicons/fa';
import logoInvertedImg from '../assets/logo-inverted.png';

const isMobile = inject<Ref<Boolean> | undefined>('isMobile');
</script>

<style lang="scss" scoped>
.n-layout-footer {
  background: #1c5275;
  color: #fff;
  padding: 24px;
  // height: 120px;
  text-align: center;
}
.grid-item {
  display: flex;
  align-items: center;
  text-align: left;
  @media (max-width: 767px) {
    text-align: center;
    justify-content: center;
  }
  &.right {
    justify-content: center;
    // if media query upper than 768px
    @media (min-width: 768px) {
      justify-content: right;
    }
  }
  .rdr-logo-footer {
    @media (max-width: 767px) {
      margin-top: 20px;
    }
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
