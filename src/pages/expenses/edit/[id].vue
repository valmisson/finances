<template>
  <page-views
    :title="$t('editExpense')"
    :breadcrumbs="breadcrumbs"
  >
    <base-form-skeleton
      v-if="!expense"
      :fields-number="3"
    />

    <page-expenses-form
      v-else
      :expense="expense"
      :loading="loading"
      @submit="submitEdit"
    />
  </page-views>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '~/types/components/breadcrumb'
import type { Expense } from '~/types/interface/expense'

const route = useRoute()
const db = useDatabase()

const { t } = useI18n()

const expense = ref<Expense>()

const loading = ref<boolean>(false)
const errors = ref<string>('')

const expenseId = computed(() => route.params.id as string)
const expensesPageLink = ref(getPageLink('expenses'))

const breadcrumbs = ref<Breadcrumb[]>([
  { text: t('expenses'), href: expensesPageLink.value },
  { text: t('editExpense') }
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
      statusMessage: t('expenseNotFound', { id: expenseId })
    })
  }
}

async function submitEdit (content: Expense): Promise<void> {
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
