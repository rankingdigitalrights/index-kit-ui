<script setup lang="ts">
import { computed, h, ref, type Ref, type ComputedRef } from 'vue';
import type { Company } from '../entities/Company';
import type { Service } from '../entities/Service';
import CompanyTreeItem from './companiesEditor/CompanyTreeItem.vue';
import ServiceTreeItem from './companiesEditor/ServiceTreeItem.vue';
import CompanyForm from './companiesEditor/CompanyForm.vue';
import { FileDownload, Upload, TimesCircleRegular } from '@vicons/fa';
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
  useLoadingBar,
  type TreeOption,
  // NTag,
} from 'naive-ui';

// SET VARS
const companies = ref(Array<Company>());
const showPreviewModal: Ref<boolean> = ref(false);
const notification = useNotification();
const loadingBar = useLoadingBar();
const companyFormRef = ref(null);
const editingCompany: Ref<Company | null> = ref(null);

// METHODS

function submitCompany(company: Company): void {
  // if we are editing a company, replace the company with the new one
  if (editingCompany.value) {
    // find the index of the company
    const index = companies.value.findIndex(
      (c) => c.id === editingCompany.value?.id
    );
    // if the index is not found, show an error notification
    if (index === -1) {
      notification.error({
        title: 'Error',
        content: `There was an error while editing your company. Please try again.`,
        duration: 3000,
        keepAliveOnHover: true,
      });
      editingCompany.value = null; // remove the editing company
      // no need to reset the form from here, the form will reset itself
      return;
    }
    // replace the company with the new one
    companies.value.splice(index, 1, company);
    editingCompany.value = null; // remove the editing company
    // no need to reset the form from here, the form will reset itself
    return;
  } else {
    // if we are not editing a company, add the company to the list
    companies.value.push(company);
    return;
  }
}

function cancelEditing(): void {
  editingCompany.value = null;
}

function removeCompany(id: string) {
  // if the company is being edited, show a notification
  if (editingCompany.value?.id === id) {
    notification.error({
      title: 'Error',
      content: `You can't remove a company while editing it. Cancel the editing first.`,
      duration: 3000,
      keepAliveOnHover: true,
    });
    return;
  }
  // remove the id company
  companies.value = companies.value.filter((c) => c.id !== id);
}

const inputFileRef = ref<HTMLInputElement | null>(null);
function inputFile() {
  inputFileRef.value?.click();
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  loadingBar.start();
  if (file) {
    // if file is not a json
    if (file.type !== 'application/json') {
      notification.error({
        title: 'Error',
        content: `File is not a JSON config.`,
        duration: 3000,
        keepAliveOnHover: true,
      });
      loadingBar.error();
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
      loadingBar.finish();
    };

    reader.readAsText(file);
  } else {
    loadingBar.error();
  }
}

function downloadJson() {
  fileDownload(outputJson.value, 'companies.json', 'text/plain');
}

function editCompany(id: string) {
  const company = companies.value.find((c) => c.id === id);
  if (company && companyFormRef.value != null) {
    editingCompany.value = company;
    // @ts-ignore
    // component Company Form has a method called setEditCompany
    // and should not be null according to the if statement
    companyFormRef.value.setEditCompany(company);
  }
}

function renderLabel({ option }: { option: TreeOption }) {
  if (option.isService) {
    // @ts-ignore
    // component Service Tree Item has a prop called treeItem
    // and according to the VueJS docs, its correct to use it like this
    return h(ServiceTreeItem, { treeItem: option }, {});
  }
  // return h(NText, { strong: true }, { default: () => option.company.label.current });
  return h(
    // @ts-ignore
    // component Service Tree Item has a prop called treeItem
    // and according to the VueJS docs, its correct to use it like this
    CompanyTreeItem,
    {
      treeItem: option,
      onEditCompany: (id: string) => {
        editCompany(id);
      },
    },
    {}
  );
}

function renderPrefix({ option }: { option: TreeOption }) {
  return h(
    NSpace,
    {
      size: 'small',
      align: 'center',
      justify: 'center',
      wrap: true,
      itemStyle: { display: 'flex' },
    },
    {
      default: () => [
        h(
          NText,
          { depth: 3, style: { fontSize: '0.75rem' } },
          { default: () => (option.isService ? 'Service' : 'Company') }
        ),
        !option.isService
          ? h(
              NButton,
              {
                text: true,
                size: 'tiny',
                type: 'error',
                onClick: () => removeCompany(option.key as string),
              },
              {
                default: () => [
                  h(
                    NIcon,
                    {
                      component: TimesCircleRegular,
                      size: 'medium',
                    },
                    {}
                  ),
                ],
              }
            )
          : null,
      ],
    }
  );
  // return h(
  //   NText,
  //   { depth: 3, style: { fontSize: '0.7rem' } },
  //   { default: () => (option.isService ? 'Service' : 'Company') }
  // );
}

// COMPUTED

const outputJson = computed({
  get: () => JSON.stringify(companies.value, null, 2),
  set: (val) => {
    companies.value = JSON.parse(val);
  },
});

const treeData = computed(() => {
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

const nextCompanyIdNumber: ComputedRef<number> = computed(() => {
  // if the companies array is empty return 1
  if (companies.value.length === 0) {
    return 1;
  }
  const arrayOfIds = companies.value.map((c) => c.id);

  // extract from the end of each ID the number
  const arrayOfNumbers = arrayOfIds.map((id) => {
    const number = id.match(/\d+$/);
    if (number) {
      return parseInt(number[0]);
    }
    return 0;
  });

  // return the highest number + 1
  return Math.max(...arrayOfNumbers) + 1;
});

const companiesIdArray: ComputedRef<string[]> = computed(() => {
  const arrayOfIds = companies.value.map((c) => c.id);
  // if there is a editingCompany, remove the id from the array
  if (editingCompany.value) {
    return arrayOfIds.filter((id) => id !== editingCompany.value?.id);
  } else {
    return arrayOfIds;
  }
});

const serviceIdArray: ComputedRef<string[]> = computed(() => {
  const arraysOfIds = companies.value.reduce((acc, c) => {
    return [...acc, ...c.services.map((s) => s.id)];
  }, [] as string[]);

  // if there is a editingCompany, remove the services ids from the array
  if (editingCompany.value) {
    return arraysOfIds.filter(
      (id) => !editingCompany.value?.services.map((s) => s.id).includes(id)
    );
  } else {
    return arraysOfIds;
  }
});
</script>

<template>
  <CompanyForm
    ref="companyFormRef"
    :submit-company="submitCompany"
    :cancel-editing="cancelEditing"
    :next-number-id="nextCompanyIdNumber"
    :company-ids="companiesIdArray"
    :service-ids="serviceIdArray"
  ></CompanyForm>
  <br />
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
  <n-card embedded>
    <input
      ref="inputFileRef"
      type="file"
      accept="application/json"
      hidden
      @change="onFileChange"
    />
    <n-space align="center" justify="space-between">
      <n-button text type="primary" @click="inputFile">
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
