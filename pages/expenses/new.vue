<template>
  <base-subtitle>
    Nova Despesas
  </base-subtitle>

  <base-breadcrumb :items="breadcrumbs" />

  <base-card class="new-expenses">
    <expenses-form @submit="submitNew" />
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

const expensesPageLink = ref(getPageLink('expenses'))

const breadcrumbs = ref<Breadcrumb[]>([
  { text: 'Despesas', href: expensesPageLink.value },
  { text: 'Nova Despesas' }
])

function submitNew (content: Expense) {
  console.log(content)

  navigateTo(expensesPageLink.value)
}
</script>

<style scoped>
  .new-expenses {
    @apply mb-8;
  }
</style>
