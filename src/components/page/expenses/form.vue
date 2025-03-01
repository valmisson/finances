<template>
  <base-form
    :loading="props.loading"
    @submit="$emit('submit', newExpenseData)"
  >
    <div>
      <label for="name">
        {{ $t('name') }}
      </label>

      <base-field-text
        id="name"
        v-model="formData.name"
        :placeholder="$t('enterName')"
        required
      />
    </div>

    <div>
      <label for="date">
        {{ $t('date') }}
      </label>

      <base-field-text
        v-model="formData.date"
        type="date"
        placeholder="dd/mm/aaaa"
        required
      />
    </div>

    <div>
      <label for="value">
        {{ $t('value') }}
      </label>

      <base-field-currency
        v-model="formData.value"
        :placeholder="$t('enterValue')"
        required
      />
    </div>
  </base-form>
</template>

<script setup lang="ts">
import type { Expense } from '~/types/interface/expense'

defineEmits(['submit'])

const props = defineProps<{
  expense?: Expense
  loading: boolean
}>()

const formData = reactive<Expense>({
  name: '',
  date: '',
  value: 0
})

const newExpenseData = computed(() => {
  const { name, date, value } = formData

  const expenseData: Expense = {
    name,
    date: String(toTimestamp(date)),
    value
  }

  return expenseData
})

onMounted(() => {
  if (props.expense) {
    const { name, date, value } = props.expense

    formData.name = name
    formData.date = toInputDate(date)
    formData.value = value
  }
})
</script>

<style scoped>
  .form {
    @apply grid grid-cols-1 lg:grid-cols-3
      max-lg:gap-y-3 gap-x-4 lg:gap-x-8;
  }

  label {
    @apply text-sm;
  }

  .form-actions {
    @apply col-span-1 lg:col-span-3 flex justify-end
      mt-7 mb-2 h-12;
  }

  .loading {
    @apply text-2xl animate-spin;
  }
</style>
