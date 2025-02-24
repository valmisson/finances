<template>
  <page-views
    :title="$t('newTransaction')"
    :breadcrumbs="breadcrumbs"
  >
    <base-form-skeleton
      v-if="!transaction"
      :fields-number="4"
    />

    <page-transactions-form
      v-else
      :transaction="transaction"
      :loading="loading"
      @submit="submitEdit"
    />
  </page-views>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '~/types/components/breadcrumb'
import type { Transaction } from '~/types/interface/transaction'

const DB_COLLECTION = 'transactions'

const route = useRoute()
const db = useDatabase()

const { t } = useI18n()

const transaction = ref<Transaction>()
const loading = ref<boolean>(false)
const errors = ref<string>()

const transactionId = computed(() => route.params.id)
const transactionsPageLink = computed(() => getPageLink('transactions'))

const breadcrumbs = ref<Breadcrumb[]>([
  { text: t('transactions'), href: transactionsPageLink.value },
  { text: t('editTransaction') }
])

onMounted(async () => {
  await getTransaction(transactionId.value as string)
})

async function getTransaction (transactionId: string) {
  const result = await db.getOne<Transaction>(DB_COLLECTION, transactionId)

  if (result.success) {
    transaction.value = result.data as Transaction
  }

  if (!result.data) {
    showError({
      statusCode: 404,
      statusMessage: t('transactionNotFound', { id: transactionId })
    })
  }
}

async function submitEdit (content: Transaction): Promise<void> {
  try {
    loading.value = true

    await db.update(DB_COLLECTION, transactionId.value as string, content)

    navigateTo(transactionsPageLink.value)
  } catch (error) {
    if (error instanceof Error) {
      errors.value = error.message
    }
  } finally {
    loading.value = false
  }
}
</script>
