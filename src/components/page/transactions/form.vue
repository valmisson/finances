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
        v-model="formData.name"
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
        v-model="formData.date"
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
        v-model="formData.value"
        :placeholder="$t('enterValue')"
        required
      />
    </fieldset>

    <fieldset>
      <label for="type">
        {{ $t('type') }}
      </label>

      <base-field-select
        v-model="formData.type"
        :items="transactionItems"
        :placeholder="$t('selectType')"
        required
      />
    </fieldset>
  </base-form>
</template>

<script setup lang="ts">
import type { Transaction, TransactionType } from '~/types/interface/transaction'

defineEmits(['submit'])

const { t } = useI18n()

const props = defineProps<{
  transaction?: Transaction
  loading: boolean
}>()

const formData = reactive<Omit<Transaction, 'type'> & { type: string }>({
  name: '',
  date: '',
  type: '',
  value: 0
})

const transactionItems = ref<TransactionType[]>([
  { name: t('deposit'), value: 'deposit', withdrawal: false },
  { name: t('withdraw'), value: 'withdraw', withdrawal: true },
  { name: t('investment'), value: 'investment', withdrawal: false },
  { name: t('payment'), value: 'payment', withdrawal: true }
])

const newTransactionData = computed<Transaction>(() => {
  const { name, date, value, type } = formData

  const transactionData: Transaction = {
    name,
    date: String(toTimestamp(date)),
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

    formData.name = name
    formData.date = toInputDate(date)
    formData.value = value
    formData.type = type.value
  }
})
</script>
