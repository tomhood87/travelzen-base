<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">{{ error.statusMessage || "Page not found" }}</div>
  <div v-else>
    {{ page }}
    <h1>{{ page.title }}</h1>
    <div v-for="block in page.content.elements" :key="block.id">
      <PageElementRenderer :element="block" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import PageElementRenderer from "~/components/PageElementRenderer.vue";

const route = useRoute();
const slugParam = route.params.slug as string | string[];
const path = Array.isArray(slugParam)
  ? "/" + slugParam.join("/")
  : "/" + (slugParam || "");

const { data: page, pending, error } = await useFetch(
  `/api/page/${encodeURIComponent(path)}`
);
</script>
