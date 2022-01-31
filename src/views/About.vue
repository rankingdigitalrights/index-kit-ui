<template>
  <div>This is an about page.</div>
  <companies-editor></companies-editor>
  <!-- <company-component v-model:company="comp" /> -->
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { ref } from 'vue'
import { Company } from '../entities/Company'
import CompaniesEditor from "../components/CompaniesEditor.vue"

const comp = ref(new Company({
  id: "1",
  name: "hola",
  group: "hola group",
  type: "telecom",
  operationCompany: null
}))
// import CompanyConfig from '../components/CompanyConfig.vue';
</script>