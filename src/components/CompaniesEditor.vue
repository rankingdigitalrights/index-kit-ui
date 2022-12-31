<script setup lang="ts">
import { computed, h, ref, type Ref } from 'vue';
import { Company } from '../entities/Company';
import type { Service } from '../entities/Service';
import CompanyTreeItem from './companiesEditor/CompanyTreeItem.vue';
import ServiceTreeItem from './companiesEditor/ServiceTreeItem.vue';
// import CompanyComponent from './CompanyComponent.vue';
import { FileDownload, Upload } from '@vicons/fa';
import fileDownload from 'js-file-download';
import {
  NButton,
  NSpace,
  NLog,
  NModal,
  NCard,
  NIcon,
  NTree,
  NText,
  useNotification,
  type TreeOption,
NTag,
} from 'naive-ui';

// vars
const companies = ref(Array<Company>());
const showPreviewModal: Ref<boolean> = ref(false);
// const dialog = useDialog();
const notification = useNotification();

// computed
const outputJson = computed({
  get: () => JSON.stringify(companies.value, null, 2),
  set: (val) => {
    companies.value = JSON.parse(val);
  },
});

// methods
function addCompany() {
  companies.value.push(
    new Company({
      id: `c${companies.value.length + 1}`,
      name: '',
      group: '',
      type: 'telecom',
      operationCompany: null,
    })
  );
}

function removeCompany(i: number) {
  companies.value.splice(i, 1);
}

const inputFileRef = ref<HTMLInputElement | null>(null);
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
      let companiesJson = JSON.parse(reader.result as string);
      companies.value = companiesJson;
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

function downloadJson() {
  fileDownload(outputJson.value, 'companies.json', 'text/plain');
}

const treeData: TreeOption[] = computed(() => {
  return companies.value.map((c: Company) => {
    return {
      key: c.id,
      company: c,
      isService: false,
      children: c.services.map((s: Service) => {
        return {
          key: s.id,
          service: s,
          isService: true,
        };
      }),
    };
  });
});

function renderLabel({ option }: { option: TreeOption }) {
  if (option.isService) {
    return h(ServiceTreeItem, { treeItem: option });
  } else {
    // return h(NText, { strong: true }, { default: () => option.company.label.current });
    return h(CompanyTreeItem, { treeItem: option, removeCompany });
  }
}

function renderPrefix({ option }: { option: TreeOption }) {
  return h(
    NText,
    { depth: 3, style: {fontSize: '0.7rem' } },
    { default: () => (option.isService ? 'Service' : 'Company') }
  );
}
</script>

<template>
  <n-card size="small">
    <n-tree
      block-line
      :data="treeData"
      :render-suffix="renderPrefix"
      :render-label="renderLabel"
      :selectable="false"
    ></n-tree>
    </n-card>
  <br />
  <n-card size="small" embebbed>
    <input
      ref="inputFileRef"
      type="file"
      accept="application/json"
      hidden
      @change="onFileChange"
    />
    <n-space align="center" justify="space-between">
      <n-button dashed size="tiny" type="info" @click="inputFile">
        <n-icon> <Upload /> </n-icon>&nbsp;Load JSON
      </n-button>
      <n-button
        secondary
        size="tiny"
        type="tertiary"
        @click="showPreviewModal = true"
        >Preview</n-button
      >
      <n-button strong type="primary" @click="downloadJson"
        ><n-icon> <FileDownload /> </n-icon>&nbsp;Download JSON</n-button
      >
    </n-space>
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
