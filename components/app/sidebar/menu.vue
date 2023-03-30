<template>
  <nav class="menu">
    <ul class="menu-items">
      <li
        v-for="menu in menuList"
        :key="menu.name"
        class="menu-item"
        @click="$emit('changed:page')"
      >
        <NuxtLink
          :to="menu.href"
          :class="[
            {
              'router-child-active': matchPageChild(menu.href)
            },
            'menu-link'
          ]"
        >
          <Icon
            v-if="menu.icon"
            :name="menu.icon"
            class="menu-icon"
          />

          <p class="menu-text">
            {{ $t(menu.title, titlePlural(menu.titlePlural)) }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { pageMap } from '#imports'

defineEmits(['changed:page'])

const route = useRoute()

const menuList = computed(() => {
  return pageMap.sort((a, b) => a.order - b.order)
})

function titlePlural (plural: boolean | undefined): number {
  return plural ? 2 : 1
}

function matchPageChild (href: string): boolean {
  if (href === '/') {
    return false
  }

  const routePath = route.path.split(/\//)

  // check if route has child
  if (routePath.length < 3) {
    return false
  }

  return routePath.includes(href.substring(1))
}
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

  .router-link-active,
  .router-child-active {
    @apply bg-primary text-white;
  }

  .menu-icon {
    @apply text-xl mr-3;
  }

  .menu-text {
    @apply first-letter:uppercase;
  }
</style>
