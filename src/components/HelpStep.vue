<script setup lang="ts">
import { defineProps } from 'vue'
import {
  NH1,
  NP,
  NText,
  NSpace,
} from 'naive-ui'

const props = defineProps<{
  stepNumber: number | string
}>()

</script>

<template>
  <n-space align="start" :wrap="false">
    <n-h1 class="step-title">{{ props.stepNumber }}</n-h1>
    <n-p class="step-text"><slot></slot></n-p>
  </n-space>
</template>

<style lang="scss" scoped>
.step-title {
  font-weight: 700;
  line-height: 2rem;
  min-width: 25px;
}
.step-text {
  font-size: 0.75rem;
  margin-bottom: 12px;
  line-height: 1.1rem;
}
</style>
