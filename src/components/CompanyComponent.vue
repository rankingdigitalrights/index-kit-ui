<script setup lang="ts">

// https://www.thisdot.co/blog/computing-application-state-in-vue-3

import { computed, ref } from 'vue'
import { Company } from '../entities/Company'
import { Service } from '../entities/Service';

const props = defineProps<{
  company: Company
}>()
const emit = defineEmits<{
  (e: 'update:company', value: Company): void,
  (e: 'delete:company'): void
}>()

const model = computed({
  get: () => props.company,
  set: val => {
    emit('update:company', val)
  }
})

const formRef = ref(null)
const companyTypes = ["telecom", "internet"].map(
  (v) => ({
    label: v,
    value: v
  })
)

function onCreate() {
  return new Service({
    id: '1',
    name: 'Service Name',
    type: 'mobile',
    subtype: 'prepaid'
  })
}

function handleClose() {
  emit('delete:company')
}
</script>

<template>
  <n-card closable @close="handleClose" :title="model.label.current">
  <n-form
    ref="formRef"
    label-placement="left"
    require-mark-placement="right-hanging"
    label-width="auto"
    :style="{
      maxWidth: '640px'
    }"
  >
    <n-form-item label="Company ID">
      <n-input v-model:value="model.id" placeholder="1" />
    </n-form-item>
    <n-form-item label="Company name">
      <n-input v-model:value="model.label.current" placeholder="ACME" />
    </n-form-item>
    <n-form-item label="Type">
      <n-select
        placeholder="Select"
        v-model:value="model.type"
        :options="companyTypes"
      />
    </n-form-item>
    <n-form-item label="Services">
      <n-dynamic-input
        v-model:value="model.services"
        :on-create="onCreate"
        #="{ value }"
      >
        <n-input v-model:value="value.id" type="text" />
        <n-input v-model:value="value.label.current" type="text" />
      </n-dynamic-input>
    </n-form-item>
  </n-form>
  </n-card>
  
  <!-- <pre>
    {{  JSON.stringify(model) }}
  </pre> -->
</template>
