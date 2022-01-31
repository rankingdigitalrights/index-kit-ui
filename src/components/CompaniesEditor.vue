<script setup lang="ts">
import { computed, ref } from 'vue'
import { Company } from '../entities/Company';
import CompanyComponent from './CompanyComponent.vue'
// import { useMessage } from 'naive-ui'

const formRef = ref(null)
// const message = useMessage()
const companies = ref(Array<Company>())
const outputJson = computed({
  get: () => JSON.stringify(companies.value, null, 2),
  set: val => {
    companies.value = JSON.parse(val)
  }
})

function addCompany() {
  companies.value.push(new Company({
    id: `${companies.value.length}`,
    name: '',
    group: '',
    type: 'telecom',
    operationCompany: null
  }))
}

function removeCompany(i: number) {
  companies.value.splice(i, 1)
}
</script>

<template>
  <company-component v-for="(comp, indx) in companies" @close="removeCompany(indx)" :key="indx" :company="comp"></company-component>
  <n-button @click="addCompany">Add company</n-button>
  <n-input v-model:value="outputJson" type="textarea" style="font-family: monospace,monospace;" />
</template>
