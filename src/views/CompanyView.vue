<template>
  <n-layout-content :native-scrollbar="false" class="main-content" width="55%">
    <div class="section-content">
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
      <CompaniesEditor />
    </div>
  </n-layout-content>
  <div class="layout-line" v-show="showHelpSider">&nbsp;</div>
  <n-layout-sider
    width="25%"
    v-show="showHelpSider"
    class="section-content"
    :native-scrollbar="false"
  >
    <n-h1>How to</n-h1>
    <!-- lorem ipsum -->
    <HelpStep stepNumber="1"> Lorem ipsum dolor si. </HelpStep>
    <HelpStep stepNumber="2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur,
      nisl nec ultricies lacinia
    </HelpStep>
    <HelpStep stepNumber="3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </HelpStep>
    <HelpStep stepNumber="4"> Lorem ipsum dolor sit amet. </HelpStep>
    <HelpStep stepNumber="5">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur,
      nisl nec ultricies lacinia, nisl nisl aliquet nisl, vel tincidunt nisl
      nisl nec nunc.
    </HelpStep>
    <HelpStep stepNumber="6">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur,
      nisl nec ultricies lacinia
    </HelpStep>
    <br />
    <help-meanings :items="vocabulary" />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import CompaniesEditor from '../components/CompaniesEditor.vue';
import HelpStep from '../components/HelpStep.vue';
import HelpMeanings from '../components/HelpMeanings.vue';
import type { VocabularyItem } from '@/entities/VocabularyItem';
import { QuestionCircle } from '@vicons/fa';
import {
  useDialog,
  NIcon,
  NLayoutContent,
  NLayoutSider,
  NH1,
  NP,
  NSpace,
} from 'naive-ui';
import { onBeforeRouteLeave } from 'vue-router';

const dialog = useDialog();

const showHelpSider: Ref<boolean> = ref(true);
const toggleHelp = () => {
  showHelpSider.value = !showHelpSider.value;
};

const vocabulary: Array<VocabularyItem> = [
  {
    name: 'Index Prefix',
    description:
      'Required. This is an internal identifier for your research adaptation. You can concatenate your organization acronym with the current year.',
    example: 'RDR22',
  },
  {
    name: 'Scoring Steps',
    description:
      'Currently, you can select between 1 and 3 research steps. At least one is required.',
  },
  {
    name: 'Indicators',
    description:
      'Select the indicators your adaptation will use. At least one is required.',
  },
];

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
