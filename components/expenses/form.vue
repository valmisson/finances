<template>
  <base-form
    :loading="props.loading"
    @submit="$emit('submit', newExpenseData)"
  >
    <div>
      <label for="name">
        Nome
      </label>

      <base-text-field
        id="name"
        v-model="expense.name"
        placeholder="Digite o nome"
        required
      />
    </div>

    <div>
      <label for="date">
        Data
      </label>

      <base-text-field
        v-model="expense.date"
        type="date"
        placeholder="dd/mm/aaaa"
        required
      />
    </div>

    <div>
      <label for="value">
        Valor
      </label>

      <base-currency-field
        v-model="expense.value"
        placeholder="Digite o valor"
        required
      />
    </div>
  </base-form>
</template>

<script setup lang="ts">
import { Expense } from '~/types/interface/expense'

defineEmits(['submit'])

const props = defineProps<{
  expense?: Expense
  loading: boolean
}>()

const expense = reactive<Expense>({
  name: '',
  date: '',
  value: 0
})

const newExpenseData = computed(() => {
  const { name, date, value } = expense

  const expenseData: Expense = {
    name,
    date: toTimestamp(date) as any,
    value
  }

  return expenseData
})

onMounted(() => {
  if (props.expense) {
    const { name, date, value } = props.expense

    expense.name = name
    expense.date = toInputDate(date)
    expense.value = value
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
