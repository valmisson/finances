<template>
  <page-views
    :title="$t('editInvestment')"
    :breadcrumbs="breadcrumbs"
  >
    <base-form-skeleton
      v-if="!investment"
      :fields-number="3"
    />

    <page-investments-form
      v-else
      :investment="investment"
      :loading="loading"
      @submit="submitEdit"
    />
  </page-views>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '~/types/components/breadcrumb'
import type { Investment } from '~/types/interface/investment'

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
  { text: t('investments'), href: investmentsPageLink.value },
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

async function submitEdit (content: Investment) {
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
