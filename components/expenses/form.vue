<template>
  <form class="form" @submit.prevent="$emit('submit', newExpenseData)">
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
        placeholder="Digite o valor"
        required
        @update:amount="updateExpenseValue"
      />
    </div>

    <div class="form-actions">
      <base-button>
        <Icon
          v-if="loading"
          name="mdi:loading"
          class="loading"
        />

        <span v-else>ENVIAR</span>
      </base-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  BaseCurrencyField,
  BaseTextField,
  BaseButton,
  Icon
} from '#components'

import { toTimestamp } from '~/utils/formats'

import { Expense } from '~/types/interface/expense'

defineProps<{
  loading: boolean
}>()

defineEmits(['submit'])

const expense = reactive<Expense>({
  name: '',
  date: '',
  value: undefined
})

const newExpenseData = computed(() => {
  expense.date = toTimestamp(expense.date) as any

  return expense
})

function updateExpenseValue (amount: number): void {
  expense.value = amount
}
</script>

<style scoped>
  .form {
    @apply grid grid-cols-1 lg:grid-cols-3 max-lg:gap-y-3 gap-x-4 lg:gap-x-8;
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
