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
const element = toRef(props, 'element')
const data = toRef(props, 'data')
const settings = toRef(props, 'settings')

// Inline styles
const { styleString } = useInlineStyle(JSON.stringify(settings.value))

/**
 * Extract formatted HTML text from Lexical JSON.
 */
function extractHtml(jsonString: string) {
  try {
    const outer = JSON.parse(jsonString)
    const inner = JSON.parse(outer.text.data.text)

    function renderNode(node: any): string {
      if (node.type === "text") {
        let txt = node.text || ""

        // Lexical format bitmask:
        // 1 = bold, 2 = italic, 4 = underline, 8 = strikethrough
        if (node.format & 1) txt = `<strong>${txt}</strong>`
        if (node.format & 2) txt = `<em>${txt}</em>`
        if (node.format & 4) txt = `<u>${txt}</u>`
        if (node.format & 8) txt = `<s>${txt}</s>`

        return txt
      }
      if (node.children) {
        return node.children.map(renderNode).join("")
      }
      return ""
    }

    return renderNode(inner.root)
  } catch (e) {
    console.error("Could not extract formatted text", e)
    return ""
  }
}

// Extract formatted HTML
const content = computed(() => extractHtml(JSON.stringify(data.value)))

// Typography settings
const paragraphClasses = computed(() => {
  const classes: string[] = []

  const typography = settings.value.typography
  if (typography) {
    if (typography.align) {
      classes.push(`text-${typography.align}`)
    }
    if (typography.size) {
      classes.push(`text-${typography.size}`)
    }
    if (typography.weight) {
      classes.push(`font-${typography.weight}`)
    }
  }

  return classes.join(" ")
})
</script>

<template>
  <p
    class="webiny-paragraph-element"
    :class="paragraphClasses"
    :style="styleString"
    v-html="content"
  />
</template>

<style></style>
