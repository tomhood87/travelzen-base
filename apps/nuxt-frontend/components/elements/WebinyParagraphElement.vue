<template>
  <p
    class="webiny-paragraph-element"
    :class="paragraphClasses"
    :style="styleString"
    v-html="content"
  />
</template>

<script setup lang="ts">
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
const { styleString } = useInlineStyle(JSON.stringify(settings.value))

const extractText = function extractText(jsonString: string) {
  try {
    // Parse the outer JSON
    const outer = JSON.parse(jsonString);

    // Parse the nested JSON inside text.data.text
    const inner = JSON.parse(outer.text.data.text);

    // Collect all text nodes recursively
    function collectText(node: any) {
      if (node.text) return node.text;
      if (node.children) return node.children.map(collectText).join(" ");
      return "";
    }

    return collectText(inner.root);
  } catch (e) {
    console.error("Could not extract text", e);
    return "";
  }
}

// Extract text content
const content = computed(() => {
  return extractText(JSON.stringify(data.value))
})

// Typography settings
const paragraphClasses = computed(() => {
  const classes = []

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

  return classes.join(' ')
})
</script>

<style scoped>
.webiny-paragraph-element {
  margin: 0;
  line-height: 1.6;
}
</style>
