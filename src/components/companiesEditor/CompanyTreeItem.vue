<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { Company } from '../../entities/Company';
import { companyTypeArray } from '../../entities/Company';
import {
  NButton,
  NText,
  NSpace,
  NTag,
  type TreeOption,
  NDivider,
} from 'naive-ui';

interface CompanyTreeItemProp {
  company: Company;
  children: TreeOption[];
}

const props = defineProps<{
  treeItem: CompanyTreeItemProp;
}>();

const emits = defineEmits<{
  (e: 'editCompany', id: string): void;
}>();

// METHODS

const getTypeName = (type: string): string => {
  const typeObj = companyTypeArray.find((t) => t.value === type);
  return typeObj ? typeObj.label : '(Empty)';
};

const editCompany = () => {
  emits('editCompany', props.treeItem.company.id);
};
</script>

<template>
  <n-space align="start" justify="space-between">
    <n-space vertical :size="[0, 0]">
      <n-space align="center">
        <n-tag size="small">
          {{ props.treeItem.company.id }}
        </n-tag>
        <n-text strong type="primary" class="larger">
          {{ props.treeItem.company.label.current }}
        </n-text>
        <n-button text type="info" size="tiny" @click="editCompany"
          >Edit</n-button
        >
      </n-space>
      <n-text depth="3" class="smaller">
        <n-text type="primary">
          {{ props.treeItem.children.length }} services
        </n-text>
        <n-divider vertical />
        <n-text>
          <n-text depth="3">Type:</n-text>
          {{ getTypeName(props.treeItem.company.type) }}
        </n-text>
      </n-text>
    </n-space>
  </n-space>
</template>

<style lang="scss" scoped>
.n-tag {
  font-size: 0.75rem;
}
.larger {
  font-size: 1.2rem;
}
.smaller {
  font-size: 0.8rem;
}
</style>
