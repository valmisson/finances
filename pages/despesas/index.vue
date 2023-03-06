<template>
  <base-subtitle>
    Despesas
  </base-subtitle>

  <base-button class="expenses-new">
    NOVA DESPESA
  </base-button>

  <base-card class="expenses">
    <base-table>
      <base-table-items
        v-for="expense in expenses"
        :key="expense.name"
        cols="grid-cols-2 md:grid-cols-4"
      >
        <base-table-item
          :title="expense.name"
          :value="expense.name"
          ellipsis
        />

        <base-table-item
          icon="mdi:calendar-month"
          icon-size="text-2xl md:text-lg"
          :value="expense.date"
        />

        <base-table-item
          icon="mdi:cash"
          icon-size="text-2xl"
          :value="expense.value"
        />

        <base-table-actions class="table-actions">
          <button class="table-actions-btn btn-edit">
            editar
          </button>

          <button class="table-actions-btn btn-remove">
            remover
          </button>
        </base-table-actions>
      </base-table-items>
    </base-table>
  </base-card>
</template>

<script setup lang="ts">
import {
  BaseButton,
  BaseCard,
  BaseTable,
  BaseTableItems,
  BaseTableItem,
  BaseTableActions,
  BaseSubtitle
} from '#components'

import { Expense } from '~/types/expense.interface'

const expenses = ref<Expense[]>([])

onMounted(() => {
  expenses.value = [
    { name: 'DAS MEI', date: '20/01/2023', value: 'R$ 71,00' },
    { name: 'Fatura Cartão', date: '05/02/2023', value: 'R$ 500,00' },
    { name: 'Internet', date: '10/02/2023', value: 'R$ 79,00' },
    { name: 'Comprar Peugeot 208 Allure 17/18', date: '15/03/2023', value: 'R$ 35.000,00' }
  ]
})
</script>

<style scoped>
  .expenses-new {
    @apply mt-6 lg:mt-8;
  }

  .expenses {
    @apply mt-8;
  }

  .table-items {
    @apply last:border-none last:pb-1;
  }

  .expenses .table-item {
    @apply max-md:[&:nth-child(3)]:mt-2 max-md:last:mt-2;
  }

  .table-actions {
    @apply max-lg:mt-3;
  }

  .table-actions-btn {
    @apply text-xs font-medium uppercase last:ml-4;
  }

  .btn-remove {
    @apply text-red-500;
  }
</style>
