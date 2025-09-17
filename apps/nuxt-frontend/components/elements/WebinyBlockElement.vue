<template>
  <div class="webiny-block-element" :class="blockClasses" :style="blockStyles">
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

// Extract child elements
const children = computed(() => element.value.elements || [])

// Block CSS classes
const blockClasses = computed(() => {
  const classes: string[] = ["flex"]

  // Horizontal alignment
  const hAlign = element.value.data?.settings?.horizontalAlignFlex?.desktop
  if (hAlign) {
    const map: Record<string, string> = {
      "flex-start": "justify-start",
      center: "justify-center",
      "flex-end": "justify-end",
      "space-between": "justify-between",
      "space-around": "justify-around",
      "space-evenly": "justify-evenly"
    }
    if (map[hAlign]) classes.push(map[hAlign])
  }

  // Vertical alignment
  const vAlign = element.value.data?.settings?.verticalAlign?.desktop
  if (vAlign) {
    const map: Record<string, string> = {
      "flex-start": "items-start",
      center: "items-center",
      "flex-end": "items-end",
      stretch: "items-stretch"
    }
    if (map[vAlign]) classes.push(map[vAlign])
  }

  return classes.join(" ")
})

// Block inline styles
const blockStyles = computed(() => {
  const styles: Record<string, string> = {}

  // Width
  const width = element.value.data?.settings?.width?.desktop?.value
  if (width) styles.width = width

  // Margin
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

  // Padding
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

<style scoped>
.webiny-block-element {
  width: 100%;
  display: flex;
  flex-direction: column; /* default so grids/cells stack */
}
</style>
