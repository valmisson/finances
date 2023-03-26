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

    <base-table
      :headers="transactionsHeaders"
      :items="transactions"
      no-items="Nenhuma transação cadastrada"
    >
      <template #value="{ value, item }">
        <div
          :class="item.type.value.withdrawal ? 'text-red-500': 'text-green-500'"
        >
          {{ value }}
        </div>
      </template>

      <template #type="{ value }">
        {{ value.name }}
      </template>
    </base-table>

    <base-card-actions v-if="transactions.length">
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

      <base-table
        :headers="simplesHeaders"
        :items="expenses"
        no-items="Nenhuma despesas cadastradas"
      />

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

      <base-table
        :headers="simplesHeaders"
        :items="investments"
        no-items="Nenhum investimento cadastrado"
      />

      <base-card-actions v-if="investments.length">
        <NuxtLink :to="getPageLink('investments')" class="see-all">
          ver todos
        </NuxtLink>
      </base-card-actions>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import { Transaction } from '~/types/interface/transaction'
import { Expense } from '~/types/interface/expense'
import { Investment } from '~/types/interface/investment'
import { TableHeader } from '~/types/components/tables'

const db = useDatabase()

const balanceValue = ref<number>(5101)
const balanceDisplay = ref<boolean>(false)

const transactions = ref<Transaction[]>([])
const expenses = ref<Expense[]>([])
const investments = ref<Investment[]>([])

const transactionsHeaders = ref<TableHeader[]>([
  { text: 'Nome', value: 'name' },
  { text: 'Data', value: 'date' },
  { text: 'Valor', value: 'value' },
  { text: 'Tipo', value: 'type' }
])

const simplesHeaders = ref<TableHeader[]>([
  { text: 'Nome', value: 'name' },
  { text: 'Data', value: 'date' }
])

const balanceFormat = computed(() => {
  return Intl.NumberFormat(
    'pt-br',
    { style: 'currency', currency: 'BRL' }
  ).format(balanceValue.value)
})

const balanceHideIcon = computed(() => {
  return balanceDisplay.value ? 'ic:baseline-remove-red-eye' : 'ic:round-visibility-off'
})

onMounted(async () => {
  balanceDisplay.value = useCookie<boolean>('balance_display').value ?? false

  await getExpenses()

  await getInvestments()

  transactions.value = [
    {
      id: 'er3r',
      name: 'Serviço Fix Bugs',
      date: '27/01/2023',
      value: '+R$ 1.200,00',
      type: {
        name: 'Deposito',
        withdrawal: false
      }
    }
  ]
})

function toggleBalanceDisplay () {
  balanceDisplay.value = !balanceDisplay.value

  useCookie<boolean>('balance_display').value = balanceDisplay.value
}

async function getExpenses () {
  const result = await db.getAll('expenses', 3)

  expenses.value = result.data.map((item) => {
    item.date = toDateFormated(item.date)

    return item
  }) as Expense[]
}

async function getInvestments () {
  const result = await db.getAll('investments', 3)

  investments.value = result.data.map((item) => {
    item.date = toDateFormated(item.date)

    return item
  }) as Investment[]
}
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

  /* investments */

  .investments {
    @apply mb-8;
  }
</style>
