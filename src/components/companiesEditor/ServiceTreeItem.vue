<script lang="ts" setup>
import type { Service } from '../../entities/Service';
import { serviceTypeArray, serviceSubtypeArray } from '../../entities/Service';
import { NText, NSpace, NTag, type TreeOption, NDivider } from 'naive-ui';

interface ServiceTreeOptionProps {
  service: Service;
  children: TreeOption[];
}

const props = defineProps<{
  treeItem: ServiceTreeOptionProps;
}>();

const getTypeName = (type: string | null): string => {
  const typeObj = serviceTypeArray.find((t) => t.value === type);
  return typeObj ? typeObj.label : '(Empty)';
};

const getSubTypeName = (type: string | null): string | null => {
  const typeObj = serviceSubtypeArray.find((t) => t.value === type);
  return typeObj ? typeObj.label : '(Empty)';
};
</script>

<template>
  <n-space align="start" justify="space-between">
    <n-space vertical :size="[0, 0]">
      <n-space align="center" size="small" item-style="display: flex">
        <n-tag size="tiny">
          {{ props.treeItem.service.id }}
        </n-tag>
        <n-text strong type="" class="larger">
          {{ props.treeItem.service.label.current }}
        </n-text>
        <!-- <n-button text type="info" size="tiny"> Remove </n-button> -->
      </n-space>
      <n-space align="center" item-style="display: flex">
        <n-text depth="3" class="smaller">
          <!-- <n-divider vertical /> -->
          <n-text depth="1">
            <n-text depth="3">Type:</n-text>
            {{ getTypeName(props.treeItem.service.type) }}
          </n-text>
          <n-divider vertical />
          <n-text depth="1">
            <n-text depth="3">Subtype:</n-text>
            {{ getSubTypeName(props.treeItem.service.subtype) }}
          </n-text>
        </n-text>
      </n-space>
    </n-space>
  </n-space>
</template>

<style lang="scss" scoped>
.n-tag {
  font-size: 0.6rem;
}
.larger {
  font-size: 1rem;
}
.smaller {
  font-size: 0.8rem;
}
</style>
