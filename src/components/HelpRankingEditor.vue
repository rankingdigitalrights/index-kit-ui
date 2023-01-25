<template>
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
    nisl nec ultricies lacinia, nisl nisl aliquet nisl, vel tincidunt nisl nec
    nunc.
  </HelpStep>
  <HelpStep stepNumber="6">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur,
    nisl nec ultricies lacinia
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
</script>
