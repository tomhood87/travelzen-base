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
    {{ page.settings }}
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

const { data: page, pending, error, refresh } = await useFetch(
  `/api/page/${encodeURIComponent(slug.value)}`
);

// Layout setting (falls back to "static")
const layout = computed(() => {
  return page.value?.settings?.general?.layout || "static";
});

// 🟢 Apply SEO data when available
watchEffect(() => {
  if (page.value?.settings?.seo) {
    const seo = page.value.settings.seo;

    useHead({
      title: seo.title || page.value.title || "Default Title",
      meta: [
        {
          name: "description",
          content: seo.description || "Default description"
        }
      ]
    });
  } else if (page.value) {
    // Fallback: at least set title from page
    useHead({
      title: page.value.title || "Default Title"
    });
  }
});
</script>
