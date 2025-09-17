<template>
  <div
    v-if="shouldRender"
    :class="elementClasses"
    :style="elementStyles"
  >
    <component
      :is="elementComponent"
      v-bind="elementProps"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

// Import concrete components and map by element type
import WebinyDocumentElement from "./elements/WebinyDocumentElement.vue";
import WebinyBlockElement from "./elements/WebinyBlockElement.vue";
import WebinyParagraphElement from "./elements/WebinyParagraphElement.vue";
import WebinyHeadingElement from "./elements/WebinyHeadingElement.vue";
import WebinyImageElement from "./elements/WebinyImageElement.vue";
import WebinyGridElement from "./elements/WebinyGridElement.vue";
import WebinyCellElement from "./elements/WebinyCellElement.vue";
import WebinyButtonElement from "./elements/WebinyButtonElement.vue";
import WebinyUnknownElement from "./elements/WebinyUnknownElement.vue";

const props = defineProps({
  element: {
    type: Object,
    required: true
  },
  isRoot: {
    type: Boolean,
    default: false
  }
});

// Element visibility check
const shouldRender = computed(() => {
  if (!props.element) return false;

  const visibility = props.element.data?.settings?.visibility;
  if (visibility === false || visibility === "hidden") {
    return false;
  }

  return true;
});

// Dynamic component resolution based on element type
const registry = {
  document: WebinyDocumentElement,
  block: WebinyBlockElement,
  paragraph: WebinyParagraphElement,
  heading: WebinyHeadingElement,
  button: WebinyButtonElement,
  image: WebinyImageElement,
  grid: WebinyGridElement,
  cell: WebinyCellElement
};

const elementComponent = computed(() => {
  const elementType = props?.element?.type || "unknown";
  return registry[elementType] || WebinyUnknownElement;
});

// Element settings and data processing
const elementSettings = computed(() => props.element.data?.settings || {});
const elementData = computed(() => props.element.data || {});

// Generate element classes
const elementClasses = computed(() => {
  const classes = ["webiny-pb-element", `webiny-element-${props.element.type}`];

  if (elementSettings.value.className) {
    classes.push(elementSettings.value.className);
  }

  if (elementSettings.value.margin) {
    classes.push(`margin-${elementSettings.value.margin}`);
  }

  if (elementSettings.value.padding) {
    classes.push(`padding-${elementSettings.value.padding}`);
  }

  return classes.join(" ");
});

// Generate element inline styles
const elementStyles = computed(() => {
  const styles = {};

  if (elementSettings.value.background) {
    const bg = elementSettings.value.background;
    if (bg.color) {
      styles.backgroundColor = bg.color;
    }
    if (bg.image) {
      styles.backgroundImage = `url(${bg.image.src})`;
      styles.backgroundSize = bg.image.sizing || "cover";
      styles.backgroundPosition = bg.image.position || "center";
    }
  }

  if (elementSettings.value.width) {
    styles.width = elementSettings.value.width;
  }

  if (elementSettings.value.height) {
    styles.height = elementSettings.value.height;
  }

  if (elementSettings.value.css) {
    Object.assign(styles, elementSettings.value.css);
  }

  return styles;
});

// Element props to pass to child component
const elementProps = computed(() => ({
  element: props.element,
  data: elementData.value,
  settings: elementSettings.value
}));
</script>

<style scoped>
.webiny-pb-element {
  position: relative;
}

/* Margin utilities */
.margin-xs { margin: 0.25rem; }
.margin-sm { margin: 0.5rem; }
.margin-md { margin: 1rem; }
.margin-lg { margin: 1.5rem; }
.margin-xl { margin: 2rem; }

/* Padding utilities */
.padding-xs { padding: 0.25rem; }
.padding-sm { padding: 0.5rem; }
.padding-md { padding: 1rem; }
.padding-lg { padding: 1.5rem; }
.padding-xl { padding: 2rem; }
</style>