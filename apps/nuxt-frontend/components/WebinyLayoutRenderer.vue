<template>
  <component
    :is="layoutComponent"
    :content="content"
    :settings="settings"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import WebinyStaticLayout from "./WebinyStaticLayout.vue";
import WebinyDefaultLayout from "./WebinyDefaultLayout.vue";

const props = defineProps<{
  layout: string;
  content: Record<string, any>;
  settings?: Record<string, any>;
}>();

const layoutMap = {
  static: WebinyStaticLayout,
  default: WebinyDefaultLayout
} as const;

const layoutComponent = computed(() => {
  const key = (props.layout || "static").toLowerCase() as keyof typeof layoutMap;
  return layoutMap[key] || WebinyStaticLayout;
});
</script>