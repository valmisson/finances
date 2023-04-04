<template>
  <page-views-list
    :page-title="$t('expenses')"
    page-route-name="expenses"
    :btn-title="$t('newExpense')"
    :table-headers="headers"
    :table-items="expenses"
    :table-empty="$t('msgEmptyExpense')"
    :modal-title="$t('msgDeleteExpense')"
    @delete-item="deleteExpense"
  />
</template>

<script setup lang="ts">
import { Expense } from '~/types/interface/expense'
import { TableHeader } from '~/types/components/tables'

const DB_COLLECTION = 'expenses'

const db = useDatabase()

const { t } = useI18n()

const headers = ref<TableHeader[]>([
  { text: t('name'), value: 'name' },
  { text: t('date'), value: 'date', sortable: true },
  { text: t('value'), value: 'value' }
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
