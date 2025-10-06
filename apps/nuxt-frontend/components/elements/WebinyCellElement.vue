<template>
  <div :class="cellClasses">
    <WebinyElementRenderer
      v-for="child in children"
      :key="child.id"
      :element="child"
    />
  </div>
</template>

<script setup lang="ts">
import { toRef, computed } from "vue"

const props = defineProps({
  element: {
    type: Object,
    required: true
  }
})

const element = toRef(props, "element")

// Extract children
const children = computed(() => element.value.elements || [])

// Cell classes: mix webiny + bootstrap
const cellClasses = computed(() => {
  const classes: string[] = ["webiny-cell-element"]

  // Grid size → Bootstrap col
  const size = element.value.data?.settings?.grid?.size
  if (size) {
    classes.push(`col-${size}`) // bootstrap col
    classes.push(`basis-${(size / 12) * 100}`) // optional webiny basis
  }

  // Horizontal align
  const hAlign = element.value.data?.settings?.horizontalAlignFlex?.desktop
  if (hAlign) {
    const map: Record<string, string> = {
      "flex-start": "justify-start",
      center: "justify-center",
      "flex-end": "justify-end"
    }
    if (map[hAlign]) classes.push(map[hAlign])
  }

  return classes.join(" ")
})

// Styles (margin/padding etc.)
const cellStyles = computed(() => {
  const styles: Record<string, string> = {}
  const margin = element.value.data?.settings?.margin?.desktop
  if (margin) {
    if (margin.all) styles.margin = margin.all
    else {
      if (margin.top) styles.marginTop = margin.top
      if (margin.right) styles.marginRight = margin.right
      if (margin.bottom) styles.marginBottom = margin.bottom
      if (margin.left) styles.marginLeft = margin.left
    }
  }

  const padding = element.value.data?.settings?.padding?.desktop
  if (padding) {
    if (padding.all) styles.padding = padding.all
    else {
      if (padding.top) styles.paddingTop = padding.top
      if (padding.right) styles.paddingRight = padding.right
      if (padding.bottom) styles.paddingBottom = padding.bottom
      if (padding.left) styles.paddingLeft = padding.left
    }
  }

  return styles
})
</script>

<style></style>
