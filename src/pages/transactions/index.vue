<template>
  <page-views-list
    :page-title="$t('transactions')"
    page-route-name="transactions"
    :btn-title="$t('newTransaction')"
    :table-headers="headers"
    :table-items="transactions"
    :table-empty="$t('msgEmptyTransaction')"
    :modal-title="$t('msgDeleteTransaction')"
    @delete-item="deleteTransaction"
  />
</template>

<script setup lang="ts">
import { TableHeader } from '~/types/components/tables'
import { Transaction } from '~/types/interface/transaction'

const DB_COLLECTION = 'transactions'

const db = useDatabase()

const { t } = useI18n()

const headers = ref<TableHeader[]>([
  { text: t('name'), value: 'name' },
  { text: t('date'), value: 'date', sortable: true },
  { text: t('value'), value: 'value' },
  { text: t('type'), value: 'type' }
])

const transactions = ref<Transaction[]>([])

onMounted(async () => {
  await getTransactions()
})

async function getTransactions (): Promise<void> {
  const result = await db.getAll(DB_COLLECTION)

  transactions.value = result.data as Transaction[]
}

async function deleteTransaction (transactionId: string): Promise<void> {
  await db.delete(DB_COLLECTION, transactionId)

  await getTransactions()
}
</script>
