<template>
  <div class="webiny-default-layout">
    <header v-if="hasHeader" class="webiny-layout-header">
      <WebinyElementRenderer
        v-for="element in headerElements"
        :key="element.id"
        :element="element"
      />
    </header>

    <main class="webiny-layout-main">
      <WebinyElementRenderer
        v-if="content"
        :element="content"
        :is-root="true"
      />
    </main>

    <footer v-if="hasFooter" class="webiny-layout-footer">
      <WebinyElementRenderer
        v-for="element in footerElements"
        :key="element.id"
        :element="element"
      />
    </footer>
  </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  },
  settings: {
    type: Object,
    default: () => ({})
  }
})

// Extract header and footer elements from layout settings
const headerElements = computed(() => {
  return props.settings?.layout?.header?.elements || []
})

const footerElements = computed(() => {
  return props.settings?.layout?.footer?.elements || []
})

const hasHeader = computed(() => headerElements.value.length > 0)
const hasFooter = computed(() => footerElements.value.length > 0)
</script>

<style scoped>
.webiny-default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.webiny-layout-main {
  flex: 1;
}

.webiny-layout-header,
.webiny-layout-footer {
  width: 100%;
}
</style>
