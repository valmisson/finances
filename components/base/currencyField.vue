<template>
  <base-text-field
    v-model="amountValue"
    type="text"
    :placeholder="placeholder"
    :required="required"
    @blur="updateAmount"
    @focus="resetAmount"
    @input="inputAmount"
  />
</template>

<script setup lang="ts">
defineProps({
  placeholder: String,
  required: Boolean
})

const emit = defineEmits(['update:amount'])

const amountValue = ref<string>()
const amountNumber = ref<number>()

function updateAmount (): void {
  if (!amountValue.value) {
    return
  }

  const amount = parseFloat(amountValue.value)
  const formated = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2
  }).format(amount)

  amountNumber.value = amount
  amountValue.value = formated
}

function inputAmount (event: any): void {
  const amount = event.target.value
  const amountNumberOnly = amount?.replace(/[^\d.]/g, '')

  amountValue.value = amountNumberOnly
  amountNumber.value = amountNumberOnly

  emit('update:amount', amountNumber.value)
}

function resetAmount (): void {
  amountValue.value = amountNumber.value?.toString()
}
</script>
