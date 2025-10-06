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
 * Extract text and tag from Webiny's Lexical JSON.
 */
function parseLexical(jsonString: string): { text: string; tag?: string } {
  try {
    const parsed = JSON.parse(jsonString)

    let tag: string | undefined

    function walk(node: any): string {
      if (!node) return ""
      if (node.type === "heading-element" && node.tag) {
        tag = node.tag
      }
      if (typeof node.text === "string") return node.text
      if (Array.isArray(node.children)) {
        return node.children.map(walk).join(" ")
      }
      return ""
    }

    const text = walk(parsed.root)
    return { text, tag }
  } catch (e) {
    console.error("Failed to parse heading text", e)
    return { text: "", tag: undefined }
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

// Prefer the tag from Lexical; fallback to Webiny’s `desktop.tag`
const headingTag = computed(() => {
  return (
    lexicalData.value.tag ||
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
