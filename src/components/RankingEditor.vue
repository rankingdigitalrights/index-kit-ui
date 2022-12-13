<script setup lang="ts">
import { computed, ref, type Ref, h } from 'vue';
import fileDownload from 'js-file-download';
import {
  NIcon,
  NCard,
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
  NCollapse,
  NCollapseItem,
  NModal,
  NLog,
  NTree,
  NAlert,
  type TreeOption,
  type DropdownOption,
  type FormRules,
  NTag,
  type FormInst,
  useDialog,
} from 'naive-ui';
import { AngleRight, FileDownload } from '@vicons/fa';
// import { useMessage } from 'naive-ui'
import type { RankingModel } from '../entities/RankingModel';

// const formRef = ref(null);
const showPreviewModal = ref(false);
const dialog = useDialog();
// const message = useMessage()
const model: Ref<RankingModel> = ref({
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

// const indicatorOptions = [
//   'G1',
//   'G2',
//   'G3',
//   'G4a',
//   'G4b',
//   'G4c',
//   'G4d',
//   'G4e',
//   'G5',
//   'G6a',
//   'G6b',
//   'F1a',
//   'F1b',
//   'F1c',
//   'F1d',
//   'F2a',
//   'F2b',
//   'F2c',
//   'F2d',
//   'F3a',
//   'F3b',
//   'F3c',
//   'F4a',
//   'F4b',
//   'F4c',
//   'F5a',
//   'F5b',
//   'F6',
//   'F7',
//   'F8',
//   'F9',
//   'F10',
//   'F11',
//   'F12',
//   'F13',
//   'P1a',
//   'P1b',
//   'P2a',
//   'P2b',
//   'P3a',
//   'P3b',
//   'P4',
//   'P5',
//   'P6',
//   'P7',
//   'P8',
//   'P9',
//   'P10a',
//   'P10b',
//   'P11a',
//   'P11b',
//   'P12',
//   'P13',
//   'P14',
//   'P15',
//   'P16',
//   'P17',
//   'P18',
// ].map((v) => ({ label: v, value: v }));

const treeData: Array<TreeOption> = [
  {
    key: 'G',
    label: 'Governance Indicators',
    addPrefix: false,
    children: [
      {
        addPrefix: true,
        key: 'G1',
        label:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a sodales nulla, sed semper nisi. Cras lobortis volutpat nunc. Proin tincidunt enim in felis aliquet, a ultricies purus bibendum. Quisque in ultrices lectus. Nulla at urna diam. Proin sodales lobortis libero eu facilisis. In sem urna, aliquam vel consectetur sit amet, pulvinar sit amet lectus. Quisque molestie dapibus libero non pellentesque. Vivamus quam arcu, dictum quis hendrerit eget',
      },
      { addPrefix: true, key: 'G2', label: 'This is a text you can include' },
      { addPrefix: true, key: 'G3', label: 'This is a text you can include' },
      { addPrefix: true, key: 'G4a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'G4b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'G4c', label: 'This is a text you can include' },
      { addPrefix: true, key: 'G4d', label: 'This is a text you can include' },
      { addPrefix: true, key: 'G4e', label: 'This is a text you can include' },
      { addPrefix: true, key: 'G5', label: 'This is a text you can include' },
      { addPrefix: true, key: 'G6a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'G6b', label: 'This is a text you can include' },
    ],
  },
  {
    key: 'F',
    label: 'Freedom of Speech Indicators',
    addPrefix: false,
    children: [
      { addPrefix: true, key: 'F1a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F1b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F1c', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F1d', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F2a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F2b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F2c', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F2d', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F3a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F3b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F3c', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F4a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F4b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F4c', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F5a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F5b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F6', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F7', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F8', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F9', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F10', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F11', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F12', label: 'This is a text you can include' },
      { addPrefix: true, key: 'F13', label: 'This is a text you can include' },
    ],
  },
  {
    key: 'P',
    label: 'Privacy Indicators',
    addPrefix: false,
    children: [
      { addPrefix: true, key: 'P1a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P1b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P2a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P2b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P3a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P3b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P4', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P5', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P6', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P7', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P8', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P9', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P10a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P10b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P11a', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P11b', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P12', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P13', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P14', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P15', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P16', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P17', label: 'This is a text you can include' },
      { addPrefix: true, key: 'P18', label: 'This is a text you can include' },
    ],
  },
];

function onCheckedKeysChange(indicators: Array<string>): void {
  // update model.value when checkedKeys changed
  model.value = Object.assign({}, model.value, { indicators });
}

const formRef = ref<FormInst | null>(null);

function downloadJson() {
  // validate form
  formRef.value?.validate((errors) => {
    if (errors) {
      dialog.error({
        title: 'Error',
        content: `There are some errors in your form. Check and try again.`,
        positiveText: 'Ok!',
      });
      return;
    }
    fileDownload(outputJson.value, 'config.json', 'text/plain');
  });
}

function renderPrefix({ option }: { option: TreeOption }) {
  if (option.addPrefix)
    return h(
      NTag,
      {
        size: 'small',
        bordered: false,
        style: { marginTop: '3px' },
      },
      { default: () => option.key }
    );
  // else return h('b', {}, `${option.key} -`);
  // else return null;
  else return h('b', { style: { marginTop: '1px' } }, `${option.key} -`);
}

const formRules: FormRules = {
  indexPrefix: {
    required: true,
    message: 'Index Prefix is required',
    trigger: 'blur',
  },
  scoringSteps: {
    type: 'array',
    required: false,
    trigger: 'change',
    message: 'Please select checkboxGroupValue',
  },
  indicators: {
    required: true,
    message: 'Indicators is required',
    trigger: 'blur',
  },
};
</script>

<template>
  <div ref="alert"></div>
  <n-card
    class="card-shadowed"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
  >
    <template #default>
      <n-form
        ref="formRef"
        :model="model"
        require-mark-placement="right-hanging"
        :rules="formRules"
        label-width="auto"
      >
        <n-form-item path="indexPrefix">
          <template #label>
            <span class="custom-label">Index Prefix</span>
          </template>
          <n-input v-model:value="model.indexPrefix" placeholder="RDR21M" />
        </n-form-item>
        <n-form-item :span="14" path="scoringSteps">
          <template #label>
            <span class="custom-label">Scoring Steps</span>
          </template>
          <n-checkbox-group v-model:value="model.scoringSteps">
            <n-space>
              <n-checkbox size="large" value="1">Step 1</n-checkbox>
              <n-checkbox size="large" value="2">Step 2</n-checkbox>
              <n-checkbox size="large" value="3">Step 3</n-checkbox>
            </n-space>
          </n-checkbox-group>
        </n-form-item>
        <n-form-item>
          <template #label>
            <span class="custom-label">Indicators</span>
          </template>
          <n-tree
            :data="treeData"
            checkable
            multiple
            cascade
            check-strategy="child"
            :expand-on-click="true"
            @update:checked-keys="onCheckedKeysChange"
            :selectable="false"
            :render-prefix="renderPrefix"
          >
          </n-tree>
        </n-form-item>
        <!-- <n-form-item :span="12" path="transferValue">
          <n-transfer
            v-model:value="model.indicators"
            source-title="Excluded"
            target-title="Included"
            :options="indicatorOptions"
          />
        </n-form-item> -->
        <n-collapse display-directive="show">
          <template #arrow>
            <n-icon color="#eb6a5b">
              <angle-right />
            </n-icon>
          </template>
          <template #header> </template>

          <n-collapse-item name="1">
            <template #header>
              <i>Advanced configurations</i>
            </template>
            <n-card>
              <n-form-item label-placement="left" path="switchValue">
                <template #label>
                  <span class="custom-label">Freeze heders</span>
                </template>
                <n-switch v-model:value="model.freezeHead">
                  <template #checked> Enabled </template>
                  <template #unchecked> Disabled </template>
                </n-switch>
              </n-form-item>
              <n-form-item label-placement="left" path="switchValue">
                <template #label>
                  <span class="custom-label">Year-on-year mode</span>
                </template>
                <n-switch v-model:value="model.yearOnYear">
                  <template #checked> Enabled </template>
                  <template #unchecked> Disabled </template>
                </n-switch>
              </n-form-item>
              <n-form-item label-placement="left" path="sliderValue">
                <template #label>
                  <span class="custom-label">Service columns width</span>
                </template>
                <n-slider
                  v-model:value="model.serviceColWidth"
                  :step="20"
                  :min="100"
                  :max="400"
                />
              </n-form-item>
              <n-form-item label-placement="left" path="switchValue">
                <template #label>
                  <span class="custom-label">Collapse all groups</span>
                </template>
                <n-switch v-model:value="model.collapseAllGroups">
                  <template #checked> Enabled </template>
                  <template #unchecked> Disabled </template>
                </n-switch>
              </n-form-item>
            </n-card>
          </n-collapse-item>
        </n-collapse>
      </n-form>
    </template>
    <template #action>
      <n-space align="center" justify="end">
        <n-button
          secondary
          size="tiny"
          type="tertiary"
          @click="showPreviewModal = true"
          >Preview</n-button
        >
        <n-button strong type="primary" @click="downloadJson"
          ><n-icon><FileDownload /></n-icon>&nbsp;Download JSON</n-button
        >
      </n-space>
    </template>
  </n-card>
  <n-modal
    v-model:show="showPreviewModal"
    title="Configuration Preview"
    preset="card"
    style="maxWidth: 600px"
    :bordered="false"
  >
    <template #header-extra> JSON </template>
    <n-log :font-size="13" :rows="15" :log="outputJson" class="logger" />
  </n-modal>

  <!-- <n-input
    v-model:value="outputJson"
    type="textarea"
    style="font-family: monospace, monospace"
  /> -->
  <n-space> </n-space>

  <!-- <pre>
    {{  JSON.stringify(model, 0, 2) }}
  </pre> -->
</template>

<style lang="scss">
.logger {
  border: 1px solid #e8e8e8;
}
</style>
