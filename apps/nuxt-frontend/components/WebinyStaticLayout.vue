<template>
  <div class="webiny-static-layout">
    <WebinyElementRenderer
      v-if="content"
      :element="content"
      :is-root="true"
    />
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
</script>

<style></style>
