<script setup lang="ts">
import { defineProps } from 'vue';
import { NH3, NP, NText, NCard, NCollapse, NCollapseItem } from 'naive-ui';
import type { VocabularyItem } from '../entities/VocabularyItem';

const props = defineProps<{
  items: Array<VocabularyItem> | undefined | null;
}>();
</script>

<template>
  <n-card embedded>
    <n-collapse default-expanded-names="1">
      <n-collapse-item name="1">
        <template #header>
          <n-h3 style="margin: 0">What it means</n-h3>
        </template>
        <template #default>
          <n-p
            class="step-text"
            v-for="(item, index) in props.items"
            :key="`item-${index}`"
          >
            <b>{{ item.name }}</b
            >: {{ item.description
            }}<n-text v-if="item.example" type="info"
              >&nbsp;For example: {{ item.example }}</n-text
            >
          </n-p>
        </template>
      </n-collapse-item>
    </n-collapse>
  </n-card>
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
