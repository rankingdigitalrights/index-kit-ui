<template>
  <n-h1>How to</n-h1>
  <!-- lorem ipsum -->
  <HelpStep stepNumber="1">
    If you're creating a new file, jump to step 2. Otherwise, if you want to continue editing an existing file you've already created, click on "Load JSON" toward the bottom of your screen and select the correct file. When you finish editing it, you must redownload it.
  </HelpStep>
  <HelpStep stepNumber="2">
    Fill in the Index Prefix, the short word or acronym that identifies your adaptation internally.
  </HelpStep>
  <HelpStep stepNumber="3">
    Select the scoring steps that your adaptation will include. If there's just one researcher involved, 1 step should be fine. With two researchers, it is recommended to select all three steps.  If it's your first time doing an adaptation, make sure to read the guide on how to prepare your research.
  </HelpStep>
  <HelpStep stepNumber="4">
    Select at least one indicator. You can explore them by expanding the categories using the small arrow to the left of each listed category.
  </HelpStep>
  <HelpStep stepNumber="5">
    Once you have defined the Index Prefix, scoring steps, and indicators, you can download the configuration file by clicking on “Download JSON.” Remember to save the file on your device.
  </HelpStep>
  <HelpStep stepNumber="6">
    You can continue the process by going to the “Companies and services” section to generate your second configuration file.
  </HelpStep>
  <br />
  <help-meanings :items="vocabulary" />
</template>

<script setup lang="ts">
import HelpStep from '../components/HelpStep.vue';
import HelpMeanings from '../components/HelpMeanings.vue';
import type { VocabularyItem } from '@/entities/VocabularyItem';
import { NH1 } from 'naive-ui';

const vocabulary: Array<VocabularyItem> = [
  {
    name: 'Index Prefix',
    description:
      'This is your research adaptation’s internal identifier. For example, you can combine your organization’s acronym with the current year. This field is required.',
    example: 'RDR22',
  },
  {
    name: 'Scoring Steps',
    description:
      'You can select between 1 and 3 research steps from our methodology to follow. At least one is required to proceed.',
  },
  {
    name: 'Indicators',
    description:
      'Select the indicators your adaptation will use. At least one indicator is required.',
  },
];
</script>
