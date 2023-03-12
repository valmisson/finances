<template>
  <base-subtitle>
    Despesas
  </base-subtitle>

  <base-button
    class="expenses-new"
    @click="gotNew"
  >
    NOVA DESPESA
  </base-button>

  <base-table
    :headers="headers"
    :items="expenses"
    class="expenses"
  >
    <template #actions="{ itemId }">
      <NuxtLink :to="`${getPageLink('expenses')}/edit/${itemId}`">
        EDITAR
      </NuxtLink>

      <button class="expenses-remove">
        REMOVE
      </button>
    </template>
  </base-table>
</template>

<script setup lang="ts">
import {
  BaseSubtitle,
  BaseButton,
  BaseTable
} from '#components'

import { getPageLink } from '~/utils/pageMap'

import { Expense } from '~/types/interface/expense'
import { TableHeader } from '~/types/components/tables'

const expenses = ref<Expense[]>([])
const headers = ref<TableHeader[]>([
  { text: 'Nome', value: 'name' },
  { text: 'Data', value: 'date', sortable: true },
  { text: 'Valor', value: 'value' }
])

function gotNew (): void {
  navigateTo(`${getPageLink('expenses')}/new`)
}

onMounted(() => {
  expenses.value = [
    { id: 'e48c', name: 'DAS MEI', date: '20/01/2023', value: 'R$ 71,00' },
    { id: '259a', name: 'Fatura Cartão', value: 'R$ 500,00', date: '05/02/2023' },
    { id: 'd3f3', name: 'Internet', date: '10/02/2023', value: 'R$ 79,00' },
    { id: 'c0c4', name: 'Comprar Peugeot 208 Allure 17/18', date: '15/03/2023', value: 'R$ 35.000,00' }
  ]
})
</script>

<style scoped>
  .expenses-new {
    @apply mt-6 mb-2 lg:mt-8 lg:mb-4;
  }

  .expenses {
    @apply mt-6 lg:mt-4;
  }

  .expenses-remove {
    @apply text-red-500;
  }
</style>
