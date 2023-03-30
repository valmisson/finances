<template>
  <page-views
    :title="$t('editInvestment')"
    :breadcrumbs="breadcrumbs"
  >
    <page-investments-form-skeleton v-if="!investment" />

    <page-investments-form
      v-else
      :investment="investment"
      :loading="loading"
      @submit="editInvestment"
    />
  </page-views>
</template>

<script setup lang="ts">
import { Breadcrumb } from '~/types/components/breadcrumb'
import { Investment } from '~/types/interface/investment'

const DB_COLLECTION = 'investments'

const route = useRoute()
const db = useDatabase()

const { t } = useI18n()

const investment = ref<Investment>()
const loading = ref<boolean>(false)
const errors = ref<string>()

const investmentId = computed(() => route.params.id)
const investmentsPageLink = computed(() => getPageLink('investments'))

const breadcrumbs = ref<Breadcrumb[]>([
  { text: t('investment', 2), href: investmentsPageLink.value },
  { text: t('editInvestment') }
])

onMounted(async () => {
  await getInvestment(investmentId.value as string)
})

async function getInvestment (investmentId: string) {
  const result = await db.getOne(DB_COLLECTION, investmentId)

  if (result.success) {
    investment.value = result.data as Investment
  }

  if (!result.data) {
    showError({
      statusCode: 404,
      statusMessage: t('investmentNotFound', { id: investmentId })
    })
  }
}

async function editInvestment (content: Investment) {
  try {
    loading.value = true

    await db.update(DB_COLLECTION, investmentId.value as string, content)

    navigateTo(investmentsPageLink.value)
  } catch (error) {
    if (error instanceof Error) {
      errors.value = error.message
    }
  } finally {
    loading.value = false
  }
}
</script>
