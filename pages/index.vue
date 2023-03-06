<template>
  <base-subtitle>
    Overview
  </base-subtitle>

  <base-card class="balance">
    <base-card-title>
      Saldo
    </base-card-title>

    <base-card-text class="balance-box">
      <div v-if="!balanceDisplay" class="balance-hide">
        &nbsp;
      </div>

      <h4 v-if="balanceDisplay" class="balance-value">
        {{ balanceFormat }}
      </h4>

      <button class="balance-display" @click="toggleBalanceDisplay">
        <Icon class="balance-display-icon" :name="balanceHideIcon" />
      </button>
    </base-card-text>
  </base-card>

  <base-card class="transactions">
    <base-card-title>
      Transações Recentes
    </base-card-title>

    <base-table>
      <base-table-items
        v-for="transaction in transactions"
        :key="transaction.name"
        cols="grid-cols-2 md:grid-cols-4"
      >
        <NuxtLink to="#" class="transactions-link">
          <base-table-item
            :value="transaction.name"
            :title="transaction.name"
            class="transactions-name"
            ellipsis
          />
        </NuxtLink>

        <base-table-item
          icon="mdi:calendar-month"
          icon-size="text-lg"
          :value="transaction.date"
        />

        <base-table-item
          icon="mdi:cash"
          icon-size="text-2xl"
          :text-color="transaction.type.withdrawal ? 'text-red-500': 'text-green-500'"
          :value="transaction.value"
        />

        <base-table-item
          icon="mdi:compare-horizontal"
          :value="transaction.type.name"
        />
      </base-table-items>
    </base-table>

    <base-card-actions>
      <NuxtLink :to="getPageLink('transactions')" class="see-all">
        ver todos
      </NuxtLink>
    </base-card-actions>
  </base-card>

  <div class="row">
    <base-card class="expenses">
      <base-card-title>
        Próximas Despesas
      </base-card-title>

      <base-table v-if="expenses.length">
        <base-table-items
          v-for="expense in expenses"
          :key="expense.name"
          cols="grid-cols-2"
        >
          <base-table-item
            :title="expense.name"
            :value="expense.name"
            ellipsis
          />

          <base-table-item
            icon="mdi:calendar-month"
            icon-size="text-lg"
            :value="expense.date"
          />
        </base-table-items>
      </base-table>

      <base-table-empty v-else>
        Nenhuma despesas cadastradas
      </base-table-empty>

      <base-card-actions v-if="expenses.length">
        <NuxtLink :to="getPageLink('expenses')" class="see-all">
          ver todos
        </NuxtLink>
      </base-card-actions>
    </base-card>

    <base-card class="investments">
      <base-card-title>
        Próximos Investimentos
      </base-card-title>

      <base-table v-if="investments.length">
        <base-table-items
          v-for="investment in investments"
          :key="investment.name"
          cols="grid-cols-2"
        >
          <base-table-item
            :title="investment.name"
            :value="investment.name"
            ellipsis
          />

          <base-table-item
            icon="mdi:calendar-month"
            icon-size="text-lg"
            :value="investment.date"
          />
        </base-table-items>
      </base-table>

      <base-table-empty v-else>
        Nenhum investimento cadastrado
      </base-table-empty>

      <base-card-actions v-if="investments.length">
        <NuxtLink :to="getPageLink('investments')" class="see-all">
          ver todos
        </NuxtLink>
      </base-card-actions>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import {
  BaseCard,
  BaseCardTitle,
  BaseCardText,
  BaseSubtitle,
  BaseTable,
  BaseTableItems,
  BaseTableItem,
  BaseTableEmpty
} from '#components'

import pageMap from '~/utils/pageMap'

import { Transaction } from '~/types/transaction.interface'
import { Expense } from '~/types/expense.interface'
import { Investment } from '~/types/investment.interface'

const balanceValue = ref<number>(5101)
const balanceDisplay = ref<boolean>(false)
const transactions = ref<Transaction[]>([])
const expenses = ref<Expense[]>([])
const investments = ref<Investment[]>([])

const balanceFormat = computed(() => {
  return Intl.NumberFormat(
    'pt-br',
    { style: 'currency', currency: 'BRL' }
  ).format(balanceValue.value)
})

const balanceHideIcon = computed(() => {
  return balanceDisplay.value ? 'ic:baseline-remove-red-eye' : 'ic:round-visibility-off'
})

function getPageLink (name: string) {
  return pageMap.find(page => page.name === name)?.href
}

function toggleBalanceDisplay () {
  balanceDisplay.value = !balanceDisplay.value

  useCookie<boolean>('balance_display').value = balanceDisplay.value
}

onMounted(() => {
  balanceDisplay.value = useCookie<boolean>('balance_display').value ?? false

  transactions.value = [
    {
      name: 'Serviço Fix Bugs',
      date: '27/01/2023',
      value: '+R$ 1.200,00',
      type: {
        name: 'Deposito',
        withdrawal: false
      }
    },
    {
      name: 'Pagt. Faculdade Engenharia de Software',
      date: '10/01/2023',
      value: '-R$ 99,00',
      type: {
        name: 'Saque',
        withdrawal: true
      }
    },
    {
      name: 'Invest. CDB POS DI',
      date: '02/01/2023',
      value: '+R$ 4.000,00',
      type: {
        name: 'Investimento',
        withdrawal: false
      }
    }
  ]

  expenses.value = [
    { name: 'DAS MEI', date: '20/01/2023' },
    { name: 'Fatura Cartão', date: '05/02/2023' },
    { name: 'Internet', date: '10/02/2023' }
  ]

  investments.value = [
    { name: 'CBD DI Liquidez', date: '02/02/2023' },
    { name: 'Tesouro Direto', date: '02/02/2023' },
    { name: 'INTR, GOGL34', date: '02/03/2023' }
  ]

  // expenses.value.length = 0
})
</script>

<style scoped>
  .row {
    @apply lg:grid lg:grid-cols-2 lg:gap-10;
  }

  .see-all {
    @apply text-gray-400 text-xs uppercase py-1 mt-4 hover:text-primary;
  }

  /* Balance */

  .balance {
    @apply w-60 lg:mt-8;
  }

  .balance-box {
    @apply flex justify-between text-xl font-medium;
  }

  .balance-hide {
    @apply bg-gradient-to-r from-gray-200 to-gray-100 w-3/5 h-7;
  }

  .balance-value {
    @apply text-xl font-medium;
  }

  .balance-display {
    @apply text-gray-400 mt-0;
  }

  .balance-display-icon {
    @apply block;
  }

  /* Transactions */

  .transactions {
    @apply min-w-full lg:mt-8;
  }

  .transactions .table-item {
    @apply max-md:[&:nth-child(3)]:mt-2 max-md:last:mt-2;
  }

  .transactions-link {
    @apply transition-all duration-300 hover:underline;
  }

  .transactions-name {
    @apply w-11/12 !mt-0;
  }
</style>
