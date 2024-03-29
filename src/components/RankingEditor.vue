<script setup lang="ts">
import { computed, ref, type Ref, h, onBeforeMount } from 'vue';
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
  NCollapse,
  NCollapseItem,
  NModal,
  NLog,
  NTree,
  type TreeOption,
  // type DropdownOption,
  type FormRules,
  NTag,
  type FormInst,
  useDialog,
  useNotification,
  NSkeleton,
  NText,
} from 'naive-ui';
import { AngleRight, FileDownload, Upload, QuestionCircle } from '@vicons/fa';
// import { useMessage } from 'naive-ui'
import type { RankingModel } from '../entities/RankingModel';
import type { IndicatorModel } from '../entities/IndicatorModel';

// const formRef = ref(null);
const showPreviewModal = ref(false);
const dialog = useDialog();
const notification = useNotification();
const treeData: Ref<Array<TreeOption>> = ref([]);
const loadingIndicators: Ref<boolean> = ref(true);
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
    lastStepNr: 3,
  },
});

const outputJson = computed({
  get: () => JSON.stringify(model.value, null, 2),
  set: (val) => {
    model.value = JSON.parse(val);
  },
});

onBeforeMount(() => {
  // download json indicators from public /data/indicators.json
  fetch('./data/indicators.json')
    .then((response) => response.json())
    .then((data) => {
      // data is an array of objects we call indicators
      // indicators have id, category, label, description, and more...
      // get a set of unique values of categories from the indicators
      let categories: Set<string> = new Set(
        data.map((indicator: IndicatorModel) => indicator.category)
      );
      categories.forEach((category) => {
        // create a new object with key and label
        // key is the category name
        // label is the category name with first letter capitalized
        let categoryObj: TreeOption = {
          key: category.charAt(0).toUpperCase(),
          label: category.charAt(0).toUpperCase() + category.slice(1),
          addPrefix: false,
          children: [],
        };
        // filter the indicators by category
        let categoryIndicators = data.filter(
          (indicator: IndicatorModel) =>
            indicator.category === category && !indicator.parent
        );
        // for each indicator create a new object with key, label, and description
        categoryIndicators.forEach((indicator: IndicatorModel) => {
          let indicatorObj: TreeOption = {
            key: indicator.name,
            addPrefix: true,
            label: indicator.label,
            description: !indicator.isParent ? indicator.description : null,
            guidance: !indicator.isParent ? indicator.guidance : null,
          };
          if (indicator.isParent) {
            // filter the indicators by parent
            let childrenIndicators = data.filter((child: IndicatorModel) => {
              return child.parent === indicator.id;
            });
            if (childrenIndicators.length > 0) {
              indicatorObj.children = [];
              childrenIndicators.forEach((child: IndicatorModel) => {
                let childObj: TreeOption = {
                  key: child.name,
                  addPrefix: true,
                  label: child.label,
                  description: child.description,
                  guidance: child.guidance,
                };
                indicatorObj.children?.push(childObj);
              });
            }
          }
          // add the indicator object to the category object
          if (categoryObj.children) categoryObj.children.push(indicatorObj);
          else categoryObj.children = [indicatorObj];
        });
        // add the category object to the treeData array
        treeData.value.push(categoryObj);
      });
      loadingIndicators.value = false;
    });
});

function onCheckedKeysChange(indicators: Array<string>): void {
  // update model.value when checkedKeys changed
  model.value = Object.assign({}, model.value, { indicators });
}

const formRef = ref<FormInst | null>(null);
const inputFileRef = ref<HTMLInputElement | null>(null);

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
        type: 'info',
        bordered: true,
        style: { marginTop: '1px', minWidth: '60px', justifyContent: 'center' },
      },
      { default: () => option.key }
    );
  else
    return h(
      NTag,
      {
        size: 'small',
        bordered: true,
        style: { marginTop: '1px', minWidth: '30px', justifyContent: 'center' },
      },
      { default: () => option.key }
    );
  // else return null;
}

function renderLabel({ option }: { option: TreeOption }) {
  // return the label with an icon appended
  return h(
    NSpace,
    {
      align: 'start',
      wrap: false,
    },
    {
      default: () => [
        option.guidance
          ? h(
              NText,
              {
                type: 'info',
                style: { cursor: 'pointer' },
                onclick: () => {
                  dialog.info({
                    title: `${option.key} - ${option.label}`,
                    content: () => [
                      h(
                        'div',
                        {
                          innerHTML: option.description,
                          style: {
                            fontSize: '0.8rem',
                            textAlign: 'justify',
                            fontWeight: '600',
                          },
                        },
                        {}
                      ),
                      h(
                        'div',
                        {
                          innerHTML: option.guidance,
                          style: {
                            fontSize: '0.7rem',
                            lineHeight: '1rem',
                            textAlign: 'justify',
                          },
                        },
                        {}
                      ),
                    ],
                    positiveText: 'Close',
                  });
                },
              },
              {
                default: () =>
                  h(
                    NIcon,
                    {
                      size: '12',
                      component: QuestionCircle,
                    },
                    {}
                  ),
              }
            )
          : null,
        option.label,
      ],
    }
  );
}

function inputFile() {
  inputFileRef.value?.click();
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    // if file is not a json
    if (file.type !== 'application/json') {
      notification.error({
        title: 'Error',
        content: `File is not a JSON config.`,
        duration: 3000,
        keepAliveOnHover: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      let modelJson = JSON.parse(reader.result as string);
      model.value = Object.assign({}, model.value, modelJson);
      notification.success({
        title: 'Success',
        content: `File loaded successfully.`,
        duration: 3000,
        keepAliveOnHover: true,
      });
    };

    reader.readAsText(file);
  }
}

function onlyAlphaNumeric(value: string): boolean {
  // allow only alphanumeric characters
  if (value === '') return true;
  let test: boolean = /^[a-zA-Z0-9]+$/.test(value);
  return test;
}

const formRules: FormRules = {
  indexPrefix: {
    required: true,
    message: 'Index Prefix is required',
    trigger: 'blur',
    whitespace: true,
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
  <!-- TODO delete this -->
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
          <n-input
            v-model:value="model.indexPrefix"
            :allow-input="onlyAlphaNumeric"
            placeholder="RDR21M"
          />
        </n-form-item>
        <n-form-item :span="14" path="scoringSteps">
          <template #label>
            <span class="custom-label">Scoring Steps</span>
          </template>
          <n-checkbox-group v-model:value="model.scoringSteps">
            <n-space>
              <n-checkbox size="large" :value="1">Step 1: Primary Data Collection</n-checkbox>
              <n-checkbox size="large" :value="2">Step 2: Secondary Review</n-checkbox>
              <n-checkbox size="large" :value="3">Step 3: Review and Reconciliation</n-checkbox>
            </n-space>
          </n-checkbox-group>
        </n-form-item>
        <n-form-item>
          <template #label>
            <span class="custom-label"
              >Indicators
              <span v-show="loadingIndicators">(Loading...)</span></span
            >
          </template>
          <n-tree
            v-if="!loadingIndicators"
            :data="treeData"
            block-line
            checkable
            multiple
            cascade
            check-strategy="child"
            :selectable="false"
            :checked-keys="model.indicators"
            @update:checked-keys="onCheckedKeysChange"
            :render-prefix="renderPrefix"
            :render-label="renderLabel"
            style="width: 100%"
          >
          </n-tree>
          <div v-else style="width: 60%">
            <n-skeleton text :repeat="2" />
            <n-skeleton text style="width: 60%" />
          </div>
        </n-form-item>
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
      <input
        ref="inputFileRef"
        type="file"
        accept="application/json"
        hidden
        @change="onFileChange"
      />
    </template>
    <template #action>
      <n-space align="center" justify="space-between">
        <n-button text type="primary" @click="inputFile">
          <n-icon><Upload /></n-icon>&nbsp;Load JSON
        </n-button>
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
    style="width: 600px"
    :bordered="false"
  >
    <template #header-extra> JSON </template>
    <n-log :font-size="13" :rows="15" :log="outputJson" class="logger" />
  </n-modal>
</template>
