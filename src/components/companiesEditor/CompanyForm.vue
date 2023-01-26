<script setup lang="ts">
import {
  ref,
  watch,
  computed,
  defineProps,
  defineExpose,
  inject,
  type Ref,
  type ComputedRef,
} from 'vue';
import {
  NCard,
  NGrid,
  NGridItem,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NInputGroupLabel,
  NSelect,
  NDynamicInput,
  NSpace,
  NRadioGroup,
  NRadio,
  NH3,
  NCollapse,
  NCollapseItem,
  NIcon,
  NText,
  NAlert,
  useDialog,
  NPopover,
  type FormInst,
  type FormRules,
  type FormValidationError,
} from 'naive-ui';
import type { CompanyFormModel } from '@/entities/Company';
import { Company } from '@/entities/Company';
import { companyTypeArray } from '@/entities/Company';
import {
  Service,
  serviceTypeArray,
  serviceSubtypeArray,
} from '@/entities/Service';
import { AngleRight, QuestionCircle } from '@vicons/fa';

// SET PROPS

const props = defineProps<{
  submitCompany: (company: Company) => void;
  cancelEditing: () => void;
  nextNumberId: number;
  companyIds: string[];
  serviceIds: string[];
}>();

// SET VARS

const dialog = useDialog();

const formRef = ref<FormInst | null>(null);

const mode: Ref<'create' | 'edit'> = ref('create');

const optionId: Ref<'auto' | 'custom' | 'name'> = ref('auto');

const companyPrefixId: Ref<string> = ref('');

const isMobile = inject<Ref<Boolean> | undefined>('isMobile');

const companyModel: Ref<CompanyFormModel> = ref({
  id: optionId.value === 'auto' ? `c${props.nextNumberId}` : '',
  name: '',
  group: '',
  type: 'telecom',
  operationCompany: '',
  services: [],
});

const formRules: FormRules = {
  id: {
    required: true,
    message: 'Company ID is required',
    trigger: 'change',
    whitespace: false,
  },
  name: {
    required: true,
    message: 'Company name is required',
    trigger: 'change',
  },
  type: {
    required: true,
    message: 'Company type is required',
    trigger: 'change',
  },
  operationCompany: {
    required: false,
    message: 'Operation company is optional',
    trigger: 'change',
  },
  services: {
    id: {
      required: true,
      message: 'Service ID is required',
      trigger: 'change',
      whitespace: false,
    },
    name: {
      required: true,
      message: 'Service name is required',
      trigger: 'change',
    },
    type: {
      required: true,
      message: 'Service type is required',
      trigger: 'change',
    },
  },
};

// METHODS

function onlyAlphaNumeric(value: string): boolean {
  // allow only alphanumeric characters
  if (value === '') return true;
  let test: boolean = /^[a-zA-Z0-9]+$/.test(value);
  return test;
}

function submit() {
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (errors) {
      dialog.error({
        title: 'Error',
        content: `There are some errors in your form. Check and try again.`,
        positiveText: 'Ok!',
      });
      return;
    }

    if (checkDuplicatedServiceIds.value) {
      dialog.error({
        title: 'Error',
        content: `There are some duplicated service IDs. Check and try again.`,
        positiveText: 'Ok!',
      });
      return;
    }
    if (!validateAllServicesHaveName.value) {
      dialog.error({
        title: 'Error',
        content: `There are some services without name. Check and try again.`,
        positiveText: 'Ok!',
      });
      return;
    }
    if (!validateAllServicesHaveType.value) {
      dialog.error({
        title: 'Error',
        content: `There are some services without type. Check and try again.`,
        positiveText: 'Ok!',
      });
      return;
    }
    if (companyIdAlreadyExists.value) {
      dialog.error({
        title: 'Error',
        content: `Company ID already exists. Check and try again.`,
        positiveText: 'Ok!',
      });
      return;
    }
    if (serviceIDAlreadyExists.value) {
      dialog.error({
        title: 'Error',
        content: `Service ID already exists. Check and try again.`,
        positiveText: 'Ok!',
      });
      return;
    }

    // all validations passed, create company

    const company = new Company(companyModel.value);
    company.id = `${companyPrefixId.value}${company.id}`;
    // add each service
    companyModel.value.services.forEach((service) => {
      company.addService(new Service(service));
    });
    props.submitCompany(company);
    resetForm();
  });
}

function onCreateService() {
  return {
    // eslint-disable-next-line prettier/prettier
    id: `${companyPrefixId.value}${companyModel.value.id}-s${nextServiceIdNumber.value.toString()}`,
    name: '',
    type: null,
    subtype: null,
  };
}

function resetForm() {
  let newId: string = '';

  mode.value = 'create';

  // if companyPrefixId is not empty, add it to the id
  if (optionId.value === 'auto') {
    newId += 'c' + props.nextNumberId;
  }

  companyModel.value = {
    id: newId,
    name: '',
    group: '',
    type: companyModel.value.type,
    operationCompany: '',
    services: [],
  };

  props.cancelEditing();
}

function setEditCompany(company: Company) {
  mode.value = 'edit';
  const companyToEdit: CompanyFormModel = {
    id: company.id,
    name: company.label.current,
    group: '',
    type: company.type,
    operationCompany: company.opComLabel ?? '',
    services: [],
  };
  company.services.forEach((service) => {
    companyToEdit.services.push({
      id: service.id,
      name: service.label.current,
      type: service.type,
      subtype: service.subtype,
    });
  });
  companyModel.value = companyToEdit;
}

// COMPUTED

const companyIdName: ComputedRef<string> = computed(() => {
  let companyIdName: string = '';

  // make a copy of the companyModel.value string
  // and convert it to lowercase
  // then replace all non-alphanumeric characters with an empty string
  const name: string = companyModel.value.name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '  ');

  // if the name is only one word, return the first 3 letters
  if (name.indexOf(' ') === -1) companyIdName = name.slice(0, 3);

  // if the name is more than one word, add only the first word of each word to the finalCompanyName
  if (name.indexOf(' ') !== -1) {
    const words: string[] = name.split(' ');
    words.forEach((word) => {
      companyIdName += word.slice(0, 1);
    });
  }

  return companyIdName;
});

const nextServiceIdNumber = computed(() => {
  // if the companies array is empty return 1
  if (companyModel.value.services.length === 0) {
    return 1;
  }
  const arrayOfIds: string[] = companyModel.value.services.map(
    (service) => service.id
  );

  // extract from the end of each ID the number
  const arrayOfNumbers: number[] = arrayOfIds.map((id) => {
    const number = id.match(/\d+$/);
    if (number) {
      return parseInt(number[0]);
    }
    return 0;
  });

  // return the highest number + 1
  return Math.max(...arrayOfNumbers) + 1;
});

const checkDuplicatedServiceIds: ComputedRef<boolean> = computed(() => {
  const arrayOfIds: string[] = companyModel.value.services.map(
    (service) => service.id
  );
  const uniqueIds = new Set(arrayOfIds);
  return uniqueIds.size !== arrayOfIds.length;
});

const validateAllServicesHaveName: ComputedRef<boolean> = computed(() => {
  const arrayOfNames: string[] = companyModel.value.services.map(
    (service) => service.name
  );
  return arrayOfNames.every((name) => name !== '');
});

const validateAllServicesHaveType: ComputedRef<boolean> = computed(() => {
  const arrayOfTypes: string[] = companyModel.value.services.map(
    (service) => service.type
  );
  return arrayOfTypes.every((type) => type !== null);
});

const companyIdAlreadyExists: ComputedRef<boolean> = computed(() => {
  return props.companyIds.some(
    (companyId) => companyId === companyModel.value.id
  );
});

const serviceIDAlreadyExists: ComputedRef<boolean> = computed(() => {
  // get array of all service ids
  const arrayOfIds: string[] = companyModel.value.services.map(
    (service) => service.id
  );
  return props.serviceIds.some((serviceId) => arrayOfIds.includes(serviceId));
});

// WATCHERS

watch(
  () => props.nextNumberId,
  (val) => {
    // if companyPrefixId is not empty, add it to the id
    if (optionId.value === 'auto') {
      companyModel.value.id = 'c' + val;
    }
    return;
  },
  {}
);

watch(
  () => optionId.value,
  (val) => {
    if (val === 'auto') {
      companyModel.value.id = 'c' + props.nextNumberId;
    } else if (val === 'custom') {
      companyModel.value.id = '';
    } else if (val === 'name') {
      companyModel.value.id = companyIdName.value;
    }
  }
);

watch(
  () => companyModel.value.name,
  () => {
    if (optionId.value === 'name') {
      companyModel.value.id = companyIdName.value;
    }
  }
);

// EXPOSE

defineExpose({ setEditCompany });
</script>

<template>
  <n-card
    class="card-shadowed"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
  >
    <template #default>
      <n-h3 v-if="mode === 'create'">Add new company</n-h3>
      <n-h3 v-else>Edit company</n-h3>
      <n-collapse display-directive="show">
        <template #arrow>
          <n-icon color="#eb6a5b">
            <angle-right />
          </n-icon>
        </template>
        <template #header> </template>

        <n-collapse-item name="1">
          <template #header>
            <i>Company ID Settings</i>
          </template>
          <n-card size="small" embedded>
            <n-space>
              <n-radio-group v-model:value="optionId" name="radiogroup">
                <n-space vertical>
                  <n-radio value="auto">
                    Generate the ID for the company automatically
                  </n-radio>
                  <n-radio value="name">
                    Generate ID based on the company name
                  </n-radio>
                  <n-radio value="custom">Let me enter the company ID</n-radio>
                </n-space>
              </n-radio-group>
              <n-grid :x-gap="24" :cols="isMobile ? 1 : 2">
                <n-grid-item>
                  <n-input-group>
                    <n-input-group-label size="small">
                      Company ID Prefix
                    </n-input-group-label>
                    <n-input
                      size="small"
                      :allow-input="onlyAlphaNumeric"
                      v-model:value="companyPrefixId"
                      placeholder="Ex. com-"
                    />
                  </n-input-group>
                </n-grid-item>
              </n-grid>
            </n-space>
          </n-card>
        </n-collapse-item>
      </n-collapse>
      <br />
      <n-form
        ref="formRef"
        :model="companyModel"
        require-mark-placement="right-hanging"
        :rules="formRules"
        :style="{
          // maxWidth: '800px',
        }"
      >
        <n-grid :x-gap="24" :cols="isMobile ? 1 : 2">
          <n-grid-item>
            <n-form-item path="name">
              <template #label>
                <span class="custom-label">Company Name</span>
              </template>
              <n-input
                v-model:value="companyModel.name"
                placeholder="Ex. ACME"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item path="id">
              <template #label>
                <span class="custom-label">Company ID</span>
              </template>
              <n-space vertical style="width: 100%" size="small">
                <n-input-group>
                  <n-input-group-label v-if="companyPrefixId">{{
                    companyPrefixId
                  }}</n-input-group-label>
                  <n-input
                    v-model:value="companyModel.id"
                    :allow-input="onlyAlphaNumeric"
                    placeholder="Ex. ARD001"
                  />
                </n-input-group>
                <!-- <n-text depth="3">Result: {{ finalCompanyId }}</n-text> -->
              </n-space>
            </n-form-item>
          </n-grid-item>
        </n-grid>
        <n-grid :x-gap="24" :cols="isMobile ? 1 : 2">
          <n-grid-item>
            <n-form-item path="operationCompany">
              <template #label>
                <span class="custom-label">Operation company</span>
              </template>
              <n-input
                v-model:value="companyModel.operationCompany"
                placeholder="No operation company"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item path="type">
              <template #label>
                <span class="custom-label">Type</span>
              </template>
              <n-select
                v-model:value="companyModel.type"
                placeholder="Select"
                :options="companyTypeArray"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
        <n-form-item>
          <template #label>
            <span class="custom-label">Services</span>&nbsp;
            <n-popover trigger="click" placement="right">
              <template #trigger>
                <n-button text type="info"
                  ><n-icon><QuestionCircle /></n-icon
                ></n-button>
              </template>
              <template #default>
                <n-text strong>ID, Name and Type</n-text> are
                <n-text underline>required</n-text>
              </template>
              <template #footer>
                <n-text depth="3" italic>Subtype is optional</n-text>
              </template>
            </n-popover>
          </template>
          <n-dynamic-input
            v-model:value="companyModel.services"
            show-sort-button
            :on-create="onCreateService"
            :create-button-props="{
              type: 'primary',
            }"
          >
            <template #create-button-default> Add a new service </template>
            <template #default="{ value }">
              <div class="wrapper-line">
                <n-input
                  v-model:value="value.id"
                  type="text"
                  placeholder="ID *"
                  :allow-input="onlyAlphaNumeric"
                />
                <n-input
                  v-model:value="value.name"
                  type="text"
                  placeholder="Name *"
                />
                <n-select
                  v-model:value="value.type"
                  :options="serviceTypeArray"
                  :consistent-menu-width="false"
                  placeholder="Type *"
                />
                <n-select
                  v-model:value="value.subtype"
                  :options="serviceSubtypeArray"
                  :consistent-menu-width="false"
                  placeholder="Sub-type"
                />
              </div>
            </template>
          </n-dynamic-input>
        </n-form-item>
      </n-form>
      <n-space vertical>
        <n-alert
          title="Duplicated service IDs"
          type="warning"
          v-show="checkDuplicatedServiceIds"
        >
          There is a duplicated service ID in the list of services of the
          company. Please check the list and correct the IDs.
        </n-alert>
        <n-alert
          title="Company ID already exists"
          type="error"
          v-show="companyIdAlreadyExists"
        >
          The company ID <n-text strong>"{{ companyModel.id }}"</n-text> already
          exists in the list of companies and services.
        </n-alert>
        <n-alert
          title="A service ID already exists"
          type="warning"
          v-show="serviceIDAlreadyExists"
        >
          A service ID already exists in the list of services of another
          company.
        </n-alert>
      </n-space>
    </template>
    <template #action>
      <n-space align="center" justify="space-between">
        <n-button type="default" @click="resetForm">{{
          mode == 'edit' ? 'Cancel' : 'Clear form'
        }}</n-button>
        <n-button type="primary" @click="submit"
          >{{ mode == 'edit' ? 'Edit' : 'Create' }} company</n-button
        >
      </n-space>
    </template>
  </n-card>
</template>

<style lang="scss">
.wrapper-line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  .n-input,
  .n-input-group,
  .n-select {
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    width: 100%;
    margin: 0 5px;
  }
}
</style>
