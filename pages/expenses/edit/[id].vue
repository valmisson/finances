<template>
  <base-subtitle>
    Editar Despesas
  </base-subtitle>

  <base-breadcrumb :items="breadcrumbs" />

  <base-card class="edit-expense">
    <expenses-form-skeleton v-if="!hasExpense" />

    <expenses-form
      v-if="hasExpense"
      :expense="expense"
      :loading="loading"
      @submit="editExpense"
    />
  </base-card>
</template>

<script setup lang="ts">
import {
  BaseBreadcrumb,
  BaseCard,
  ExpensesForm
} from '#components'

import { getPageLink } from '~/utils/pageMap'
import { toInputDate } from '~/utils/formats'

import { Breadcrumb } from '~/types/components/breadcrumb'
import { Expense } from '~/types/interface/expense'

const route = useRoute()
const db = useDatabase()

const expense = reactive<Expense>({
  name: '',
  date: '',
  value: undefined
})

const expensesPageLink = ref(getPageLink('expenses'))
const loading = ref<boolean>(false)
const errors = ref<string>('')

const breadcrumbs = ref<Breadcrumb[]>([
  { text: 'Despesas', href: expensesPageLink.value },
  { text: 'Editar Despesas' }
])

const expenseId = computed(() => route.params.id as string)
const hasExpense = computed(() => expense.name && expense.value && expense.value)

onMounted(async () => {
  if (expenseId.value) {
    await getExpense(expenseId.value)
  }
})

async function getExpense (expenseId: string): Promise<void> {
  const result = await db.getOne<Expense>('expenses', expenseId)

  const expenseData = result.data

  if (expenseData) {
    expense.name = expenseData.name
    expense.date = toInputDate(expenseData.date)
    expense.value = expenseData.value
  }
}

async function editExpense (content: Expense): Promise<void> {
  try {
    loading.value = true

    await db.update('expenses', expenseId.value, content)

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
