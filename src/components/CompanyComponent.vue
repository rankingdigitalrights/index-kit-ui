<script setup lang="ts">
// https://www.thisdot.co/blog/computing-application-state-in-vue-3

import { computed, ref, watchEffect } from 'vue';
import { Company } from '../entities/Company';
import { Service } from '../entities/Service';

const props = defineProps<{
  company: Company;
}>();
const emit = defineEmits<{
  (e: 'update:company', value: Company): void;
  (e: 'delete:company'): void;
}>();

const model = computed({
  get: () => props.company,
  set: (val) => {
    emit('update:company', val);
  },
});

const formRef = ref(null);
const companyTypes = [
  { value: 'telecom', label: 'Telecom company' },
  { value: 'internet', label: 'Internet platform' },
];
const serviceTypes = [
  { value: 'mobile', label: 'Prepaid and postpaid mobile' },
  { value: 'broadband', label: 'Fixed-line broadband' },
  { value: 'cloud', label: 'Cloud service' },
  { value: 'eCommerce', label: 'eCommerce' },
  { value: 'email', label: 'Email' },
  { value: 'messagingVoip', label: 'Messaging & VoIP' },
  { value: 'mobileEcosystem', label: 'Mobile ecosystem' },
  { value: 'pda', label: 'Personal digital assistant ecosystem' },
  { value: 'photoVideo', label: 'Video & photo sharing' },
  { value: 'search', label: 'Search engine' },
  { value: 'socialNetworkBlogs', label: 'Social networking & blog' },
  { value: 'other', label: 'Other type of service' },
];
const serviceSubtypes = [
  { value: null, label: 'None' },
  { value: 'prepaid', label: 'Prepaid Service' },
  { value: 'postpaid', label: 'Postpaid Service' },
];

function onCreate() {
  return new Service({
    id: model.value.id + 's' + (model.value.services.length + 1),
    name: 'Service Name',
    type: 'other',
    subtype: null,
  });
}

function handleClose() {
  emit('delete:company');
}

watchEffect(() => {
  model.value.groupLabel = model.value.label.current;
  model.value.hasOpCom = Boolean(model.value.opComLabel);
});
</script>

<template>
  <n-card closable :title="model.label.current" @close="handleClose">
    <n-form
      ref="formRef"
      label-placement="left"
      require-mark-placement="right-hanging"
      label-width="auto"
      :style="{
        maxWidth: '800px',
      }"
    >
      <n-form-item label="Company ID">
        <n-input v-model:value="model.id" placeholder="1" />
      </n-form-item>
      <n-form-item label="Company name">
        <n-input v-model:value="model.label.current" placeholder="ACME" />
      </n-form-item>
      <n-form-item label="Operation Company">
        <n-input
          v-model:value="model.opComLabel"
          placeholder="No operation company"
        />
      </n-form-item>
      <n-form-item label="Type">
        <n-select
          v-model:value="model.type"
          placeholder="Select"
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
          <n-select
            v-model:value="value.type"
            :options="serviceTypes"
            placeholder="Service type"
          />
          <n-select
            v-model:value="value.subtype"
            :options="serviceSubtypes"
            placeholder="Service sub-type"
          />
        </n-dynamic-input>
      </n-form-item>
    </n-form>
  </n-card>

  <!-- <pre>
    {{  JSON.stringify(model) }}
  </pre> -->
</template>
