<template>
  <page-views-list
    page-title="Investimentos"
    page-route-name="investments"
    btn-title="Novo investimento"
    :table-headers="headers"
    :table-items="investments"
    table-empty="Nenhum investimento cadastrado"
    modal-title="Excluir investimento ?"
    @delete-item="deleteInvestment"
  />
</template>

<script setup lang="ts">
import { TableHeader } from '~/types/components/tables'
import { Investment } from '~/types/interface/investment'

const DB_COLLECTION = 'investments'

const db = useDatabase()

const headers = ref<TableHeader[]>([
  { text: 'Nome', value: 'name' },
  { text: 'Data', value: 'date', sortable: true },
  { text: 'Valor', value: 'value' }
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
