<template>
  <base-form
    :loading="props.loading"
    @submit="$emit('submit', newInvestmentData)"
  >
    <fieldset>
      <label for="name">
        {{ $t('name') }}
      </label>

      <base-field-text
        id="name"
        v-model="investment.name"
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
        v-model="investment.date"
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
        v-model="investment.value"
        :placeholder="$t('enterValue')"
        required
      />
    </fieldset>
  </base-form>
</template>

<script setup lang="ts">
import { Investment } from '~/types/interface/investment'

const props = defineProps<{
  investment?: Investment
  loading: boolean
}>()

defineEmits(['submit'])

const investment = reactive<Investment>({
  name: '',
  date: '',
  value: 0
})

const newInvestmentData = computed<Investment>(() => {
  const { name, date, value } = investment

  const investmentData: Investment = {
    name,
    date: toTimestamp(date) as any,
    value
  }

  return investmentData
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
