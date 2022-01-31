<template>
  <n-radio-group
    v-model:value="size"
    name="left-size"
    style="margin-bottom: 12px;"
  >
    <n-radio-button value="small">Small</n-radio-button>
    <n-radio-button value="medium">Medium</n-radio-button>
    <n-radio-button value="large">Large</n-radio-button>
  </n-radio-group>
  <n-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
    :size="size"
  >
    <n-form-item label="Name" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
    </n-form-item>
    <n-form-item label="Age" path="user.age">
      <n-input v-model:value="formValue.user.age" placeholder="Input Age" />
    </n-form-item>
    <n-form-item label="Phone" path="phone">
      <n-input v-model:value="formValue.phone" placeholder="Phone Number" />
    </n-form-item>
    <n-form-item>
      <n-button @click="handleValidateClick">Validate</n-button>
    </n-form-item>
  </n-form>

  hiii

  <pre>
  {{  JSON.stringify(formValue, 0, 2) }}
  </pre>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
// import { NForm, NFormItem, NButton, NInput, NRadioGroup, NRadioButton } from 'naive-ui'

const formRef = ref(null)
const message = useMessage()
const size = ref('medium')
const formValue = ref({
  user: {
    name: '',
    age: ''
  },
  phone: ''
})
const rules = {
  user: {
    name: {
      required: true,
      message: 'Please input your name',
      trigger: 'blur'
    },
    age: {
      required: true,
      message: 'Please input your age',
      trigger: ['input', 'blur']
    }
  },
  phone: {
    required: true,
    message: 'Please input your number',
    trigger: ['input']
  }
}
function handleValidateClick (e) {
  e.preventDefault()
  formRef.value.validate((errors) => {
    if (!errors) {
      message.success('Valid')
    } else {
      console.log(errors)
      message.error('Invalid')
    }
  })
}
</script>