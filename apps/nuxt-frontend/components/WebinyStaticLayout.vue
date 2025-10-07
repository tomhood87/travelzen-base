<script setup lang="ts">
// Properties and events.
//
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
</script>

<template>
  <div class="webiny-static-layout">
    <WebinyElementRenderer
      v-if="content"
      :element="content"
      :is-root="true"
    />
  </div>
</template>

<style></style>
