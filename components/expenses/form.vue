<template>
  <form class="form" @submit.prevent="$emit('submit', content)">
    <div>
      <label for="name">
        Nome
      </label>

      <base-text-field
        id="name"
        v-model="content.name"
        placeholder="Digite o nome"
        required
      />
    </div>

    <div>
      <label for="date">
        Data
      </label>

      <base-text-field
        v-model="content.date"
        type="date"
        placeholder="dd/mm/aaaa"
        required
      />
    </div>

    <div>
      <label for="value">
        Valor
      </label>

      <base-text-field
        v-model="content.value"
        type="number"
        placeholder="Digite o valor"
        required
      />
    </div>

    <div class="form-actions">
      <base-button>
        ENVIAR
      </base-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { BaseTextField, BaseButton } from '#components'

import { Expense } from '~/types/interface/expense'

const content = reactive<Expense>({
  name: '',
  date: '',
  value: ''
})

defineEmits(['submit'])
</script>

<style scoped>
  .form {
    @apply grid grid-cols-1 lg:grid-cols-3 max-lg:gap-y-3 gap-x-4 lg:gap-x-8;
  }

  label {
    @apply text-sm;
  }

  .form-actions {
    @apply col-span-1 lg:col-span-3 flex justify-end
      mt-7 mb-2;
  }
</style>
