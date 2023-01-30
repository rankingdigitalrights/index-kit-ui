<template>
  <n-layout-content :native-scrollbar="false" class="main-content" width="55%">
    <div id="drawer-target" class="section-content">
      <n-space align="start" justify="space-between">
        <n-h1> Ranking editor </n-h1>
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
      <RankingEditor />
    </div>
  </n-layout-content>
  <div class="layout-line" v-show="!isMobile && showHelpSider">&nbsp;</div>
  <n-layout-sider
    width="25%"
    v-if="!isMobile && showHelpSider"
    class="section-content"
    :native-scrollbar="false"
  >
    <HelpRankingEditor />
  </n-layout-sider>
  <n-drawer
    v-if="isMobile"
    v-model:show="showHelpSider"
    width="90%"
    placement="right"
    class="hidden-desktop"
    :trap-focus="false"
    to="#drawer-target"
  >
    <n-drawer-content title="About the ranking editor" closable>
      <HelpRankingEditor />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, type Ref, type InjectionKey, inject, onBeforeMount } from 'vue';
import RankingEditor from '../components/RankingEditor.vue';
import HelpRankingEditor from '@/components/HelpRankingEditor.vue';
import { QuestionCircle } from '@vicons/fa';
import {
  NLayoutContent,
  NLayoutSider,
  NIcon,
  useDialog,
  NH1,
  NP,
  NButton,
  NDrawer,
  NDrawerContent,
  NSpace,
} from 'naive-ui';
// import beforeRouterLeave
import { onBeforeRouteLeave } from 'vue-router';

const dialog = useDialog();

const isMobile = inject<Ref<Boolean> | undefined>('isMobile');

const showHelpSider: Ref<boolean> = ref(false);

onBeforeMount(() => {
  if (!isMobile?.value) {
    showHelpSider.value = true;
  }
});

const toggleHelp =   () => {
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