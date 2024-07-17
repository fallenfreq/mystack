<template>
  <div class="shadow-md border rounded-lg p-8 w-full lg:max-w-lg">
    <div class="mb-5">
      <h2 class="text-3xl">Vuestic Demo</h2>
      <p>This is just a demo of a Vuestic form.</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://ui.vuestic.dev/introduction/overview"
        >https://ui.vuestic.dev/introduction/overview</a
      >
    </div>

    <VaForm ref="formRef" class="flex flex-col items-baseline gap-6">
      <VaInput
        v-model="form.firstName"
        :rules="[(value: string) => (value && value.length > 0) || 'First name is required']"
        label="firstName"
      />

      <VaInput
        v-model="form.lastName"
        :rules="[(value: string) => (value && value.length > 0) || 'Last name is required']"
        label="Last Name"
      />

      <!-- Can't import type DateInputModelValue. -->
      <VaDateInput
        v-model="form.birthDate"
        :rules="[(v: any) => validateBirthday(v)]"
        label="Birth Date"
        manual-input
        clearable
      />

      <VaTimeInput
        v-model="form.time"
        :rules="[(v: Date) => v || 'We need to now pick-up time!']"
        label="Pick-up time"
        manual-input
        clearable
      />

      <VaCounter
        v-model="form.count"
        label="Amount"
        :rules="[
          (v: string) => v || 'Field is required',
          (v: number) => v < 10 || 'You can not buy less than 10 items'
        ]"
        manual-input
      />

      <!-- Can't import type SelectableOption Directly. -->
      <VaSelect
        v-model="form.country"
        :options="countries"
        :rules="[
          (v: SelectOption) => v || 'Field is required',
          (v: SelectOption) =>
            v && typeof v === 'object' && v.value === 'ua'
              ? 'Delivery currently unavailable in your country'
              : undefined
        ]"
        label="Country"
      />

      <VaSlider
        v-model="form.amount"
        :min="1"
        :max="100"
        :rules="[
          (v: any) => v || 'Field is required',
          (v: number) =>
            (form.country === 'us' && v > 20) || 'Package to US can not be more than 20kg'
        ]"
        label="Weight, kg"
        style="width: 100%"
      />

      <VaSwitch
        v-model="form.notifications"
        label="Notifications"
        size="small"
        :rules="[(v: string) => v || 'You must agree on notifications']"
      />

      <div>
        <span class="va-title">Payment method</span>
        <VaOptionList
          v-model="form.paymentMethod"
          :options="['Visa', 'MasterCard', 'PayPal']"
          :rules="[(v: string) => v === 'PayPal' || 'Only PayPal is currently available']"
          type="radio"
        />
      </div>

      <VaCheckbox
        v-model="form.acknowledgement"
        :rules="[(v: string) => v || 'You must agree with terms and conditions']"
        label="I'm okay if you lose my package"
      />

      <VaButton :disabled="!isValid" @click="validate() && submit()"> Submit </VaButton>
    </VaForm>

    <div class="mt-8 flex w-full gap-3 background-element">
      <VaButton @click="validate() && submit()"> Validate </VaButton>
      <VaButton @click="resetValidation"> Reset validation </VaButton>
      <VaButton @click="reset"> Reset </VaButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useForm, type SelectOption } from 'vuestic-ui'
const { isValid, validate, reset, resetValidation } = useForm('formRef')

const form = reactive({
  firstName: '',
  lastName: '',
  country: '',
  birthDate: null as Date | null,
  time: null as Date | null,
  acknowledgement: false,
  notifications: true,
  paymentMethod: '',
  amount: 1,
  count: 1
})

const countries = [
  { value: 'ua', text: 'Ukraine' },
  { value: 'us', text: 'USA' },
  { value: 'uk', text: 'United Kingdom' }
]

const validateBirthday = (value: Date | null) => {
  if (!value) {
    return 'Field is required'
  }

  const today = new Date()
  let yearDiff = today.getFullYear() - value.getFullYear()
  const monthDiff = today.getMonth() - value.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
    yearDiff--
  }

  return yearDiff >= 18 || 'You must be at least 18 years old'
}

const submit = () => alert('Form submitted!')
</script>
