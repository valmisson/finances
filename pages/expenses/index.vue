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
    no-items="Nenhuma despesa cadastrada"
    class="expenses"
  >
    <template #date="{ value }">
      {{ toDateFormated(value) }}
    </template>

    <template #value="{ value }">
      {{ toCurrencyFormated(value) }}
    </template>

    <template #actions="{ itemId }">
      <NuxtLink :to="`${getPageLink('expenses')}/edit/${itemId}`">
        EDITAR
      </NuxtLink>

      <button class="expenses-remove" @click="() => deleteExpense(itemId)">
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
import { toCurrencyFormated, toDateFormated } from '~/utils/formats'

import { Expense } from '~/types/interface/expense'
import { TableHeader } from '~/types/components/tables'

const DB_COLLECTION = 'expenses'

const db = useDatabase()

const expenses = ref<Expense[]>([])
const headers = ref<TableHeader[]>([
  { text: 'Nome', value: 'name' },
  { text: 'Data', value: 'date', sortable: true },
  { text: 'Valor', value: 'value' }
])

function gotNew (): void {
  navigateTo(`${getPageLink('expenses')}/new`)
}

async function getExpenses () {
  const result = await db.get(DB_COLLECTION)

  expenses.value = result.data as Expense[]
}

async function deleteExpense (id: string) {
  await db.delete(DB_COLLECTION, id)

  await getExpenses()
}

onMounted(async () => {
  await getExpenses()
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
