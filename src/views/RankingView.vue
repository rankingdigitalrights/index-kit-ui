<template>
  <n-layout-content :native-scrollbar="false" class="main-content" width="55%">
    <div class="section-content">
      <n-h1>
        Ranking editor <n-icon @click="toggleHelp"><QuestionCircle /></n-icon>
      </n-h1>
      <n-p><b
          >In this section you will create a configuration file with general
          information.</b
        ></n-p>
      <RankingEditor />
    </div>
  </n-layout-content>
  <div class="layout-line" v-show="showHelpSider">&nbsp;</div>
  <n-layout-sider
    width="25%"
    v-show="showHelpSider"
    class="section-content"
    :native-scrollbar="false"
  >
    <n-h1>Hello</n-h1>
    <!-- lorem ipsum -->
    <n-p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      voluptates, quod, quia, voluptatibus quae voluptatem quibusdam voluptatum
      quos quidem natus quas. Quisquam, quae. Quisquam, quae. Quisquam, quae.
      Quisquam, quae.
    </n-p>
  </n-layout-sider>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import RankingEditor from '../components/RankingEditor.vue';
import { QuestionCircle } from '@vicons/fa';
import {
  NLayoutContent,
  NLayoutSider,
  NIcon,
  useDialog,
  NH1,
  NP,
} from 'naive-ui';
// import beforeRouterLeave
import { onBeforeRouteLeave } from 'vue-router';

const dialog = useDialog();

const showHelpSider: Ref<boolean> = ref(false);
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
