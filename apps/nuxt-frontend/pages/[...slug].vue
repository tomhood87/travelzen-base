<template>
  <div v-if="pending" class="flex items-center justify-center min-h-screen">
    <div class="text-lg text-neutral-600">Loading page...</div>
  </div>
  <div v-else-if="page" class="webiny-pb-layout">
    <WebinyLayoutRenderer
      :layout="layout"
      :content="page.content"
      :settings="page.settings"
    />
  </div>
  <div v-else class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-neutral-900 mb-2">Page Not Found</h1>
      <p class="text-neutral-600">The requested page could not be loaded.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const slugParam = route.params.slug as string | string[];
const path = Array.isArray(slugParam)
  ? "/" + slugParam.join("/")
  : "/" + (slugParam || "");

const slug = computed(() => path);


const layout = computed(() => {
  if (page.value?.settings?.general?.layout) {
    return page.value.settings.general.layout
  }
  return 'static'
})

const { data: page, pending, error, refresh
} = await useFetch(
  `/api/page/${encodeURIComponent(slug.value)}`
);
</script>
