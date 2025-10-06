<template>
  <div class="webiny-grid-element" :class="gridClasses" :style="gridStyles">
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

const element = toRef(props, "element")
const data = toRef(props, "data")
const settings = toRef(props, "settings")

// Extract child elements (cells)
const children = computed(() => {
  return element.value.elements || []
})

// Grid wrapper classes
const gridClasses = computed(() => {
  const classes: string[] = ["grid", "row"]

  // Default gap
  // classes.push("gap-4")

  // Alignment (flexbox style but we translate into Tailwind classes)
  const alignH = element.value.data?.settings?.horizontalAlignFlex?.desktop
  const alignV = element.value.data?.settings?.verticalAlign?.desktop

  if (alignH) {
    const map: Record<string, string> = {
      "flex-start": "justify-start",
      center: "justify-center",
      "flex-end": "justify-end",
      "space-between": "justify-between"
    }
    if (map[alignH]) classes.push(map[alignH])
  }

  if (alignV) {
    const map: Record<string, string> = {
      "flex-start": "items-start",
      center: "items-center",
      "flex-end": "items-end",
      stretch: "items-stretch"
    }
    if (map[alignV]) classes.push(map[alignV])
  }

  return classes.join(" ")
})

// Inline styles (width, margin, padding, direction)
const gridStyles = computed(() => {
  const styles: Record<string, string> = {}

  const s = element.value.data?.settings

  // Width
  const width = "100%"
  if (width) styles.width = width

  // Margin
  const margin = s?.margin?.desktop
  if (margin) {
    if (margin.all) styles.margin = margin.all
    else {
      if (margin.top) styles.marginTop = margin.top
      if (margin.right) styles.marginRight = margin.right
      if (margin.bottom) styles.marginBottom = margin.bottom
      if (margin.left) styles.marginLeft = margin.left
    }
  }

  // Padding
  const padding = s?.padding?.desktop
  if (padding) {
    if (padding.all) styles.padding = padding.all
    else {
      if (padding.top) styles.paddingTop = padding.top
      if (padding.right) styles.paddingRight = padding.right
      if (padding.bottom) styles.paddingBottom = padding.bottom
      if (padding.left) styles.paddingLeft = padding.left
    }
  }

  // Flex direction (from gridSettings)
  const direction = s?.gridSettings?.desktop?.flexDirection
  if (direction) styles.flexDirection = direction

  return styles
})
</script>

<style></style>
