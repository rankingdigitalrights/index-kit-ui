<template>
  <h1>
    Ranking editor <n-icon @click="toggleHelp"><QuestionCircle /></n-icon>
  </h1>
  <ranking-config />
</template>

<script setup lang="ts">
import RankingConfig from "../components/RankingConfig.vue";
import { QuestionCircle } from "@vicons/fa";
import { useAppStore } from "@/stores/app";
import { useDialog } from "naive-ui";
// import beforeRouterLeave
import { onBeforeRouteLeave } from "vue-router";
const dialog = useDialog();

onBeforeRouteLeave((to, from, next) => {
  // if the user accepts to leave, close the help sider
  dialog.warning({
    title: "Are you sure you want to leave?",
    positiveText: "Sure",
    negativeText: "Not Sure",
    onPositiveClick: () => {
      const store = useAppStore();
      store.closeHelpSider();
      // return true to continue the navigation
      next()
    },
    onNegativeClick: () => {
      // return false to cancel the navigation
      next(false);
    },
  });
});

const toggleHelp = () => {
  const store = useAppStore();
  store.toggleHelpSider();
};
</script>
