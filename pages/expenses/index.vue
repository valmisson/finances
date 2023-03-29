<template>
  <page-views-list
    page-title="Despesas"
    page-route-name="expenses"
    btn-title="Nova Despesa"
    :table-headers="headers"
    :table-items="expenses"
    table-empty="Nenhuma despesa cadastrada"
    modal-title="Excluir despesa ?"
    @delete-item="deleteExpense"
  />
</template>

<script setup lang="ts">
import { Expense } from '~/types/interface/expense'
import { TableHeader } from '~/types/components/tables'

const DB_COLLECTION = 'expenses'

const db = useDatabase()

const headers = ref<TableHeader[]>([
  { text: 'Nome', value: 'name' },
  { text: 'Data', value: 'date', sortable: true },
  { text: 'Valor', value: 'value' }
])

const expenses = ref<Expense[]>([])

onMounted(async () => {
  await getExpenses()
})

async function getExpenses () {
  const result = await db.getAll(DB_COLLECTION)

  expenses.value = result.data as Expense[]
}

async function deleteExpense (expenseId: string): Promise<void> {
  await db.delete(DB_COLLECTION, expenseId)

  await getExpenses()
}
</script>
