<template>
  <page-views
    :title="$t('newExpense')"
    :breadcrumbs="breadcrumbs"
  >
    <page-expenses-form :loading="loading" @submit="submitNew" />
  </page-views>
</template>

<script setup lang="ts">
import { PageExpensesForm } from '#components'

import { Breadcrumb } from '~/types/components/breadcrumb'
import { Expense } from '~/types/interface/expense'

const db = useDatabase()

const { t } = useI18n()

const expensesPageLink = ref(getPageLink('expenses'))
const loading = ref<boolean>(false)
const errors = ref<string>('')

const breadcrumbs = ref<Breadcrumb[]>([
  { text: t('expense', 2), href: expensesPageLink.value },
  { text: t('newExpense') }
])

async function submitNew (content: Expense) {
  try {
    loading.value = true

    await db.add('expenses', content)

    navigateTo(expensesPageLink.value)
  } catch (error) {
    if (error instanceof Error) {
      errors.value = error.message
    }
  } finally {
    loading.value = false
  }
}
</script>
