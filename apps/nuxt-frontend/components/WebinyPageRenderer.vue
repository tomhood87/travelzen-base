<script setup lang="ts">
// Properties and events.
//
const props = defineProps({
  path: {
    type: String,
    required: true
  }
})
// Main variables.
//
const { getPage } = useWebinyApi()
const page = ref(null)
const loading = ref(true)
const error = ref(null)

// Computed layout - defaults to 'static' if not specified
const layout = computed(() => {
  if (page.value?.settings?.general?.layout) {
    return page.value.settings.general.layout
  }
  return 'static'
})

// SEO Meta handling
const seoMeta = computed(() => {
  if (!page.value?.settings?.seo) return {}

  const seo = page.value.settings.seo
  return {
    title: seo.title || page.value.title,
    description: seo.description || '',
    meta: seo.meta || []
  }
})

// Set page metadata for SSR
useHead(() => ({
  title: "Test Title",
  meta: []
}))

// Fetch page data
const fetchPage = async () => {
  try {
    loading.value = true
    const result = await getPage(props.path)

    if (result.error) {
      error.value = result.error
      page.value = null
    } else {
      page.value = result.data
      error.value = null
    }
  } catch (err) {
    console.error("Failed to fetch page:", err)
    error.value = err
    page.value = null
  } finally {
    loading.value = false
  }
}

// Fetch data on mount and when path changes
onMounted(() => {
  fetchPage()
})

watch(() => props.path, () => {
  fetchPage()
})

// SSR data fetching
await callOnce(fetchPage)
</script>

<template>
  <div v-if="page" class="webiny-pb-layout">
    <WebinyLayoutRenderer
      :layout="layout"
      :content="page.content"
      :settings="page.settings"
    />
  </div>
  <div v-else-if="loading" class="flex items-center justify-center min-h-screen">
    <div class="text-lg text-neutral-600">Loading page...</div>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-neutral-900 mb-2">Page Not Found</h1>
      <p class="text-neutral-600">The requested page could not be loaded.</p>
    </div>
  </div>
</template>

<style></style>
