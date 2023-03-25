<template>
  <base-subtitle>
    Investimentos
  </base-subtitle>

  <base-button
    class="investments-new"
    @click="gotNew"
  >
    Novo investimento
  </base-button>

  <base-table
    :headers="headers"
    :items="investments"
    class="investments"
    no-items="Nenhum investimento cadastrado"
  >
    <template #date="{ value }">
      {{ toDateFormated(value) }}
    </template>

    <template #value="{ value }">
      {{ toCurrencyFormated(value) }}
    </template>

    <template #actions="{ itemId }">
      <NuxtLink :to="`${investmentsPageLink}/edit/${itemId}`">
        EDITAR
      </NuxtLink>

      <button class="investments-remove" @click="removeinvestment(itemId)">
        REMOVE
      </button>
    </template>
  </base-table>

  <base-modal-confirm
    title="Excluir despesa ?"
    :show="showModalConfirm"
    @modal:confirm="confirmDeleteInvestment"
  />
</template>

<script setup lang="ts">
import {
  BaseButton,
  BaseTable,
  BaseSubtitle
} from '#components'

import { getPageLink } from '~/utils/pageMap'
import { toCurrencyFormated, toDateFormated } from '~/utils/formats'

import { TableHeader } from '~/types/components/tables'
import { Investment } from '~/types/interface/investment'

const DB_COLLECTION = 'investments'

const db = useDatabase()

const headers = ref<TableHeader[]>([
  { text: 'Nome', value: 'name' },
  { text: 'Data', value: 'date', sortable: true },
  { text: 'Valor', value: 'value' }
])

const investments = ref<Investment[]>()

const showModalConfirm = ref<boolean>(false)
const investmentIdBeingDelete = ref<string>('')

const investmentsPageLink = computed(() => getPageLink('investments'))

onMounted(async () => {
  await getInvestments()
})

function gotNew (): void {
  navigateTo(`${investmentsPageLink.value}/new`)
}

async function getInvestments (): Promise<void> {
  const result = await db.getAll(DB_COLLECTION)

  investments.value = result.data as Investment[]
}

async function confirmDeleteInvestment (confirmed: boolean): Promise<void> {
  if (confirmed) {
    await db.delete(DB_COLLECTION, investmentIdBeingDelete.value)

    await getInvestments()
  }

  showModalConfirm.value = false
  investmentIdBeingDelete.value = ''
}

function removeinvestment (id: string): void {
  showModalConfirm.value = true
  investmentIdBeingDelete.value = id
}
</script>

<style scoped>
  .investments-new {
    @apply mt-6 mb-2 lg:mt-8 lg:mb-4;
  }

  .investments {
    @apply mt-6 lg:mt-4;
  }
  .investments-remove {
    @apply text-red-500;
  }
</style>
