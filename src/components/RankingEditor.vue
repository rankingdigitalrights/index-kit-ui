<script setup lang="ts">
import { computed, ref } from 'vue';
import fileDownload from 'js-file-download';
import {
  NForm,
  NFormItem,
  NInput,
  NSwitch,
  NSlider,
  NSpace,
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NTransfer,
} from 'naive-ui';
// import { useMessage } from 'naive-ui'

const formRef = ref(null);
// const message = useMessage()
const model = ref({
  indexPrefix: '',
  freezeHead: false,
  yearOnYear: false,
  serviceColWidth: 280,
  collapseAllGroups: false,
  prevYearOutcomeTab: 'Previous Outcome',
  includeRGuidanceLink: false, // TODO
  collapseRGuidance: false,
  scoringSteps: [],
  indicators: [],
  scoringParams: {
    sheetName: 'Outcome',
    subStepNr: 0,
    hasFullScores: true,
    includeSources: true,
    includeNames: false,
    includeResults: true,
    dataColWidth: 200,
    firstStepNr: 1,
    lastStepNr: 1,
  },
});
const outputJson = computed({
  get: () => JSON.stringify(model.value, null, 2),
  set: (val) => {
    model.value = JSON.parse(val);
  },
});
const indicatorOptions = [
  'G1',
  'G2',
  'G3',
  'G4a',
  'G4b',
  'G4c',
  'G4d',
  'G4e',
  'G5',
  'G6a',
  'G6b',
  'F1a',
  'F1b',
  'F1c',
  'F1d',
  'F2a',
  'F2b',
  'F2c',
  'F2d',
  'F3a',
  'F3b',
  'F3c',
  'F4a',
  'F4b',
  'F4c',
  'F5a',
  'F5b',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'F13',
  'P1a',
  'P1b',
  'P2a',
  'P2b',
  'P3a',
  'P3b',
  'P4',
  'P5',
  'P6',
  'P7',
  'P8',
  'P9',
  'P10a',
  'P10b',
  'P11a',
  'P11b',
  'P12',
  'P13',
  'P14',
  'P15',
  'P16',
  'P17',
  'P18',
].map((v) => ({ label: v, value: v }));

function downloadJson() {
  fileDownload(outputJson.value, 'config.json', 'text/plain');
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="model"
    label-placement="left"
    require-mark-placement="right-hanging"
    label-width="auto"
    :style="{
      maxWidth: '640px',
    }"
  >
    <n-form-item label="Index prefix" path="inputValue">
      <n-input v-model:value="model.indexPrefix" placeholder="RDR21M" />
    </n-form-item>
    <n-form-item label="Freeze heders" path="switchValue">
      <n-switch v-model:value="model.freezeHead" />
    </n-form-item>
    <n-form-item label="Year-on-year mode" path="switchValue">
      <n-switch v-model:value="model.yearOnYear" />
    </n-form-item>
    <n-form-item label="Service columns width" path="sliderValue">
      <n-slider
        v-model:value="model.serviceColWidth"
        :step="20"
        :min="100"
        :max="400"
      />
    </n-form-item>
    <n-form-item label="Collapse all groups" path="switchValue">
      <n-switch v-model:value="model.collapseAllGroups" />
    </n-form-item>
    <n-form-item :span="12" label="Scoring steps" path="checkboxGroupValue">
      <n-checkbox-group v-model:value="model.scoringSteps">
        <n-space>
          <n-checkbox value="1">Step 1</n-checkbox>
          <n-checkbox value="2">Step 2</n-checkbox>
          <n-checkbox value="3">Step 3</n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item :span="14" label="Indicators" path="transferValue">
      <n-transfer
        v-model:value="model.indicators"
        source-title="Excluded"
        target-title="Included"
        :options="indicatorOptions"
      />
    </n-form-item>
  </n-form>

  <n-input
    v-model:value="outputJson"
    type="textarea"
    style="font-family: monospace, monospace"
  />
  <n-space>
    <n-button type="primary" @click="downloadJson">Download JSON</n-button>
  </n-space>

  <!-- <pre>
    {{  JSON.stringify(model, 0, 2) }}
  </pre> -->
</template>
