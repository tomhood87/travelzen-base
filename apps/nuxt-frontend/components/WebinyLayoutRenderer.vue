<script setup lang="ts">
// Properties and events.
//
const props = defineProps<{
  layout: string;
  content: Record<string, any>;
  settings?: Record<string, any>;
}>();
// Main variables.
//
const layoutMap = {
  static: WebinyStaticLayout,
  default: WebinyDefaultLayout
} as const;

const layoutComponent = computed(() => {
  const key = (props.layout || "static").toLowerCase() as keyof typeof layoutMap;
  return layoutMap[key] || WebinyStaticLayout;
});
</script>

<template>
  <component
    :is="layoutComponent"
    :content="content"
    :settings="settings"
  />
</template>

<style></style>
