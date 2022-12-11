<script setup lang="ts">
import { computed, ref } from 'vue';
import { Company } from '../entities/Company';
import CompanyComponent from './CompanyComponent.vue';
import fileDownload from 'js-file-download';
// import { useMessage } from 'naive-ui'

// const message = useMessage()
const companies = ref(Array<Company>());
const outputJson = computed({
  get: () => JSON.stringify(companies.value, null, 2),
  set: (val) => {
    companies.value = JSON.parse(val);
  },
});

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

function downloadJson() {
  fileDownload(outputJson.value, 'companies.json', 'text/plain');
}
</script>

<template>
  <company-component
    v-for="(comp, indx) in companies"
    :key="indx"
    :company="comp"
    @close="removeCompany(indx)"
  ></company-component>
  <n-button @click="addCompany">Add company</n-button>
  <n-input
    v-model:value="outputJson"
    type="textarea"
    style="font-family: monospace, monospace"
  />
  <n-space>
    <n-button type="primary" @click="downloadJson">Download JSON</n-button>
  </n-space>
</template>
