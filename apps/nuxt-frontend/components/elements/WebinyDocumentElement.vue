<template>
  <div class="webiny-document" :data-id="element?.id">
    <template v-for="child in children" :key="child.id">
      <WebinyElementRenderer :element="child" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import WebinyElementRenderer from "@/components/WebinyElementRenderer.vue";

const props = defineProps<{
  element: any;
}>();

const element = toRef(props, "element");

// Only descend into children; never render the same element again.
const children = computed(() =>
  Array.isArray(props.element?.elements) ? props.element.elements : []
);
</script>