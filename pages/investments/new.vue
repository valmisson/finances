<template>
  <base-subtitle>
    Novo investimento
  </base-subtitle>

  <base-breadcrumb :items="breadcrumbs" />

  <base-card class="new-investments">
    <investments-form @submit="submitNew" />
  </base-card>
</template>

<script setup lang="ts">
import {
  BaseBreadcrumb,
  BaseCard,
  BaseSubtitle,
  InvestmentsForm
} from '#components'

import { Breadcrumb } from '~/types/components/breadcrumb'
import { Investment } from '~/types/interface/investment'

const db = useDatabase()

const loading = ref<boolean>(false)
const errors = ref<string>()

const investmentsPageLink = computed(() => getPageLink('investments'))

const breadcrumbs = ref<Breadcrumb[]>([
  { text: 'Investimentos', href: investmentsPageLink.value },
  { text: 'Novo investimento' }
])

async function submitNew (content: Investment): Promise<void> {
  try {
    loading.value = true

    await db.add('investments', content)

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
