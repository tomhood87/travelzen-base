<template>
  <div class="webiny-image-element" :class="imageWrapperClasses">
    <img
      v-if="imageSrc"
      :src="imageSrc"
      :alt="imageAlt"
      :title="imageTitle"
      :class="imageClasses"
      class="img-fluid"
      :style="imageStyles"
      @load="onImageLoad"
      @error="onImageError"
    />
    <div v-else class="webiny-image-placeholder">
      <div class="text-neutral-400 text-sm">No image available</div>
    </div>
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

// Use element first, fall back to data
const imageData = computed(() => {
  return element.value.data?.image || data.value.image || null
})

// Image source and metadata
const imageSrc = computed(() => {
  if (!imageData.value) return null

  // Webiny stores it at image.file.src
  if (imageData.value.file?.src) return imageData.value.file.src

  // fallback support for other structures
  if (typeof imageData.value === "string") return imageData.value
  if (imageData.value.src) return imageData.value.src
  if (imageData.value.url) return imageData.value.url

  return null
})

const imageAlt = computed(() => {
  return imageData.value?.alt || ""
})

const imageTitle = computed(() => {
  return imageData.value?.title || ""
})

// Image wrapper classes (alignment)
const imageWrapperClasses = computed(() => {
  const classes: string[] = []

  // Webiny keeps alignment inside element.data.settings.horizontalAlignFlex.desktop
  const align = element.value.data?.settings?.horizontalAlignFlex?.desktop
  if (align) {
    classes.push(`text-${align}`)
  }

  return classes.join(" ")
})

// Tailwind-style classes
const imageClasses = computed(() => {
  const classes = ["webiny-image"]

  if (settings.value.width === "full") {
    classes.push("w-full")
  }

  if (settings.value.rounded) {
    classes.push("rounded-lg")
  }

  return classes.join(" ")
})

// Inline styles (width, height, object-fit)
const imageStyles = computed(() => {
  const styles: Record<string, string> = {}

  if (settings.value.width && settings.value.width !== "full") {
    styles.width = settings.value.width
  }

  if (settings.value.height) {
    styles.height = settings.value.height
  }

  if (settings.value.objectFit) {
    styles.objectFit = settings.value.objectFit
  }

  return styles
})

// Image event handlers
const onImageLoad = () => {
  console.log("Image loaded successfully")
}

const onImageError = () => {
  console.error("Failed to load image:", imageSrc.value)
}
</script>

<style></style>
