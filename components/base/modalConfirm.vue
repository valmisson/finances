<template>
  <transition>
    <section v-if="show" class="modal">
      <article class="modal-content">
        <h2 class="modal-title">
          {{ title }}
        </h2>

        <div class="modal-actions">
          <base-button
            color="bg-red-500 text-white hover:bg-red-600"
            @click="$emit('modal:confirm', true)"
          >
            Confirmar
          </base-button>

          <base-button
            color="
              bg-transparent border border-separate
              hover:bg-zinc-100
            "
            @click="$emit('modal:confirm', false)"
          >
            Cancelar
          </base-button>
        </div>
      </article>
    </section>
  </transition>
</template>

<script setup lang="ts">
import { BaseButton } from '#components'

defineProps<{
  show: boolean;
  title: string;
}>()

defineEmits(['modal:confirm'])
</script>

<style scoped>
  .modal {
    @apply w-screen h-screen bg-zinc-800/40 z-50
      fixed top-0 left-0 flex justify-center items-center;
  }

  .modal-content {
    @apply bg-white h-fit px-4 py-4 rounded;
  }

  .modal-title {
    @apply text-xl text-gray-600 font-medium mb-8;
  }

  .modal-actions {
    @apply flex gap-6 md:gap-8;
  }

  .v-enter-active,
  .v-leave-active {
    @apply transition-opacity duration-300;
  }

  .v-enter-from,
  .v-leave-to {
    @apply opacity-0;
  }
</style>
