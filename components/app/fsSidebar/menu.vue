<template>
  <nav class="menu">
    <ul class="menu-items">
      <li
        v-for="menu in menuList"
        :key="menu.order"
        class="menu-item"
      >
        <NuxtLink :to="menu.href" class="menu-link">
          <Icon
            v-if="menu.icon"
            :name="menu.icon"
            class="menu-icon"
          />

          <p class="menu-text">
            {{ menu.title }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import pageMap from '~/utils/pageMap'

const menuList = computed(() => {
  return pageMap.sort((a, b) => a.order - b.order)
})
</script>

<style scoped>
  .menu {
    @apply mt-16;
  }

  .menu-item {
    @apply py-1;
  }

  .menu-link {
    @apply text-base font-medium py-3 px-5
      flex items-center rounded transition-all
      duration-300 hover:bg-primary hover:text-white;
  }

  .router-link-exact-active {
    @apply bg-primary text-white;
  }

  .menu-icon {
    @apply text-xl mr-3;
  }

  .menu-text {
    @apply first-letter:uppercase;
  }
</style>
