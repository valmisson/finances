<template>
  <base-form v-model="investment" @submit="$emit('submit', newInvestmentData)">
    <fieldset>
      <label for="name">
        Nome
      </label>

      <base-text-field
        id="name"
        v-model="investment.name"
        placeholder="Digite o nome"
        required
      />
    </fieldset>

    <fieldset>
      <label for="date">
        Data
      </label>

      <base-text-field
        id="date"
        v-model="investment.date"
        type="date"
        placeholder="dd/mm/yyy"
        required
      />
    </fieldset>

    <fieldset>
      <label for="value">
        Valor
      </label>

      <base-currency-field
        v-model="investment.value"
        placeholder="Digite o valor"
        required
      />
    </fieldset>
  </base-form>
</template>

<script setup lang="ts">
import {
  BaseCurrencyField,
  BaseForm,
  BaseTextField
} from '#components'

import { toInputDate, toTimestamp } from '~/utils/formats'

import { Investment } from '~/types/interface/investment'

const props = defineProps<{
  investment?: Investment
}>()

defineEmits(['submit'])

const investment = reactive<Investment>({
  name: '',
  date: '',
  value: 0
})

const newInvestmentData = computed<Investment>(() => {
  investment.date = toTimestamp(investment.date) as any

  return investment
})

onMounted(() => {
  if (props.investment) {
    const { name, date, value } = props.investment

    investment.name = name
    investment.date = toInputDate(date)
    investment.value = value
  }
})
</script>
