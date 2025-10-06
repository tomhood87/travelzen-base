<script setup lang="ts">
const { data } = await useAsyncData('site-settings', () => $fetch('/api/site-settings'))
// Load page head.
//
useHead({
  style: [
    {
      type: 'text/css',
      innerHTML: `
        :root {
          --mz-primary: ${data.value?.primarycolour ?? '#0043B3'};
          --mz-secondary: ${data.value?.secondarycolour ?? '#334A71'};
        }
      `,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
