<script setup lang="ts">
// Properties and events.
//
const props = defineProps<{
  element: any;
}>();
// Main variables.
//
const element = toRef(props, "element");
const children = computed(() =>
  Array.isArray(props.element?.elements) ? props.element.elements : []
);
</script>

<template>
  <div class="webiny-document" :data-id="element?.id">
    <template v-for="child in children" :key="child.id">
      <WebinyElementRenderer :element="child" />
    </template>
  </div>
</template>

<style></style>
