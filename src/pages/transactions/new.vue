<template>
  <page-views
    :title="$t('newTransaction')"
    :breadcrumbs="breadcrumbs"
  >
    <page-transactions-form :loading="loading" @submit="submitNew" />
  </page-views>
</template>

<script setup lang="ts">
import { Breadcrumb } from '~/types/components/breadcrumb'
import { Transaction } from '~/types/interface/transaction'

const db = useDatabase()

const { t } = useI18n()

const loading = ref<boolean>(false)
const errors = ref<string>()

const transactionsPageLink = computed(() => getPageLink('transactions'))

const breadcrumbs = ref<Breadcrumb[]>([
  { text: t('transactions'), href: transactionsPageLink.value },
  { text: t('newTransaction') }
])

async function submitNew (content: Transaction): Promise<void> {
  try {
    loading.value = true

    await db.add('transactions', content)

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
