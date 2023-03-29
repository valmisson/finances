<template>
  <page-views
    title="Editar Despesa"
    :breadcrumbs="breadcrumbs"
  >
    <page-expenses-form-skeleton v-if="!expense" />

    <page-expenses-form
      v-else
      :expense="expense"
      :loading="loading"
      @submit="editExpense"
    />
  </page-views>
</template>

<script setup lang="ts">
import { Breadcrumb } from '~/types/components/breadcrumb'
import { Expense } from '~/types/interface/expense'

const route = useRoute()
const db = useDatabase()

const expense = ref<Expense>()

const loading = ref<boolean>(false)
const errors = ref<string>('')

const expenseId = computed(() => route.params.id as string)
const expensesPageLink = ref(getPageLink('expenses'))

const breadcrumbs = ref<Breadcrumb[]>([
  { text: 'Despesas', href: expensesPageLink.value },
  { text: 'Editar Despesa' }
])

onMounted(async () => {
  if (expenseId.value) {
    await getExpense(expenseId.value)
  }
})

async function getExpense (expenseId: string): Promise<void> {
  const result = await db.getOne<Expense>('expenses', expenseId)

  if (result.success) {
    expense.value = result.data as Expense
  }

  if (!result.data) {
    showError({
      statusCode: 404,
      statusMessage: `Expense not found: ${expenseId}`
    })
  }
}

async function editExpense (content: Expense): Promise<void> {
  try {
    loading.value = true

    await db.update('expenses', expenseId.value, content)

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
