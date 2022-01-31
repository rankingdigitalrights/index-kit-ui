<script setup lang="ts">
import { computed, ref } from 'vue'
// import { useMessage } from 'naive-ui'

const formRef = ref(null)
// const message = useMessage()
const model = ref({
  indexPrefix: '',
  rootFolderID: '1AdahEGvwnos5YMXazgaxX7vlqPYJ1sF7',
  outputFolderName: '2021 Mini Index - PIN',
  controlSpreadsheetID: '1UzBtiN2qv_4dVWnxp4CIyw1iTt2uvPOSwbidTWF0OPE',
  freezeHead: false,
  yearOnYear: false,
  serviceColWidth: 280,
  collapseAllGroups: false,
  prevYearOutcomeTab: '2018 Outcome',
  includeRGuidanceLink: false, // TODO
  collapseRGuidance: false,
  scoringSteps: ["1"],
  integrateOutputs: true, // DC: integrate any output component?
  integrateOutputsArray: {
    scoringParams: {
      sheetName: 'Outcome',
      subStepNr: 0,
      hasFullScores: true,
      includeSources: true,
      includeNames: false,
      includeResults: true,
      dataColWidth: 200,
      firstStepNr: 1,
      lastStepNr: 1
    }
  }
})
const outputJson = computed({
  get: () => JSON.stringify(model.value, null, 2),
  set: val => {
    model.value = JSON.parse(val)
  }
})
</script>

<template>
  <n-form
    ref="formRef"
    :model="model"
    label-placement="left"
    require-mark-placement="right-hanging"
    label-width="auto"
    :style="{
      maxWidth: '640px'
    }"
  >
    <n-form-item label="Index prefix" path="inputValue">
      <n-input v-model:value="model.indexPrefix" placeholder="RDR21M" />
    </n-form-item>
    <n-form-item label="Root folder ID" path="inputValue">
      <n-input v-model:value="model.rootFolderID" placeholder="1Uz..." />
    </n-form-item>
    <n-form-item label="Folder name" path="inputValue">
      <n-input v-model:value="model.outputFolderName" placeholder="Mini Index" />
    </n-form-item>
    <n-form-item label="Control Sheet ID" path="inputValue">
      <n-input v-model:value="model.controlSpreadsheetID" placeholder="1Uz..." />
    </n-form-item>
    <n-form-item label="Freeze heders" path="switchValue">
      <n-switch v-model:value="model.freezeHead" />
    </n-form-item>
    <n-form-item label="Year-on-year mode" path="switchValue">
      <n-switch v-model:value="model.yearOnYear" />
    </n-form-item>
    <n-form-item label="Service columns width" path="sliderValue">
      <n-slider v-model:value="model.serviceColWidth" :step="20" :min="100" :max="400" />
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
  </n-form>

  <n-input v-model:value="outputJson" type="textarea" style="font-family: monospace,monospace;" />

  <!-- <pre>
    {{  JSON.stringify(model, 0, 2) }}
  </pre> -->
</template>
