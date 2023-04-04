<template>
  <page-views
    :title="$t('newInvestment')"
    :breadcrumbs="breadcrumbs"
  >
    <page-investments-form :loading="loading" @submit="submitNew" />
  </page-views>
</template>

<script setup lang="ts">
import { Breadcrumb } from '~/types/components/breadcrumb'
import { Investment } from '~/types/interface/investment'

const db = useDatabase()

const { t } = useI18n()

const loading = ref<boolean>(false)
const errors = ref<string>()

const investmentsPageLink = computed(() => getPageLink('investments'))

const breadcrumbs = ref<Breadcrumb[]>([
  { text: t('investments'), href: investmentsPageLink.value },
  { text: t('newInvestment') }
])

async function submitNew (content: Investment): Promise<void> {
  try {
    loading.value = true

    await db.add('investments', content)

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
