<script setup lang="ts">
import { computed, h, ref, type Ref } from 'vue';
import { Company } from '../entities/Company';
// import CompanyComponent from './CompanyComponent.vue';
import { FileDownload, Upload, Times } from '@vicons/fa';
import fileDownload from 'js-file-download';
import {
  NButton,
  NSpace,
  NLog,
  NModal,
  NCard,
  NList,
  NListItem,
  NIcon,
  // NThing,
  NTag,
  NText,
  // // NH3,
  // useDialog,
  // NButtonGroup,
  useNotification,
  NDataTable,
  type DataTableColumns,
  NDivider,
} from 'naive-ui';

// vars
const companies = ref(Array<Company>());
const showPreviewModal: Ref<boolean> = ref(false);
// const dialog = useDialog();
const notification = useNotification();
// id
// type
// subtype
// label

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

function createColumns(): DataTableColumns<Company> {
  return [
    // {
    //   title: null,
    //   key: 'x',
    //   render(row) {
    //     return h(
    //       NButton,
    //       {
    //         text: true,
    //         type: 'error',
    //         size: 'small',
    //         onClick: () => removeCompany(row.index),
    //       },
    //       { default: h(NIcon, { component: Times }, null) }
    //     );
    //   },
    // },
    {
      type: 'selection',
      key: 'select',
      multiple: true,
    },
    {
      type: 'expand',
      key: 'servicesexp',
      expandable: (rowData) => rowData.services.length > 0,
      renderExpand: (rowData) => {
        // for each rowData.service
        return h(
          NList,
          {
            hoverable: false,
            bordered: true,
            style:{
              width: '80%',
              margin: '0 auto 40px',
            }
          },
          {
            default: () =>
              rowData.services.map((service) => {
                return h(
                  NListItem,
                  {
                    key: service.id,
                  },
                  {
                    default: () => [
                      h(
                        NText,
                        {
                          code: true,
                          style: { fontWeight: 600 },
                        },
                        { default: () => service.id }
                      ),
                      h(NDivider, { vertical: true }, {}),
                      h(
                        NText,
                        {
                          depth: 1,
                          type: 'info',
                        },
                        { default: () => service.label.current }
                      ),
                      h(NDivider, { vertical: true }, {}),
                      h(
                        NTag,
                        {
                          type: 'info',
                          size: 'small',
                          round: true,
                        },
                        { default: () => service.type }
                      ),
                      service.subtype
                        ? h(NDivider, { vertical: true }, {})
                        : null,
                      service.subtype
                        ? h(
                            NTag,
                            {
                              type: 'info',
                              size: 'small',
                              round: true,
                            },
                            { default: () => service.subtype }
                          )
                        : null,
                    ],
                  }
                );
              }),
          }
        );
      },
    },
    {
      title: 'ID',
      key: 'id',
      render(row) {
        return h(
          NText,
          {
            code: true,
            style: { fontWeight: 600 },
          },
          { default: () => row.id }
        );
      },
    },
    {
      title: 'Company name / Group',
      key: 'label.current',
      render(row) {
        // return row.label.current and groupLabel
        return h(
          'div',
          { style: { lineHeight: '1.1rem' } },
          {
            default: () => [
              h(
                NText,
                { type: 'primary', style: { fontWeight: 600 } },
                { default: () => row.label.current }
              ),
              h('br', {}, {}),
              h(
                NText,
                { depth: 3, style: { fontSize: '0.70rem' } },
                { default: () => `Group: ${row.groupLabel}` }
              ),
            ],
          }
        );
      },
    },
    // {
    //   title: 'Group',
    //   key: 'groupLabel',
    // },
    {
      title: 'Services',
      key: 'services',
      render(row) {
        return h(
          NText,
          {
            depth: row.services.length > 0 ? 1 : 3,
            italic: row.services.length == 0,
            type: row.services.length > 0 ? 'info' : 'default',
          },
          { default: () => `${row.services.length} services` }
        );
      },
    },
    {
      title: 'Type',
      key: 'type',
      render(row) {
        return h(
          NTag,
          {
            type: 'info',
            size: 'small',
          },
          { default: () => row.type.toLocaleUpperCase() }
        );
      },
    },
    {
      title: 'Operation Company',
      key: 'opComLabel',
      render(row) {
        if (row.opComLabel) {
          return row.opComLabel;
        } else {
          return h(
            NText,
            {
              depth: 3,
              italic: true,
            },
            { default: () => 'None' }
          );
        }
      },
    },
  ];
}

const columns = createColumns();
</script>

<template>
  <n-data-table :columns="columns" size="small" :data="companies" />
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
  <!-- <n-list bordered>
    <template #header>
      <n-button text type="info">
        <template #icon>
          <n-icon>
            <Plus @click="addCompany" />
          </n-icon>
        </template>
        New Company
      </n-button>
    </template>
    <n-list-item
      v-for="(company, index) in companies"
      :key="`company-${company.id}-${index}`"
    >
      <n-thing :title="company.label.current" content-indented>
        <template #header>
          <n-space align="center">
            <n-text size="10">
              {{ company.label.current }}
            </n-text>
            <n-text type="info" code style="fontsize: 0.7rem">
              {{ company.id }}
            </n-text>
          </n-space>
        </template>
        <template #header-extra>
          <n-button-group size="tiny">
            <n-button>
              <template #icon>
                <n-icon>
                  <PenAlt />
                </n-icon>
              </template>
            </n-button>
            <n-button type="error">
              <template #icon>
                <n-icon>
                  <Times />
                </n-icon>
              </template>
            </n-button>
          </n-button-group>
        </template>
        <template #action>
          <n-space>
            <n-button size="tiny">Add a service</n-button>
          </n-space>
        </template>
        <template #content>
          <n-data-table :columns="columns" :data="company.services" />
        </template>
      </n-thing>
    </n-list-item>
    <template #footer>
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
    </template>
  </n-list> -->
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
