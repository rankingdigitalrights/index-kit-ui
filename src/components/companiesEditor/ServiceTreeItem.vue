<script lang="ts" setup>
import { computed, h, ref, type Ref } from 'vue';
import type { Service } from '../../entities/Service';
import {
  NButton,
  NText,
  NSpace,
  NP,
  type TreeOption,
  NDivider,
} from 'naive-ui';
import {
  ArrowAltCircleDown,
  DotCircle,
  Rocket,
  DotCircleRegular,
} from '@vicons/fa';

interface ServiceTreeOptionProps {
  service: Service;
  children: TreeOption[];
}

const props = defineProps<{
  treeItem: ServiceTreeOptionProps;
}>();
</script>

<template>
  <n-space align="start" justify="space-between">
    <n-space vertical :size="[0, 0]">
      <n-space align="center">
        <n-text> </n-text>
        <n-icon depth="5">
          <DotCircleRegular style="height: 14px" />
        </n-icon>
        <n-text type="info">
          {{ props.treeItem.service.label.current }}
        </n-text>
        <!-- <n-button text type="info" size="tiny"> Remove </n-button> -->
        <n-text depth="3" style="fontsize: 0.7rem">
          <n-divider vertical />
          <n-text depth="1">
            <n-text depth="3">Type:</n-text> {{ props.treeItem.service.type }}
          </n-text>
          <n-divider vertical />
          <n-text depth="1">
            <n-text depth="3">Subtype:</n-text>
            {{ props.treeItem.service.subtype || '(Empty)' }}
          </n-text>
        </n-text>
      </n-space>
    </n-space>
  </n-space>
</template>
