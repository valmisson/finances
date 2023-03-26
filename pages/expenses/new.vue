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
import { Breadcrumb } from '~/types/components/breadcrumb'
import { Expense } from '~/types/interface/expense'

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

<style scoped>
  .new-expenses {
    @apply mb-8;
  }
</style>
