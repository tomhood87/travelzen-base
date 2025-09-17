<template>
  <div class="webiny-button-element" :class="buttonWrapperClasses" :style="buttonWrapperStyles">
    <component
      :is="buttonComponent"
      :to="buttonLink"
      :href="buttonHref"
      :target="linkTarget"
      :class="buttonClasses"
      :style="buttonStyles"
      @click="handleClick"
    >
      {{ buttonText }}
    </component>
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

// Button text
const buttonText = computed(() => {
  return (
    props.data.buttonText ||
    element.value.data?.buttonText ||
    "Button"
  )
})

// Button action
const buttonAction = computed(() => {
  return (
    props.data.action ||
    element.value.data?.action ||
    {}
  )
})

// Button component type
const buttonComponent = computed(() => {
  const action = buttonAction.value

  if (action.type === "link" || action.type === "page") {
    if (action.url && (action.url.startsWith("/") || action.url.startsWith("#"))) {
      return "NuxtLink"
    }
    return "a"
  }

  return "button"
})

const buttonLink = computed(() => {
  const action = buttonAction.value
  return buttonComponent.value === "NuxtLink" ? action.url || "/" : null
})

const buttonHref = computed(() => {
  const action = buttonAction.value
  return buttonComponent.value === "a" ? action.url || "#" : null
})

const linkTarget = computed(() => {
  const action = buttonAction.value
  return action.newTab ? "_blank" : null
})

// Wrapper alignment classes
const buttonWrapperClasses = computed(() => {
  const align = element.value.data?.settings?.horizontalAlignFlex?.desktop
  const map: Record<string, string> = {
    "flex-start": "justify-start",
    center: "justify-center",
    "flex-end": "justify-end"
  }
  return align && map[align] ? map[align] : ""
})

// Wrapper styles (margin)
const buttonWrapperStyles = computed(() => {
  const styles: Record<string, string> = {}
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

  return styles
})

// Button classes
const buttonClasses = computed(() => {
  const classes = [
    "webiny-button",
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-lg",
    "font-medium",
    "transition-colors",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2"
  ]

  // Size
  const size = props.settings.size || "md"
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  }
  classes.push(sizeClasses[size] || sizeClasses.md)

  // Variant
  const variant = props.settings.variant || element.value.data?.type || "primary"
  const variantClasses = {
    default: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-neutral-500",
    outline: "border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "text-primary-600 hover:bg-primary-50 focus:ring-primary-500"
  }
  classes.push(variantClasses[variant] || variantClasses.primary)

  return classes.join(" ")
})

// Inline button styles
const buttonStyles = computed(() => {
  const styles: Record<string, string> = {}

  if (props.settings.backgroundColor) styles.backgroundColor = props.settings.backgroundColor
  if (props.settings.textColor) styles.color = props.settings.textColor
  if (props.settings.borderColor) styles.borderColor = props.settings.borderColor

  return styles
})

// Click handler
const handleClick = (event: MouseEvent) => {
  const action = buttonAction.value

  if (action.type === "script" && action.script) {
    try {
      new Function(action.script)()
    } catch (error) {
      console.error("Button script execution failed:", error)
    }
  }
}
</script>

<style scoped>
.webiny-button-element {
  display: flex;
  width: 100%;
}
.webiny-button {
  text-decoration: none;
  cursor: pointer;
  border: none;
}
</style>
