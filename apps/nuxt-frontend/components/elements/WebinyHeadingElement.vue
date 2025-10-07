<script setup lang="ts">
// Types.
//
type AnyObj = Record<string, any>
// Properties and events.
//
const props = defineProps<{
  element: AnyObj
  data?: AnyObj
  settings?: AnyObj
}>()
// Main variables.
//
const element = toRef(props, "element")
const data = toRef(props, "data")
const settings = toRef(props, "settings")

/**
 * Extract text, tag, and alignment (format) from Webiny's Lexical JSON.
 */
function parseLexical(jsonString: string): {
  text: string
  tag?: string
  format?: string
} {
  try {
    const parsed = JSON.parse(jsonString)
    let tag: string | undefined
    let format: string | undefined

    function walk(node: any): string {
      if (!node) return ""
      if (node.type === "heading-element") {
        if (node.tag) tag = node.tag
        if (node.format) format = node.format
      }
      if (typeof node.text === "string") return node.text
      if (Array.isArray(node.children)) {
        return node.children.map(walk).join(" ")
      }
      return ""
    }

    const text = walk(parsed.root)
    return { text, tag, format }
  } catch (e) {
    console.error("Failed to parse heading text", e)
    return { text: "", tag: undefined, format: undefined }
  }
}

const lexicalData = computed(() => {
  const raw =
    data.value?.text?.data?.text ||
    element.value?.data?.text?.data?.text ||
    ""
  return parseLexical(typeof raw === "string" ? raw : "")
})

const content = computed(() => lexicalData.value.text)

// Fallback to Webiny’s `desktop.tag`.
//
const headingTag = computed(() => {
  return (
    lexicalData.value.tag ||
    data.value?.text?.desktop?.tag ||
    element.value?.data?.text?.desktop?.tag ||
    "h1"
  )
})

// Alignment.
//
const alignmentClass = computed(() => {
  const format =
    lexicalData.value.format ||
    data.value?.text?.desktop?.alignment ||
    element.value?.data?.text?.desktop?.alignment

  switch (format) {
    case "left":
    case "start":
      return "text-start"
    case "center":
      return "text-center"
    case "right":
    case "end":
      return "text-end"
    default:
      return ""
  }
})

// Class management.
//
const headingClasses = computed(() => {
  const classes: string[] = ["webiny-heading-element"]

  if (alignmentClass.value) classes.push(alignmentClass.value)

  const typography =
    settings.value?.typography ||
    element.value?.data?.settings?.typography

  if (typography?.size) classes.push(`text-${typography.size}`)
  if (typography?.weight) classes.push(`font-${typography.weight}`)

  return classes.join(" ")
})

// Inline styles.
//
const headingStyles = computed(() => {
  const styles: Record<string, string> = {}
  const typography =
    settings.value?.typography ||
    element.value?.data?.settings?.typography

  if (typography?.color) styles.color = typography.color
  if (typography?.lineHeight)
    styles.lineHeight = String(typography.lineHeight)

  const bgColor =
    settings.value?.background?.desktop?.color ||
    element.value?.data?.settings?.background?.desktop?.color
  if (bgColor) styles.backgroundColor = bgColor

  const margin = element.value?.data?.settings?.margin?.desktop
  const padding = element.value?.data?.settings?.padding?.desktop

  if (margin?.all) styles.margin = margin.all
  else if (margin) {
    if (margin.top) styles.marginTop = margin.top
    if (margin.right) styles.marginRight = margin.right
    if (margin.bottom) styles.marginBottom = margin.bottom
    if (margin.left) styles.marginLeft = margin.left
  }

  if (padding?.all) styles.padding = padding.all
  else if (padding) {
    if (padding.top) styles.paddingTop = padding.top
    if (padding.right) styles.paddingRight = padding.right
    if (padding.bottom) styles.paddingBottom = padding.bottom
    if (padding.left) styles.paddingLeft = padding.left
  }

  return styles
})
</script>

<template>
  <component
    :is="headingTag"
    :class="headingClasses"
    :style="headingStyles"
  >
    {{ content }}
  </component>
</template>
