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
  </base-form>
</template>

<script setup lang="ts">
import type { Investment } from '~/types/interface/investment'

defineEmits(['submit'])

const props = defineProps<{
  investment?: Investment
  loading: boolean
}>()

const formData = reactive<Investment>({
  name: '',
  date: '',
  value: 0
})

const newInvestmentData = computed<Investment>(() => {
  const { name, date, value } = formData

  const investmentData: Investment = {
    name,
    date: String(toTimestamp(date)),
    value
  }

  return investmentData
})

onMounted(() => {
  if (props.investment) {
    const { name, date, value } = props.investment

    formData.name = name
    formData.date = toInputDate(date)
    formData.value = value
  }
})
</script>
