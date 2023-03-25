<template>
  <base-subtitle>
    Editar Investimento
  </base-subtitle>

  <base-breadcrumb
    :items="breadcrumbs"
  />

  <base-card>
    <investments-form-skeleton v-if="!investment" />

    <investments-form
      v-else
      :investment="investment"
      @submit="editInvestment"
    />
  </base-card>
</template>

<script setup lang="ts">
import {
  BaseCard,
  BaseBreadcrumb,
  BaseSubtitle,
  InvestmentsForm,
  InvestmentsFormSkeleton
} from '#components'

import { getPageLink } from '~/utils/pageMap'

import { Breadcrumb } from '~/types/components/breadcrumb'
import { Investment } from '~/types/interface/investment'

const DB_COLLECTION = 'investments'

const route = useRoute()
const db = useDatabase()

const investment = ref<Investment>()
const loading = ref<boolean>(false)
const errors = ref<string>()

const investmentId = computed(() => route.params.id)
const investmentsPageLink = computed(() => getPageLink('investments'))

const breadcrumbs = ref<Breadcrumb[]>([
  { text: 'Investimentos', href: investmentsPageLink.value },
  { text: 'Editar investimento' }
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
      statusMessage: `Investment not found: ${investmentId}`
    })
  }
}

async function editInvestment (content: Investment) {
  try {
    loading.value = true

    await db.update(DB_COLLECTION, investmentId.value as string, content)

    loading.value = false

    navigateTo(investmentsPageLink.value)
  } catch (error) {
    loading.value = false

    if (error instanceof Error) {
      errors.value = error.message
    }
  }
}
</script>
