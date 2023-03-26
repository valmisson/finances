<template>
  <aside class="sidebar" :class="{ 'open': sidebarVisible }">
    <app-sidebar-brand class="sidebar-brand" />

    <app-sidebar-menu @changed:page="hideSidebar" />

    <app-sidebar-logout />
  </aside>

  <header class="header-mobile">
    <button
      class="header-mobile-btn"
      @click="toggleSidebar"
    >
      <Icon class="header-mobile-icon" name="mdi:menu" />
    </button>

    <app-sidebar-brand />
  </header>

  <div
    class="sibebar-mobile-overlay"
    :class="{ 'open': sidebarVisible }"
    @click="toggleSidebar"
  >
    &nbsp;
  </div>
</template>

<script setup lang="ts">
const sidebarVisible = ref(false)

function toggleSidebar () {
  sidebarVisible.value = !sidebarVisible.value
}

function hideSidebar () {
  sidebarVisible.value = false
}
</script>

<style scoped>
  .sidebar {
    @apply bg-white text-gray-700 w-60 h-screen px-5
      fixed top-0 lg:sticky box-content max-lg:z-40
      max-lg:-translate-x-full
      transition-transform duration-300;
  }

  .sidebar.open {
    @apply transform-none;
  }

  .sidebar-brand {
    @apply mt-7 ml-5;
  }

  .header-mobile {
    @apply flex items-center w-full bg-white
    px-4 md:px-11 py-4 lg:hidden z-50 sticky top-0;
  }

  .header-mobile-btn {
    @apply mr-6 p-1 rounded hover:bg-gray-100
    focus:bg-gray-100;
  }

  .header-mobile-icon {
    @apply text-2xl block;
  }

  .sibebar-mobile-overlay {
    @apply w-screen h-screen bg-zinc-800/40 fixed
    lg:hidden max-lg:z-30 overflow-hidden
    invisible opacity-0 transition-all duration-100;
  }

  .sibebar-mobile-overlay.open {
    @apply visible opacity-100 transition-all duration-200;
  }
</style>
