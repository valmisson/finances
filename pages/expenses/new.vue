<template>
  <base-subtitle>
    Nova Despesas
  </base-subtitle>

  <base-breadcrumb :items="breadcrumbs" />

  <base-card class="new-expenses">
    <expenses-form :loading="loading" @submit="submitNew" />
  </base-card>
</template>

<script setup lang="ts">
import {
  BaseSubtitle,
  BaseBreadcrumb,
  BaseCard,
  ExpensesForm
} from '#components'

import { getPageLink } from '~/utils/pageMap'

import { Breadcrumb } from '~/types/components/breadcrumb'
import { Expense } from '~~/types/interface/expense'

const db = useDatabase()

const expensesPageLink = ref(getPageLink('expenses'))
const loading = ref<boolean>(false)
const errors = ref<string>('')

const breadcrumbs = ref<Breadcrumb[]>([
  { text: 'Despesas', href: expensesPageLink.value },
  { text: 'Nova Despesas' }
])

async function submitNew (content: Expense) {
  try {
    loading.value = true

    await db.add('expenses', content)

    loading.value = false

    navigateTo(expensesPageLink.value)
  } catch (error) {
    loading.value = false

    if (error instanceof Error) {
      errors.value = error.message
    }
  }
}
</script>

<style scoped>
  .new-expenses {
    @apply mb-8;
  }
</style>
