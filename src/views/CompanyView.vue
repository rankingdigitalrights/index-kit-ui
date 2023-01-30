<template>
  <n-layout-content :native-scrollbar="false" class="main-content" width="55%">
    <div id="drawer-target" class="section-content">
      <n-space align="start" justify="space-between">
        <n-h1>Companies Editor </n-h1>
        <n-button text type="primary">
          <n-icon size="25" @click="toggleHelp">
            <QuestionCircle />
          </n-icon>
        </n-button>
      </n-space>
      <n-p
        ><b
          >In this section you will create a configuration file with general
          information.</b
        ></n-p
      >
      <CompaniesEditor :is-mobile="isMobile" />
    </div>
  </n-layout-content>
  <div class="layout-line hidden-mobile" v-show="!isMobile && showHelpSider">&nbsp;</div>
  <n-layout-sider
    width="25%"
    v-show="!isMobile && showHelpSider"
    class="section-content hidden-mobile"
    :native-scrollbar="false"
  >
    <HelpCompaniesEditor />
  </n-layout-sider>
  <n-drawer
    v-if="isMobile"
    v-model:show="showHelpSider"
    width="85%"
    placement="right"
    class="hidden-desktop"
    :trap-focus="false"
    to="#drawer-target"
  >
    <n-drawer-content title="About the company editor" closable>
      <HelpCompaniesEditor />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, type Ref, inject, onBeforeMount } from 'vue';
import CompaniesEditor from '../components/CompaniesEditor.vue';
import HelpCompaniesEditor from '@/components/HelpCompaniesEditor.vue';
import { QuestionCircle } from '@vicons/fa';
import {
  useDialog,
  NIcon,
  NLayoutContent,
  NLayoutSider,
  NDrawer,
  NDrawerContent,
  NButton,
  NH1,
  NP,
  NSpace,
} from 'naive-ui';
import { onBeforeRouteLeave } from 'vue-router';

const dialog = useDialog();

const isMobile = inject<Ref<Boolean> | undefined>('isMobile');

const showHelpSider: Ref<boolean> = ref(false);

onBeforeMount(() => {
  if (!isMobile?.value) {
    showHelpSider.value = true;
  }
});

const toggleHelp = () => {
  showHelpSider.value = !showHelpSider.value;
};

// Before leaving the route
onBeforeRouteLeave((to, from, next) => {
  // if the user accepts to leave, close the help sider
  dialog.warning({
    title: 'Are you sure you want to leave?',
    positiveText: 'Sure',
    negativeText: 'Not Sure',
    onPositiveClick: () => {
      showHelpSider.value = false;
      // return true to continue the navigation
      next();
    },
    onNegativeClick: () => {
      // return false to cancel the navigation
      next(false);
    },
  });
});
</script>
