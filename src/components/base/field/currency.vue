<template>
  <base-field-text
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
const props = defineProps<{
  value?: string;
  placeholder: string;
  required: boolean;
  modelValue?: string | number;
}>()

const emit = defineEmits([
  'update:amount',
  'update:modelValue'
])

const { locale } = useI18n()

const amountValue = ref<string>()
const amountNumber = ref<number>()

onMounted(async () => {
  await nextTick()

  if (props.modelValue) {
    const value = parseFloat(props.modelValue as string)

    amountValue.value = toFractionNumber(value, locale.value)
    amountNumber.value = value
  }
})

function updateAmount (): void {
  if (!amountValue.value) {
    return
  }

  const amount = parseFloat(amountValue.value)
  const formated = toFractionNumber(amount, locale.value)

  amountNumber.value = amount
  amountValue.value = formated
}

function inputAmount (event: Event): void {
  const amount = (event.target as HTMLInputElement).value
  const amountNumberOnly = amount?.replace(/[^\d.]/g, '')

  amountValue.value = amountNumberOnly
  amountNumber.value = Number(amountNumberOnly)

  emit('update:amount', amountNumber.value)
  emit('update:modelValue', amountNumberOnly)
}

function resetAmount (): void {
  amountValue.value = amountNumber.value?.toString()
}
</script>
