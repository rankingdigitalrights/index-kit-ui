<script lang="ts" setup>
// import { computed, h, ref, type Ref } from 'vue';
import type { Company } from '../../entities/Company';
import { NButton, NText, NSpace, type TreeOption, NDivider } from 'naive-ui';

interface CompanyTreeItemProp {
  company: Company;
  children: TreeOption[];
}

const props = defineProps<{
  treeItem: CompanyTreeItemProp;
  removeCompany: (i: number) => void;
}>();
</script>

<template>
  <n-space align="start" justify="space-between">
    <n-space vertical :size="[0, 0]">
      <n-space align="center">
        <n-text strong type="primary" style="fontsize: 1.3rem">
          {{ props.treeItem.company.label.current }}
        </n-text>
        <n-button text type="info" size="tiny"> Edit </n-button>
        <n-button text type="info" size="tiny"> Add service </n-button>
      </n-space>
      <n-text depth="3" style="fontsize: 0.7rem">
        <n-text type="primary">
          {{ props.treeItem.children.length }} services
        </n-text>
        <n-divider vertical v-show="props.treeItem.company.type == null" />
        <n-text>
          <n-text depth="3">Type:</n-text> {{ props.treeItem.company.type }}
        </n-text>
        <!-- <n-divider vertical v-show="props.treeItem.company.subtype == null" />
        <n-text>
          <n-text depth="3">Subtype:</n-text>&nbsp;{{ props.treeItem.company.subtype || '(Empty)' }}
        </n-text> -->
      </n-text>
    </n-space>
  </n-space>
</template>
