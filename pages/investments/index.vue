<template>
  <page-views-list
    :page-title="$t('investment', 2)"
    page-route-name="investments"
    :btn-title="$t('newInvestment')"
    :table-headers="headers"
    :table-items="investments"
    :table-empty="$t('msgEmptyInvestment')"
    :modal-title="$t('msgDeleteInvestment')"
    @delete-item="deleteInvestment"
  />
</template>

<script setup lang="ts">
import { TableHeader } from '~/types/components/tables'
import { Investment } from '~/types/interface/investment'

const DB_COLLECTION = 'investments'

const db = useDatabase()

const { t } = useI18n()

const headers = ref<TableHeader[]>([
  { text: t('name'), value: 'name' },
  { text: t('date'), value: 'date', sortable: true },
  { text: t('value'), value: 'value' }
])

const investments = ref<Investment[]>([])

onMounted(async () => {
  await getInvestments()
})

async function getInvestments (): Promise<void> {
  const result = await db.getAll(DB_COLLECTION)

  investments.value = result.data as Investment[]
}

async function deleteInvestment (investmentId: string): Promise<void> {
  await db.delete(DB_COLLECTION, investmentId)

  await getInvestments()
}
</script>
