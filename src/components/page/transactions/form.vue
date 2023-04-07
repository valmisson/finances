<template>
  <base-form
    :loading="props.loading"
    cols="4"
    class="form"
    @submit="$emit('submit', newTransactionData)"
  >
    <fieldset>
      <label for="name">
        {{ $t('name') }}
      </label>

      <base-field-text
        id="name"
        v-model="transaction.name"
        :placeholder="$t('enterName')"
        required
      />
    </fieldset>

    <fieldset>
      <label for="date">
        {{ $t('date') }}
      </label>

      <base-field-text
        id="date"
        v-model="transaction.date"
        type="date"
        placeholder="dd/mm/yyy"
        required
      />
    </fieldset>

    <fieldset>
      <label for="value">
        {{ $t('value') }}
      </label>

      <base-field-currency
        v-model="transaction.value"
        :placeholder="$t('enterValue')"
        required
      />
    </fieldset>

    <fieldset>
      <label for="type">
        {{ $t('type') }}
      </label>

      <base-field-select
        v-model="transaction.type"
        :items="transactionItems"
        :placeholder="$t('selectType')"
        required
      />
    </fieldset>
  </base-form>
</template>

<script setup lang="ts">
import { Transaction, TransactionType } from '~/types/interface/transaction'

const props = defineProps<{
  transaction?: Transaction
  loading: boolean
}>()

defineEmits(['submit'])

const { t } = useI18n()

const transaction = reactive<Omit<Transaction, 'type'> & { type: string }>({
  name: '',
  date: '',
  value: 0,
  type: ''
})

const transactionItems = ref<TransactionType[]>([
  { name: t('deposit'), value: 'deposit', withdrawal: false },
  { name: t('withdraw'), value: 'withdraw', withdrawal: true },
  { name: t('investment'), value: 'investment', withdrawal: false },
  { name: t('payment'), value: 'payment', withdrawal: true }
])

const newTransactionData = computed<Transaction>(() => {
  const { name, date, value, type } = transaction

  const transactionData: Transaction = {
    name,
    date: toTimestamp(date) as any,
    value,
    type: transactionItems.value
      .map(({ value, withdrawal }) => ({ value, withdrawal }))
      .find(item => item.value === type) as TransactionType
  }

  return transactionData
})

onMounted(() => {
  if (props.transaction) {
    const { name, date, value, type } = props.transaction

    transaction.name = name
    transaction.date = toInputDate(date)
    transaction.value = value
    transaction.type = type.value
  }
})
</script>
