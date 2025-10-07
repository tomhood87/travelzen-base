<script setup lang="ts">
// Properties and events.
//
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
// Main variables.
//
const element = toRef(props, "element")
const data = toRef(props, "data")
const settings = toRef(props, "settings")
// Extract child elements.
//
const children = computed(() => element.value.elements || [])
// Mapping helpers.
//
const mapH: Record<string, string> = {
  "flex-start": "justify-start",
  center: "justify-center",
  "flex-end": "justify-end",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly"
}
const mapV: Record<string, string> = {
  "flex-start": "items-start",
  center: "items-center",
  "flex-end": "items-end",
  stretch: "items-stretch"
}
// Class management.
//
const blockClasses = computed(() => {
  const classes: string[] = ["flex", "flex-col"] // default vertical stacking

  const hAlign = element.value.data?.settings?.horizontalAlignFlex || {}
  const vAlign = element.value.data?.settings?.verticalAlign || {}

  // Desktop (default)
  if (hAlign.desktop && mapH[hAlign.desktop]) {
    classes.push(mapH[hAlign.desktop])
  }
  if (vAlign.desktop && mapV[vAlign.desktop]) {
    classes.push(mapV[vAlign.desktop])
  }

  // Tablet (md)
  if (hAlign.tablet && mapH[hAlign.tablet]) {
    classes.push("md:" + mapH[hAlign.tablet])
  }
  if (vAlign.tablet && mapV[vAlign.tablet]) {
    classes.push("md:" + mapV[vAlign.tablet])
  }

  // Mobile landscape (sm)
  if (hAlign["mobile-landscape"] && mapH[hAlign["mobile-landscape"]]) {
    classes.push("sm:" + mapH[hAlign["mobile-landscape"]])
  }
  if (vAlign["mobile-landscape"] && mapV[vAlign["mobile-landscape"]]) {
    classes.push("sm:" + mapV[vAlign["mobile-landscape"]])
  }

  // Mobile (xs)
  if (hAlign.mobile && mapH[hAlign.mobile]) {
    classes.push("xs:" + mapH[hAlign.mobile])
  }
  if (vAlign.mobile && mapV[vAlign.mobile]) {
    classes.push("xs:" + mapV[vAlign.mobile])
  }

  // Center fixed-width blocks
  const width = "100%"
  if (width && width !== "100%") {
    classes.push("mx-auto")
  }

  return classes.join(" ")
})

// Block inline styles
const blockStyles = computed(() => {
  const styles: Record<string, string> = {}

  // Width
  const width = "100%"
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

  // Background color
  const bgColor = element.value.data?.settings?.background?.color
  if (bgColor) styles.backgroundColor = bgColor

  // Background image
  const bgImage = element.value.data?.settings?.background?.image?.src
  if (bgImage) {
    styles.backgroundImage = `url(${bgImage})`
    styles.backgroundSize = "cover"
    styles.backgroundPosition = "center"
  }

  return styles
})
</script>

<template>
  <div class="webiny-block-element" :class="blockClasses" :style="blockStyles">
    <WebinyElementRenderer
      v-for="child in children"
      :key="child.id"
      :element="child"
    />
  </div>
</template>

<style></style>
