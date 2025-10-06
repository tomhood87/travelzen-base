<template>
  <component :is="elementComponent" v-bind="elementProps" />
</template>

<script setup>
import { computed, toRef } from "vue"

// Import components
import WebinyDocumentElement from "./elements/WebinyDocumentElement.vue"
import WebinyBlockElement from "./elements/WebinyBlockElement.vue"
import WebinyParagraphElement from "./elements/WebinyParagraphElement.vue"
import WebinyHeadingElement from "./elements/WebinyHeadingElement.vue"
import WebinyImageElement from "./elements/WebinyImageElement.vue"
import WebinyGridElement from "./elements/WebinyGridElement.vue"
import WebinyCellElement from "./elements/WebinyCellElement.vue"
import WebinyButtonElement from "./elements/WebinyButtonElement.vue"
import WebinyUnknownElement from "./elements/WebinyUnknownElement.vue"

const props = defineProps({
  element: { type: Object, required: true },
  isRoot: { type: Boolean, default: false }
})

const element = toRef(props, "element")

// Registry
const registry = {
  document: WebinyDocumentElement,
  block: WebinyBlockElement,
  paragraph: WebinyParagraphElement,
  heading: WebinyHeadingElement,
  button: WebinyButtonElement,
  image: WebinyImageElement,
  grid: WebinyGridElement,
  cell: WebinyCellElement
}

// Visibility
const shouldRender = computed(() => {
  const visibility = element.value.data?.settings?.visibility
  return !(visibility === false || visibility === "hidden")
})

// Component
const elementComponent = computed(() => {
  const type = element.value?.type || "unknown"
  return registry[type] || WebinyUnknownElement
})

// Settings/data
const elementSettings = computed(() => element.value.data?.settings || {})
const elementData = computed(() => element.value.data || {})

// Classes
const elementClasses = computed(() => {
  const classes = ["webiny-pb-element", `webiny-element-${element.value.type}`]
  if (elementSettings.value.className) {
    classes.push(elementSettings.value.className)
  }
  return classes.join(" ")
})

// Styles
const elementStyles = computed(() => {
  const styles = {}

  // Background
  const bg = elementSettings.value.background
  if (bg) {
    if (bg.color) styles.backgroundColor = bg.color
    if (bg.image?.src) {
      styles.backgroundImage = `url(${bg.image.src})`
      styles.backgroundSize = bg.image.sizing || "cover"
      styles.backgroundPosition = bg.image.position || "center"
    }
  }

  // Width/height
  const width = "100%"
  if (width) styles.width = width
  const height = elementSettings.value.height?.desktop?.value
  if (height) styles.height = height

  // Margin
  const margin = elementSettings.value.margin?.desktop
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
  const padding = elementSettings.value.padding?.desktop
  if (padding) {
    if (padding.all) styles.padding = padding.all
    else {
      if (padding.top) styles.paddingTop = padding.top
      if (padding.right) styles.paddingRight = padding.right
      if (padding.bottom) styles.paddingBottom = padding.bottom
      if (padding.left) styles.paddingLeft = padding.left
    }
  }

  // Custom CSS passthrough
  if (elementSettings.value.css) {
    Object.assign(styles, elementSettings.value.css)
  }

  return styles
})

// Props for child
const elementProps = computed(() => ({
  element: element.value,
  data: elementData.value,
  settings: elementSettings.value
}))
</script>

<style></style>
