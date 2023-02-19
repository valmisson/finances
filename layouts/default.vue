<template>
  <div style="display: contents;">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const config = useAppConfig()

useHead({
  titleTemplate (title) {
    return title ? `${title} - ${config.title}` : config.title
  }
})
</script>
