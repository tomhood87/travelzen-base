<template>
  <div class="webiny-unknown-element bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-lg p-4 text-center">
    <div class="text-neutral-600 text-sm">
      <p class="font-medium mb-1">Unknown Element Type</p>
      <p class="text-xs">Type: {{ elementType }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  element: {
    type: Object,
    required: true
  },
  data: {
    type: Object,
    default: () => ({})
  },
  settings: {
    type: Object,
    default: () => ({})
  }
})

const element = toRef(props, 'element')
const data = toRef(props, 'data')
const settings = toRef(props, 'settings')

const elementType = computed(() => {
  return props?.element?.type || 'unknown'
})

const elementData = computed(() => {
  return JSON.stringify(props.element, null, 2)
})
</script>

<style scoped>
.webiny-unknown-element {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
