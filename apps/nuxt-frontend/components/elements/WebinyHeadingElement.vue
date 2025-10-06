<script setup lang="ts">
import { toRef, computed } from "vue"

type AnyObj = Record<string, any>

const props = defineProps<{
  element: AnyObj
  data?: AnyObj
  settings?: AnyObj
}>()

const element = toRef(props, "element")
const data = toRef(props, "data")
const settings = toRef(props, "settings")

/**
 * Extract text from Webiny's Lexical JSON string.
 */
function extractLexicalText(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString)

    function walk(node: any): string {
      if (!node) return ""
      if (typeof node.text === "string") return node.text
      if (Array.isArray(node.children)) {
        return node.children.map(walk).join(" ")
      }
      return ""
    }

    return walk(parsed.root)
  } catch (e) {
    console.error("Failed to parse heading text", e)
    return ""
  }
}

// The inner lexical JSON is stored as a string
const content = computed(() => {
  const textData =
    data.value?.text?.data?.text ||
    element.value?.data?.text?.data?.text ||
    ""

  return typeof textData === "string"
    ? extractLexicalText(textData)
    : ""
})

// Heading tag (defaults to h1 if missing)
const headingTag = computed(() => {
  return (
    data.value?.text?.desktop?.tag ||
    element.value?.data?.text?.desktop?.tag ||
    "h1"
  )
})

// Classes
const headingClasses = computed(() => {
  const classes: string[] = []

  const alignment =
    data.value?.text?.desktop?.alignment ||
    element.value?.data?.text?.desktop?.alignment
  if (alignment) {
    classes.push(`text-${alignment}`)
  }

  const typography =
    settings.value?.typography ||
    element.value?.data?.settings?.typography

  if (typography?.size) classes.push(`text-${typography.size}`)
  if (typography?.weight) classes.push(`font-${typography.weight}`)

  return classes.join(" ")
})

// Inline styles
const headingStyles = computed(() => {
  const styles: Record<string, string> = {}
  const typography =
    settings.value?.typography ||
    element.value?.data?.settings?.typography

  if (typography?.color) styles.color = typography.color
  if (typography?.lineHeight)
    styles.lineHeight = String(typography.lineHeight)

  return styles
})
</script>

<template>
  <component
    :is="headingTag"
    class="webiny-heading-element"
    :class="headingClasses"
    :style="headingStyles"
  >
    {{ content }}
  </component>
</template>

<style></style>
